/* eslint-disable no-undef */
import Sidebar from "../../../components/Sidebar";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import PageWrapper from "../../../components/PageWrapper";
import Label from "../../../components/Label";
import Input from "../../../components/Input";
import { toast } from "react-toastify";

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Edit3,
  MapPin,
  User,
  Calendar,
  FileText,
  Download,
  Briefcase,
  Info,
  LayoutDashboard,
  Eye,
  PlusCircle,
  ArrowDown,
  ChevronDown,
  ChevronRight,
  Send,
  File,
  DollarSign,
  Check,
  X,
  RefreshCcw,
  MessageCircle,
} from "lucide-react";

function DetailProgramAkademik() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedFase, setExpandedFase] = useState({});
  const [expandedKeg, setExpandedKeg] = useState({});
  const [showTerminModal, setShowTerminModal] = useState(null);
  const [showChatModal, setShowChatModal] = useState(null);
  const [terminForm, setTerminForm] = useState({ nama_termin: "", deskripsi: "", jumlah_pembayaran: 0, file_dokumentasi: null });
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [sendingChat, setSendingChat] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3000/program/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Gagal mengambil data detail program");

        const result = await res.json();
        setData(result);
        
        if (result.fases) {
          const expanded = {};
          result.fases.forEach((f, i) => {
            expanded[i] = true;
            if (f.kegiatans) {
              f.kegiatans.forEach((k, j) => {
                expanded[`${i}-${j}`] = false;
              });
            }
          });
          setExpandedFase(expanded);
        }
      } catch (err) {
        console.error(err);
        toast.error("Gagal memuat detail program.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const toggleFaseExpand = (index) => {
    setExpandedFase(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleKegExpand = (faseIndex, kegIndex) => {
    const key = `${faseIndex}-${kegIndex}`;
    setExpandedKeg(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const openTerminModal = (kegiatansId) => {
    setShowTerminModal(kegiatansId);
    setTerminForm({ nama_termin: "", deskripsi: "", jumlah_pembayaran: 0, file_dokumentasi: null });
  };

  const saveTermin = async (id_kegiatans) => {
    try {
      const formData = new FormData();
      formData.append("nama_termin", terminForm.nama_termin);
      formData.append("deskripsi", terminForm.deskripsi);
      formData.append("jumlah_pembayaran", String(terminForm.jumlah_pembayaran));
      if (terminForm.file_dokumentasi) {
        formData.append("file_dokumentasi", terminForm.file_dokumentasi);
      }

      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/termin`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        toast.success("Termin berhasil ditambahkan!");
        setShowTerminModal(null);
        window.location.reload();
      } else {
        toast.error("Gagal menyimpan termin");
      }
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  };

  const openChatModal = async (id_termin) => {
    setShowChatModal(id_termin);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/termin/chat/${id_termin}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setChatMessages(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const sendChat = async () => {
    if (!chatInput.trim()) return;
    setSendingChat(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/termin/chat`, {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_termin: showChatModal,
          pesan: chatInput,
        }),
      });

      if (res.ok) {
        const newMsg = await res.json();
        setChatMessages([...chatMessages, newMsg]);
        setChatInput("");
        setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      }
    } catch (err) {
      toast.error("Gagal mengirim pesan");
    } finally {
      setSendingChat(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-bold text-[#2E5AA7] animate-pulse">
          Memuat Data...
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <PageWrapper className="h-screen bg-[#EEF5FF] flex overflow-hidden !p-0">
        <Sidebar />
        <main className="flex-1 flex flex-col h-full overflow-hidden px-4 md:px-12 pt-6 md:pt-10 pb-0">
          <Card className="flex-1 flex flex-col !m-0 !p-0 rounded-t-[2.5rem] rounded-b-[2.5rem] border-none shadow-2xl bg-white overflow-hidden relative">
            <div className="px-8 pt-6 pb-6 shrink-0">
              <header className="flex flex-row items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-red-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition animate-pulse"></div>
                    <div className="relative p-3.5 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl text-white shadow-xl">
                      <Info size={22} strokeWidth={2} />
                    </div>
                  </div>
                  <div className="flex flex-col -space-y-1">
                    <Label
                      text="Data Tidak Ditemukan"
                      className="!text-[8px] !text-red-500 !font-black tracking-[0.3em] !mb-1 uppercase"
                    />
                    <h1 className="text-xl font-black text-gray-800 tracking-tight uppercase leading-none">
                      Program <span className="text-red-500">Tidak Ada</span>
                    </h1>
                  </div>
                </div>
                <Button
                  text="← Kembali"
                  icon={<ArrowLeft size={14} />}
                  onClick={() => navigate("/ho/program/akademik")}
                  className="group !bg-gray-600 hover:!bg-gray-700 !rounded-xl !px-5 !py-2.5 !text-[10px] font-black text-white shadow-lg active:scale-95 transition-all flex items-center gap-2"
                />
              </header>
            </div>
            <div className="flex-1 overflow-hidden flex flex-col px-10 pb-4">
              <div className="flex-1 bg-white border border-gray-100 rounded-3xl overflow-hidden flex flex-col shadow-sm">
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  <div className="flex flex-col items-center justify-center h-full py-20 opacity-20 text-gray-900">
                    <Info size={40} className="mb-2" />
                    <p className="text-xs font-black uppercase tracking-widest">
                      Data Program Tidak Ditemukan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </main>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper className="h-screen bg-[#EEF5FF] flex overflow-hidden !p-0">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden px-4 md:px-12 pt-6 md:pt-10 pb-0">
        <Card className="flex-1 flex flex-col !m-0 !p-0 rounded-t-[2.5rem] rounded-b-[2.5rem] border-none shadow-2xl bg-white overflow-hidden relative">
          <div className="px-8 pt-6 pb-6 shrink-0">
            <header className="flex flex-row items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-blue-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition animate-pulse"></div>
                  <div className="relative p-3.5 bg-gradient-to-br from-[#2E5AA7] to-[#164a8a] rounded-2xl text-white shadow-xl">
                    <FileText size={22} strokeWidth={2} />
                  </div>
                </div>
                <div className="flex flex-col -space-y-1">
                  <Label
                    text="Sistem Monitoring dan Evaluasi Program"
                    className="!text-[8px] !text-[#1E5AA5] !font-black tracking-[0.3em] !mb-1 uppercase"
                  />
                  <h1 className="text-xl font-black text-gray-800 tracking-tight uppercase leading-none">
                    Detail Program{" "}
                    <span className="text-[#2E5AA7]">Akademik</span>
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border ${
                    data.status_program === "Aktif"
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                      : "bg-amber-50 text-amber-600 border-amber-100"
                  }`}
                >
                  {data.status_program || "Draft"}
                </span>
                <Button
                  text="← Kembali"
                  icon={<ArrowLeft size={14} />}
                  onClick={() => navigate("/ho/program/akademik")}
                  className="group !bg-gray-600 hover:!bg-gray-700 !rounded-xl !px-5 !py-2.5 !text-[10px] font-black text-white shadow-lg active:scale-95 transition-all flex items-center gap-2"
                />
              </div>
            </header>

            <div className="flex flex-row items-center gap-3 mb-6">
              <div className="flex items-center gap-3 px-5 py-2.5 bg-blue-50 text-[#1E5AA5] rounded-xl border border-blue-100 font-black text-[9px] uppercase tracking-[0.2em] shrink-0">
                <FileText size={14} /> Program: {data.nama_program}
              </div>
              <div className="flex items-center gap-3 px-5 py-2.5 bg-gray-50 text-gray-600 rounded-xl border border-gray-100 font-black text-[9px] uppercase tracking-[0.2em] shrink-0">
                <LayoutDashboard size={14} /> Kode: {data.kode_program}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col px-10 pb-4">
            <div className="flex-1 bg-white border border-gray-100 rounded-3xl overflow-hidden flex flex-col shadow-sm">
              <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Informasi Utama */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-3 border-b-2 border-blue-100">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Info size={20} className="text-blue-600" />
                      </div>
                      <h3 className="text-lg font-black text-gray-800 uppercase tracking-wide">
                        Informasi Utama
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <User
                          size={16}
                          className="text-gray-400 mt-1 flex-shrink-0"
                        />
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                            Head Office
                          </p>
                          <p className="text-sm font-bold text-gray-800">
                            {data.nama_pembuat || "-"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin
                          size={16}
                          className="text-gray-400 mt-1 flex-shrink-0"
                        />
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                            Sekolah Tujuan
                          </p>
                          <p className="text-sm font-bold text-gray-800">
                            {data.nama_sekolah || "-"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {data.nama_kota || "-"}, {data.nama_provinsi || "-"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Briefcase
                          size={16}
                          className="text-gray-400 mt-1 flex-shrink-0"
                        />
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                            Area Officer
                          </p>
                          <p className="text-sm font-bold text-gray-800">
                            {data.nama_pengawas || "-"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <LayoutDashboard
                          size={16}
                          className="text-gray-400 mt-1 flex-shrink-0"
                        />
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                            Vendor
                          </p>
                          <p className="text-sm font-bold text-gray-800">
                            {data.nama_vendor || "Tidak menggunakan vendor"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detail Pelaksanaan */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-3 border-b-2 border-blue-100">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <Calendar size={20} className="text-green-600" />
                      </div>
                      <h3 className="text-lg font-black text-gray-800 uppercase tracking-wide">
                        Detail Pelaksanaan
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                          <Calendar
                            size={16}
                            className="text-gray-400 mt-1 flex-shrink-0"
                          />
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                              Tahun
                            </p>
                            <p className="text-sm font-bold text-gray-800">
                              {data.tahun || "-"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Calendar
                            size={16}
                            className="text-gray-400 mt-1 flex-shrink-0"
                          />
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                              Tanggal Mulai
                            </p>
                            <p className="text-sm font-bold text-gray-800">
                              {data.tanggal_mulai
                                ? new Date(
                                    data.tanggal_mulai,
                                  ).toLocaleDateString("id-ID")
                                : "-"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <FileText
                          size={16}
                          className="text-gray-400 mt-1 flex-shrink-0"
                        />
                        <div className="flex-1">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">
                            Deskripsi
                          </p>
                          <div className="bg-gray-50 p-4 rounded-xl border text-sm text-gray-700 min-h-[100px]">
                            {data.deskripsi || "Tidak ada deskripsi."}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Download
                          size={16}
                          className="text-gray-400 mt-1 flex-shrink-0"
                        />
                        <div className="flex-1">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">
                            Dokumen MOU
                          </p>
                          {data.file_mou_nama ? (
                            <div className="flex items-center justify-between bg-blue-50 border border-blue-200 p-4 rounded-xl">
                              <div className="flex items-center gap-3 overflow-hidden">
                                <FileText
                                  size={20}
                                  className="text-blue-500 flex-shrink-0"
                                />
                                <span className="text-sm text-blue-700 font-bold truncate">
                                  {data.file_mou_nama}
                                </span>
                              </div>
                              <a
                                href={`http://localhost:3000/${data.file_mou_path}`}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-sm"
                              >
                                Lihat
                              </a>
                            </div>
                          ) : (
                            <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
                              <p className="text-sm text-gray-500 italic">
                                Belum ada dokumen MOU yang diunggah.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fase & Kegiatan Flow */}
                  {data.fases && data.fases.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <div className="flex items-center gap-3 pb-3 mb-6">
                        <div className="p-2 bg-purple-50 rounded-lg">
                          <LayoutDashboard size={20} className="text-purple-600" />
                        </div>
                        <h3 className="text-lg font-black text-gray-800 uppercase tracking-wide">
                          Fase & Kegiatan Program
                        </h3>
                      </div>

                      <div className="space-y-4">
                        {data.fases.map((fase, faseIndex) => (
                          <div key={fase.id_fase} className="border border-gray-200 rounded-xl overflow-hidden">
                            <div
                              className="flex items-center justify-between px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100"
                              onClick={() => toggleFaseExpand(faseIndex)}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-black text-sm">
                                  {faseIndex + 1}
                                </div>
                                <div>
                                  <p className="font-black text-gray-800">{fase.nama_fase}</p>
                                  <p className="text-[10px] text-gray-500">
                                    {fase.kegiatans?.length || 0} Kegiatan
                                  </p>
                                </div>
                              </div>
                              <ChevronRight
                                size={18}
                                className={`text-gray-400 transition-transform ${
                                  expandedFase[faseIndex] ? "rotate-90" : ""
                                }`}
                              />
                            </div>

                            {expandedFase[faseIndex] && fase.kegiatans && (
                              <div className="p-4 bg-white border-t border-gray-200 space-y-3">
                                {fase.kegiatans.map((keg, kegIndex) => {
                                  const kegKey = `${faseIndex}-${kegIndex}`;
                                  return (
                                    <div key={keg.id_kegiatans} className="border border-gray-100 rounded-lg overflow-hidden">
                                      <div
                                        className="flex items-center justify-between px-3 py-2 bg-orange-50 cursor-pointer"
                                        onClick={() => toggleKegExpand(faseIndex, kegIndex)}
                                      >
                                        <div className="flex items-center gap-2">
                                          <div className="w-6 h-6 rounded-md bg-orange-500 text-white flex items-center justify-center font-black text-[10px]">
                                            {kegIndex + 1}
                                          </div>
                                          <span className="font-bold text-gray-700 text-sm">
                                            {keg.nama_kegiatans}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Button
                                            text="Tambah Termin"
                                            icon={<PlusCircle size={10} />}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              openTerminModal(keg.id_kegiatans);
                                            }}
                                            className="!bg-green-50 !text-green-600 hover:!bg-green-600 hover:!text-white !rounded-md !px-2 !py-1 !text-[8px] font-bold"
                                          />
                                          <ChevronDown
                                            size={14}
                                            className={`text-gray-400 transition-transform ${
                                              expandedKeg[kegKey] ? "rotate-180" : ""
                                            }`}
                                          />
                                        </div>
                                      </div>

                                      {expandedKeg[kegKey] && (
                                        <div className="p-3 bg-white border-t border-gray-100">
                                          <div className="space-y-2">
                                            {keg.termin && keg.termin.length > 0 ? (
                                              keg.termin.map((term, termIndex) => (
                                                <div key={term.id_termin} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                                                  <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                      <p className="font-bold text-gray-800 text-sm">
                                                        Termin {termIndex + 1}: {term.nama_termin}
                                                      </p>
                                                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                                                        term.status === 'approved' ? 'bg-green-100 text-green-600' :
                                                        term.status === 'rejected' ? 'bg-red-100 text-red-600' :
                                                        'bg-amber-100 text-amber-600'
                                                      }`}>
                                                        {term.status}
                                                      </span>
                                                    </div>
                                                    {term.deskripsi && (
                                                      <p className="text-[10px] text-gray-500 mt-1">{term.deskripsi}</p>
                                                    )}
                                                    <div className="flex items-center gap-4 mt-2">
                                                      {term.jumlah_pembayaran > 0 && (
                                                        <p className="text-[10px] font-black text-blue-600 flex items-center gap-1">
                                                          <DollarSign size={10} />
                                                          {Number(term.jumlah_pembayaran).toLocaleString("id-ID")}
                                                        </p>
                                                      )}
                                                      {term.nama_file_dokumentasi && (
                                                        <a
                                                          href={`http://localhost:3000/uploads/dokumentasi/${term.file_dokumentasi}`}
                                                          target="_blank"
                                                          className="text-[10px] text-blue-600 hover:underline flex items-center gap-1"
                                                        >
                                                          <File size={10} /> Dokumen
                                                        </a>
                                                      )}
                                                    </div>
                                                  </div>
                                                  <Button
                                                    text="Chat"
                                                    icon={<MessageCircle size={10} />}
                                                    onClick={() => openChatModal(term.id_termin)}
                                                    className="!bg-blue-50 !text-blue-600 hover:!bg-blue-600 hover:!text-white !rounded-md !px-2 !py-1 !text-[8px] font-bold"
                                                  />
                                                </div>
                                              ))
                                            ) : (
                                              <p className="text-[10px] text-gray-400 italic text-center py-2">
                                                Belum ada termin
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                  <Button
                    text="Edit Program"
                    icon={<Edit3 size={14} />}
                    onClick={() =>
                      navigate(`/ho/program/akademik/edit/${data.id_program}`)
                    }
                    className="!bg-amber-50 !text-amber-600 hover:!bg-amber-600 hover:!text-white !rounded-xl !px-6 !py-3 !text-sm font-black transition-all shadow-sm"
                  />
                  <Button
                    text="Kelola Kegiatan"
                    icon={<LayoutDashboard size={14} />}
                    onClick={() =>
                      navigate(
                        `/ho/program/akademik/calendar/${data.id_program}`,
                      )
                    }
                    className="!bg-blue-50 !text-blue-600 hover:!bg-blue-600 hover:!text-white !rounded-xl !px-6 !py-3 !text-sm font-black transition-all shadow-sm"
                  />
                </div>

                {/* Termin Modal */}
                {showTerminModal && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
                      <h3 className="text-lg font-black text-gray-800 mb-4">Tambah Termin</h3>
                      <div className="space-y-4">
                        <div>
                          <Label text="Nama Termin" />
                          <Input
                            value={terminForm.nama_termin}
                            onChange={(e) => setTerminForm({...terminForm, nama_termin: e.target.value})}
                            placeholder="cth: Termin 1 - Pembayaran Pertama"
                          />
                        </div>
                        <div>
                          <Label text="Deskripsi" />
                          <textarea
                            className="w-full bg-gray-50 border-none rounded-xl p-3 text-sm"
                            value={terminForm.deskripsi}
                            onChange={(e) => setTerminForm({...terminForm, deskripsi: e.target.value})}
                            placeholder="Deskripsi termin..."
                          />
                        </div>
                        <div>
                          <Label text="Jumlah Pembayaran (Rp)" />
                          <Input
                            type="number"
                            value={terminForm.jumlah_pembayaran}
                            onChange={(e) => setTerminForm({...terminForm, jumlah_pembayaran: e.target.value})}
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label text="Upload Dokumentasi" />
                          <input
                            type="file"
                            className="w-full text-sm"
                            onChange={(e) => setTerminForm({...terminForm, file_dokumentasi: e.target.files[0]})}
                          />
                        </div>
                        <div className="flex gap-3 pt-2">
                          <Button
                            text="Batal"
                            onClick={() => setShowTerminModal(null)}
                            className="!bg-gray-100 !text-gray-600 !flex-1 !rounded-xl"
                          />
                          <Button
                            text="Simpan"
                            onClick={() => saveTermin(showTerminModal)}
                            className="!bg-green-600 !text-white !flex-1 !rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Chat Modal */}
                {showChatModal && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg mx-4 shadow-2xl flex flex-col" style={{height: "70vh"}}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-black text-gray-800">Chat HO - AO</h3>
                        <button onClick={() => setShowChatModal(null)} className="text-gray-400 hover:text-gray-600">
                          <X size={20} />
                        </button>
                      </div>
                      <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-gray-50 rounded-xl mb-4">
                        {chatMessages.length === 0 ? (
                          <p className="text-center text-gray-400 text-sm py-8">Belum ada pesan. Mulai percakapan!</p>
                        ) : (
                          chatMessages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role_user === 'HO' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[80%] p-3 rounded-xl ${msg.role_user === 'HO' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                <p className="text-xs font-bold mb-1">{msg.nama_user}</p>
                                <p className="text-sm">{msg.pesan}</p>
                                <p className="text-[8px] opacity-70 mt-1">
                                  {new Date(msg.created_at).toLocaleString("id-ID")}
                                </p>
                              </div>
                            </div>
                          ))
                        )}
                        <div ref={chatEndRef} />
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          placeholder="Tulis pesan..."
                          className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 text-sm"
                          onKeyPress={(e) => e.key === "Enter" && sendChat()}
                        />
                        <Button
                          text={<Send size={16} />}
                          onClick={sendChat}
                          disabled={sendingChat}
                          className="!bg-purple-600 !text-white !rounded-xl !px-4"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </main>
    </PageWrapper>
  );
}

export default DetailProgramAkademik;
