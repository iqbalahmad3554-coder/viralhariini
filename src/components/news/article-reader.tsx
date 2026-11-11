'use client'

import * as React from 'react'
import {
  X,
  Clock,
  Eye,
  Share2,
  Bookmark,
  Printer,
  ArrowLeft,
  Flame,
  Check,
  ChevronRight,
  Twitter,
  Facebook,
  Link as LinkIcon,
  MessageCircle,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { NewsImage } from '@/components/news/news-image'
import { useArticleStore } from '@/lib/article-store'
import { getFullContent, allArticles, type NewsItem } from '@/lib/news-data'
import { toast } from 'sonner'

export function ArticleReader() {
  const { active, closeArticle } = useArticleStore()

  // Untuk navigasi antar artikel di dalam reader
  const [history, setHistory] = React.useState<NewsItem[]>([])

  const open = active !== null
  const item = active

  // Reset history saat reader ditutup
  React.useEffect(() => {
    if (!open) setHistory([])
  }, [open])

  // Lock body scroll saat reader terbuka
  React.useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Berita terkait (kategori sama, exclude current, ambil 3)
  const related = React.useMemo(() => {
    if (!item) return []
    return allArticles
      .filter((a) => a.id !== item.id && a.category === item.category)
      .slice(0, 3)
  }, [item])

  const handleOpenRelated = (r: NewsItem) => {
    if (item) setHistory((h) => [...h, item])
    // re-open reader dengan artikel baru
    useArticleStore.getState().openArticle(r)
  }

  const handleBack = () => {
    if (history.length === 0) {
      closeArticle()
      return
    }
    const prev = history[history.length - 1]
    setHistory((h) => h.slice(0, -1))
    useArticleStore.getState().openArticle(prev)
  }

  const handleShare = async () => {
    if (!item) return
    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.excerpt,
          url: shareUrl,
        })
      } catch {
        /* user cancelled */
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl)
        toast.success('Link artikel disalin ke clipboard!')
      } catch {
        toast.error('Gagal menyalin link. Salin manual ya.')
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && closeArticle()}>
      <DialogContent className="max-h-[100vh] max-w-3xl overflow-hidden border-border bg-background p-0 sm:rounded-2xl">
        <DialogTitle className="sr-only">
          {item?.title ?? 'Baca berita lengkap'}
        </DialogTitle>
        <DialogClose className="absolute right-3 top-3 z-30 rounded-full bg-background/80 p-1.5 shadow-sm backdrop-blur transition-colors hover:bg-muted">
          <X className="h-4 w-4" />
        </DialogClose>

        {item && (
          <div className="max-h-screen overflow-y-auto">
            {/* Hero image */}
            <div className="relative aspect-[16/9] w-full bg-muted">
              <NewsImage
                hue={item.imageHue}
                category={item.category}
                title={item.title}
                imageUrl={item.imageUrl}
                variant="large"
                className="h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Back button */}
              {history.length > 0 && (
                <button
                  onClick={handleBack}
                  className="absolute left-3 top-3 z-20 flex items-center gap-1 rounded-full bg-background/85 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur transition-colors hover:bg-background"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Kembali
                </button>
              )}

              {/* Category badge */}
              <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
                <Badge className="bg-red-600 text-white hover:bg-red-700">
                  <Flame className="mr-1 h-3 w-3" /> {item.category}
                </Badge>
                {item.trending && (
                  <Badge
                    variant="secondary"
                    className="bg-white/90 text-black hover:bg-white"
                  >
                    Trending
                  </Badge>
                )}
              </div>
            </div>

            {/* Konten */}
            <article className="px-4 py-5 sm:px-6 sm:py-8">
              <h1 className="mb-3 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
                {item.title}
              </h1>

              {/* Meta */}
              <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border pb-4 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {item.author}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {item.publishedAt}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" /> {item.views} dibaca
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {item.readTime} menit baca
                </span>
                <Badge className="bg-emerald-600 text-white hover:bg-emerald-700">
                  <Check className="mr-1 h-3 w-3" /> GRATIS
                </Badge>
              </div>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="mb-5 flex flex-wrap gap-1.5">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              {/* Paragraf utuh */}
              <div className="prose-custom space-y-4">
                {getFullContent(item).map((para, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? 'text-base font-medium leading-relaxed text-foreground sm:text-lg'
                        : 'text-sm leading-relaxed text-foreground/85 sm:text-base'
                    }
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Share + actions */}
              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border pt-5">
                <span className="mr-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                  <Share2 className="h-3.5 w-3.5" /> Bagikan:
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5 px-2.5"
                  onClick={handleShare}
                >
                  <LinkIcon className="h-3.5 w-3.5" /> Salin Link
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5 px-2.5"
                  onClick={() => toast.success('Berita disimpan!')}
                >
                  <Bookmark className="h-3.5 w-3.5" /> Simpan
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5 px-2.5"
                  onClick={() => window.print()}
                >
                  <Printer className="h-3.5 w-3.5" /> Cetak
                </Button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    item.title,
                  )}`}
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
                  href={`https://wa.me/?text=${encodeURIComponent(
                    item.title,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Bagikan ke WhatsApp"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-emerald-500 hover:text-emerald-600"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Banner gratis */}
              <div className="mt-6 flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-50/60 p-4 dark:bg-emerald-950/20">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <Check className="h-4 w-4" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-emerald-700 dark:text-emerald-500">
                    Artikel ini 100% Gratis
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Tidak ada paywall, tidak ada batas baca. ViralHariIni.id
                    percaya publik berhak membaca berita tanpa terhalang biaya.
                  </p>
                </div>
              </div>

              {/* Berita terkait */}
              {related.length > 0 && (
                <div className="mt-8">
                  <div className="mb-3 flex items-center justify-between border-b-2 border-red-600 pb-2">
                    <h3 className="flex items-center gap-2 text-base font-extrabold tracking-tight sm:text-lg">
                      <Flame className="h-4 w-4 text-red-600" /> Berita Terkait
                    </h3>
                    <Badge variant="secondary" className="text-[10px]">
                      {item.category}
                    </Badge>
                  </div>
                  <ul className="space-y-2">
                    {related.map((r) => (
                      <li key={r.id}>
                        <button
                          onClick={() => handleOpenRelated(r)}
                          className="group flex w-full items-start gap-3 rounded-xl border border-border bg-card p-3 text-left transition-all hover:border-red-500/40 hover:shadow-sm"
                        >
                          <div className="relative aspect-square w-16 shrink-0 sm:w-20">
                            <NewsImage
                              hue={r.imageHue}
                              category={r.category}
                              title={r.title}
                              imageUrl={r.imageUrl}
                              variant="compact"
                              className="h-full w-full rounded-lg"
                            />
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col justify-center">
                            <h4 className="line-clamp-2 text-sm font-semibold leading-snug transition-colors group-hover:text-red-600 dark:group-hover:text-red-400">
                              {r.title}
                            </h4>
                            <p className="mt-1 text-[11px] text-muted-foreground">
                              {r.author} · {r.publishedAt}
                            </p>
                          </div>
                          <ChevronRight className="mt-1 h-4 w-4 shrink-0 self-center text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA langganan */}
              <div className="mt-8 rounded-xl border border-border bg-gradient-to-br from-red-500/5 to-rose-500/5 p-5 text-center">
                <p className="text-sm font-semibold text-foreground">
                  Suka berita ini? Berlangganan newsletter harian gratis kami
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Setiap pagi pukul 06.00 WIB, langsung ke email Anda. Tanpa
                  spam, berhenti kapan saja.
                </p>
                <Button
                  asChild
                  size="sm"
                  className="mt-3 bg-red-600 text-white hover:bg-red-700"
                  onClick={closeArticle}
                >
                  <a href="#newsletter">Berlangganan Gratis</a>
                </Button>
              </div>

              <p className="mt-6 text-center text-[11px] text-muted-foreground">
                &copy; {new Date().getFullYear()} ViralHariIni.id · Disajikan
                gratis untuk publik
              </p>
            </article>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
