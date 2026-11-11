'use client'

import { Star, Eye, Clock, Flame } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { NewsImage } from '@/components/news/news-image'
import { editorPicks, type NewsItem } from '@/lib/news-data'
import { useOpenArticle } from '@/hooks/use-open-article'

export function EditorsPick() {
  const openArticle = useOpenArticle()
  const [lead, ...rest] = editorPicks

  if (!lead) return null

  return (
    <section
      id="editor"
      className="scroll-mt-32 border-y border-border bg-gradient-to-br from-amber-50/50 via-background to-orange-50/50 py-8 dark:from-amber-950/15 dark:to-orange-950/15"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-5 flex items-end justify-between border-b-2 border-amber-500 pb-2">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-extrabold tracking-tight sm:text-2xl">
              <Star className="h-5 w-5 fill-amber-500 text-amber-500" />{' '}
              Pilihan Redaksi
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Berita pilihan editor yang wajib Anda baca hari ini
            </p>
          </div>
          <Badge variant="secondary" className="gap-1 border-amber-500/40 text-amber-700 dark:text-amber-500">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> Editor's Pick
          </Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Lead editor pick */}
          <EditorCardLarge item={lead} onOpen={() => openArticle(lead)} />

          {/* List lainnya */}
          <div className="lg:col-span-1">
            <ul className="flex flex-col gap-3">
              {rest.map((item, idx) => (
                <li key={item.id}>
                  <button
                    onClick={() => openArticle(item)}
                    className="group flex w-full items-start gap-3 rounded-xl border border-border bg-card p-3 text-left transition-all hover:border-amber-500/40 hover:shadow-sm"
                    aria-label={`Baca: ${item.title}`}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-xs font-extrabold text-amber-700 dark:text-amber-500">
                      {idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <Badge
                        variant="secondary"
                        className="mb-1 text-[9px] uppercase tracking-wider"
                      >
                        {item.category}
                      </Badge>
                      <h3 className="line-clamp-2 text-sm font-semibold leading-snug transition-colors group-hover:text-amber-700 dark:group-hover:text-amber-500">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[10px] text-muted-foreground">
                        {item.views} dibaca
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function EditorCardLarge({
  item,
  onOpen,
}: {
  item: NewsItem
  onOpen: () => void
}) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-amber-500/30 bg-card shadow-sm transition-all hover:shadow-lg lg:col-span-2">
      <button
        onClick={onOpen}
        className="block w-full text-left"
        aria-label={`Baca: ${item.title}`}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge className="gap-1 bg-amber-500 text-white hover:bg-amber-600">
              <Star className="h-3 w-3 fill-white" /> Editor's Pick
            </Badge>
            {item.trending && (
              <Badge className="bg-red-600 text-white hover:bg-red-700">
                <Flame className="mr-1 h-3 w-3" /> Viral
              </Badge>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            <Badge variant="secondary" className="mb-2 bg-white/90 text-black hover:bg-white">
              {item.category}
            </Badge>
            <h3 className="mb-2 line-clamp-2 text-xl font-extrabold leading-tight text-white drop-shadow-md sm:text-2xl">
              {item.title}
            </h3>
            <p className="mb-3 hidden max-w-2xl text-sm text-white/85 line-clamp-2 sm:block">
              {item.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/85">
              <span className="font-medium">{item.author}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {item.readTime} mnt
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" /> {item.views} dibaca
              </span>
            </div>
          </div>
        </div>
      </button>
    </article>
  )
}
