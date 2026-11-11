'use client'

import * as React from 'react'
import { Hash, TrendingUp, Flame } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { trendingTags, allArticles, type NewsCategory } from '@/lib/news-data'
import { useOpenArticle } from '@/hooks/use-open-article'
import { cn } from '@/lib/utils'

// Map weight ke ukuran font
function weightToClass(w: number): string {
  if (w >= 85) return 'text-2xl font-extrabold'
  if (w >= 70) return 'text-xl font-bold'
  if (w >= 55) return 'text-lg font-bold'
  if (w >= 40) return 'text-base font-semibold'
  if (w >= 25) return 'text-sm font-medium'
  return 'text-xs font-medium'
}

// Warna berdasarkan kategori
const categoryColor: Record<NewsCategory, string> = {
  Politik: 'text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30',
  Ekonomi: 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30',
  Teknologi: 'text-fuchsia-600 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-950/30',
  Internasional: 'text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/30',
  Olahraga: 'text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/30',
  Hukum: 'text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950/30',
  Viral: 'text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-950/30',
  Lingkungan: 'text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950/30',
}

export function TagCloud() {
  const openArticle = useOpenArticle()
  const [search, setSearch] = React.useState('')

  // Cari artikel yang mengandung tag tertentu
  const findArticlesByTag = (tag: string): NewsItem[] => {
    const tagLower = tag.toLowerCase()
    return allArticles
      .filter(
        (a) =>
          a.tags?.some((t) => t.toLowerCase().includes(tagLower)) ||
          a.title.toLowerCase().includes(tagLower) ||
          a.excerpt.toLowerCase().includes(tagLower),
      )
      .slice(0, 1)
  }

  const filtered = React.useMemo(() => {
    if (!search.trim()) return trendingTags
    const q = search.toLowerCase()
    return trendingTags.filter((t) => t.tag.toLowerCase().includes(q))
  }, [search])

  return (
    <section
      id="tag"
      className="scroll-mt-32 mx-auto max-w-7xl px-4 py-8"
    >
      <div className="mb-5 flex items-end justify-between border-b-2 border-pink-600 pb-2">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-extrabold tracking-tight sm:text-2xl">
            <Hash className="h-5 w-5 text-pink-600" /> Trending Tags
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Topik paling banyak dicari hari ini. Klik tag untuk membaca berita terkait.
          </p>
        </div>
        <Badge variant="secondary" className="gap-1">
          <TrendingUp className="h-3 w-3 text-pink-600" /> {trendingTags.length} tag
        </Badge>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        {/* Search */}
        <div className="mb-4">
          <input
            type="search"
            placeholder="Cari tag atau topik..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
            aria-label="Cari tag"
          />
        </div>

        {/* Tag cloud */}
        <div className="flex flex-wrap items-center gap-2">
          {filtered.map((t) => {
            const matched = findArticlesByTag(t.tag)
            if (matched.length === 0) return null
            const article = matched[0]
            return (
              <button
                key={t.tag}
                onClick={() => openArticle(article)}
                className={cn(
                  'group inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 transition-all hover:scale-105 hover:shadow-sm',
                  weightToClass(t.weight),
                  categoryColor[t.category],
                )}
                title={`${t.tag} — ${t.category}`}
                aria-label={`Tampilkan berita tentang ${t.tag}`}
              >
                <Hash className="h-3 w-3 opacity-60" />
                {t.tag}
                {t.weight >= 85 && (
                  <Flame className="ml-0.5 h-3 w-3 text-red-600" />
                )}
              </button>
            )
          })}
          {filtered.length === 0 && (
            <p className="py-4 text-sm text-muted-foreground">
              Tidak ada tag yang cocok dengan pencarian “{search}”.
            </p>
          )}
        </div>

        {/* Legend */}
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
          <span className="font-semibold">Kategori:</span>
          {Object.entries(categoryColor).map(([cat, cls]) => (
            <span
              key={cat}
              className={cn('rounded-full px-2 py-0.5 text-[11px] font-medium', cls.split(' ')[0])}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
