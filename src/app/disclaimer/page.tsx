import type { Metadata } from "next";
import { StaticPageShell, Section } from "@/components/news/static-page-shell";
import { REDAKSI_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Disclaimer ${SITE_NAME}: batasan akurasi informasi, konten pihak ketiga, bukan nasihat profesional, serta prosedur koreksi dan hak jawab.`,
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <StaticPageShell
      label="Legal"
      title="Disclaimer"
      intro="Kami berkomitmen pada akurasi, namun pembaca perlu memahami batasan-batasan pemberitaan digital. Berikut penjelasan jujur tentang apa yang kami sediakan dan apa yang bukan."
    >
      <Section title="Akurasi Informasi">
        <p>
          Setiap artikel melalui proses verifikasi redaksi, tetapi berita —
          terutama peristiwa yang sedang berkembang — dapat berubah: angka,
          nama, dan kronologi dapat diperbarui ketika fakta baru terkuak.
          Artikel kami bukan rekaman final peristiwa, melainkan potret
          terbaik pada saat publikasi dan pemutakhirannya.
        </p>
      </Section>

      <Section title="Bukan Nasihat Profesional">
        <p>
          Konten bertema ekonomi, keuangan, kesehatan, dan hukum di situs ini
          bersifat informasi umum untuk pembaca Indonesia, bukan nasihat
          profesional yang ditujukan pada kondisi pribadi Anda. Untuk keputusan
          penting seperti investasi, pengobatan, atau perkara hukum, selalu
          konsultasikan dengan tenaga profesional berizin.
        </p>
      </Section>

      <Section title="Konten & Embed Pihak Ketiga">
        <p>
          Gambar, video, dan sematan media yang muncul dalam artikel
          bersumber dari pihak ketiga atau dipakai dalam koridor kutipan
          pemberitaan. Hak cipta atas materi tersebut tetap milik pemiliknya;
          kredit dicantumkan sepanjang informasi tersedia. Pemilik materi yang
          keberatan dapat menghubungi redaksi dan kami akan segera menindaklanjuti.
        </p>
      </Section>

      <Section title="Tautan Keluar">
        <p>
          Kami menautkan sumber eksternal agar pembaca dapat menelusuri lebih
          jauh. Isi situs pihak ketiga berada di luar kendali dan tanggung
          jawab kami; adanya tautan bukan berarti dukungan atas isi atau
          kebijakan situs tujuan.
        </p>
      </Section>

      <Section title="Koreksi & Hak Jawab">
        <p>
          Menemukan kesalahan? Sampaikan ke{" "}
          <a
            href={`mailto:${REDAKSI_EMAIL}`}
            className="font-semibold text-red-600 hover:underline dark:text-red-400"
          >
            {REDAKSI_EMAIL}
          </a>{" "}
          dengan menyertakan tautan artikel dan bukti pendukung. Koreksi kami
          lakukan secara terbuka di artikel terkait. Pihak yang diberitakan
          berhak mengajukan hak jawab secara proporsional sesuai ketentuan
          perundang-undangan yang berlaku, dan redaksi memberi ruang jawaban
          dalam porsi yang seimbang.
        </p>
      </Section>
    </StaticPageShell>
  );
}
