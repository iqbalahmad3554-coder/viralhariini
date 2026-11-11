'use client'

import * as React from 'react'
import { Cookie, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const STORAGE_KEY = 'vhi-cookie-consent'

export function CookieConsent() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY)
      if (!v) {
        // Delay untuk tidak muncul langsung
        const t = setTimeout(() => setVisible(true), 1500)
        return () => clearTimeout(t)
      }
    } catch {
      /* ignore */
    }
  }, [])

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: true, ts: Date.now() }))
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  const decline = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: false, ts: Date.now() }))
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl sm:inset-x-4 sm:bottom-4"
      role="dialog"
      aria-live="polite"
      aria-label="Pemberitahuan cookie"
    >
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-background/95 p-4 shadow-2xl backdrop-blur-md sm:flex-row sm:items-center sm:p-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-500">
          <Cookie className="h-5 w-5" />
        </div>
        <div className="flex-1 text-sm">
          <p className="font-semibold">Kami menggunakan cookie</p>
          <p className="mt-1 text-xs text-muted-foreground">
            ViralHariIni.id menggunakan cookie untuk meningkatkan pengalaman
            baca Anda (bookmark, riwayat, preferensi). Dengan menyetujui, Anda
            menyetujui penggunaan cookie. Baca{' '}
            <a href="#" className="underline hover:text-foreground">
              Kebijakan Privasi
            </a>
            .
          </p>
        </div>
        <div className="flex shrink-0 gap-2 self-stretch sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={decline}
            className="flex-1 sm:flex-none"
          >
            Tolak
          </Button>
          <Button
            size="sm"
            onClick={accept}
            className="flex-1 sm:flex-none bg-emerald-600 text-white hover:bg-emerald-700"
          >
            <Check className="mr-1 h-3.5 w-3.5" /> Setuju
          </Button>
        </div>
      </div>
    </div>
  )
}
