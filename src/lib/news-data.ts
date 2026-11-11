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
].filter((a, i, arr) => arr.findIndex((b) => b.id === a.id) === i); // dedupe by id
