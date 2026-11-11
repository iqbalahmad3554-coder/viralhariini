'use client'

import { useEffect, useState } from 'react'
import { Activity, FileText, Eye, Users } from 'lucide-react'

interface Stat {
  label: string
  value: number
  display: (n: number) => string
  icon: React.ElementType
}

const baseStats: Stat[] = [
  {
    label: 'Berita hari ini',
    value: 247,
    display: (n) => n.toString(),
    icon: FileText,
  },
  {
    label: 'Total pembaca',
    value: 1843000,
    display: (n) => (n / 1_000_000).toFixed(2) + ' jt',
    icon: Eye,
  },
  {
    label: 'Trending sekarang',
    value: 38,
    display: (n) => n.toString(),
    icon: Activity,
  },
  {
    label: 'Pelanggan aktif',
    value: 321840,
    display: (n) => (n / 1000).toFixed(1) + ' rb',
    icon: Users,
  },
]

export function LiveStats() {
  const [stats, setStats] = useState(baseStats)

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((s) => ({
          ...s,
          value:
            s.label === 'Total pembaca'
              ? s.value + Math.floor(Math.random() * 23)
              : s.label === 'Pelanggan aktif'
                ? s.value + (Math.random() > 0.6 ? 1 : 0)
                : s.label === 'Berita hari ini'
                  ? s.value + (Math.random() > 0.7 ? 1 : 0)
                  : s.value + Math.floor(Math.random() * 5 - 2),
        })),
      )
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-3 bg-card px-4 py-4 sm:px-6"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-600 dark:bg-red-950/40 dark:text-red-400">
              <s.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-extrabold leading-none tracking-tight tabular-nums sm:text-2xl">
                {s.display(s.value)}
              </p>
              <p className="mt-1 truncate text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
