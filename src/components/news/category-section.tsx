'use client'

import { ArrowRight } from 'lucide-react'
import { NewsImage } from '@/components/news/news-image'
import { SectionTitle } from '@/components/news/top-stories'
import { Badge } from '@/components/ui/badge'
import { type NewsItem } from '@/lib/news-data'
import { useOpenArticle } from '@/hooks/use-open-article'
import { cn } from '@/lib/utils'

interface CategorySectionProps {
  id: string
  title: string
  subtitle?: string
  items: NewsItem[]
  accentClass: string // e.g. 'bg-red-600'
}

export function CategorySection({
  id,
  title,
  subtitle,
  items,
  accentClass,
}: CategorySectionProps) {
  const openArticle = useOpenArticle()
  if (items.length === 0) return null
  const [lead, ...rest] = items

  return (
    <section id={id} className="mx-auto max-w-7xl scroll-mt-32 px-4 py-6">
      <SectionTitle title={title} subtitle={subtitle} />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Lead artikel */}
        <article className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md lg:col-span-1">
          <button
            onClick={() => openArticle(lead)}
            className="block w-full text-left"
            aria-label={`Baca selengkapnya: ${lead.title}`}
          >
            <div className="relative aspect-[16/10]">
              <NewsImage
                hue={lead.imageHue}
                category={lead.category}
                title={lead.title}
                imageUrl={lead.imageUrl}
                variant="large"
                className="h-full w-full transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="mb-2 line-clamp-3 text-lg font-bold leading-snug transition-colors group-hover:text-red-600 dark:group-hover:text-red-400">
                {lead.title}
              </h3>
              <p className="mb-3 line-clamp-3 text-sm text-muted-foreground">
                {lead.excerpt}
              </p>
              <div className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground/70">
                  {lead.author}
                </span>
                {' · '}
                {lead.publishedAt}
              </div>
            </div>
          </button>
        </article>

        {/* List samping */}
        <div className="lg:col-span-2">
          <ul className="grid gap-3 sm:grid-cols-1">
            {rest.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => openArticle(item)}
                  className="group flex w-full gap-3 rounded-xl border border-border bg-card p-3 text-left transition-all hover:shadow-sm sm:gap-4 sm:p-4"
                  aria-label={`Baca selengkapnya: ${item.title}`}
                >
                  <div className="relative aspect-square w-24 shrink-0 sm:w-32">
                    <NewsImage
                      hue={item.imageHue}
                      category={item.category}
                      title={item.title}
                      imageUrl={item.imageUrl}
                      variant="compact"
                      className="h-full w-full rounded-lg"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <div
                      className={cn(
                        'mb-1.5 inline-flex w-fit items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white',
                        accentClass,
                      )}
                    >
                      {item.category}
                    </div>
                    <h3 className="line-clamp-2 text-sm font-semibold leading-snug transition-colors group-hover:text-red-600 dark:group-hover:text-red-400 sm:text-base">
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="mt-1 hidden line-clamp-2 text-xs text-muted-foreground sm:block">
                        {item.excerpt}
                      </p>
                    )}
                    <div className="mt-2 text-[11px] text-muted-foreground">
                      <span className="font-medium text-foreground/70">
                        {item.author}
                      </span>
                      {' · '}
                      {item.publishedAt}
                    </div>
                  </div>
                  <ArrowRight className="mt-1 hidden h-4 w-4 shrink-0 self-center text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-red-600 sm:block" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
