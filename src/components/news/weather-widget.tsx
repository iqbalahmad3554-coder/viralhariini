'use client'

import * as React from 'react'
import { Cloud, CloudRain, Sun, CloudSnow, CloudLightning, Wind, Droplets, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CityWeather {
  name: string
  temp: number
  condition: 'cerah' | 'berawan' | 'hujan' | 'gerimis' | 'badai'
  humidity: number
  wind: number
  high: number
  low: number
}

// Data cuaca realistis per kota Indonesia (simulasi)
const cities: CityWeather[] = [
  { name: 'Jakarta', temp: 31, condition: 'berawan', humidity: 75, wind: 12, high: 33, low: 27 },
  { name: 'Surabaya', temp: 33, condition: 'cerah', humidity: 68, wind: 10, high: 34, low: 28 },
  { name: 'Medan', temp: 30, condition: 'hujan', humidity: 85, wind: 14, high: 32, low: 26 },
  { name: 'Makassar', temp: 32, condition: 'cerah', humidity: 70, wind: 11, high: 33, low: 27 },
]

const conditionConfig = {
  cerah: { icon: Sun, color: 'text-amber-500', bg: 'from-amber-500/10 to-orange-500/10', label: 'Cerah' },
  berawan: { icon: Cloud, color: 'text-slate-500', bg: 'from-slate-500/10 to-slate-400/10', label: 'Berawan' },
  hujan: { icon: CloudRain, color: 'text-sky-600', bg: 'from-sky-500/10 to-blue-500/10', label: 'Hujan' },
  gerimis: { icon: CloudRain, color: 'text-sky-400', bg: 'from-sky-400/10 to-cyan-400/10', label: 'Gerimis' },
  badai: { icon: CloudLightning, color: 'text-yellow-500', bg: 'from-yellow-500/10 to-red-500/10', label: 'Badai' },
} as const

export function WeatherWidget() {
  const [active, setActive] = React.useState(0)
  const current = cities[active]
  const cfg = conditionConfig[current.condition]
  const Icon = cfg.icon

  return (
    <section
      id="cuaca"
      className="scroll-mt-32 mx-auto max-w-7xl px-4 py-6"
    >
      <div className="mb-4 flex items-end justify-between border-b-2 border-sky-500 pb-2">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-tight sm:text-xl">
            <Cloud className="h-5 w-5 text-sky-600" /> Cuaca Hari Ini
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Perkiraan cuaca kota-kota besar Indonesia · diperbarui tiap jam
          </p>
        </div>
        <span className="text-[10px] text-muted-foreground">Sumber: BMKG (simulasi)</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cities.map((c, i) => {
          const cc = conditionConfig[c.condition]
          const CIcon = cc.icon
          const isActive = i === active
          return (
            <button
              key={c.name}
              onClick={() => setActive(i)}
              className={cn(
                'relative overflow-hidden rounded-xl border p-4 text-left transition-all',
                isActive
                  ? 'border-sky-500 shadow-md ring-2 ring-sky-500/30'
                  : 'border-border bg-card hover:border-sky-500/40 hover:shadow-sm',
                cc.bg,
              )}
              aria-pressed={isActive}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm font-semibold">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  {c.name}
                </div>
                <CIcon className={cn('h-7 w-7', cc.color)} />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold tabular-nums">{c.temp}°</span>
                <span className="text-xs text-muted-foreground">C</span>
              </div>
              <p className="mt-0.5 text-xs font-medium text-muted-foreground">{cc.label}</p>
              <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Tertinggi {c.high}°</span>
                <span>Terendah {c.low}°</span>
              </div>
              <div className="mt-2 flex items-center gap-3 border-t border-border/60 pt-2 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Droplets className="h-3 w-3" /> {c.humidity}%
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="h-3 w-3" /> {c.wind} km/j
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
