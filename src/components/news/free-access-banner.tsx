'use client'

import { Check, Gift, Sparkles, Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const features = [
  'Akses tanpa dinding berbayar (no paywall)',
  'Baca & tonton video berita gratis selamanya',
  'Tanpa registrasi wajib — langsung baca',
  'Update breaking news tiap menit',
  'Hindari clickbait, sumber jelas & terverifikasi',
  'Berita nasional & internasional dalam satu tempat',
]

export function FreeAccessBanner() {
  return (
    <section
      id="gratis"
      className="scroll-mt-32 border-y border-emerald-500/30 bg-gradient-to-br from-emerald-50 via-background to-teal-50 py-8 dark:from-emerald-950/20 dark:to-teal-950/20"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-6 lg:grid-cols-3">
          {/* Kiri: judul */}
          <div className="lg:col-span-1">
            <Badge className="mb-3 gap-1 bg-emerald-600 text-white hover:bg-emerald-700">
              <Gift className="h-3.5 w-3.5" /> 100% GRATIS
            </Badge>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Berita Viral,{' '}
              <span className="text-emerald-600 dark:text-emerald-500">
                Akses Gratis Selamanya
              </span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Kami percaya publik Indonesia berhak membaca berita tanpa
              terhalang paywall. ViralHariIni.id gratis — tanpa biaya
              berlangganan, tanpa iklan mengganggu.
            </p>
          </div>

          {/* Kanan: grid fitur */}
          <div className="lg:col-span-2">
            <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {features.map((f, i) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-sm"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="font-medium leading-snug text-foreground/85">
                    {f}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap items-center gap-3 rounded-lg border border-emerald-500/30 bg-background/60 p-3 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-500">
                <Zap className="h-3.5 w-3.5" /> Komitmen kami
              </span>
              <span className="text-muted-foreground">
                Tidak ada biaya tersembunyi, tidak ada langganan paksa, dan
                Anda bisa berhenti kapan saja — atau bahkan tidak pernah mulai
                berlangganan.
              </span>
              <Badge
                variant="outline"
                className="ml-auto gap-1 border-emerald-500/40 text-emerald-700 dark:text-emerald-500"
              >
                <Sparkles className="h-3 w-3" /> Sejak 2026
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
