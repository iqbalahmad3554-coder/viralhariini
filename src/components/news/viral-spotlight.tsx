'use client'

import { Eye, Flame, Play, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { NewsImage } from '@/components/news/news-image'
import { viralSosial } from '@/lib/news-data'
import { useOpenArticle } from '@/hooks/use-open-article'

export function ViralSpotlight() {
  const openArticle = useOpenArticle()
  return (
    <section id="viral" className="scroll-mt-32 bg-gradient-to-b from-red-50/60 to-background py-8 dark:from-red-950/15">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-5 flex items-end justify-between border-b-2 border-red-600 pb-2">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-extrabold tracking-tight sm:text-2xl">
              <Flame className="h-5 w-5 text-red-600" /> Viral Spotlight
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Berita yang sedang paling ramai dibicarakan di media sosial
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {viralSosial.map((item, idx) => (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
            >
              <button
                onClick={() => openArticle(item)}
                className="block w-full text-left"
                aria-label={`Baca selengkapnya: ${item.title}`}
              >
                <div className="relative aspect-[16/9]">
                  <NewsImage
                    hue={item.imageHue}
                    category={item.category}
                    title={item.title}
                    imageUrl={item.imageUrl}
                    variant="large"
                    className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600/90 shadow-lg ring-4 ring-white/30 transition-transform group-hover:scale-110">
                      <Play className="h-6 w-6 fill-white text-white" />
                    </div>
                  </div>

                  <div className="absolute left-3 top-3 flex gap-2">
                    <Badge className="bg-red-600 text-white hover:bg-red-700">
                      <Flame className="mr-1 h-3 w-3" /> #{idx + 1} Viral
                    </Badge>
                    {idx === 0 && (
                      <Badge variant="secondary" className="bg-white/90 text-black hover:bg-white">
                        Video
                      </Badge>
                    )}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <h3 className="mb-2 line-clamp-2 text-base font-bold leading-snug text-white drop-shadow-sm sm:text-lg">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[11px] text-white/85">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" /> {item.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" /> {item.publishedAt}
                      </span>
                      <span className="font-medium">{item.author}</span>
                    </div>
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
