import type { Metadata } from "next";
import { StaticPageShell, Section } from "@/components/news/static-page-shell";
import { REDAKSI_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description: `Ketentuan penggunaan ${SITE_NAME}: aturan penggunaan situs, hak cipta konten, ketentuan kutipan dan republikasi, serta batasan tanggung jawab.`,
  alternates: { canonical: "/syarat-ketentuan" },
};

export default function SyaratKetentuanPage() {
  return (
    <StaticPageShell
      label="Legal"
      title="Syarat & Ketentuan"
      intro="Dengan mengakses ViralHariIni.id, Anda menyetujui ketentuan di bawah ini. Kami menjaga ketentuan tetap singkat, jelas, dan bebas bahasa hukum yang berbelit."
    >
      <Section title="Penggunaan Situs">
        <p>
          Situs ini disediakan untuk konsumsi informasi pribadi dan non-komersial.
          Anda dipersilakan membaca, membagikan tautan artikel, dan menyimpan
          artikel melalui fitur Bookmark. Anda dilarang menggunakan situs atau
          alat otomatis (bot, scraper, crawler non-mesin pencari) untuk menyalin
          isi situs secara massal, mengganggu ketersediaan layanan, atau
          menyalahgunakannya untuk tujuan yang melanggar hukum.
        </p>
      </Section>

      <Section title="Hak Cipta & Kutipan">
        <p>
          Seluruh artikel, judul, dan grafis orisinal {SITE_NAME} dilindungi
          hak cipta. Anda bebas mengutip sebagian isi artikel secara wajar
          untuk keperluan pemberitaan, ulasan, atau diskusi, dengan syarat
          mencantumkan atribusi nama {SITE_NAME} beserta tautan aktif ke
          artikel aslinya.
        </p>
        <p>
          Republikasi utuh — mencopy-paste seluruh artikel dan
          mempublikasikannya kembali, termasuk diterjemahkan tanpa izin —
          memerlukan izin tertulis dari redaksi melalui{" "}
          <a
            href={`mailto:${REDAKSI_EMAIL}`}
            className="font-semibold text-red-600 hover:underline dark:text-red-400"
          >
            {REDAKSI_EMAIL}
          </a>
          . Konten gambar dan video yang disematkan bersumber dari pihak
          ketiga dan tetap menjadi milik pemilik hak ciptanya masing-masing.
        </p>
      </Section>

      <Section title="Kirim Tip & Materi Pembaca">
        <p>
          Materi yang Anda kirimkan (foto, video, informasi) kepada redaksi
          dinyatakan benar milik Anda atau Anda berhak mengirimkannya. Dengan
          mengirimkan materi, Anda memberi izin kepada kami untuk memverifikasi,
          mengolah, dan mempublikasikannya dengan tetap melindungi identitas
          sumber atas permintaan Anda, sesuai kode etik jurnalistik.
        </p>
      </Section>

      <Section title="Tautan & Layanan Pihak Ketiga">
        <p>
          Situs ini memuat tautan dan sematan (embed) dari layanan pihak
          ketiga, misalnya pemutar video dan kanal sosial. Kami tidak
          mengendalikan dan tidak bertanggung jawab atas isi, kebijakan, atau
          ketersediaan situs pihak ketiga tersebut. Risiko penggunaan tautan
          eksternal berada pada penggunanya.
        </p>
      </Section>

      <Section title="Batasan Tanggung Jawab">
        <p>
          Kami mengupayakan seluruh informasi akurat dan mutakhir, namun
          situs disediakan &quot;sebagaimana adanya&quot; tanpa jaminan tersurat
          maupun tersirat. Dalam batas maksimal yang diizinkan hukum yang
          berlaku, {SITE_NAME} tidak bertanggung jawab atas kerugian langsung
          maupun tidak langsung yang timbul dari penggunaan atau ketidakmampuan
          menggunakan situs ini.
        </p>
      </Section>

      <Section title="Perubahan Ketentuan">
        <p>
          Ketentuan ini dapat diperbarui seiring perkembangan layanan. Setiap
          perubahan berlaku sejak dipublikasikan di halaman ini. Pertanyaan
          mengenai ketentuan dapat dikirim ke email redaksi. Ketentuan ini
          tunduk pada hukum Republik Indonesia.
        </p>
        <p className="text-sm text-muted-foreground">
          Terakhir diperbarui: 12 November 2026.
        </p>
      </Section>
    </StaticPageShell>
  );
}
