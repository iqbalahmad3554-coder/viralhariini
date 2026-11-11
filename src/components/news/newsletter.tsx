'use client'

import * as React from 'react'
import { Bell, Mail, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export function Newsletter() {
  const [email, setEmail] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error('Masukkan email yang valid.')
      return
    }
    setSubmitted(true)
    toast.success('Berlangganan berhasil! Cek email Anda untuk konfirmasi.')
  }

  return (
    <section
      id="newsletter"
      className="scroll-mt-32 bg-gradient-to-br from-red-700 via-red-600 to-rose-700 py-12 text-white"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="mb-3 flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
            <Bell className="h-3.5 w-3.5" /> Gratis Selamanya
          </div>
          <h2 className="mb-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            Jangan Lewatkan Berita Viral Hari Ini
          </h2>
          <p className="max-w-lg text-sm text-white/85 sm:text-base">
            Berlangganan newsletter harian kami. Setiap pagi pukul 06.00 WIB,
            Anda akan menerima rangkuman 5 berita paling viral yang sedang
            ramai dibicarakan — ringkas, akurat, anti-clickbait.
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/90">
            {[
              '100% gratis — tanpa biaya',
              'Tanpa spam',
              'Berhenti kapan saja',
              'Lebih dari 320 rb pelanggan',
            ].map((f) => (
              <li key={f} className="flex items-center gap-1.5">
                <Check className="h-4 w-4" /> {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900">
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950">
                <Check className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Terima kasih sudah berlangganan!
              </h3>
              <p className="text-sm text-muted-foreground">
                Konfirmasi telah dikirim ke <span className="font-semibold">{email}</span>.
                Periksa folder masuk Anda.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSubmitted(false)
                  setEmail('')
                }}
              >
                Daftar dengan email lain
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <label
                htmlFor="newsletter-email"
                className="block text-sm font-semibold text-zinc-900 dark:text-white"
              >
                Email Anda
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 pl-10"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-12 w-full bg-red-600 text-white hover:bg-red-700"
              >
                <Bell className="mr-2 h-4 w-4" /> Berlangganan Gratis
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Dengan berlangganan, Anda menyetujui{' '}
                <a href="#" className="underline hover:text-foreground">
                  Kebijakan Privasi
                </a>{' '}
                kami.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
