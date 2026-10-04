import React, { useState } from 'react';
import { Layers } from 'lucide-react';

export default function FutureRoadmap() {
  const [activeTab, setActiveTab] = useState<'customer' | 'designer'>('customer');

  const roadmapPhases = [
    { phase: 'Phase 1', title: 'Marketing Website + Structured Ordering UI', status: 'Live & Aktif' },
    { phase: 'Phase 2', title: 'Database Persistence (PostgreSQL / Firestore)', status: 'Arsitektur Siap' },
    { phase: 'Phase 3', title: 'Customer Dashboard "Pesanan Saya"', status: 'Preview Ready' },
    { phase: 'Phase 4', title: 'Designer Workspace & Brief Manager', status: 'Preview Ready' },
    { phase: 'Phase 5', title: 'Multi-Stage Order State Machine', status: 'Aktif di Tracking' },
    { phase: 'Phase 6', title: 'Payment Gateway Integration (Midtrans / Xendit)', status: 'Siap Dikembangkan' },
    { phase: 'Phase 7', title: 'WhatsApp & Email Automated Notifications', status: 'Rencana Phase 7' },
    { phase: 'Phase 8', title: 'AI Assistant Recommendation Engine', status: 'Live & Aktif' },
    { phase: 'Phase 9', title: 'Automated Print Production Dispatch', status: 'Rencana Lanjutan' },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Skalabilitas Platform</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Arsitektur Masa Depan PSA Digital
          </h2>
          <p className="mt-3 text-base text-slate-600">
            PSA Digital Creative dibangun dengan fondasi modular berstandar tinggi. Siap dihubungkan ke sistem autentikasi, database cloud, dan gateway pembayaran untuk ekosistem layanan lengkap.
          </p>
        </div>

        {/* Dashboard Concept Switcher */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-8 mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-slate-200 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Pratinjau Arsitektur Dashboard
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                {activeTab === 'customer'
                  ? 'Customer Dashboard: "Pesanan Saya"'
                  : 'Designer Workspace: "Manajemen Order & Revisi"'}
              </h3>
            </div>
            <div className="flex items-center p-1 bg-white border border-slate-200 rounded-xl shadow-2xs">
              <button
                type="button"
                onClick={() => setActiveTab('customer')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'customer'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Portal Pelanggan
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('designer')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'designer'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Portal Desainer
              </button>
            </div>
          </div>

          {/* Simulated Interface Display */}
          <div className="mt-6 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm">
            {activeTab === 'customer' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
                  <span className="font-semibold text-slate-700">Daftar Tiket Pesanan Aktif</span>
                  <span className="font-mono">Status: Read-Only Simulation</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-[11px] font-mono font-bold text-blue-600">PSA-20261004-A8K2</div>
                    <div className="text-xs font-bold text-slate-800 mt-1">Logo &amp; Brand Identity</div>
                    <div className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
                      <span>Proses: Desain Dibuat</span>
                      <span className="text-blue-600 font-bold">50%</span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-[11px] font-mono font-bold text-emerald-600">PSA-20261001-B3P9</div>
                    <div className="text-xs font-bold text-slate-800 mt-1">Poster &amp; Event Design</div>
                    <div className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
                      <span>Status: Selesai</span>
                      <span className="text-emerald-600 font-bold">100%</span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-dashed border-slate-300 flex flex-col items-center justify-center text-center p-4">
                    <span className="text-xs font-bold text-slate-700">+ Pesanan Baru</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">Kirim brief untuk menambah tiket</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100">
                  <span className="font-semibold text-slate-700">Workspace Antrian Desainer</span>
                  <span className="font-mono">Role: Lead Designer (PSA)</span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-800">Brief Klien Masuk: Kopi Nusantara</span>
                      <div className="text-[11px] text-slate-500">Materi logo &amp; referensi terlampir (3 file)</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-700 font-bold text-[10px]">
                      Siap Dikerjakan
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-800">Upload Draft Mockup: Tech Seminar</span>
                      <div className="text-[11px] text-slate-500">Klien menyetujui versi final</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-700 font-bold text-[10px]">
                      File Diserahkan
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 9-Phase Roadmap Grid */}
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">
          Peta Jalan Pengembangan (9-Phase Roadmap)
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {roadmapPhases.map((r, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-mono font-bold text-blue-600 mr-2">{r.phase}</span>
                <span className="font-semibold text-slate-800">{r.title}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-bold whitespace-nowrap ml-2">
                {r.status}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
