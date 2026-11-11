'use client'

import * as React from 'react'
import { Radio, Play, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { liveChannels } from '@/lib/news-data'

export function LiveChannels() {
  const [active, setActive] = React.useState<(typeof liveChannels)[number] | null>(null)

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-5 flex items-end justify-between border-b-2 border-border pb-2">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-extrabold tracking-tight sm:text-2xl">
            <Radio className="h-5 w-5 text-red-600" /> TV Langsung
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Streaming kanal berita Indonesia 24 jam — gratis tanpa batas
          </p>
        </div>
        <Badge variant="secondary" className="gap-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
          </span>
          {liveChannels.length} kanal live
        </Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {liveChannels.map((ch) => (
          <article
            key={ch.name}
            className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <button
              onClick={() => setActive(ch)}
              className="block w-full text-left"
              aria-label={`Tonton ${ch.name} live`}
            >
              <div className="relative aspect-video bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
                {/* Pola grid */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
                {/* Logo placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className={`mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-xl ${ch.color} text-xl font-extrabold text-white shadow-lg`}
                    >
                      {ch.name.charAt(0)}
                    </div>
                    <p className="text-sm font-bold text-white/90">{ch.name}</p>
                    <p className="text-[10px] uppercase tracking-wider text-white/60">
                      Live 24 Jam
                    </p>
                  </div>
                </div>
                <div className="absolute left-3 top-3 flex gap-2">
                  <Badge className="gap-1 bg-red-600 text-white hover:bg-red-700">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                    </span>
                    LIVE
                  </Badge>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/40">
                  <div className="flex h-12 w-12 scale-90 items-center justify-center rounded-full bg-red-600 opacity-0 shadow-xl ring-4 ring-white/30 transition-all group-hover:scale-100 group-hover:opacity-100">
                    <Play className="ml-1 h-5 w-5 fill-white text-white" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 text-xs">
                <span className="font-bold text-foreground">{ch.name}</span>
                <span className="text-muted-foreground">{ch.viewers}</span>
              </div>
            </button>
          </article>
        ))}
      </div>

      <Dialog
        open={active !== null}
        onOpenChange={(o) => !o && setActive(null)}
      >
        <DialogContent className="max-w-4xl border-border bg-black p-0 sm:rounded-xl">
          <DialogTitle className="sr-only">
            {active ? `Streaming ${active.name}` : 'Streaming TV'}
          </DialogTitle>
          <DialogClose className="absolute right-3 top-3 z-10 rounded-full bg-white/15 p-1.5 text-white transition-colors hover:bg-white/30">
            <X className="h-4 w-4" />
          </DialogClose>
          {active && (
            <div className="overflow-hidden rounded-xl">
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={active.embedUrl}
                  title={active.name}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              <div className="flex items-center justify-between bg-card p-4">
                <div>
                  <Badge className="gap-1 bg-red-600 text-white hover:bg-red-700">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                    </span>
                    LIVE
                  </Badge>
                  <h3 className="mt-2 text-base font-bold">{active.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {active.viewers} &middot; Streaming gratis 24 jam
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
