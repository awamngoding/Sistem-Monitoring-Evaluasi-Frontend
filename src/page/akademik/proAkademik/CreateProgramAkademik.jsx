/* eslint-disable no-undef */
import Sidebar from "../../../components/Sidebar";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import Input from "../../../components/Input";
<<<<<<< HEAD
import bgImage from "../../../assets/img/wayangkulit.jpg";
import { toast } from "react-toastify";
// Tambahkan Plus di sini
import { FileText, X, Plus } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function CreateProgramAkademik() {
  const navigate = useNavigate();
  
  // State untuk Dropdown Data
  const [sekolahList, setSekolahList] = useState([]);
  const [selectedSekolah, setSelectedSekolah] = useState(null);
  const [vendorList, setVendorList] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);

  // STATE UNTUK DOKUMEN
 const [dokumenList, setDokumenList] = useState([]);
  
  // State untuk Form Program
  const [kodeProgram, setKodeProgram] = useState("");
  const [namaProgram, setNamaProgram] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tahun, setTahun] = useState(new Date().getFullYear());
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [statusProgram, setStatusProgram] = useState("AKTIF"); 
  
  const [loading, setLoading] = useState(false);

  // FETCH DATA SEKOLAH & VENDOR
  useEffect(() => {
    const fetchSekolah = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/sekolah", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setSekolahList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetch sekolah:", err);
        setSekolahList([]);
      }
    };

    const fetchVendor = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/program/list-vendor", { 
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setVendorList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetch vendor:", err);
        setVendorList([]);
      }
    };

    fetchSekolah();
    fetchVendor();
  }, []);

 const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      url: `uploads/${file.name}`,
      nama_asli: file.name,
      tipe: file.type,
      ukuran: file.size
    }));
    setDokumenList([...dokumenList, ...newFiles]);
  };
  const removeFile = (index) => {
    setDokumenList(dokumenList.filter((_, i) => i !== index));
  };

  const saveProgram = async () => {
    if (!namaProgram.trim()) return toast.error("Nama program harus diisi");
    if (!selectedSekolah) return toast.error("Silakan pilih sekolah");
    if (!tahun) return toast.error("Tahun harus diisi");
    if (!statusProgram.trim()) return toast.error("Status program harus diisi");

    const payload = {
      kode_program: kodeProgram.trim() || null,
      nama_program: namaProgram.trim(),
      deskripsi: deskripsi.trim() || null,
      id_sekolah: Number(selectedSekolah),
      id_vendor: selectedVendor ? Number(selectedVendor) : null,
      kategori: "AKADEMIK", 
      tahun: Number(tahun),
      tanggal_mulai: tanggalMulai || null,
      tanggal_selesai: tanggalSelesai || null,
      status_program: statusProgram.trim(),
      dokumen: dokumenList,
    };

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/program", { 
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      const resBody = await res.json();
      if (!res.ok) {
        toast.error(resBody.message || "Gagal membuat program");
        return;
      }

      toast.success("Program Akademik berhasil dibuat!");
      navigate(-1); 
    } catch (err) {
      toast.error("Gagal membuat program. Cek console.");
=======
import PageWrapper from "../../../components/PageWrapper";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  ArrowLeft,
  Save,
  Upload,
  ChevronDown,
  BookOpen,
  PlusCircle,
  Info,
  Target,
  FileText,
  Trash2,
  ListChecks,
  ChevronRight,
  UserCheck,
  BarChart3,
  Calendar,
  DollarSign,
  X,
} from "lucide-react";

function CreateProgramAkademik() {
  const navigate = useNavigate();

  // --- 1. STATE DATA REFERENSI ---
  const [sekolahList, setSekolahList] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [aoList, setAoList] = useState([]);
  const [hoList, setHoList] = useState([]);

  // --- 2. STATE FORM ---
  const [loading, setLoading] = useState(false);
  const [wilayahInfo, setWilayahInfo] = useState({ kota: "", provinsi: "" });
  const [selectedSekolah, setSelectedSekolah] = useState(null);
  const [selectedAO, setSelectedAO] = useState(null);
  const [selectedHO, setSelectedHO] = useState(null);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [hargaVendor, setHargaVendor] = useState("");
  const [namaProgram, setNamaProgram] = useState("");
  const [kpi, setKpi] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tahun, setTahun] = useState(new Date().getFullYear());
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [fileMou, setFileMou] = useState(null);

  // --- 3. STATE FASE & KEGIATAN ---
  const [fases, setFases] = useState([
    { nama_fase: "", deskripsi: "", urutan: 1, kegiatans: [] },
  ]);
  const [expandedFase, setExpandedFase] = useState([true]);
  const [openDrop, setOpenDrop] = useState(null);

  // --- 4. FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const [resSek, resAo, resHo, resVen] = await Promise.all([
          fetch("http://localhost:3000/sekolah", { headers }),
          fetch("http://localhost:3000/users/ao", { headers }),
          fetch("http://localhost:3000/users/ho", { headers }),
          fetch("http://localhost:3000/vendor", { headers }),
        ]);
        const dSek = await resSek.json();
        const dAo = await resAo.json();
        const dHo = await resHo.json();
        const dVen = await resVen.json();

        setSekolahList(Array.isArray(dSek) ? dSek : dSek.data || []);
        setAoList(Array.isArray(dAo) ? dAo : dAo.data || []);
        setHoList(Array.isArray(dHo) ? dHo : dHo.data || []);
        setVendorList(Array.isArray(dVen) ? dVen : dVen.data || []);
      } catch (err) {
        console.error("Gagal sinkronisasi data");
      }
    };
    fetchData();
  }, []);

  // --- 5. SEMUA FUNGSI (PENTING: Jangan dipindah keluar dari sini) ---
  const handleSekolahSelect = (id) => {
    setSelectedSekolah(id);
    setOpenDrop(null);
    const s = sekolahList.find((i) => i.id_sekolah === id);
    if (s)
      setWilayahInfo({
        kota: s.wilayah?.nama_wilayah || s.nama_wilayah || "-",
        provinsi: s.wilayah?.parent?.nama_wilayah || s.nama_provinsi || "-",
      });
  };

  const addFase = () => {
    setFases([
      ...fases,
      { nama_fase: "", deskripsi: "", urutan: fases.length + 1, kegiatans: [] },
    ]);
    setExpandedFase([...expandedFase, true]);
  };

  const removeFase = (index) => {
    const newFases = fases.filter((_, i) => i !== index);
    setFases(newFases.map((f, i) => ({ ...f, urutan: i + 1 })));
    setExpandedFase(expandedFase.filter((_, i) => i !== index));
  };

  const updateFase = (index, field, value) => {
    const newFases = [...fases];
    newFases[index][field] = value;
    setFases(newFases);
  };

  const toggleFaseExpand = (index) => {
    const newExpanded = [...expandedFase];
    newExpanded[index] = !newExpanded[index];
    setExpandedFase(newExpanded);
  };

  const addActivitiesToFase = (faseIndex) => {
    const newFases = [...fases];
    newFases[faseIndex].kegiatans.push({
      nama_kegiatans: "",
      deskripsi: "",
      urutan: newFases[faseIndex].kegiatans.length + 1,
    });
    setFases(newFases);
  };

  const removeActivitiesFromFase = (faseIndex, kegIndex) => {
    const newFases = [...fases];
    newFases[faseIndex].kegiatans.splice(kegIndex, 1);
    newFases[faseIndex].kegiatans = newFases[faseIndex].kegiatans.map(
      (k, i) => ({ ...k, urutan: i + 1 }),
    );
    setFases([...newFases]);
  };

  const updateActivities = (faseIndex, kegIndex, field, value) => {
    const newFases = [...fases];
    newFases[faseIndex].kegiatans[kegIndex][field] = value;
    setFases(newFases);
  };

  const saveProgram = async () => {
    // 1. Validasi Input Dasar - Pastikan semua yang wajib sudah terisi
    if (
      !selectedSekolah ||
      !selectedHO ||
      !selectedAO ||
      !namaProgram.trim() ||
      !fileMou
    ) {
      return toast.error(
        "Lengkapi data wajib: Sekolah, Personel (HO & AO), Nama Program, dan berkas MOU.",
      );
    }

    // 2. Filter Tahapan (Hanya kirim fase yang ada namanya)
    const validFases = fases
      .filter((f) => f.nama_fase && f.nama_fase.trim() !== "")
      .map((f, i) => ({
        ...f,
        urutan: i + 1,
        kegiatans: f.kegiatans.filter(
          (k) => k.nama_kegiatans && k.nama_kegiatans.trim() !== "",
        ),
      }));

    if (validFases.length === 0) {
      return toast.error(
        "Tambahkan minimal 1 Tahapan Program dengan nama yang jelas.",
      );
    }

    setLoading(true);
    try {
      const formData = new FormData();

      // Append Data String & Number
      formData.append("nama_program", namaProgram);
      formData.append("kpi", kpi);
      formData.append("deskripsi", deskripsi);
      formData.append("id_sekolah", String(selectedSekolah));
      formData.append("id_pengawas", String(selectedAO));
      formData.append("id_user_ho", String(selectedHO));
      formData.append("harga_vendor", String(hargaVendor || 0));
      formData.append("tahun", String(tahun));
      formData.append("kategori", "AKADEMIK");
      formData.append("status_program", "Draft");

      if (tanggalMulai) formData.append("tanggal_mulai", tanggalMulai);

      // Append Multi-Vendor (Kirim sebagai JSON String)
      formData.append("ids_vendor", JSON.stringify(selectedVendors));

      // Append File MOU
      formData.append("file_mou", fileMou);

      // Append Fase & Kegiatan (JSON String)
      formData.append("fases", JSON.stringify(validFases));

      const res = await fetch("http://localhost:3000/program", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          // Jangan set Content-Type manual kalau pakai FormData
        },
        body: formData,
      });

      if (res.ok) {
        toast.success("Program Akademik Berhasil Diterbitkan!");
        setTimeout(() => navigate("/ho/program/akademik"), 1500);
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Gagal menyimpan ke server.");
      }
    } catch (err) {
      toast.error("Koneksi server terputus atau server sedang offline.");
>>>>>>> 684b7f7bba5d703b17b265fd2bac89ef149d5be2
    } finally {
      setLoading(false);
    }
  };
<<<<<<< HEAD

  function SekolahPicker() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const selectedSekolahName =
      sekolahList.find((s) => s.id_sekolah === selectedSekolah)?.nama_sekolah || "Pilih Sekolah";

    return (
      <div className="relative w-full">
        <button type="button" onClick={() => setDropdownOpen(!dropdownOpen)} className="w-full border px-4 py-2 text-left bg-white rounded shadow text-gray-700">
          {selectedSekolahName}
        </button>
        {dropdownOpen && (
          <ul className="absolute z-10 w-full bg-white border mt-1 rounded shadow max-h-60 overflow-y-auto">
            {sekolahList.map((s) => (
              <li key={s.id_sekolah} onClick={() => { setSelectedSekolah(s.id_sekolah); setDropdownOpen(false); }} className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-gray-700">
                {s.nama_sekolah}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  function VendorPicker() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const selectedVendorName = vendorList.find((v) => v.id_vendor === selectedVendor)?.nama_vendor || "Pilih Vendor";

    return (
      <div className="relative w-full">
        <button type="button" onClick={() => setDropdownOpen(!dropdownOpen)} className="w-full border px-4 py-2 text-left bg-white rounded shadow text-gray-700">
          {selectedVendorName}
        </button>
        {dropdownOpen && (
          <ul className="absolute z-10 w-full bg-white border mt-1 rounded shadow max-h-60 overflow-y-auto">
            <li onClick={() => { setSelectedVendor(null); setDropdownOpen(false); }} className="px-4 py-2 hover:bg-red-100 cursor-pointer text-red-600 italic">Kosongkan Vendor</li>
            {vendorList.map((v) => (
              <li key={v.id_vendor} onClick={() => { setSelectedVendor(v.id_vendor); setDropdownOpen(false); }} className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-gray-700">
                {v.nama_vendor}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

 
  
  

=======
>>>>>>> 684b7f7bba5d703b17b265fd2bac89ef149d5be2
  return (
    <PageWrapper className="h-screen bg-[#F1F5F9] flex overflow-hidden !p-0">
      <Sidebar />
<<<<<<< HEAD
      <main className="flex-1 flex flex-col items-center py-6 rounded-[25px] lg:rounded-[40px] px-4 sm:px-10 pb-9 bg-cover bg-center overflow-y-auto" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="w-full max-w-3xl flex flex-col items-center gap-8 mt-4">
          <Card className="w-full bg-white p-6 sm:p-8 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-[#2E5AA7] mb-8 border-b pb-4">Buat Program Akademik</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label text="Nama Program" required />
                <Input placeholder="Masukkan nama program..." value={namaProgram} onChange={(e) => setNamaProgram(e.target.value)} />
              </div>
            </div>
            <div className="mb-6">
              <Label text="Deskripsi Program" />
              <textarea className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3" placeholder="Jelaskan detail program..." value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)}></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label text="Sekolah Penyelenggara" required />
                <SekolahPicker />
              </div>
              <div>
                <Label text="Vendor Terkait" />
                <VendorPicker />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <Label text="Tahun" required />
                <Input type="number" value={tahun} onChange={(e) => setTahun(Number(e.target.value))} />
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
            <div className="w-full border px-4 py-2 bg-gray-100 rounded shadow text-gray-500 font-semibold cursor-not-allowed">
              AKTIF 
            </div>
          </div>
           <div className="mb-8 w-full">
            <Label text="Dokumen Pendukung (Multiple)" />
            <div className="mt-2 space-y-3">
              <label className="flex items-center gap-2 w-fit px-4 py-2 bg-blue-50 border-2 border-dashed border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100">
                <Plus size={20} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Tambah File</span>
                <input type="file" className="hidden" multiple onChange={handleFileChange} />
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {dokumenList.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 border rounded-lg">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText size={16} className="text-gray-400 shrink-0" />
                      <span className="text-xs truncate">{doc.nama_asli}</span>
                    </div>
                    <button onClick={() => removeFile(index)} className="text-red-500 hover:bg-red-50 p-1 rounded">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
            <div className="flex justify-between mt-8 border-t pt-6">
              <Button text="← Kembali" variant="ghost" onClick={() => navigate(-1)} />
              <Button text={loading ? "Menyimpan..." : "Simpan Program"} onClick={saveProgram} disabled={loading} />
            </div>
          </Card>
=======
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* HEADER - COMPACT */}
        <header className="px-8 pt-5 pb-3 shrink-0 flex items-center justify-between bg-white border-b border-gray-200 z-30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#1E5AA5] rounded-xl text-white shadow-md">
              <PlusCircle size={20} />
            </div>
            <h1 className="text-lg font-black text-gray-800 uppercase tracking-tight leading-none">
              Inisiasi <span className="text-[#1E5AA5]">Akademik</span>
            </h1>
          </div>
          <Button
            text="Kembali"
            icon={<ArrowLeft size={14} />}
            onClick={() => navigate("/ho/program/akademik")}
            className="!bg-gray-50 !text-gray-400 !rounded-xl !px-4 !py-2 !text-[10px] font-bold border border-gray-100 transition-all hover:!text-red-500"
          />
        </header>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-8 pt-6 pb-20 space-y-6">
          <div className="max-w-[1400px] mx-auto space-y-6">
            {/* ROW 1: SASARAN & OTORITAS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Target size={18} className="text-[#1E5AA5]" />
                  <h3 className="text-xs font-black text-gray-800 uppercase">
                    Sasaran Wilayah
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Label
                      text="Pilih Sekolah"
                      className="!text-[9px] uppercase font-bold text-gray-400"
                    />
                    <button
                      onClick={() =>
                        setOpenDrop(openDrop === "sek" ? null : "sek")
                      }
                      className="w-full text-left px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-bold flex justify-between items-center transition-all hover:bg-white hover:border-[#1E5AA5]"
                    >
                      {sekolahList.find((s) => s.id_sekolah === selectedSekolah)
                        ?.nama_sekolah || "Pilih..."}
                      <ChevronDown size={14} />
                    </button>
                    {openDrop === "sek" && (
                      <div className="absolute z-50 w-full mt-1 bg-white border rounded-xl shadow-2xl max-h-40 overflow-y-auto p-1 animate-in fade-in zoom-in-95">
                        {sekolahList.map((s) => (
                          <div
                            key={s.id_sekolah}
                            onClick={() => handleSekolahSelect(s.id_sekolah)}
                            className="p-2 hover:bg-blue-50 rounded-lg cursor-pointer text-xs font-bold"
                          >
                            {s.nama_sekolah}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="bg-blue-50/50 p-2 rounded-xl border border-blue-100 flex justify-around items-center">
                    <div className="text-center">
                      <p className="text-[7px] font-bold text-gray-400 uppercase">
                        Kota
                      </p>
                      <p className="text-[10px] font-black text-[#1E5AA5]">
                        {wilayahInfo.kota || "-"}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-[7px] font-bold text-gray-400 uppercase">
                        Provinsi
                      </p>
                      <p className="text-[10px] font-black text-[#1E5AA5]">
                        {wilayahInfo.provinsi || "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <UserCheck size={18} className="text-emerald-600" />
                  <h3 className="text-xs font-black text-gray-800 uppercase">
                    PIC Otoritas
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenDrop(openDrop === "ho" ? null : "ho")
                      }
                      className="w-full text-left px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-bold flex justify-between transition-all hover:border-emerald-500"
                    >
                      {hoList.find((h) => h.id_user === selectedHO)?.nama ||
                        "PIC HO"}
                      <ChevronDown size={14} />
                    </button>
                    {openDrop === "ho" && (
                      <div className="absolute z-50 w-full mt-1 bg-white border rounded-xl shadow-xl max-h-40 overflow-y-auto p-1">
                        {hoList.map((h) => (
                          <div
                            key={h.id_user}
                            onClick={() => {
                              setSelectedHO(h.id_user);
                              setOpenDrop(null);
                            }}
                            className="p-2 hover:bg-emerald-50 rounded-lg cursor-pointer text-xs font-bold"
                          >
                            {h.nama}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenDrop(openDrop === "ao" ? null : "ao")
                      }
                      className="w-full text-left px-4 py-2.5 bg-gray-50 border rounded-xl text-xs font-bold flex justify-between transition-all hover:border-blue-500"
                    >
                      {aoList.find((a) => a.id_user === selectedAO)?.nama ||
                        "AO Wilayah"}
                      <ChevronDown size={14} />
                    </button>
                    {openDrop === "ao" && (
                      <div className="absolute z-50 w-full mt-1 bg-white border rounded-xl shadow-xl max-h-40 overflow-y-auto p-1">
                        {aoList.map((a) => (
                          <div
                            key={a.id_user}
                            onClick={() => {
                              setSelectedAO(a.id_user);
                              setOpenDrop(null);
                            }}
                            className="p-2 hover:bg-blue-50 rounded-lg cursor-pointer text-xs font-bold"
                          >
                            {a.nama}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ROW 2: DETAIL PROGRAM & MITRA */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="space-y-1">
                  <Label
                    text="Nama Program Utama"
                    className="!text-[9px] uppercase"
                  />
                  <Input
                    placeholder="Contoh: Digitalisasi Modul Pengajaran..."
                    value={namaProgram}
                    onChange={(e) => setNamaProgram(e.target.value)}
                    className="!text-lg !font-black !py-4 !bg-gray-50/50 !rounded-2xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label
                      text="KPI Capaian"
                      className="!text-[9px] uppercase"
                    />
                    <Input
                      placeholder="KPI terukur..."
                      value={kpi}
                      onChange={(e) => setKpi(e.target.value)}
                      className="!text-xs !bg-blue-50/30 !rounded-xl"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label
                      text="Anggaran (IDR)"
                      className="!text-[9px] uppercase"
                    />
                    <div className="relative">
                      <DollarSign
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600"
                      />
                      <Input
                        type="number"
                        placeholder="Harga..."
                        value={hargaVendor}
                        onChange={(e) => setHargaVendor(e.target.value)}
                        className="!text-xs !pl-8 !bg-emerald-50/30 !rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
                <div className="relative">
                  <Label
                    text="Mitra Pelaksana (Multi)"
                    className="!text-[8px] uppercase font-black"
                  />
                  <button
                    onClick={() =>
                      setOpenDrop(openDrop === "ven" ? null : "ven")
                    }
                    className="w-full text-left px-4 py-2.5 bg-white border rounded-xl text-[10px] font-bold flex justify-between items-center transition-all hover:border-[#1E5AA5]"
                  >
                    {selectedVendors.length
                      ? `${selectedVendors.length} Vendor`
                      : "Pilih Vendor..."}
                    <ChevronDown size={14} />
                  </button>
                  {openDrop === "ven" && (
                    <div className="absolute z-50 w-full mt-1 bg-white border rounded-xl shadow-xl max-h-32 overflow-y-auto p-1">
                      {vendorList.map((v) => (
                        <div
                          key={v.id_vendor}
                          onClick={() => {
                            if (!selectedVendors.includes(v.id_vendor))
                              setSelectedVendors([
                                ...selectedVendors,
                                v.id_vendor,
                              ]);
                            setOpenDrop(null);
                          }}
                          className="p-2 hover:bg-blue-50 rounded-lg cursor-pointer text-[10px] font-bold"
                        >
                          {v.nama_vendor || v.nama}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedVendors.map((id) => (
                    <span
                      key={id}
                      className="px-2 py-0.5 bg-[#1E5AA5] text-white text-[8px] font-bold rounded flex items-center gap-1"
                    >
                      {vendorList.find((v) => v.id_vendor === id)
                        ?.nama_vendor || "Vendor"}
                      <X
                        size={10}
                        className="cursor-pointer"
                        onClick={() =>
                          setSelectedVendors(
                            selectedVendors.filter((x) => x !== id),
                          )
                        }
                      />
                    </span>
                  ))}
                </div>
                <label className="flex items-center gap-2 p-2 border border-dashed border-blue-300 rounded-xl bg-white cursor-pointer hover:bg-blue-50 transition-colors">
                  <Upload size={14} className="text-[#1E5AA5]" />
                  <span className="text-[9px] font-bold text-gray-400 truncate">
                    {fileMou ? fileMou.name : "Unggah MOU"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setFileMou(e.target.files[0])}
                  />
                </label>
              </div>
            </div>

            {/* SECTION 3: TAHAPAN PROGRAM */}
            <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                <div className="flex items-center gap-2">
                  <ListChecks size={20} className="text-[#1E5AA5]" />
                  <h3 className="text-sm font-black text-gray-800 uppercase">
                    Tahapan Implementasi
                  </h3>
                </div>
                <button
                  onClick={addFase}
                  className="px-4 py-2 bg-[#1E5AA5] text-white rounded-xl text-[10px] font-black shadow-lg shadow-blue-100 hover:scale-105 transition-transform"
                >
                  + TAMBAH FASE
                </button>
              </div>

              {fases.map((f, i) => (
                <div
                  key={i}
                  className="bg-white border rounded-2xl overflow-hidden shadow-sm group hover:shadow-md transition-shadow"
                >
                  <div
                    className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleFaseExpand(i)}
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-10 h-10 bg-[#1E5AA5] text-white flex items-center justify-center rounded-xl font-black text-sm shadow-md">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <input
                        value={f.nama_fase}
                        onChange={(e) =>
                          updateFase(i, "nama_fase", e.target.value)
                        }
                        onClick={(e) => e.stopPropagation()}
                        className="border-none font-bold text-base focus:ring-0 w-80 bg-transparent placeholder-gray-300"
                        placeholder="Contoh: Tahap Persiapan & Riset..."
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <Trash2
                        size={18}
                        className="text-gray-200 hover:text-red-500 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFase(i);
                        }}
                      />
                      <ChevronDown
                        size={20}
                        className={`text-gray-400 transition-all duration-300 ${expandedFase[i] ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>
                  {expandedFase[i] && (
                    <div className="p-6 bg-slate-50/50 border-t space-y-6 animate-in fade-in duration-300">
                      <div className="space-y-1">
                        <Label
                          text="Deskripsi Tahapan"
                          className="!text-[8px] uppercase"
                        />
                        <textarea
                          value={f.deskripsi}
                          onChange={(e) =>
                            updateFase(i, "deskripsi", e.target.value)
                          }
                          className="w-full p-4 text-xs border-none rounded-xl h-24 shadow-inner"
                          placeholder="Jelaskan apa yang ingin dicapai pada fase ini..."
                        />
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center border-b pb-2">
                          <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                            Daftar Kegiatan Lapangan
                          </h4>
                          <button
                            onClick={() => addActivitiesToFase(i)}
                            className="text-[10px] font-black text-[#1E5AA5] hover:underline"
                          >
                            + TAMBAH KEGIATAN
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {f.kegiatans.map((k, ki) => (
                            <div
                              key={ki}
                              className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 hover:border-blue-200 transition-all group/item"
                            >
                              <span className="w-7 h-7 bg-blue-50 text-[#1E5AA5] flex items-center justify-center rounded-lg font-black text-[10px]">
                                {ki + 1}
                              </span>
                              <input
                                value={k.nama_kegiatans}
                                onChange={(e) =>
                                  updateActivities(
                                    i,
                                    ki,
                                    "nama_kegiatans",
                                    e.target.value,
                                  )
                                }
                                className="flex-1 border-none text-xs font-bold focus:ring-0 bg-transparent"
                                placeholder="Detail kegiatan operasional..."
                              />
                              <Trash2
                                size={14}
                                className="text-gray-200 hover:text-red-500 cursor-pointer transition-colors"
                                onClick={() => removeActivitiesFromFase(i, ki)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* FINAL SAVE BUTTON */}
            <div className="flex justify-center pt-10">
              <Button
                text={
                  loading
                    ? "SEDANG MENSINKRONISASI..."
                    : "SIMPAN SELURUH PROGRAM"
                }
                icon={<Save size={20} />}
                disabled={loading}
                onClick={saveProgram}
                className="!bg-[#1E5AA5] !text-white !rounded-[2rem] !px-24 !py-5 !text-sm font-black shadow-2xl shadow-blue-200 hover:-translate-y-1 transition-all uppercase tracking-widest active:scale-95"
              />
            </div>
          </div>
>>>>>>> 684b7f7bba5d703b17b265fd2bac89ef149d5be2
        </div>
      </main>
    </PageWrapper>
  );
}

<<<<<<< HEAD
export default CreateProgramAkademik;
=======
export default CreateProgramAkademik;
>>>>>>> 684b7f7bba5d703b17b265fd2bac89ef149d5be2
