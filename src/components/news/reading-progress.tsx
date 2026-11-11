'use client'

import * as React from 'react'

// Bar progres membaca tipis di atas layar — meningkatkan feel "ditemani"
// saat membaca artikel panjang dan mendorong scroll-to-bottom (sinyal engagement).
export function ReadingProgress() {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = document.documentElement
      const total = el.scrollHeight - el.clientHeight
      const pct = total > 0 ? Math.min(100, Math.max(0, (el.scrollTop / total) * 100)) : 0
      setProgress(pct)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1"
    >
      <div
        className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
