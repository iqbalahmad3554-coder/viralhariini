import Link from 'next/link'
import { SiteHeader } from '@/components/news/site-header'
import { SiteFooter } from '@/components/news/site-footer'

// Kerangka halaman statis (trust pages): header + konten + footer konsisten
// dengan halaman lain, plus breadcrumb sederhana untuk navigasi & SEO.
export function StaticPageShell({
  label,
  title,
  intro,
  children,
}: {
  label: string
  title: string
  intro: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
          <nav
            aria-label="Breadcrumb"
            className="mb-4 text-xs text-muted-foreground"
          >
            <Link href="/" className="hover:text-foreground">
              Beranda
            </Link>
            <span className="mx-1.5">/</span>
            <span className="font-medium text-foreground/80">{label}</span>
          </nav>

          <header>
            <p className="text-sm font-bold uppercase tracking-widest text-red-600">
              {label}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {intro}
            </p>
          </header>

          <div className="mt-10 space-y-10">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

// Bagian konten standar: judul + paragraf, opsional id anchor untuk footer.
export function Section({
  id,
  title,
  children,
}: {
  id?: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="border-b-2 border-red-600 pb-2 text-xl font-extrabold tracking-tight sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-base leading-relaxed text-foreground/85">
        {children}
      </div>
    </section>
  )
}

// Daftar poin rata kiri (satu baris per butir) untuk halaman statis.
export function Points({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-foreground/85">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}
