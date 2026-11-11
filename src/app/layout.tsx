import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { ArticleReader } from "@/components/news/article-reader";
import { SearchModal } from "@/components/news/search-modal";
import { CookieConsent } from "@/components/news/cookie-consent";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://viralhariini.id"),
  title: {
    default: "ViralHariIni.id — Berita Viral & Terkini Hari Ini",
    template: "%s · ViralHariIni.id",
  },
  description:
    "Portal berita viral terkini di Indonesia. Kabar breaking, politik, ekonomi, teknologi, internasional, olahraga, dan hukum yang sedang ramai dibicarakan hari ini. Gratis tanpa paywall.",
  keywords: [
    "berita viral",
    "berita hari ini",
    "breaking news indonesia",
    "politik",
    "ekonomi",
    "teknologi",
    "olahraga",
    "internasional",
    "gibran mundur",
    "prabowo",
  ],
  authors: [{ name: "ViralHariIni.id" }],
  creator: "ViralHariIni.id",
  publisher: "ViralHariIni.id",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "ViralHariIni.id — Berita Viral & Terkini Hari Ini",
    description:
      "Portal berita viral terkini Indonesia. Breaking, politik, ekonomi, teknologi, olahraga, dan internasional yang sedang ramai dibahas. Gratis, tanpa paywall.",
    siteName: "ViralHariIni.id",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "ViralHariIni.id — Berita Viral Hari Ini",
    description: "Berita viral & terkini yang sedang ramai dibahas hari ini.",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#dc2626" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ArticleReader />
          <SearchModal />
          <CookieConsent />
          <Toaster />
          <SonnerToaster position="bottom-right" richColors closeButton />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
