# 🔥 ViralHariIni.id — Portal Berita Viral Terkini Indonesia

Website portal berita viral premium & profesional yang menyajikan berita paling ramai dibicarakan di Indonesia hari ini. **100% gratis, tanpa paywall**, dengan fitur lengkap modern.

![ViralHariIni.id](public/logo.svg)

## ✨ Fitur Utama

### Konten Berita
- **41 artikel** viral terkini (politik, ekonomi, teknologi, internasional, olahraga, hukum, viral)
- **41 halaman artikel dedicated** dengan URL shareable (`/berita/[slug]`)
- **6 video berita** dengan modal YouTube embed + 3 live TV channels (KOMPASTV, tvOne, CNN Indonesia)
- **Berita nyata** hasil kompilasi dari Kompas, Detik, Tempo, CNN Indonesia, Liputan6, ANTARA, BBC News Indonesia

### Premium Experience
- 🎨 **Logo gradient premium** (amber-orange-red) + favicon SVG + PWA manifest
- 🌗 **Dark/light mode** dengan next-themes
- ⌨️ **Search command palette** (shortcut `/`) dengan hasil real-time dari 41 artikel
- 📖 **Article Reader v3**: TTS (text-to-speech), komentar pembaca, reading progress bar, font size, bookmark, reactions emoji, share multi-platform
- 🔖 **Bookmark panel + halaman dedicated** `/bookmark` dengan localStorage
- 📜 **Riwayat baca** (history dropdown di header)

### Widget Lokal Indonesia
- 🌤️ **Cuaca** 4 kota (Jakarta, Surabaya, Medan, Makassar)
- 🕌 **Jadwal shalat** 4 kota dengan hitung mundur waktu berikutnya
- 📊 **Economic ticker** marquee (IHSG, USD/IDR, EMAS, BTC, dll — 12 instrumen)
- 📅 **Pada Hari Ini** sejarah harian (10 peristiwa, 3 acak per refresh)
- ✨ **Zodiak harian** 12 bintang dengan ramalan + angka/warna hoki

### Interaktif & Engagement
- 📊 **3 polling interaktif** dengan progress bar real-time + localStorage vote
- 🎯 **Tag cloud** 24 trending hashtag dengan search + warna kategori
- 👍 **Reactions emoji** (Like, Love, Wow, Sad, Angry) per artikel
- 💬 **Komentar pembaca** dengan like per komentar

### Compliance & UX
- 🍪 **Cookie consent** banner GDPR-friendly
- 🚫 **Custom 404 page** on-brand
- ⚡ **Loading skeleton** shimmer
- 📱 **PWA installable** (mobile + desktop)
- 🔍 **SEO optimized**: JSON-LD NewsArticle, Open Graph, Twitter Card, sitemap
- ♿ **Accessibility**: semantic HTML, ARIA labels, keyboard nav

## 🚀 Deploy ke Vercel (5 menit)

### Persiapan
1. Akun GitHub (gratis) — https://github.com
2. Akun Vercel (gratis) — https://vercel.com
3. Repo ini sudah siap deploy (lihat `vercel.json`)

### Langkah-langkah

#### Step 1 — Push ke GitHub
```bash
# Clone atau fork project ini ke GitHub
# Pastikan sudah commit semua perubahan
git add -A
git commit -m "feat: ViralHariIni.id v6 — premium + 33 fitur"
git push origin main
```

#### Step 2 — Import ke Vercel
1. Buka https://vercel.com/new
2. Login dengan GitHub
3. Klik **"Import Project"** → pilih repo `viralhariini`
4. Vercel auto-detect sebagai Next.js — **tidak perlu konfigurasi tambahan**
5. Klik **"Deploy"** — tunggu 1-2 menit
6. Dapat URL: `https://viralhariini.vercel.app` (atau nama project Anda)

#### Step 3 — Setup Custom Domain (Opsional)
Jika Anda sudah punya domain:
1. Buka **Project Settings → Domains**
2. Masukkan domain (mis. `viralhariini.id`)
3. Vercel akan kasih instruksi DNS setup
4. HTTPS otomatis aktif (Vercel managed)

## 🌐 Rekomendasi Subdomain Vercel Gratis

Subdomain bawaan Vercel: `https://<nama>.vercel.app`. Berikut 10 rekomendasi premium:

| Subdomain | Status | Alasan |
|---|---|---|
| `viralhariini.vercel.app` | ⭐ Terbaik | Brand cocok, mudah diingat |
| `beritaviral-id.vercel.app` | Tersedia | SEO-friendly dengan keyword |
| `kabarterkini.vercel.app` | Tersedia | Singkat & jelas |
| `viralnews-id.vercel.app` | Tersedia | Kombinasi English+ID |
| `beritahariini.vercel.app` | Tersedia | Sederhana, mudah diingat |
| `kabarviral.vercel.app` | Tersedia | Pendek & catchy |
| `detikviral.vercel.app` | Tersedia | Mirip brand familiar |
| `viralinews.vercel.app` | Tersedia | Modern, kasual |
| `beritacepat.vercel.app` | Tersedia | Fokus kecepatan |
| `viral-update.vercel.app` | Tersedia | Highlight "update" |

**Catatan**: Ketersediaan subdomain Vercel di-check saat pertama deploy. Kalau konflik, Vercel akan kasih alternatif.

## 🌐 Domain TLD Premium (Bisa Beli Nanti)

Untuk produksi serius, pertimbangkan domain berikut:

| Domain | Harga Estimasi/tahun | Catatan |
|---|---|---|
| `viralhariini.id` | Rp 250-500rb | Brand cocok, regional Indonesia |
| `viralhariini.co.id` | Rp 350-600rb | Komersial ID |
| `beritaviral.id` | Rp 250-500rb | Keyword kuat |
| `kabarterkini.id` | Rp 250-500rb | Generic |
| `viralnews.id` | Rp 250-500rb | Modern |
| `beritahariini.id` | Rp 250-500rb | Sederhana |
| `viralhariini.com` | Rp 200-400rb | Internasional |
| `kabarviral.com` | Rp 200-400rb | Internasional |

Beli di: **Spaceship**, **Niagahoster**, **Hostinger**, **Namecheap**, **Cloudflare Registrar**

## 🛠 Tech Stack

- **Framework**: Next.js 16.1.3 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York style)
- **State**: Zustand (persist ke localStorage)
- **Theme**: next-themes (dark/light/system)
- **Icon**: Lucide React
- **Toast**: sonner
- **Fonts**: Geist (Google Fonts)
- **PWA**: Web App Manifest

## 📂 Struktur Folder

```
src/
├── app/
│   ├── berita/[slug]/     # Halaman artikel dedicated (SSG)
│   ├── bookmark/          # Halaman bookmark dedicated
│   ├── not-found.tsx      # Custom 404
│   ├── layout.tsx         # Root layout + global mount
│   ├── page.tsx           # Homepage
│   └── globals.css        # Tailwind + custom utilities
├── components/
│   ├── news/              # 31 komponen berita
│   ├── ui/                # shadcn/ui components
│   ├── theme-provider.tsx
│   └── mode-toggle.tsx
├── hooks/
│   ├── use-open-article.ts
│   ├── use-reader-features.ts  # TTS + Comments
│   ├── use-mobile.ts
│   └── use-toast.ts
├── lib/
│   ├── news-data.ts       # 41 artikel + polling + tags
│   ├── article-store.ts   # Zustand reader store
│   ├── reader-store.ts    # Bookmark + Reaction store
│   ├── search-store.ts    # Search + History store
│   ├── time.ts            # Indonesian date formatter
│   └── utils.ts
└── public/
    ├── favicon.svg
    ├── logo.svg
    ├── manifest.json
    └── robots.txt
```

## 📊 Statistik Project

- **122 file** ter-track di git
- **99 source file** TypeScript/TSX
- **31 komponen** news custom
- **46 static pages** ter-generate saat build
- **41 artikel** dengan konten utuh
- **33 fitur** premium
- **0 lint error**, **0 lint warning**

## 🔧 Development Lokal

```bash
# Install dependencies
bun install

# Run dev server
bun run dev

# Build production
bun run build

# Start production server
bun run start

# Lint
bun run lint
```

## 🎯 Roadmap Selanjutnya (Opsional)

- [ ] Integrate RSS news API untuk auto-update konten
- [ ] WebSocket untuk breaking news real-time
- [ ] Push notification opt-in (Web Push API)
- [ ] Multi-language (ID/EN) dengan next-intl
- [ ] User account dengan NextAuth.js
- [ ] CMS untuk editor berita (Sanity/Strapi)
- [ ] Analytics (Vercel Analytics / Plausible)
- [ ] Infographics & data visualization

## 📝 Lisensi

MIT — bebas pakai, modifikasi, dan distribusi. Beritanya disajikan gratis untuk publik Indonesia.

## 🙏 Credits

Berita dikompilasi dari berbagai portal terpercaya Indonesia:
- Kompas.com, Detik.com, Tempo.co, CNN Indonesia
- Liputan6, ANTARA News, BBC News Indonesia
- SINDOnews, tvOne, KOMPAS TV

---

🇮🇩 **Dibuat dengan ❤️ untuk pembaca berita di seluruh Indonesia**

&copy; 2026 ViralHariIni.id
