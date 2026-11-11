import Link from 'next/link'
import { Eye, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import {
  allArticles,
  getArticleSlug,
  trendingNews,
  type NewsItem,
} from '@/lib/news-data'

// Konversi format views Indonesia ke angka: "18,9 rb" → 18900, "1,2 jt" → 1.200.000
function parseViews(views: string): number {
  const m = views.trim().match(/^([\d.,]+)\s*(rb|jt|k|m)?$/i)
  if (!m) return 0
  const num = parseFloat(m[1].replace(/\./g, '').replace(',', '.'))
  if (Number.isNaN(num)) return 0
  const unit = (m[2] ?? '').toLowerCase()
  if (unit === 'jt' || unit === 'm') return num * 1_000_000
  if (unit === 'rb' || unit === 'k') return num * 1_000
  return num
}

// Peringkat artikel paling banyak dibaca, di luar yang sudah tampil
// di daftar Trending supaya dua widget saling melengkapi, bukan berulang.
export function getMostPopular(limit = 5): NewsItem[] {
  const exclude = new Set(trendingNews.map((t) => t.id))
  return [...allArticles]
    .filter((a) => !exclude.has(a.id))
    .sort((a, b) => parseViews(b.views) - parseViews(a.views))
    .slice(0, limit)
}

export function MostPopular() {
  const items = getMostPopular(5)
  if (items.length === 0) return null

  return (
    <div className="mt-8">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold tracking-tight">
        <TrendingUp className="h-5 w-5 text-red-600" /> Terpopuler
      </h2>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <ol className="divide-y divide-border">
            {items.map((item, idx) => (
              <li key={item.id}>
                <Link
                  href={`/berita/${getArticleSlug(item)}`}
                  className="group flex items-start gap-3 px-4 py-3 transition-colors hover:bg-muted/60"
                  aria-label={`Baca: ${item.title}`}
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
                        <Eye className="h-3 w-3" /> {item.views} dibaca
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
