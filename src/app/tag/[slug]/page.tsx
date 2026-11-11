import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Flame, Hash, ChevronRight, Eye } from "lucide-react";
import { SiteHeader } from "@/components/news/site-header";
import { SiteFooter } from "@/components/news/site-footer";
import { NewsImage } from "@/components/news/news-image";
import { Badge } from "@/components/ui/badge";
import {
  getAllTags,
  getRelatedTags,
  getTagBySlug,
} from "@/lib/tags";
import { getArticleSlug, getCategoryHref } from "@/lib/news-data";
import { SITE_NAME, siteUrl } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllTags().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = getTagBySlug(slug);
  if (!tag) return { title: "Topik Tidak Ditemukan" };
  const title = `Topik ${tag.label}`;
  const description = `Kumpulan berita dan artikel terbaru seputar ${tag.label} di ${SITE_NAME} — ${tag.count} artikel yang diperbarui berkala. Baca perkembangan lengkapnya di sini.`;
  return {
    title,
    description,
    alternates: { canonical: `/tag/${tag.slug}` },
    openGraph: {
      title: `${title} · ${SITE_NAME}`,
      description,
      type: "website",
      locale: "id_ID",
      url: siteUrl(`/tag/${tag.slug}`),
    },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = getTagBySlug(slug);
  if (!tag) notFound();

  const related = getRelatedTags(slug);
  const canonicalUrl = siteUrl(`/tag/${tag.slug}`);

  // JSON-LD CollectionPage + ItemList — memperkaya pemahaman Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `Topik ${tag.label}`,
        url: canonicalUrl,
        description: `Kumpulan berita seputar ${tag.label} di ${SITE_NAME}.`,
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: siteUrl("/") },
      },
      {
        "@type": "ItemList",
        itemListElement: tag.articles.map((a, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: siteUrl(`/berita/${getArticleSlug(a)}`),
          name: a.title,
        })),
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />

      <main className="flex-1">
        {/* Kepala halaman topik */}
        <div className="border-b border-border bg-muted/30">
          <div className="mx-auto max-w-5xl px-4 py-10">
            <nav
              aria-label="Breadcrumb"
              className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <Link href="/" className="hover:text-foreground">
                Beranda
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="font-medium text-foreground/80">
                Topik: {tag.label}
              </span>
            </nav>
            <h1 className="flex flex-wrap items-center gap-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              <Hash className="h-7 w-7 text-red-600" />
              {tag.label}
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {tag.count} berita terbaru seputar{" "}
              <strong className="font-semibold text-foreground">{tag.label}</strong>{" "}
              — dikurasi redaksi {SITE_NAME} dan terus diperbarui setiap hari.
            </p>
          </div>
        </div>

        {/* Daftar artikel */}
        <div className="mx-auto max-w-5xl px-4 py-8">
          <ul className="grid gap-4 sm:grid-cols-2">
            {tag.articles.map((a) => (
              <li key={a.id}>
                <Link
                  href={`/berita/${getArticleSlug(a)}`}
                  className="group flex h-full gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-red-500/40 hover:shadow-sm"
                >
                  <div className="relative aspect-square w-20 shrink-0 sm:w-24">
                    <NewsImage
                      hue={a.imageHue}
                      category={a.category}
                      title={a.title}
                      imageUrl={a.imageUrl}
                      variant="compact"
                      className="h-full w-full rounded-lg"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Badge
                      variant="secondary"
                      className="w-fit text-[10px] uppercase tracking-wide"
                    >
                      {a.category}
                    </Badge>
                    <h2 className="mt-1.5 line-clamp-2 text-sm font-bold leading-snug transition-colors group-hover:text-red-600 dark:group-hover:text-red-400 sm:text-base">
                      {a.title}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {a.excerpt}
                    </p>
                    <p className="mt-auto flex items-center gap-1 pt-2 text-[11px] text-muted-foreground">
                      <Eye className="h-3 w-3" /> {a.views} dibaca · {a.publishedAt}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Topik terkait — penguat internal linking */}
          {related.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-3 flex items-center gap-2 border-b-2 border-red-600 pb-2 text-lg font-extrabold tracking-tight">
                <Flame className="h-4 w-4 text-red-600" /> Topik Terkait
              </h2>
              <div className="flex flex-wrap gap-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/tag/${r.slug}`}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-red-500/50 hover:text-red-600"
                  >
                    #{r.label} <span className="text-[10px] opacity-60">({r.count})</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Jelajah kategori */}
          <section className="mt-10 rounded-xl border border-border bg-card p-5">
            <h2 className="text-base font-bold">Jelajahi per Kategori</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Ingin cakupan lebih luas? Baca rubrik lengkap kami.
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-sm font-semibold">
              {["Viral", "Politik", "Ekonomi", "Teknologi", "Olahraga", "Internasional"].map((c) => (
                <Link
                  key={c}
                  href={getCategoryHref(c)}
                  className="rounded-lg border border-border px-3 py-1.5 transition-colors hover:border-red-500/50 hover:text-red-600"
                >
                  {c}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
