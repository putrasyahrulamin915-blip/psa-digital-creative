export function formatRupiah(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) return 'Rp0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  basePrice: number;
  priceLabel?: string;
  pricingNote?: string;
  shortDesc: string;
  benefits: string[];
  deliverables: string;
  turnaround: string;
  popular?: boolean;
  image: string;
  fallbackImage: string;
}

export interface PrintProductItem {
  id: string;
  name: string;
  unitPrice: number;
  unitLabel: string;
  material: string;
  finishing: string;
  workflowNote: string;
  icon: string;
  image: string;
  fallbackImage: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  desc: string;
  icon: string;
  optional?: boolean;
}

export interface TimelineEntry {
  title: string;
  time: string;
  done: boolean;
  desc: string;
}

export interface ClientFileItem {
  id?: string;
  name: string;
  size: string;
  type: string;
  dataUrl?: string;
  previewUrl?: string;
}

export interface FinalPackageItem {
  masterVectorUrl?: string;
  printReadyPdfUrl?: string;
  highResPngUrl?: string;
  downloadAllUrl?: string;
  invoiceNumber?: string;
}

export interface OrderItem {
  id: string;
  isDemo?: boolean;
  serviceName: string;
  clientName: string;
  clientPhone?: string;
  dateCreated: string;
  estimatedDelivery: string;
  status: 'Pesanan Masuk' | 'Diproses' | 'Desain Dibuat' | 'Revisi' | 'Disetujui' | 'Selesai';
  statusStage: number;
  designerAssigned: string;
  briefSummary: string;
  previewAvailable: boolean;
  previewImageUrl?: string;
  notes: string;
  revisionsUsed: number;
  maxRevisions: number;
  orderType?: 'Design Only' | 'Design + Print';
  estimatedTotal?: number;
  whatsappDeliveryStatus?: 'pending' | 'sent' | 'failed';
  timeline: TimelineEntry[];
  clientFiles?: ClientFileItem[];
  finalPackage?: FinalPackageItem;
}

export interface FAQItem {
  q: string;
  a: string;
}

export const APP_CONFIG = {
  brandName: "PSA Digital Creative",
  businessName: "PSA Digital Creative – Smart Design & Digital Order",
  ownerName: "Putra Syahrul Amin",
  ownerNote: "PSA merupakan singkatan dari Putra Syahrul Amin sebagai identitas pemilik usaha.",
  tagline: "Smart Design & Digital Order",
  positioning: "Pesan desain lebih mudah, terstruktur, dan transparan.",
  supportingCopy: "Mulai dari brief, desain, revisi, hingga file final dalam satu alur digital.",
  description: "Layanan desain digital dan pemesanan produk kreatif dengan proses online yang lebih mudah, terstruktur, dan transparan.",
  brand: {
    name: "PSA Digital Creative",
    tagline: "Smart Design & Digital Order",
    logo: {
      src: "/assets/psa-logo.svg",
      svg: "/assets/psa-logo.svg",
      white: "/assets/psa-logo-white.svg",
      alt: "PSA Digital Creative"
    }
  },
  themeColor: {
    primary: "#0A0A0A",     // Deep solid black
    secondary: "#FFFFFF",   // Crisp white
    accent: "#3B66FF",      // Royal electric blue from official logo
    accentHover: "#2851E3", // Deep royal blue
    accentLight: "#EEF2FF", // Soft sky blue tint
    bgLight: "#F8FAFC",     // Clean surface
    cardBorder: "#E2E8F0",  // Subtle border
    text: "#0A0A0A",        // Heading & dark text
    muted: "#64748B"        // Secondary body text
  },
  // Kontak bisnis resmi PSA Digital Creative
  contact: {
    whatsapp: "085775735769",
    whatsappClean: "6285775735769", // Format internasional untuk wa.me
    email: "order@psadigital.com",
    address: "Jakarta & Layanan Online Seluruh Indonesia",
    instagram: "@psadigitalcreative",
    consultationHours: "Online 24/7 – Respon Cepat"
  },
  // Konfigurasi Harga Resmi (Starting Prices)
  pricing: {
    disclaimer: "Harga dapat berubah sesuai ukuran, bahan, jumlah, finishing, tingkat kompleksitas, dan kebutuhan produksi.",
    design: {
      logo: 250000,
      poster: 75000,
      banner: 75000,
      brochure: 100000,
      businessCard: 50000,
      invitation: 75000,
      socialMediaSingle: 35000,
      socialMediaFive: 150000,
      socialMediaTen: 275000,
      sticker: 75000,
      packaging: 250000,
      custom: 75000,
    },
    print: {
      bannerPerSqm: 25000,
      businessCard100: 50000,
      stickerSheet: 10000,
      invitationPerPiece: 3500,
      brochurePerSheet: 2000,
      xBanner: 175000,
      customSticker: 15000,
      packagingPerPiece: 5000,
      mug: 45000,
    },
    addons: {
      extraRevision: 25000,
      sourceFile: 50000,
      expressPercentage: 30,
    }
  },
  // Layanan Desain Digital Utama
  services: [
    {
      id: "logo",
      name: "Logo Design",
      slug: "logo-design",
      category: "Digital Branding",
      basePrice: 250000,
      priceLabel: "Mulai Rp250.000",
      shortDesc: "Desain logo profesional, filosofis, dan scalable untuk memperkuat identitas brand bisnis & UMKM Anda.",
      benefits: [
        "Vector master file (AI, SVG, EPS)",
        "Panduan warna & tipografi brand",
        "Format PNG transparan resolusi tinggi",
        "Mockup visual 3D & stationery preview"
      ],
      deliverables: "Master Vector (AI/SVG) + PNG High-Res + Brand Color Guide",
      turnaround: "2 - 4 Hari Kerja",
      popular: true,
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
      fallbackImage: "/assets/showcase/showcase-logo.svg"
    },
    {
      id: "poster",
      name: "Poster / Flyer",
      slug: "poster-design",
      category: "Promosi & Publikasi",
      basePrice: 75000,
      priceLabel: "Mulai Rp75.000",
      shortDesc: "Poster & flyer visual berbobot tinggi untuk event kampus, seminar, workshop, launching produk, atau konser.",
      benefits: [
        "Layout visual komunikatif & eye-catching",
        "Siap cetak (CMYK 300 DPI) & digital (RGB)",
        "Ukuran standar A4, A3, atau custom",
        "File PDF siap cetak + JPG web ready"
      ],
      deliverables: "PDF Siap Cetak + JPG/PNG Digital High-Res",
      turnaround: "1 - 3 Hari Kerja",
      popular: true,
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
      fallbackImage: "/assets/showcase/showcase-poster.svg"
    },
    {
      id: "banner",
      name: "Banner / Spanduk",
      slug: "banner-design",
      category: "Media Outdoor & Display",
      basePrice: 75000,
      priceLabel: "Mulai Rp75.000",
      shortDesc: "Desain banner outdoor, roll-up banner pameran, backdrop panggung, hingga x-banner promosi usaha.",
      benefits: [
        "Ukuran presisi skala 1:1 tanpa pecah",
        "Setting warna CMYK standar percetakan",
        "Dukungan margin lipat & mata ayam",
        "Preview mockup tata letak realistis"
      ],
      deliverables: "TIFF / PDF Siap Cetak Skala Penuh + JPG Preview",
      turnaround: "1 - 2 Hari Kerja",
      popular: false,
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      fallbackImage: "/assets/showcase/showcase-banner.svg"
    },
    {
      id: "brochure",
      name: "Brosur / Company Profile",
      slug: "brochure-design",
      category: "Marketing Collateral",
      basePrice: 100000,
      priceLabel: "Mulai Rp100.000",
      shortDesc: "Brosur lipat 2, lipat 3, booklet profil usaha, dan flyer katalog produk yang rapi dan terstruktur.",
      benefits: [
        "Struktur informasi rapi & mudah dibaca",
        "Alur pembacaan persuasif (AIDA framework)",
        "Grid presisi lipatan cetak",
        "Versi cetak & PDF interaktif untuk digital"
      ],
      deliverables: "PDF Print-Ready + E-Brochure PDF Ringan",
      turnaround: "2 - 5 Hari Kerja",
      popular: false,
      image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80",
      fallbackImage: "/assets/showcase/showcase-brochure.svg"
    },
    {
      id: "business-card",
      name: "Business Card",
      slug: "business-card-design",
      category: "Professional Stationery",
      basePrice: 50000,
      priceLabel: "Mulai Rp50.000",
      shortDesc: "Kartu nama eksekutif berstandar modern, dilengkapi integrasi QR Code dinamis atau link profil digital.",
      benefits: [
        "Desain 2 sisi (depan & belakang)",
        "Generate QR Code kontak/website",
        "Setting bleed & crop mark standar percetakan",
        "Opsi rekomendasi finishing cetak (Doff/Spot UV)"
      ],
      deliverables: "PDF Vector Print-Ready + Mockup Preview",
      turnaround: "1 - 2 Hari Kerja",
      popular: false,
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
      fallbackImage: "/assets/showcase/showcase-business-card.svg"
    },
    {
      id: "invitation",
      name: "Invitation / Undangan",
      slug: "invitation-design",
      category: "Personal & Celebration",
      basePrice: 75000,
      priceLabel: "Mulai Rp75.000",
      shortDesc: "Desain kartu undangan pernikahan, wisuda, perayaan, dan syukuran dengan estetika modern elegan.",
      benefits: [
        "Desain eksklusif sesuai tema acara",
        "Tersedia format digital (gambar/story) & cetak",
        "Pilihan gaya: Minimalis, Floral, Monokrom, Tradisional Modern",
        "File siap kirim chat & cetak offset"
      ],
      deliverables: "Digital Invite JPG/PNG + Master Print PDF",
      turnaround: "2 - 3 Hari Kerja",
      popular: false,
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      fallbackImage: "/assets/showcase/showcase-invitation.svg"
    },
    {
      id: "social-media",
      name: "Social Media Design",
      slug: "social-media-content",
      category: "Digital Content",
      basePrice: 35000,
      priceLabel: "1 Post Rp35.000 | 5 Post Rp150.000",
      shortDesc: "Paket visual feed Instagram, carousel edukasi, TikTok cover, dan story promosi untuk meningkatkan konversi.",
      benefits: [
        "Visual konsisten selaras identitas brand",
        "Format carousel nyambung (seamless)",
        "Ukuran 1:1, 4:5, dan 9:16 siap posting",
        "Pilihan paket: 1 Post (35rb), 5 Post (150rb), 10 Post (275rb)"
      ],
      deliverables: "PNG High-Quality + Source File Terstruktur",
      turnaround: "2 - 4 Hari Kerja",
      popular: true,
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
      fallbackImage: "/assets/showcase/showcase-social-media.svg"
    },
    {
      id: "sticker",
      name: "Sticker / Label",
      slug: "sticker-label-design",
      category: "Packaging & Print",
      basePrice: 75000,
      priceLabel: "Mulai Rp75.000",
      shortDesc: "Desain label stiker botol, box packaging, segel garansi, dan stiker komunitas dengan pola potong presisi.",
      benefits: [
        "Desain pola potong Kiss-Cut atau Die-Cut",
        "Setting margin aman potong keliling",
        "Warna tajam CMYK standar cetak",
        "File siap kirim ke mesin cutting"
      ],
      deliverables: "PDF Vector + PNG Preview",
      turnaround: "1 - 2 Hari Kerja",
      popular: false,
      image: "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&w=800&q=80",
      fallbackImage: "/assets/showcase/showcase-sticker.svg"
    },
    {
      id: "packaging",
      name: "Packaging Design",
      slug: "packaging-design",
      category: "Packaging & Print",
      basePrice: 250000,
      priceLabel: "Mulai Rp250.000",
      shortDesc: "Desain kemasan box produk, pouch kopi/snack, label botol kosmetik, dan sleeve packaging UMKM.",
      benefits: [
        "Pola dieline lengkap skala 1:1",
        "Penataan label nutrisi, barcode, & legalitas",
        "Visual 3D mockup realistis",
        "File siap produksi percetakan"
      ],
      deliverables: "Master Dieline AI/PDF + 3D Render Mockup",
      turnaround: "3 - 5 Hari Kerja",
      popular: false,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
      fallbackImage: "/assets/showcase/showcase-packaging.svg"
    },
    {
      id: "custom",
      name: "Custom Design Project",
      slug: "custom-design",
      category: "Custom Request",
      basePrice: 75000,
      priceLabel: "Mulai Rp75.000",
      shortDesc: "Kebutuhan desain grafis kustom seperti sertifikat, merchandise apparel, kalender, atau banner pameran.",
      benefits: [
        "Brief fleksibel sesuai kebutuhan spesifik",
        "Konsultasi konsep awal bersama desainer",
        "Penyesuaian format output file",
        "Revisi terstruktur melalui portal digital"
      ],
      deliverables: "Custom Deliverables sesuai persetujuan brief",
      turnaround: "Disesuaikan dengan cakupan proyek",
      popular: false,
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
      fallbackImage: "/assets/showcase/showcase-custom.svg"
    }
  ],
  // Produk Cetak & Fisik (Physical Print Collateral) dengan harga mulai
  printProducts: [
    {
      id: "banner-print",
      name: "Banner & Spanduk",
      unitPrice: 25000,
      unitLabel: "Rp25.000 / m²",
      material: "Flexi Standar 280g / Flexi Korea 440g",
      finishing: "Mata ayam atau selongsong keliling",
      workflowNote: "Desain disetujui → File disiapkan → Pesanan dilanjutkan ke proses produksi percetakan.",
      icon: "Flag",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      fallbackImage: "/assets/showcase/print-banner.svg"
    },
    {
      id: "card-print",
      name: "Business Card (1 Box)",
      unitPrice: 50000,
      unitLabel: "Rp50.000 / 100 pcs (1 box)",
      material: "Art Carton 260g / 310g",
      finishing: "Laminasi Doff atau Glossy",
      workflowNote: "1 box isi 100 lembar. Siap produksi setelah desain disetujui di portal.",
      icon: "CreditCard",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
      fallbackImage: "/assets/showcase/print-card.svg"
    },
    {
      id: "sticker-print",
      name: "Stiker Vinyl / Chromo",
      unitPrice: 10000,
      unitLabel: "Rp10.000 / lembar A3+",
      material: "Stiker Vinyl Tahan Air / Chromo",
      finishing: "Kiss-cut (lembaran) atau Die-cut (potong putus)",
      workflowNote: "Cocok untuk label kemasan produk makanan, minuman, dan branding UMKM.",
      icon: "Layers",
      image: "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&w=800&q=80",
      fallbackImage: "/assets/showcase/print-sticker.svg"
    },
    {
      id: "invitation-print",
      name: "Undangan Fisik",
      unitPrice: 3500,
      unitLabel: "Rp3.500 / pcs",
      material: "Art Paper, Jasmine Pearl, atau Linen",
      finishing: "Foil emas/perak, embos, amplop",
      workflowNote: "Pesanan dapat dilanjutkan ke proses produksi percetakan dengan minimum kuantitas.",
      icon: "Mail",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      fallbackImage: "/assets/showcase/print-invitation.svg"
    },
    {
      id: "brochure-print",
      name: "Brosur / Flyer Cetak",
      unitPrice: 2000,
      unitLabel: "Rp2.000 / lembar",
      material: "Art Paper 120g / 150g",
      finishing: "Lipat 2 atau Lipat 3",
      workflowNote: "Kualitas cetak offset warna tajam bolak-balik.",
      icon: "FileText",
      image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80",
      fallbackImage: "/assets/showcase/print-brochure.svg"
    },
    {
      id: "xbanner-print",
      name: "X-Banner Stand Set",
      unitPrice: 175000,
      unitLabel: "Rp175.000 / unit (Lengkap Rangka)",
      material: "Flexi Korea / Luster + Rangka X-Banner",
      finishing: "Mata ayam 4 sudut + Sarung pembungkus",
      workflowNote: "Praktis untuk display pameran, booth kasir, dan event promosi.",
      icon: "Package",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      fallbackImage: "/assets/showcase/print-xbanner.svg"
    },
    {
      id: "mug-print",
      name: "Mug Keramik Custom",
      unitPrice: 45000,
      unitLabel: "Rp45.000 / pcs",
      material: "Keramik Putih SNI",
      finishing: "Sublimasi Full Color + Box Satuan",
      workflowNote: "Souvenir eksklusif kantor, wisuda, atau merchandise komunitas.",
      icon: "Package",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
      fallbackImage: "/assets/showcase/print-mug.svg"
    }
  ],
  // Alur Kerja Digital PSA Creative
  workflow: [
    {
      step: "01",
      title: "Pilih Layanan",
      desc: "Tentukan jenis kebutuhan desain digital atau produk cetak yang Anda perlukan melalui katalog layanan.",
      icon: "MousePointerClick"
    },
    {
      step: "02",
      title: "Isi Brief Terstruktur",
      desc: "Lengkapi formulir brief online: tujuan desain, target audiens, ukuran, nuansa warna, dan tenggat waktu.",
      icon: "FileText"
    },
    {
      step: "03",
      title: "Upload Bahan Desain",
      desc: "Unggah materi logo, foto produk resolusi tinggi, referensi gaya, dan naskah teks dalam satu formulir aman.",
      icon: "UploadCloud"
    },
    {
      step: "04",
      title: "Kirim Pesanan",
      desc: "Sistem men-generate Order ID unik dan meneruskan rincian lengkap ke WhatsApp CS admin PSA.",
      icon: "Send"
    },
    {
      step: "05",
      title: "Desain Dikerjakan",
      desc: "Tim desainer memproses brief Anda secara terfokus sesuai jadwal kerja yang disepakati.",
      icon: "Palette"
    },
    {
      step: "06",
      title: "Preview & Revisi",
      desc: "Tinjau preview draft desain secara online dan sampaikan catatan revisi secara terstruktur.",
      icon: "Eye"
    },
    {
      step: "07",
      title: "Approve & File Final",
      desc: "Setelah disetujui, dapatkan paket link download file master (AI/PDF) dan format gambar siap pakai (PNG/JPG).",
      icon: "CheckCircle2"
    },
    {
      step: "08",
      title: "Produksi Cetak (Opsional)",
      desc: "Bila membutuhkan produk fisik, pesanan dapat dilanjutkan ke proses produksi atau percetakan rekanan.",
      icon: "Printer",
      optional: true
    }
  ],
  // Demo Orders untuk Order Tracking UI
  demoOrders: [
    {
      id: "PSA-20261004-A8K2",
      isDemo: true,
      serviceName: "Logo Design",
      clientName: "Kopi Nusantara UMKM",
      clientPhone: "081298765432",
      dateCreated: "04 Okt 2026",
      estimatedDelivery: "07 Okt 2026",
      status: "Desain Dibuat",
      statusStage: 3,
      designerAssigned: "Putra S. (Lead Designer)",
      briefSummary: "Logo kedai kopi modern minimalis, nuansa warm earthy, target anak muda & mahasiswa.",
      previewAvailable: true,
      previewImageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
      notes: "Draft preview konsep #1 dan #2 sedang disiapkan untuk review klien.",
      revisionsUsed: 0,
      maxRevisions: 2,
      clientFiles: [
        {
          name: "sketsa_ide_logo_kopi.jpg",
          size: "1.4 MB",
          type: "image/jpeg",
          dataUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "palet_warna_referensi.png",
          size: "820 KB",
          type: "image/png",
          dataUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "dokumen_profil_kedai.pdf",
          size: "340 KB",
          type: "application/pdf"
        }
      ],
      finalPackage: {
        masterVectorUrl: "/assets/showcase/showcase-logo.svg",
        printReadyPdfUrl: "/assets/showcase/showcase-logo.svg",
        highResPngUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
        downloadAllUrl: "#",
        invoiceNumber: "INV-PSA-20261004-01"
      },
      timeline: [
        { title: "Pesanan Masuk", time: "04 Okt 2026, 09:15 WIB", done: true, desc: "Brief dan 3 berkas logo berhasil diterima sistem." },
        { title: "Diproses", time: "04 Okt 2026, 11:30 WIB", done: true, desc: "Verifikasi brief dan penugasan desainer." },
        { title: "Desain Dibuat", time: "04 Okt 2026, 14:00 WIB", done: true, desc: "Eksplorasi sketsa dan vektorisasi konsep." },
        { title: "Review & Revisi", time: "Menunggu Preview", done: false, desc: "Tahap evaluasi visual oleh pemesan." },
        { title: "Disetujui", time: "Tahap Selanjutnya", done: false, desc: "Persetujuan final atas hasil karya." },
        { title: "Selesai & Pengiriman", time: "Tahap Selanjutnya", done: false, desc: "Penyerahan paket file master." }
      ]
    },
    {
      id: "PSA-20261001-B3P9",
      isDemo: true,
      serviceName: "Poster / Flyer",
      clientName: "BEM Fakultas Teknologi",
      clientPhone: "081377889900",
      dateCreated: "01 Okt 2026",
      estimatedDelivery: "03 Okt 2026",
      status: "Selesai",
      statusStage: 6,
      designerAssigned: "Putra S. (Lead Designer)",
      briefSummary: "Poster Tech Seminar AI & Startup, dominan biru neon & putih.",
      previewAvailable: true,
      previewImageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
      notes: "Seluruh paket file final (Print PDF CMYK + PNG Web) telah diserahkan.",
      revisionsUsed: 1,
      maxRevisions: 2,
      clientFiles: [
        {
          name: "foto_narasumber_utama.jpg",
          size: "2.1 MB",
          type: "image/jpeg",
          dataUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
        },
        {
          name: "logo_universitas_transparan.png",
          size: "450 KB",
          type: "image/png",
          dataUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
        }
      ],
      finalPackage: {
        masterVectorUrl: "/assets/showcase/showcase-poster.svg",
        printReadyPdfUrl: "/assets/showcase/showcase-poster.svg",
        highResPngUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
        downloadAllUrl: "#",
        invoiceNumber: "INV-PSA-20261001-02"
      },
      timeline: [
        { title: "Pesanan Masuk", time: "01 Okt 2026, 10:00 WIB", done: true, desc: "Brief dan materi terkirim." },
        { title: "Diproses", time: "01 Okt 2026, 13:00 WIB", done: true, desc: "Jadwal pengerjaan ditetapkan." },
        { title: "Desain Dibuat", time: "02 Okt 2026, 17:00 WIB", done: true, desc: "Draft #1 dikirim." },
        { title: "Revisi", time: "02 Okt 2026, 20:00 WIB", done: true, desc: "Penyesuaian teks nama pembicara seminar." },
        { title: "Disetujui", time: "03 Okt 2026, 11:30 WIB", done: true, desc: "Klien menyetujui versi revisi." },
        { title: "Selesai & File Diserahkan", time: "03 Okt 2026, 16:00 WIB", done: true, desc: "Paket file final (Master AI/PDF & PNG High-Res) telah diserahkan." }
      ]
    }
  ],
  // Frequently Asked Questions
  faq: [
    {
      q: "Berapa lama pengerjaan desain?",
      a: "Waktu pengerjaan berkisar antara 1 hingga 4 hari kerja tergantung pada kompleksitas jenis layanan (misalnya banner dan poster 1-2 hari kerja, logo 2-4 hari kerja). Estimasi pastinya akan dikonfirmasikan oleh admin setelah review brief."
    },
    {
      q: "Berapa kali batas revisi?",
      a: "Setiap paket layanan standar mencakup 2 kali revisi minor (seperti penyesuaian warna, posisi elemen, atau perbaikan teks) agar hasil akhir sesuai ekspektasi. Revisi tambahan dapat dipilih melalui opsi add-on."
    },
    {
      q: "Apakah bisa meminta desain custom?",
      a: "Tentu bisa! Pilih layanan 'Custom Design Project' pada formulir brief untuk menyampaikan spesifikasi unik yang Anda perlukan."
    },
    {
      q: "Apakah bisa mengirim logo dan foto sendiri?",
      a: "Ya! Formulir order kami menyediakan pengunggah berkas terintegrasi yang mendukung format PNG, JPG, WEBP, hingga PDF sampai 5 berkas."
    },
    {
      q: "Apakah bisa sekaligus memesan produk cetak fisik?",
      a: "Ya! PSA Digital Creative menyediakan opsi Design Only atau Design + Print. Setelah desain disetujui, pesanan dapat dilanjutkan langsung ke proses percetakan untuk banner, stiker, kartu nama, atau flyer."
    },
    {
      q: "Apakah bisa hanya membeli file desain?",
      a: "Bisa, Anda cukup memilih opsi 'Hanya Desain' pada formulir pemesanan, dan kami akan menyerahkan master file digital lengkap (PDF Print-Ready, PNG resolusi tinggi, atau Source File)."
    },
    {
      q: "Format file apa saja yang bisa diunggah?",
      a: "Kami menerima format gambar umum (PNG, JPG, JPEG, WEBP) serta dokumen teks/referensi berformat PDF hingga maksimal 10 MB per file."
    },
    {
      q: "Bagaimana cara memantau status pesanan?",
      a: "Setelah order terkirim, Anda akan mendapatkan Order ID unik (contoh: PSA-20261004-A8K2). Masukkan nomor tersebut pada menu 'Lacak Pesanan' untuk melihat posisi pengerjaan terkini."
    },
    {
      q: "Bagaimana alur pembayarannya?",
      a: "Detail pembayaran, konfirmasi invoice, serta opsi transfer/QRIS akan dikonfirmasikan langsung oleh admin CS PSA melalui WhatsApp setelah brief pesanan diperiksa."
    },
    {
      q: "Apakah bisa memesan layanan urgent / kilat (Express)?",
      a: "Bisa! Kami menyediakan opsi add-on 'Express (+30%)' pada formulir order untuk mendapatkan prioritas antrian pengerjaan lebih cepat."
    }
  ]
};

export default APP_CONFIG;
