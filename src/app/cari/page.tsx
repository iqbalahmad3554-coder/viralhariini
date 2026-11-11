import type { Metadata } from "next";
import Link from "next/link";
import { Search, Flame, SearchX } from "lucide-react";
import { SiteHeader } from "@/components/news/site-header";
import { SiteFooter } from "@/components/news/site-footer";
import { Badge } from "@/components/ui/badge";
import { allArticles, getArticleSlug, getCategoryHref } from "@/lib/news-data";
import { SITE_NAME } from "@/lib/site";

// Halaman hasil pencarian — target SearchAction (sitelinks searchbox).
// Hasil pencarian tidak untuk diindeks (noindex) sesuai pedoman Google.
export const metadata: Metadata = {
  title: "Pencarian",
  description: `Cari berita viral, politik, ekonomi, teknologi, dan olahraga di arsip ${SITE_NAME}.`,
  robots: { index: false, follow: true },
};

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function CariPage({ searchParams }: PageProps) {
  const { q = "" } = await searchParams;
  const query = q.trim();

  const results = query
    ? allArticles.filter((a) => {
        const hay = [
          a.title,
          a.excerpt,
          a.category,
          ...(a.tags ?? []),
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(query.toLowerCase());
      })
    : [];

  const trending = allArticles.filter((a) => a.trending).slice(0, 6);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Cari Berita
        </h1>
        <p className="mt-2 text-muted-foreground">
          Telusuri seluruh arsip {SITE_NAME} — judul, topik, dan kategori.
        </p>

        <form action="/cari" method="GET" className="mt-6 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Masukkan kata kunci, mis. prabowo, timnas, bmkg..."
              className="h-12 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm outline-none transition-colors focus:border-red-500"
              aria-label="Kata kunci pencarian"
            />
          </div>
          <button
            type="submit"
            className="h-12 rounded-xl bg-red-600 px-6 text-sm font-bold text-white transition-colors hover:bg-red-700"
          >
            Cari
          </button>
        </form>

        {query && (
          <p className="mt-6 text-sm text-muted-foreground">
            {results.length > 0
              ? `${results.length} hasil untuk "${query}"`
              : `Tidak ada hasil untuk "${query}"`}
          </p>
        )}

        {results.length > 0 && (
          <ul className="mt-4 space-y-3">
            {results.map((a) => (
              <li key={a.id}>
                <Link
                  href={`/berita/${getArticleSlug(a)}`}
                  className="group block rounded-xl border border-border bg-card p-4 transition-all hover:border-red-500/40 hover:shadow-sm"
                >
                  <Badge variant="secondary" className="text-[10px] uppercase">
                    {a.category}
                  </Badge>
                  <h2 className="mt-1.5 font-bold leading-snug group-hover:text-red-600 dark:group-hover:text-red-400">
                    {a.title}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {a.excerpt}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {query && results.length === 0 && (
          <div className="mt-6 flex flex-col items-center gap-2 rounded-xl border border-dashed border-border py-10 text-center">
            <SearchX className="h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              Coba kata kunci lain, atau jelajahi kategori{" "}
              <Link href="/kategori/viral" className="font-semibold text-red-600 hover:underline dark:text-red-400">
                Viral
              </Link>{" "}
              dan{" "}
              <Link href={getCategoryHref("Politik")} className="font-semibold text-red-600 hover:underline dark:text-red-400">
                Politik
              </Link>
              .
            </p>
          </div>
        )}

        {!query && trending.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-3 flex items-center gap-2 border-b-2 border-red-600 pb-2 text-lg font-extrabold tracking-tight">
              <Flame className="h-4 w-4 text-red-600" /> Sedang Trending
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {trending.map((a) => (
                <li key={a.id}>
                  <Link
                    href={`/berita/${getArticleSlug(a)}`}
                    className="group block rounded-xl border border-border bg-card p-4 transition-all hover:border-red-500/40 hover:shadow-sm"
                  >
                    <h3 className="line-clamp-2 text-sm font-bold leading-snug group-hover:text-red-600 dark:group-hover:text-red-400">
                      {a.title}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
