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

---

## Paket Trafik (12 Nov 2026): Discover + IndexNow + Kanal Sosial

### 1. Google Discover — `max-image-preview:large`
Meta `robots` dengan `max-image-preview:large` + `max-snippet:-1` kini terpasang di SEMUA halaman via `src/app/layout.tsx`. Ini syarat teknis agar artikel bisa tampil dengan thumbnail besar di Google Discover (sumber trafik terbesar untuk situs berita Indonesia). Lengkapi dengan: gambar artikel ≥1200px lebar dan judul informatif tanpa clickbait.

### 2. IndexNow — ping instan ke Bing/Yandex/Seznam/Naver
- Kunci publik: `public/e404a73f6a1d685f3951ce98c93a6746.txt` → cek `https://viralhariini.vercel.app/e404a73f6a1d685f3951ce98c93a6746.txt`
- Endpoint: `GET /api/indexnow` — mengirim seluruh URL situs ke `api.indexnow.org`.
- Otomatis: Vercel Cron di `vercel.json` memanggilnya setiap hari **00:30 WIB** (`30 17 * * *` UTC), tepat setelah cron berita 00:00 WIB menambah artikel baru.
- Manual: `curl https://viralhariini.vercel.app/api/indexnow` (respon JSON berisi status IndexNow).
- Hasil status `200/202` = URL diterima dan akan diindeks Bing jauh lebih cepat.

### 3. Kanal sosial & halaman kontak
- Halaman baru: **/kontak** (Kontak & Redaksi) — tip berita, koreksi, hak jawab (UU ITE Pasal 5), iklan, legal. JSON-LD ContactPage + Organization.
- Tombol follow di footer & /kontak dikendalikan `src/lib/site.ts` → `SOCIAL_LINKS`.
- Aktifkan kanal tanpa deploy ulang — set env di Vercel (Settings → Environment Variables):
  - `NEXT_PUBLIC_WA_CHANNEL` — URL WhatsApp Channel, mis. `https://whatsapp.com/channel/0029Vax...`
  - `NEXT_PUBLIC_TG_CHANNEL` — mis. `https://t.me/viralhariiniid`
  - `NEXT_PUBLIC_FACEBOOK`, `NEXT_PUBLIC_TWITTER`, `NEXT_PUBLIC_INSTAGRAM`, `NEXT_PUBLIC_YOUTUBE`
  - `NEXT_PUBLIC_REDAKSI_EMAIL` — ganti email redaksi (default `redaksi@viralhariini.id`)
- Kosong = tombol otomatis disembunyikan (tidak ada link mati).
- Setelah env disimpan di Vercel: Deployments → Redeploy agar env terbaca.

## Tahap Lanjut (12 Nov 2026) — pintu masuk trafik tambahan

### 1. Halaman topik /tag/[slug]
Setiap tag artikel otomatis menjadi halaman topik yang bisa diindeks (SSG via `generateStaticParams`), menarget kata kunci long-tail yang dicari orang (mis. `/tag/prabowo-subianto`, `/tag/bi-rate`). Muncul di sitemap, urlList IndexNow, dan terhubung dari halaman artikel (chip tag) + topik terkait.

### 2. Pencarian /cari
Halaman hasil pencarian server-side (noindex sesuai pedoman Google) dengan tombol "Cari Berita" di header (desktop & mobile). Judul, ringkasan, kategori, dan tag dicocokkan. Bila query kosong, menampilkan 6 artikel trending.

### 3. Widget "Terpopuler"
Peringkat 5 artikel paling banyak dibaca (diambil dari angka `views` tiap artikel, di luar daftar Trending) di sidebar beranda — `src/components/news/most-popular.tsx`. Meningkatkan halaman per sesi dan memompa artikel lama yang masih populer.

### 4. RSS /feed.xml
Feed RSS 2.0 lengkap (judul, ringkasan, kategori, tag, gambar `enclosure`, tanggal RFC 822) + autodiscovery di `<head>` semua halaman (`alternates.types`). Siap disubmit ke Google Publisher Center, Feedly, Inoreader, dan layanan autopost RSS→sosial (mis. Buffer/Zapier) agar setiap artikel baru otomatis terbagikan.

### 5. Google News sitemap /news-sitemap.xml
Sitemap khusus Google News berisi artikel 48 jam terakhir (format `news:news`, tanggal WIB `+07:00`). Terdaftar di `robots.txt`. Saat mendaftar **Google Publisher Center**, tambahkan `https://viralhariini.vercel.app/news-sitemap.xml` sebagai news sitemap → artikel baru terindeks Google News dalam hitungan menit-jam, bukan hari.

### 6. Tombol bagikan per artikel
Setiap artikel punya tombol WhatsApp, Telegram, Facebook, X, bagikan native (mobile), dan salin tautan (`article-reader-actions.tsx`) — jalur viral utama trafik berita Indonesia.
