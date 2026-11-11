import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  Flame,
  Clock,
  Eye,
  TrendingUp,
  Check,
  ArrowLeft,
  Share2,
  Bookmark,
  ChevronRight,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { NewsImage } from '@/components/news/news-image'
import { ArticleReaderActions } from '@/components/news/article-reader-actions'
import { SiteHeader } from '@/components/news/site-header'
import { BreakingTicker } from '@/components/news/breaking-ticker'
import { SiteFooter } from '@/components/news/site-footer'
import {
  allArticles,
  getArticleBySlug,
  getArticleSlug,
  getFullContent,
  type NewsItem,
} from '@/lib/news-data'
import { siteUrl } from '@/lib/site'
import { ReadingProgress } from '@/components/news/reading-progress'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return allArticles.map((a) => ({ slug: getArticleSlug(a) }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) {
    return { title: 'Artikel Tidak Ditemukan' }
  }
  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/berita/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      locale: 'id_ID',
      url: siteUrl(`/berita/${slug}`),
      publishedTime: article.publishedAt,
      authors: [article.author],
      section: article.category,
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const content = getFullContent(article)
  const related = allArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 4)

  // Navigasi artikel sebelumnya / berikutnya (mendorong baca berantai)
  const idx = allArticles.findIndex((a) => a.id === article.id)
  const prev = idx > 0 ? allArticles[idx - 1] : undefined
  const next =
    idx >= 0 && idx < allArticles.length - 1
      ? allArticles[idx + 1]
      : undefined
  const canonicalUrl = siteUrl(`/berita/${getArticleSlug(article)}`)

  // JSON-LD structured data untuk SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.imageUrl ? [article.imageUrl] : undefined,
    author: { '@type': 'Organization', name: article.author },
    publisher: {
      '@type': 'Organization',
      name: 'ViralHariIni.id',
      logo: { '@type': 'ImageObject', url: siteUrl('/logo.svg') },
    },
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    articleSection: article.category,
    inLanguage: 'id-ID',
    keywords: (article.tags ?? []).join(', '),
    isAccessibleForFree: true,
  }

  // JSON-LD Breadcrumb — memperkaya hasil pencarian Google
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: siteUrl('/') },
      {
        '@type': 'ListItem',
        position: 2,
        name: article.category,
        item: siteUrl(`/#${article.category.toLowerCase()}`),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: canonicalUrl,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ReadingProgress />
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <BreakingTicker />

        <main className="flex-1">
          {/* Breadcrumb */}
          <div className="mx-auto max-w-3xl px-4 py-3">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Link href="/" className="hover:text-foreground">Beranda</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href={`#${article.category.toLowerCase()}`} className="capitalize hover:text-foreground">
                {article.category}
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="line-clamp-1 font-medium text-foreground/80">
                {article.title.slice(0, 40)}...
              </span>
            </nav>
          </div>

          <article className="mx-auto max-w-3xl px-4 pb-12">
            {/* Header */}
            <header className="mb-6">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge className="bg-red-600 text-white hover:bg-red-700">
                  <Flame className="mr-1 h-3 w-3" /> {article.category}
                </Badge>
                {article.trending && (
                  <Badge variant="secondary">
                    <TrendingUp className="mr-1 h-3 w-3" /> Trending
                  </Badge>
                )}
                <Badge className="bg-emerald-600 text-white hover:bg-emerald-700">
                  <Check className="mr-1 h-3 w-3" /> GRATIS
                </Badge>
              </div>

              <h1 className="mb-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                {article.title}
              </h1>

              <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                {article.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-border py-3 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{article.author}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {article.publishedAt}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" /> {article.views} dibaca
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {article.readTime} menit baca
                </span>
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {article.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Hero image */}
            <div className="relative mb-6 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <div className="relative aspect-[16/9]">
                <NewsImage
                  hue={article.imageHue}
                  category={article.category}
                  title={article.title}
                  imageUrl={article.imageUrl}
                  variant="large"
                  priority
                  className="h-full w-full"
                />
              </div>
            </div>

            {/* Share bar (sticky) */}
            <div className="sticky top-[68px] z-10 mb-6 -mx-4 flex items-center gap-2 bg-background/85 px-4 py-2 backdrop-blur sm:-mx-0 sm:rounded-lg sm:border sm:border-border">
              <span className="text-xs font-semibold text-muted-foreground">Bagikan:</span>
              <ArticleReaderActions article={article} />
              <Link href="/" className="ml-auto">
                <Button variant="ghost" size="sm" className="h-8 gap-1.5">
                  <ArrowLeft className="h-3.5 w-3.5" /> Kembali
                </Button>
              </Link>
            </div>

            {/* Konten utuh */}
            <div className="space-y-4 text-base leading-relaxed">
              {content.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? 'text-lg font-medium leading-relaxed text-foreground'
                      : 'text-foreground/85'
                  }
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Banner gratis */}
            <div className="mt-8 flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-50/60 p-4 dark:bg-emerald-950/20">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                <Check className="h-4 w-4" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-emerald-700 dark:text-emerald-500">
                  Artikel ini 100% Gratis
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Tidak ada paywall, tidak ada batas baca. Bagikan ke teman & keluarga!
                </p>
              </div>
            </div>

            {/* Berita terkait */}
            {related.length > 0 && (
              <section className="mt-10">
                <div className="mb-3 flex items-center justify-between border-b-2 border-red-600 pb-2">
                  <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
                    <Flame className="h-4 w-4 text-red-600" /> Berita Terkait
                  </h2>
                  <Badge variant="secondary" className="text-[10px]">
                    {article.category}
                  </Badge>
                </div>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {related.map((r) => (
                    <li key={r.id}>
                      <Link
                        href={`/berita/${getArticleSlug(r)}`}
                        className="group flex items-start gap-3 rounded-xl border border-border bg-card p-3 transition-all hover:border-red-500/40 hover:shadow-sm"
                      >
                        <div className="relative aspect-square w-14 shrink-0 sm:w-16">
                          <NewsImage
                            hue={r.imageHue}
                            category={r.category}
                            title={r.title}
                            imageUrl={r.imageUrl}
                            variant="compact"
                            className="h-full w-full rounded-lg"
                          />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <h3 className="line-clamp-2 text-xs font-semibold leading-snug transition-colors group-hover:text-red-600 dark:group-hover:text-red-400 sm:text-sm">
                            {r.title}
                          </h3>
                          <p className="mt-1 text-[10px] text-muted-foreground sm:text-[11px]">
                            {r.author}
                          </p>
                        </div>
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-red-600" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Navigasi artikel sebelumnya / berikutnya */}
            {(prev || next) && (
              <nav aria-label="Navigasi artikel" className="mt-8 grid gap-3 sm:grid-cols-2">
                {prev ? (
                  <Link
                    href={`/berita/${getArticleSlug(prev)}`}
                    className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-red-500/40 hover:shadow-sm"
                  >
                    <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      <ArrowLeft className="h-3 w-3" /> Sebelumnya
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm font-semibold leading-snug group-hover:text-red-600 dark:group-hover:text-red-400">
                      {prev.title}
                    </p>
                  </Link>
                ) : (
                  <span />
                )}
                {next && (
                  <Link
                    href={`/berita/${getArticleSlug(next)}`}
                    className="group rounded-xl border border-border bg-card p-4 text-right transition-all hover:border-red-500/40 hover:shadow-sm"
                  >
                    <p className="flex items-center justify-end gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Berikutnya <ChevronRight className="h-3 w-3" />
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm font-semibold leading-snug group-hover:text-red-600 dark:group-hover:text-red-400">
                      {next.title}
                    </p>
                  </Link>
                )}
              </nav>
            )}

            {/* CTA langganan */}
            <div className="mt-8 rounded-xl border border-border bg-gradient-to-br from-red-500/5 to-rose-500/5 p-5 text-center">
              <p className="text-sm font-semibold text-foreground">
                Suka berita ini? Berlangganan newsletter harian gratis kami
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Setiap pagi pukul 06.00 WIB, langsung ke email Anda. Tanpa spam.
              </p>
              <Button asChild size="sm" className="mt-3 bg-red-600 text-white hover:bg-red-700">
                <Link href="/#newsletter">Berlangganan Gratis</Link>
              </Button>
            </div>
          </article>
        </main>

        <SiteFooter />
      </div>
    </>
  )
}
