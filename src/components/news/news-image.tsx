'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface NewsImageProps {
  hue: number
  category: string
  title: string
  className?: string
  variant?: 'default' | 'large' | 'compact'
  priority?: boolean
  imageUrl?: string
}

/**
 * Visual untuk artikel berita.
 * - Jika imageUrl diberikan, pakai <img> dengan lazy-load + fallback gradient.
 * - Jika tidak ada / gagal load, fallback ke gradient + inisial judul.
 */
export function NewsImage({
  hue,
  category,
  title,
  className,
  variant = 'default',
  priority = false,
  imageUrl,
}: NewsImageProps) {
  const [imgOk, setImgOk] = React.useState(true)
  const h = hue
  const initials = title
    .split(' ')
    .slice(0, 3)
    .map((w) => w.charAt(0))
    .join('')
    .toUpperCase()

  const sizeClass =
    variant === 'large'
      ? 'text-5xl'
      : variant === 'compact'
        ? 'text-base'
        : 'text-3xl'

  const gradientStyle = {
    background: `linear-gradient(135deg, hsl(${h} 75% 22%) 0%, hsl(${(h + 35) % 360} 70% 38%) 55%, hsl(${(h + 70) % 360} 72% 48%) 100%)`,
  } as React.CSSProperties

  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden bg-muted',
        className,
      )}
      style={gradientStyle}
      aria-hidden="true"
    >
      {imageUrl && imgOk ? (
        <img
          src={imageUrl}
          alt={title}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setImgOk(false)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500"
          style={{ mixBlendMode: 'overlay' }}
        />
      ) : null}

      {/* Overlay gradient untuk readability gambar */}
      {imageUrl && imgOk && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, hsl(${h} 70% 18% / 0.55), transparent 60%)`,
          }}
        />
      )}

      {/* Pola titik halus (selalu tampil untuk tekstur) */}
      {!imageUrl || !imgOk ? (
        <>
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)',
              backgroundSize: '14px 14px',
            }}
          />
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-10 -left-6 h-32 w-32 rounded-full bg-black/20 blur-2xl" />
          <span
            className={cn(
              'relative font-bold tracking-tight text-white/90 drop-shadow-lg',
              sizeClass,
            )}
          >
            {initials}
          </span>
        </>
      ) : null}

      {/* Label kategori */}
      <span className="absolute bottom-2 left-2 z-10 rounded bg-black/55 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
        {category}
      </span>
    </div>
  )
}
