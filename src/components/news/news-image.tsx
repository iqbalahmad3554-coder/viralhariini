'use client'

import { cn } from '@/lib/utils'

interface NewsImageProps {
  hue: number
  category: string
  title: string
  className?: string
  variant?: 'default' | 'large' | 'compact'
  priority?: boolean
}

/**
 * Visual placeholder berbasis CSS gradient untuk artikel berita.
 * Menghindari dependensi gambar eksternal agar selalu tampil di sandbox.
 */
export function NewsImage({
  hue,
  category,
  title,
  className,
  variant = 'default',
}: NewsImageProps) {
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

  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        className,
      )}
      style={{
        background: `linear-gradient(135deg, hsl(${h} 75% 22%) 0%, hsl(${(h + 35) % 360} 70% 38%) 55%, hsl(${(h + 70) % 360} 72% 48%) 100%)`,
      }}
      aria-hidden="true"
    >
      {/* Pola titik halus */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)',
          backgroundSize: '14px 14px',
        }}
      />
      {/* Garis dekoratif */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-10 -left-6 h-32 w-32 rounded-full bg-black/20 blur-2xl" />

      {/* Inisial judul */}
      <span
        className={cn(
          'relative font-bold tracking-tight text-white/90 drop-shadow-lg',
          sizeClass,
        )}
      >
        {initials}
      </span>

      {/* Label kategori */}
      <span className="absolute bottom-2 left-2 rounded bg-black/45 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
        {category}
      </span>
    </div>
  )
}
