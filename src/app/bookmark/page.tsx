'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  Bookmark,
  BookmarkCheck,
  Trash2,
  Inbox,
  ArrowLeft,
  Eye,
  Clock,
  Flame,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { NewsImage } from '@/components/news/news-image'
import { SiteHeader } from '@/components/news/site-header'
import { BreakingTicker } from '@/components/news/breaking-ticker'
import { EconomicTicker } from '@/components/news/economic-ticker'
import { SiteFooter } from '@/components/news/site-footer'
import { useBookmarkStore } from '@/lib/reader-store'
import { getBookmarkedArticles } from '@/lib/search-store'
import { getArticleSlug, type NewsItem } from '@/lib/news-data'
import { toast } from 'sonner'

export default function BookmarkPage() {
  const bookmarkCount = useBookmarkStore((s) => s.bookmarks.length)
  const toggle = useBookmarkStore((s) => s.toggle)
  const [version, setVersion] = React.useState(0)

  React.useEffect(() => {
    setVersion((v) => v + 1)
  }, [bookmarkCount])

  const bookmarked = React.useMemo(
    () => getBookmarkedArticles(),
    [version],
  )

  const handleRemove = (item: NewsItem) => {
    toggle(item.id)
    toast.success('Bookmark dihapus.')
  }

  const handleClearAll = () => {
    if (confirm('Hapus semua bookmark? Tidak bisa dibatalkan.')) {
      bookmarked.forEach((b) => toggle(b.id))
      toast.success('Semua bookmark dihapus.')
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <BreakingTicker />
      <EconomicTicker />

      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-8">
          {/* Header */}
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b-2 border-emerald-600 pb-3">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs">
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Beranda
                </Link>
                <span className="text-muted-foreground">/</span>
                <span className="font-medium text-foreground">Bookmark</span>
              </div>
              <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                <BookmarkCheck className="h-7 w-7 text-emerald-600" /> Bookmark Saya
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {bookmarkCount} artikel tersimpan · tersedia offline di perangkat Anda
              </p>
            </div>
            <div className="flex items-center gap-2">
              {bookmarked.length > 0 && (
                <Button variant="outline" size="sm" onClick={handleClearAll}>
                  <Trash2 className="mr-2 h-3.5 w-3.5" /> Hapus Semua
                </Button>
              )}
              <Button asChild variant="ghost" size="sm">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-3.5 w-3.5" /> Kembali ke Beranda
                </Link>
              </Button>
            </div>
          </div>

          {/* Empty state */}
          {bookmarked.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-card py-16 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                <Inbox className="h-10 w-10" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Belum ada bookmark</h2>
                <p className="mt-1 max-w-md text-sm text-muted-foreground">
                  Klik ikon <Bookmark className="inline h-3.5 w-3.5" /> pada artikel
                  yang ingin Anda simpan. Semua tersimpan di perangkat Anda,
                  tidak di server kami.
                </p>
              </div>
              <Button asChild>
                <Link href="/">
                  <Flame className="mr-2 h-4 w-4" /> Jelajahi Berita
                </Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {bookmarked.map((item) => (
                  <article
                    key={item.id}
                    className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <Link
                      href={`/berita/${getArticleSlug(item)}`}
                      className="block"
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
                          <Badge className="absolute right-2 top-2 gap-1 bg-red-600 text-white">
                            <Flame className="h-3 w-3" /> Viral
                          </Badge>
                        )}
                      </div>
                    </Link>
                    <div className="flex flex-1 flex-col p-4">
                      <Badge variant="secondary" className="mb-2 w-fit text-[10px] uppercase tracking-wider">
                        {item.category}
                      </Badge>
                      <Link
                        href={`/berita/${getArticleSlug(item)}`}
                        className="block"
                      >
                        <h3 className="mb-2 line-clamp-2 text-base font-bold leading-snug transition-colors group-hover:text-red-600 dark:group-hover:text-red-400">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="mb-3 line-clamp-2 flex-1 text-sm text-muted-foreground">
                        {item.excerpt}
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
                          onClick={() => handleRemove(item)}
                          className="flex items-center gap-1 text-emerald-600 transition-colors hover:text-red-600"
                          aria-label="Hapus bookmark"
                        >
                          <BookmarkCheck className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Tersimpan</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Footer info */}
              <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-50/40 p-4 dark:bg-emerald-950/15">
                <p className="text-sm text-foreground/85">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-500">
                    <Check className="mr-1 inline h-3.5 w-3.5" /> Akses offline:
                  </span>{' '}
                  Semua artikel yang Anda bookmark tersimpan di perangkat ini
                  (browser localStorage). Tidak perlu login, tidak ada server
                  yang menyimpan data Anda.
                </p>
              </div>
            </>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
