'use client'

import * as React from 'react'
import {
  Bookmark,
  BookmarkCheck,
  X,
  Trash2,
  Clock,
  Eye,
  Flame,
  Inbox,
} from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { NewsImage } from '@/components/news/news-image'
import { useBookmarkStore } from '@/lib/reader-store'
import { getBookmarkedArticles } from '@/lib/search-store'
import { allArticles, type NewsItem } from '@/lib/news-data'
import { useOpenArticle } from '@/hooks/use-open-article'
import { toast } from 'sonner'

export function BookmarkPanel({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [bookmarkVersion, setBookmarkVersion] = React.useState(0)
  const bookmarkCount = useBookmarkStore((s) => s.bookmarks.length)
  const toggle = useBookmarkStore((s) => s.toggle)
  const openArticle = useOpenArticle()

  // Re-render list when bookmarks change
  React.useEffect(() => {
    setBookmarkVersion((v) => v + 1)
  }, [bookmarkCount])

  const bookmarked = React.useMemo(
    () => getBookmarkedArticles(),
    [bookmarkVersion],
  )

  const handleOpen = (item: NewsItem) => {
    openArticle(item)
    setOpen(false)
  }

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    toggle(id)
    toast.success('Bookmark dihapus.')
  }

  const handleClearAll = () => {
    bookmarked.forEach((b) => toggle(b.id))
    toast.success('Semua bookmark dihapus.')
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-md p-0">
        <SheetTitle className="sr-only">Bookmark & Riwayat</SheetTitle>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-4 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-500">
                <BookmarkCheck className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-extrabold tracking-tight">
                  Bookmark Saya
                </h2>
                <p className="text-[11px] text-muted-foreground">
                  {bookmarkCount} artikel tersimpan · tersedia offline
                </p>
              </div>
            </div>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" aria-label="Tutup">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>

          <div className="flex-1 overflow-y-auto">
            {bookmarked.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/60">
                  <Inbox className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Belum ada bookmark</p>
                  <p className="mt-1 max-w-xs text-xs text-muted-foreground">
                    Klik ikon bookmark pada artikel yang ingin Anda simpan.
                    Semua tersimpan di perangkat Anda, tidak di server kami.
                  </p>
                </div>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {bookmarked.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleOpen(item)}
                      className="group flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/60"
                      aria-label={`Baca: ${item.title}`}
                    >
                      <div className="relative aspect-square w-16 shrink-0">
                        <NewsImage
                          hue={item.imageHue}
                          category={item.category}
                          title={item.title}
                          imageUrl={item.imageUrl}
                          variant="compact"
                          className="h-full w-full rounded-lg"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="mb-1 flex items-center gap-1.5">
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
                        <h3 className="line-clamp-2 text-sm font-semibold leading-snug transition-colors group-hover:text-red-600 dark:group-hover:text-red-400">
                          {item.title}
                        </h3>
                        <div className="mt-1 flex items-center gap-3 text-[10px] text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-2.5 w-2.5" /> {item.readTime} mnt
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-2.5 w-2.5" /> {item.views}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleRemove(item.id, e)}
                        aria-label="Hapus bookmark"
                        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {bookmarked.length > 0 && (
            <div className="border-t p-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAll}
                className="w-full"
              >
                <Trash2 className="mr-2 h-3.5 w-3.5" /> Hapus Semua Bookmark
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

// Rekomendasi bookmark empty state helper
export function BookmarkButton({
  article,
  size = 'icon',
  variant = 'ghost',
  className,
}: {
  article: NewsItem
  size?: 'icon' | 'sm'
  variant?: 'ghost' | 'outline'
  className?: string
}) {
  const toggle = useBookmarkStore((s) => s.toggle)
  const isBookmarked = useBookmarkStore((s) => s.bookmarks.includes(article.id))
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={(e) => {
        e.stopPropagation()
        const nowAdded = toggle(article.id)
        toast.success(
          nowAdded ? 'Artikel disimpan!' : 'Bookmark dihapus.',
        )
      }}
      aria-label={isBookmarked ? 'Hapus dari bookmark' : 'Simpan ke bookmark'}
    >
      {isBookmarked ? (
        <BookmarkCheck className="h-4 w-4 text-emerald-600" />
      ) : (
        <Bookmark className="h-4 w-4" />
      )}
    </Button>
  )
}
