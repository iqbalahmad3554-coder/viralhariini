'use client'

import { TrendingUp, TrendingDown, DollarSign, Coins, Droplet, BarChart3 } from 'lucide-react'

interface MarketItem {
  symbol: string
  name: string
  value: string
  change: number // persen
  icon: React.ElementType
  color: string
}

// Data pasar ekonomi (simulasi, akan terlihat realistis)
const marketData: MarketItem[] = [
  { symbol: 'IHSG', name: 'Indeks Harga Saham Gabungan', value: '7.284,12', change: +0.84, icon: BarChart3, color: 'text-emerald-600' },
  { symbol: 'LQ45', name: 'Indeks LQ45', value: '901,45', change: +0.62, icon: BarChart3, color: 'text-emerald-600' },
  { symbol: 'USD/IDR', name: 'Dolar AS ke Rupiah', value: '15.842', change: -0.18, icon: DollarSign, color: 'text-red-600' },
  { symbol: 'EUR/IDR', name: 'Euro ke Rupiah', value: '17.215', change: +0.21, icon: DollarSign, color: 'text-emerald-600' },
  { symbol: 'EMAS', name: 'Emas Antam per gram', value: 'Rp 1.412.000', change: +0.45, icon: Coins, color: 'text-amber-600' },
  { symbol: 'PERAK', name: 'Perak per gram', value: 'Rp 18.450', change: -0.32, icon: Coins, color: 'text-red-600' },
  { symbol: 'BRENT', name: 'Minyak Brent (USD/barrel)', value: '$ 78,42', change: +1.24, icon: Droplet, color: 'text-emerald-600' },
  { symbol: 'WTI', name: 'Minyak WTI (USD/barrel)', value: '$ 74,18', change: +0.92, icon: Droplet, color: 'text-emerald-600' },
  { symbol: 'BTC', name: 'Bitcoin (USD)', value: '$ 96.420', change: +2.14, icon: BarChart3, color: 'text-emerald-600' },
  { symbol: 'ETH', name: 'Ethereum (USD)', value: '$ 3.512', change: -0.85, icon: BarChart3, color: 'text-red-600' },
  { symbol: 'NIKKEI', name: 'Nikkei 225 (Jepang)', value: '38.420', change: +0.41, icon: BarChart3, color: 'text-emerald-600' },
  { symbol: 'STI', name: 'Straits Times (SG)', value: '3.782', change: -0.12, icon: BarChart3, color: 'text-red-600' },
]

function MarketEntry({ item }: { item: MarketItem }) {
  const Icon = item.icon
  const up = item.change >= 0
  return (
    <span className="mx-3 inline-flex items-center gap-1.5 text-xs">
      <Icon className={`h-3 w-3 ${item.color}`} />
      <span className="font-bold text-foreground">{item.symbol}</span>
      <span className="text-muted-foreground">{item.value}</span>
      <span
        className={
          up
            ? 'font-semibold text-emerald-600 dark:text-emerald-500'
            : 'font-semibold text-red-600 dark:text-red-500'
        }
      >
        {up ? '+' : ''}
        {item.change.toFixed(2)}%
        {up ? (
          <TrendingUp className="ml-0.5 inline h-2.5 w-2.5" />
        ) : (
          <TrendingDown className="ml-0.5 inline h-2.5 w-2.5" />
        )}
      </span>
    </span>
  )
}

export function EconomicTicker() {
  // Duplicate untuk loop seamless
  const doubled = [...marketData, ...marketData]

  return (
    <div className="border-b border-border bg-slate-900 text-white">
      <div className="mx-auto flex max-w-7xl items-stretch">
        <div className="flex shrink-0 items-center gap-1.5 bg-emerald-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wider">
          <BarChart3 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Pasar</span>
          <span className="sm:hidden">📈</span>
        </div>
        <div className="relative flex flex-1 items-center overflow-hidden bg-slate-900 py-1.5">
          <div className="flex animate-news-marquee whitespace-nowrap pl-4">
            {doubled.map((item, i) => (
              <MarketEntry key={i} item={item} />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-slate-900 to-transparent" />
        </div>
      </div>
    </div>
  )
}
