'use client'

import Link from 'next/link'
import { Flame, Facebook, Twitter, Instagram, Youtube, Rss, MessageCircle, Send } from 'lucide-react'
import { categories } from '@/lib/news-data'
import { activeSocialLinks, type SocialKey } from '@/lib/site'

const footerSections = [
  {
    title: 'Rubrik',
    links: [
      { name: 'Viral', href: '/kategori/viral' },
      { name: 'Politik', href: '/kategori/politik' },
      { name: 'Ekonomi', href: '/kategori/ekonomi' },
      { name: 'Teknologi', href: '/kategori/teknologi' },
      { name: 'Internasional', href: '/kategori/internasional' },
      { name: 'Olahraga', href: '/kategori/olahraga' },
      { name: 'Hukum & Kriminal', href: '/kategori/hukum' },
      { name: 'Lingkungan', href: '/kategori/lingkungan' },
    ],
  },
  {
    title: 'Perusahaan',
    links: [
      { name: 'Tentang Kami', href: '/tentang-kami' },
      { name: 'Redaksi', href: '/kontak' },
      { name: 'Kode Etik Jurnalistik', href: '/tentang-kami#kode-etik' },
      { name: 'Karier', href: '/tentang-kami#karier' },
      { name: 'Hubungi Kami', href: '/kontak' },
      { name: 'Pasang Iklan', href: '/kontak' },
    ],
  },
  {
    title: 'Layanan',
    links: [
      { name: 'Newsletter Harian', href: '/#newsletter' },
      { name: 'Notifikasi Push', href: '/tentang-kami#aplikasi' },
      { name: 'RSS Feed', href: '/feed.xml' },
      { name: 'Peta Situs', href: '/sitemap.xml' },
      { name: 'Baca Artikel Acak', href: '/api/acak' },
      { name: 'Aplikasi Mobile', href: '/tentang-kami#aplikasi' },
      { name: 'Laporan Tip', href: '/kontak' },
    ],
  },
  {
    title: 'Fitur',
    links: [
      { name: 'Bookmark Saya', href: '/bookmark' },
      { name: 'Zodiak Hari Ini', href: '/zodiak' },
      { name: 'Pada Hari Ini', href: '/#on-this-day' },
      { name: 'Cuaca', href: '/#cuaca' },
      { name: 'Jadwal Shalat', href: '/#shalat' },
      { name: 'Pasar Ekonomi', href: '/' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Kebijakan Privasi', href: '/kebijakan-privasi' },
      { name: 'Syarat & Ketentuan', href: '/syarat-ketentuan' },
      { name: 'Disclaimer', href: '/disclaimer' },
      { name: 'Pedoman Media Siber', href: '/tentang-kami#pedoman-media-siber' },
      { name: 'Hak Jawab', href: '/kontak' },
      { name: 'Cookie Policy', href: '/kebijakan-privasi#cookie' },
    ],
  },
]

// Tombol follow sosial — otomatis dari SOCIAL_LINKS (src/lib/site.ts).
// Set env NEXT_PUBLIC_WA_CHANNEL, NEXT_PUBLIC_TG_CHANNEL, dll. di Vercel
// dan tombol langsung muncul tanpa deploy ulang.
const socialConfig: Record<SocialKey, { label: string; icon: typeof Send }> = {
  whatsapp: { label: 'WhatsApp Channel', icon: MessageCircle },
  telegram: { label: 'Telegram', icon: Send },
  facebook: { label: 'Facebook', icon: Facebook },
  twitter: { label: 'Twitter / X', icon: Twitter },
  instagram: { label: 'Instagram', icon: Instagram },
  youtube: { label: 'YouTube', icon: Youtube },
}

const socials = [
  ...activeSocialLinks().map(({ key, href }) => ({
    ...socialConfig[key],
    href,
    external: true,
  })),
  { label: 'RSS', icon: Rss, href: '/feed.xml', external: false },
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
                  key={s.label}
                  href={s.href}
                  aria-label={`Ikuti kami di ${s.label}`}
                  title={s.label}
                  {...(s.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
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
