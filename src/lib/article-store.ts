// ============================================================
// Zustand store untuk artikel yang sedang aktif dibaca.
// Komponen kartu berita panggil openArticle(item), ArticleReader
// subscribe ke `active` untuk menampilkan modal reader.
// ============================================================

import { create } from 'zustand';
import type { NewsItem } from './news-data';

interface ArticleState {
  active: NewsItem | null;
  openArticle: (item: NewsItem) => void;
  closeArticle: () => void;
}

export const useArticleStore = create<ArticleState>((set) => ({
  active: null,
  openArticle: (item) => set({ active: item }),
  closeArticle: () => set({ active: null }),
}));
