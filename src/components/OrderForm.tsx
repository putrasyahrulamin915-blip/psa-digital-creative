import React, { useState } from 'react';
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Copy,
  ExternalLink,
  Check,
  AlertCircle,
} from 'lucide-react';
import { APP_CONFIG, formatRupiah, OrderItem } from '../lib/appConfig';

interface OrderFormProps {
  selectedServiceId?: string;
  onOrderCreated?: (newOrder: OrderItem) => void;
  onTrackOrderDirectly?: (orderId: string) => void;
  aiSuggestedData?: {
    serviceName?: string;
    style?: string;
    colors?: string;
    notes?: string;
  } | null;
}

interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  sizeBytes: number;
  type: string;
  dataUrl?: string;
}

export default function OrderForm({
  selectedServiceId,
  onOrderCreated,
  onTrackOrderDirectly,
  aiSuggestedData,
}: OrderFormProps) {
  // Customer info fields
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  // Design order fields
  const [serviceId, setServiceId] = useState(selectedServiceId || 'logo');
  const [purpose, setPurpose] = useState('');
  const [brief, setBrief] = useState('');
  const [dimensions, setDimensions] = useState('1080 x 1080 px (Feed 1:1)');
  const [customDimension, setCustomDimension] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('Modern & Minimalis');
  const [colorPreference, setColorPreference] = useState('');
  const [textToInclude, setTextToInclude] = useState('');
  const [deadline, setDeadline] = useState('Standar (2 - 4 Hari)');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Add-ons
  const [extraRevision, setExtraRevision] = useState(false);
  const [sourceFile, setSourceFile] = useState(false);
  const [expressDelivery, setExpressDelivery] = useState(false);

  // Printing option: 'design-only' | 'design-print'
  const [orderType, setOrderType] = useState<'design-only' | 'design-print'>('design-only');
  const [printProductId, setPrintProductId] = useState('banner-print');
  const [printQuantity, setPrintQuantity] = useState<number>(1);
  const [printSize, setPrintSize] = useState('3 x 1 Meter');
  const [printMaterial, setPrintMaterial] = useState('Standar Rekomendasi PSA');
  const [shippingAddress, setShippingAddress] = useState('');
  const [productionNotes, setProductionNotes] = useState('');

  // File uploads
  const [files, setFiles] = useState<UploadedFileItem[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Verification & Submission state
  const [confirmedInfo, setConfirmedInfo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successOrder, setSuccessOrder] = useState<OrderItem | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState('');

  // Sync when selectedServiceId changes from outside
  const [prevSelectedServiceId, setPrevSelectedServiceId] = useState(selectedServiceId);
  if (selectedServiceId !== prevSelectedServiceId) {
    setPrevSelectedServiceId(selectedServiceId);
    setServiceId(selectedServiceId || 'logo');
  }

  // Sync when AI suggestions are passed
  const [prevAiData, setPrevAiData] = useState(aiSuggestedData);
  if (aiSuggestedData !== prevAiData) {
    setPrevAiData(aiSuggestedData);
    if (aiSuggestedData?.style) setSelectedStyle(aiSuggestedData.style);
    if (aiSuggestedData?.colors) setColorPreference(aiSuggestedData.colors);
    if (aiSuggestedData?.notes) {
      setBrief((prev) => (prev ? `${prev}\n\n[Arahan AI]: ${aiSuggestedData.notes}` : `[Arahan AI]: ${aiSuggestedData.notes}`));
    }
  }

  // Selected Service
  const currentService = APP_CONFIG.services.find((s) => s.id === serviceId) || APP_CONFIG.services[0];
  const currentPrintProduct = APP_CONFIG.printProducts.find((p) => p.id === printProductId) || APP_CONFIG.printProducts[0];

  // Live Price Calculation
  const baseDesignPrice = currentService.basePrice || 75000;
  const addonsTotal =
    (extraRevision ? APP_CONFIG.pricing.addons.extraRevision : 0) +
    (sourceFile ? APP_CONFIG.pricing.addons.sourceFile : 0);

  let printTotal = 0;
  if (orderType === 'design-print') {
    printTotal = (currentPrintProduct.unitPrice || 25000) * Math.max(1, printQuantity);
  }

  const subtotal = baseDesignPrice + addonsTotal + printTotal;
  let expressFee = 0;
  if (expressDelivery) {
    expressFee = Math.round(subtotal * (APP_CONFIG.pricing.addons.expressPercentage / 100));
  }
  const estimatedGrandTotal = subtotal + expressFee;

  // File Upload Handler (Max 5 files, 10MB per file, 30MB total)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const selected = e.target.files;
    if (!selected) return;

    if (files.length + selected.length > 5) {
      setUploadError('Maksimal 5 berkas per pesanan.');
      return;
    }

    const allowedTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/webp',
      'application/pdf',
    ];

    const newFiles: UploadedFileItem[] = [];
    let currentTotalBytes = files.reduce((acc, f) => acc + f.sizeBytes, 0);

    for (const file of Array.from(selected)) {
      if (!allowedTypes.includes(file.type.toLowerCase())) {
        setUploadError(`Format file "${file.name}" tidak didukung. Harap unggah PNG, JPG, WEBP, atau PDF.`);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setUploadError(`File "${file.name}" terlalu besar. Maksimal 10 MB per file.`);
        return;
      }
      currentTotalBytes += file.size;
      if (currentTotalBytes > 30 * 1024 * 1024) {
        setUploadError('Total seluruh berkas melebihi batas 30 MB.');
        return;
      }

      const fileItem: UploadedFileItem = {
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        sizeBytes: file.size,
        type: file.type,
      };

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          fileItem.dataUrl = ev.target?.result as string;
          setFiles((prev) => [...prev]);
        };
        reader.readAsDataURL(file);
      }

      newFiles.push(fileItem);
    }

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      setSubmitError('Silakan isi Nama Lengkap pemesan.');
      document.getElementById('input-order-name')?.focus();
      return;
    }

    const cleanWhatsapp = typeof whatsapp === 'string' ? whatsapp.replace(/[^0-9]/g, '') : '';
    if (!cleanWhatsapp || cleanWhatsapp.length < 8) {
      setSubmitError('Nomor WhatsApp aktif wajib diisi (minimal 9 digit, contoh: 081234567890).');
      document.getElementById('input-order-whatsapp')?.focus();
      return;
    }

    if (!brief || typeof brief !== 'string' || brief.trim().length < 5) {
      setSubmitError('Silakan lengkapi deskripsi brief desain (minimal 5 karakter).');
      document.getElementById('input-order-brief')?.focus();
      return;
    }

    if (!confirmedInfo) {
      setSubmitError('Silakan centang persetujuan informasi sebelum mengirim pesanan.');
      return;
    }

    setIsSubmitting(true);

    try {
      const finalDimensions = dimensions === 'Ukuran Kustom' ? customDimension || 'Kustom' : dimensions;
      const isDesignAndPrint = orderType === 'design-print';
      
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let rand = '';
      for (let i = 0; i < 4; i++) {
        rand += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      const orderId = `PSA-${year}${month}${day}-${rand}`;

      const createdOrder: OrderItem = {
        id: orderId,
        isDemo: false,
        serviceName: currentService.name,
        clientName: fullName.trim(),
        clientPhone: cleanWhatsapp,
        dateCreated: now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
        estimatedDelivery: deadline || '2 - 4 Hari Kerja',
        status: 'Pesanan Masuk',
        statusStage: 1,
        designerAssigned: 'Putra S. (Lead Designer)',
        briefSummary: `${company ? `[${company}] ` : ''}${brief.slice(0, 150)}...`,
        previewAvailable: true,
        previewImageUrl: currentService.image || currentService.fallbackImage,
        notes: 'Pesanan telah diterima sistem dan dialokasikan ke antrian pengerjaan desainer.',
        revisionsUsed: 0,
        maxRevisions: extraRevision ? 3 : 2,
        orderType: isDesignAndPrint ? 'Design + Print' : 'Design Only',
        estimatedTotal: estimatedGrandTotal,
        whatsappDeliveryStatus: 'sent',
        clientFiles: files.map((f) => ({
          name: f.name,
          size: f.size,
          type: f.type,
          dataUrl: f.dataUrl,
        })),
        finalPackage: {
          masterVectorUrl: currentService.fallbackImage,
          printReadyPdfUrl: currentService.fallbackImage,
          highResPngUrl: currentService.image,
          downloadAllUrl: '#',
          invoiceNumber: `INV-${orderId}`,
        },
        timeline: [
          {
            title: 'Pesanan Masuk',
            time: 'Baru saja',
            done: true,
            desc: 'Brief formulir digital dan berkas berhasil diterima sistem.',
          },
          {
            title: 'Verifikasi & Antrian Desainer',
            time: 'Menunggu',
            done: false,
            desc: 'Admin CS memverifikasi brief dan menetapkan desainer.',
          },
          {
            title: 'Desain Dibuat',
            time: 'Menunggu',
            done: false,
            desc: 'Proses eksplorasi visual draft mockup.',
          },
        ],
      };

      const filesList = files.length > 0
        ? files.map((f, idx) => `${idx + 1}. ${f.name}`).join(', ')
        : 'Tidak ada file lampiran';

      const adminWhatsAppMessage = `*HALO ADMIN PSA DIGITAL CREATIVE!*
Ada pesanan desain baru yang masuk dari formulir website:

*RINCIAN PESANAN:*
• *Order ID:* ${orderId}
• *Nama Pemesan:* ${fullName}
• *WhatsApp Pemesan:* ${cleanWhatsapp}
${company ? `• *Nama Brand / Usaha:* ${company}\n` : ''}${email ? `• *Email:* ${email}\n` : ''}• *Layanan:* ${currentService.name}
• *Tipe Pesanan:* ${isDesignAndPrint ? 'Desain + Cetak Fisik' : 'Hanya Desain (File Digital)'}
• *Estimasi Total Biaya:* ${formatRupiah(estimatedGrandTotal)}

*BRIEF & SPESIFIKASI:*
• *Deskripsi Kebutuhan:* ${brief}
• *Ukuran:* ${finalDimensions}
• *Gaya Visual:* ${selectedStyle}
• *Pilihan Warna:* ${colorPreference || 'Sesuai Konsep'}
• *Target Deadline:* ${deadline}
${isDesignAndPrint ? `\n*DETAIL PRODUKSI CETAK:*\n• Produk: ${currentPrintProduct.name}\n• Jumlah: ${printQuantity}\n• Ukuran: ${printSize}\n• Bahan: ${printMaterial}\n• Alamat Kirim: ${shippingAddress || 'Akan dikonfirmasi di chat'}\n` : ''}
*Lampiran Berkas:* ${filesList}
${additionalNotes ? `*Catatan Tambahan:* ${additionalNotes}\n` : ''}
_Mohon konfirmasi pesanan ini dan infokan nomor rekening / QRIS pembayaran. Terima kasih!_`;

      const csNumber = '6285775735769';
      const whatsappUrl = `https://wa.me/${csNumber}?text=${encodeURIComponent(adminWhatsAppMessage)}`;

      setSuccessOrder(createdOrder);
      setGeneratedWhatsAppUrl(whatsappUrl);

      if (onOrderCreated) {
        onOrderCreated(createdOrder);
      }

      // MANDATORY FORM RESET: Reset all state so Customer sees clean form
      setFullName('');
      setWhatsapp('');
      setEmail('');
      setCompany('');
      setPurpose('');
      setBrief('');
      setDimensions('1080 x 1080 px (Feed 1:1)');
      setCustomDimension('');
      setSelectedStyle('Modern & Minimalis');
      setColorPreference('');
      setTextToInclude('');
      setDeadline('Standar (2 - 4 Hari)');
      setAdditionalNotes('');
      setExtraRevision(false);
      setSourceFile(false);
      setExpressDelivery(false);
      setOrderType('design-only');
      setPrintQuantity(1);
      setShippingAddress('');
      setProductionNotes('');
      setFiles([]);
      setConfirmedInfo(false);

    } catch (err: unknown) {
      console.error('Order submission failed:', err);
      const errMsg = err instanceof Error ? err.message : 'Terjadi kendala saat mengirim pesanan.';
      setSubmitError(`${errMsg} Data Anda tetap tersimpan. Silakan coba lagi.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyBriefSummary = () => {
    if (!successOrder) return;
    const summaryText = `*PESANAN PSA DIGITAL CREATIVE*\nOrder ID: ${successOrder.id}\nLayanan: ${successOrder.serviceName}\nStatus: Pesanan Masuk\nEstimasi Total: ${formatRupiah(successOrder.estimatedTotal || 0)}`;
    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <section id="brief-order" className="py-20 bg-slate-50/50 border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>Digital Order &amp; Brief Form</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Formulir Pemesanan Desain
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Lengkapi detail kebutuhan desain Anda. Data dan berkas tersimpan rapi, transparan, dan langsung terhubung ke WhatsApp CS kami (0857-7573-5769).
          </p>
        </div>

        {/* 2-Column Responsive Layout: Left Form, Right Live Price Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Comprehensive Order Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-10">
              
              {/* STEP 1: INFORMASI PELANGGAN */}
              <div>
                <div className="flex items-center gap-2.5 text-sm font-extrabold text-slate-900 mb-5">
                  <span className="w-6 h-6 rounded-full bg-[#3B66FF] text-white text-xs flex items-center justify-center font-mono">
                    1
                  </span>
                  <span>Informasi Kontak Pelanggan</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5" htmlFor="input-order-name">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="input-order-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Contoh: Budi Santoso"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B66FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5" htmlFor="input-order-whatsapp">
                      Nomor WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="input-order-whatsapp"
                      type="tel"
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="Contoh: 081234567890 atau 085775735769"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B66FF]"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Pastikan nomor WhatsApp aktif untuk konfirmasi &amp; kirim draft desain.
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email (Opsional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B66FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Nama Usaha / Organisasi (Opsional)
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Contoh: Kopi Nusantara / BEM FT"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B66FF]"
                    />
                  </div>
                </div>
              </div>

              {/* STEP 2: PEMILIHAN LAYANAN & BRIEF */}
              <div className="pt-8 border-t border-slate-200">
                <div className="flex items-center gap-2.5 text-sm font-extrabold text-slate-900 mb-5">
                  <span className="w-6 h-6 rounded-full bg-[#3B66FF] text-white text-xs flex items-center justify-center font-mono">
                    2
                  </span>
                  <span>Pilihan Layanan &amp; Brief Desain</span>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Pilih Layanan Desain <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B66FF]"
                  >
                    {APP_CONFIG.services.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {srv.name} — {formatRupiah(srv.basePrice)} ({srv.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Tujuan Desain (Purpose)
                    </label>
                    <input
                      type="text"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      placeholder="Contoh: Promosi launching produk, event seminar"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B66FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Ukuran Desain
                    </label>
                    <select
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B66FF]"
                    >
                      <option value="1080 x 1080 px (Feed 1:1)">1080 x 1080 px (Instagram Feed 1:1)</option>
                      <option value="1080 x 1920 px (Story 9:16)">1080 x 1920 px (Story / Reels 9:16)</option>
                      <option value="A4 (21 x 29.7 cm)">A4 (Poster / Brosur 21 x 29.7 cm)</option>
                      <option value="A3 (29.7 x 42 cm)">A3 (Poster Seminar 29.7 x 42 cm)</option>
                      <option value="Spanduk 3 x 1 Meter">Spanduk Outdoor 3 x 1 Meter</option>
                      <option value="Kartu Nama (9 x 5.5 cm)">Kartu Nama Standar (9 x 5.5 cm)</option>
                      <option value="Ukuran Kustom">Ukuran Kustom (Tentukan Sendiri)</option>
                    </select>

                    {dimensions === 'Ukuran Kustom' && (
                      <input
                        type="text"
                        value={customDimension}
                        onChange={(e) => setCustomDimension(e.target.value)}
                        placeholder="Ketik ukuran khusus (misal: 250 x 120 cm)"
                        className="mt-2 w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#3B66FF]"
                      />
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5" htmlFor="input-order-brief">
                    Deskripsi Kebutuhan &amp; Brief <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="input-order-brief"
                    rows={3}
                    required
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder="Jelaskan konsep yang diinginkan, tema, audiens sasaran, dan suasana visual..."
                    className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B66FF]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Gaya Visual (Style)
                    </label>
                    <select
                      value={selectedStyle}
                      onChange={(e) => setSelectedStyle(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B66FF]"
                    >
                      <option value="Modern & Minimalis">Modern &amp; Minimalis</option>
                      <option value="Bold & Eye-Catching">Bold &amp; Eye-Catching</option>
                      <option value="Elegan & Luxury">Elegan &amp; Luxury</option>
                      <option value="Playful & Colorful">Playful &amp; Colorful</option>
                      <option value="Clean Tech / Corporate">Clean Tech / Corporate</option>
                      <option value="Vintage / Retro">Vintage / Retro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Preferensi Warna
                    </label>
                    <input
                      type="text"
                      value={colorPreference}
                      onChange={(e) => setColorPreference(e.target.value)}
                      placeholder="Contoh: Biru PSA, putih, aksen emas soft"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B66FF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Teks Wajib Dimasukkan
                    </label>
                    <input
                      type="text"
                      value={textToInclude}
                      onChange={(e) => setTextToInclude(e.target.value)}
                      placeholder="Contoh: Judul acara, tanggal, nomor WhatsApp kontak"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B66FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Ekspektasi Tenggat Waktu (Deadline)
                    </label>
                    <select
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B66FF]"
                    >
                      <option value="Standar (2 - 4 Hari)">Standar (2 - 4 Hari Kerja)</option>
                      <option value="Fleksibel (Lebih dari 4 Hari)">Fleksibel (Lebih dari 4 Hari)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* STEP 3: UPLOAD FILE (Max 5, 10MB per file) */}
              <div className="pt-8 border-t border-slate-200">
                <div className="flex items-center gap-2.5 text-sm font-extrabold text-slate-900 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#3B66FF] text-white text-xs flex items-center justify-center font-mono">
                    3
                  </span>
                  <span>Upload Bahan (Logo, Foto, Referensi, Dokumen)</span>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Format didukung: PNG, JPG, JPEG, WEBP, PDF (Maks. 5 file, maks. 10 MB per file).
                </p>

                <div className="relative border-2 border-dashed border-slate-300 hover:border-[#3B66FF] bg-slate-50 hover:bg-blue-50/20 rounded-2xl p-6 sm:p-8 text-center transition-colors">
                  <input
                    type="file"
                    multiple
                    accept=".png,.jpg,.jpeg,.webp,.pdf,image/png,image/jpeg,image/webp,application/pdf"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <UploadCloud className="w-10 h-10 text-[#3B66FF] mx-auto mb-2" />
                  <div className="text-sm font-bold text-slate-800">
                    Pilih atau Seret Berkas ke Sini
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Upload logo, foto produk resolusi tinggi, atau dokumen panduan.
                  </div>
                </div>

                {uploadError && (
                  <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                {/* Uploaded File List */}
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Berkas Terlampir ({files.length} / 5):
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {files.map((file) => (
                        <div
                          key={file.id}
                          className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {file.dataUrl ? (
                              <img
                                src={file.dataUrl}
                                alt={file.name}
                                className="w-9 h-9 rounded-lg object-cover shrink-0 border border-slate-200"
                              />
                            ) : (
                              <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px] shrink-0">
                                PDF
                              </div>
                            )}
                            <div className="truncate">
                              <div className="font-bold text-slate-800 truncate">{file.name}</div>
                              <div className="text-[10px] text-slate-400">{file.size}</div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(file.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 cursor-pointer"
                            title="Hapus berkas"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* STEP 4: OPSIONAL CETAK FISIK (DESIGN ONLY vs DESIGN + PRINT) */}
              <div className="pt-8 border-t border-slate-200">
                <div className="flex items-center gap-2.5 text-sm font-extrabold text-slate-900 mb-4">
                  <span className="w-6 h-6 rounded-full bg-[#3B66FF] text-white text-xs flex items-center justify-center font-mono">
                    4
                  </span>
                  <span>Kebutuhan Cetak Fisik</span>
                </div>

                <div className="text-xs font-semibold text-slate-700 mb-3">
                  Apakah desain ini ingin dilanjutkan ke proses percetakan fisik?
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  <button
                    type="button"
                    onClick={() => setOrderType('design-only')}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      orderType === 'design-only'
                        ? 'border-[#3B66FF] bg-blue-50/40 ring-2 ring-[#3B66FF]'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-900 mb-1 flex items-center justify-between">
                      <span>Tidak, Hanya Butuh Desain</span>
                      {orderType === 'design-only' && <Check className="w-4 h-4 text-[#3B66FF]" />}
                    </div>
                    <p className="text-xs text-slate-500">
                      Mendapatkan master file digital (Print-Ready PDF, PNG resolusi tinggi). Tanpa biaya percetakan.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('design-print')}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      orderType === 'design-print'
                        ? 'border-[#3B66FF] bg-blue-50/40 ring-2 ring-[#3B66FF]'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-900 mb-1 flex items-center justify-between">
                      <span>Ya, Lanjut ke Cetak Fisik</span>
                      {orderType === 'design-print' && <Check className="w-4 h-4 text-[#3B66FF]" />}
                    </div>
                    <p className="text-xs text-slate-500">
                      Desain disetujui &rarr; langsung diproduksi cetak (banner, stiker, kartu nama, dsb).
                    </p>
                  </button>
                </div>

                {/* Conditional Fields if DESIGN + PRINT */}
                {orderType === 'design-print' && (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Pilih Produk Cetak
                        </label>
                        <select
                          value={printProductId}
                          onChange={(e) => setPrintProductId(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none"
                        >
                          {APP_CONFIG.printProducts.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name} — {p.unitLabel}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Jumlah / Kuantitas (Qty)
                        </label>
                        <input
                          type="number"
                          min={1}
                          value={printQuantity}
                          onChange={(e) => setPrintQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Selected Print Product Visual Preview */}
                    {currentPrintProduct && (
                      <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                        <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-900 shrink-0">
                          <img
                            src={currentPrintProduct.image || currentPrintProduct.fallbackImage}
                            alt={currentPrintProduct.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0 text-xs">
                          <div className="font-bold text-slate-900 truncate">{currentPrintProduct.name}</div>
                          <div className="text-[11px] text-blue-600 font-mono font-bold">{currentPrintProduct.unitLabel}</div>
                          <div className="text-[10px] text-slate-500 truncate">{currentPrintProduct.material}</div>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Ukuran Cetak
                        </label>
                        <input
                          type="text"
                          value={printSize}
                          onChange={(e) => setPrintSize(e.target.value)}
                          placeholder="Contoh: 3 x 1 m / 1 box / A3+"
                          className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Preferensi Bahan / Finishing
                        </label>
                        <input
                          type="text"
                          value={printMaterial}
                          onChange={(e) => setPrintMaterial(e.target.value)}
                          placeholder="Contoh: Flexi Korea 440g / Laminasi Doff"
                          className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Alamat Pengiriman Produk Fisik <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={2}
                        required={orderType === 'design-print'}
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="Tuliskan nama penerima, nomor HP aktif, dan alamat lengkap pengiriman..."
                        className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* STEP 5: ADD-ONS & CONFIRMATION */}
              <div className="pt-8 border-t border-slate-200">
                <div className="flex items-center gap-2.5 text-sm font-extrabold text-slate-900 mb-4">
                  <span className="w-6 h-6 rounded-full bg-[#3B66FF] text-white text-xs flex items-center justify-center font-mono">
                    5
                  </span>
                  <span>Opsi Add-on &amp; Catatan Khusus</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <label className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-2.5 cursor-pointer hover:bg-slate-100">
                    <input
                      type="checkbox"
                      checked={extraRevision}
                      onChange={(e) => setExtraRevision(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-[#3B66FF] rounded border-slate-300"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-slate-900">+ Revisi Tambahan</div>
                      <div className="text-slate-500">+Rp25.000 / revisi</div>
                    </div>
                  </label>

                  <label className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-2.5 cursor-pointer hover:bg-slate-100">
                    <input
                      type="checkbox"
                      checked={sourceFile}
                      onChange={(e) => setSourceFile(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-[#3B66FF] rounded border-slate-300"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-slate-900">+ Master/Edit File</div>
                      <div className="text-slate-500">+Rp50.000 (AI/PSD/SVG)</div>
                    </div>
                  </label>

                  <label className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-2.5 cursor-pointer hover:bg-slate-100">
                    <input
                      type="checkbox"
                      checked={expressDelivery}
                      onChange={(e) => setExpressDelivery(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-[#3B66FF] rounded border-slate-300"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-slate-900">Express Priority</div>
                      <div className="text-slate-500">+30% Total Biaya</div>
                    </div>
                  </label>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Catatan Tambahan untuk Desainer
                  </label>
                  <textarea
                    rows={2}
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Instruksi khusus lainnya..."
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Confirmation Checkbox Before Submit */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 mb-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={confirmedInfo}
                      onChange={(e) => setConfirmedInfo(e.target.checked)}
                      className="mt-1 w-4 h-4 text-[#3B66FF] rounded border-slate-300 focus:ring-[#3B66FF]"
                    />
                    <span className="text-xs text-slate-700 font-medium">
                      Saya memastikan informasi yang saya berikan sudah benar dan dapat dihubungi melalui WhatsApp untuk konfirmasi pesanan.
                    </span>
                  </label>
                </div>

                {submitError && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !confirmedInfo}
                  className="w-full py-4 px-6 rounded-2xl bg-[#3B66FF] hover:bg-[#2851E3] active:scale-[0.99] disabled:opacity-50 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Mengirim Pesanan...</span>
                  ) : (
                    <>
                      <span>Kirim Pesanan ({formatRupiah(estimatedGrandTotal)})</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Live Price Calculator & Order Summary (Sticky) */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Estimasi Pesanan
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#3B66FF]">
                  Live Calculator
                </span>
              </div>

              {/* Service & Breakdown */}
              <div className="py-4 space-y-3 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{currentService.name}</span>
                  <span className="font-mono font-bold text-slate-900">{formatRupiah(baseDesignPrice)}</span>
                </div>

                {orderType === 'design-print' && (
                  <div className="flex items-center justify-between text-blue-700 bg-blue-50/60 p-2 rounded-lg">
                    <span>
                      Cetak: {currentPrintProduct.name} ({printQuantity}x)
                    </span>
                    <span className="font-mono font-bold">{formatRupiah(printTotal)}</span>
                  </div>
                )}

                {extraRevision && (
                  <div className="flex items-center justify-between">
                    <span>+ Extra Revisi</span>
                    <span className="font-mono font-semibold">{formatRupiah(APP_CONFIG.pricing.addons.extraRevision)}</span>
                  </div>
                )}

                {sourceFile && (
                  <div className="flex items-center justify-between">
                    <span>+ Master/Source File</span>
                    <span className="font-mono font-semibold">{formatRupiah(APP_CONFIG.pricing.addons.sourceFile)}</span>
                  </div>
                )}

                {expressDelivery && (
                  <div className="flex items-center justify-between text-amber-700">
                    <span>+ Express Priority (+30%)</span>
                    <span className="font-mono font-semibold">{formatRupiah(expressFee)}</span>
                  </div>
                )}
              </div>

              {/* Total Summary */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
                    Estimasi Total
                  </span>
                  <span className="text-2xl font-black text-[#3B66FF] font-mono">
                    {formatRupiah(estimatedGrandTotal)}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight italic mt-2">
                  {APP_CONFIG.pricing.disclaimer}
                </p>
              </div>

              {/* WhatsApp direct notification badge */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50/60 p-3 rounded-xl border border-emerald-200/60">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>
                  Otomatis terhubung ke CS WhatsApp (085775735769).
                </span>
              </div>
            </div>

            {/* Guarantees Box */}
            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3B66FF]" />
                <span>Alur Pemesanan Aman &amp; Terstruktur</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                Setelah mengirim pesanan, Anda akan menerima Order ID resmi untuk melacak progres pengerjaan hingga penyerahan file final.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* SUCCESS MODAL */}
      {successOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="text-center mb-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
                Pesanan Berhasil Dikirim!
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Brief Anda Telah Terdaftar
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Simpan Order ID ini untuk memantau perkembangan pesanan Anda.
              </p>
            </div>

            {/* Order Summary Badge */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 mb-6 text-xs text-slate-700">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-semibold text-slate-500">Nomor Order ID:</span>
                <span className="font-mono font-black text-sm text-[#3B66FF]">
                  {successOrder.id}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Layanan:</span>
                <span className="font-bold text-slate-900">{successOrder.serviceName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Tipe Pesanan:</span>
                <span className="font-bold text-slate-900">{successOrder.orderType || 'Design Only'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Estimasi Total:</span>
                <span className="font-bold text-emerald-600 font-mono">
                  {formatRupiah(successOrder.estimatedTotal || 0)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <a
                href={generatedWhatsAppUrl || `https://wa.me/6285775735769`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-600/30 transition-all text-center"
              >
                <ExternalLink className="w-5 h-5 text-emerald-100 shrink-0" />
                <span>KIRIM PESANAN KE WHATSAPP (0857-7573-5769)</span>
              </a>
              <p className="text-[11px] text-center text-slate-500">
                Klik tombol hijau di atas untuk langsung mengirim rincian brief ke WhatsApp Admin CS agar segera diproses.
              </p>

              <button
                type="button"
                onClick={() => {
                  const id = successOrder.id;
                  setSuccessOrder(null);
                  if (onTrackOrderDirectly) {
                    onTrackOrderDirectly(id);
                  } else {
                    const target = document.querySelector('#tracking');
                    target?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#3B66FF] hover:bg-[#2851E3] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Lacak Pesanan Ini di Web ({successOrder.id})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={copyBriefSummary}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedSummary ? 'Ringkasan Tersalin!' : 'Salin Order ID & Rincian'}</span>
              </button>

              <button
                type="button"
                onClick={() => setSuccessOrder(null)}
                className="w-full text-center text-xs text-slate-400 hover:text-slate-600 pt-1 cursor-pointer"
              >
                Selesai / Tutup Jendela
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
