import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { ArticleReader } from "@/components/news/article-reader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ViralHariIni.id — Berita Viral & Terkini Hari Ini",
  description:
    "Portal berita viral terkini di Indonesia. Kabar breaking, politik, ekonomi, teknologi, internasional, olahraga, dan hukum yang sedang ramai dibicarakan hari ini.",
  keywords: [
    "berita viral",
    "berita hari ini",
    "breaking news indonesia",
    "politik",
    "ekonomi",
    "teknologi",
    "olahraga",
    "internasional",
  ],
  authors: [{ name: "ViralHariIni.id" }],
  openGraph: {
    title: "ViralHariIni.id — Berita Viral & Terkini Hari Ini",
    description:
      "Portal berita viral terkini Indonesia. Breaking, politik, ekonomi, teknologi, olahraga, dan internasional yang sedang ramai dibahas.",
    siteName: "ViralHariIni.id",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ViralHariIni.id — Berita Viral Hari Ini",
    description: "Berita viral & terkini yang sedang ramai dibahas hari ini.",
  },
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
          <Toaster />
          <SonnerToaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
