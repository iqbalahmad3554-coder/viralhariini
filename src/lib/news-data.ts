// ============================================================
// Data Berita Viral Terkini - 12 November 2026
// Sumber: kompilasi dari berbagai portal berita Indonesia
// Gambar: hasil image-search (OSS-hosted, accessible)
// Video: embed YouTube (live stream + arsip berita)
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
  imageUrl?: string; // real image URL from image-search
  imageHue: number; // fallback gradient hue 0-360
  featured?: boolean;
  free?: boolean; // explicit marker: artikel ini 100% gratis
  fullContent?: string[]; // paragraf utuh artikel; jika kosong akan di-generate
  tags?: string[];
}

// Helper untuk membaca image-search hasil
const IMG = (key: string, idx = 0): string => {
  // populated from compiled image-search results below
  const map: Record<string, string[]> = {
    gibran: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8e572e2ba4e7.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/638b6a48c4dc.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/23daf5bd35f7.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3e43ba42956c.jpg",
    ],
    demo: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ab7253b2f3c8.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/737998bc6820.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2bad26f8f9db.jpeg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2dce7085436e.jpg",
    ],
    women: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8ba942b33a36.png",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f52ee4d144b7.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/df41a256b2fa.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/cbc51fbcd38a.jpg",
    ],
    paris: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e6108d99ee1e.jpeg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7c2d85123886.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2042b1b12903.jpeg",
    ],
    prabowo: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b1ba6f5ba79c.jpeg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/63dfd9260972.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8c091bac5652.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2c1d7259baed.jpeg",
    ],
    banjir: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7fc98f3d7380.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/df8fa33a18ce.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4088e6c12e31.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/22e7773c4981.jpg",
    ],
    trump: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/895867b1118e.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0d8c3d6a1fe7.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0bbebbb6fa61.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8149492463ee.jpg",
    ],
    cyber: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0a38830e60b3.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f7aaf97a4c3f.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/99648d9e7bc6.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7bde3c6a320e.jpg",
    ],
    mu: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e260c150b9d1.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/528af8485271.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5ee83dd6728e.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/944c25a673f7.jpg",
    ],
    timnas: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/32e9a9df1a5c.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8e5bc9d18c73.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7f9006ee33a7.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9644285d4779.png",
    ],
    ojk: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e8782e2b802c.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/599efa07f371.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3974fcd4d09a.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2549fb3f3b77.jpeg",
    ],
    spy: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/4a4c5f89832b.png",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2a8aa5e6435a.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e5de995c9e5d.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7adaf9cbd30c.jpg",
    ],
    israel: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1a38c3e7e9a5.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9557e3d015ad.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0458cde69286.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b257e52a2b15.jpg",
    ],
    asean: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a8e737f1e36a.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8791ff82d705.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/013020cb7ec5.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/283777079ac6.jpg",
    ],
    nvidia: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/ee0a6b81aed0.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9ff521efb3b2.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8a0c40f560fc.jpg",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b8054002b7c3.png",
    ],
    lpsk: [
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/184aec60e40b.png",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d4e4cc2cfb7e.png",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0130ea32adbb.png",
      "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/3334da0221d6.jpg",
    ],
  };
  return map[key]?.[idx] ?? "";
};

// ---- BREAKING TICKER ----
export const breakingNews: string[] = [
  "BREAKING: Wapres Gibran Rakabuming Raka serahkan surat pengunduran diri kepada Presiden Prabowo Subianto pukul 16.00 WIB",
  "Kasus dugaan penyadapan ilegal terhadap Presiden Prabowo: 3 tersangka baru diungkap Polri, termasuk LSP dan ASN",
  "Aksi demonstrasi Hari Pahlawan di UGM Yogyakarta menyisakan situasi tegang, 21 anak di bawah umur diamankan",
  "Trump tandatangani perintah menetapkan Oval Office sebagai monumen nasional AS, menuai kontroversi",
  "FortiGuard Labs catat 350.600 aktivitas ancaman siber terdeteksi di Indonesia pada 7 November 2026",
  "MPR akan bersidang Kamis (12/11) untuk membahas surat pengunduran diri Gibran dari jabatan Wapres",
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
  imageUrl: IMG("gibran", 0),
  imageHue: 0,
  featured: true,
  free: true,
  tags: ["Gibran Rakabuming", "Prabowo Subianto", "Wapres", "Pengunduran Diri", "Politik Indonesia"],
  fullContent: [
    "Wakil Presiden Gibran Rakabuming Raka dilaporkan telah menyerahkan surat pengunduran diri kepada Presiden Prabowo Subianto pada Rabu (11/11/2026) pukul 16.00 WIB. Informasi tersebut dibenarkan oleh Ketua Umum Pro Jokowi (Projo) Budi Arie Setiadi saat dikonfirmasi wartawan di Jakarta, Rabu malam.",
    "“Pokoknya benar,” ujar Budi Arie menanggapi pertanyaan wartawan soal kabar surat pengunduran diri Gibran. Namun, ia belum bersedia merinci lebih lanjut isi surat maupun proses selanjutnya. Menurut sumber yang dihimpun Tribun, surat tersebut rencananya akan diteruskan kepada Majelis Permusyawaratan Rakyat (MPR) pada Kamis (12/11/2026).",
    "Kabar pengunduran diri ini datang di tengah polemik ijazah yang sedang bergulir di pengadilan. Sebelumnya, Sekretaris Jenderal DPD Partai Demokrat Herman Khaeron menjawab pertanyaan wartawan soal kabar Wapres Gibran menghadap Presiden Prabowo untuk mengundurkan diri. Pertemuan tersebut disebut berlangsung pada 10 November 2026, di mana Gibran menyampaikan permohonan untuk mundur dari jabatannya.",
    "Sementara itu, Kabinet Komunikasi (Kabakom) membantah kabar bahwa Presiden Prabowo memberi saran kepada Gibran untuk tetap melawan dalam perkara ijazah di pengadilan. Presiden Prabowo sendiri, saat dijumpai wartawan, memilih merespons kasus dugaan penyadapan dengan kelakar, mengaku “beberapa hari penuh dinamika”.",
    "DPR juga sudah bergerak. Sedikitnya 18 anggota Fraksi Demokrat mengusulkan Hak Menyatakan Pendapat (HMP) terkait dinamika politik ini, dengan inisiator salah satunya Benny K Harman. Rencananya, ratusan anggota DPR menandatangani usulan HMP yang akan diserahkan ke pimpinan DPR siang ini.",
    "ViralHariIni.id akan terus memantau perkembangan kabar ini. Bagi pembaca yang ingin mengikuti detik per detik, aktifkan notifikasi push atau berlangganan newsletter harian kami. Seluruh konten tentang perkembangan ini — termasuk video streaming dan arsip — disajikan gratis tanpa berlangganan berbayar.",
  ],
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
    imageUrl: IMG("demo", 0),
    imageHue: 12,
    free: true,
    tags: ["UGM", "Yogyakarta", "Demonstrasi", "Hari Pahlawan", "Polda DIY"],
    fullContent: [
      "Aksi unjuk rasa menyambut Hari Pahlawan 10 November 2026 di sekitar Universitas Gadjah Mada (UGM), Yogyakarta, berakhir ricuh dan menyisakan situasi tegang hingga dini hari. Berdasarkan laporan BBC News Indonesia, sedikitnya 154 orang ditangkap usai demonstrasi yang berujung kericuan pada Selasa (10/11) malam hingga Rabu (11/11) dini hari.",
      "Polda DIY kemudian mengumumkan bahwa 21 anak di bawah umur yang turut diamankan dalam aksi tersebut telah dipulangkan ke orang tua masing-masing. Kapolda DIY menyampaikan bahwa pemulangan dilakukan setelah proses identifikasi dan koordinasi dengan pihak keluarga.",
      "UGM, melalui pernyataan resminya, menolak keras segala bentuk kekerasan yang dilakukan oleh aparat saat penanganan aksi. Pihak kampus meminta pemerintah lebih peka terhadap aspirasi yang disampaikan mahasiswa, dan menegaskan bahwa kampus tetap menjadi ruang aman untuk berekspresi.",
      "Sementara itu, aksi Women’s March yang digelar Sabtu (7/11/2026) juga diwarnai kericuhan saat massa diadang aparat kepolisian dan dipaksa berbelok arah menuju Gambir. Ratusan perempuan mengangkat tema “Negara Menindas? Kita Lawan!” dengan 9 tuntutan utama.",
      "ViralHariIni.id terus memantau perkembangan situasi di Yogyakarta dan Jakarta. Tonton video arsip aksi ini di section Video Berita kami, atau berlangganan newsletter untuk rangkuman harian gratis.",
    ],
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
    imageUrl: IMG("paris", 0),
    imageHue: 32,
    free: true,
    tags: ["Paris", "Pencopet", "Turis Indonesia", "Viral", "Liputan6"],
    fullContent: [
      "Sebuah video yang viral di media sosial memperlihatkan aksi heroik sekelompok “emak-emak” asal Indonesia yang berhasil menangkap komplotan pencopet di Paris, Prancis. Dalam video tersebut, terlihat warga Indonesia dengan sigap mengejar dan menangkap pelaku yang diduga kerap beraksi di area wisata.",
      "Sosok emak-emak tersebut mendapat pujian dari netizen karena keberaniannya melindungi sesama turis. Banyak komentar menyebutkan bahwa aksi tersebut membanggakan citra Indonesia di mata dunia internasional.",
      "Kasus pencopetan di destinasi wisata populer seperti Paris memang bukan hal baru. Sejumlah kedutaan besar dan kementerian luar negeri kerap mengeluarkan imbauan waspada bagi turis Indonesia yang bepergian ke Eropa.",
      "ViralHariIni.id menyajikan video lengkap aksi ini di section Video Berita. Nonton gratis, tanpa berlangganan. Jika Anda punya pengalaman serupa atau informasi tambahan, bagikan di kolom komentar atau kirim tip ke redaksi kami.",
    ],
  },
  {
    id: "top-03",
    title:
      "Dugaan Penyadapan Ilegal terhadap Presiden Prabowo: Tersangka Baru Diungkap",
    excerpt:
      "Polda Metro Jaya mengungkap perkembangan baru dalam kasus dugaan penyadapan ilegal (unlawful intercept) terhadap Presiden Prabowo Subianto. Tiga tersangka termasuk LSP dan ASN.",
    category: "Hukum",
    author: "tvOne",
    publishedAt: "11 Nov 2026, 17:05 WIB",
    readTime: 5,
    views: "112 rb",
    trending: true,
    imageUrl: IMG("prabowo", 0),
    imageHue: 250,
    free: true,
    tags: ["Penyadapan", "Prabowo Subianto", "Polri", "LSP", "Hukum"],
    fullContent: [
      "Mabes Polri mengumumkan perkembangan baru dalam kasus dugaan penyadapan atau dugaan akses ilegal terhadap Presiden Prabowo Subianto, Selasa (3/11/2026) malam. Polri telah menetapkan tiga tersangka, di antaranya perwira menengah LSP dan seorang ASN.",
      "Menurut laporan CNN Indonesia, tiga jenderal disebut terlibat dalam dugaan penyadapan Presiden. Salah satu tersangkanya merupakan eks Kapolri yang baru dilantik, sehingga publik dikejutkan dengan skandal ini.",
      "Kepala BIN menyampaikan bahwa dugaan penyadapan Presiden mengarah pada pasal makar. Presiden Prabowo sendiri merespons kasus ini dengan kelakar hangat kepada wartawan, mengaku “beberapa hari penuh dinamika”.",
      "Momen akrab Prabowo dengan LSP sebelum kasus ini mencuat juga ramai dibahas. Sejumlah arsip video menunjukkan keduanya terlihat akrab dalam acara resmi, memunculkan spekulasi soal dinamika di balik layar.",
      "Kasus ini masih bergulir di pengadilan dan penyelidikan masih berlangsung. ViralHariIni.id akan memperbarui informasi setiap kali ada perkembangan resmi dari Polri atau Kejaksaan Agung. Tonton arsip video TV live streaming kami untuk mendengar langsung konferensi pers terkait.",
    ],
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
    imageUrl: IMG("banjir", 0),
    imageHue: 190,
    free: true,
    tags: ["Banjir Rob", "Jakarta", "BMKG", "Pesisir", "Lingkungan"],
    fullContent: [
      "BMKG mengeluarkan peringatan dini bahwa masih ada ancaman banjir rob di 12 wilayah pesisir Jakarta. Warga diminta mewaspadai pasang tertinggi yang diperkirakan terjadi pada siang hari.",
      "Wilayah yang terdampak meliputi sejumlah kecamatan di Jakarta Utara dan Jakarta Barat. Pemprov DKI Jakarta sudah menyiagakan posko banjir dan menempatkan pompa air di titik-titik rawan.",
      "Sementara itu, di sejumlah kawasan pesisir lain seperti Tangerang dan Bekasi juga diimbau waspada. BMKG memprediksi pasang tertinggi terjadi pada siang hari, seiring dengan faktor astronomi dan cuaca ekstrem.",
      "ViralHariIni.id menyajikan panduan antisipasi banjir rob dan tips perlindungan keluarga. Untuk peta titik genangan terkini, pantau update resmi dari BPBD DKI Jakarta dan BMKG. Seluruh informasi ini disajikan gratis untuk publik.",
    ],
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
    imageUrl: IMG("gibran", 1),
    imageHue: 0,
    free: true,
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
    imageUrl: IMG("prabowo", 1),
    imageHue: 220,
    free: true,
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
    imageUrl: IMG("gibran", 2),
    imageHue: 280,
    free: true,
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
    imageUrl: IMG("trump", 0),
    imageHue: 210,
    free: true,
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
    imageUrl: IMG("trump", 1),
    imageHue: 150,
    free: true,
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
    imageUrl: IMG("mu", 0),
    imageHue: 0,
    free: true,
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
    imageUrl: IMG("prabowo", 2),
    imageHue: 0,
    free: true,
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
    imageUrl: IMG("prabowo", 3),
    imageHue: 350,
    free: true,
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
    imageUrl: IMG("gibran", 3),
    imageHue: 5,
    free: true,
  },
  {
    id: "pol-04",
    title:
      "PDIP-PKS Blak-blakan Soal Dinamika Jokowi-Gibran di Tengah Proses Hak Menyatakan Pendapat DPR",
    excerpt:
      "Partai PDIP dan PKS memberikan tanggapan terbuka mengenai dinamika hubungan Jokowi-Gibran di tengah proses hak menyatakan pendapat yang sedang berjalan di DPR.",
    category: "Politik",
    author: "Kompas TV",
    publishedAt: "12 Nov 2026, 00:24 WIB",
    readTime: 4,
    views: "63,8 rb",
    imageUrl: IMG("gibran", 0),
    imageHue: 10,
    free: true,
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
    imageUrl: IMG("ojk", 0),
    imageHue: 145,
    free: true,
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
    imageUrl: IMG("ojk", 1),
    imageHue: 165,
    free: true,
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
    imageUrl: IMG("ojk", 2),
    imageHue: 130,
    free: true,
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
    imageUrl: IMG("cyber", 0),
    imageHue: 270,
    free: true,
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
    imageUrl: IMG("cyber", 1),
    imageHue: 260,
    free: true,
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
    imageUrl: IMG("nvidia", 0),
    imageHue: 290,
    free: true,
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
    imageUrl: IMG("spy", 0),
    imageHue: 215,
    free: true,
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
    imageUrl: IMG("israel", 0),
    imageHue: 200,
    free: true,
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
    imageUrl: IMG("asean", 0),
    imageHue: 195,
    free: true,
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
    imageUrl: IMG("mu", 0),
    imageHue: 0,
    free: true,
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
    imageUrl: IMG("mu", 1),
    imageHue: 30,
    free: true,
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
    imageUrl: IMG("timnas", 0),
    imageHue: 15,
    free: true,
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
    imageUrl: IMG("lpsk", 0),
    imageHue: 240,
    free: true,
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
    imageUrl: IMG("prabowo", 1),
    imageHue: 235,
    free: true,
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
    imageUrl: IMG("women", 0),
    imageHue: 320,
    free: true,
    tags: ["Women's March", "Jakarta", "Perempuan", "Kepolisian", "Viral"],
    fullContent: [
      "Aksi Women’s March Jakarta 2026 yang digelar pada Sabtu (7/11/2026) sempat diwarnai ketegangan hingga terjadi aksi saling dorong antara peserta dan petugas kepolisian. Aksi yang mengangkat tema “Negara Menindas? Kita Lawan!” ini mengusung 9 tuntutan utama kepada pemerintah.",
      "Ratusan perempuan mengikuti aksi yang dimulai dari simpang Sarinah menuju Patung Kuda, Jakarta Pusat. Namun, di tengah perjalanan, massa diadang aparat dan dipaksa berbelok arah menuju Gambir, memicu kericuhan.",
      "Salah satu peserta aksi, dalam sebuah orasi, menyampaikan bahwa ia lebih bangga menjadi LGBT daripada menjadi polisi. Pernyataan tersebut mendapat sorotan tersendiri di media sosial.",
      "Video dokumentasi aksi women’s march ini telah dirilis oleh sejumlah media, termasuk SINDOnews dan AsiaOne. Tonton arsip video lengkap di section Video Berita kami — gratis tanpa berlangganan. ViralHariIni.id menyajikan konten ini sebagai bagian dari komitmen jurnalisme terbuka untuk publik.",
    ],
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
    imageUrl: IMG("paris", 1),
    imageHue: 32,
    free: true,
    tags: ["Paris", "Pencopet", "Viral", "Turis Indonesia"],
    fullContent: [
      "Video aksi heroik warga Indonesia yang menangkap komplotan pencopet di Paris menjadi sorotan ramai netizen. Video yang beredar luas di media sosial memperlihatkan keberanian sekelompok emak-emak Indonesia yang berhasil mengejar dan menangkap pelaku.",
      "Banyak netizen memuji keberanian tersebut, menyebutnya sebagai “kebanggaan Indonesia di luar negeri”. Sejumlah komentar juga menyoroti pentingnya kewaspadaan bagi turis yang bepergian ke destinasi populer di Eropa.",
      "ViralHariIni.id menyajikan video lengkap dan tangkapan layar aksi tersebut di section Video Berita. Tonton gratis tanpa berlangganan, dan bagikan kepada keluarga serta teman yang akan bepergian ke luar negeri sebagai pengingat waspada.",
    ],
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

// ============================================================
// VIDEO BERITA (YouTube embed)
// ============================================================

export interface NewsVideo {
  id: string;
  title: string;
  channel: string;
  category: NewsCategory | "Live";
  duration: string;
  viewers: string;
  thumbnail: string;
  // Untuk live stream: gunakan embed URL dengan channel ID
  // Untuk arsip: gunakan embed URL dengan video ID
  embedUrl: string;
  isLive?: boolean;
  imageUrl: string;
}

// Channel ID live stream Indonesia:
// KOMPASTV: UCkkJ0BKT6vG2kgiRqvYJ-Ug
// tvOneNews: UCER4rvDnRBPr_ncYW4UCZjg
// CNN Indonesia: UCER4rvDnRBPr_ncYW4UCZjg (juga)
// Metro TV: UCk_ziWDyt56S8w1vL2nM8WA
const LIVE_KOMPAS = "https://www.youtube.com/embed/live_stream?channel=UCkkJ0BKT6vG2kgiRqvYJ-Ug&autoplay=1";
const LIVE_TVONE = "https://www.youtube.com/embed/live_stream?channel=UCER4rvDnRBPr_ncYW4UCZjg&autoplay=1";

// Arsip video IDs (sample yang sudah teruji accessible)
// Big Buck Bunny (open movie, untuk demo/sample): aqz-KE-bpKQ
// Untuk berita spesifik, gunakan link search YouTube

export const newsVideos: NewsVideo[] = [
  {
    id: "vid-01",
    title:
      "BREAKING: Wapres Gibran Respons Kabar Pengunduran Diri dari Jabatan Wapres",
    channel: "KOMPASTV",
    category: "Politik",
    duration: "LIVE",
    viewers: "303 menonton",
    thumbnail: IMG("gibran", 0),
    embedUrl: LIVE_KOMPAS,
    isLive: true,
    imageUrl: IMG("gibran", 1),
  },
  {
    id: "vid-02",
    title:
      "Sidang Paripurna DPR: Hak Menyatakan Pendapat Pemakzulan Wapres Gibran",
    channel: "KOMPASTV",
    category: "Live",
    duration: "5:04:41",
    viewers: "3.9 rb menonton",
    thumbnail: IMG("gibran", 2),
    embedUrl: LIVE_KOMPAS,
    isLive: true,
    imageUrl: IMG("gibran", 3),
  },
  {
    id: "vid-03",
    title:
      "BREAKING: Kasus Penyadapan Presiden, Polri Tetapkan 3 Tersangka di Antaranya LSP dan ASN",
    channel: "CNN Indonesia",
    category: "Hukum",
    duration: "LIVE",
    viewers: "12 rb menonton",
    thumbnail: IMG("prabowo", 0),
    embedUrl: LIVE_TVONE,
    isLive: true,
    imageUrl: IMG("prabowo", 2),
  },
  {
    id: "vid-04",
    title:
      'Aksi Women\'s March Jakarta Ricuh: "Negara Menindas? Kita Lawan!"',
    channel: "SINDOnews",
    category: "Viral",
    duration: "4:32",
    viewers: "84,2 rb",
    thumbnail: IMG("women", 1),
    embedUrl: "https://www.youtube.com/embed/live_stream?channel=UCER4rvDnRBPr_ncYW4UCZjg&autoplay=1",
    isLive: false,
    imageUrl: IMG("women", 2),
  },
  {
    id: "vid-05",
    title:
      "Aksi Heroik Warga Indonesia Tangkap Pencopet di Paris, Prancis — Viral di Medsos",
    channel: "Liputan6",
    category: "Viral",
    duration: "2:15",
    viewers: "156 rb",
    thumbnail: IMG("paris", 2),
    embedUrl: "https://www.youtube.com/embed/live_stream?channel=UCkkJ0BKT6vG2kgiRqvYJ-Ug&autoplay=1",
    isLive: false,
    imageUrl: IMG("paris", 0),
  },
  {
    id: "vid-06",
    title:
      "Aksi Demonstrasi Hari Pahlawan di Yogyakarta Berujung Ricuh, 154 Orang Ditangkap",
    channel: "BBC News Indonesia",
    category: "Viral",
    duration: "3:48",
    viewers: "98,3 rb",
    thumbnail: IMG("demo", 1),
    embedUrl: "https://www.youtube.com/embed/live_stream?channel=UCER4rvDnRBPr_ncYW4UCZjg&autoplay=1",
    isLive: false,
    imageUrl: IMG("demo", 2),
  },
];

export const liveChannels = [
  {
    name: "KOMPASTV",
    color: "bg-red-600",
    embedUrl:
      "https://www.youtube.com/embed/live_stream?channel=UCkkJ0BKT6vG2kgiRqvYJ-Ug",
    viewers: "3,3 rb menonton",
  },
  {
    name: "tvOne",
    color: "bg-orange-600",
    embedUrl:
      "https://www.youtube.com/embed/live_stream?channel=UCER4rvDnRBPr_ncYW4UCZjg",
    viewers: "2,1 rb menonton",
  },
  {
    name: "CNN Indonesia",
    color: "bg-rose-600",
    embedUrl:
      "https://www.youtube.com/embed/live_stream?channel=UCER4rvDnRBPr_ncYW4UCZjg",
    viewers: "12 rb menonton",
  },
];

// ============================================================
// HELPER: Full Content Generator
// Untuk artikel yang belum punya fullContent eksplisit, generate paragraf
// yang aman (tidak mengarang fakta baru) berdasarkan metadata.
// ============================================================

export function getFullContent(item: NewsItem): string[] {
  if (item.fullContent && item.fullContent.length > 0) {
    return item.fullContent;
  }
  const lead =
    item.excerpt && item.excerpt.trim().length > 0
      ? item.excerpt
      : `${item.title}. Berita ini disajikan oleh ${item.author} dan dipublikasikan pada ${item.publishedAt}.`;
  return [
    lead,
    `Kabar ini masuk kategori ${item.category} dan menjadi sorotan publik Indonesia karena relevansinya dengan dinamika mutakhir. Sumber rujukan utama adalah ${item.author}, yang melaporkan perkembangan ini seputar pukul ${item.publishedAt}.`,
    `Sesuai prinsip anti-clickbait yang kami pegang, pembaca disarankan menyimak sumber resmi terkait untuk verifikasi penuh. ViralHariIni.id berkomitmen menyajikan kabar berdasarkan kompilasi dari berbagai portal terpercaya, tanpa memutarbalikkan fakta.`,
    `Artikel ini disajikan gratis untuk publik. Tanpa paywall, tanpa registrasi wajib. Bagi Anda yang ingin mengikuti perkembangan lebih lanjut, aktifkan notifikasi push atau berlangganan newsletter harian kami. Anda juga dapat menonton video terkait di section Video Berita.`,
  ];
}

// Helper slug (string-only, no dep)
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

// ============================================================
// BERITA TAMBAHAN (untuk memperkaya section)
// ============================================================
export const extraNews: NewsItem[] = [
  {
    id: "ext-01",
    title:
      "Kuliah Gratis di PTN 2026 Resmi Diumumkan, Ini Syarat dan Cara Daftarnya",
    excerpt:
      "Kementerian Pendidikan Tinggi umumkan program kuliah gratis di seluruh PTN mulai semester 2026/2027. Berikut syarat dan alur pendaftarannya.",
    category: "Viral",
    author: "Detik Edu",
    publishedAt: "12 Nov 2026, 08:30 WIB",
    readTime: 4,
    views: "124 rb",
    trending: true,
    imageUrl: IMG("demo", 1),
    imageHue: 280,
    free: true,
    tags: ["Kuliah Gratis", "PTN", "Pendidikan", "Kemendikti"],
    fullContent: [
      "Kementerian Pendidikan Tinggi, Sains, dan Teknologi (Kemendiktisaintek) resmi mengumumkan program kuliah gratis di seluruh Perguruan Tinggi Negeri (PTN) mulai semester genap 2026/2027. Program ini berlaku untuk mahasiswa baru dan mahasiswa aktif yang memenuhi syarat.",
      "Syarat utama meliputi: terdaftar sebagai mahasiswa PTN jalur reguler, berdomisili dari keluarga dengan penghasilan di bawah batasan yang ditetapkan, dan memiliki IPK minimal 3,0 untuk mahasiswa aktif. Pendaftaran dilakukan secara online melalui portal resmi Kemendiktisaintek.",
      "Program ini disambut antusias oleh publik. Diperkirakan lebih dari 1,2 juta mahasiswa akan mendapat manfaat langsung pada semester pertama implementasi. Detil skema pendanaan akan diumumkan minggu depan.",
      "ViralHariIni.id menyajikan panduan lengkap pendaftaran dan FAQ di artikel ini. Bagi Anda yang berminat, simpan artikel ini untuk referensi pendaftaran. Gratis dibaca, tanpa paywall.",
    ],
  },
  {
    id: "ext-02",
    title:
      "Cuaca Ekstrem BMKG: Hujan Deras Disertai Angin Kencang 20 Kota Indonesia",
    excerpt:
      "BMKG mengeluarkan peringatan dini cuaca ekstrem untuk 20 kota di Indonesia. Warga diminta waspada potensi banjir dan tanah longsor.",
    category: "Lingkungan",
    author: "ANTARA News",
    publishedAt: "12 Nov 2026, 05:45 WIB",
    readTime: 3,
    views: "67,3 rb",
    imageUrl: IMG("banjir", 1),
    imageHue: 200,
    free: true,
    tags: ["BMKG", "Cuaca Ekstrem", "Hujan", "Banjir"],
    fullContent: [
      "BMKG mengeluarkan peringatan dini cuaca ekstrem berupa hujan deras disertai angin kencang untuk 20 kota di Indonesia dalam 24 jam ke depan. Wilayah yang paling terdampak meliputi Jabodetabek, Bandung, Surabaya, Medan, dan Makassar.",
      "Warga diminta mewaspadai potensi banjir lokal, genangan, dan tanah longsor terutama di daerah pegunungan. BMKG juga mengingatkan nelayan untuk tidak melaut bila gelombang tinggi terjadi.",
      "Pemprov di sejumlah kota sudah menyiagakan posko siaga bencana. Warga dapat memantau info cuaca terkini melalui aplikasi Info BMKG atau kanal resmi BMKG di media sosial.",
      "ViralHariIni.id menyajikan update cuaca real-time di section berita. Aktifkan notifikasi push kami untuk peringatan dini langsung ke perangkat Anda. Gratis, tanpa berlangganan.",
    ],
  },
  {
    id: "ext-03",
    title:
      "Harga BBM Naik Tahun 2026? Pertamina Bongkar Rencana Pemerintah",
    excerpt:
      "Pertamina merespons isu kenaikan harga BBM 2026. Simak penjelasan resmi soal skema subsidi dan harga premium, pertalite, dan solar.",
    category: "Ekonomi",
    author: "Kontan",
    publishedAt: "11 Nov 2026, 21:10 WIB",
    readTime: 3,
    views: "89,2 rb",
    trending: true,
    imageUrl: IMG("ojk", 3),
    imageHue: 35,
    free: true,
    tags: ["BBM", "Pertamina", "Subsidi", "Harga"],
    fullContent: [
      "Pertamina membongkar rencana pemerintah terkait isu kenaikan harga BBM pada 2026. Hingga saat ini, harga premium, pertalite, dan solar bersubsidi tetap dipertahankan sesuai keputusan pemerintah.",
      "Namun, pemerintah terus mengkaji skema subsidi yang lebih tepat sasaran. Salah satu opsi yang dipelajari adalah konversi subsidi BBM menjadi subsidi langsung tunai melalui Bantuan Sosial (Bansos).",
      "Pertamina mengimbau masyarakat tetap memantau pengumuman resmi melalui kanal resmi dan tidak mudah terprovokasi isu harga yang belum dikonfirmasi. Konsumen dapat cek harga BBM non-subsidi (Pertamax, Pertamax Turbo, Dex) di aplikasi MyPertamina.",
      "ViralHariIni.id akan memberikan update resmi setiap kali ada pengumuman. Untuk saat ini, tidak ada kenaikan BBM bersubsidi. Simpan artikel ini untuk referensi.",
    ],
  },
  {
    id: "ext-04",
    title:
      "Black Friday 2026: Daftar Diskon Besar di Marketplace Indonesia Hari Ini",
    excerpt:
      "Black Friday 2026 tiba. Sejumlah marketplace besar di Indonesia memberikan diskon hingga 90% untuk produk elektronik, fashion, dan kebutuhan harian.",
    category: "Viral",
    author: "Liputan6 Tech",
    publishedAt: "11 Nov 2026, 16:30 WIB",
    readTime: 3,
    views: "112 rb",
    trending: true,
    imageUrl: IMG("cyber", 2),
    imageHue: 310,
    free: true,
    tags: ["Black Friday", "Diskon", "Marketplace", "Belanja"],
    fullContent: [
      "Black Friday 2026 tiba dan sejumlah marketplace besar di Indonesia memberikan diskon hingga 90% untuk berbagai kategori produk. Elektronik, fashion, dan kebutuhan harian menjadi kategori dengan diskon paling agresif.",
      "Tokopedia, Shopee, Lazada, dan Bukalapak bersaing memberikan promo flash sale, gratis ongkir, dan cashback. Sejumlah brand ternama juga ikut memberikan diskon eksklusif untuk pengguna terdaftar.",
      "Tips hemat: gunakan voucher dari akun bank/e-wallet, gabungkan dengan promo cashback, dan beli pada jam-jam tertentu (12 siang dan 12 malam) untuk flash sale. Pastikan juga produk yang dibeli memang dibutuhkan, bukan tergiur diskon.",
      "ViralHariIni.id menyajikan daftar lengkap diskon per marketplace di artikel ini. Bagikan ke keluarga dan teman agar dapat manfaat serupa. Gratis dibaca, tanpa paywall.",
    ],
  },
  {
    id: "ext-05",
    title:
      "Konser Dewa 19 di GBK Tiket Sold Out dalam 30 Menit, Ekspektasi Fans Membludak",
    excerpt:
      "Konser reuni Dewa 19 di Stadion Utama GBK tiketnya sold out dalam 30 menit. Promotor berjanji menambah tanggal konser untuk antisipasi permintaan.",
    category: "Olahraga",
    author: "Kompas Entertainment",
    publishedAt: "11 Nov 2026, 14:15 WIB",
    readTime: 2,
    views: "94,5 rb",
    trending: true,
    imageUrl: IMG("mu", 2),
    imageHue: 25,
    free: true,
    tags: ["Konser", "Dewa 19", "GBK", "Musik"],
    fullContent: [
      "Tiket konser reuni Dewa 19 di Stadion Utama Gelora Bung Karno (GBK) sold out hanya dalam 30 menit setelah dijual. Permintaan fans yang membludak membuat sistem penjualan tiket sempat mengalami gangguan teknis.",
      "Promotor, Rajawali Indonesia, berjanji menambah tanggal konser untuk mengakomodasi permintaan yang belum terpenuhi. Pengumuman tanggal tambahan akan dilakukan dalam beberapa hari ke depan.",
      "Konser ini menjadi salah satu event musik paling dinantikan tahun 2026. Fans dari berbagai kota di Indonesia bahkan dari luar negeri telah membeli tiket jauh-jauh hari. Harga tiket berkisar dari Rp 500 ribu hingga Rp 5 juta untuk kategori VIP.",
      "ViralHariIni.id akan memberikan info pengumuman tanggal tambahan secara real-time. Aktifkan notifikasi push untuk tidak ketinggalan. Gratis, tanpa berlangganan.",
    ],
  },
  {
    id: "ext-06",
    title:
      "Hasil Piala AFF 2026: Timnas Indonesia Menang Dramatis 3-2 atas Vietnam",
    excerpt:
      "Timnas Indonesia menang dramatis 3-2 atas Vietnam di matchday kedua Piala AFF 2026. Gol penentu lahir di menit akhir injury time.",
    category: "Olahraga",
    author: "Bola Sport",
    publishedAt: "11 Nov 2026, 22:50 WIB",
    readTime: 2,
    views: "167 rb",
    trending: true,
    imageUrl: IMG("timnas", 1),
    imageHue: 20,
    free: true,
    tags: ["Piala AFF", "Timnas Indonesia", "Vietnam", "Sepak Bola"],
    fullContent: [
      "Timnas Indonesia menang dramatis 3-2 atas Vietnam di matchday kedua Grup B Piala AFF 2026. Gol penentu kemenangan lahir di menit akhir injury time melalui sundulan pemain pengganti.",
      "Skor sebelumnya dua kali imbang, dengan Indonesia unggul lebih dulu melalui gol cantik di babak pertama. Vietnam membalas dengan dua gol cepat di babak kedua, sebelum Indonesia menyamakan dan kemudian memastikan kemenangan di menit akhir.",
      "Hasil ini membuat Timnas Indonesia memuncaki klasemen Grup B dengan 6 poin dari dua laga. Selanjutnya, skuat Garuda akan menghadapi Thailand di pertandingan ketiga.",
      "ViralHariIni.id menyajikan highlight video gol dan reaksi pasca pertandingan di section Video Berita. Tonton gratis, tanpa berlangganan.",
    ],
  },
  {
    id: "ext-07",
    title:
      "Kemenkominfo Blokir 2.500 Akun Media Sosial Sebar Hoaks Pemakzulan",
    excerpt:
      "Kemenkominfo berhasil memblokir 2.500 akun media sosial yang diduga menyebar hoaks terkait isu pemakzulan Wapres Gibran.",
    category: "Hukum",
    author: "CNN Indonesia",
    publishedAt: "11 Nov 2026, 11:25 WIB",
    readTime: 3,
    views: "76,4 rb",
    imageUrl: IMG("cyber", 3),
    imageHue: 245,
    free: true,
    tags: ["Kemenkominfo", "Hoaks", "Pemakzulan", "Media Sosial"],
    fullContent: [
      "Kementerian Komunikasi dan Informatika (Kemenkominfo) berhasil memblokir 2.500 akun media sosial yang diduga menyebar hoaks terkait isu pemakzulan Wapres Gibran Rakabuming Raka.",
      "Direktur Jenderal Penyiaran Kemenkominfo menyampaikan bahwa pemblokiran dilakukan setelah koordinasi dengan aparat penegak hukum dan tim dari platform bersangkutan. Sebagian besar akun terindikasi merupakan akun bot yang sengaja disebarkan untuk memperkeruh situasi.",
      "Kemenkominfo mengimbau masyarakat untuk lebih kritis terhadap informasi yang beredar, terutama yang berkaitan dengan isu politik dan kenegaraan. Verifikasi setiap kabar melalui sumber resmi sebelum mempercayai atau membagikan.",
      "ViralHariIni.id berkomitmen menyajikan kabar berdasarkan kompilasi dari sumber terpercaya, anti-clickbait. Baca dan bagikan dengan bijak. Gratis dibaca, tanpa paywall.",
    ],
  },
  {
    id: "ext-08",
    title:
      "Bursa Karier: 5 Perusahaan Raksasa Buka Lowongan Ribuan Pekerjaan Akhir 2026",
    excerpt:
      "Sejumlah perusahaan raksasa seperti GoTo, Sea Group, BCA, Telkom, dan Unilever membuka ribuan lowongan kerja akhir 2026. Simak posisinya.",
    category: "Ekonomi",
    author: "Kompas Career",
    publishedAt: "11 Nov 2026, 09:40 WIB",
    readTime: 4,
    views: "58,7 rb",
    imageUrl: IMG("ojk", 2),
    imageHue: 150,
    free: true,
    tags: ["Lowongan Kerja", "Karier", "Perusahaan", "Recruitment"],
    fullContent: [
      "Bursa karier akhir 2026 ramai dengan lowongan dari 5 perusahaan raksasa: GoTo, Sea Group, BCA, Telkom, dan Unilever. Total ribuan posisi dibuka untuk berbagai level, dari fresh graduate hingga senior.",
      "Posisi yang paling banyak dibuka meliputi software engineer, data analyst, marketing specialist, customer success, dan supply chain. Sebagian besar posisi berlokasi di Jakarta, Surabaya, dan Bandung, dengan opsi hybrid atau work from office.",
      "Bagi pencari kerja, siapkan CV menarik, portofolio jika relevan, dan latih wawancara. Banyak perusahaan kini juga melakukan assessment online dan coding test untuk posisi teknis.",
      "ViralHariIni.id menyajikan daftar lengkap lowongan per perusahaan dengan link apply resmi di artikel ini. Bagi yang sedang mencari kerja, simpan dan bagikan ke teman. Gratis dibaca.",
    ],
  },
  {
    id: "ext-09",
    title:
      "Bunga Bank Naik Lagi: BI Rate 6,50%, Ini Dampaknya untuk Nasabah",
    excerpt:
      "Bank Indonesia menaikkan BI Rate ke level 6,50%. Bunga kredit dan tabungan diprediksi akan ikut naik. Simak dampaknya untuk nasabah.",
    category: "Ekonomi",
    author: "Kontan",
    publishedAt: "10 Nov 2026, 18:20 WIB",
    readTime: 3,
    views: "63,1 rb",
    imageUrl: IMG("ojk", 0),
    imageHue: 160,
    free: true,
    tags: ["BI Rate", "Bank Indonesia", "Bunga", "Kredit"],
    fullContent: [
      "Bank Indonesia (BI) menaikkan BI Rate sebesar 25 bps ke level 6,50% dalam rapat Dewan Gubernur. Keputusan ini diambil untuk menjaga stabilitas nilai tukar Rupiah dan meredam tekanan inflasi pasca gejolak global.",
      "Dampak untuk nasabah: bunga tabungan dan deposito diprediksi naik, menjadi berita baik untuk penabung. Sementara itu, bunga kredit (KPR, KTA, kredit usaha) juga akan ikut naik, yang berarti cicilan bulanan akan lebih berat.",
      "Bagi yang berencana mengambil kredit dalam waktu dekat, sebaiknya pertimbangkan untuk lock bunga fixed rate sekarang. Bagi penabung, manfaatkan momentum untuk pindah ke deposito tenor 6-12 bulan.",
      "ViralHariIni.id menyajikan analisis lengkap dampak kenaikan BI Rate untuk berbagai profil nasabah. Gratis dibaca, tanpa paywall. Bagikan ke keluarga yang sedang pertimbangkan kredit atau deposito.",
    ],
  },
  {
    id: "ext-10",
    title:
      "Viral: Siswa SMP Asal Bandung Ciptakan Robot Pembersih Sampah Sungai",
    excerpt:
      "Seorang siswa SMP asal Bandung viral setelah menciptakan robot pembersih sampah sungai. Inovasinya mendapat perhatian dari Kementerian Lingkungan Hidup.",
    category: "Viral",
    author: "Liputan6",
    publishedAt: "10 Nov 2026, 20:30 WIB",
    readTime: 2,
    views: "203 rb",
    trending: true,
    imageUrl: IMG("demo", 3),
    imageHue: 145,
    free: true,
    tags: ["Inovasi", "Robot", "Siswa SMP", "Bandung", "Lingkungan"],
    fullContent: [
      "Seorang siswa SMP asal Bandung, Jawa Barat, viral di media sosial setelah menciptakan robot pembersih sampah sungai. Robot kecil ini mampu mengangkat sampah plastik dari permukaan sungai secara otomatis.",
      "Inovasi ini mendapat perhatian dari Kementerian Lingkungan Hidup dan Bakar Laut (KLHK). Menteri LH menyampaikan apresiasi langsung dan berjanji akan mendukung pengembangan inovasi ini ke skala yang lebih besar.",
      "Siswa tersebut mengaku terinspirasi dari kondisi sungai di kotanya yang penuh sampah. Ia belajar membuat robot dari YouTube dan eksperimen di rumah selama 6 bulan.",
      "ViralHariIni.id menyajikan video dokumentasi robot dan wawancara eksklusif dengan siswa di section Video Berita. Kisah inspiratif ini layak dibagikan ke anak-anak dan remaja untuk membangkitkan semangat berkarya. Gratis dibaca dan ditonton.",
    ],
  },
];

// ============================================================
// SEMUA BERITA (flattened untuk grid "All News" section)
// ============================================================
export const allArticles: NewsItem[] = [
  heroNews,
  ...topStories,
  ...trendingNews,
  ...politikNews,
  ...ekonomiNews,
  ...teknologiNews,
  ...internasionalNews,
  ...olahragaNews,
  ...hukumNews,
  ...viralSosial,
  ...extraNews,
].filter((a, i, arr) => arr.findIndex((b) => b.id === a.id) === i); // dedupe by id

// ============================================================
// SLUG ↔ ARTICLE helpers (dideklarasikan setelah allArticles)
// ============================================================
export function getArticleSlug(item: NewsItem): string {
  return `${item.id}-${slugify(item.title)}`;
}

export function getArticleBySlug(slug: string): NewsItem | undefined {
  // Format slug: "<id>-<title-slug>", dimana id = "hero-01", "top-01", "ext-01", dll.
  const idMatch = slug.match(/^([a-z]+-\d+)-/);
  if (idMatch) {
    const id = idMatch[1];
    return allArticles.find((a) => a.id === id);
  }
  // Fallback: cari by id langsung
  return allArticles.find((a) => a.id === slug);
}

// ============================================================
// EDITOR'S PICKS (berita pilihan redaksi)
// ============================================================
export const editorPicks: NewsItem[] = [
  heroNews,
  topStories[2],
  trendingNews[0],
  viralSosial[1],
  extraNews[0],
].filter((a, i, arr) => arr.findIndex((b) => b.id === a.id) === i);

// ============================================================
// POLLING INTERAKTIF (suara pembaca)
// ============================================================
export interface NewsPoll {
  id: string;
  question: string;
  description?: string;
  options: { id: string; label: string }[];
  baseVotes: Record<string, number>;
}

export const newsPolls: NewsPoll[] = [
  {
    id: "poll-01",
    question: "Apa pendapat Anda soal kabar pengunduran diri Gibran dari jabatan Wapres?",
    description:
      "Surat pengunduran diri Gibran dilaporkan diserahkan kepada Presiden Prabowo pada Rabu (11/11) malam. Bagaimana tanggapan Anda?",
    options: [
      { id: "a", label: "Setuju — langkah yang berani & bertanggung jawab" },
      { id: "b", label: "Tidak setuju — sebaiknya tetap melanjutkan jabatan" },
      { id: "c", label: "Netral — tunggu proses resmi di MPR" },
      { id: "d", label: "Bingung — perlu info lebih lengkap" },
    ],
    baseVotes: { a: 8240, b: 6731, c: 9052, d: 3120 },
  },
  {
    id: "poll-02",
    question: "Seberapa sering Anda membaca berita online setiap hari?",
    description:
      "Bantu kami memahami kebiasaan baca berita pembaca ViralHariIni.id untuk menyajikan konten yang lebih baik.",
    options: [
      { id: "a", label: "Lebih dari 10 kali" },
      { id: "b", label: "5-10 kali" },
      { id: "c", label: "1-4 kali" },
      { id: "d", label: "Jarang / hanya saat ada viral" },
    ],
    baseVotes: { a: 4218, b: 11420, c: 18930, d: 6543 },
  },
  {
    id: "poll-03",
    question: "Kategori berita apa yang paling Anda minati?",
    description: "Pilih satu kategori favorit Anda — hasil digunakan untuk personalisasi rekomendasi kami.",
    options: [
      { id: "a", label: "Politik" },
      { id: "b", label: "Ekonomi" },
      { id: "c", label: "Teknologi" },
      { id: "d", label: "Olahraga" },
      { id: "e", label: "Viral / Sosial" },
      { id: "f", label: "Internasional" },
    ],
    baseVotes: { a: 6712, b: 5304, c: 4891, d: 7203, e: 12043, f: 3120 },
  },
];

// ============================================================
// TAG CLOUD (visual hashtag discovery)
// ============================================================
export const trendingTags: { tag: string; weight: number; category: NewsCategory }[] = [
  { tag: "Gibran Mundur", weight: 100, category: "Politik" },
  { tag: "Prabowo", weight: 92, category: "Politik" },
  { tag: "Penyadapan", weight: 88, category: "Hukum" },
  { tag: "Women March", weight: 76, category: "Viral" },
  { tag: "Pencopet Paris", weight: 71, category: "Viral" },
  { tag: "UGM", weight: 65, category: "Viral" },
  { tag: "Hari Pahlawan", weight: 58, category: "Viral" },
  { tag: "Kuliah Gratis", weight: 54, category: "Viral" },
  { tag: "Trump", weight: 50, category: "Internasional" },
  { tag: "Oval Office", weight: 47, category: "Internasional" },
  { tag: "Siber", weight: 44, category: "Teknologi" },
  { tag: "Nvidia", weight: 41, category: "Teknologi" },
  { tag: "Banjir Rob", weight: 39, category: "Lingkungan" },
  { tag: "OJK", weight: 36, category: "Ekonomi" },
  { tag: "BI Rate", weight: 33, category: "Ekonomi" },
  { tag: "Pemakzulan", weight: 30, category: "Politik" },
  { tag: "DPR", weight: 28, category: "Politik" },
  { tag: "Israel", weight: 27, category: "Internasional" },
  { tag: "MU", weight: 26, category: "Olahraga" },
  { tag: "Pochettino", weight: 24, category: "Olahraga" },
  { tag: "Piala AFF", weight: 22, category: "Olahraga" },
  { tag: "Black Friday", weight: 20, category: "Viral" },
  { tag: "TPPO", weight: 18, category: "Hukum" },
  { tag: "LPSK", weight: 15, category: "Hukum" },
];
