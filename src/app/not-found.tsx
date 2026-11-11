'use client'

import Link from 'next/link'
import { Flame, Search, ArrowLeft, Frown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSearchStore } from '@/lib/search-store'

export default function NotFound() {
  const openSearch = useSearchStore((s) => s.setOpen)

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-muted/30 to-background">
      <header className="border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 shadow-sm">
              <Flame className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              Viral<span className="text-red-600">HariIni</span>
            </span>
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Beranda
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10 text-red-600">
          <Frown className="h-12 w-12" />
        </div>

        <p className="mb-2 text-7xl font-extrabold tracking-tighter text-red-600 dark:text-red-400 sm:text-8xl">
          404
        </p>
        <h1 className="mb-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Halaman Tidak Ditemukan
        </h1>
        <p className="mb-6 max-w-md text-sm text-muted-foreground sm:text-base">
          Maaf, halaman yang Anda cari tidak ada atau sudah dipindahkan.
          Mungkin artikelnya sudah expired, atau URL salah ketik. Coba cari
          berita yang Anda butuhkan lewat pencarian.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">
              <Flame className="mr-2 h-4 w-4" /> Ke Beranda
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => openSearch(true)}
          >
            <Search className="mr-2 h-4 w-4" /> Cari Berita
          </Button>
        </div>

        <div className="mt-10 grid w-full max-w-md gap-2 text-left text-xs text-muted-foreground">
          <p className="font-semibold uppercase tracking-wider">Saran:</p>
          <ul className="grid gap-1">
            <li>
              • Cek penulisan URL atau ejaan
            </li>
            <li>
              • Kembali ke <Link href="/" className="text-red-600 hover:underline">beranda</Link> dan browse dari sana
            </li>
            <li>
              • Gunakan <button onClick={() => openSearch(true)} className="text-red-600 hover:underline">pencarian</button> untuk menemukan artikel
            </li>
          </ul>
        </div>
      </main>

      <footer className="border-t border-border bg-muted/30 py-4 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} ViralHariIni.id · Disajikan gratis untuk publik
      </footer>
    </div>
  )
}
