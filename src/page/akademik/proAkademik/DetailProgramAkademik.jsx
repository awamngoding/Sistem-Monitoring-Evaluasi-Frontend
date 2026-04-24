<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import { FileText, Download } from "lucide-react"; // Pastikan import Download ada
=======
/* eslint-disable no-undef */
import Sidebar from "../../../components/Sidebar";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import PageWrapper from "../../../components/PageWrapper";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  FileText,
  Download,
  UserCheck,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  BarChart3,
  Zap,
  Activity,
  Building2,
  Clock,
  ChevronRight,
  Layers,
  Target,
  TrendingUp,
  Calendar,
  Users,
  Check,
  CreditCard,
  FileCheck,
  FolderOpen,
} from "lucide-react";
import { toast } from "react-toastify";
>>>>>>> 684b7f7bba5d703b17b265fd2bac89ef149d5be2

function DetailProgramAkademik() {
  const navigate = useNavigate();
  const { id } = useParams();
<<<<<<< HEAD

  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3000/program/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setProgram(data);
      } catch (error) {
        console.error("Gagal mengambil detail program:", error);
=======
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState(2); // default ke Pelaksanaan
  const [selectedKegiatan, setSelectedKegiatan] = useState(null);

  // Data Dummy
  const dummyFases = [
    {
      id: 0,
      nama_fase: "Inisiasi",
      status: "completed",
      progress: 100,
      tanggal: "Jan 2024",
      kegiatan: [
        {
          id: 1,
          nama_kegiatan: "Kick-off Meeting & Pembentukan Tim",
          status: "completed",
          tanggal: "5 Jan 2024",
          pic: "Project Manager",
          deskripsi: "Pertemuan awal untuk membahas scope program.",
          termin: [
            {
              id: 1,
              nama: "Notulensi Meeting",
              jenis: "dokumentasi",
              status: "completed",
              tanggal: "5 Jan 2024",
              file: true,
            },
            {
              id: 2,
              nama: "Daftar Hadir Tim",
              jenis: "dokumentasi",
              status: "completed",
              tanggal: "5 Jan 2024",
              file: true,
            },
            {
              id: 3,
              nama: "Pembayaran Termin I",
              jenis: "pembayaran",
              status: "completed",
              tanggal: "10 Jan 2024",
              jumlah: "Rp 75.000.000",
            },
          ],
        },
        {
          id: 2,
          nama_kegiatan: "Studi Kelayakan",
          status: "completed",
          tanggal: "12 Jan 2024",
          pic: "Tim Analis",
          deskripsi: "Analisis kelayakan program.",
          termin: [
            {
              id: 1,
              nama: "Laporan Studi Kelayakan",
              jenis: "dokumentasi",
              status: "completed",
              tanggal: "15 Jan 2024",
              file: true,
            },
            {
              id: 2,
              nama: "Pembayaran Termin II",
              jenis: "pembayaran",
              status: "completed",
              tanggal: "20 Jan 2024",
              jumlah: "Rp 40.000.000",
            },
          ],
        },
      ],
    },
    {
      id: 1,
      nama_fase: "Perencanaan",
      status: "completed",
      progress: 100,
      tanggal: "Feb 2024",
      kegiatan: [
        {
          id: 1,
          nama_kegiatan: "Perencanaan Kurikulum",
          status: "completed",
          tanggal: "5 Feb 2024",
          pic: "Tim Akademik",
          deskripsi: "Penyusunan kurikulum dan modul pembelajaran.",
          termin: [
            {
              id: 1,
              nama: "Dokumen Kurikulum",
              jenis: "dokumentasi",
              status: "completed",
              tanggal: "8 Feb 2024",
              file: true,
            },
            {
              id: 2,
              nama: "Modul Ajar",
              jenis: "dokumentasi",
              status: "completed",
              tanggal: "12 Feb 2024",
              file: true,
            },
            {
              id: 3,
              nama: "Pembayaran",
              jenis: "pembayaran",
              status: "completed",
              tanggal: "15 Feb 2024",
              jumlah: "Rp 50.000.000",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      nama_fase: "Pelaksanaan",
      status: "active",
      progress: 65,
      tanggal: "Mar-Mei 2024",
      kegiatan: [
        {
          id: 1,
          nama_kegiatan: "Pelaksanaan Program Inti",
          status: "in-progress",
          tanggal: "1 Mar 2024",
          pic: "Tim Lapangan",
          deskripsi: "Pelaksanaan program sesuai kurikulum.",
          termin: [
            {
              id: 1,
              nama: "Laporan Mingguan",
              jenis: "dokumentasi",
              status: "completed",
              tanggal: "7 Mar 2024",
              file: true,
            },
            {
              id: 2,
              nama: "Dokumentasi Kegiatan",
              jenis: "dokumentasi",
              status: "completed",
              tanggal: "15 Mar 2024",
              file: true,
            },
            {
              id: 3,
              nama: "Pembayaran Termin I",
              jenis: "pembayaran",
              status: "completed",
              tanggal: "15 Mar 2024",
              jumlah: "Rp 100.000.000",
            },
            {
              id: 4,
              nama: "Laporan Bulanan",
              jenis: "dokumentasi",
              status: "pending",
              tanggal: "31 Mar 2024",
              file: false,
            },
            {
              id: 5,
              nama: "Pembayaran Termin II",
              jenis: "pembayaran",
              status: "pending",
              tanggal: "30 Apr 2024",
              jumlah: "Rp 100.000.000",
            },
          ],
        },
        {
          id: 2,
          nama_kegiatan: "Monitoring & Evaluasi",
          status: "in-progress",
          tanggal: "Ongoing",
          pic: "Supervisor",
          deskripsi: "Monitoring harian dan evaluasi mingguan.",
          termin: [
            {
              id: 1,
              nama: "Form Monitoring",
              jenis: "dokumentasi",
              status: "completed",
              tanggal: "Daily",
              file: true,
            },
            {
              id: 2,
              nama: "Laporan Evaluasi",
              jenis: "dokumentasi",
              status: "in-progress",
              tanggal: "Setiap Jumat",
              file: false,
            },
            {
              id: 3,
              nama: "Pembayaran",
              jenis: "pembayaran",
              status: "pending",
              tanggal: "Akhir Bulan",
              jumlah: "Rp 50.000.000",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      nama_fase: "Monitoring",
      status: "pending",
      progress: 0,
      tanggal: "Jun 2024",
      kegiatan: [
        {
          id: 1,
          nama_kegiatan: "Pengawasan & Pengendalian Mutu",
          status: "pending",
          tanggal: "TBD",
          pic: "Tim QA",
          deskripsi: "Pengawasan kualitas pelaksanaan program.",
          termin: [
            {
              id: 1,
              nama: "Checklist Kualitas",
              jenis: "dokumentasi",
              status: "pending",
              tanggal: "TBD",
              file: false,
            },
            {
              id: 2,
              nama: "Laporan Audit",
              jenis: "dokumentasi",
              status: "pending",
              tanggal: "TBD",
              file: false,
            },
            {
              id: 3,
              nama: "Pembayaran",
              jenis: "pembayaran",
              status: "pending",
              tanggal: "TBD",
              jumlah: "Rp 75.000.000",
            },
          ],
        },
      ],
    },
    {
      id: 4,
      nama_fase: "Evaluasi",
      status: "pending",
      progress: 0,
      tanggal: "Jul 2024",
      kegiatan: [
        {
          id: 1,
          nama_kegiatan: "Evaluasi Capaian Program",
          status: "pending",
          tanggal: "TBD",
          pic: "Tim Evaluator",
          deskripsi: "Evaluasi capaian program.",
          termin: [
            {
              id: 1,
              nama: "Laporan Evaluasi",
              jenis: "dokumentasi",
              status: "pending",
              tanggal: "TBD",
              file: false,
            },
            {
              id: 2,
              nama: "Pembayaran",
              jenis: "pembayaran",
              status: "pending",
              tanggal: "TBD",
              jumlah: "Rp 60.000.000",
            },
          ],
        },
      ],
    },
    {
      id: 5,
      nama_fase: "Pelaporan",
      status: "pending",
      progress: 0,
      tanggal: "Aug 2024",
      kegiatan: [
        {
          id: 1,
          nama_kegiatan: "Penyusunan Laporan Akhir",
          status: "pending",
          tanggal: "TBD",
          pic: "Tim Admin",
          deskripsi: "Penyusunan laporan akhir.",
          termin: [
            {
              id: 1,
              nama: "Draft Laporan",
              jenis: "dokumentasi",
              status: "pending",
              tanggal: "TBD",
              file: false,
            },
            {
              id: 2,
              nama: "Pembayaran Akhir",
              jenis: "pembayaran",
              status: "pending",
              tanggal: "TBD",
              jumlah: "Rp 40.000.000",
            },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const resDetail = await fetch(`http://localhost:3000/program/${id}`, {
          headers,
        });
        const detailJson = await resDetail.json();
        const apiData = detailJson.data || detailJson;

        setData({
          ...apiData,
          fases: dummyFases,
          nama_sekolah: "SMK Negeri 1 Jakarta",
          wilayah: "DKI Jakarta",
          npsn: "20109321",
          nama_ho: "Dr. Ahmad Budiman, M.Pd",
          nama_ao: "Drs. Slamet Riyadi, M.Si",
          daftar_vendor: "PT Edukasi Nusantara, CV Sarana Prima",
        });
      } catch (err) {
        toast.error("Gagal mengambil data");
        setData({
          id_program: id,
          nama_program: "Program Akademik",
          fases: dummyFases,
          nama_sekolah: "SMK Negeri 1 Jakarta",
          wilayah: "DKI Jakarta",
          npsn: "20109321",
          nama_ho: "Dr. Ahmad Budiman, M.Pd",
          nama_ao: "Drs. Slamet Riyadi, M.Si",
          daftar_vendor: "PT Edukasi Nusantara, CV Sarana Prima",
        });
>>>>>>> 684b7f7bba5d703b17b265fd2bac89ef149d5be2
      } finally {
        setLoading(false);
      }
    };
<<<<<<< HEAD
    fetchProgram();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F3F4F4]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E5AA7]"></div>
=======
    fetchData();
  }, [id]);

  const getDokumentasiCount = (termin) =>
    termin.filter((t) => t.jenis === "dokumentasi").length;
  const getDokumentasiCompleted = (termin) =>
    termin.filter((t) => t.jenis === "dokumentasi" && t.status === "completed")
      .length;
  const getPaymentStatus = (termin) => {
    const payments = termin.filter((t) => t.jenis === "pembayaran");
    const completed = payments.filter((p) => p.status === "completed").length;
    if (payments.length === 0)
      return { text: "No Payment", color: "text-slate-400" };
    if (completed === payments.length)
      return { text: "Lunas", color: "text-emerald-600" };
    if (completed > 0) return { text: "Sebagian", color: "text-amber-600" };
    return { text: "Belum Dibayar", color: "text-red-500" };
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
>>>>>>> 684b7f7bba5d703b17b265fd2bac89ef149d5be2
      </div>
    );
  }

<<<<<<< HEAD
  if (!program) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F3F4F4]">
        <p className="text-gray-500 font-semibold">Data program tidak ditemukan.</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "AKTIF": return "bg-green-100 text-green-800 border-green-200";
      case "DRAFT": return "bg-gray-100 text-gray-800 border-gray-200";
      case "SELESAI": return "bg-blue-100 text-blue-800 border-blue-200";
      case "DIBATALKAN": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-amber-100 text-amber-800 border-amber-200";
    }
  };
=======
  if (!data) return null;

  const currentFase = data.fases[selectedPhaseIndex];
  const kegiatanList = currentFase?.kegiatan || [];
  const selectedKegiatanData = kegiatanList.find(
    (k) => k.id === selectedKegiatan?.id,
  );
>>>>>>> 684b7f7bba5d703b17b265fd2bac89ef149d5be2

  return (
    <PageWrapper className="h-screen overflow-hidden flex bg-white !p-0 font-sans">
      <Sidebar />
<<<<<<< HEAD
      <main className="flex-1 flex flex-col bg-[#F3F4F4] rounded-[25px] lg:rounded-[40px] px-10 pt-6 pb-9 overflow-auto">
        <div className="flex items-center justify-between mt-3 mb-6">
          <h1 className="text-xl font-semibold text-gray-500">Detail Program Akademik</h1>
          <Button text="← Kembali" variant="ghost" onClick={() => navigate(-1)} />
        </div>

        <div className="flex flex-col w-full gap-6">
          <Card className="w-full bg-white rounded-2xl shadow-md p-6 border-l-8 border-[#2E5AA7]">
            <div className="flex justify-between items-start mb-6 border-b pb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{program.nama_program}</h2>
                <p className="text-sm font-semibold text-gray-500">
                  Kode: {program.kode_program || "-"} | Kategori: {program.kategori}
                </p>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold border shadow-sm ${getStatusColor(program.status_program)}`}>
                {program.status_program}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Sekolah</p>
                {/* PERBAIKAN: Gunakan nama_sekolah sesuai hasil join database */}
                <p className="font-semibold text-gray-700">{program.nama_sekolah || program.sekolah || "Tidak ada data"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Vendor</p>
                {/* PERBAIKAN: Gunakan nama_vendor */}
                <p className="font-semibold text-gray-700">{program.nama_vendor || program.vendor || "Tanpa Vendor"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Tahun</p>
                <p className="font-semibold text-gray-700">{program.tahun}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Dibuat Oleh</p>
                <p className="font-semibold text-gray-700">{program.dibuat_oleh || "Sistem"}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
               <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Tanggal Mulai</p>
                <p className="font-semibold text-[#2E5AA7]">{program.tanggal_mulai ? new Date(program.tanggal_mulai).toLocaleDateString('id-ID') : "Belum ditentukan"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Tanggal Selesai</p>
                <p className="font-semibold text-[#2E5AA7]">{program.tanggal_selesai ? new Date(program.tanggal_selesai).toLocaleDateString('id-ID') : "Belum ditentukan"}</p>
              </div>
            </div>
          </Card>

          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-700 px-2 mt-2">Deskripsi & Catatan</h2>
            <Card className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-500 text-white font-bold shrink-0">i</div>
                <div className="pt-1.5 w-full">
                  {program.deskripsi ? (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{program.deskripsi}</p>
                  ) : (
                    <p className="text-gray-400 italic">Tidak ada deskripsi.</p>
                  )}
                </div>
              </div>
            </Card>
          </div>

        {/* --- BAGIAN DOKUMEN LAMPIRAN --- */}
        <div className="flex flex-col gap-4 mb-6">
          <h2 className="text-lg font-bold text-gray-700 px-2 mt-4">Dokumen Lampiran</h2>
          <Card className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            {/* Cek apakah ada data di array program.dokumen */}
            {program.dokumen && program.dokumen.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {program.dokumen.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white rounded-lg shadow-sm">
                        <FileText className="text-[#2E5AA7]" size={24} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold text-gray-800 truncate max-w-[200px] sm:max-w-xs">
                          {doc.nama_asli}
                        </p>
                        <p className="text-xs text-gray-500">
                          {doc.tipe?.split('/')[1]?.toUpperCase() || 'FILE'} • {(doc.ukuran / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <a 
                      href={`http://localhost:3000/${doc.url}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-2 bg-[#2E5AA7] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1a3d7a] shrink-0"
                    >
                      <Download size={16} /> <span className="hidden sm:inline">Unduh</span>
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-4">
                <p className="text-gray-400 italic text-sm">Tidak ada dokumen yang dilampirkan.</p>
              </div>
            )}
          </Card>
        </div>
=======
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* HEADER */}
        <header className="shrink-0 bg-white border-b border-slate-100 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">
                  {data.nama_program}
                </h1>
                <p className="text-[10px] text-slate-400">
                  ID: {data.id_program} • NPSN: {data.npsn}
                </p>
              </div>
            </div>
            <Button
              text="Back"
              icon={<ArrowLeft size={14} />}
              onClick={() => navigate(-1)}
              className="!bg-white !text-slate-600 !border !border-slate-200 !rounded-lg !px-3 !py-1.5 !text-[11px]"
            />
          </div>

          <div className="grid grid-cols-4 gap-4 text-left">
            <div>
              <p className="text-[9px] font-medium text-slate-400 uppercase">
                Sekolah
              </p>
              <p className="text-xs font-semibold text-slate-800">
                {data.nama_sekolah}
              </p>
              <p className="text-[10px] text-slate-400">{data.wilayah}</p>
            </div>
            <div>
              <p className="text-[9px] font-medium text-slate-400 uppercase">
                Penanggung Jawab
              </p>
              <p className="text-xs font-semibold text-slate-800">
                {data.nama_ho}
              </p>
              <p className="text-[10px] text-slate-400">AO: {data.nama_ao}</p>
            </div>
            <div>
              <p className="text-[9px] font-medium text-slate-400 uppercase">
                Mitra
              </p>
              <p className="text-xs font-semibold text-slate-800">
                {data.daftar_vendor}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-slate-400" />
                <span className="text-xs text-slate-600">
                  {data.file_mou || "MOU_2024.pdf"}
                </span>
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <Download size={14} />
              </button>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <div className="flex-1 flex overflow-hidden p-6 gap-6">
          {/* LEFT SIDEBAR - LIST KEGIATAN (bukan fase) */}
          <div className="w-80 bg-white border border-slate-100 rounded-xl overflow-hidden flex flex-col shrink-0">
            <div className="p-3 border-b border-slate-100 bg-slate-50/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FolderOpen size={12} className="text-blue-500" />
                  <span className="text-[10px] font-semibold text-slate-500 uppercase">
                    Kegiatan
                  </span>
                </div>
                <span className="text-[9px] text-slate-400">
                  {currentFase.nama_fase} • {kegiatanList.length} item
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
              {kegiatanList.map((keg, idx) => {
                const docComplete = getDokumentasiCompleted(keg.termin);
                const docTotal = getDokumentasiCount(keg.termin);
                const payment = getPaymentStatus(keg.termin);

                return (
                  <button
                    key={keg.id}
                    onClick={() => setSelectedKegiatan(keg)}
                    className={`w-full p-3 text-left transition-all ${
                      selectedKegiatan?.id === keg.id
                        ? "bg-blue-50/50 border-l-2 border-l-blue-500"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold mt-0.5 ${
                          keg.status === "completed"
                            ? "bg-emerald-100 text-emerald-600"
                            : keg.status === "in-progress"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-medium text-slate-700 truncate">
                          {keg.nama_kegiatan}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[8px] text-slate-400">
                            {keg.tanggal}
                          </span>
                          <span className="text-[8px] text-slate-400">•</span>
                          <span className="text-[8px] text-slate-400">
                            {keg.pic}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[7px] font-medium text-blue-600 bg-blue-50 px-1 py-0.5 rounded">
                            📄 {docComplete}/{docTotal}
                          </span>
                          <span
                            className={`text-[7px] font-medium px-1 py-0.5 rounded ${payment.color} bg-slate-50`}
                          >
                            💰 {payment.text}
                          </span>
                        </div>
                      </div>
                      <ChevronRight
                        size={12}
                        className={`text-slate-300 mt-2 ${selectedKegiatan?.id === keg.id ? "text-blue-500" : ""}`}
                      />
                    </div>
                  </button>
                );
              })}
              {kegiatanList.length === 0 && (
                <div className="p-6 text-center">
                  <p className="text-[10px] text-slate-400">
                    Belum ada kegiatan
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT - DETAIL TERMIN */}
          <div className="flex-1 flex flex-col gap-5 overflow-hidden">
            {/* INFO FASE SAAT INI */}
            <div className="bg-white border border-slate-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-medium text-slate-400 uppercase">
                      Fase Saat Ini
                    </span>
                    <span
                      className={`text-[8px] font-medium px-1.5 py-0.5 rounded ${
                        currentFase.status === "completed"
                          ? "bg-emerald-50 text-emerald-600"
                          : currentFase.status === "active"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {currentFase.status === "completed"
                        ? "Selesai"
                        : currentFase.status === "active"
                          ? "Berjalan"
                          : "Belum Mulai"}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">
                    {currentFase.nama_fase}
                  </h2>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {currentFase.tanggal} • Progress {currentFase.progress}%
                  </p>
                </div>
                <div className="w-32">
                  <div className="w-full h-1.5 bg-slate-100 rounded-full">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${currentFase.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* DETAIL TERMIN DARI KEGIATAN YANG DIPILIH */}
            {selectedKegiatanData ? (
              <div className="flex-1 bg-white border border-slate-100 rounded-xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-100 bg-slate-50/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[8px] font-medium px-1.5 py-0.5 rounded ${
                            selectedKegiatanData.status === "completed"
                              ? "bg-emerald-50 text-emerald-600"
                              : selectedKegiatanData.status === "in-progress"
                                ? "bg-blue-50 text-blue-600"
                                : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {selectedKegiatanData.status === "completed"
                            ? "Selesai"
                            : selectedKegiatanData.status === "in-progress"
                              ? "Berjalan"
                              : "Menunggu"}
                        </span>
                        <span className="text-[9px] text-slate-400">
                          Target: {selectedKegiatanData.tanggal}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-800">
                        {selectedKegiatanData.nama_kegiatan}
                      </h3>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        PIC: {selectedKegiatanData.pic}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Deskripsi */}
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-[11px] text-slate-600">
                      {selectedKegiatanData.deskripsi}
                    </p>
                  </div>

                  {/* DAFTAR TERMIN (Checkpoint) */}
                  <div>
                    <p className="text-[9px] font-medium text-slate-400 uppercase mb-2">
                      Termin & Checkpoint
                    </p>
                    <div className="space-y-2">
                      {selectedKegiatanData.termin.map((term, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center justify-between p-2.5 rounded-lg border ${
                            term.status === "completed"
                              ? "border-emerald-100 bg-emerald-50/20"
                              : term.status === "in-progress"
                                ? "border-blue-100 bg-blue-50/20"
                                : "border-slate-100"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                                term.jenis === "dokumentasi"
                                  ? "bg-blue-100"
                                  : "bg-amber-100"
                              }`}
                            >
                              {term.jenis === "dokumentasi" ? (
                                term.status === "completed" ? (
                                  <FileCheck
                                    size={12}
                                    className="text-blue-600"
                                  />
                                ) : (
                                  <FileText
                                    size={12}
                                    className="text-blue-400"
                                  />
                                )
                              ) : term.status === "completed" ? (
                                <CheckCircle2
                                  size={12}
                                  className="text-emerald-600"
                                />
                              ) : (
                                <CreditCard
                                  size={12}
                                  className="text-amber-500"
                                />
                              )}
                            </div>
                            <div>
                              <p className="text-[11px] font-medium text-slate-700">
                                {term.nama}
                              </p>
                              <p className="text-[8px] text-slate-400">
                                {term.tanggal}
                                {term.jumlah && ` • ${term.jumlah}`}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {term.status === "completed" && (
                              <span className="text-[7px] font-medium text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded">
                                Selesai
                              </span>
                            )}
                            {term.status === "in-progress" && (
                              <span className="text-[7px] font-medium text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">
                                Proses
                              </span>
                            )}
                            {term.status === "pending" && (
                              <span className="text-[7px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                Menunggu
                              </span>
                            )}
                            {term.file && (
                              <button className="p-1 text-slate-400 hover:text-slate-600">
                                <Download size={10} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-slate-50 rounded-lg text-center">
                      <p className="text-[8px] font-medium text-slate-400 uppercase">
                        Dokumen
                      </p>
                      <p className="text-xl font-bold text-blue-600">
                        {getDokumentasiCompleted(selectedKegiatanData.termin)}/
                        {getDokumentasiCount(selectedKegiatanData.termin)}
                      </p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg text-center">
                      <p className="text-[8px] font-medium text-slate-400 uppercase">
                        Pembayaran
                      </p>
                      <p
                        className={`text-sm font-bold ${getPaymentStatus(selectedKegiatanData.termin).color}`}
                      >
                        {getPaymentStatus(selectedKegiatanData.termin).text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 bg-white border border-slate-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FolderOpen size={20} className="text-slate-300" />
                  </div>
                  <p className="text-xs text-slate-400">
                    Pilih kegiatan untuk melihat termin
                  </p>
                </div>
              </div>
            )}

            {/* ========== CHEVRON PROGRESS INDICATOR (6 STEP) ========== */}
            <div className="bg-white border border-slate-100 rounded-xl p-4 overflow-x-auto">
              <div className="flex items-center justify-between min-w-[600px]">
                {data.fases.map((fase, index) => {
                  const isCompleted = fase.status === "completed";
                  const isActive = fase.status === "active";

                  return (
                    <div key={index} className="flex items-center">
                      {index !== 0 && (
                        <div
                          className="w-10 h-[2px] bg-slate-200 mr-[-6px] z-0"
                          style={{
                            clipPath:
                              "polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%)",
                          }}
                        ></div>
                      )}
                      <div
                        className={`relative flex flex-col items-center cursor-pointer transition-all duration-300 z-10 ${
                          selectedPhaseIndex === index ? "scale-110" : ""
                        }`}
                        onClick={() => {
                          setSelectedPhaseIndex(index);
                          setSelectedKegiatan(null);
                        }}
                      >
                        <div
                          className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                            isCompleted
                              ? "bg-emerald-500 text-white shadow-md"
                              : isActive
                                ? "bg-blue-600 text-white shadow-md ring-4 ring-blue-100"
                                : "bg-white text-slate-400 border-2 border-slate-200"
                          }`}
                        >
                          {isCompleted ? (
                            <Check size={18} />
                          ) : isActive ? (
                            <Activity size={16} className="animate-pulse" />
                          ) : (
                            String(index + 1).padStart(2, "0")
                          )}
                        </div>
                        <p
                          className={`text-[9px] font-semibold mt-1.5 ${
                            selectedPhaseIndex === index
                              ? "text-blue-600"
                              : "text-slate-400"
                          }`}
                        >
                          {fase.nama_fase.substring(0, 5)}
                        </p>
                        <p className="text-[7px] text-slate-300">
                          {fase.progress}%
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
>>>>>>> 684b7f7bba5d703b17b265fd2bac89ef149d5be2
        </div>
      </main>
    </PageWrapper>
  );
}

<<<<<<< HEAD
export default DetailProgramAkademik;
=======
export default DetailProgramAkademik;
>>>>>>> 684b7f7bba5d703b17b265fd2bac89ef149d5be2
