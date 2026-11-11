'use client'

import * as React from 'react'
import {
  X,
  Clock,
  Eye,
  Share2,
  Bookmark,
  BookmarkCheck,
  Printer,
  ArrowLeft,
  Flame,
  Check,
  ChevronRight,
  Twitter,
  Facebook,
  Link as LinkIcon,
  MessageCircle,
  Send,
  Type,
  Minimize2,
  Maximize2,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Volume2,
  Square,
  Pause,
  Play,
  ThumbsUp as ThumbsUpFilled,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { NewsImage } from '@/components/news/news-image'
import { useArticleStore } from '@/lib/article-store'
import {
  getFullContent,
  getArticleSlug,
  allArticles,
  type NewsItem,
} from '@/lib/news-data'
import { toast } from 'sonner'
import {
  useBookmarkStore,
  useReactionStore,
  REACTIONS,
  getReactionBaseCount,
} from '@/lib/reader-store'
import { useHistoryStore } from '@/lib/search-store'
import { useTTS, useComments } from '@/hooks/use-reader-features'
import { formatDistanceToNow } from '@/lib/time'
import { cn } from '@/lib/utils'

const FONT_SIZES = [
  { id: 'sm', label: 'Kecil', className: 'text-sm sm:text-[15px]', leading: 'leading-relaxed' },
  { id: 'md', label: 'Sedang', className: 'text-base sm:text-[17px]', leading: 'leading-relaxed' },
  { id: 'lg', label: 'Besar', className: 'text-lg sm:text-xl', leading: 'leading-loose' },
] as const

const REACTION_EMOJI: Record<string, React.ElementType> = {
  like: ThumbsUp,
  love: Heart,
  wow: Flame,
  sad: ThumbsDown,
  angry: ThumbsDown,
}

export function ArticleReader() {
  const { active, closeArticle } = useArticleStore()
  const [history, setHistory] = React.useState<NewsItem[]>([])
  const [progress, setProgress] = React.useState(0)
  const [fontSize, setFontSize] = React.useState<'sm' | 'md' | 'lg'>('md')
  const [showFontPicker, setShowFontPicker] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const open = active !== null
  const item = active

  const toggleBookmark = useBookmarkStore((s) => s.toggle)
  const isBookmarked = useBookmarkStore((s) => s.bookmarks.includes(active?.id ?? ''))

  const setReaction = useReactionStore((s) => s.setReaction)
  const myReaction = useReactionStore((s) => s.reactions[active?.id ?? ''])

  const addHistory = useHistoryStore((s) => s.add)
  const tts = useTTS()
  const [commentAuthor, setCommentAuthor] = React.useState('')
  const [commentText, setCommentText] = React.useState('')
  const commentsHook = useComments(active?.id ?? '')

  // Track ke reading history saat artikel dibuka
  React.useEffect(() => {
    if (active) {
      addHistory(active.id)
    }
    // Hentikan TTS saat ganti artikel
    if (tts.speaking) {
      tts.stop()
    }
  }, [active?.id])

  // Reset saat reader ditutup
  React.useEffect(() => {
    if (!open) {
      setHistory([])
      setProgress(0)
      setFontSize('md')
      setShowFontPicker(false)
      setCommentText('')
      setCommentAuthor('')
      if (tts.speaking) {
        tts.stop()
      }
    }
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

  // Reset progress saat ganti artikel
  React.useEffect(() => {
    setProgress(0)
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0 })
    }
  }, [open, item?.id])

  const related = React.useMemo(() => {
    if (!item) return []
    return allArticles
      .filter((a) => a.id !== item.id && a.category === item.category)
      .slice(0, 4)
  }, [item])

  const handleOpenRelated = (r: NewsItem) => {
    if (item) setHistory((h) => [...h, item])
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
    // Build URL shareable ke halaman artikel dedicated
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    const slug = getArticleSlug(item)
    const shareUrl = `${baseUrl}/berita/${slug}`
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

  const handleOpenArticlePage = () => {
    if (!item) return
    const slug = getArticleSlug(item)
    closeArticle()
    window.open(`/berita/${slug}`, '_blank')
  }

  const handleBookmark = () => {
    if (!item) return
    const nowBookmarked = toggleBookmark(item.id)
    toast.success(
      nowBookmarked
        ? 'Artikel disimpan! Lihat di daftar bookmark Anda.'
        : 'Bookmark dihapus.',
    )
  }

  const handleReaction = (type: string) => {
    if (!item) return
    setReaction(item.id, type)
  }

  const fontClass = FONT_SIZES.find((f) => f.id === fontSize) ?? FONT_SIZES[1]

  return (
    <Dialog open={open} onOpenChange={(o) => !o && closeArticle()}>
      <DialogContent className="max-h-[100vh] max-w-3xl overflow-hidden border-border bg-background p-0 sm:rounded-2xl">
        <DialogTitle className="sr-only">
          {item?.title ?? 'Baca berita lengkap'}
        </DialogTitle>
        <DialogClose className="absolute right-3 top-3 z-30 rounded-full bg-background/80 p-1.5 shadow-sm backdrop-blur transition-colors hover:bg-muted">
          <X className="h-4 w-4" />
        </DialogClose>

        {/* Reading progress bar (top fixed in modal) */}
        {open && (
          <div className="absolute inset-x-0 top-0 z-30 h-1 bg-muted">
            <div
              className="h-full bg-gradient-to-r from-red-600 via-red-500 to-orange-500 transition-[width] duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {item && (
          <div
            ref={scrollRef}
            onScroll={(e) => {
              const el = e.currentTarget
              const scrollHeight = el.scrollHeight - el.clientHeight
              const pct = scrollHeight > 0 ? Math.min(100, (el.scrollTop / scrollHeight) * 100) : 0
              setProgress(Math.max(0, Math.min(100, pct)))
            }}
            className="max-h-screen overflow-y-auto"
          >
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
                  <Badge variant="secondary" className="bg-white/90 text-black hover:bg-white">
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

              {/* Toolbar (font size + TTS + bookmark + share) */}
              <div className="sticky top-0 z-10 -mx-4 mb-5 flex flex-wrap items-center gap-2 bg-background/85 px-4 py-2 backdrop-blur sm:-mx-6 sm:px-6">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Ukuran teks:
                </div>
                <div className="flex gap-1">
                  {FONT_SIZES.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFontSize(f.id)}
                      aria-label={`Ukuran teks ${f.label}`}
                      aria-pressed={fontSize === f.id}
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-md border text-xs font-medium transition-colors',
                        fontSize === f.id
                          ? 'border-red-600 bg-red-600 text-white'
                          : 'border-border bg-background hover:border-red-500/40 hover:text-red-600',
                      )}
                    >
                      <span className={cn('font-bold', f.id === 'sm' ? 'text-[10px]' : f.id === 'lg' ? 'text-sm' : 'text-xs')}>A</span>
                    </button>
                  ))}
                </div>

                {/* TTS control */}
                {tts.supported && (
                  <div className="flex items-center gap-1.5 border-l border-border pl-2">
                    {!tts.speaking ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 gap-1.5 px-2.5"
                        onClick={() => tts.speak(getFullContent(item))}
                        aria-label="Dengarkan artikel (text-to-speech)"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Dengarkan</span>
                      </Button>
                    ) : (
                      <>
                        {tts.paused ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 px-0 border-red-500/40 bg-red-500/5"
                            onClick={tts.resume}
                            aria-label="Lanjutkan audio"
                          >
                            <Play className="h-3.5 w-3.5 text-red-600" />
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 px-0 border-red-500/40 bg-red-500/5"
                            onClick={tts.pause}
                            aria-label="Jeda audio"
                          >
                            <Pause className="h-3.5 w-3.5 text-red-600" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 px-0 border-red-500/40 bg-red-500/5"
                          onClick={tts.stop}
                          aria-label="Hentikan audio"
                        >
                          <Square className="h-3 w-3 text-red-600" />
                        </Button>
                        <div className="hidden h-1 w-20 overflow-hidden rounded-full bg-muted sm:block">
                          <div
                            className="h-full bg-red-600 transition-[width] duration-300"
                            style={{ width: `${tts.progress}%` }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}

                <div className="ml-auto flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1.5 px-2.5"
                    onClick={handleBookmark}
                    aria-label="Simpan artikel ke bookmark"
                  >
                    {isBookmarked ? (
                      <>
                        <BookmarkCheck className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="hidden sm:inline text-emerald-700 dark:text-emerald-500">Tersimpan</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Simpan</span>
                      </>
                    )}
                  </Button>
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
                    className="h-8 w-8 px-0"
                    onClick={() => window.print()}
                    aria-label="Cetak artikel"
                  >
                    <Printer className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Paragraf utuh dengan ukuran teks terpilih + TTS highlight */}
              <div className={cn('space-y-4', fontClass.className, fontClass.leading)}>
                {getFullContent(item).map((para, i) => (
                  <p
                    key={i}
                    className={cn(
                      'transition-all duration-300',
                      tts.speaking && tts.currentPara === i
                        ? 'rounded-md bg-red-500/10 px-3 py-2 ring-2 ring-red-500/40'
                        : 'text-foreground/85',
                    )}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Reactions */}
              <ReactionBar
                articleId={item.id}
                onReaction={handleReaction}
                myReaction={myReaction}
              />

              {/* Komentar Pembaca */}
              <CommentsSection
                articleId={item.id}
                comments={commentsHook.comments}
                onAdd={commentsHook.addComment}
                onLike={commentsHook.toggleLike}
                commentAuthor={commentAuthor}
                setCommentAuthor={setCommentAuthor}
                commentText={commentText}
                setCommentText={setCommentText}
              />

              {/* Share row */}
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
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(item.title)}`}
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
                  href={`https://wa.me/?text=${encodeURIComponent(item.title)}`}
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
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {related.map((r) => (
                      <li key={r.id}>
                        <button
                          onClick={() => handleOpenRelated(r)}
                          className="group flex w-full items-start gap-3 rounded-xl border border-border bg-card p-3 text-left transition-all hover:border-red-500/40 hover:shadow-sm"
                        >
                          <div className="relative aspect-square w-14 shrink-0 sm:w-16">
                            <NewsImage
                              hue={r.imageHue}
                              category={r.category}
                              title={r.title}
                              imageUrl={r.imageUrl}
                              variant="compact"
                              className="h-full w-full rounded-lg"
                            />
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <h4 className="line-clamp-2 text-xs font-semibold leading-snug transition-colors group-hover:text-red-600 dark:group-hover:text-red-400 sm:text-sm">
                              {r.title}
                            </h4>
                            <p className="mt-1 text-[10px] text-muted-foreground sm:text-[11px]">
                              {r.author}
                            </p>
                          </div>
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-red-600" />
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
                  Setiap pagi pukul 06.00 WIB, langsung ke email Anda. Tanpa spam,
                  berhenti kapan saja.
                </p>
                <Button
                  asChild
                  size="sm"
                  className="mt-3 bg-red-600 text-white hover:bg-red-700"
                  onClick={closeArticle}
                >
                  <a href="#newsletter">Berlangganan Gratis</a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 ml-2"
                  onClick={handleOpenArticlePage}
                >
                  Buka halaman penuh
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

// ============================================================
// Reaction Bar (emoji reactions)
// ============================================================
function ReactionBar({
  articleId,
  onReaction,
  myReaction,
}: {
  articleId: string
  onReaction: (type: string) => void
  myReaction?: string
}) {
  return (
    <div className="mt-8 rounded-xl border border-border bg-muted/30 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-bold">
          <MessageCircle className="h-4 w-4 text-red-600" /> Reaksi pembaca
        </h3>
        <span className="text-[11px] text-muted-foreground">
          Klik untuk memberi reaksi
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {REACTIONS.map((r) => {
          const count = getReactionBaseCount(articleId, r.id)
          const isMine = myReaction === r.id
          return (
            <button
              key={r.id}
              onClick={() => onReaction(r.id)}
              aria-label={`Reaksi ${r.label}`}
              aria-pressed={isMine}
              className={cn(
                'flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all',
                isMine
                  ? 'border-red-600 bg-red-600 text-white shadow-sm scale-105'
                  : 'border-border bg-background hover:border-red-500/40 hover:bg-muted',
              )}
            >
              <span className="text-base">{r.emoji}</span>
              <span>{r.label}</span>
              <span
                className={cn(
                  'rounded-full px-1.5 py-0 text-[10px] font-bold tabular-nums',
                  isMine ? 'bg-white/20' : 'bg-muted',
                )}
              >
                {(count + (isMine ? 1 : 0)).toLocaleString('id-ID')}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ============================================================
// Comments Section
// ============================================================
interface CommentItem {
  id: string
  articleId: string
  author: string
  text: string
  ts: number
  likes: number
  liked?: boolean
}

function CommentsSection({
  articleId,
  comments,
  onAdd,
  onLike,
  commentAuthor,
  setCommentAuthor,
  commentText,
  setCommentText,
}: {
  articleId: string
  comments: CommentItem[]
  onAdd: (author: string, text: string) => void
  onLike: (commentId: string) => void
  commentAuthor: string
  setCommentAuthor: (v: string) => void
  commentText: string
  setCommentText: (v: string) => void
}) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim()) {
      toast.error('Tulis komentar dulu ya.')
      return
    }
    onAdd(commentAuthor.trim(), commentText.trim())
    setCommentText('')
    toast.success('Komentar Anda terkirim!')
  }

  return (
    <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-bold">
          <MessageCircle className="h-4 w-4 text-red-600" /> Komentar Pembaca
        </h3>
        <span className="text-[11px] text-muted-foreground">
          {comments.length} komentar · gratis, tanpa login
        </span>
      </div>

      {/* Form komentar */}
      <form onSubmit={handleSubmit} className="mb-5 space-y-2">
        <Input
          type="text"
          placeholder="Nama (opsional)"
          value={commentAuthor}
          onChange={(e) => setCommentAuthor(e.target.value)}
          className="h-9 text-sm"
          aria-label="Nama Anda (opsional)"
        />
        <div className="flex gap-2">
          <textarea
            placeholder="Tulis komentar Anda..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="min-h-[60px] flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            aria-label="Komentar Anda"
          />
          <Button
            type="submit"
            size="sm"
            className="self-end bg-red-600 text-white hover:bg-red-700"
            aria-label="Kirim komentar"
          >
            <Send className="h-3.5 w-3.5" />
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground">
          Komentar disimpan di perangkat Anda. Hindari SARA, kata-kata kasar,
          dan hoaks.
        </p>
      </form>

      {/* List komentar */}
      <ul className="space-y-3">
        {comments.map((c) => (
          <li key={c.id} className="rounded-lg border border-border bg-card p-3">
            <div className="mb-1 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500/15 text-xs font-bold text-red-600">
                  {c.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-semibold">{c.author}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {formatDistanceToNow(c.ts)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onLike(c.id)}
                aria-label="Suka komentar ini"
                className={cn(
                  'flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium transition-colors',
                  c.liked
                    ? 'border-red-600 bg-red-600 text-white'
                    : 'border-border bg-background text-muted-foreground hover:border-red-500/40 hover:text-red-600',
                )}
              >
                <ThumbsUp className="h-2.5 w-2.5" /> {c.likes}
              </button>
            </div>
            <p className="text-sm text-foreground/85">{c.text}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
