'use client'

import * as React from 'react'
import { BarChart3, Check, Users, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { newsPolls, type NewsPoll } from '@/lib/news-data'
import { cn } from '@/lib/utils'

// Persist votes per poll in localStorage
const STORAGE_KEY = 'vhi-polls-votes'

function loadVotes(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveVotes(v: Record<string, string>) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(v))
  } catch {
    /* ignore */
  }
}

function formatNumber(n: number): string {
  return n.toLocaleString('id-ID')
}

export function InteractivePoll() {
  const [votes, setVotes] = React.useState<Record<string, string>>({})
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    setVotes(loadVotes())
  }, [])

  const handleVote = (pollId: string, optionId: string) => {
    if (votes[pollId]) return // sudah vote, tidak bisa ubah
    const next = { ...votes, [pollId]: optionId }
    setVotes(next)
    saveVotes(next)
  }

  const totalVoters = (poll: NewsPoll): number => {
    return Object.values(poll.baseVotes).reduce((a, b) => a + b, 0) + 1
  }

  return (
    <section
      id="poll"
      className="scroll-mt-32 border-y border-border bg-gradient-to-br from-violet-50/40 via-background to-fuchsia-50/40 py-8 dark:from-violet-950/15 dark:to-fuchsia-950/15"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-5 flex items-end justify-between border-b-2 border-violet-600 pb-2">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-extrabold tracking-tight sm:text-2xl">
              <BarChart3 className="h-5 w-5 text-violet-600" /> Suara Pembaca
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Polling interaktif — suara Anda berarti. Hasil diperbarui real-time.
            </p>
          </div>
          <Badge variant="secondary" className="gap-1 border-violet-500/40 text-violet-700 dark:text-violet-500">
            <Users className="h-3 w-3" /> {newsPolls.length} polling aktif
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {newsPolls.map((poll) => {
            const myVote = votes[poll.id]
            const hasVoted = !!myVote
            const total = totalVoters(poll)

            return (
              <article
                key={poll.id}
                className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-2 flex items-center justify-between">
                  <Badge variant="outline" className="gap-1 text-[10px] uppercase tracking-wider">
                    <Sparkles className="h-3 w-3 text-violet-600" /> Polling
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">
                    {formatNumber(total)} pemilih
                  </span>
                </div>
                <h3 className="mb-1 text-base font-bold leading-snug">
                  {poll.question}
                </h3>
                {poll.description && (
                  <p className="mb-4 text-xs text-muted-foreground">
                    {poll.description}
                  </p>
                )}

                <ul className="flex flex-1 flex-col gap-2">
                  {poll.options.map((opt) => {
                    const base = poll.baseVotes[opt.id] || 0
                    const isMyChoice = myVote === opt.id
                    const finalCount = base + (isMyChoice ? 1 : 0)
                    const pct = total > 0 ? (finalCount / total) * 100 : 0

                    return (
                      <li key={opt.id}>
                        <button
                          onClick={() => handleVote(poll.id, opt.id)}
                          disabled={hasVoted}
                          className={cn(
                            'group relative w-full overflow-hidden rounded-lg border px-4 py-2.5 text-left transition-all',
                            !hasVoted &&
                              'border-border bg-background hover:border-violet-500 hover:bg-violet-50/40 dark:hover:bg-violet-950/20',
                            hasVoted &&
                              'border-border bg-muted/40 cursor-default',
                            isMyChoice && 'border-violet-600 bg-violet-50 dark:bg-violet-950/30',
                          )}
                        >
                          {/* Progress fill */}
                          {hasVoted && (
                            <div
                              className="absolute inset-y-0 left-0 bg-violet-500/15 transition-all duration-700"
                              style={{ width: `${pct}%` }}
                            />
                          )}

                          <div className="relative flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              {isMyChoice ? (
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white">
                                  <Check className="h-3 w-3" />
                                </span>
                              ) : hasVoted ? (
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-[10px] font-bold text-muted-foreground">
                                  {opt.id.toUpperCase()}
                                </span>
                              ) : (
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-muted-foreground/30 text-[10px] font-bold text-muted-foreground group-hover:border-violet-500 group-hover:text-violet-600">
                                  {opt.id.toUpperCase()}
                                </span>
                              )}
                              <span
                                className={cn(
                                  'text-sm font-medium',
                                  isMyChoice && 'text-violet-700 dark:text-violet-400',
                                )}
                              >
                                {opt.label}
                              </span>
                            </div>
                            {hasVoted && (
                              <span className="shrink-0 text-sm font-bold tabular-nums text-muted-foreground">
                                {pct.toFixed(1)}%
                              </span>
                            )}
                          </div>
                        </button>
                      </li>
                    )
                  })}
                </ul>

                <p className="mt-3 text-center text-[11px] text-muted-foreground">
                  {hasVoted
                    ? `Terima kasih sudah memilih!`
                    : 'Pilih satu jawaban untuk melihat hasil'}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
