import { NextResponse } from "next/server";
import { allArticles, getArticleSlug, categoryMeta } from "@/lib/news-data";
import { SITE_URL, siteUrl, INDEXNOW_KEY } from "@/lib/site";

// IndexNow — ping instan ke Bing, Yandex, Seznam, Naver (via api.indexnow.org).
// Dipanggil otomatis oleh Vercel Cron setiap hari 00:30 WIB (17:30 UTC),
// tepat setelah cron berita 00:00 WIB menambahkan artikel baru & deploy selesai.
// Bisa juga dipanggil manual: curl https://<host>/api/indexnow
export const dynamic = "force-dynamic";

const ENDPOINT = "https://api.indexnow.org/indexnow";

export async function GET() {
  // Seluruh URL situs: homepage, halaman kategori, semua artikel, kontak.
  // Batas IndexNow 10.000 URL per request — selalu jauh di bawah batas.
  const urlList = [
    siteUrl("/"),
    siteUrl("/kontak"),
    siteUrl("/tentang-kami"),
    siteUrl("/kebijakan-privasi"),
    siteUrl("/syarat-ketentuan"),
    siteUrl("/disclaimer"),
    ...categoryMeta.map((c) => siteUrl(`/kategori/${c.slug}`)),
    ...allArticles.map((a) => siteUrl(`/berita/${getArticleSlug(a)}`)),
  ];

  const payload = {
    host: new URL(SITE_URL).host,
    key: INDEXNOW_KEY,
    keyLocation: siteUrl(`/${INDEXNOW_KEY}.txt`),
    urlList,
  };

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    return NextResponse.json(
      {
        ok: res.ok,
        status: res.status,
        // 200 = key valid & URL diterima, 202 = diterima, validasi key menyusul.
        note:
          res.status === 200 || res.status === 202
            ? "URL diterima IndexNow (Bing/Yandex/Seznam/Naver)"
            : "IndexNow menolak request — cek key/keyLocation",
        submitted: urlList.length,
        keyLocation: payload.keyLocation,
      },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "unknown error",
        submitted: 0,
      },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }
}
