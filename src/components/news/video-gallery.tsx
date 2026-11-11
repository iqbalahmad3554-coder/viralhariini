'use client'

import * as React from 'react'
import { Play, X, Radio, Eye, Clock, Maximize2, Filter } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { newsVideos, type NewsVideo } from '@/lib/news-data'
import { cn } from '@/lib/utils'

export function VideoGallery() {
  const [active, setActive] = React.useState<NewsVideo | null>(null)
  const [filter, setFilter] = React.useState<'Semua' | string>('Semua')

  // Filter by category
  const filtered = React.useMemo(() => {
    if (filter === 'Semua') return newsVideos
    return newsVideos.filter((v) => v.category === filter)
  }, [filter])
  const [featured, ...rest] = filtered

  // Build category list
  const categories = React.useMemo(() => {
    const set = new Set(newsVideos.map((v) => v.category))
    return ['Semua', ...Array.from(set)]
  }, [])

  // Total stats
  const liveCount = newsVideos.filter((v) => v.isLive).length

  return (
    <section
      id="video"
      className="scroll-mt-32 border-y border-border bg-gradient-to-b from-muted/40 to-background py-8"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b-2 border-red-600 pb-2">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-extrabold tracking-tight sm:text-2xl">
              <Play className="h-5 w-5 fill-red-600 text-red-600" /> Video Berita
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Tonton langsung streaming & arsip berita viral. Gratis tanpa
              berlangganan.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Radio className="h-3 w-3 text-red-600" /> {liveCount} live
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Play className="h-3 w-3 text-red-600" /> {newsVideos.length} video
            </Badge>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-5 flex flex-wrap gap-2">
          {categories.map((c) => {
            const isActive = filter === c
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                aria-pressed={isActive}
                className={cn(
                  'inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all',
                  isActive
                    ? 'border-red-600 bg-red-600 text-white'
                    : 'border-border bg-background text-muted-foreground hover:border-red-500/40 hover:text-red-600',
                )}
              >
                {c}
              </button>
            )
          })}
        </div>

        {/* Featured + list */}
        {featured ? (
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Featured video (besar) */}
            <article className="group relative col-span-1 cursor-pointer overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md lg:col-span-2">
              <button
                onClick={() => setActive(featured)}
                className="block w-full text-left"
                aria-label={`Tonton ${featured.title}`}
              >
                <div className="relative aspect-video">
                  <img
                    src={featured.imageUrl}
                    alt={featured.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                  {/* Tombol play */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-2xl ring-4 ring-white/30 transition-transform group-hover:scale-110">
                      <Play className="ml-1 h-7 w-7 fill-white text-white" />
                    </div>
                  </div>

                  <div className="absolute left-3 top-3 flex gap-2">
                    {featured.isLive && (
                      <Badge className="gap-1 bg-red-600 text-white hover:bg-red-700">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                        </span>
                        LIVE
                      </Badge>
                    )}
                    <Badge variant="secondary" className="bg-white/90 text-black hover:bg-white">
                      {featured.channel}
                    </Badge>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="mb-2 line-clamp-2 text-lg font-extrabold leading-tight text-white drop-shadow-md sm:text-2xl">
                      {featured.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/85">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" /> {featured.viewers}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {featured.duration}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <Maximize2 className="h-3 w-3" /> Klik untuk putar
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </article>

            {/* List video lainnya */}
            <div className="flex flex-col gap-3">
              {rest.slice(0, 4).map((v) => (
                <article
                  key={v.id}
                  className="group flex h-full flex-1 gap-3 overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md sm:gap-4"
                >
                  <button
                    onClick={() => setActive(v)}
                    className="flex w-full gap-3 text-left sm:gap-4"
                    aria-label={`Tonton ${v.title}`}
                  >
                    <div className="relative aspect-video w-32 shrink-0 sm:w-40">
                      <img
                        src={v.imageUrl}
                        alt={v.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/45">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 ring-2 ring-white/40">
                          <Play className="ml-0.5 h-4 w-4 fill-white text-white" />
                        </div>
                      </div>
                      {v.isLive && (
                        <Badge className="absolute left-1 top-1 gap-1 bg-red-600 px-1.5 py-0 text-[9px] text-white hover:bg-red-700">
                          <span className="h-1 w-1 rounded-full bg-white" /> LIVE
                        </Badge>
                      )}
                      {!v.isLive && (
                        <span className="absolute bottom-1 right-1 rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-medium text-white">
                          {v.duration}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-center py-2 pr-2 sm:py-3 sm:pr-3">
                      <Badge
                        variant="secondary"
                        className="mb-1.5 w-fit text-[10px] uppercase tracking-wider"
                      >
                        {v.channel}
                      </Badge>
                      <h3 className="line-clamp-3 text-xs font-bold leading-snug transition-colors group-hover:text-red-600 dark:group-hover:text-red-400 sm:text-sm">
                        {v.title}
                      </h3>
                      <p className="mt-1.5 text-[10px] text-muted-foreground sm:text-[11px]">
                        <Eye className="mr-1 inline h-2.5 w-2.5" />
                        {v.viewers}
                      </p>
                    </div>
                  </button>
                </article>
              ))}
              {rest.length === 0 && (
                <div className="rounded-lg border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                  Tidak ada video pada kategori ini.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            Tidak ada video pada kategori ini. Coba filter lain.
          </div>
        )}
      </div>

      {/* Modal player */}
      <Dialog
        open={active !== null}
        onOpenChange={(o) => !o && setActive(null)}
      >
        <DialogContent className="max-w-4xl border-border bg-black p-0 sm:rounded-xl">
          <DialogTitle className="sr-only">
            {active?.title ?? 'Pemutar video'}
          </DialogTitle>
          <DialogClose className="absolute right-3 top-3 z-10 rounded-full bg-white/15 p-1.5 text-white transition-colors hover:bg-white/30">
            <X className="h-4 w-4" />
          </DialogClose>
          {active && (
            <div className="overflow-hidden rounded-xl">
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={active.embedUrl}
                  title={active.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              <div className="bg-card p-4 sm:p-5">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="text-[10px] uppercase">
                    {active.channel}
                  </Badge>
                  {active.isLive && (
                    <Badge className="gap-1 bg-red-600 text-white hover:bg-red-700">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                      </span>
                      LIVE
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-[10px]">
                    {active.category}
                  </Badge>
                </div>
                <h3 className="text-base font-bold leading-snug sm:text-lg">
                  {active.title}
                </h3>
                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" /> {active.viewers}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {active.duration}
                  </span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-500">
                    Gratis tanpa berlangganan
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Konten ini disediakan gratis untuk publik. Sumber video
                  langsung dari kanal YouTube resmi {active.channel}.
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="mt-3"
                >
                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                      active.title,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buka di YouTube →
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
