'use client'

import * as React from 'react'
import { Sparkles, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface ZodiacSign {
  name: string
  symbol: string
  date: string
  element: 'Api' | 'Tanah' | 'Udara' | 'Air'
  prediction: string
  luckyNumber: number
  luckyColor: string
  colorHex: string
  mood: string
}

const zodiacs: ZodiacSign[] = [
  {
    name: 'Aries',
    symbol: '♈',
    date: '21 Mar - 19 Apr',
    element: 'Api',
    prediction: 'Energi membara, waktu yang tepat untuk memulai proyek baru. Hindari sifat impulsif dalam mengambil keputusan besar.',
    luckyNumber: 7,
    luckyColor: 'Merah',
    colorHex: '#dc2626',
    mood: 'Bersemangat',
  },
  {
    name: 'Taurus',
    symbol: '♉',
    date: '20 Apr - 20 Mei',
    element: 'Tanah',
    prediction: 'Stabilitas finansial menguntungkan. Waktu yang baik untuk investasi jangka panjang, tapi jangan terlalu keras kepala dengan orang terdekat.',
    luckyNumber: 4,
    luckyColor: 'Hijau',
    colorHex: '#16a34a',
    mood: 'Tenang',
  },
  {
    name: 'Gemini',
    symbol: '♊',
    date: '21 Mei - 20 Jun',
    element: 'Udara',
    prediction: 'Komunikasi lancar, ide-ide kreatif mengalir. Manfaatkan untuk presentasi atau negosiasi. Hindari gosip yang merugikan.',
    luckyNumber: 5,
    luckyColor: 'Kuning',
    colorHex: '#eab308',
    mood: 'Komunikatif',
  },
  {
    name: 'Cancer',
    symbol: '♋',
    date: '21 Jun - 22 Jul',
    element: 'Air',
    prediction: 'Keluarga jadi prioritas utama. Curhat dengan orang terdekat membantu melepaskan beban emosional. Waspadai mood swing.',
    luckyNumber: 2,
    luckyColor: 'Perak',
    colorHex: '#94a3b8',
    mood: 'Sentimental',
  },
  {
    name: 'Leo',
    symbol: '♌',
    date: '23 Jul - 22 Agu',
    element: 'Api',
    prediction: 'Pusat perhatian hari ini. Bakat kepemimpinan Anda bersinar. Jangan lupa hargai kontribusi tim, hindari sikap egois.',
    luckyNumber: 1,
    luckyColor: 'Emas',
    colorHex: '#eab308',
    mood: 'Percaya Diri',
  },
  {
    name: 'Virgo',
    symbol: '♍',
    date: '23 Agu - 22 Sep',
    element: 'Tanah',
    prediction: 'Analitis dan teliti, cocok untuk menyelesaikan tugas detail. Jangan terlalu perfeksionis yang menyusahkan diri sendiri.',
    luckyNumber: 6,
    luckyColor: 'Coklat',
    colorHex: '#92400e',
    mood: 'Fokus',
  },
  {
    name: 'Libra',
    symbol: '♎',
    date: '23 Sep - 22 Okt',
    element: 'Udara',
    prediction: 'Keseimbangan menjadi kunci. Hubungan asmara harmonis. Waspadai kesulitan mengambil keputusan besar.',
    luckyNumber: 6,
    luckyColor: 'Biru Muda',
    colorHex: '#0ea5e9',
    mood: 'Seimbang',
  },
  {
    name: 'Scorpio',
    symbol: '♏',
    date: '23 Okt - 21 Nov',
    element: 'Air',
    prediction: 'Intuisi kuat, mampu membaca situasi dengan tajam. Waspada dengan rasa cemburu yang berlebihan pada pasangan.',
    luckyNumber: 8,
    luckyColor: 'Merah Tua',
    colorHex: '#991b1b',
    mood: 'Intens',
  },
  {
    name: 'Sagittarius',
    symbol: '♐',
    date: '22 Nov - 21 Des',
    element: 'Api',
    prediction: 'Petualangan dan perjalanan menanti. Semangat belajar tinggi. Hindari komentar blak-blakan yang melukai orang lain.',
    luckyNumber: 9,
    luckyColor: 'Ungu',
    colorHex: '#7c3aed',
    mood: 'Berpikir Terbuka',
  },
  {
    name: 'Capricorn',
    symbol: '♑',
    date: '22 Des - 19 Jan',
    element: 'Tanah',
    prediction: 'Ambisi karier memuncak. Disiplin membawa hasil. Jangan lupa istirahat dan habiskan waktu dengan keluarga.',
    luckyNumber: 10,
    luckyColor: 'Hitam',
    colorHex: '#1e293b',
    mood: 'Ambisius',
  },
  {
    name: 'Aquarius',
    symbol: '♒',
    date: '20 Jan - 18 Feb',
    element: 'Udara',
    prediction: 'Inovasi dan ide-ide unik mengalir. Cocok untuk proyek kreatif dan teknologi. Hindari terlalu asosial atau dingin.',
    luckyNumber: 11,
    luckyColor: 'Elektrik',
    colorHex: '#0ea5e9',
    mood: 'Inovatif',
  },
  {
    name: 'Pisces',
    symbol: '♓',
    date: '19 Feb - 20 Mar',
    element: 'Air',
    prediction: 'Imajinasi dan empati tinggi. Waktu baik untuk aktivitas seni dan spiritual. Hindari menghindari realitas dengan fantasi berlebih.',
    luckyNumber: 12,
    luckyColor: 'Laut',
    colorHex: '#06b6d4',
    mood: 'Penuh Imajinasi',
  },
]

const elementColor: Record<ZodiacSign['element'], string> = {
  Api: 'text-red-600 bg-red-500/10',
  Tanah: 'text-emerald-600 bg-emerald-500/10',
  Udara: 'text-sky-600 bg-sky-500/10',
  Air: 'text-cyan-600 bg-cyan-500/10',
}

export function ZodiacWidget() {
  const [selected, setSelected] = React.useState<ZodiacSign>(zodiacs[0])

  return (
    <section
      id="zodiak"
      className="scroll-mt-32 mx-auto max-w-7xl px-4 py-8"
    >
      <div className="mb-4 flex items-end justify-between border-b-2 border-fuchsia-600 pb-2">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-extrabold tracking-tight sm:text-2xl">
            <Sparkles className="h-5 w-5 text-fuchsia-600" /> Zodiak Hari Ini
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Ramalan bintang untuk 12 zodiak · peruntungan & angka keberuntungan
          </p>
        </div>
        <Badge variant="secondary" className="border-fuchsia-500/40 text-fuchsia-700 dark:text-fuchsia-500">
          <Star className="mr-1 h-3 w-3 fill-fuchsia-600 text-fuchsia-600" /> 12 Bintang
        </Badge>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Zodiak selector */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-border bg-card p-3">
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-4">
              {zodiacs.map((z) => {
                const isActive = z.name === selected.name
                return (
                  <button
                    key={z.name}
                    onClick={() => setSelected(z)}
                    aria-pressed={isActive}
                    className={cn(
                      'flex flex-col items-center gap-1 rounded-lg border p-2 transition-all',
                      isActive
                        ? 'border-fuchsia-600 bg-fuchsia-50 shadow-sm dark:bg-fuchsia-950/30'
                        : 'border-border bg-background hover:border-fuchsia-500/40 hover:bg-muted/40',
                    )}
                  >
                    <span
                      className="text-2xl"
                      style={{ color: z.colorHex }}
                    >
                      {z.symbol}
                    </span>
                    <span
                      className={cn(
                        'text-[10px] font-medium',
                        isActive ? 'text-fuchsia-700 dark:text-fuchsia-400' : 'text-muted-foreground',
                      )}
                    >
                      {z.name}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Detail zodiak terpilih */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-fuchsia-500/30 bg-gradient-to-br from-fuchsia-50/40 via-background to-pink-50/40 p-5 dark:from-fuchsia-950/15 dark:to-pink-950/15">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl text-4xl shadow-sm"
                  style={{ backgroundColor: `${selected.colorHex}15`, color: selected.colorHex }}
                >
                  {selected.symbol}
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold tracking-tight">
                    {selected.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {selected.date}
                  </p>
                </div>
              </div>
              <Badge className={cn('gap-1', elementColor[selected.element])}>
                Unsur {selected.element}
              </Badge>
            </div>

            <div className="space-y-3">
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Ramalan Hari Ini
                </p>
                <p className="text-sm leading-relaxed text-foreground/85">
                  {selected.prediction}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg border border-border bg-card p-2.5 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Angka Hoki
                  </p>
                  <p className="text-lg font-extrabold tabular-nums text-fuchsia-600 dark:text-fuchsia-400">
                    {selected.luckyNumber}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-2.5 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Warna Hoki
                  </p>
                  <p className="flex items-center justify-center gap-1.5 text-sm font-semibold">
                    <span
                      className="inline-block h-3 w-3 rounded-full"
                      style={{ backgroundColor: selected.colorHex }}
                    />
                    {selected.luckyColor}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-2.5 text-center">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Mood
                  </p>
                  <p className="text-sm font-semibold">{selected.mood}</p>
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-[10px] text-muted-foreground">
              ★ Ramalan bersifat hiburan. Keputusan penting tetap pertimbangkan dengan logika dan data.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
