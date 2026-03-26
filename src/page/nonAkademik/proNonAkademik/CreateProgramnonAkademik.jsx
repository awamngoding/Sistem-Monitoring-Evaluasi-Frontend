/* eslint-disable no-undef */
import Sidebar from "../../../components/Sidebar";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import Input from "../../../components/Input";
import bgImage from "../../../assets/img/wayangkulit.jpg";
import { toast } from "react-toastify";
// Tambahkan Plus di sini
import { FileText, X, Plus } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function CreateProgramNonAkademik() {
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
      kategori: "NON_AKADEMIK", 
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
    } finally {
      setLoading(false);
    }
  };

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

 
  
  

  return (
    <div className="bg-gradient-to-b from-[#2E5AA7] to-[#4989C2] min-h-screen p-4 flex flex-col lg:flex-row gap-3">
      <Sidebar />
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
        </div>
      </main>
    </div>
  );
}

export default CreateProgramNonAkademik;