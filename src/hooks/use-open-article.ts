'use client'

import { useCallback } from 'react'
import { useArticleStore } from '@/lib/article-store'
import type { NewsItem } from '@/lib/news-data'

/**
 * Helper untuk membuka Article Reader dari mana saja.
 * Pakai: const openArticle = useOpenArticle(); <button onClick={() => openArticle(item)} />
 */
export function useOpenArticle() {
  const openArticle = useArticleStore((s) => s.openArticle)
  return useCallback(
    (item: NewsItem) => {
      openArticle(item)
    },
    [openArticle],
  )
}
