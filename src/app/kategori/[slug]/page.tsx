import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Flame,
  Clock,
  Eye,
  TrendingUp,
  ChevronRight,
  ArrowLeft,
  Check,
  Newspaper,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { NewsImage } from '@/components/news/news-image'
import { SiteHeader } from '@/components/news/site-header'
import { BreakingTicker } from '@/components/news/breaking-ticker'
import { SiteFooter } from '@/components/news/site-footer'
import {
  allArticles,
  categoryMeta,
  getCategoryBySlug,
  getArticleSlug,
} from '@/lib/news-data'
import { siteUrl, SITE_NAME } from '@/lib/site'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return categoryMeta.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const meta = getCategoryBySlug(slug)
  if (!meta) {
    return { title: 'Kategori Tidak Ditemukan' }
  }
  const title = `Berita ${meta.name} Terbaru Hari Ini — ${meta.tagline}`
  const url = siteUrl(`/kategori/${meta.slug}`)
  return {
    title,
    description: meta.description,
    alternates: {
      canonical: `/kategori/${meta.slug}`,
    },
    openGraph: {
      title,
      description: meta.description,
      type: 'website',
      locale: 'id_ID',
      url,
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: meta.description,
    },
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const meta = getCategoryBySlug(slug)
  if (!meta) {
    notFound()
  }

  // Artikel kategori ini, trending dulu lalu sisanya (urutan stabil)
  const articles = allArticles
    .filter((a) => a.category === meta.name)
    .sort((a, b) => Number(b.trending ?? false) - Number(a.trending ?? false))
  const [lead, ...rest] = articles

  const others = categoryMeta.filter((c) => c.slug !== meta.slug)
  const categoryUrl = siteUrl(`/kategori/${meta.slug}`)

  // JSON-LD: CollectionPage + daftar artikel (ItemList) untuk rich results
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Berita ${meta.name} Terbaru Hari Ini`,
    description: meta.description,
    url: categoryUrl,
    inLanguage: 'id-ID',
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: siteUrl('/') },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articles.slice(0, 10).map((a, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: siteUrl(`/berita/${getArticleSlug(a)}`),
        name: a.title,
      })),
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: siteUrl('/') },
      {
        '@type': 'ListItem',
        position: 2,
        name: meta.name,
        item: categoryUrl,
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
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <BreakingTicker />

        <main className="flex-1">
          {/* Breadcrumb */}
          <div className="mx-auto max-w-7xl px-4 py-3">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <Link href="/" className="hover:text-foreground">
                Beranda
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="font-medium text-foreground/80">{meta.name}</span>
            </nav>
          </div>

          {/* Header kategori */}
          <header className="mx-auto max-w-7xl px-4 pb-2 pt-2">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge className="bg-red-600 text-white hover:bg-red-700">
                <Flame className="mr-1 h-3 w-3" /> Kategori
              </Badge>
              <Badge variant="secondary">
                <Newspaper className="mr-1 h-3 w-3" />
                {articles.length} artikel
              </Badge>
              <Badge className="bg-emerald-600 text-white hover:bg-emerald-700">
                <Check className="mr-1 h-3 w-3" /> Gratis
              </Badge>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Berita {meta.name} Terbaru Hari Ini
            </h1>
            <p className="mt-1 text-sm font-medium uppercase tracking-wider text-red-600 dark:text-red-400">
              {meta.tagline}
            </p>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
              {meta.description}
            </p>
          </header>

          {/* Daftar artikel */}
          {articles.length === 0 || !lead ? (
            <div className="mx-auto max-w-3xl px-4 py-16 text-center">
              <p className="text-muted-foreground">
                Belum ada artikel di kategori ini. Cek beranda untuk berita
                terbaru.
              </p>
              <Button asChild className="mt-4 bg-red-600 text-white hover:bg-red-700">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Beranda
                </Link>
              </Button>
            </div>
          ) : (
            <div className="mx-auto max-w-7xl px-4 py-6">
              {/* Artikel utama kategori */}
              <Link
                href={`/berita/${getArticleSlug(lead)}`}
                className="group mb-8 grid overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md lg:grid-cols-2"
              >
                <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[320px]">
                  <NewsImage
                    hue={lead.imageHue}
                    category={lead.category}
                    title={lead.title}
                    imageUrl={lead.imageUrl}
                    variant="large"
                    priority
                    className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    {lead.trending && (
                      <Badge variant="secondary">
                        <TrendingUp className="mr-1 h-3 w-3" /> Trending
                      </Badge>
                    )}
                    <Badge className="bg-red-600 text-white hover:bg-red-700">
                      Utama
                    </Badge>
                  </div>
                  <h2 className="mb-3 text-2xl font-extrabold leading-snug tracking-tight transition-colors group-hover:text-red-600 dark:group-hover:text-red-400">
                    {lead.title}
                  </h2>
                  <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {lead.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground/80">
                      {lead.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {lead.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" /> {lead.views} dibaca
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {lead.readTime} menit baca
                    </span>
                  </div>
                </div>
              </Link>

              {/* Grid artikel lainnya */}
              {rest.length > 0 && (
                <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((a) => (
                    <li key={a.id}>
                      <Link
                        href={`/berita/${getArticleSlug(a)}`}
                        className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:border-red-500/40 hover:shadow-md"
                      >
                        <div className="relative aspect-[16/10]">
                          <NewsImage
                            hue={a.imageHue}
                            category={a.category}
                            title={a.title}
                            imageUrl={a.imageUrl}
                            variant="large"
                            className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-4">
                          <div className="mb-2 flex items-center gap-2">
                            {a.trending && (
                              <Badge variant="secondary" className="text-[10px]">
                                <TrendingUp className="mr-0.5 h-2.5 w-2.5" />
                                Trending
                              </Badge>
                            )}
                            <span className="text-[11px] text-muted-foreground">
                              {a.publishedAt}
                            </span>
                          </div>
                          <h3 className="mb-2 line-clamp-3 text-base font-bold leading-snug transition-colors group-hover:text-red-600 dark:group-hover:text-red-400">
                            {a.title}
                          </h3>
                          <p className="mb-3 line-clamp-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                            {a.excerpt}
                          </p>
                          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                            <span className="font-medium text-foreground/70">
                              {a.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" /> {a.views}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {/* CTA kembali */}
              <div className="mt-10 flex items-center justify-between rounded-xl border border-border bg-muted/40 p-4">
                <p className="text-sm text-muted-foreground">
                  Ingin membaca topik lain? Jelajahi kategori kami yang lain.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-3.5 w-3.5" /> Beranda
                  </Link>
                </Button>
              </div>
            </div>
          )}

          {/* Internal linking: kategori lain */}
          <section className="mx-auto max-w-7xl px-4 pb-12">
            <div className="mb-3 border-b-2 border-red-600 pb-2">
              <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
                <Flame className="h-4 w-4 text-red-600" /> Jelajahi Kategori
                Lainnya
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {others.map((c) => (
                <Link
                  key={c.slug}
                  href={`/kategori/${c.slug}`}
                  className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-red-500/50 hover:bg-red-600 hover:text-white"
                >
                  #{c.name}
                </Link>
              ))}
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </>
  )
}
