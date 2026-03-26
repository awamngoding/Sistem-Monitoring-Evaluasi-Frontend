/* eslint-disable no-unused-vars */
import Sidebar from "../../components/Sidebar";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Search from "../../components/Search";
import Table from "../../components/Table";
import Toggle from "../../components/Toggle";
import Dropdown from "../../components/Dropdown";
import { toast } from "react-toastify";

import { useNavigate, useLocation } from "react-router-dom"; 
import { Eye, Pencil, Send, Trash2, RefreshCcw } from "lucide-react"; // Tambah RefreshCcw untuk restore

import { useState, useEffect } from "react";

function DashboardAkademik() {
  const navigate = useNavigate();
  const location = useLocation();

  const isProgramRoute = location.pathname.includes("/program/");
  const [activeTab, setActiveTab] = useState(isProgramRoute ? "program" : "assessment");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("aktif");
  
  // Perbaikan: Tambah opsi "TERHAPUS" di state filter
  const [filterStatusProgram, setFilterStatusProgram] = useState("SEMUA");
  const [toggling, setToggling] = useState({});

  const [assessments, setAssessments] = useState([]);
  const [programs, setPrograms] = useState([]);

  const limit = 10;
  const start = (page - 1) * limit;

  // --- LOGIKA HELPER ---
  const hitungRemaining = (sent_at, tenggat) => {
    if (!sent_at) return "-";
    const deadline = new Date(sent_at);
    deadline.setDate(deadline.getDate() + (tenggat ?? 7));
    const now = new Date();
    const diff = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? `${diff} hari lagi` : "Tenggat habis";
  };

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        if (activeTab === "assessment") {
          const res = await fetch("http://localhost:3000/assessment?jenis=akademik", { headers });
          const data = await res.json();
          const mapped = Array.isArray(data) ? data.map((item) => ({
            id: item.id_assessment,
            nama: item.nama ?? "-",
            ho: item.ho ?? "-",
            sekolah: item.nama_sekolah || item.sekolah || "-",
            jumlah_pengisi: item.jumlah_pengisi ?? 0,
            sent: item.status === "Proses Pengisian",
            sent_at: item.sent_at,
            tenggat: item.tenggat ?? 7,
            aktif: item.aktif ?? true,
          })) : [];
          setAssessments(mapped);
        } else {
          // Tambahkan query param agar backend tahu kita butuh semua data (termasuk yang is_deleted)
          const res = await fetch("http://localhost:3000/program?kategori=AKADEMIK&include_deleted=true", { headers });
          const data = await res.json();
          const mapped = Array.isArray(data) ? data.map((item) => ({
            id: item.id_program,
            nama: item.nama_program ?? "-",
            sekolah: item.nama_sekolah || item.sekolah || "-", 
            vendor: item.nama_vendor || item.vendor || "-",
            tahun: item.tahun ?? "-",
            status: item.status_program ?? "DRAFT",
            is_deleted: item.is_deleted ?? false, // Pastikan field ini datang dari DB
          })) : [];
          setPrograms(mapped);
        }
      } catch (err) {
        console.error(`Gagal mengambil data ${activeTab}`, err);
      }
    };

    fetchData();
    setPage(1); 
  }, [activeTab]);

  // --- LOGIKA FILTER (SOFT DELETE) ---
 // --- LOGIKA FILTER (SOFT DELETE & STATUS) ---
  const getFilteredData = () => {
    const sourceData = activeTab === "assessment" ? assessments : programs;
    
    return sourceData
      .filter((item) => {
        // --- LOGIKA FILTER TAB PROGRAM ---
        if (activeTab === "program") {
          // 1. Jika user pilih filter "TERHAPUS"
          if (filterStatusProgram === "TERHAPUS") {
            return item.status === "DIBATALKAN" || item.is_deleted === true;
          }
          
          // 2. Jika di filter lain (SEMUA, AKTIF, SELESAI), sembunyikan yang batal/dihapus
          if (item.status === "DIBATALKAN" || item.is_deleted) {
            return false;
          }

          // 3. Filter status spesifik (AKTIF/SELESAI) atau tampilkan SEMUA yang tidak terhapus
          if (filterStatusProgram === "SEMUA") return true;
          return item.status === filterStatusProgram;
        }
        
        // --- LOGIKA FILTER TAB ASSESSMENT ---
        if (activeTab === "assessment") {
          if (filterStatus === "aktif") return item.aktif;
          if (filterStatus === "nonaktif") return !item.aktif;
          return true;
        }

        return true;
      })
      .filter((item) => {
        // --- LOGIKA SEARCH ---
        const searchString = activeTab === "assessment" 
          ? [item.nama, item.ho, item.sekolah].join(" ").toLowerCase()
          : [item.nama, item.sekolah, item.vendor].join(" ").toLowerCase();
        
        return searchString.includes(search.toLowerCase());
      });
  };

  const filteredData = getFilteredData();
  const currentData = filteredData.slice(start, start + limit);
  const totalPages = Math.max(1, Math.ceil(filteredData.length / limit));

  // --- ACTIONS ---
const handleToggleProgramStatus = async (id, currentStatus) => {
    // Tentukan status baru kebalikannya
    const newStatus = currentStatus === "AKTIF" ? "NONAKTIF" : "AKTIF";
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/program/${id}`, {
        method: "PATCH",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status_program: newStatus })
      });

      if (res.ok) {
        toast.success(`Program sekarang ${newStatus}`);
        // Update state local biar UI langsung berubah
        setPrograms((prev) => 
          prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
        );
      } else {
        toast.error("Gagal mengubah status");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan sistem");
    }
  };

const handleRestoreProgram = async (id) => {
  // Kasih konfirmasi biar gak typo klik
  if (!window.confirm("Aktifkan kembali program ini?")) return;

  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3000/program/${id}/restore`, {
      method: "PATCH", 
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    if (res.ok) {
      toast.success("Program berhasil diaktifkan kembali!");
      
      // Update state local: kita ubah is_deleted jadi false
      // Otomatis dia bakal ilang dari list "Terhapus" karena filter kita tadi
      setPrograms((prev) => 
        prev.map((p) => (p.id === id ? { ...p, is_deleted: false } : p))
      );
    } else {
      const errorData = await res.json();
      toast.error(errorData.message || "Gagal memulihkan program");
    }
  } catch (err) {
    console.error("Error restore:", err);
    toast.error("Terjadi kesalahan sistem saat memulihkan program");
  }
};

  // --- COLUMNS ---
  const assessmentColumns = [
    { header: "No", align: "text-center", render: (row, idx) => start + idx + 1 },
    { header: "Nama Assessment", accessor: "nama" },
    { header: "Nama HO", accessor: "ho" },
    { header: "Sekolah", accessor: "sekolah" },
    { header: "Jumlah Pengisi", align: "text-center", render: (row) => (<span className="text-gray-600 text-sm">{row.jumlah_pengisi} orang</span>) },
    { header: "Tenggat", align: "text-center", render: (row) => (<span className="text-gray-600 text-sm">{hitungRemaining(row.sent_at, row.tenggat)}</span>) },
    { header: "Aksi", align: "text-center", render: (row) => (
        <div className="flex justify-center gap-2">
          <Button icon={<Eye size={16} />} variant="ghost" className="text-amber-500 hover:bg-transparent shadow-none" onClick={() => navigate(`/ho/assessment/akademik/detail/${row.id}`)} />
          {!row.sent && <Button icon={<Pencil size={16} />} variant="ghost" className="text-yellow-500 hover:bg-transparent shadow-none" onClick={() => navigate(`/ho/assessment/akademik/edit/${row.id}`)} />}
          {!row.sent && <Button icon={<Send size={16} />} variant="ghost" className="text-green-500 hover:bg-transparent shadow-none" onClick={() => handleSend(row.id)} />}
          <Toggle checked={row.aktif} onChange={() => handleToggleAktif(row.id)} />
        </div>
      )
    },
  ];

 const programColumns = [
    { header: "No", align: "text-center", render: (row, idx) => start + idx + 1 },
    { header: "Nama Program", accessor: "nama" },
    { header: "Sekolah", accessor: "sekolah" },
    { header: "Vendor", accessor: "vendor" },
    { header: "Tahun", align: "text-center", accessor: "tahun" },
    { header: "Status", align: "text-center", render: (row) => (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
        row.status === 'AKTIF' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
        {row.status}
      </span>) 
    },
    { header: "Aksi", align: "text-center", render: (row) => (
      <div className="flex justify-center items-center gap-2">
        <Button icon={<Eye size={16} />} variant="ghost" className="text-amber-500 hover:bg-transparent shadow-none" onClick={() => navigate(`/ho/program/akademik/detail/${row.id}`)} />
        <Button icon={<Pencil size={16} />} variant="ghost" className="text-yellow-500 hover:bg-transparent shadow-none" onClick={() => navigate(`/ho/program/akademik/edit/${row.id}`)} />
        
        {/* INI TOGGLE-NYA */}
        <Toggle 
          checked={row.status === "AKTIF"} 
          onChange={() => handleToggleProgramStatus(row.id, row.status)} 
        />
      </div>
      )
    },
  ];
  return (
    <div className="bg-gradient-to-b from-[#2E5AA7] to-[#4989C2] min-h-screen p-4 flex flex-col lg:flex-row gap-3">
      <Sidebar />
      <main className="flex-1 flex flex-col bg-[#F3F4F4] rounded-[25px] lg:rounded-[40px] px-10 pt-6 pb-9 overflow-auto">
        <h1 className="text-xl font-semibold text-gray-500 mt-3 mb-4 text-center">Dashboard Akademik</h1>
        
        <div className="flex flex-col h-full gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-72">
                <Search placeholder={`Cari ${activeTab}...`} value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              
              {activeTab === "assessment" && (
                <div className="w-48">
                  <Dropdown label="Status" items={[{ label: "Semua", value: "semua" }, { label: "Aktif", value: "aktif" }, { label: "Nonaktif", value: "nonaktif" }]} value={filterStatus} onChange={setFilterStatus} />
                </div>
              )}

              {activeTab === "program" && (
                <div className="w-48">
                  <Dropdown 
                    label="Status Program" 
                    items={[
                      { label: "Semua", value: "SEMUA" }, 
                      { label: "Aktif", value: "AKTIF" }, 
                      { label: "Selesai", value: "SELESAI" }, 
                      { label: "Terhapus (Dibatalkan)", value: "TERHAPUS" } // Tambah item ini
                    ]} 
                    value={filterStatusProgram} 
                    onChange={setFilterStatusProgram} 
                  />
                </div>
              )}
            </div>
            <Button text={`+ Tambah ${activeTab === 'assessment' ? 'Assessment' : 'Program'}`} onClick={() => navigate(`/ho/${activeTab}/akademik/create`)} />
          </div>

          <Card className="w-full bg-white/80 flex-1 rounded-xl shadow-md p-4">
            <Table columns={activeTab === "assessment" ? assessmentColumns : programColumns} data={currentData} />
          </Card>

          <div className="flex items-center justify-center gap-4">
            <Button text="◀ Prev" variant="ghost" disabled={page <= 1} onClick={() => setPage(page - 1)} />
            <span className="text-sm text-gray-600 font-medium">{page} / {totalPages}</span>
            <Button text="Next ▶" variant="ghost" disabled={page >= totalPages} onClick={() => setPage(page + 1)} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardAkademik;