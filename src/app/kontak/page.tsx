import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  Flame,
  Send,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ShieldCheck,
  Megaphone,
  Scale,
} from "lucide-react";
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  siteUrl,
  REDAKSI_EMAIL,
  SOCIAL_LINKS,
  type SocialKey,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontak & Redaksi",
  description: `Hubungi redaksi ${SITE_NAME}: kirim berita viral, laporan tip, koreksi, hak jawab, serta kerja sama iklan dan partnership. Respons cepat pada jam kerja.`,
  alternates: { canonical: "/kontak" },
  openGraph: {
    title: `Kontak & Redaksi · ${SITE_NAME}`,
    description:
      "Kirim berita viral, laporan tip, koreksi, hak jawab, dan kerja sama iklan ke redaksi ViralHariIni.id.",
    type: "website",
    locale: "id_ID",
    url: siteUrl("/kontak"),
  },
};

// JSON-LD: ContactPage + Organization (memberi mesin pencari info kontak resmi).
const socialSameAs = Object.values(SOCIAL_LINKS).filter((h) => h.length > 0);
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      name: `Kontak & Redaksi · ${SITE_NAME}`,
      url: siteUrl("/kontak"),
      description:
        "Halaman kontak resmi redaksi ViralHariIni.id: tip berita, koreksi, hak jawab, dan kerja sama.",
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: siteUrl("/") },
    },
    {
      "@type": "Organization",
      name: SITE_NAME,
      url: siteUrl("/"),
      email: REDAKSI_EMAIL,
      ...(socialSameAs.length > 0 ? { sameAs: socialSameAs } : {}),
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "editorial",
          email: REDAKSI_EMAIL,
          availableLanguage: ["Indonesian"],
        },
      ],
    },
  ],
};

const socialIcons: Record<
  SocialKey,
  { label: string; icon: typeof Send; form: string }
> = {
  whatsapp: { label: "WhatsApp Channel", icon: MessageCircle, form: "https://whatsapp.com" },
  telegram: { label: "Telegram", icon: Send, form: "https://t.me" },
  facebook: { label: "Facebook", icon: Facebook, form: "https://facebook.com" },
  twitter: { label: "Twitter / X", icon: Twitter, form: "https://x.com" },
  instagram: { label: "Instagram", icon: Instagram, form: "https://instagram.com" },
  youtube: { label: "YouTube", icon: Youtube, form: "https://youtube.com" },
};

const mailto = (subject: string) =>
  `mailto:${REDAKSI_EMAIL}?subject=${encodeURIComponent(subject)}`;

const channels = [
  {
    icon: Flame,
    title: "Kirim Berita Viral / Laporan Tip",
    desc: "Ada peristiwa menarik di sekitar Anda? Video, foto, atau cerita yang layak jadi berita? Kirim ke redaksi — anonimitas sumber kami jamin sesuai kode etik jurnalistik.",
    cta: "Kirim Tip Berita",
    href: mailto("Tip Berita Viral — ViralHariIni.id"),
  },
  {
    icon: ShieldCheck,
    title: "Koreksi & Right of Reply",
    desc: "Menemukan ketidakakuratan dalam artikel kami? Sampaikan bukti dan sumbernya. Kami mengoreksi secara transparan. Lembaga/perorangan juga dapat mengajukan hak jawab sesuai Pasal 5 UU ITE.",
    cta: "Ajukan Koreksi",
    href: mailto("Koreksi Artikel — ViralHariIni.id"),
  },
  {
    icon: Megaphone,
    title: "Iklan & Kerja Sama",
    desc: "Media kit, banner, native advertising, hingga kolaborasi konten. Kami siap membantu brand menjangkau pembaca Indonesia yang aktif setiap hari.",
    cta: "Proposal Kerja Sama",
    href: mailto("Kerja Sama & Iklan — ViralHariIni.id"),
  },
  {
    icon: Scale,
    title: "Legal & Pedoman Media Siber",
    desc: "Surat resmi, somasi, permintaan pencabutan konten, atau pertanyaan soal kepatuhan pada Pedoman Pemberitaan Media Siber Dewan Pers — masuk ke jalur legal redaksi.",
    cta: "Hubungi Bagian Legal",
    href: mailto("Legal — ViralHariIni.id"),
  },
];

export default function KontakPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Kepala halaman */}
      <header className="text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-red-600">
          Redaksi ViralHariIni.id
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Kontak &amp; Redaksi
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Kami membaca setiap pesan yang masuk. Untuk urusan editorial, kirim
          email ke alamat resmi redaksi di bawah — respons pada jam kerja
          (Senin–Jumat, 09.00–17.00 WIB).
        </p>
        <a
          href={`mailto:${REDAKSI_EMAIL}`}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-bold text-red-700 transition-colors hover:bg-red-600 hover:text-white dark:border-red-900 dark:bg-red-950"
        >
          <Mail className="h-4 w-4" />
          {REDAKSI_EMAIL}
        </a>
      </header>

      {/* Jalur kontak */}
      <section className="mt-12 grid gap-4 sm:grid-cols-2">
        {channels.map((c) => (
          <div
            key={c.title}
            className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600/10 text-red-600">
              <c.icon className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-lg font-bold">{c.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {c.desc}
            </p>
            <a
              href={c.href}
              className="mt-4 inline-block text-sm font-bold text-red-600 hover:underline dark:text-red-400"
            >
              {c.cta} &rarr;
            </a>
          </div>
        ))}
      </section>

      {/* Kanal sosial resmi */}
      <section className="mt-12 rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold">Ikuti Kanal Resmi Kami</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Dapatkan berita paling viral langsung di kanal sosial favorit Anda.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {(Object.keys(socialIcons) as SocialKey[]).map((key) => {
            const conf = socialIcons[key];
            const href = SOCIAL_LINKS[key];
            const Icon = conf.icon;
            const active = href.trim().length > 0;
            return active ? (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold transition-colors hover:border-red-500 hover:bg-red-600 hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {conf.label}
              </a>
            ) : (
              <span
                key={key}
                aria-disabled
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-border px-4 py-2 text-sm font-medium text-muted-foreground/60"
              >
                <Icon className="h-4 w-4" />
                {conf.label} · Segera
              </span>
            );
          })}
        </div>
      </section>

      <p className="mt-10 text-center text-sm text-muted-foreground">
        Ingin membaca dulu sebelum menghubungi?{" "}
        <Link href="/" className="font-bold text-red-600 hover:underline dark:text-red-400">
          Jelajahi berita terbaru
        </Link>
      </p>
    </main>
  );
}
