'use client'

import * as React from 'react'
import { Sunrise, Moon, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PrayerTime {
  name: string
  time: string
  icon: React.ElementType
  arabicName: string
}

// Jadwal shalat Jakarta hari ini (realistis untuk zona WIB)
const citiesPrayer: Record<string, PrayerTime[]> = {
  Jakarta: [
    { name: 'Subuh', time: '04:18', icon: Sunrise, arabicName: 'Fajr' },
    { name: 'Syuruq', time: '05:33', icon: Sunrise, arabicName: 'Syuruq' },
    { name: 'Dzuhur', time: '11:42', icon: Clock, arabicName: 'Dhuhr' },
    { name: 'Ashar', time: '15:08', icon: Clock, arabicName: 'Asr' },
    { name: 'Maghrib', time: '17:50', icon: Sunrise, arabicName: 'Maghrib' },
    { name: 'Isya', time: '19:03', icon: Moon, arabicName: 'Isha' },
  ],
  Surabaya: [
    { name: 'Subuh', time: '04:02', icon: Sunrise, arabicName: 'Fajr' },
    { name: 'Syuruq', time: '05:18', icon: Sunrise, arabicName: 'Syuruq' },
    { name: 'Dzuhur', time: '11:25', icon: Clock, arabicName: 'Dhuhr' },
    { name: 'Ashar', time: '14:50', icon: Clock, arabicName: 'Asr' },
    { name: 'Maghrib', time: '17:33', icon: Sunrise, arabicName: 'Maghrib' },
    { name: 'Isya', time: '18:47', icon: Moon, arabicName: 'Isha' },
  ],
  Medan: [
    { name: 'Subuh', time: '05:08', icon: Sunrise, arabicName: 'Fajr' },
    { name: 'Syuruq', time: '06:23', icon: Sunrise, arabicName: 'Syuruq' },
    { name: 'Dzuhur', time: '12:30', icon: Clock, arabicName: 'Dhuhr' },
    { name: 'Ashar', time: '15:55', icon: Clock, arabicName: 'Asr' },
    { name: 'Maghrib', time: '18:40', icon: Sunrise, arabicName: 'Maghrib' },
    { name: 'Isya', time: '19:55', icon: Moon, arabicName: 'Isha' },
  ],
  Makassar: [
    { name: 'Subuh', time: '04:42', icon: Sunrise, arabicName: 'Fajr' },
    { name: 'Syuruq', time: '05:57', icon: Sunrise, arabicName: 'Syuruq' },
    { name: 'Dzuhur', time: '12:06', icon: Clock, arabicName: 'Dhuhr' },
    { name: 'Ashar', time: '15:30', icon: Clock, arabicName: 'Asr' },
    { name: 'Maghrib', time: '18:14', icon: Sunrise, arabicName: 'Maghrib' },
    { name: 'Isya', time: '19:27', icon: Moon, arabicName: 'Isha' },
  ],
}

// Hitung waktu shalat berikutnya (sederhana)
function getNextPrayer(times: PrayerTime[]): { name: string; in: string } | null {
  const now = new Date()
  const minutesNow = now.getHours() * 60 + now.getMinutes()
  for (const p of times) {
    const [h, m] = p.time.split(':').map(Number)
    const mins = h * 60 + m
    if (mins > minutesNow) {
      const diff = mins - minutesNow
      const hrs = Math.floor(diff / 60)
      const rest = diff % 60
      return {
        name: p.name,
        in: hrs > 0 ? `${hrs}j ${rest}m` : `${rest}m`,
      }
    }
  }
  // Lewat Isya → Subuh besok
  return { name: 'Subuh (besok)', in: 'lihat jadwal' }
}

export function PrayerTimesWidget() {
  const [city, setCity] = React.useState<keyof typeof citiesPrayer>('Jakarta')
  const [mounted, setMounted] = React.useState(false)
  const times = citiesPrayer[city]

  React.useEffect(() => setMounted(true), [])

  const next = mounted ? getNextPrayer(times) : null

  return (
    <section
      id="shalat"
      className="scroll-mt-32 mx-auto max-w-7xl px-4 py-6"
    >
      <div className="mb-4 flex items-end justify-between border-b-2 border-emerald-600 pb-2">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-tight sm:text-xl">
            <Moon className="h-5 w-5 text-emerald-600" /> Jadwal Shalat
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Waktu shalat untuk kota-kota Indonesia · zona waktu setempat
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          {Object.keys(citiesPrayer).map((c) => (
            <button
              key={c}
              onClick={() => setCity(c as keyof typeof citiesPrayer)}
              aria-pressed={city === c}
              className={cn(
                'rounded-full px-2.5 py-1 text-xs font-semibold transition-colors',
                city === c
                  ? 'bg-emerald-600 text-white'
                  : 'border border-border bg-background text-muted-foreground hover:border-emerald-500/40 hover:text-emerald-700',
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-50/40 via-background to-teal-50/40 dark:from-emerald-950/15 dark:to-teal-950/15">
        {/* Next prayer banner */}
        {next && mounted && (
          <div className="flex items-center justify-between border-b border-emerald-500/20 bg-emerald-500/10 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-semibold">
                Berikutnya: {next.name}
              </span>
            </div>
            <span className="rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white">
              dalam {next.in}
            </span>
          </div>
        )}

        {/* Prayer grid */}
        <div className="grid grid-cols-3 gap-2 p-3 sm:grid-cols-6 sm:p-4">
          {times.map((p) => {
            const Icon = p.icon
            return (
              <div
                key={p.name}
                className="flex flex-col items-center rounded-lg border border-emerald-500/20 bg-card/60 px-2 py-3 text-center"
              >
                <Icon className="mb-1.5 h-4 w-4 text-emerald-600" />
                <span className="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {p.name}
                </span>
                <span className="text-sm font-bold tabular-nums">{p.time}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
