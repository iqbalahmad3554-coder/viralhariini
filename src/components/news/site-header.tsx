'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  Search,
  Menu,
  X,
  Radio,
  Bell,
  Flame,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  History,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { ModeToggle } from '@/components/mode-toggle'
import { categories } from '@/lib/news-data'
import { useSearchStore } from '@/lib/search-store'
import { useBookmarkStore } from '@/lib/reader-store'
import { BookmarkPanel } from '@/components/news/bookmark-panel'
import { HistoryDropdown } from '@/components/news/history-dropdown'

export function SiteHeader() {
  const [now, setNow] = React.useState<string>('')
  const toggleSearch = useSearchStore((s) => s.toggle)
  const bookmarkCount = useBookmarkStore((s) => s.bookmarks.length)

  React.useEffect(() => {
    const update = () => {
      const d = new Date()
      const opts: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Jakarta',
      }
      setNow(new Intl.DateTimeFormat('id-ID', opts).format(d) + ' WIB')
    }
    update()
    const t = setInterval(update, 60_000)
    return () => clearInterval(t)
  }, [])

  // Keyboard shortcut "/" untuk search
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault()
        toggleSearch()
      }
      // ESC handled by CommandDialog
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggleSearch])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      {/* Top utility bar */}
      <div className="hidden border-b border-border/50 bg-muted/40 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-medium">{now || 'Memuat waktu...'}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="transition-colors hover:text-foreground">
              Tentang Kami
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              Iklan
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              Karier
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              Kontak
            </Link>
            <span className="hidden text-emerald-600 dark:text-emerald-500 lg:inline">
              · Akses 100% gratis
            </span>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Buka menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SheetTitle className="sr-only">Navigasi</SheetTitle>
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-2 border-b px-4 py-4">
                <Logo size="sm" />
                <SheetClose asChild className="ml-auto">
                  <Button variant="ghost" size="icon" aria-label="Tutup menu">
                    <X className="h-4 w-4" />
                  </Button>
                </SheetClose>
              </div>
              <nav className="flex flex-col gap-1 p-3">
                {categories.map((c) => (
                  <SheetClose asChild key={c.name}>
                    <Link
                      href={c.href}
                      className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      <span className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${c.color}`} />
                        {c.name}
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link
                    href="#video"
                    className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    <span className="flex items-center gap-2">
                      <Radio className="h-4 w-4 text-red-600" /> Video
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="#semua"
                    className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-bold transition-colors hover:bg-muted"
                  >
                    <span className="flex items-center gap-2">
                      <Menu className="h-4 w-4 text-red-600" /> Semua Berita
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="#gratis"
                    className="flex items-center justify-between rounded-md bg-emerald-500/10 px-3 py-2.5 text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-500/15 dark:text-emerald-500"
                  >
                    <span className="flex items-center gap-2">
                      <Badge className="bg-emerald-600 px-1.5 py-0 text-[10px] text-white">
                        GRATIS
                      </Badge>
                      Akses Berita Gratis
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </SheetClose>
              </nav>
              <div className="mt-auto border-t p-3">
                <Button
                  className="w-full"
                  onClick={() => useSearchStore.getState().setOpen(true)}
                >
                  <Search className="mr-2 h-4 w-4" /> Cari Berita
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Logo />

        {/* Search (desktop) */}
        <div className="relative hidden flex-1 max-w-md md:block">
          <button
            onClick={toggleSearch}
            className="relative block h-9 w-full rounded-md border border-border bg-background text-left text-sm text-muted-foreground transition-colors hover:border-red-500/40 hover:bg-muted/40"
            aria-label="Buka pencarian"
          >
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            <span className="flex h-full items-center pl-9 pr-4">
              Cari berita viral hari ini...
            </span>
            <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] sm:inline-block">
              /
            </kbd>
          </button>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          {/* Mobile search */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Cari"
            onClick={toggleSearch}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* History dropdown */}
          <HistoryDropdown>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 hidden sm:inline-flex"
              aria-label="Riwayat baca"
            >
              <History className="h-4 w-4" />
            </Button>
          </HistoryDropdown>

          {/* Bookmark panel */}
          <BookmarkPanel>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9"
              aria-label={`Bookmark (${bookmarkCount} tersimpan)`}
            >
              <Bookmark className="h-4 w-4" />
              {bookmarkCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white">
                  {bookmarkCount}
                </span>
              )}
            </Button>
          </BookmarkPanel>

          {/* Live indicator */}
          <div className="hidden items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
              LIVE
            </span>
            <Radio className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
          </div>

          <ModeToggle />
        </div>
      </div>

      {/* Category nav (desktop) */}
      <nav className="hidden border-t border-border/60 bg-background md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-1 px-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 border-b-2 border-red-600 px-3 py-2.5 text-sm font-bold text-red-600 dark:text-red-400"
          >
            <Flame className="h-4 w-4" /> Terkini
          </Link>
          {categories.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="border-b-2 border-transparent px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:border-red-500/40 hover:text-red-600 dark:hover:text-red-400"
            >
              {c.name}
            </Link>
          ))}
          <Link
            href="#video"
            className="flex items-center gap-1.5 border-b-2 border-transparent px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:border-red-500/40 hover:text-red-600 dark:hover:text-red-400"
          >
            <Radio className="h-4 w-4" /> Video
          </Link>
          <Link
            href="#semua"
            className="flex items-center gap-1.5 border-b-2 border-transparent px-3 py-2.5 text-sm font-bold text-foreground transition-colors hover:border-red-500/40 hover:text-red-600 dark:hover:text-red-400"
          >
            <Menu className="h-4 w-4" /> Semua Berita
          </Link>
          <Link
            href="#gratis"
            className="flex items-center gap-1.5 border-b-2 border-emerald-500/60 bg-emerald-500/10 px-3 py-2.5 text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-500/15 dark:text-emerald-500"
          >
            <Badge className="bg-emerald-600 px-1.5 py-0 text-[10px] text-white hover:bg-emerald-700">
              GRATIS
            </Badge>
          </Link>
          <Link
            href="#poll"
            className="flex items-center gap-1.5 border-b-2 border-transparent px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:border-violet-500/40 hover:text-violet-600 dark:hover:text-violet-400"
          >
            <Bell className="h-4 w-4" /> Polling
          </Link>
          <Link
            href="#cuaca"
            className="flex items-center gap-1.5 border-b-2 border-transparent px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:border-sky-500/40 hover:text-sky-600 dark:hover:text-sky-400"
          >
            Cuaca
          </Link>
          <Link
            href="#shalat"
            className="flex items-center gap-1.5 border-b-2 border-transparent px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:border-emerald-500/40 hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            Jadwal Shalat
          </Link>
        </div>
      </nav>
    </header>
  )
}

// ============================================================
// Premium Logo
// ============================================================
function Logo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const dims = size === 'sm' ? 'h-8 w-8' : 'h-9 w-9'
  const textSize = size === 'sm' ? 'text-lg' : 'text-xl'
  return (
    <Link
      href="/"
      className="flex items-center gap-2"
      aria-label="ViralHariIni.id beranda"
    >
      <div
        className={`flex ${dims} items-center justify-center rounded-md bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 shadow-sm`}
      >
        <Flame className="h-5 w-5 text-white" />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`${textSize} font-extrabold tracking-tight`}>
          Viral<span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 bg-clip-text text-transparent">HariIni</span>
        </span>
        <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground sm:block">
          Berita Viral &middot; Terkini &middot; Terpercaya
        </span>
      </div>
    </Link>
  )
}
