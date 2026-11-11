'use client'

// ============================================================
// Bookmark & Reaction Store (localStorage-backed)
// ============================================================

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BookmarkState {
  bookmarks: string[] // array of article ids
  toggle: (id: string) => boolean // returns true if now bookmarked
  isBookmarked: (id: string) => boolean
  count: () => number
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      toggle: (id) => {
        const cur = get().bookmarks
        const exists = cur.includes(id)
        const next = exists ? cur.filter((b) => b !== id) : [...cur, id]
        set({ bookmarks: next })
        return !exists // true if now bookmarked (newly added)
      },
      isBookmarked: (id) => get().bookmarks.includes(id),
      count: () => get().bookmarks.length,
    }),
    { name: 'vhi-bookmarks' },
  ),
)

interface ReactionState {
  // Map<articleId, reactionType>
  reactions: Record<string, string>
  setReaction: (articleId: string, type: string) => void
  getReaction: (articleId: string) => string | undefined
}

export const useReactionStore = create<ReactionState>()(
  persist(
    (set, get) => ({
      reactions: {},
      setReaction: (articleId, type) =>
        set((s) => ({
          reactions: { ...s.reactions, [articleId]: type },
        })),
      getReaction: (articleId) => get().reactions[articleId],
    }),
    { name: 'vhi-reactions' },
  ),
)

// Reaction metadata
export const REACTIONS = [
  { id: 'like', emoji: '👍', label: 'Suka', base: 0 },
  { id: 'love', emoji: '❤️', label: 'Cinta', base: 0 },
  { id: 'wow', emoji: '😮', label: 'Wow', base: 0 },
  { id: 'sad', emoji: '😢', label: 'Sedih', base: 0 },
  { id: 'angry', emoji: '😡', label: 'Marah', base: 0 },
] as const

// Helper: pseudo-random base count per article (deterministic)
export function getReactionBaseCount(articleId: string, reactionId: string): number {
  // simple hash
  const str = `${articleId}-${reactionId}`
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0
  }
  // 50 - 5000
  return 50 + (h % 4950)
}
