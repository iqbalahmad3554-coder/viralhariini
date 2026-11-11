// Loading skeleton (shimmer) untuk placeholder card berita
import { cn } from '@/lib/utils'

export function NewsCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border bg-card shadow-sm',
        className,
      )}
    >
      <div className="aspect-[16/10] w-full bg-muted shimmer" />
      <div className="p-4">
        <div className="mb-2 h-4 w-16 rounded-full bg-muted shimmer" />
        <div className="mb-2 h-4 w-full rounded-md bg-muted shimmer" />
        <div className="mb-2 h-4 w-3/4 rounded-md bg-muted shimmer" />
        <div className="mb-3 h-3 w-full rounded bg-muted shimmer" />
        <div className="flex gap-3">
          <div className="h-3 w-20 rounded bg-muted shimmer" />
          <div className="h-3 w-12 rounded bg-muted shimmer" />
        </div>
      </div>
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="aspect-[16/10] w-full bg-muted shimmer sm:aspect-[16/9]" />
      <div className="p-4">
        <div className="mb-3 h-6 w-3/4 rounded-md bg-muted shimmer" />
        <div className="mb-2 h-3 w-full rounded bg-muted shimmer" />
        <div className="mb-2 h-3 w-2/3 rounded bg-muted shimmer" />
        <div className="flex gap-3">
          <div className="h-3 w-24 rounded bg-muted shimmer" />
          <div className="h-3 w-16 rounded bg-muted shimmer" />
        </div>
      </div>
    </div>
  )
}

export function TrendingSkeleton() {
  return (
    <ol className="divide-y divide-border">
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i} className="flex items-start gap-3 px-4 py-3">
          <div className="h-6 w-7 shrink-0 rounded bg-muted shimmer" />
          <div className="flex-1">
            <div className="mb-1.5 h-3.5 w-full rounded bg-muted shimmer" />
            <div className="mb-1 h-3 w-2/3 rounded bg-muted shimmer" />
            <div className="h-2.5 w-20 rounded bg-muted shimmer" />
          </div>
        </li>
      ))}
    </ol>
  )
}
