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

function EditProgramAkademik() {
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

        const resSekolah = await fetch("http://localhost:3000/sekolah", { headers });
        const dataSekolah = await resSekolah.json();
        setSekolahList(dataSekolah);

        const resVendor = await fetch("http://localhost:3000/program/list-vendor", { headers });
        const dataVendor = await resVendor.json();
        setVendorList(dataVendor);

        const resDetail = await fetch(`http://localhost:3000/program/${id}`, { headers });
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
          // Ambil array dokumen dari backend
          setDokumenList(data.dokumen || []);
        }
      } catch (err) {
        toast.error("Gagal mengambil data program");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Handle Tambah File (Multiple)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      url: `uploads/${file.name}`, // Simulasi path upload
      nama_asli: file.name,
      tipe: file.type,
      ukuran: file.size
    }));
    setDokumenList(prev => [...prev, ...newFiles]);
  };

  // Handle Hapus File dari List
  const removeFile = (index) => {
    setDokumenList(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdate = async () => {
    if (!namaProgram.trim()) return toast.error("Nama program wajib diisi");
    
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
        dokumen: dokumenList, // Kirim array utuh ke backend
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
        toast.success("Program berhasil diperbarui!");
        navigate(-1);
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Gagal update program");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-blue-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-[#2E5AA7] to-[#4989C2] min-h-screen p-4 flex flex-col lg:flex-row gap-3">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center py-6 rounded-[25px] lg:rounded-[40px] px-4 sm:px-10 pb-9 bg-cover bg-center overflow-y-auto" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="w-full max-w-3xl flex flex-col gap-6 mt-4">
          <Card className="w-full bg-white p-6 sm:p-8 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-8 border-b pb-4">
              <h2 className="text-xl font-bold text-[#2E5AA7]">Edit Program Akademik</h2>
              <span className="text-sm text-gray-400 font-mono">{kodeProgram}</span>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6">
              <div>
                <Label text="Nama Program" required />
                <Input value={namaProgram} onChange={(e) => setNamaProgram(e.target.value)} />
              </div>
              <div>
                <Label text="Deskripsi Program" />
                <textarea 
                  className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  rows="3" 
                  value={deskripsi} 
                  onChange={(e) => setDeskripsi(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label text="Sekolah Penyelenggara" required />
                <select 
                  className="w-full border p-2 rounded bg-white"
                  value={selectedSekolah || ""}
                  onChange={(e) => setSelectedSekolah(e.target.value)}
                >
                  <option value="">Pilih Sekolah</option>
                  {sekolahList.map(s => <option key={s.id_sekolah} value={s.id_sekolah}>{s.nama_sekolah}</option>)}
                </select>
              </div>
              <div>
                <Label text="Vendor" />
                <select 
                  className="w-full border p-2 rounded bg-white"
                  value={selectedVendor || ""}
                  onChange={(e) => setSelectedVendor(e.target.value)}
                >
                  <option value="">Tanpa Vendor</option>
                  {vendorList.map(v => <option key={v.id_vendor} value={v.id_vendor}>{v.nama_vendor}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <Label text="Tahun" required />
                <Input type="number" value={tahun} onChange={(e) => setTahun(e.target.value)} />
              </div>
              <div>
                <Label text="Mulai" />
                <Input type="date" value={tanggalMulai} onChange={(e) => setTanggalMulai(e.target.value)} />
              </div>
              <div>
                <Label text="Selesai" />
                <Input type="date" value={tanggalSelesai} onChange={(e) => setTanggalSelesai(e.target.value)} />
              </div>
            </div>

            <div className="mb-8 w-full md:w-1/2">
              <Label text="Status Program" required />
              <select 
                className="w-full border p-2 rounded bg-white font-bold text-blue-800"
                value={statusProgram}
                onChange={(e) => setStatusProgram(e.target.value)}
              >
                <option value="SELESAI">SELESAI</option>
                <option value="DIBATALKAN">DIBATALKAN</option>
              </select>
            </div>

            <div className="mb-8 border-t pt-6">
              <Label text="Dokumen Lampiran" />
              <div className="mt-2 space-y-3">
                <label className="flex items-center gap-2 w-fit px-4 py-2 bg-gray-100 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                  <Plus size={20} className="text-gray-500" />
                  <span className="text-sm text-gray-700">Tambah File Dokumen</span>
                  <input type="file" className="hidden" multiple onChange={handleFileChange} />
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {dokumenList.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-blue-50 border border-blue-100 rounded-lg">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FileText size={16} className="text-blue-400 shrink-0" />
                        <span className="text-xs truncate text-blue-700">{doc.nama_asli}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => removeFile(index)} 
                        className="text-red-500 hover:bg-red-50 p-1 rounded"
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
                text={isSaving ? "Menyimpan..." : "Update Program"} 
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

export default EditProgramAkademik;