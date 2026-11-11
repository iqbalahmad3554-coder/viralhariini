'use client'

// ============================================================
// Search Store + Reading History (localStorage-backed)
// ============================================================

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { allArticles, type NewsItem } from '@/lib/news-data'

interface SearchState {
  query: string
  isOpen: boolean
  setQuery: (q: string) => void
  setOpen: (open: boolean) => void
  toggle: () => void
  close: () => void
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set, _get) => ({
      query: '',
      isOpen: false,
      setQuery: (q) => set({ query: q }),
      setOpen: (open) => set({ isOpen: open }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      close: () => set({ isOpen: false }),
    }),
    { name: 'vhi-search-ui' },
  ),
)

// ============================================================
// Reading History — track artikel terakhir dibaca
// ============================================================
interface HistoryState {
  history: Array<{ id: string; ts: number }>
  add: (id: string) => void
  remove: (id: string) => void
  clear: () => void
  getAll: () => Array<NewsItem & { ts: number }>
}

const getArticleById = (id: string): NewsItem | undefined =>
  allArticles.find((a) => a.id === id)

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      history: [],
      add: (id) =>
        set((s) => {
          // dedupe + cap 20
          const next = [
            { id, ts: Date.now() },
            ...s.history.filter((h) => h.id !== id),
          ].slice(0, 20)
          return { history: next }
        }),
      remove: (id) =>
        set((s) => ({ history: s.history.filter((h) => h.id !== id) })),
      clear: () => set({ history: [] }),
      getAll: () =>
        get()
          .history.map((h) => {
            const a = getArticleById(h.id)
            return a ? { ...a, ts: h.ts } : null
          })
          .filter(Boolean) as Array<NewsItem & { ts: number }>,
    }),
    { name: 'vhi-history' },
  ),
)

// ============================================================
// Bookmark helper — ambil list artikel tersimpan
// ============================================================
import { useBookmarkStore as _bmStore } from '@/lib/reader-store'
export { _bmStore as useBookmarkStore }

export function getBookmarkedArticles(): NewsItem[] {
  const ids = _bmStore.getState().bookmarks
  return ids
    .map((id) => allArticles.find((a) => a.id === id))
    .filter(Boolean) as NewsItem[]
}
