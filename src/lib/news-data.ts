// ============================================================
// Data Berita Viral Terkini - 12 November 2026
// Sumber: kompilasi dari berbagai portal berita Indonesia
// ============================================================

export type NewsCategory =
  | "Politik"
  | "Ekonomi"
  | "Teknologi"
  | "Internasional"
  | "Olahraga"
  | "Hukum"
  | "Viral"
  | "Lingkungan";

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
  author: string;
  publishedAt: string; // ISO-like display string
  readTime: number; // minutes
  views: string; // formatted, e.g. "12,4 rb"
  trending?: boolean;
  imageHue: number; // 0-360 for gradient
  featured?: boolean;
}

// ---- BREAKING TICKER ----
export const breakingNews: string[] = [
  "BREAKING: Wapres Gibran Rakabuming Raka serahkan surat pengunduran diri kepada Presiden Prabowo Subianto pukul 16.00 WIB",
  "Kasus dugaan penyadapan ilegal terhadap Presiden Prabowo: tersangka baru diungkap Polda Metro",
  "Aksi demonstrasi Hari Pahlawan di UGM Yogyakarta menyisakan situasi tegang, 21 anak di bawah umur diamankan",
  "Trump tandatangani perintah menetapkan Oval Office sebagai monumen nasional AS, menuai kontroversi",
  "FortiGuard Labs catat 350.600 aktivitas ancaman siber terdeteksi di Indonesia pada 7 November 2026",
];

// ---- HERO / FEATURED ----
export const heroNews: NewsItem = {
  id: "hero-01",
  title:
    "Gibran Serahkan Surat Pengunduran Diri dari Jabatan Wapres kepada Prabowo Subianto",
  excerpt:
    "Wakil Presiden Gibran Rakabuming Raka dikabarkan telah menyerahkan surat pengunduran diri kepada Presiden Prabowo Subianto pada Rabu (11/11/2026) pukul 16.00 WIB. Ketum Projo Budi Arie Setiadi membenarkan informasi tersebut di tengah polemik ijazah yang sedang bergulir di pengadilan.",
  category: "Politik",
  author: "Redaksi Kompas",
  publishedAt: "12 Nov 2026, 06:45 WIB",
  readTime: 4,
  views: "284 rb",
  trending: true,
  imageHue: 0,
  featured: true,
};

// ---- TOP STORIES (grid utama) ----
export const topStories: NewsItem[] = [
  {
    id: "top-01",
    title:
      "Aksi Demonstrasi Hari Pahlawan di UGM Yogyakarta Menyisakan Situasi Tegang",
    excerpt:
      "Aksi unjuk rasa menyambut Hari Pahlawan 10 November 2026 di sekitar Universitas Gadjah Mada berakhir ricuh. Polda DIY telah memulangkan 21 anak di bawah umur yang diamankan.",
    category: "Viral",
    author: "Detik News",
    publishedAt: "11 Nov 2026, 22:10 WIB",
    readTime: 3,
    views: "98,3 rb",
    trending: true,
    imageHue: 12,
  },
  {
    id: "top-02",
    title:
      'Aksi Heroik "Emak-emak" Indonesia Tangkap Komplotan Pencopet di Paris Jadi Viral',
    excerpt:
      "Sebuah video memperlihatkan aksi heroik sekelompok ibu-ibu asal Indonesia yang berhasil menangkap komplotan pencopet di Paris, Prancis. Video tersebut meledak di media sosial.",
    category: "Viral",
    author: "Liputan6",
    publishedAt: "11 Nov 2026, 19:32 WIB",
    readTime: 2,
    views: "156 rb",
    trending: true,
    imageHue: 32,
  },
  {
    id: "top-03",
    title:
      "Dugaan Penyadapan Ilegal terhadap Presiden Prabowo: Tersangka Baru Diungkap",
    excerpt:
      "Polda Metro Jaya mengungkap perkembangan baru dalam kasus dugaan penyadapan ilegal (unlawful intercept) terhadap Presiden Prabowo Subianto. Identitas tersangka masih dalam penyelidikan.",
    category: "Hukum",
    author: "tvOne",
    publishedAt: "11 Nov 2026, 17:05 WIB",
    readTime: 5,
    views: "112 rb",
    trending: true,
    imageHue: 250,
  },
  {
    id: "top-04",
    title:
      "12 Wilayah Pesisir Jakarta Diminta Waspada Ancaman Banjir Rob Besok",
    excerpt:
      "BMKG memprediksi masih ada ancaman banjir rob di 12 wilayah pesisir Jakarta. Warga diminta mewaspadai pasang tertinggi yang terjadi pada siang hari.",
    category: "Lingkungan",
    author: "Kompas.com",
    publishedAt: "12 Nov 2026, 05:20 WIB",
    readTime: 3,
    views: "47,8 rb",
    imageHue: 190,
  },
];

// ---- TRENDING (sidebar, peringkat) ----
export const trendingNews: NewsItem[] = [
  {
    id: "tr-01",
    title:
      "Pengamat Prediksi Posisi Wapres Gibran Bakal Makin Panas Usai Mundur",
    excerpt: "",
    category: "Politik",
    author: "CNN Indonesia",
    publishedAt: "12 Nov 2026, 07:00 WIB",
    readTime: 4,
    views: "201 rb",
    trending: true,
    imageHue: 0,
  },
  {
    id: "tr-02",
    title:
      "Joko Widodo Tunjukkan Ijazahnya di Sidang Pengadilan, Publik Ramai Bahas",
    excerpt: "",
    category: "Hukum",
    author: "Kompas Nasional",
    publishedAt: "11 Nov 2026, 20:45 WIB",
    readTime: 3,
    views: "187 rb",
    trending: true,
    imageHue: 220,
  },
  {
    id: "tr-03",
    title:
      "18 Anggota Fraksi Demokrat Usulkan Hak Menyatakan Pendapat, Ada Benny K Harman",
    excerpt: "",
    category: "Politik",
    author: "Kompas.com",
    publishedAt: "11 Nov 2026, 18:30 WIB",
    readTime: 3,
    views: "76,5 rb",
    imageHue: 280,
  },
  {
    id: "tr-04",
    title:
      "Trump Tetapkan Oval Office sebagai Monumen Nasional, Menuai Kontroversi",
    excerpt: "",
    category: "Internasional",
    author: "BBC News Indonesia",
    publishedAt: "09 Nov 2026, 21:10 WIB",
    readTime: 4,
    views: "94,2 rb",
    trending: true,
    imageHue: 210,
  },
  {
    id: "tr-05",
    title:
      "Menkeu AS Ngungsi ke Pangkalan Militer Gara-gara Ancaman Iran",
    excerpt: "",
    category: "Internasional",
    author: "Detik News",
    publishedAt: "11 Nov 2026, 14:20 WIB",
    readTime: 2,
    views: "68,9 rb",
    imageHue: 150,
  },
  {
    id: "tr-06",
    title:
      "Manchester United Capai Kesepakatan dengan Mauricio Pochettino",
    excerpt: "",
    category: "Olahraga",
    author: "Liputan6",
    publishedAt: "11 Nov 2026, 16:00 WIB",
    readTime: 2,
    views: "132 rb",
    trending: true,
    imageHue: 0,
  },
];

// ---- KATEGORI: POLITIK ----
export const politikNews: NewsItem[] = [
  {
    id: "pol-01",
    title:
      "Kabakom Bantah Presiden Prabowo Beri Saran Gibran Tetap 'Fight' di Pengadilan",
    excerpt:
      "Kabinet Komunikasi membantah kabar bahwa Presiden Prabowo memberi saran kepada Gibran untuk tetap melawan dalam kasus ijazah di pengadilan.",
    category: "Politik",
    author: "ANTARA News",
    publishedAt: "12 Nov 2026, 06:10 WIB",
    readTime: 3,
    views: "55,4 rb",
    imageHue: 0,
  },
  {
    id: "pol-02",
    title:
      "Prabowo Kelakar Soal Dugaan Disadap: 'Maaf Beberapa Hari Penuh Dinamika'",
    excerpt:
      "Presiden Prabowo Subianto merespons kasus dugaan penyadapan dengan kelakar kepada wartawan. Ia mengaku beberapa hari terakhir penuh dinamika.",
    category: "Politik",
    author: "ANTARA News",
    publishedAt: "11 Nov 2026, 21:15 WIB",
    readTime: 2,
    views: "88,1 rb",
    imageHue: 350,
  },
  {
    id: "pol-03",
    title:
      "Projo Benarkan Gibran Sudah Serahkan Surat Pengunduran Diri ke Prabowo",
    excerpt:
      "Ketua Umum Pro Jokowi (Projo) Budi Arie Setiadi membenarkan informasi adanya surat pengunduran diri Gibran yang diserahkan kepada Presiden Prabowo.",
    category: "Politik",
    author: "Tempo",
    publishedAt: "11 Nov 2026, 22:30 WIB",
    readTime: 4,
    views: "143 rb",
    imageHue: 5,
  },
];

// ---- KATEGORI: EKONOMI ----
export const ekonomiNews: NewsItem[] = [
  {
    id: "eko-01",
    title:
      "OJK Pantau Intensif Industri Keuangan Nasional di Tengah Tekanan Global",
    excerpt:
      "Otoritas Jasa Keuangan mengklaim sektor jasa keuangan nasional tetap stabil di tengah tekanan ekonomi global. Pemantauan intensif terus dilakukan.",
    category: "Ekonomi",
    author: "Metro TV",
    publishedAt: "12 Nov 2026, 05:50 WIB",
    readTime: 3,
    views: "32,7 rb",
    imageHue: 145,
  },
  {
    id: "eko-02",
    title:
      "MSCI Buka Opsi Downgrade Indonesia, Investor Diminta Pahami Risiko",
    excerpt:
      "Lembaga pemeringkat MSCI membuka opsi penurunan status pasar Indonesia. Investor pasar modal diingatkan untuk memahami dinamika dan risiko terkini.",
    category: "Ekonomi",
    author: "Bloomberg Technoz",
    publishedAt: "11 Nov 2026, 19:00 WIB",
    readTime: 4,
    views: "61,2 rb",
    imageHue: 165,
  },
  {
    id: "eko-03",
    title:
      "Pemerintah Siapkan Stimulus Ekonomi Terbaru, Investor Pasar Modal Diminta Tenang",
    excerpt:
      "Pemerintah dikabarkan menyiapkan paket stimulus ekonomi terbaru untuk menjaga stabilitas pasar. Investor diimbau tidak panik menghadapi volatilitas.",
    category: "Ekonomi",
    author: "Kontan",
    publishedAt: "11 Nov 2026, 15:40 WIB",
    readTime: 3,
    views: "44,9 rb",
    imageHue: 130,
  },
];

// ---- KATEGORI: TEKNOLOGI ----
export const teknologiNews: NewsItem[] = [
  {
    id: "tek-01",
    title:
      "FortiGuard: 350.600 Aktivitas Ancaman Siber Terdeteksi di Indonesia",
    excerpt:
      "FortiGuard Labs mencatat sekitar 350.600 aktivitas ancaman siber terdeteksi di Indonesia pada 7 November 2026, meningkat dibanding periode sebelumnya.",
    category: "Teknologi",
    author: "Kontan News",
    publishedAt: "08 Nov 2026, 09:20 WIB",
    readTime: 3,
    views: "57,3 rb",
    imageHue: 270,
  },
  {
    id: "tek-02",
    title:
      "Serangan Siber Landa Sembilan Negara Eropa, Pelaku Diduga Aktor Negara",
    excerpt:
      "Sejumlah negara Eropa menjadi target serangan siber terkoordinasi. Investigasi awal menduga keterlibatan aktor negara dalam serangan tersebut.",
    category: "Teknologi",
    author: "Kompas Tech",
    publishedAt: "04 Nov 2026, 11:00 WIB",
    readTime: 4,
    views: "39,8 rb",
    imageHue: 260,
  },
  {
    id: "tek-03",
    title:
      "China Geram: Alice Huang Dituduh Mata-matai Bos Nvidia, Hujat AS",
    excerpt:
      "Pemerintah China membantah tuduhan bahwa warga negaranya, Alice Huang, melakukan spionase terhadap bos Nvidia. Beijing menghujat AS habis-habisan.",
    category: "Teknologi",
    author: "Kompas Internasional",
    publishedAt: "09 Nov 2026, 13:30 WIB",
    readTime: 3,
    views: "72,1 rb",
    imageHue: 290,
  },
];

// ---- KATEGORI: INTERNASIONAL ----
export const internasionalNews: NewsItem[] = [
  {
    id: "int-01",
    title:
      "Tentara AS Ditangkap di Inggris, Dituduh Jadi Mata-mata Rusia",
    excerpt:
      "Seorang tentara Amerika Serikat ditangkap otoritas Inggris dengan tuduhan menjadi mata-mata bagi Rusia. Kasus ini menambah ketegangan intelijen global.",
    category: "Internasional",
    author: "SINDOnews",
    publishedAt: "11 Nov 2026, 18:07 WIB",
    readTime: 3,
    views: "65,4 rb",
    imageHue: 215,
  },
  {
    id: "int-02",
    title:
      "Calon PM Israel Gadi Eisenkot Batalkan Pembicaraan Koalisi dengan Netanyahu",
    excerpt:
      "Calon Perdana Menteri Israel Gadi Eisenkot membatalkan pembicaraan koalisi dengan partai PM Benjamin Netanyahu, menambah ketidakpastian politik Israel.",
    category: "Internasional",
    author: "CNN Indonesia",
    publishedAt: "11 Nov 2026, 17:50 WIB",
    readTime: 3,
    views: "41,2 rb",
    imageHue: 200,
  },
  {
    id: "int-03",
    title:
      "China-ASEAN Capai Kemajuan, Kode Etik Laut China Selatan Langkah Maju",
    excerpt:
      "Negara-negara ASEAN dan China mencapai kemajuan dalam pembahasan kode etik di Laut China Selatan. Hasil ini disambut positif kawasan.",
    category: "Internasional",
    author: "Detik News",
    publishedAt: "10 Nov 2026, 20:15 WIB",
    readTime: 3,
    views: "28,7 rb",
    imageHue: 195,
  },
];

// ---- KATEGORI: OLAHRAGA ----
export const olahragaNews: NewsItem[] = [
  {
    id: "olh-01",
    title:
      "Manchester United Capai Kesepakatan dengan Mauricio Pochettino",
    excerpt:
      "Manchester United dilaporkan telah mencapai kesepakatan dengan Mauricio Pochettino untuk melatih tim. Michael Carrick disebut akan tetap di staff.",
    category: "Olahraga",
    author: "Liputan6 Sport",
    publishedAt: "11 Nov 2026, 16:00 WIB",
    readTime: 2,
    views: "132 rb",
    imageHue: 0,
  },
  {
    id: "olh-02",
    title:
      "Liga Champions: Hasil Imbang Dramatis Tim Papan Tengah Eropa",
    excerpt:
      "Sejumlah laga Liga Champions pekan ini berakhir dengan skor imbang dramatis. Hasil ini mengubah peta klasemen sementara.",
    category: "Olahraga",
    author: "Bola Sport",
    publishedAt: "11 Nov 2026, 23:45 WIB",
    readTime: 2,
    views: "48,6 rb",
    imageHue: 30,
  },
  {
    id: "olh-03",
    title:
      "Timnas Indonesia Siapkan Diri untuk Lanjutan Kualifikasi Piala Asia",
    excerpt:
      "Timnas Indonesia memulai persiapan menuju lanjutan kualifikasi Piala Asia. Pelatih menyiapkan strategi baru menghadapi lawan-lawan tangguh.",
    category: "Olahraga",
    author: "Bola Net",
    publishedAt: "11 Nov 2026, 14:00 WIB",
    readTime: 3,
    views: "73,9 rb",
    imageHue: 15,
  },
];

// ---- KATEGORI: HUKUM & KRIMINAL ----
export const hukumNews: NewsItem[] = [
  {
    id: "hkm-01",
    title: "LPSK Siapkan Perlindungan dan Pemulihan untuk 30 Korban TPPO",
    excerpt:
      "Lembaga Perlindungan Saksi dan Korban (LPSK) menyiapkan program perlindungan dan pemulihan bagi 30 korban tindak pidana perdagangan orang (TPPO).",
    category: "Hukum",
    author: "Liputan6",
    publishedAt: "11 Nov 2026, 13:25 WIB",
    readTime: 3,
    views: "22,4 rb",
    imageHue: 240,
  },
  {
    id: "hkm-02",
    title:
      "Polda Metro Tepis Isu Penangkapan Firli Bahuri di GOR Bulutangkis",
    excerpt:
      "Polda Metro Jaya membantah kabar penangkapan mantan pimpinan KPK Firli Bahuri di sebuah GOR bulutangkis. Isu tersebut beredar di media sosial.",
    category: "Hukum",
    author: "CNN Indonesia",
    publishedAt: "11 Nov 2026, 12:10 WIB",
    readTime: 2,
    views: "51,7 rb",
    imageHue: 235,
  },
];

// ---- VIRAL SOSIAL ----
export const viralSosial: NewsItem[] = [
  {
    id: "vir-01",
    title:
      "Aksi Women's March di Jakarta Ricuh Saat Diadang Polisi, Massa Dipaksa Belok ke Gambir",
    excerpt:
      "Aksi Women's March pada Sabtu (7/11/2026) diwarnai kericuhan saat massa diadang aparat kepolisian dan dipaksa berbelok arah menuju Gambir.",
    category: "Viral",
    author: "Kompas Video",
    publishedAt: "08 Nov 2026, 09:00 WIB",
    readTime: 2,
    views: "84,2 rb",
    trending: true,
    imageHue: 320,
  },
  {
    id: "vir-02",
    title:
      "Video Aksi Heroik Warga Indonesia Tangkap Pencopet di Paris Ramai Dibahas Netizen",
    excerpt:
      "Video yang memperlihatkan keberanian warga Indonesia menangkap pencopet di Paris menjadi sorotan. Netizen memuji keberanian tersebut.",
    category: "Viral",
    author: "Liputan6",
    publishedAt: "11 Nov 2026, 19:32 WIB",
    readTime: 2,
    views: "156 rb",
    trending: true,
    imageHue: 32,
  },
];

// ---- NAV KATEGORI ----
export const categories: { name: NewsCategory; href: string; color: string }[] =
  [
    { name: "Politik", href: "#politik", color: "bg-red-600" },
    { name: "Ekonomi", href: "#ekonomi", color: "bg-emerald-600" },
    { name: "Teknologi", href: "#teknologi", color: "bg-fuchsia-600" },
    { name: "Internasional", href: "#internasional", color: "bg-sky-600" },
    { name: "Olahraga", href: "#olahraga", color: "bg-orange-600" },
    { name: "Hukum", href: "#hukum", color: "bg-violet-600" },
    { name: "Viral", href: "#viral", color: "bg-pink-600" },
  ];
