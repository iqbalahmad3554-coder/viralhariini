import type { MetadataRoute } from "next";
import { allArticles, getArticleSlug, categoryMeta } from "@/lib/news-data";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl("/"), changeFrequency: "hourly", priority: 1 },
    { url: siteUrl("/kontak"), changeFrequency: "monthly", priority: 0.4 },
    { url: siteUrl("/tentang-kami"), changeFrequency: "monthly", priority: 0.4 },
    { url: siteUrl("/kebijakan-privasi"), changeFrequency: "yearly", priority: 0.3 },
    { url: siteUrl("/syarat-ketentuan"), changeFrequency: "yearly", priority: 0.3 },
    { url: siteUrl("/disclaimer"), changeFrequency: "yearly", priority: 0.3 },
    { url: siteUrl("/bookmark"), changeFrequency: "weekly", priority: 0.3 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categoryMeta.map((c) => ({
    url: siteUrl(`/kategori/${c.slug}`),
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = allArticles.map((a) => ({
    url: siteUrl(`/berita/${getArticleSlug(a)}`),
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: a.trending ? 0.9 : 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
