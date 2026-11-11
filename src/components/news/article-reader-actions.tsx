'use client'

import * as React from 'react'
import { Share2, Bookmark, BookmarkCheck, Printer, Twitter, Facebook, MessageCircle, Link as LinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBookmarkStore } from '@/lib/reader-store'
import { useHistoryStore } from '@/lib/search-store'
import { toast } from 'sonner'
import type { NewsItem } from '@/lib/news-data'

export function ArticleReaderActions({ article }: { article: NewsItem }) {
  const toggle = useBookmarkStore((s) => s.toggle)
  const isBookmarked = useBookmarkStore((s) => s.bookmarks.includes(article.id))
  const addHistory = useHistoryStore((s) => s.add)

  // Track ke history sekali saat halaman dibuka
  React.useEffect(() => {
    addHistory(article.id)
  }, [article.id])

  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: shareUrl,
        })
      } catch {
        /* cancelled */
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl)
        toast.success('Link artikel disalin ke clipboard!')
      } catch {
        toast.error('Gagal menyalin link.')
      }
    }
  }

  const handleBookmark = () => {
    const nowAdded = toggle(article.id)
    toast.success(nowAdded ? 'Artikel disimpan!' : 'Bookmark dihapus.')
  }

  return (
    <div className="flex items-center gap-1.5">
      <Button
        variant="outline"
        size="sm"
        className="h-8 gap-1.5 px-2.5"
        onClick={handleShare}
      >
        <Share2 className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Bagikan</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="h-8 gap-1.5 px-2.5"
        onClick={handleBookmark}
        aria-label="Simpan ke bookmark"
      >
        {isBookmarked ? (
          <BookmarkCheck className="h-3.5 w-3.5 text-emerald-600" />
        ) : (
          <Bookmark className="h-3.5 w-3.5" />
        )}
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="h-8 w-8 px-0"
        onClick={() => window.print()}
        aria-label="Cetak"
      >
        <Printer className="h-3.5 w-3.5" />
      </Button>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Bagikan ke Twitter"
        className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-sky-500 hover:text-sky-600"
      >
        <Twitter className="h-3.5 w-3.5" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          typeof window !== 'undefined' ? window.location.href : '',
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Bagikan ke Facebook"
        className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-blue-600 hover:text-blue-700"
      >
        <Facebook className="h-3.5 w-3.5" />
      </a>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(article.title)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Bagikan ke WhatsApp"
        className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-emerald-500 hover:text-emerald-600"
      >
        <MessageCircle className="h-3.5 w-3.5" />
      </a>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 px-0"
        onClick={handleShare}
        aria-label="Salin link"
      >
        <LinkIcon className="h-3.5 w-3.5" />
      </Button>
    </div>
  )
}
