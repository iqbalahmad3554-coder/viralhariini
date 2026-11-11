'use client'

import Link from 'next/link'
import { Flame, Facebook, Twitter, Instagram, Youtube, Linkedin, Rss } from 'lucide-react'
import { categories } from '@/lib/news-data'

const footerSections = [
  {
    title: 'Rubrik',
    links: [
      { name: 'Politik', href: '#politik' },
      { name: 'Ekonomi', href: '#ekonomi' },
      { name: 'Teknologi', href: '#teknologi' },
      { name: 'Internasional', href: '#internasional' },
      { name: 'Olahraga', href: '#olahraga' },
      { name: 'Hukum & Kriminal', href: '#hukum' },
    ],
  },
  {
    title: 'Perusahaan',
    links: [
      { name: 'Tentang Kami', href: '#' },
      { name: 'Redaksi', href: '#' },
      { name: 'Kode Etik Jurnalistik', href: '#' },
      { name: 'Karier', href: '#' },
      { name: 'Hubungi Kami', href: '#' },
      { name: 'Pasang Iklan', href: '#' },
    ],
  },
  {
    title: 'Layanan',
    links: [
      { name: 'Newsletter Harian', href: '#newsletter' },
      { name: 'Notifikasi Push', href: '#' },
      { name: 'RSS Feed', href: '/feed.xml' },
      { name: 'Peta Situs', href: '/sitemap.xml' },
      { name: 'Baca Artikel Acak', href: '/api/acak' },
      { name: 'Aplikasi Mobile', href: '#' },
      { name: 'Laporan Tip', href: '#' },
    ],
  },
  {
    title: 'Fitur',
    links: [
      { name: 'Bookmark Saya', href: '/bookmark' },
      { name: 'Zodiak Hari Ini', href: '/#zodiak' },
      { name: 'Pada Hari Ini', href: '/#on-this-day' },
      { name: 'Cuaca', href: '/#cuaca' },
      { name: 'Jadwal Shalat', href: '/#shalat' },
      { name: 'Pasar Ekonomi', href: '/' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Kebijakan Privasi', href: '#' },
      { name: 'Syarat & Ketentuan', href: '#' },
      { name: 'Disclaimer', href: '#' },
      { name: 'Pedoman Media Siber', href: '#' },
      { name: 'Hak Jawab', href: '#' },
      { name: 'Cookie Policy', href: '#' },
    ],
  },
]

const socials = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter / X', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'RSS', icon: Rss, href: '/feed.xml' },
]

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Brand & socials */}
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-red-600">
                <Flame className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                Viral<span className="text-red-600">HariIni</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              ViralHariIni.id adalah portal berita viral terkini yang
              menyajikan kabar paling ramai dibicarakan di Indonesia —
              dari politik, ekonomi, teknologi, hingga olahraga dan
              internasional. Berkomitmen pada jurnalisme akurat, cepat,
              dan anti-clickbait.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-red-500 hover:bg-red-600 hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-foreground">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-red-600 dark:hover:text-red-400"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tag kategori */}
        <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
          {categories.map((c) => (
            <Link
              key={c.name}
              href={c.href}
              className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-red-500/50 hover:text-red-600"
            >
              #{c.name}
            </Link>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} ViralHariIni.id. Hak cipta
            dilindungi. Dilarang mengutip sebagian atau seluruh isi tanpa izin.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>Tahun 2026</span>
            <span className="hidden sm:inline">·</span>
            <span>ISSN 2087-XXXX</span>
            <span className="hidden sm:inline">·</span>
            <span>Diperbarui tiap menit</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
