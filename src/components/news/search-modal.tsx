'use client'

import * as React from 'react'
import { Search, X, Flame, Clock, TrendingUp, ArrowRight, CornerDownLeft } from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { Badge } from '@/components/ui/badge'
import { NewsImage } from '@/components/news/news-image'
import { useSearchStore, useHistoryStore } from '@/lib/search-store'
import { allArticles, trendingTags, type NewsItem } from '@/lib/news-data'
import { useOpenArticle } from '@/hooks/use-open-article'
import { cn } from '@/lib/utils'

// Highlight match dalam query
function highlight(text: string, q: string): React.ReactNode {
  if (!q.trim()) return text
  const idx = text.toLowerCase().indexOf(q.toLowerCase())
  if (idx < 0) return text
  return (
    <>
      {text.slice(0, idx)}
      <span className="bg-yellow-200 font-semibold text-black dark:bg-yellow-500 dark:text-black">
        {text.slice(idx, idx + q.length)}
      </span>
      {text.slice(idx + q.length)}
    </>
  )
}

export function SearchModal() {
  const { isOpen, query, setQuery, close } = useSearchStore()
  const openArticle = useOpenArticle()
  const addHistory = useHistoryStore((s) => s.add)
  const history = useHistoryStore((s) => s.history)

  // Hasil pencarian real-time
  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return allArticles
      .filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.author.toLowerCase().includes(q) ||
          (a.tags && a.tags.some((t) => t.toLowerCase().includes(q))),
      )
      .slice(0, 8)
  }, [query])

  // Tags populer yang cocok dengan query
  const matchedTags = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return trendingTags.slice(0, 5)
    return trendingTags.filter((t) => t.tag.toLowerCase().includes(q)).slice(0, 5)
  }, [query])

  // Riwayat terbaru (jika query kosong)
  const recentItems = React.useMemo(() => {
    if (query.trim()) return []
    return history
      .slice(0, 5)
      .map((h) => allArticles.find((a) => a.id === h.id))
      .filter(Boolean) as NewsItem[]
  }, [history, query])

  const handleOpen = (item: NewsItem) => {
    addHistory(item.id)
    openArticle(item)
    close()
    setQuery('')
  }

  const totalMatched = query.trim() ? results.length : 0

  return (
    <CommandDialog
      open={isOpen}
      onOpenChange={(o) => {
        if (!o) {
          close()
          setQuery('')
        }
      }}
      className="max-w-2xl"
    >
      <CommandInput
        placeholder="Cari berita, topik, kategori, atau penulis..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList className="max-h-[70vh]">
        <CommandEmpty>
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <Search className="h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm font-medium">Tidak ada hasil untuk “{query}”</p>
            <p className="text-xs text-muted-foreground">Coba kata kunci lain atau pilih dari topik populer</p>
          </div>
        </CommandEmpty>

        {/* Hasil pencarian artikel */}
        {results.length > 0 && (
          <CommandGroup heading={`Hasil pencarian (${totalMatched})`}>
            {results.map((item) => (
              <CommandItem
                key={item.id}
                value={item.id + ' ' + item.title}
                onSelect={() => handleOpen(item)}
                className="group flex items-start gap-3 py-2.5"
              >
                <div className="relative aspect-square w-10 shrink-0">
                  <NewsImage
                    hue={item.imageHue}
                    category={item.category}
                    title={item.title}
                    imageUrl={item.imageUrl}
                    variant="compact"
                    className="h-full w-full rounded-md"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="mb-0.5 flex items-center gap-1.5">
                    <Badge
                      variant="secondary"
                      className="px-1.5 py-0 text-[9px] uppercase tracking-wider"
                    >
                      {item.category}
                    </Badge>
                    {item.trending && (
                      <Flame className="h-3 w-3 text-red-600" />
                    )}
                  </div>
                  <p className="line-clamp-1 text-sm font-medium">
                    {highlight(item.title, query)}
                  </p>
                  <p className="line-clamp-1 text-xs text-muted-foreground">
                    {item.author} · {item.publishedAt}
                  </p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Tag populer yang cocok */}
        {matchedTags.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Topik populer">
              {matchedTags.map((t) => {
                const matchedArticle =
                  allArticles.find((a) =>
                    a.tags?.some((tag) =>
                      tag.toLowerCase().includes(t.tag.toLowerCase()),
                    ),
                  ) ?? allArticles.find((a) =>
                    a.title.toLowerCase().includes(t.tag.toLowerCase()),
                  )
                if (!matchedArticle) return null
                return (
                  <CommandItem
                    key={t.tag}
                    value={'tag-' + t.tag}
                    onSelect={() => matchedArticle && handleOpen(matchedArticle)}
                    className="group flex items-center justify-between gap-2"
                  >
                    <span className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-3.5 w-3.5 text-pink-600" />
                      <span className="font-medium">
                        {highlight('#' + t.tag, query)}
                      </span>
                    </span>
                    <Badge variant="outline" className="text-[10px]">
                      {t.category}
                    </Badge>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </>
        )}

        {/* Riwayat baca (saat query kosong) */}
        {recentItems.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Riwayat baca terakhir">
              {recentItems.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id + ' ' + item.title}
                  onSelect={() => handleOpen(item)}
                  className="group flex items-center gap-3 py-2"
                >
                  <Clock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <p className="line-clamp-1 flex-1 text-sm">{item.title}</p>
                  <span className="text-[10px] text-muted-foreground">
                    {item.category}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        <CommandSeparator />
        <CommandGroup>
          <div className="flex items-center justify-between px-2 py-2 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <CornerDownLeft className="h-3 w-3" /> buka artikel
            </span>
            <span>
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">
                esc
              </kbd>{' '}
              tutup
            </span>
          </div>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

// Floating search trigger (untuk header)
export function SearchTrigger({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  const toggle = useSearchStore((s) => s.toggle)
  return (
    <button
      onClick={toggle}
      className={className}
      aria-label="Buka pencarian"
    >
      {children ?? (
        <>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <span className="block h-9 w-full rounded-md border border-border bg-background pl-9 pr-4 text-sm text-muted-foreground">
            <span className="flex h-full items-center">Cari berita viral hari ini...</span>
          </span>
          <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] sm:inline-block">
            /
          </kbd>
        </>
      )}
    </button>
  )
}
