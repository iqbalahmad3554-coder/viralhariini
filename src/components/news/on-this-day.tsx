'use client'

import * as React from 'react'
import { CalendarClock, Flame, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface OnThisDayEvent {
  year: string
  text: string
  category: 'Politik' | 'Sejarah' | 'Sains' | 'Budaya' | 'Olahraga'
}

// Event sejarah untuk tanggal 12 November
const historicalEvents: OnThisDayEvent[] = [
  {
    year: '1945',
    text: 'Pertempuran Surabaya: Arek-Arek Suroboyo pimpinan Bung Tomo melancarkan perlawanan heroik terhadap NICA. Peristiwa ini kemudian dijadikan Hari Pahlawan.',
    category: 'Sejarah',
  },
  {
    year: '1965',
    text: 'Soeharto resmi dilantik sebagai Panglima Angkatan Darat, menggantikan Jenderal Ahmad Yani yang gugur dalam peristiwa G30S.',
    category: 'Politik',
  },
  {
    year: '1984',
    text: 'NASA meluncurkan Space Shuttle Discovery untuk pertama kalinya (STS-41-D), misi 6 hari sukses penuh.',
    category: 'Sains',
  },
  {
    year: '1990',
    text: 'Tim Berners-Lee di CERN menerbitkan proposal formal untuk "World Wide Web", cikal bakal internet modern.',
    category: 'Sains',
  },
  {
    year: '1999',
    text: 'Gempa bumi berkekuatan 7,2 SR mengguncant Duzce, Turki, menewaskan lebih dari 800 jiwa.',
    category: 'Sejarah',
  },
  {
    year: '2001',
    text: 'American Airlines Penerbangan 587 jatuh di Queens, New York, menewaskan 260 orang — kecelakaan pesawat komersial terbesar di AS.',
    category: 'Sejarah',
  },
  {
    year: '2014',
    text: 'Philae, lander dari misi Rosetta ESA, berhasil mendarat di komet 67P — prestasi sejarah pertama manusia mendarat di komet.',
    category: 'Sains',
  },
  {
    year: '2018',
    text: 'Stan Lee, legenda Marvel Comics dan pencipta Spider-Man, Iron Man, X-Men, wafat di usia 95 tahun.',
    category: 'Budaya',
  },
  {
    year: '2019',
    text: 'Venice, Italia, dilanda banjir terburuk dalam 50 tahun. Tinggi air mencapai 1,87 meter di Piazza San Marco.',
    category: 'Sejarah',
  },
  {
    year: '2022',
    text: 'Piala Dunia FIFA 2022 di Qatar menjadi Piala Dunia pertama di negara Arab dan pertama di musim dingin.',
    category: 'Olahraga',
  },
]

const categoryColor = {
  Politik: 'bg-red-600',
  Sejarah: 'bg-amber-600',
  Sains: 'bg-sky-600',
  Budaya: 'bg-fuchsia-600',
  Olahraga: 'bg-orange-600',
} as const

export function OnThisDay() {
  const [mounted, setMounted] = React.useState(false)
  const today = React.useMemo(() => {
    if (!mounted) return ''
    const d = new Date()
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
    }).format(d)
  }, [mounted])

  // Acak 3 event untuk ditampilkan supaya segar
  // useMemo + useEffect untuk hindari hydration mismatch (Math.random di SSR)
  const [display, setDisplay] = React.useState<typeof historicalEvents>([])
  React.useEffect(() => {
    setMounted(true)
    const shuffled = [...historicalEvents].sort(() => Math.random() - 0.5)
    setDisplay(shuffled.slice(0, 3))
  }, [])

  if (display.length === 0) {
    // Render 3 event pertama saat SSR (cocok dengan server)
    const initial = historicalEvents.slice(0, 3)
    return (
      <section id="on-this-day" className="scroll-mt-32 mx-auto max-w-7xl px-4 py-8">
        <div className="mb-4 flex items-end justify-between border-b-2 border-amber-500 pb-2">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-extrabold tracking-tight sm:text-2xl">
              <CalendarClock className="h-5 w-5 text-amber-500" /> Pada Hari Ini
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Peristiwa penting yang pernah terjadi pada {today || "hari ini"}
            </p>
          </div>
          <Badge variant="secondary" className="border-amber-500/40 text-amber-700 dark:text-amber-500">
            Sejarah Hari Ini
          </Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {initial.map((evt, i) => {
            const color = categoryColor[evt.category]
            return (
              <article
                key={i}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${color} text-sm font-extrabold text-white shadow-sm`}>
                      {evt.year.slice(-2)}
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Tahun</p>
                      <p className="text-base font-extrabold tabular-nums">{evt.year}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">{evt.category}</Badge>
                </div>
                <p className="text-sm leading-relaxed text-foreground/85">{evt.text}</p>
                <div className={`absolute left-0 top-0 h-1 w-full ${color} opacity-80`} />
              </article>
            )
          })}
        </div>
      </section>
    )
  }

  return (
    <section
      id="on-this-day"
      className="scroll-mt-32 mx-auto max-w-7xl px-4 py-8"
    >
      <div className="mb-4 flex items-end justify-between border-b-2 border-amber-500 pb-2">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-extrabold tracking-tight sm:text-2xl">
            <CalendarClock className="h-5 w-5 text-amber-500" /> Pada Hari Ini
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Peristiwa penting yang pernah terjadi pada {today || "hari ini"} di tahun-tahun sebelumnya
          </p>
        </div>
        <Badge variant="secondary" className="border-amber-500/40 text-amber-700 dark:text-amber-500">
          Sejarah Hari Ini
        </Badge>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {display.map((evt, i) => {
          const color = categoryColor[evt.category]
          return (
            <article
              key={i}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:border-amber-500/40 hover:shadow-md"
            >
              {/* Year ribbon */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${color} text-sm font-extrabold text-white shadow-sm`}>
                    {evt.year.slice(-2)}
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Tahun
                    </p>
                    <p className="text-base font-extrabold tabular-nums">{evt.year}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-[10px]">
                  {evt.category}
                </Badge>
              </div>

              <p className="text-sm leading-relaxed text-foreground/85">
                {evt.text}
              </p>

              {/* Decorative line at top */}
              <div className={`absolute left-0 top-0 h-1 w-full ${color} opacity-80`} />
            </article>
          )
        })}
      </div>

      {/* Footer info */}
      <p className="mt-4 text-center text-[11px] text-muted-foreground">
        <ChevronRight className="mr-1 inline h-3 w-3" />
        Refresh halaman untuk lihat peristiwa lain — diacak dari {historicalEvents.length} peristiwa terpilih
      </p>
    </section>
  )
}
