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

// —— Kontak & kanal sosial resmi ——
// Semua bisa dioverride lewat env NEXT_PUBLIC_* di Vercel tanpa deploy ulang kode.
// Kosong ("") = tombol/tautan disembunyikan otomatis di footer & halaman kontak.
export const REDAKSI_EMAIL =
  process.env.NEXT_PUBLIC_REDAKSI_EMAIL ?? "redaksi@viralhariini.id";

export type SocialKey =
  | "whatsapp"
  | "telegram"
  | "facebook"
  | "twitter"
  | "instagram"
  | "youtube";

export const SOCIAL_LINKS: Record<SocialKey, string> = {
  whatsapp: process.env.NEXT_PUBLIC_WA_CHANNEL ?? "",
  telegram: process.env.NEXT_PUBLIC_TG_CHANNEL ?? "",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK ?? "",
  twitter: process.env.NEXT_PUBLIC_TWITTER ?? "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM ?? "",
  youtube: process.env.NEXT_PUBLIC_YOUTUBE ?? "",
};

// Pasangan { key, href } yang benar-benar terisi — dipakai UI.
export function activeSocialLinks(): { key: SocialKey; href: string }[] {
  return (Object.entries(SOCIAL_LINKS) as [SocialKey, string][])
    .filter(([, href]) => href.trim().length > 0)
    .map(([key, href]) => ({ key, href }));
}

// —— IndexNow (ping instan ke Bing/Yandex/Seznam/Naver setiap ada konten) ——
// File kunci publik: public/<INDEXNOW_KEY>.txt → https://<host>/<key>.txt
export const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY ?? "e404a73f6a1d685f3951ce98c93a6746";
