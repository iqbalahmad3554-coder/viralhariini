import type { Metadata } from "next";
import { StaticPageShell, Section, Points } from "@/components/news/static-page-shell";
import { REDAKSI_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: `Bagaimana ${SITE_NAME} mengumpulkan, menggunakan, dan melindungi data Anda: analitik anonim, bookmark lokal di perangkat, cookie fungsional, dan hak pengguna.`,
  alternates: { canonical: "/kebijakan-privasi" },
};

export default function KebijakanPrivasiPage() {
  return (
    <StaticPageShell
      label="Privasi"
      title="Kebijakan Privasi"
      intro="Privasi pembaca adalah prioritas kami. Halaman ini menjelaskan data apa yang diproses saat Anda mengakses ViralHariIni.id, untuk keperluan apa, dan kendali apa yang Anda miliki."
    >
      <Section title="Ringkasan Singkat">
        <Points
          items={[
            "Kami tidak meminta Anda membuat akun dan tidak menjual data pribadi.",
            "Bookmark artikel Anda tersimpan di perangkat Anda sendiri, bukan di server kami.",
            "Analitik trafik bersifat agregat dan anonim — kami tidak tahu identitas Anda.",
            "Anda dapat menghapus jejak kapan saja melalui pengaturan peramban.",
          ]}
        />
      </Section>

      <Section title="Data yang Kami Proses">
        <p>
          <strong>Data teknis otomatis.</strong> Saat Anda membuka situs,
          server kami mencatat informasi teknis standar seperti alamat IP
          tersingkat, jenis perangkat, peramban, halaman yang dilihat, dan
          waktu kunjungan. Data ini diproses oleh layanan analitik Vercel
          dalam bentuk agregat untuk mengukur performa situs dan artikel mana
          yang paling dibermanfaatkan pembaca.
        </p>
        <p>
          <strong>Data lokal di perangkat Anda.</strong> Fitur Bookmark dan
          preferensi tampilan (misalnya tema terang/gelap) disimpan di
          penyimpanan lokal peramban (localStorage) pada perangkat Anda. Data
          ini tidak pernah dikirim ke server kami dan hilang jika Anda
          menghapus data peramban.
        </p>
        <p>
          <strong>Data yang Anda kirim sendiri.</strong> Kami baru menerima
          identitas Anda apabila Anda menghubungi redaksi melalui email — dan
          hanya alamat email serta isi pesan tersebut, yang kami gunakan
          semata untuk menindaklanjuti pesan Anda.
        </p>
      </Section>

      <Section id="cookie" title="Cookie">
        <p>
          Kami menggunakan cookie dan penyimpanan lokal yang bersifat
          fungsional: menyimpan persetujuan Anda pada banner cookie, preferensi
          tema, serta pengukuran trafik agregat. Kami tidak menggunakan cookie
          untuk melacak Anda di situs lain atau memprofiling untuk iklan
          pihak ketiga.
        </p>
        <p>
          Anda dapat menghapus atau memblokir cookie melalui pengaturan
          peramban Anda kapan saja. Perlu dicatat, memblokir cookie fungsional
          dapat membuat preferensi seperti tema dan persetujuan terreset
          setiap kunjungan.
        </p>
      </Section>

      <Section title="Konten Pihak Ketiga">
        <p>
          Beberapa halaman menyematkan konten pihak ketiga, misalnya pemutar
          video YouTube. Ketika konten semacam itu dimuat, penyedianya dapat
          menerapkan kebijakan privasi dan cookie mereka sendiri. Kami
          menganjurkan Anda membaca kebijakan penyedia terkait; interaksi Anda
          dengan konten pihak ketiga berada di luar kendali kami.
        </p>
      </Section>

      <Section title="Keamanan & Penyimpanan">
        <p>
          Seluruh lalu lintas situs dienkripsi menggunakan HTTPS. Data analitik
          disimpan dalam bentuk agregat oleh penyedia infrastruktur kami dan
          tidak digunakan untuk mengidentifikasi individu. Karena kami tidak
          menyimpan data pribadi dalam basis data, tidak ada basis data profil
          pembaca yang berisiko dibocorkan.
        </p>
      </Section>

      <Section title="Hak Anda & Kontak">
        <p>
          Anda berhak meminta informasi, perbaikan, atau penghapusan email yang
          pernah Anda kirimkan ke redaksi. Ajukan permintaan tersebut ke{" "}
          <a
            href={`mailto:${REDAKSI_EMAIL}`}
            className="font-semibold text-red-600 hover:underline dark:text-red-400"
          >
            {REDAKSI_EMAIL}
          </a>{" "}
          dan kami akan menindaklanjuti pada jam kerja. Kebijakan ini dapat
          kami perbarui sewaktu-waktu; versi terbaru selalu tersedia di
          halaman ini dengan tanggal pembaruan tercantum di bawah.
        </p>
        <p className="text-sm text-muted-foreground">
          Terakhir diperbarui: 12 November 2026.
        </p>
      </Section>
    </StaticPageShell>
  );
}
