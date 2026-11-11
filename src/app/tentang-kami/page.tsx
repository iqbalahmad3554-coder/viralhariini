import type { Metadata } from "next";
import { StaticPageShell, Section, Points } from "@/components/news/static-page-shell";
import { REDAKSI_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tentang Kami & Redaksi",
  description: `Profil ${SITE_NAME}: portal berita viral terverifikasi Indonesia. Kenali redaksi, kode etik jurnalistik, pedoman media siber, peluang karier, dan cara memasang aplikasi web kami.`,
  alternates: { canonical: "/tentang-kami" },
};

export default function TentangKamiPage() {
  return (
    <StaticPageShell
      label="Tentang Kami"
      title="Tentang ViralHariIni.id"
      intro="Portal berita independen untuk pembaca Indonesia: kami mengangkat topik yang sedang ramai dibicarakan, lalu memverifikasinya dengan standar jurnalisme — bukan sekadar menyalin rumor."
    >
      <Section title="Profil & Misi">
        <p>
          {SITE_NAME} adalah portal berita digital Indonesia yang berfokus pada
          peristiwa viral, politik, ekonomi, teknologi, olahraga, hukum, dan
          isu internasional. Kami lahir dari satu keyakinan sederhana: topik
          yang paling banyak diperbicarakan justru paling rawan disalahpahami,
          sehingga justru topik itulah yang paling butuh pemberitaan yang
          akurat dan berimbang.
        </p>
        <p>
          Misi kami adalah menyajikan berita yang cepat tanpa mengorbankan
          kebenaran, menarik tanpa jebakan clickbait, dan lengkap tanpa
          paywall. Seluruh artikel dapat dibaca gratis, karena kami percaya
          akses terhadap informasi adalah hak setiap pembaca.
        </p>
      </Section>

      <Section title="Cara Redaksi Bekerja">
        <p>
          Setiap berita melewati alur editorial yang sama: pemantauan tren dan
          laporan awal, verifikasi minimal dua sumber independen, penulisan
          dengan konteks yang jelas, lalu pemutakhiran berkelanjutan ketika
          fakta berkembang. Judul dibuat sesuai isi artikel — kami menolak
          judul yang menyesatkan meskipun itu menaikkan klik.
        </p>
        <p>
          Bila Anda menemukan ketidakakuratan dalam artikel kami, tim redaksi
          siap mengoreksi secara transparan. Lihat halaman{" "}
          <a href="/kontak" className="font-semibold text-red-600 hover:underline dark:text-red-400">
            Kontak &amp; Redaksi
          </a>{" "}
          untuk jalur koreksi dan hak jawab.
        </p>
      </Section>

      <Section id="kode-etik" title="Kode Etik Jurnalistik">
        <p>
          Redaksi mengacu pada Kode Etik Jurnalistik yang ditetapkan Dewan
          Pers, dengan prinsip yang kami pegang dalam setiap pemberitaan:
        </p>
        <Points
          items={[
            "Independen: tidak mengarahkan pembaca mengikuti pendapat tertentu dari pemberitaan kami.",
            "Akurat: verifikasi fakta sebelum publikasi; dugaan tidak dilaporkan sebagai fakta.",
            "Berimbang: ruang yang proporsional bagi pihak-pihak yang relevan dalam sebuah peristiwa.",
            "Menghormati privasi dan martabat manusia, kecuali kepentingan publik menuntut sebaliknya.",
            "Selalu mengasumsikan tak bersalah setiap orang yang terlibat persoalan hukum.",
            "Melakukan koreksi, hak jawab, dan hak koreksi secara terbuka.",
          ]}
        />
      </Section>

      <Section id="pedoman-media-siber" title="Pedoman Pemberitaan Media Siber">
        <p>
          Untuk pemberitaan di ranah digital, redaksi mengikuti Pedoman
          Pemberitaan Media Siber Dewan Pers. Informasi dari media sosial dan
          dunia maya wajib diverifikasi ulang ke sumber aslinya sebelum
          dipublikasikan — viral bukan bukti kebenaran.
        </p>
        <p>
          Kami juga memastikan ruang hak jawab dan pencabutan berjalan
          proporsional: materi yang terbukti keliru kami cabut atau koreksi
          dengan dicantumkan secara terbuka, dan pihak yang diberitakan
          memperoleh kesempatan menjawab dengan porsi yang setara.
        </p>
      </Section>

      <Section id="karier" title="Karier & Kontributor">
        <p>
          Kami terbuka bagi wartawan muda, penulis lepas, dan kontributor yang
          tertarik pada pemberitaan viral yang berintegritas. Kirim surat
          lamaran, riwayat hidup, dan portofolio karya ke email redaksi{" "}
          <a
            href={`mailto:${REDAKSI_EMAIL}`}
            className="font-semibold text-red-600 hover:underline dark:text-red-400"
          >
            {REDAKSI_EMAIL}
          </a>{" "}
          dengan subjek &quot;Karier — [Posisi]&quot;.
        </p>
      </Section>

      <Section id="aplikasi" title="Aplikasi Web (PWA)">
        <p>
          Situs ini dapat dipasang langsung sebagai aplikasi di ponsel Anda —
          tanpa unduhan toko aplikasi, ringan, dan selalu mutakhir.
        </p>
        <Points
          items={[
            "Android (Chrome): buka menu \u22ee di peramban, pilih \"Install app\" atau \"Tambahkan ke layar utama\".",
            "iPhone/iPad (Safari): ketuk tombol Bagikan, lalu pilih \"Add to Home Screen\".",
            "Desktop (Chrome/Edge): klik ikon install di bilah alamat.",
          ]}
        />
      </Section>

      <Section id="ikuti" title="Ikuti & Langganan">
        <p>
          Ikuti kami melalui kanal resmi agar tidak ketinggalan berita paling
          viral setiap hari: umpan RSS kami tersedia di{" "}
          <a href="/feed.xml" className="font-semibold text-red-600 hover:underline dark:text-red-400">
            /feed.xml
          </a>
          , dan kanal WhatsApp serta Telegram kami segera hadir — tombol
          langganan akan aktif otomatis begitu kanal resmi diluncurkan.
          Pembaca juga dapat menyimpan artikel favorit melalui fitur Bookmark
          tanpa perlu membuat akun.
        </p>
      </Section>
    </StaticPageShell>
  );
}
