import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { ZodiacWidget } from "@/components/news/zodiac-widget";
import { StaticPageShell, Section } from "@/components/news/static-page-shell";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Zodiak Hari Ini — Ramalan Bintang 12 Zodiak Terbaru",
  description: `Zodiak hari ini untuk 12 bintang: Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagitarius, Capricorn, Aquarius, Pisces. Diperbarui setiap hari di ${SITE_NAME}, gratis tanpa login.`,
  alternates: { canonical: "/zodiak" },
};

export default function ZodiakPage() {
  return (
    <StaticPageShell
      label="Hiburan"
      title="Zodiak Hari Ini"
      intro="Ramalan bintang harian untuk ke-12 zodiak — cinta, karier, kesehatan, dan keberuntungan. Diperbarui setiap hari, gratis tanpa login."
    >
      {/* Widget zodiak yang sudah ada di beranda — kini punya halaman sendiri */}
      <ZodiacWidget />

      <Section title="Bintang Anda Hari Ini">
        <p>
          Temukan zodiak Anda berdasarkan tanggal lahir: Aries (21 Maret–19
          April), Taurus (20 April–20 Mei), Gemini (21 Mei–20 Juni), Cancer
          (21 Juni–22 Juli), Leo (23 Juli–22 Agustus), Virgo (23
          Agustus–22 September), Libra (23 September–22 Oktober), Scorpio
          (23 Oktober–21 November), Sagitarius (22 November–21 Desember),
          Capricorn (22 Desember–19 Januari), Aquarius (20 Januari–18
          Februari), dan Pisces (19 Februari–20 Maret).
        </p>
        <p>
          Ramalan zodiak di {SITE_NAME} disusun dari pergerakan bintang yang
          menjadi referensi populer astrologi harian. Jadwalkan keberuntungan
          Anda: simpan halaman ini (bookmark) dan kunjungi setiap pagi untuk
          membaca pembaruan terbaru.
        </p>
      </Section>

      <Section title="Catatan">
        <p>
          Zodiak adalah konten hiburan — bukan ramalan ilmiah. Keputusan
          penting tetaplah berdasarkan fakta dan pertimbangan rasional. Untuk
          berita terkini yang perlu Anda tahu hari ini,{" "}
          <Link href="/" className="font-semibold text-red-600 hover:underline dark:text-red-400">
            kembali ke beranda
          </Link>
          .
        </p>
      </Section>

      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <Sparkles className="h-4 w-4 text-red-600" />
        Halaman ini diperbarui otomatis setiap hari.
      </p>
    </StaticPageShell>
  );
}
