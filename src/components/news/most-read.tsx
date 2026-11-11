'use client'

import Link from 'next/link'
import { Eye, Clock, ChevronRight } from 'lucide-react'
import { NewsImage } from '@/components/news/news-image'
import { Badge } from '@/components/ui/badge'
import { trendingNews, hukumNews, topStories, type NewsItem } from '@/lib/news-data'

const mostRead: NewsItem[] = [
  ...trendingNews.slice(0, 3),
  ...topStories.slice(0, 2),
  ...hukumNews.slice(0, 2),
  ...trendingNews.slice(3, 5),
]

export function MostRead() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-5 flex items-end justify-between border-b-2 border-border pb-2">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
            Paling Banyak Dibaca
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            24 jam terakhir &middot; diperbarui otomatis
          </p>
        </div>
        <Link
          href="#"
          className="flex items-center gap-1 text-xs font-semibold text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
        >
          Lihat semua <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:thin]">
        {mostRead.map((item, idx) => (
          <article
            key={item.id}
            className="group w-[280px] shrink-0 snap-start overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:w-[320px]"
          >
            <Link href="#" className="block">
              <div className="relative aspect-[16/10]">
                <NewsImage
                  hue={item.imageHue}
                  category={item.category}
                  title={item.title}
                  className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-md bg-red-600 text-base font-extrabold text-white shadow-md">
                  {idx + 1}
                </span>
              </div>
              <div className="p-4">
                <Badge
                  variant="secondary"
                  className="mb-2 text-[10px] uppercase tracking-wider"
                >
                  {item.category}
                </Badge>
                <h3 className="mb-2 line-clamp-3 text-sm font-bold leading-snug transition-colors group-hover:text-red-600 dark:group-hover:text-red-400">
                  {item.title}
                </h3>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" /> {item.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {item.readTime} mnt
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
