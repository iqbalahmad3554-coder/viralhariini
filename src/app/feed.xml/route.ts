import { allArticles, getArticleSlug } from "@/lib/news-data";
import { SITE_NAME, SITE_URL, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Tanggal publikasi dalam format RFC 822 (syarat RSS valid)
function toRfc822(displayDate: string): string {
  const d = new Date(displayDate);
  if (!Number.isNaN(d.getTime())) return d.toUTCString();
  return new Date().toUTCString();
}

export async function GET() {
  const items = allArticles
    .map((a) => {
      const link = siteUrl(`/berita/${getArticleSlug(a)}`);
      const imageTag = a.imageUrl
        ? `\n      <enclosure url="${xmlEscape(a.imageUrl)}" type="image/jpeg" length="0" />`
        : "";
      const tags = (a.tags ?? [])
        .map((t) => `<category>${xmlEscape(t)}</category>`)
        .join("");
      return `    <item>
      <title>${xmlEscape(a.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${xmlEscape(a.excerpt)}</description>
      <author>${xmlEscape(`${a.author} (${SITE_NAME})`)}</author>
      <category>${xmlEscape(a.category)}</category>
      ${tags}${imageTag}
      <pubDate>${toRfc822(a.publishedAt)}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(`${SITE_NAME} — Berita Viral & Terkini Hari Ini`)}</title>
    <link>${SITE_URL}</link>
    <description>${xmlEscape("Berita paling ramai dibicarakan di Indonesia hari ini — politik, ekonomi, teknologi, internasional, olahraga, hukum, dan viral. Gratis tanpa paywall.")}</description>
    <language>id-ID</language>
    <copyright>© ${new Date().getFullYear()} ${xmlEscape(SITE_NAME)}</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>30</ttl>
    <image>
      <url>${siteUrl("/logo.svg")}</url>
      <title>${xmlEscape(SITE_NAME)}</title>
      <link>${SITE_URL}</link>
    </image>
    <atom:link href="${siteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=1800, s-maxage=1800",
    },
  });
}
