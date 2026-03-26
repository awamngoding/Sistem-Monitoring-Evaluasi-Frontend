/* eslint-disable no-undef */
import Sidebar from "../../../components/Sidebar";
import Card from "../../../components/Card";
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

  return (
    <div className="bg-gradient-to-b from-[#2E5AA7] to-[#4989C2] min-h-screen p-4 flex flex-col lg:flex-row gap-3">
      <Sidebar />
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
      </main>
    </div>
  );
}

export default EditProgramNonAkademik;