# Panduan SEO & Analitik — ViralHariIni.id

Panduan ini menjelaskan cara mengaktifkan Google Search Console, mengirim
sitemap, dan membaca data Core Web Vitals di Vercel. Waktu yang dibutuhkan:
± 10 menit. Semua fitur kode sudah terpasang di situs — Anda hanya perlu
klik di dashboard.

---

## 1. Google Search Console (wajib — agar artikel muncul di Google)

### 1a. Buat properti

1. Buka <https://search.google.com/search-console> dan login dengan akun Google.
2. Klik **Add property / Tambahkan properti**.
3. Pilih tipe **URL prefix** (bukan Domain), isi:
   `https://viralhariini.vercel.app`

### 1b. Verifikasi kepemilikan (metode HTML tag) — SUDAH TERPASANG

> **Status: token verifikasi sudah tertanam di kode situs.** Meta tag
> `<meta name="google-site-verification" content="eFWZ...">` sudah muncul
> di semua halaman. Anda cukup membuka Search Console → pilih metode
> **HTML tag** → langsung klik **Verify** tanpa mengubah apa pun.
>
> (Jika suatu hari token berubah: set env `NEXT_PUBLIC_GSC_VERIFICATION`
> di Vercel → redeploy — env akan menimpa token default.)

### 1c. Kirim sitemap

1. Di menu kiri Search Console pilih **Sitemaps**.
2. Isi: `sitemap.xml` → klik **Submit**.
3. Statusnya akan "Success" — Google mulai meng-crawl 58 URL
   (beranda, 8 halaman kategori, 41 artikel, bookmark).

### 1d. Percepat indeksasi (opsional tapi disarankan)

- Menu **URL Inspection** → tempel URL beranda → **Request Indexing**.
- Ulangi untuk beberapa halaman kategori: `/kategori/viral`,
  `/kategori/politik`, `/kategori/ekonomi`.

---

## 2. Bing Webmaster (opsional — +15-20% trafik pencarian)

1. Buka <https://www.bing.com/webmasters> → login → pilih **Import from
   Google Search Console** (paling cepat, langsung verifikasi).
2. Atau verifikasi manual dengan HTML tag, lalu set env
   `NEXT_PUBLIC_BING_VERIFICATION` di Vercel (mekanisme sama dengan GSC)
   dan redeploy.
3. Kirim sitemap yang sama: `https://viralhariini.vercel.app/sitemap.xml`.

---

## 3. Vercel Analytics & Speed Insights (sudah aktif otomatis)

Keduanya sudah terpasang di kode dan aktif di production — tidak perlu
konfigurasi tambahan.

| Fitur | Lokasi di dashboard | Yang bisa dilihat |
| --- | --- | --- |
| **Vercel Analytics** | Project → tab **Analytics → Audience** | Pengunjung, halaman terpopuler, sumber referrer |
| **Speed Insights** | Project → tab **Speed Insights** | Core Web Vitals (LCP, CLS, TTFB, dll.) per halaman & perangkat |

Catatan: data audience mulai terkumpul setelah ada pengunjung nyata
(beberapa jam hingga sehari). Data Speed Insights terkumpul dari pengunjung
dengan browser modern.

---

## 4. Checklist harian pertumbuhan

- [ ] Cek Search Console → **Performance** untuk kata kunci yang mulai naik.
- [ ] Cek Vercel Analytics → halaman mana yang paling banyak dibaca, lalu
      buat artikel lanjutan topik serupa.
- [ ] Bagikan artikel terbaik ke WhatsApp/Telegram (tombol share sudah ada
      di setiap artikel).
- [ ] Jika memakai custom domain nanti: update env `NEXT_PUBLIC_SITE_URL`
      di Vercel, lalu kirim ulang sitemap — semua URL kanonik & JSON-LD
      akan otomatis mengikuti.

---

## Ringkasan perubahan kode terkait

- `@vercel/speed-insights` terpasang, `<SpeedInsights />` aktif di
  `src/app/layout.tsx`.
- Verifikasi mesin pencari via env: `NEXT_PUBLIC_GSC_VERIFICATION`
  (Google) dan `NEXT_PUBLIC_BING_VERIFICATION` (Bing) di
  `src/app/layout.tsx` → muncul sebagai meta tag di semua halaman.
