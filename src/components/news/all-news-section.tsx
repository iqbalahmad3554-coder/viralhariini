'use client'

import * as React from 'react'
import Link from 'next/link'
import { LayoutGrid, Eye, Clock, Flame, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { NewsImage } from '@/components/news/news-image'
import {
  allArticles,
  categories,
  type NewsCategory,
  type NewsItem,
} from '@/lib/news-data'
import { useArticleStore } from '@/lib/article-store'
import { cn } from '@/lib/utils'

type Filter = 'Semua' | NewsCategory;

export function AllNewsSection() {
  const [filter, setFilter] = React.useState<Filter>('Semua')
  const [visibleCount, setVisibleCount] = React.useState(9)
  const openArticle = useArticleStore((s) => s.openArticle)

  const filtered = React.useMemo(() => {
    const list =
      filter === 'Semua'
        ? allArticles
        : allArticles.filter((a) => a.category === filter);
    // trending first
    return [...list].sort((a, b) => {
      if (!!a.trending !== !!b.trending) return a.trending ? -1 : 1;
      return 0;
    });
  }, [filter]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const filters: Filter[] = ['Semua', ...categories.map((c) => c.name)];

  return (
    <section
      id="semua"
      className="scroll-mt-32 border-t border-border bg-gradient-to-b from-muted/40 to-background py-8"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4 border-b-2 border-red-600 pb-2">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-extrabold tracking-tight sm:text-2xl">
              <LayoutGrid className="h-5 w-5 text-red-600" /> Semua Berita
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {allArticles.length} artikel · Klik salah satu untuk membaca
              selengkapnya — gratis, tanpa paywall
            </p>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Flame className="h-3 w-3 text-red-600" />
            {filtered.length} hasil
          </Badge>
        </div>

        {/* Filter chips */}
        <div className="mb-6 flex flex-wrap gap-2">
          {filters.map((f) => {
            const isActive = filter === f;
            const count =
              f === 'Semua'
                ? allArticles.length
                : allArticles.filter((a) => a.category === f).length;
            return (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setVisibleCount(9);
                }}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all',
                  isActive
                    ? 'border-red-600 bg-red-600 text-white shadow-sm'
                    : 'border-border bg-background text-muted-foreground hover:border-red-500/40 hover:text-red-600 dark:hover:text-red-400',
                )}
                aria-pressed={isActive}
              >
                {f}
                <span
                  className={cn(
                    'rounded-full px-1.5 py-0 text-[10px] font-bold',
                    isActive ? 'bg-white/20' : 'bg-muted',
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <AllNewsCard
              key={item.id}
              item={item}
              onOpen={() => openArticle(item)}
            />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center">
            <p className="text-sm text-muted-foreground">
              Tidak ada berita pada kategori ini. Coba kategori lain ya.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => setFilter('Semua')}
            >
              Tampilkan semua berita
            </Button>
          </div>
        )}

        {/* Load more */}
        {hasMore && (
          <div className="mt-8 flex flex-col items-center gap-2">
            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                setVisibleCount((c) => Math.min(c + 6, filtered.length))
              }
              className="gap-2"
            >
              Muat lebih banyak berita
              <ChevronRight className="h-4 w-4" />
            </Button>
            <p className="text-xs text-muted-foreground">
              Menampilkan {visible.length} dari {filtered.length} artikel ·
              Semua bisa dibaca selengkapnya gratis
            </p>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-8 rounded-xl border border-emerald-500/30 bg-emerald-50/40 p-4 dark:bg-emerald-950/15">
          <p className="text-sm text-foreground/85">
            <span className="font-semibold text-emerald-700 dark:text-emerald-500">
              💚 Akses penuh gratis:
            </span>{' '}
            Klik judul mana pun untuk membaca seluruh isi artikel. Tidak ada
            batasan halaman, tidak ada biaya, tidak perlu daftar.
            <Link
              href="#gratis"
              className="ml-1 font-medium text-red-600 underline-offset-2 hover:underline dark:text-red-400"
            >
              Pelajari komitmen gratis kami →
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

function AllNewsCard({
  item,
  onOpen,
}: {
  item: NewsItem;
  onOpen: () => void;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <button
        onClick={onOpen}
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
      </button>
      <div className="flex flex-1 flex-col p-4">
        <Badge
          variant="secondary"
          className="mb-2 w-fit text-[10px] uppercase tracking-wider"
        >
          {item.category}
        </Badge>
        <button
          onClick={onOpen}
          className="block text-left"
          aria-label={`Baca selengkapnya: ${item.title}`}
        >
          <h3 className="mb-2 line-clamp-2 text-base font-bold leading-snug transition-colors group-hover:text-red-600 dark:group-hover:text-red-400">
            {item.title}
          </h3>
        </button>
        <p className="mb-3 line-clamp-2 flex-1 text-sm text-muted-foreground">
          {item.excerpt || `${item.title} — baca selengkapnya, gratis.`}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-3 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground/70">
              {item.author}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" /> {item.views}
            </span>
          </div>
          <button
            onClick={onOpen}
            className="flex items-center gap-1 font-semibold text-red-600 transition-colors hover:text-red-700 dark:text-red-400"
          >
            Baca <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </article>
  )
}
