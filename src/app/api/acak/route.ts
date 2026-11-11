import { NextResponse } from "next/server";
import { allArticles, getArticleSlug } from "@/lib/news-data";

// "Baca Acak" — redirect 302 ke artikel acak.
// Berguna untuk discovery: satu klik, pembaca diantar ke artikel apa pun.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const exclude = new URL(request.url).searchParams.get("kecuali");
  const pool = allArticles.filter((a) => getArticleSlug(a) !== exclude);
  const pick = pool[Math.floor(Math.random() * pool.length)] ?? allArticles[0];
  const url = new URL(`/berita/${getArticleSlug(pick)}`, request.url);
  return NextResponse.redirect(url, {
    status: 302,
    headers: { "Cache-Control": "no-store" },
  });
}
