import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  UserCheck,
  FileCheck,
  MessageSquare,
  AlertCircle,
  Eye,
  Download,
  Send,
  X,
  Sparkles,
  FolderOpen,
  FileText,
  Check,
  ExternalLink,
  ShieldCheck,
  Sliders,
  Upload,
  User,
  Phone,
  Printer,
} from 'lucide-react';
import { APP_CONFIG, OrderItem, ClientFileItem, formatRupiah } from '../lib/appConfig';
import ImageWithFallback from './ImageWithFallback';

interface OrderTrackingProps {
  initialOrderId?: string;
  customOrders?: OrderItem[];
  onOpenOrderModal?: () => void;
  onUpdateOrder?: (updatedOrder: OrderItem) => void;
}

export default function OrderTracking({
  initialOrderId = 'PSA-20261004-A8K2',
  customOrders = [],
  onUpdateOrder,
}: OrderTrackingProps) {
  const [searchInput, setSearchInput] = useState(initialOrderId);
  const [selectedOrderId, setSelectedOrderId] = useState<string>(initialOrderId);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Role View: 'customer' or 'owner' (Putra Syahrul Amin)
  const [viewRole, setViewRole] = useState<'customer' | 'owner'>('owner');

  // Interactive revision modal
  const [revisionModalOpen, setRevisionModalOpen] = useState(false);
  const [revisionNotes, setRevisionNotes] = useState('');
  const [revisionSuccessMessage, setRevisionSuccessMessage] = useState<string | null>(null);

  // Complete Order Modal
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [finalDownloadLink, setFinalDownloadLink] = useState('https://drive.google.com/psa-master-files');
  const [completionNotes, setCompletionNotes] = useState('Paket file master final lengkap (AI, PDF Print-Ready, PNG High-Res) telah diserahkan.');

  // Update Draft Modal (For Owner)
  const [updateDraftModalOpen, setUpdateDraftModalOpen] = useState(false);
  const [newDraftUrl, setNewDraftUrl] = useState('');
  const [newDraftNotes, setNewDraftNotes] = useState('');

  // Interactive Preview Modal
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  // Client File Lightbox Viewer (For viewing customer uploaded files)
  const [viewingClientFile, setViewingClientFile] = useState<ClientFileItem | null>(null);

  // Invoice Modal
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);

  // Combine demo orders and session orders
  const allOrders: OrderItem[] = [...(APP_CONFIG.demoOrders as OrderItem[]), ...customOrders];

  // Modified order override for approvals/revisions/completions performed in session
  const [modifiedOrder, setModifiedOrder] = useState<OrderItem | null>(null);

  const matchedOrder =
    (modifiedOrder && modifiedOrder.id.toUpperCase() === selectedOrderId.toUpperCase())
      ? modifiedOrder
      : allOrders.find((ord) => ord.id.toUpperCase() === selectedOrderId.toUpperCase()) || allOrders[0];

  const handleSearch = (orderIdToFind: string) => {
    const trimmed = orderIdToFind.trim().toUpperCase();
    if (!trimmed) {
      setSearchError('Silakan masukkan nomor Order ID.');
      return;
    }
    const found = allOrders.find((ord) => ord.id.toUpperCase() === trimmed);
    if (found) {
      setSelectedOrderId(found.id);
      setSearchError(null);
    } else {
      setSearchError(`Pesanan dengan ID "${trimmed}" tidak ditemukan. Coba gunakan contoh demo "PSA-20261004-A8K2" atau "PSA-20261001-B3P9".`);
    }
  };

  const stagesList = [
    { title: 'Pesanan Masuk', stage: 1, key: 'Pesanan Masuk' },
    { title: 'Diproses', stage: 2, key: 'Diproses' },
    { title: 'Desain Dibuat', stage: 3, key: 'Desain Dibuat' },
    { title: 'Revisi', stage: 4, key: 'Revisi' },
    { title: 'Disetujui', stage: 5, key: 'Disetujui' },
    { title: 'Selesai', stage: 6, key: 'Selesai' },
  ];

  // Helper to commit order updates
  const commitOrderUpdate = (updated: OrderItem) => {
    setModifiedOrder(updated);
    if (onUpdateOrder) {
      onUpdateOrder(updated);
    }
  };

  // 1. Action: Approve Design (Transitions to Stage 5: Disetujui)
  const handleApproveDesign = () => {
    if (!matchedOrder) return;
    const nowStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    const updated: OrderItem = {
      ...matchedOrder,
      status: 'Disetujui',
      statusStage: 5,
      notes: 'Desain telah disetujui oleh klien! File final sedang dipersiapkan dan diarsipkan untuk penyerahan.',
      timeline: [
        ...matchedOrder.timeline,
        {
          title: 'Disetujui oleh Klien',
          time: `Hari ini, ${nowStr}`,
          done: true,
          desc: 'Klien menyetujui konsep & draft visual terkini.',
        },
      ],
    };
    commitOrderUpdate(updated);
  };

  // 2. Action: Complete Order (Transitions to Stage 6: Selesai)
  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchedOrder) return;
    const nowStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    const updated: OrderItem = {
      ...matchedOrder,
      status: 'Selesai',
      statusStage: 6,
      notes: completionNotes || 'Seluruh paket file final (Master AI/SVG, PDF Print-Ready CMYK, dan PNG High-Res) telah diserahkan & selesai.',
      finalPackage: {
        masterVectorUrl: matchedOrder.finalPackage?.masterVectorUrl || matchedOrder.previewImageUrl || '/assets/showcase/showcase-logo.svg',
        printReadyPdfUrl: matchedOrder.finalPackage?.printReadyPdfUrl || '/assets/showcase/showcase-poster.svg',
        highResPngUrl: matchedOrder.previewImageUrl || 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
        downloadAllUrl: finalDownloadLink || '#',
        invoiceNumber: matchedOrder.finalPackage?.invoiceNumber || `INV-${matchedOrder.id}`,
      },
      timeline: [
        ...matchedOrder.timeline,
        {
          title: 'Selesai & File Final Diserahkan',
          time: `Hari ini, ${nowStr}`,
          done: true,
          desc: 'Penyerahan seluruh arsip master file digital selesai 100%.',
        },
      ],
    };
    commitOrderUpdate(updated);
    setCompleteModalOpen(false);
  };

  // 3. Action: Change Stage directly (For Owner / Designer)
  const handleOwnerSetStage = (targetStage: number, stageName: OrderItem['status']) => {
    if (!matchedOrder) return;
    const nowStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    const updated: OrderItem = {
      ...matchedOrder,
      status: stageName,
      statusStage: targetStage,
      notes: `Status pesanan diubah oleh Desainer (${APP_CONFIG.ownerName}) ke tahap: ${stageName}.`,
      timeline: [
        ...matchedOrder.timeline,
        {
          title: `Status: ${stageName}`,
          time: `Hari ini, ${nowStr}`,
          done: true,
          desc: `Tahap pengerjaan disesuaikan ke ${stageName} oleh tim kreatif.`,
        },
      ],
    };
    commitOrderUpdate(updated);
  };

  // 4. Action: Update Draft Preview Image
  const handleUpdateDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchedOrder || !newDraftUrl.trim()) return;
    const nowStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    const updated: OrderItem = {
      ...matchedOrder,
      previewImageUrl: newDraftUrl.trim(),
      previewAvailable: true,
      status: 'Desain Dibuat',
      statusStage: 3,
      notes: newDraftNotes.trim() || 'Draft desain baru telah diunggah oleh desainer untuk ditinjau klien.',
      timeline: [
        ...matchedOrder.timeline,
        {
          title: 'Draft Desain Baru Diunggah',
          time: `Hari ini, ${nowStr}`,
          done: true,
          desc: newDraftNotes.trim() || 'Desainer memperbarui visual draft mockup.',
        },
      ],
    };
    commitOrderUpdate(updated);
    setUpdateDraftModalOpen(false);
    setNewDraftUrl('');
    setNewDraftNotes('');
  };

  // 5. Action: Send Revision
  const handleSendRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionNotes.trim() || !matchedOrder) return;
    const newRevisionCount = (matchedOrder.revisionsUsed || 0) + 1;
    const updated: OrderItem = {
      ...matchedOrder,
      status: 'Revisi',
      statusStage: 4,
      revisionsUsed: newRevisionCount,
      notes: `Revisi #${newRevisionCount} diajukan klien: "${revisionNotes.slice(0, 80)}..."`,
      timeline: [
        ...matchedOrder.timeline,
        {
          title: `Revisi #${newRevisionCount} Diajukan`,
          time: 'Baru saja',
          done: true,
          desc: revisionNotes,
        },
      ],
    };
    commitOrderUpdate(updated);
    setRevisionSuccessMessage(`Catatan revisi #${newRevisionCount} berhasil dikirim ke desainer.`);
    setRevisionNotes('');
    setTimeout(() => {
      setRevisionModalOpen(false);
      setRevisionSuccessMessage(null);
    }, 1800);
  };

  // Direct WhatsApp to customer if needed
  const notifyCustomerWhatsAppUrl = matchedOrder?.clientPhone
    ? `https://wa.me/62${matchedOrder.clientPhone.replace(/^0/, '')}?text=${encodeURIComponent(
        `Halo Kak ${matchedOrder.clientName}, kami dari ${APP_CONFIG.brandName} menginfokan bahwa pesanan desain Anda (${matchedOrder.id} - ${matchedOrder.serviceName}) saat ini berstatus: *${matchedOrder.status}*. Silakan cek preview & perkembangan di website kami. Terima kasih!`
      )}`
    : `https://wa.me/6285775735769?text=${encodeURIComponent(`Update Pesanan ${matchedOrder?.id}: Status ${matchedOrder?.status}`)}`;

  return (
    <section id="tracking" className="py-20 bg-slate-50 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Search className="w-3.5 h-3.5" />
            <span>Digital Order Tracking &amp; Management</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pantau &amp; Kelola Pesanan
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Lacak progres pengerjaan desain, periksa berkas unggahan dari klien, tinjau preview draft, dan selesaikan pesanan hingga serah-terima file master final.
          </p>

          {/* Role Switcher */}
          <div className="mt-6 inline-flex items-center p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <button
              type="button"
              onClick={() => setViewRole('customer')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewRole === 'customer'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Mode Pelanggan</span>
            </button>
            <button
              type="button"
              onClick={() => setViewRole('owner')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewRole === 'owner'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-blue-400" />
              <span>Mode Pemilik / Desainer (Putra S.)</span>
            </button>
          </div>
        </div>

        {/* Search Bar Container */}
        <div className="max-w-2xl mx-auto mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(searchInput);
            }}
            className="flex flex-col sm:flex-row items-center gap-3 bg-white p-2.5 rounded-2xl border border-slate-300 shadow-sm"
          >
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Masukkan Nomor Order ID (cth: PSA-20261004-A8K2)"
                className="w-full pl-11 pr-4 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none rounded-xl"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              Lacak Pesanan
            </button>
          </form>

          {/* Quick Demo Pickers */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span className="font-medium">Pilih Contoh Demo:</span>
            <button
              type="button"
              onClick={() => {
                setSearchInput('PSA-20261004-A8K2');
                handleSearch('PSA-20261004-A8K2');
              }}
              className="px-2.5 py-1 rounded-md bg-white border border-slate-200 font-mono font-semibold text-blue-600 hover:border-blue-400 transition-colors cursor-pointer"
            >
              PSA-20261004-A8K2 (Desain Dibuat)
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchInput('PSA-20261001-B3P9');
                handleSearch('PSA-20261001-B3P9');
              }}
              className="px-2.5 py-1 rounded-md bg-white border border-slate-200 font-mono font-semibold text-emerald-600 hover:border-emerald-400 transition-colors cursor-pointer"
            >
              PSA-20261001-B3P9 (Selesai 100%)
            </button>
          </div>

          {searchError && (
            <div className="mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              <span>{searchError}</span>
            </div>
          )}
        </div>

        {/* Order Details Dashboard Card */}
        {matchedOrder && (
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden transition-all duration-300">
            
            {/* Owner Control Bar Notification when viewRole === 'owner' */}
            {viewRole === 'owner' && (
              <div className="bg-slate-950 px-6 py-3 border-b border-slate-800 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-blue-300">Akses Desainer &amp; Admin: {APP_CONFIG.ownerName}</span>
                  <span className="text-slate-400">— Anda dapat mengubah status pesanan ke tahap manapun &amp; menyelesaikan orderan.</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-slate-400 font-semibold mr-1">Ubah Status Cepat:</span>
                  {stagesList.map((stg) => (
                    <button
                      key={stg.stage}
                      type="button"
                      onClick={() => handleOwnerSetStage(stg.stage, stg.key as OrderItem['status'])}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                        matchedOrder.statusStage === stg.stage
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      {stg.stage}. {stg.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Order Top Bar Header */}
            <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-lg sm:text-xl font-mono font-black tracking-wide text-blue-400">
                    {matchedOrder.id}
                  </span>
                  {matchedOrder.isDemo && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-400 text-slate-950 shadow-xs">
                      Demo Order
                    </span>
                  )}
                  <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-200 border border-blue-400/30">
                    Status: {matchedOrder.status} ({matchedOrder.statusStage}/6)
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mt-2 text-white">
                  {matchedOrder.serviceName}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Klien: <span className="font-semibold text-white">{matchedOrder.clientName}</span> | Dibuat:{' '}
                  <span className="font-semibold text-white">{matchedOrder.dateCreated}</span>
                  {matchedOrder.clientPhone && (
                    <span className="ml-2 text-emerald-300 font-mono">
                      (WA: {matchedOrder.clientPhone})
                    </span>
                  )}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row md:items-end gap-2 text-left md:text-right">
                <div className="text-xs text-slate-400">Estimasi Selesai:</div>
                <div className="text-sm font-bold text-blue-300 flex items-center md:justify-end gap-1.5 font-mono">
                  <Clock className="w-4 h-4" />
                  <span>{matchedOrder.estimatedDelivery}</span>
                </div>
                {matchedOrder.estimatedTotal && (
                  <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">
                    Total: {formatRupiah(matchedOrder.estimatedTotal)}
                  </div>
                )}
              </div>
            </div>

            {/* Stages Tracker Stepper */}
            <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Tahapan Pengerjaan Pesanan
                </div>
                <div className="text-xs font-semibold text-blue-600">
                  {matchedOrder.statusStage === 6 ? '✓ 100% Selesai' : `Progres: ${Math.round((matchedOrder.statusStage / 6) * 100)}%`}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {stagesList.map((stg) => {
                  const isCompleted = matchedOrder.statusStage >= stg.stage;
                  const isCurrent = matchedOrder.statusStage === stg.stage;
                  return (
                    <div
                      key={stg.stage}
                      onClick={() => {
                        if (viewRole === 'owner') {
                          handleOwnerSetStage(stg.stage, stg.key as OrderItem['status']);
                        }
                      }}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        viewRole === 'owner' ? 'cursor-pointer hover:border-blue-400' : ''
                      } ${
                        isCurrent
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                          : isCompleted
                          ? 'bg-blue-50/80 border-blue-200 text-slate-800'
                          : 'bg-white border-slate-200/80 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono font-bold opacity-80">
                          0{stg.stage}
                        </span>
                        {isCompleted && !isCurrent ? (
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        ) : isCurrent ? (
                          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                        ) : null}
                      </div>
                      <div className="text-xs font-bold leading-tight">{stg.title}</div>
                      {viewRole === 'owner' && (
                        <span className="text-[9px] text-slate-400 block mt-1">Klik ubah</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Main Content: 2-Column Info & Preview Panel */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Brief, Client Files, and Timeline */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. SECTION: BERKAS DESAIN DARI KLIEN (CUSTOMER UPLOADED FILES) */}
                <div className="p-5 sm:p-6 rounded-3xl bg-blue-50/40 border border-blue-200/80">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-900">
                      <FolderOpen className="w-4 h-4 text-blue-600" />
                      <span>Berkas Desain yang Dikirim Klien ({matchedOrder.clientFiles?.length || 0} Berkas)</span>
                    </div>
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                      Materi Klien
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mb-4">
                    Berikut adalah berkas logo, foto referensi, atau dokumen panduan yang dikirimkan pemesan melalui formulir order:
                  </p>

                  {matchedOrder.clientFiles && matchedOrder.clientFiles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {matchedOrder.clientFiles.map((file, idx) => {
                        const isImage = file.type?.startsWith('image/') || file.dataUrl || file.name.match(/\.(jpg|jpeg|png|webp|svg)$/i);
                        return (
                          <div
                            key={idx}
                            className="bg-white p-3 rounded-2xl border border-slate-200 hover:border-blue-400 transition-all shadow-xs flex flex-col justify-between"
                          >
                            <div className="flex items-start gap-3">
                              {/* Thumbnail preview */}
                              {isImage && (file.dataUrl || file.previewUrl) ? (
                                <div
                                  onClick={() => setViewingClientFile(file)}
                                  className="w-14 h-14 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shrink-0 cursor-pointer relative group"
                                >
                                  <img
                                    src={file.dataUrl || file.previewUrl}
                                    alt={file.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                  />
                                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                                    <Eye className="w-4 h-4" />
                                  </div>
                                </div>
                              ) : (
                                <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-700 flex flex-col items-center justify-center font-bold text-[11px] shrink-0">
                                  <FileText className="w-6 h-6 mb-0.5 text-blue-600" />
                                  <span>PDF</span>
                                </div>
                              )}

                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-bold text-slate-900 truncate" title={file.name}>
                                  {file.name}
                                </div>
                                <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                                  {file.size} &bull; {file.type.split('/')[1]?.toUpperCase() || 'FILE'}
                                </div>
                                <span className="inline-block mt-1 px-1.5 py-0.5 text-[9px] font-bold bg-slate-100 text-slate-600 rounded">
                                  Materi Klien
                                </span>
                              </div>
                            </div>

                            {/* Action Buttons for this file */}
                            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-2">
                              {isImage && (file.dataUrl || file.previewUrl) && (
                                <button
                                  type="button"
                                  onClick={() => setViewingClientFile(file)}
                                  className="flex-1 py-1.5 px-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[11px] rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>Lihat Desain</span>
                                </button>
                              )}
                              <a
                                href={file.dataUrl || file.previewUrl || '#'}
                                download={file.name}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] rounded-lg transition-colors flex items-center justify-center gap-1"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>Unduh</span>
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-white border border-dashed border-slate-300 text-center text-xs text-slate-500">
                      Klien tidak melampirkan berkas pada formulir digital ini. Berkas/materi tambahan dapat dikirimkan langsung melalui chat WhatsApp.
                    </div>
                  )}
                </div>

                {/* Desain & Tim Info Box */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                      <UserCheck className="w-4 h-4 text-blue-600" />
                      <span>Desainer &amp; Catatan Produksi</span>
                    </div>
                    {viewRole === 'owner' && (
                      <button
                        type="button"
                        onClick={() => setUpdateDraftModalOpen(true)}
                        className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Update Draft/Catatan</span>
                      </button>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-slate-800">
                    Desainer Bertugas:{' '}
                    <span className="text-blue-600 font-bold">{matchedOrder.designerAssigned}</span>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-700">Update Terakhir: </span>
                    {matchedOrder.notes}
                  </p>
                </div>

                {/* Brief Summary Box */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                    <span>Ringkasan Brief Pemesanan</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {matchedOrder.briefSummary}
                  </p>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <div>
                      Tipe:{' '}
                      <span className="font-bold text-slate-800">
                        {matchedOrder.orderType || 'Design Only'}
                      </span>
                    </div>
                    <div>
                      Revisi Digunakan:{' '}
                      <span className="font-bold text-blue-600">
                        {matchedOrder.revisionsUsed} dari {matchedOrder.maxRevisions}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timeline History */}
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                    Riwayat Perjalanan Pesanan
                  </div>
                  <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                    {matchedOrder.timeline.map((entry, idx) => (
                      <div key={idx} className="relative flex items-start gap-4 pl-8">
                        <div
                          className={`absolute left-1.5 top-1 w-3.5 h-3.5 rounded-full border-2 bg-white ${
                            entry.done ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                          }`}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className={entry.done ? 'text-slate-900' : 'text-slate-400'}>
                              {entry.title}
                            </span>
                            <span className="text-slate-400 text-[11px] font-normal">
                              {entry.time}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">{entry.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Preview, Approval & COMPLETION Controls */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                
                {/* Visual Preview Box */}
                <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 text-white flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-blue-400">
                      Draft Preview Desain
                    </div>
                    {viewRole === 'owner' && (
                      <button
                        type="button"
                        onClick={() => setUpdateDraftModalOpen(true)}
                        className="text-[11px] font-bold text-blue-300 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Ganti Preview</span>
                      </button>
                    )}
                  </div>

                  {matchedOrder.previewImageUrl ? (
                    <div className="relative rounded-2xl overflow-hidden group cursor-pointer border border-slate-700 aspect-video bg-slate-950">
                      <ImageWithFallback
                        src={matchedOrder.previewImageUrl}
                        alt="Preview Desain PSA"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div
                        onClick={() => setPreviewModalOpen(true)}
                        className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Klik untuk Memperbesar</span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-12 px-4 rounded-2xl border border-dashed border-slate-700 text-center text-xs text-slate-400">
                      Preview draft visual sedang disiapkan oleh desainer kami.
                    </div>
                  )}

                  {/* Actions for the order */}
                  <div className="mt-5 pt-4 border-t border-slate-800 space-y-3">
                    
                    {/* STAGE < 5: Belum Disetujui */}
                    {matchedOrder.statusStage < 5 && (
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setRevisionModalOpen(true)}
                            className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                            <span>Ajukan Revisi</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleApproveDesign}
                            className="py-3 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Setujui Desain</span>
                          </button>
                        </div>
                        {viewRole === 'owner' && (
                          <button
                            type="button"
                            onClick={() => setCompleteModalOpen(true)}
                            className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-extrabold text-white transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                          >
                            <Check className="w-4 h-4" />
                            <span>Langsung Selesaikan Pesanan (Tahap 6)</span>
                          </button>
                        )}
                      </div>
                    )}

                    {/* STAGE 5: DISETUJUI -> NOW HAS THE COMPLETION BUTTON! */}
                    {matchedOrder.statusStage === 5 && (
                      <div className="space-y-3">
                        <div className="p-3.5 rounded-xl bg-blue-950/70 border border-blue-500/40 text-blue-200 text-xs text-center font-medium">
                          ✓ Desain telah disetujui! Anda sekarang dapat menyelesaikan pesanan dan menyerahkan paket master file final.
                        </div>

                        {/* KEY FIX: Button to complete the order to Stage 6 (Selesai) */}
                        <button
                          type="button"
                          onClick={() => setCompleteModalOpen(true)}
                          className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer animate-pulse"
                        >
                          <CheckCircle2 className="w-5 h-5 text-emerald-100" />
                          <span>SELESAIKAN PESANAN &amp; SERAHKAN FILE (100%)</span>
                        </button>
                      </div>
                    )}

                    {/* STAGE 6: SELESAI -> MASTER FILES ARE DELIVERED! */}
                    {matchedOrder.statusStage === 6 && (
                      <div className="space-y-3">
                        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-medium">
                          <div className="font-extrabold text-sm text-emerald-300 flex items-center gap-1.5 mb-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Pesanan Selesai 100%!</span>
                          </div>
                          Paket master file final telah diarsipkan dan siap diunduh oleh klien maupun percetakan.
                        </div>

                        {/* Download Final Files Package Grid */}
                        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-xs">
                          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            Paket Berkas Final:
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <a
                              href={matchedOrder.finalPackage?.masterVectorUrl || matchedOrder.previewImageUrl || '#'}
                              download="Master_Vector_PSA.svg"
                              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1.5 text-[11px]"
                            >
                              <Download className="w-3.5 h-3.5 text-blue-400" />
                              <span>Master AI/SVG</span>
                            </a>

                            <a
                              href={matchedOrder.finalPackage?.printReadyPdfUrl || matchedOrder.previewImageUrl || '#'}
                              download="Print_Ready_CMYK_PSA.pdf"
                              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1.5 text-[11px]"
                            >
                              <Download className="w-3.5 h-3.5 text-emerald-400" />
                              <span>PDF Siap Cetak</span>
                            </a>

                            <a
                              href={matchedOrder.finalPackage?.highResPngUrl || matchedOrder.previewImageUrl || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1.5 text-[11px]"
                            >
                              <Download className="w-3.5 h-3.5 text-purple-400" />
                              <span>PNG Transparan</span>
                            </a>

                            <button
                              type="button"
                              onClick={() => setInvoiceModalOpen(true)}
                              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-1.5 text-[11px] cursor-pointer"
                            >
                              <Printer className="w-3.5 h-3.5 text-amber-400" />
                              <span>Bukti Invoice</span>
                            </button>
                          </div>
                        </div>

                        {/* WhatsApp Notify Button */}
                        <a
                          href={notifyCustomerWhatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Kirim Notifikasi / Link File via WhatsApp</span>
                        </a>
                      </div>
                    )}

                  </div>
                </div>

                {/* Helpful Note with Direct CS WhatsApp */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Ada instruksi khusus untuk pesanan ini?</span> Hubungi Customer Service kami via WhatsApp.
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/6285775735769?text=${encodeURIComponent(`Halo CS PSA, saya ingin tanya update untuk Order ID ${matchedOrder.id}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] shrink-0"
                  >
                    <span>Chat CS 085775735769</span>
                  </a>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: SELESAIKAN PESANAN (STAGE 5 -> STAGE 6 COMPLETION MODAL) */}
      {completeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setCompleteModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Selesaikan Pesanan &amp; Terbitkan File Master
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Tindakan ini akan memindahkan status pesanan <strong>{matchedOrder?.id}</strong> ke tahap <strong>Selesai (100%)</strong> dan membuka akses paket unduhan master file.
            </p>

            <form onSubmit={handleCompleteOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Link Penyimpanan File Master (Google Drive / Cloud Folder)
                </label>
                <input
                  type="text"
                  required
                  value={finalDownloadLink}
                  onChange={(e) => setFinalDownloadLink(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Catatan Penyerahan untuk Klien
                </label>
                <textarea
                  rows={3}
                  value={completionNotes}
                  onChange={(e) => setCompletionNotes(e.target.value)}
                  className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Format file master (AI, PDF Print-Ready, PNG Transparan) akan aktif otomatis untuk diunduh.</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCompleteModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Konfirmasi Pesanan Selesai (100%)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: UPDATE DRAFT PREVIEW (FOR OWNER / DESIGNER) */}
      {updateDraftModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setUpdateDraftModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Upload / Update Draft Desain
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Masukkan URL gambar draft mockup visual atau pilih contoh desain untuk pesanan ini.
            </p>

            <form onSubmit={handleUpdateDraft} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  URL Gambar Draft Desain
                </label>
                <input
                  type="text"
                  required
                  value={newDraftUrl}
                  onChange={(e) => setNewDraftUrl(e.target.value)}
                  placeholder="https://... atau /assets/showcase/showcase-logo.svg"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Quick sample pickers */}
              <div className="flex flex-wrap gap-2 text-[11px]">
                <span className="text-slate-400 font-medium">Contoh Mockup:</span>
                <button
                  type="button"
                  onClick={() => setNewDraftUrl('/assets/showcase/showcase-logo.svg')}
                  className="px-2 py-0.5 rounded bg-slate-100 text-blue-600 font-mono hover:bg-slate-200 cursor-pointer"
                >
                  Logo SVG
                </button>
                <button
                  type="button"
                  onClick={() => setNewDraftUrl('/assets/showcase/showcase-poster.svg')}
                  className="px-2 py-0.5 rounded bg-slate-100 text-blue-600 font-mono hover:bg-slate-200 cursor-pointer"
                >
                  Poster SVG
                </button>
                <button
                  type="button"
                  onClick={() => setNewDraftUrl('https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80')}
                  className="px-2 py-0.5 rounded bg-slate-100 text-blue-600 font-mono hover:bg-slate-200 cursor-pointer"
                >
                  Foto Branding
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Catatan untuk Klien
                </label>
                <textarea
                  rows={2}
                  value={newDraftNotes}
                  onChange={(e) => setNewDraftNotes(e.target.value)}
                  placeholder="Contoh: Ini adalah draft konsep #2 dengan nuansa warna biru elektrik sesuai brief..."
                  className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setUpdateDraftModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Simpan &amp; Tampilkan Draft</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: VIEW CLIENT FILE LIGHTBOX (MEMERIKSA FILE KIRIMAN KLIEN) */}
      {viewingClientFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl p-5 border border-slate-800">
            <button
              type="button"
              onClick={() => setViewingClientFile(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-3 flex items-center justify-between pr-10">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-400">
                  Pratinjau Berkas Desain Klien
                </span>
                <h4 className="text-base font-bold text-white truncate max-w-md">
                  {viewingClientFile.name}
                </h4>
                <div className="text-xs text-slate-400">
                  Ukuran: {viewingClientFile.size} &bull; Tipe: {viewingClientFile.type}
                </div>
              </div>

              <a
                href={viewingClientFile.dataUrl || viewingClientFile.previewUrl || '#'}
                download={viewingClientFile.name}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Unduh File Asli</span>
              </a>
            </div>

            <div className="max-h-[70vh] flex items-center justify-center overflow-auto rounded-2xl bg-slate-950 p-2 border border-slate-800">
              {viewingClientFile.dataUrl || viewingClientFile.previewUrl ? (
                <img
                  src={viewingClientFile.dataUrl || viewingClientFile.previewUrl}
                  alt={viewingClientFile.name}
                  className="max-h-[65vh] w-auto object-contain rounded-lg"
                />
              ) : (
                <div className="py-20 text-center text-slate-400 text-sm">
                  Pratinjau tidak tersedia untuk format berkas ini. Silakan klik Unduh File Asli.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: INVOICE / BUKTI PEMBAYARAN */}
      {invoiceModalOpen && matchedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-slate-900">
            <button
              type="button"
              onClick={() => setInvoiceModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-200 pb-4 mb-4">
              <div className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest">
                INVOICE RESMI PSA DIGITAL CREATIVE
              </div>
              <h3 className="text-xl font-extrabold mt-1">
                {matchedOrder.finalPackage?.invoiceNumber || `INV-${matchedOrder.id}`}
              </h3>
              <div className="text-xs text-slate-500 mt-0.5">
                Tanggal: {matchedOrder.dateCreated} &bull; Status: LUNAS / SELESAI
              </div>
            </div>

            <div className="space-y-3 text-xs mb-6">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Nama Pelanggan:</span>
                <span className="font-bold text-slate-900">{matchedOrder.clientName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Layanan:</span>
                <span className="font-bold text-slate-900">{matchedOrder.serviceName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Tipe Pengerjaan:</span>
                <span className="font-bold text-slate-900">{matchedOrder.orderType || 'Design Only'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Desainer Bertanggung Jawab:</span>
                <span className="font-bold text-slate-900">{matchedOrder.designerAssigned}</span>
              </div>
              <div className="flex justify-between py-2 text-sm font-extrabold text-blue-600 bg-blue-50/60 px-3 rounded-xl">
                <span>Total Biaya:</span>
                <span className="font-mono">{formatRupiah(matchedOrder.estimatedTotal || 0)}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setInvoiceModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: REVISION SUBMISSION */}
      {revisionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setRevisionModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Ajukan Catatan Revisi
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Tuliskan instruksi perbaikan dengan jelas (contoh: ubah warna background menjadi biru tua, ganti ukuran teks judul).
            </p>

            {revisionSuccessMessage ? (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-sm font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{revisionSuccessMessage}</span>
              </div>
            ) : (
              <form onSubmit={handleSendRevision} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Catatan Revisi
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={revisionNotes}
                    onChange={(e) => setRevisionNotes(e.target.value)}
                    placeholder="Contoh: Mohon teks subjudul digeser sedikit ke kanan, dan warna aksen disesuaikan dengan logo..."
                    className="w-full p-3.5 text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setRevisionModalOpen(false)}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Catatan Revisi</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL 6: PREVIEW FULLSCREEN */}
      {previewModalOpen && matchedOrder?.previewImageUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl p-4">
            <button
              type="button"
              onClick={() => setPreviewModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[80vh] flex items-center justify-center overflow-auto rounded-2xl">
              <img
                src={matchedOrder.previewImageUrl}
                alt="Fullscreen Preview"
                className="max-h-[75vh] w-auto object-contain rounded-xl"
              />
            </div>
            <div className="mt-3 text-center text-xs text-slate-400 font-mono">
              Draft Preview: {matchedOrder.serviceName} ({matchedOrder.id})
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
