'use client'

import * as React from 'react'
import {
  History,
  X,
  Clock,
  Trash2,
  ChevronRight,
} from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useHistoryStore } from '@/lib/search-store'
import { useOpenArticle } from '@/hooks/use-open-article'
import { formatDistanceToNow } from '@/lib/time'

function safeFormat(ts: number): string {
  try {
    return formatDistanceToNow(ts, { addSuffix: true })
  } catch {
    return 'baru saja'
  }
}

export function HistoryDropdown({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const history = useHistoryStore((s) => s.history)
  const clear = useHistoryStore((s) => s.clear)
  const openArticle = useOpenArticle()
  const [open, setOpen] = React.useState(false)

  const recent = React.useMemo(() => {
    return history.slice(0, 8)
  }, [history])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-80 p-0"
        sideOffset={8}
      >
        <div className="flex items-center justify-between border-b px-3 py-2.5">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-red-600" />
            <span className="text-sm font-bold">Riwayat Baca</span>
            {recent.length > 0 && (
              <Badge variant="secondary" className="text-[10px]">
                {recent.length}
              </Badge>
            )}
          </div>
          {recent.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs text-muted-foreground"
              onClick={clear}
              aria-label="Hapus riwayat"
            >
              <Trash2 className="mr-1 h-3 w-3" /> Hapus
            </Button>
          )}
        </div>

        <div className="max-h-80 overflow-y-auto">
          {recent.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <Clock className="h-8 w-8 text-muted-foreground/40" />
              <p className="text-xs text-muted-foreground">
                Belum ada riwayat. Mulai baca artikel!
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {recent.map((h) => {
                // cari artikel
                const item = null // tidak punya akses langsung ke article di store; gunakan openArticle
                return (
                  <HistoryItem key={h.id} id={h.id} ts={h.ts} onOpen={() => {
                    openArticleById(h.id, openArticle)
                    setOpen(false)
                  }} />
                )
              })}
            </ul>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

function HistoryItem({
  id,
  ts,
  onOpen,
}: {
  id: string
  ts: number
  onOpen: () => void
}) {
  // Lazy lookup article by id via store
  const [item, setItem] = React.useState<NewsItem | null>(null)
  React.useEffect(() => {
    import('@/lib/news-data').then((mod) => {
      const found = mod.allArticles.find((a) => a.id === id)
      setItem(found ?? null)
    })
  }, [id])

  if (!item) {
    return (
      <li className="px-3 py-2 text-xs text-muted-foreground">
        Memuat...
      </li>
    )
  }
  return (
    <li>
      <button
        onClick={onOpen}
        className="group flex w-full items-center gap-2 px-3 py-2.5 text-left transition-colors hover:bg-muted/60"
      >
        <Clock className="h-3 w-3 shrink-0 text-muted-foreground" />
        <div className="min-w-0 flex-1">
          <p className="line-clamp-1 text-xs font-medium">{item.title}</p>
          <p className="text-[10px] text-muted-foreground">
            {item.category} · {safeFormat(ts)}
          </p>
        </div>
        <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </button>
    </li>
  )
}

// Helper untuk cari article by id dan buka
function openArticleById(id: string, openArticle: (item: NewsItem) => void) {
  import('@/lib/news-data').then((mod) => {
    const found = mod.allArticles.find((a) => a.id === id)
    if (found) {
      openArticle(found)
    }
  })
}
