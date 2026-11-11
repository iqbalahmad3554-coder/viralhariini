'use client'

import * as React from 'react'
import { Zap } from 'lucide-react'
import { breakingNews } from '@/lib/news-data'

export function BreakingTicker() {
  return (
    <div className="border-b border-border/60 bg-red-600 text-white">
      <div className="mx-auto flex max-w-7xl items-stretch">
        <div className="flex shrink-0 items-center gap-2 bg-red-700 px-4 py-2 font-bold uppercase tracking-wider">
          <Zap className="h-4 w-4 animate-pulse" />
          <span className="text-xs sm:text-sm">Breaking</span>
        </div>
        <div className="relative flex flex-1 items-center overflow-hidden py-2">
          <div className="flex animate-marquee whitespace-nowrap pl-4">
            {[...breakingNews, ...breakingNews].map((item, i) => (
              <span
                key={i}
                className="mx-6 text-xs font-medium sm:text-sm"
              >
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
                {item}
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-red-600 to-transparent" />
        </div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
