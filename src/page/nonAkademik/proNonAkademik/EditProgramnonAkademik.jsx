/* eslint-disable no-undef */
import Sidebar from "../../../components/Sidebar";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import Input from "../../../components/Input";
import PageWrapper from "../../../components/PageWrapper";
import Card from "../../../components/Card";
<<<<<<< HEAD
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import Input from "../../../components/Input";
import bgImage from "../../../assets/img/wayangkulit.jpg";
import { toast } from "react-toastify";
import { FileText, X, Plus, Save, ArrowLeft } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function EditProgramNonAkademik() {
  const navigate = useNavigate();
  const { id } = useParams();

  // State untuk Dropdown Data
  const [sekolahList, setSekolahList] = useState([]);
  const [vendorList, setVendorList] = useState([]);

  // State Form
  const [namaProgram, setNamaProgram] = useState("");
  const [kodeProgram, setKodeProgram] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [selectedSekolah, setSelectedSekolah] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [tahun, setTahun] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [statusProgram, setStatusProgram] = useState("");
  
  // State Dokumen (Array untuk multiple files)
  const [dokumenList, setDokumenList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 1. FETCH DATA AWAL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [resSekolah, resVendor, resDetail] = await Promise.all([
          fetch("http://localhost:3000/sekolah", { headers }),
          fetch("http://localhost:3000/program/list-vendor", { headers }),
          fetch(`http://localhost:3000/program/${id}`, { headers })
        ]);

        const dataSekolah = await resSekolah.json();
        setSekolahList(dataSekolah);

        const dataVendor = await resVendor.json();
        setVendorList(dataVendor);

        const data = await resDetail.json();
        if (resDetail.ok) {
          setNamaProgram(data.nama_program || "");
          setKodeProgram(data.kode_program || "");
          setDeskripsi(data.deskripsi || "");
          setSelectedSekolah(data.id_sekolah);
          setSelectedVendor(data.id_vendor);
          setTahun(data.tahun || "");
          setTanggalMulai(data.tanggal_mulai ? data.tanggal_mulai.split('T')[0] : "");
          setTanggalSelesai(data.tanggal_selesai ? data.tanggal_selesai.split('T')[0] : "");
          setStatusProgram(data.status_program || "SELESAI");
          setDokumenList(data.dokumen || []);
        }
      } catch (err) {
        toast.error("Gagal sinkronisasi data program");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Handle Tambah File
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      url: `uploads/${file.name}`, 
      nama_asli: file.name,
      tipe: file.type,
      ukuran: file.size
    }));
    setDokumenList(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setDokumenList(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdate = async () => {
    if (!namaProgram.trim()) return toast.error("Nama program non-akademik wajib diisi");
    
    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");
      const payload = {
        nama_program: namaProgram,
        kode_program: kodeProgram,
        deskripsi: deskripsi,
        id_sekolah: Number(selectedSekolah),
        id_vendor: selectedVendor ? Number(selectedVendor) : null,
        tahun: Number(tahun),
        tanggal_mulai: tanggalMulai || null,
        tanggal_selesai: tanggalSelesai || null,
        status_program: statusProgram,
        dokumen: dokumenList,
        kategori: "NON_AKADEMIK" // Memastikan kategori tetap konsisten
      };

      const res = await fetch(`http://localhost:3000/program/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Program Non-Akademik berhasil diperbarui!");
        navigate(-1);
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Gagal memperbarui data");
      }
    } catch (err) {
      toast.error("Koneksi server terputus");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
    </div>
  );

=======
import { toast } from "react-toastify";

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  ArrowLeft,
  Save,
  Upload,
  ChevronDown,
  Target,
  Info,
  FileText,
  Edit3,
} from "lucide-react";

function EditProgramnonAkademik() {
  const navigate = useNavigate();
  const { id } = useParams();

  // State List Data
  const [sekolahList, setSekolahList] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [aoList, setAoList] = useState([]);

  // Form State
  const [namaHO, setNamaHO] = useState("");
  const [wilayahInfo, setWilayahInfo] = useState({ kota: "", provinsi: "" });
  const [selectedSekolah, setSelectedSekolah] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedAO, setSelectedAO] = useState("");
  const [namaProgram, setNamaProgram] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tahun, setTahun] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [statusProgram, setStatusProgram] = useState("Draft");
  const [fileMou, setFileMou] = useState(null);
  const [existingFileName, setExistingFileName] = useState("");

  // UI State
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [openDrop, setOpenDrop] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        if (token) {
          const decoded = jwtDecode(token);
          setNamaHO(decoded.nama || "Head Office");
        }

        const [resSekolah, resAo, resVendor, resDetail] = await Promise.all([
          fetch("http://localhost:3000/sekolah", { headers }),
          fetch("http://localhost:3000/users/ao", { headers }),
          fetch("http://localhost:3000/vendor", { headers }),
          fetch(`http://localhost:3000/program/${id}`, { headers }),
        ]);

        const dataSekolah = await resSekolah.json();
        const detail = await resDetail.json();

        setSekolahList(Array.isArray(dataSekolah) ? dataSekolah : []);
        setAoList(Array.isArray(await resAo.json()) ? await resAo.json() : []);
        setVendorList(
          Array.isArray(await resVendor.json()) ? await resVendor.json() : [],
        );

        if (detail) {
          setNamaProgram(detail.nama_program || "");
          setDeskripsi(detail.deskripsi || "");
          setSelectedSekolah(detail.id_sekolah || "");
          setSelectedAO(detail.id_pengawas || "");
          setSelectedVendor(detail.id_vendor || "");
          setTahun(detail.tahun || "");
          if (detail.tanggal_mulai)
            setTanggalMulai(detail.tanggal_mulai.split("T")[0]);
          setStatusProgram(detail.status_program || "Draft");
          setExistingFileName(detail.file_mou_nama || "");

          const sklh = dataSekolah.find(
            (s) => s.id_sekolah === detail.id_sekolah,
          );
          if (sklh)
            setWilayahInfo({
              kota: sklh.wilayah?.nama_wilayah,
              provinsi: sklh.wilayah?.parent?.nama_wilayah,
            });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [id]);

  const handleSekolahSelect = (id_sekolah) => {
    setSelectedSekolah(id_sekolah);
    setOpenDrop(null);
    const s = sekolahList.find((i) => i.id_sekolah === id_sekolah);
    if (s)
      setWilayahInfo({
        kota: s.wilayah?.nama_wilayah,
        provinsi: s.wilayah?.parent?.nama_wilayah,
      });
  };

  const saveProgram = async () => {
    if (!selectedSekolah || !selectedAO || !namaProgram.trim())
      return toast.error("Lengkapi data wajib!");

    setSaving(true);
    const formData = new FormData();
    formData.append("nama_program", namaProgram);
    formData.append("deskripsi", deskripsi);
    formData.append("id_sekolah", selectedSekolah);
    formData.append("id_pengawas", selectedAO);
    if (selectedVendor) formData.append("id_vendor", selectedVendor);
    formData.append("tahun", tahun);
    if (tanggalMulai) formData.append("tanggal_mulai", tanggalMulai);
    formData.append("status_program", statusProgram);
    if (fileMou) formData.append("file_mou", fileMou);

    try {
      const res = await fetch(`http://localhost:3000/program/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      });
      if (res.ok) {
        toast.success("Update Berhasil!");
        navigate(`/ho/program/non-akademik/detail/${id}`);
      } else {
        const b = await res.json();
        toast.error(b.message);
      }
    } catch (err) {
      toast.error("Gagal update data");
    } finally {
      setSaving(false);
    }
  };

  const DropdownTrigger = ({ type, placeholder, value }) => (
    <button
      type="button"
      onClick={() => setOpenDrop(openDrop === type ? null : type)}
      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm transition-all ${openDrop === type ? "border-blue-500 ring-2 ring-blue-500/10" : "border-gray-200 bg-gray-50/50 hover:border-gray-300"}`}
    >
      <span
        className={`truncate ${value ? "text-gray-800 font-bold" : "text-gray-400"}`}
      >
        {value || placeholder}
      </span>
      <ChevronDown
        size={14}
        className={`transition-transform ${openDrop === type ? "rotate-180 text-blue-500" : ""}`}
      />
    </button>
  );

  if (loading)
    return (
      <PageWrapper className="h-screen bg-[#EEF5FF] flex overflow-hidden !p-0">
        <Sidebar />
        <main className="flex-1 flex flex-col h-full overflow-hidden px-4 md:px-12 pt-6 md:pt-10 pb-0">
          <Card className="flex-1 flex flex-col !m-0 !p-0 rounded-t-[2.5rem] rounded-b-[2.5rem] border-none shadow-2xl bg-white overflow-hidden relative">
            <div className="flex-1 flex flex-col items-center justify-center px-8 py-20">
              <div className="relative group">
                <div className="absolute -inset-1 bg-blue-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition animate-pulse"></div>
                <div className="relative p-4 bg-gradient-to-br from-[#2E5AA7] to-[#164a8a] rounded-2xl text-white shadow-xl">
                  <Edit3 size={24} strokeWidth={2} />
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm font-black text-gray-600 uppercase tracking-widest animate-pulse">
                  Memuat Data Program...
                </p>
              </div>
            </div>
          </Card>
        </main>
      </PageWrapper>
    );

>>>>>>> 684b7f7bba5d703b17b265fd2bac89ef149d5be2
  return (
    <PageWrapper className="h-screen bg-[#EEF5FF] flex overflow-hidden !p-0">
      <Sidebar />
<<<<<<< HEAD
      <main className="flex-1 flex flex-col items-center py-6 rounded-[25px] lg:rounded-[40px] px-4 sm:px-10 pb-9 bg-cover bg-center overflow-y-auto" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="w-full max-w-3xl flex flex-col gap-6 mt-4">
          <Card className="w-full bg-white p-6 sm:p-8 rounded-xl shadow-lg border-t-4 border-amber-500">
            <div className="flex items-center justify-between mb-8 border-b pb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Edit Program Non-Akademik</h2>
              </div>
             
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6">
              <div>
                <Label text="Nama Program / Kegiatan" required />
                <Input value={namaProgram} onChange={(e) => setNamaProgram(e.target.value)} />
              </div>
              <div>
                <Label text="Deskripsi Kegiatan" />
                <textarea 
                  className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500" 
                  rows="3" 
                  placeholder="Jelaskan detail kegiatan non-akademik di sini..."
                  value={deskripsi} 
                  onChange={(e) => setDeskripsi(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label text="Sekolah" required />
                <select 
                  className="w-full border p-2 rounded bg-white focus:ring-2 focus:ring-amber-500 outline-none"
                  value={selectedSekolah || ""}
                  onChange={(e) => setSelectedSekolah(e.target.value)}
                >
                  <option value="">Pilih Sekolah Target</option>
                  {sekolahList.map(s => <option key={s.id_sekolah} value={s.id_sekolah}>{s.nama_sekolah}</option>)}
                </select>
              </div>
              <div>
                <Label text="Pelaksana / Vendor" />
                <select 
                  className="w-full border p-2 rounded bg-white focus:ring-2 focus:ring-amber-500 outline-none"
                  value={selectedVendor || ""}
                  onChange={(e) => setSelectedVendor(e.target.value)}
                >
                  <option value="">Internal / Tanpa Vendor</option>
                  {vendorList.map(v => <option key={v.id_vendor} value={v.id_vendor}>{v.nama_vendor}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <Label text="Tahun Anggaran" required />
                <Input type="number" value={tahun} onChange={(e) => setTahun(e.target.value)} />
              </div>
              <div>
                <Label text="Tanggal Mulai" />
                <Input type="date" value={tanggalMulai} onChange={(e) => setTanggalMulai(e.target.value)} />
              </div>
              <div>
                <Label text="Tanggal Selesai" />
                <Input type="date" value={tanggalSelesai} onChange={(e) => setTanggalSelesai(e.target.value)} />
              </div>
            </div>

            <div className="mb-8 w-full md:w-1/2">
              <Label text="Status Program" required />
              <select 
                className="w-full border p-2 rounded bg-white font-bold text-amber-700 outline-none focus:ring-2 focus:ring-amber-500"
                value={statusProgram}
                onChange={(e) => setStatusProgram(e.target.value)}
              >
                <option value="AKTIF">AKTIF</option>
                <option value="SELESAI">SELESAI</option>
                <option value="DIBATALKAN">DIBATALKAN</option>
              </select>
            </div>

            <div className="mb-8 border-t border-dashed pt-6">
              <Label text="Dokumen Pendukung (Foto/Laporan)" />
              <div className="mt-2 space-y-3">
                <label className="flex items-center gap-2 w-fit px-4 py-2 bg-amber-50 border-2 border-dashed border-amber-200 rounded-lg cursor-pointer hover:bg-amber-100 transition-colors">
                  <Plus size={20} className="text-amber-600" />
                  <span className="text-sm text-amber-700 font-medium">Unggah File Baru</span>
                  <input type="file" className="hidden" multiple onChange={handleFileChange} />
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {dokumenList.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded-lg group hover:border-amber-300">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FileText size={16} className="text-gray-400 shrink-0" />
                        <span className="text-xs truncate text-gray-600">{doc.nama_asli}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => removeFile(index)} 
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1 rounded transition-colors"
                      >
                        <X size={14}/>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8 border-t pt-6">
              <Button 
                text="Batal" 
                variant="ghost" 
                icon={<ArrowLeft size={18}/>} 
                onClick={() => navigate(-1)} 
              />
              <Button 
                text={isSaving ? "Menyimpan..." : "Simpan Perubahan"} 
                className="bg-amber-600 hover:bg-amber-700 text-white" // Custom color override jika Button mendukung className
                icon={<Save size={18}/>}
                onClick={handleUpdate} 
                disabled={isSaving} 
              />
            </div>
          </Card>
        </div>
=======
      <main className="flex-1 flex flex-col h-full overflow-hidden px-4 md:px-12 pt-6 md:pt-10 pb-0">
        <Card className="flex-1 flex flex-col !m-0 !p-0 rounded-t-[2.5rem] rounded-b-[2.5rem] border-none shadow-2xl bg-white overflow-hidden relative">
          <div className="px-8 pt-6 pb-6 shrink-0">
            <header className="flex flex-row items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-blue-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition animate-pulse"></div>
                  <div className="relative p-3.5 bg-gradient-to-br from-[#2E5AA7] to-[#164a8a] rounded-2xl text-white shadow-xl">
                    <Edit3 size={22} strokeWidth={2} />
                  </div>
                </div>
                <div className="flex flex-col -space-y-1">
                  <Label
                    text="Sistem Monitoring dan Evaluasi Program"
                    className="!text-[8px] !text-[#1E5AA5] !font-black tracking-[0.3em] !mb-1 uppercase"
                  />
                  <h1 className="text-xl font-black text-gray-800 tracking-tight uppercase leading-none">
                    Edit Program{" "}
                    <span className="text-[#2E5AA7]">Non Akademik</span>
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={statusProgram}
                  onChange={(e) => setStatusProgram(e.target.value)}
                  className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border border-blue-200 bg-blue-50 text-blue-600 outline-none cursor-pointer"
                >
                  <option value="Draft">Draft</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Nonaktif">Nonaktif</option>
                </select>
                <Button
                  text="← Kembali"
                  icon={<ArrowLeft size={14} />}
                  onClick={() =>
                    navigate(`/ho/program/non-akademik/detail/${id}`)
                  }
                  className="group !bg-gray-600 hover:!bg-gray-700 !rounded-xl !px-5 !py-2.5 !text-[10px] font-black text-white shadow-lg active:scale-95 transition-all flex items-center gap-2"
                />
              </div>
            </header>

            <div className="flex flex-row items-center gap-3 mb-6">
              <div className="flex items-center gap-3 px-5 py-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 font-black text-[9px] uppercase tracking-[0.2em] shrink-0">
                <Target size={14} /> Program: {namaProgram || "Loading..."}
              </div>
              <div className="flex items-center gap-3 px-5 py-2.5 bg-gray-50 text-gray-600 rounded-xl border border-gray-100 font-black text-[9px] uppercase tracking-[0.2em] shrink-0">
                <Info size={14} /> Kode: {id}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col px-10 pb-4">
            <div className="flex-1 bg-white border border-gray-100 rounded-3xl overflow-hidden flex flex-col shadow-sm">
              <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Penempatan */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-3 border-b-2 border-blue-100">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Target size={20} className="text-blue-600" />
                      </div>
                      <h3 className="text-lg font-black text-gray-800 uppercase tracking-wide">
                        Penempatan
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label text="Sekolah" required />
                        <div className="relative">
                          <DropdownTrigger
                            type="sekolah"
                            placeholder="Pilih Sekolah"
                            value={
                              sekolahList.find(
                                (s) => s.id_sekolah === selectedSekolah,
                              )?.nama_sekolah
                            }
                          />
                          {openDrop === "sekolah" && (
                            <ul className="absolute z-40 w-full bg-white border border-gray-100 mt-2 rounded-xl shadow-2xl max-h-48 overflow-y-auto p-1">
                              {sekolahList.map((s) => (
                                <li
                                  key={s.id_sekolah}
                                  onClick={() =>
                                    handleSekolahSelect(s.id_sekolah)
                                  }
                                  className="px-4 py-2 hover:bg-blue-50 rounded-lg cursor-pointer text-sm font-bold text-gray-600 transition-colors"
                                >
                                  {s.nama_sekolah}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3">
                        <div>
                          <Label text="Provinsi" />
                          <p className="text-sm font-black text-blue-600">
                            {wilayahInfo.provinsi || "-"}
                          </p>
                        </div>
                        <div>
                          <Label text="Kabupaten / Kota" />
                          <p className="text-sm font-black text-blue-600">
                            {wilayahInfo.kota || "-"}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label text="Pengawas (AO)" required />
                        <div className="relative">
                          <DropdownTrigger
                            type="ao"
                            placeholder="Pilih Pengawas"
                            value={
                              aoList.find((a) => a.id_user === selectedAO)?.nama
                            }
                          />
                          {openDrop === "ao" && (
                            <ul className="absolute z-40 w-full bg-white border border-gray-100 mt-2 rounded-xl shadow-2xl max-h-48 overflow-y-auto p-1">
                              {aoList.map((a) => (
                                <li
                                  key={a.id_user}
                                  onClick={() => {
                                    setSelectedAO(a.id_user);
                                    setOpenDrop(null);
                                  }}
                                  className="px-4 py-2 hover:bg-blue-50 rounded-lg cursor-pointer text-sm font-bold text-gray-600 transition-colors"
                                >
                                  {a.nama}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Identitas Program */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-3 border-b-2 border-blue-100">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <Info size={20} className="text-green-600" />
                      </div>
                      <h3 className="text-lg font-black text-gray-800 uppercase tracking-wide">
                        Identitas Program
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label text="Penanggung Jawab HO" />
                        <Input
                          value={namaHO}
                          disabled
                          className="bg-gray-50 border-transparent text-gray-400 font-bold"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label text="Nama Program" required />
                        <Input
                          placeholder="cth: Bank Sampah"
                          value={namaProgram}
                          onChange={(e) => setNamaProgram(e.target.value)}
                          className="bg-gray-50 border-transparent focus:bg-white font-bold"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label text="Deskripsi" />
                        <textarea
                          className="w-full bg-gray-50 border-none rounded-xl p-4 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 h-32 resize-none"
                          placeholder="Detail kegiatan..."
                          value={deskripsi}
                          onChange={(e) => setDeskripsi(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Logistik & Berkas */}
                <div className="mt-8 space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b-2 border-blue-100">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <FileText size={20} className="text-purple-600" />
                    </div>
                    <h3 className="text-lg font-black text-gray-800 uppercase tracking-wide">
                      Logistik & Berkas
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label text="Tahun" required />
                      <Input
                        type="number"
                        value={tahun}
                        onChange={(e) => setTahun(e.target.value)}
                        className="bg-gray-50 border-transparent text-center font-black"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label text="Tgl Mulai" />
                      <Input
                        type="date"
                        value={tanggalMulai}
                        onChange={(e) => setTanggalMulai(e.target.value)}
                        className="bg-gray-50 border-transparent text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label text="Vendor" />
                      <div className="relative">
                        <DropdownTrigger
                          type="vendor"
                          placeholder="Pilih Vendor"
                          value={
                            vendorList.find(
                              (v) => v.id_vendor === selectedVendor,
                            )?.nama_vendor
                          }
                        />
                        {openDrop === "vendor" && (
                          <ul className="absolute z-40 w-full bg-white border border-gray-100 mt-2 rounded-xl shadow-2xl max-h-48 overflow-y-auto p-1">
                            <li
                              onClick={() => {
                                setSelectedVendor("");
                                setOpenDrop(null);
                              }}
                              className="px-4 py-2 hover:bg-gray-100 rounded-lg italic text-gray-400 text-sm"
                            >
                              Tanpa Vendor
                            </li>
                            {vendorList.map((v) => (
                              <li
                                key={v.id_vendor}
                                onClick={() => {
                                  setSelectedVendor(v.id_vendor);
                                  setOpenDrop(null);
                                }}
                                className="px-4 py-2 hover:bg-blue-50 rounded-lg cursor-pointer text-sm font-bold text-gray-600 transition-colors"
                              >
                                {v.nama_vendor}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label text="Berkas MOU" />
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-blue-50/30 hover:border-blue-500 transition-all cursor-pointer group">
                      <Upload
                        size={24}
                        className="text-gray-300 group-hover:text-blue-500 mb-2 transition-colors"
                      />
                      <div className="text-center px-4">
                        <p className="text-[10px] font-black text-gray-400 group-hover:text-blue-600 truncate w-full">
                          {fileMou
                            ? fileMou.name
                            : existingFileName || "GANTI FILE MOU"}
                        </p>
                        {existingFileName && !fileMou && (
                          <p className="text-[8px] text-blue-400 font-bold mt-1 uppercase tracking-tighter">
                            File lama tersimpan
                          </p>
                        )}
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => setFileMou(e.target.files[0])}
                        accept=".pdf,.jpg,.png,.jpeg"
                      />
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                  <Button
                    text={saving ? "Menyimpan..." : "Simpan Perubahan"}
                    icon={<Save size={14} />}
                    disabled={saving}
                    onClick={saveProgram}
                    className="!bg-blue-50 !text-blue-600 hover:!bg-blue-600 hover:!text-white !rounded-xl !px-6 !py-3 !text-sm font-black transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
>>>>>>> 684b7f7bba5d703b17b265fd2bac89ef149d5be2
      </main>
    </PageWrapper>
  );
}

<<<<<<< HEAD
export default EditProgramNonAkademik;
=======
export default EditProgramnonAkademik;
>>>>>>> 684b7f7bba5d703b17b265fd2bac89ef149d5be2
