import { allArticles, type NewsItem } from "@/lib/news-data";

// Agregator topik (tag) — setiap tag menjadi halaman landing /tag/[slug]
// yang bisa diindeks, menarget keyword long-tail yang dicari orang.

export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface TagEntry {
  slug: string;
  label: string; // nama tag asli (dari artikel)
  count: number;
  articles: NewsItem[];
}

// Semua tag unik, diurutkan dari yang paling banyak artikelnya.
export function getAllTags(): TagEntry[] {
  const map = new Map<string, TagEntry>();
  for (const article of allArticles) {
    for (const tag of article.tags ?? []) {
      const slug = slugifyTag(tag);
      if (!slug) continue;
      const entry = map.get(slug);
      if (entry) {
        // Hindari duplikat artikel pada tag yang mirip (mis. kapitalisasi beda)
        if (!entry.articles.some((a) => a.id === article.id)) {
          entry.articles.push(article);
          entry.count += 1;
        }
      } else {
        map.set(slug, { slug, label: tag, count: 1, articles: [article] });
      }
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function getTagBySlug(slug: string): TagEntry | undefined {
  return getAllTags().find((t) => t.slug === slug);
}

// Topik terkait: tag lain yang sering muncul bersama pada artikel yang sama.
export function getRelatedTags(slug: string, limit = 8): TagEntry[] {
  const tag = getTagBySlug(slug);
  if (!tag) return [];
  const freq = new Map<string, { label: string; n: number }>();
  for (const article of tag.articles) {
    for (const t of article.tags ?? []) {
      const s = slugifyTag(t);
      if (!s || s === slug) continue;
      const cur = freq.get(s);
      if (cur) cur.n += 1;
      else freq.set(s, { label: t, n: 1 });
    }
  }
  return [...freq.entries()]
    .sort((a, b) => b[1].n - a[1].n)
    .slice(0, limit)
    .map(([s, { label, n }]) => ({
      slug: s,
      label,
      count: n,
      articles: [],
    }));
}
