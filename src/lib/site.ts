// Konstanta & helper URL situs — dipakai metadata, sitemap, feed, JSON-LD.
// Bisa dioverride lewat env NEXT_PUBLIC_SITE_URL (mis. saat custom domain aktif).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://viralhariini.vercel.app";

export const SITE_NAME = "ViralHariIni.id";

export const SITE_DESCRIPTION =
  "Portal berita viral terkini di Indonesia. Kabar breaking, politik, ekonomi, teknologi, internasional, olahraga, dan hukum yang sedang ramai dibicarakan hari ini. Gratis tanpa paywall.";

export function siteUrl(path = ""): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
