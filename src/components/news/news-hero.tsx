'use client'

import Link from 'next/link'
import { Clock, Eye, TrendingUp, ArrowRight, Flame } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { NewsImage } from '@/components/news/news-image'
import { heroNews, trendingNews, topStories, type NewsItem } from '@/lib/news-data'
import { useOpenArticle } from '@/hooks/use-open-article'

export function NewsHero() {
  const openArticle = useOpenArticle()
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Hero utama */}
        <article className="group relative col-span-1 overflow-hidden rounded-xl border border-border bg-card shadow-sm lg:col-span-2">
          <button
            onClick={() => openArticle(heroNews)}
            className="block w-full text-left"
            aria-label={`Baca selengkapnya: ${heroNews.title}`}
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9]">
              <NewsImage
                hue={heroNews.imageHue}
                category={heroNews.category}
                title={heroNews.title}
                imageUrl={heroNews.imageUrl}
                variant="large"
                priority
                className="h-full w-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                <Badge className="bg-red-600 text-white hover:bg-red-700">
                  <Flame className="mr-1 h-3 w-3" /> BREAKING
                </Badge>
                <Badge variant="secondary" className="bg-white/90 text-black hover:bg-white">
                  {heroNews.category}
                </Badge>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <h1 className="mb-3 text-2xl font-extrabold leading-tight text-white drop-shadow-md sm:text-3xl lg:text-4xl">
                  {heroNews.title}
                </h1>
                <p className="mb-4 hidden max-w-2xl text-sm text-white/85 sm:text-base line-clamp-2">
                  {heroNews.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/80">
                  <span className="font-medium">{heroNews.author}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {heroNews.publishedAt}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" /> {heroNews.views} dibaca
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> Trending #1
                  </span>
                </div>
              </div>
            </div>
          </button>
        </article>

        {/* Samping - 2 mini cards */}
        <div className="flex flex-col gap-4">
          <MiniHeroCard
            item={trendingNews[3]}
            meta="BBC News · 09 Nov 2026"
            onOpen={() => openArticle(trendingNews[3])}
          />
          <MiniHeroCard
            item={topStories[2]}
            meta="tvOne · 11 Nov 2026"
            onOpen={() => openArticle(topStories[2])}
          />
          <div className="hidden rounded-xl border border-red-500/30 bg-red-500/5 p-4 sm:block">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
              Sorotan Hari Ini
            </p>
            <p className="text-sm font-semibold leading-snug">
              Dinamika politik nasional memanas usai Gibran serahkan surat
              pengunduran diri. Simak rangkaian beritanya di sini.
            </p>
            <Button
              variant="link"
              size="sm"
              asChild
              className="-ml-3 mt-2 h-auto p-0 text-red-600 dark:text-red-400"
            >
              <Link href="/kategori/politik">
                Baca selengkapnya <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function MiniHeroCard({
  item,
  meta,
  onOpen,
}: {
  item: { imageHue: number; category: string; title: string; imageUrl?: string }
  meta: string
  onOpen: () => void
}) {
  return (
    <article className="group flex h-full flex-1 gap-3 overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md sm:gap-4">
      <button
        onClick={onOpen}
        className="flex h-full w-full gap-3 text-left sm:gap-4"
        aria-label={`Baca selengkapnya: ${item.title}`}
      >
        <div className="relative aspect-square w-24 shrink-0 sm:w-32">
          <NewsImage
            hue={item.imageHue}
            category={item.category}
            title={item.title}
            imageUrl={item.imageUrl}
            variant="compact"
            className="h-full w-full"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center py-2 pr-2 sm:py-3 sm:pr-3">
          <Badge
            variant="secondary"
            className="mb-1.5 w-fit text-[10px] uppercase tracking-wider"
          >
            {item.category}
          </Badge>
          <h3 className="line-clamp-3 text-sm font-bold leading-snug transition-colors group-hover:text-red-600 dark:group-hover:text-red-400 sm:text-base">
            {item.title}
          </h3>
          <p className="mt-2 text-[11px] text-muted-foreground">{meta}</p>
        </div>
      </button>
    </article>
  )
}
