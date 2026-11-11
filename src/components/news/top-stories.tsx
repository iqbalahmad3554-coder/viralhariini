'use client'

import Link from 'next/link'
import { Clock, Eye, Flame, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { NewsImage } from '@/components/news/news-image'
import { topStories, trendingNews, type NewsItem } from '@/lib/news-data'
import { useOpenArticle } from '@/hooks/use-open-article'

export function TopStoriesSection() {
  const openArticle = useOpenArticle()
  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top stories (col-span-2) */}
        <div className="lg:col-span-2">
          <SectionTitle title="Top Stories" subtitle="Berita pilihan redaksi" />
          <div className="grid gap-4 sm:grid-cols-2">
            {topStories.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Trending sidebar */}
        <aside>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
              <Flame className="h-5 w-5 text-red-600" /> Trending Sekarang
            </h2>
            <Badge variant="secondary" className="gap-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
              </span>
              Live
            </Badge>
          </div>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <ol className="divide-y divide-border">
                {trendingNews.map((item, idx) => (
                  <li key={item.id}>
                    <button
                      onClick={() => openArticle(item)}
                      className="group flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/60"
                      aria-label={`Baca selengkapnya: ${item.title}`}
                    >
                      <span className="mt-0.5 w-7 shrink-0 text-2xl font-extrabold leading-none text-red-600 dark:text-red-400">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-sm font-semibold leading-snug transition-colors group-hover:text-red-600 dark:group-hover:text-red-400">
                          {item.title}
                        </h3>
                        <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
                          <span>{item.category}</span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" /> {item.views}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-red-600" />
                    </button>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </aside>
      </div>
    </section>
  )
}

export function NewsCard({ item }: { item: NewsItem }) {
  const openArticle = useOpenArticle()
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <button
        onClick={() => openArticle(item)}
        className="block w-full text-left"
        aria-label={`Baca selengkapnya: ${item.title}`}
      >
        <div className="relative aspect-[16/10]">
          <NewsImage
            hue={item.imageHue}
            category={item.category}
            title={item.title}
            imageUrl={item.imageUrl}
            className="h-full w-full transition-transform duration-500 group-hover:scale-105"
          />
          {item.trending && (
            <Badge className="absolute right-2 top-2 gap-1 bg-red-600 text-white hover:bg-red-700">
              <Flame className="h-3 w-3" /> Viral
            </Badge>
          )}
        </div>
        <div className="p-4">
          <Badge
            variant="secondary"
            className="mb-2 text-[10px] uppercase tracking-wider"
          >
            {item.category}
          </Badge>
          <h3 className="mb-2 line-clamp-2 text-base font-bold leading-snug transition-colors group-hover:text-red-600 dark:group-hover:text-red-400">
            {item.title}
          </h3>
          <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
            {item.excerpt}
          </p>
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="font-medium text-foreground/70">{item.author}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {item.readTime} mnt
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" /> {item.views}
            </span>
          </div>
        </div>
      </button>
    </article>
  )
}

export function SectionTitle({
  title,
  subtitle,
  href = '#semua',
}: {
  title: string
  subtitle?: string
  href?: string
}) {
  return (
    <div className="mb-4 flex items-end justify-between border-b-2 border-red-600 pb-2">
      <div>
        <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <Link
        href={href}
        className="text-xs font-semibold text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
      >
        Lihat semua →
      </Link>
    </div>
  )
}
