import type { MetadataRoute } from "next";
import { allArticles, getArticleSlug } from "@/lib/news-data";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl("/"), changeFrequency: "hourly", priority: 1 },
    { url: siteUrl("/bookmark"), changeFrequency: "weekly", priority: 0.3 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = allArticles.map((a) => ({
    url: siteUrl(`/berita/${getArticleSlug(a)}`),
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: a.trending ? 0.9 : 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}
