import { allArticles, getArticleSlug } from "@/lib/news-data";
import { SITE_NAME, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

// Google News sitemap — hanya artikel dari 48 jam terakhir (syarat Google).
// Membantu artikel terbaru cepat terindeks Google News & Discover.
// Referensi: https://developers.google.com/news/search/sitemap

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

/**
 * Parse tanggal tampilan situs ke ISO 8601 dengan offset WIB (+07:00).
 * Contoh input : "12 Nov 2026, 07:35 WIB"
 * Contoh output: "2026-11-12T07:35:00+07:00"
 * (new Date() tidak bisa mem-parse "WIB", jadi diproses manual.)
 */
function toWibIso(display: string): string | null {
  const m = display.trim().match(
    /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})(?:,\s*(\d{1,2}):(\d{2}))?\s*(?:WIB)?$/,
  );
  if (!m) return null;
  const month = MONTHS[m[2].slice(0, 3).toLowerCase()];
  if (month === undefined) return null;
  const day = m[1].padStart(2, "0");
  const hh = (m[4] ?? "00").padStart(2, "0");
  const mm = (m[5] ?? "00").padStart(2, "0");
  return `${m[3]}-${String(month + 1).padStart(2, "0")}-${day}T${hh}:${mm}:00+07:00`;
}

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Kembalikan epoch ms dari tanggal tampilan; null bila gagal. */
function toEpoch(display: string): number | null {
  const iso = toWibIso(display);
  if (!iso) return null;
  const t = Date.parse(iso);
  return Number.isNaN(t) ? null : t;
}

export async function GET() {
  const now = Date.now();
  const FORTY_EIGHT_H = 48 * 60 * 60 * 1000;

  // Artikel 48 jam terakhir, terbaru dulu.
  const recent = allArticles
    .map((a) => ({ article: a, t: toEpoch(a.publishedAt) }))
    .filter((x): x is { article: (typeof recent)[number]["article"]; t: number } => x.t !== null)
    .sort((a, b) => b.t - a.t);

  let picked = recent.filter((x) => now - x.t <= FORTY_EIGHT_H);

  // Bila tidak ada yang lolos 48 jam (mis. tanggal data tertinggal),
  // kirim 10 artikel terbaru agar sitemap tetap berguna untuk penemuan.
  if (picked.length === 0) picked = recent.slice(0, 10);

  const items = picked
    .map(({ article }) => {
      const link = siteUrl(`/berita/${getArticleSlug(article)}`);
      return `    <url>
      <loc>${link}</loc>
      <news:news>
        <news:publication>
          <news:name>${xmlEscape(SITE_NAME)}</news:name>
          <news:language>id</news:language>
        </news:publication>
        <news:publication_date>${toWibIso(article.publishedAt) ?? ""}</news:publication_date>
        <news:title>${xmlEscape(article.title)}</news:title>
      </news:news>
    </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${items}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=900, s-maxage=900",
    },
  });
}
