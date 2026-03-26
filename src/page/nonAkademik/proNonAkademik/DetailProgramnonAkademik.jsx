import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import { FileText, Download, Info } from "lucide-react"; 

function DetailProgramNonAkademik() {
  const navigate = useNavigate();
  const { id } = useParams();

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
        console.error("Gagal mengambil detail program non-akademik:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProgram();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F3F4F4]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E5AA7]"></div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F3F4F4]">
        <p className="text-gray-500 font-semibold">Data program non-akademik tidak ditemukan.</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "AKTIF": return "bg-green-100 text-green-800 border-green-200";
      case "SELESAI": return "bg-blue-100 text-blue-800 border-blue-200";
      case "DIBATALKAN": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#2E5AA7] to-[#4989C2] min-h-screen p-4 flex flex-col lg:flex-row gap-3">
      <Sidebar />
      <main className="flex-1 flex flex-col bg-[#F3F4F4] rounded-[25px] lg:rounded-[40px] px-10 pt-6 pb-9 overflow-auto">
        <div className="flex items-center justify-between mt-3 mb-6">
          <h1 className="text-xl font-semibold text-gray-500">Detail Program Non-Akademik</h1>
          <Button text="← Kembali" variant="ghost" onClick={() => navigate(-1)} />
        </div>

        <div className="flex flex-col w-full gap-6">
          {/* CARD UTAMA */}
          <Card className="w-full bg-white rounded-2xl shadow-md p-6 border-l-8 border-amber-500">
            <div className="flex justify-between items-start mb-6 border-b pb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{program.nama_program}</h2>
                <p className="text-sm font-semibold text-gray-500">
                  Kode: {program.kode_program || "-"} | Jenis: {program.jenis_program || "NON AKADEMIK"}
                </p>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold border shadow-sm ${getStatusColor(program.status_program)}`}>
                {program.status_program}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Sekolah</p>
                <p className="font-semibold text-gray-700">{program.nama_sekolah || program.sekolah || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Vendor / Pelaksana</p>
                <p className="font-semibold text-gray-700">{program.nama_vendor || program.vendor || "Internal"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Tahun Program</p>
                <p className="font-semibold text-gray-700">{program.tahun}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">PIC Entry</p>
                <p className="font-semibold text-gray-700">{program.dibuat_oleh || "Admin"}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 bg-amber-50/50 p-4 rounded-lg border border-amber-100">
               <div>
                <p className="text-xs text-amber-600 font-medium uppercase tracking-wider mb-1">Tanggal Mulai</p>
                <p className="font-semibold text-gray-800">{program.tanggal_mulai ? new Date(program.tanggal_mulai).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : "-"}</p>
              </div>
              <div>
                <p className="text-xs text-amber-600 font-medium uppercase tracking-wider mb-1">Tanggal Selesai</p>
                <p className="font-semibold text-gray-800">{program.tanggal_selesai ? new Date(program.tanggal_selesai).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : "-"}</p>
              </div>
            </div>
          </Card>

          {/* DESKRIPSI */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-700 px-2 mt-2">Deskripsi Kegiatan</h2>
            <Card className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-500 text-white shrink-0 shadow-sm">
                    <Info size={20} />
                </div>
                <div className="pt-1.5 w-full">
                  {program.deskripsi ? (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-justify">{program.deskripsi}</p>
                  ) : (
                    <p className="text-gray-400 italic">Tidak ada deskripsi kegiatan untuk program ini.</p>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* DOKUMEN LAMPIRAN */}
          <div className="flex flex-col gap-4 mb-6">
            <h2 className="text-lg font-bold text-gray-700 px-2 mt-4">Dokumen Pendukung</h2>
            <Card className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              {program.dokumen && program.dokumen.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {program.dokumen.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-100 hover:bg-orange-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                          <FileText className="text-orange-600" size={24} />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-bold text-gray-800 truncate max-w-[200px] sm:max-w-xs">
                            {doc.nama_asli}
                          </p>
                          <p className="text-xs text-gray-500 font-medium">
                            {doc.tipe?.split('/')[1]?.toUpperCase() || 'FILE'} • {(doc.ukuran / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <a 
                        href={`http://localhost:3000/${doc.url}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex items-center gap-2 bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-orange-700 transition-all shadow-sm"
                      >
                        <Download size={16} /> <span className="hidden sm:inline">Download</span>
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center py-6">
                  <FileText className="text-gray-200 mb-2" size={48} />
                  <p className="text-gray-400 italic text-sm">Belum ada dokumen yang diunggah.</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DetailProgramNonAkademik;