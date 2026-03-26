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
import { Eye, Pencil, Send, RefreshCcw } from "lucide-react"; 
import { useState, useEffect } from "react";

function DashboardNonAkademik() {
  const navigate = useNavigate();
  const location = useLocation();

  // PENENTUAN MODE BERDASARKAN URL
  // Jika URL mengandung "program", maka mode = program. Jika tidak (default dashboard), maka mode = assessment.
  const isProgramMode = location.pathname.includes("/program/non-akademik");
  const mode = isProgramMode ? "program" : "assessment";

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("aktif");
  const [filterStatusProgram, setFilterStatusProgram] = useState("SEMUA");

  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);

  const limit = 10;
  const start = (page - 1) * limit;

  // --- HELPER ---
  const hitungRemaining = (sent_at, tenggat) => {
    if (!sent_at) return "-";
    const deadline = new Date(sent_at);
    deadline.setDate(deadline.getDate() + (tenggat ?? 7));
    const now = new Date();
    const diff = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? `${diff} hari lagi` : "Tenggat habis";
  };

  // --- FETCH DATA ---
  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      if (mode === "assessment") {
        const res = await fetch("http://localhost:3000/assessment?jenis=non-akademik", { headers });
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
        setDataList(mapped);
      } else {
        const res = await fetch("http://localhost:3000/program?kategori=NON_AKADEMIK&include_deleted=true", { headers });
        const data = await res.json();
        const mapped = Array.isArray(data) ? data.map((item) => ({
          id: item.id_program,
          nama: item.nama_program ?? "-",
          sekolah: item.nama_sekolah || item.sekolah || "-", 
          vendor: item.nama_vendor || item.vendor || "-",
          tahun: item.tahun ?? "-",
          status: item.status_program ?? "AKTIF",
          is_deleted: item.is_deleted ?? false,
        })) : [];
        setDataList(mapped);
      }
    } catch (err) {
      console.error(`Gagal ambil data ${mode}`, err);
      toast.error("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch setiap kali URL (location.pathname) berubah
  useEffect(() => {
    fetchData();
    setPage(1); 
    setSearch(""); // Reset pencarian saat pindah menu
  }, [location.pathname]);

  // --- ACTIONS ---
  const handleToggleProgramStatus = async (id, currentStatus) => {
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
        setDataList((prev) => prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p)));
      }
    } catch (err) {
      toast.error("Gagal mengubah status");
    }
  };

  const handleRestoreProgram = async (id) => {
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
        toast.success("Program berhasil dipulihkan!");
        setDataList((prev) => prev.map((p) => (p.id === id ? { ...p, is_deleted: false } : p)));
      }
    } catch (err) {
      toast.error("Gagal memulihkan program");
    }
  };

  // --- FILTER LOGIC ---
  const filteredData = dataList
    .filter((item) => {
      if (mode === "program") {
        if (filterStatusProgram === "TERHAPUS") return item.status === "DIBATALKAN" || item.is_deleted === true;
        if (item.status === "DIBATALKAN" || item.is_deleted) return false;
        if (filterStatusProgram === "SEMUA") return true;
        return item.status === filterStatusProgram;
      }
      if (mode === "assessment") {
        if (filterStatus === "aktif") return item.aktif;
        if (filterStatus === "nonaktif") return !item.aktif;
        return true;
      }
      return true;
    })
    .filter((item) => {
      const searchString = mode === "assessment" 
        ? [item.nama, item.ho, item.sekolah].join(" ").toLowerCase()
        : [item.nama, item.sekolah, item.vendor].join(" ").toLowerCase();
      return searchString.includes(search.toLowerCase());
    });

  const currentData = filteredData.slice(start, start + limit);
  const totalPages = Math.max(1, Math.ceil(filteredData.length / limit));

  // --- COLUMNS CONFIG ---
  const columns = mode === "assessment" ? [
    { header: "No", align: "text-center", render: (p, idx) => start + idx + 1 },
    { header: "Nama Assessment", accessor: "nama" },
    { header: "Nama HO", accessor: "ho" },
    { header: "Sekolah", accessor: "sekolah" },
    { header: "Tenggat", align: "text-center", render: (row) => <span className="text-sm">{hitungRemaining(row.sent_at, row.tenggat)}</span> },
    { header: "Aksi", align: "text-center", render: (row) => (
        <div className="flex justify-center gap-2">
          <Button icon={<Eye size={16} />} variant="ghost" className="text-amber-500 hover:bg-transparent shadow-none" onClick={() => navigate(`/ho/assessment/non-akademik/detail/${row.id}`)} />
          <Button icon={<Pencil size={16} />} variant="ghost" className="text-yellow-500 hover:bg-transparent shadow-none" onClick={() => navigate(`/ho/assessment/non-akademik/edit/${row.id}`)} />
          <Button icon={<Send size={16} />} variant="ghost" className="text-green-500 hover:bg-transparent shadow-none" />
          <Toggle checked={row.aktif} onChange={() => {}} />
        </div>
      )
    },
  ] : [
    { header: "No", align: "text-center", render: (p, idx) => start + idx + 1 },
    { header: "Nama Program", accessor: "nama" },
    { header: "Sekolah", accessor: "sekolah" },
    { header: "Vendor", accessor: "vendor" },
    { header: "Status", align: "text-center", render: (row) => (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.status === 'AKTIF' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
        {row.status}
      </span>) 
    },
    { header: "Aksi", align: "text-center", render: (row) => (
      <div className="flex justify-center items-center gap-2">
        <Button icon={<Eye size={16} />} variant="ghost" className="text-amber-500 hover:bg-transparent shadow-none" onClick={() => navigate(`/ho/program/non-akademik/detail/${row.id}`)} />
        {!row.is_deleted && row.status !== "DIBATALKAN" ? (
          <>
            <Button icon={<Pencil size={16} />} variant="ghost" className="text-yellow-500 hover:bg-transparent shadow-none" onClick={() => navigate(`/ho/program/non-akademik/edit/${row.id}`)} />
            <Toggle checked={row.status === "AKTIF"} onChange={() => handleToggleProgramStatus(row.id, row.status)} />
          </>
        ) : (
          <Button icon={<RefreshCcw size={16} />} variant="ghost" className="text-blue-500 hover:bg-transparent shadow-none" onClick={() => handleRestoreProgram(row.id)} />
        )}
      </div>
      )
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#2E5AA7] to-[#4989C2] min-h-screen p-4 flex flex-col lg:flex-row gap-3">
      <Sidebar />
      <main className="flex-1 flex flex-col bg-[#F3F4F4] rounded-[25px] lg:rounded-[40px] px-10 pt-6 pb-9 overflow-auto">
        <h1 className="text-xl font-semibold text-gray-500 mt-3 mb-6">
          {mode === "assessment" ? "Dashboard Assessment Non-Akademik" : "Program Kegiatan Non-Akademik"}
        </h1>

        <div className="flex flex-col h-full gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-72">
                <Search placeholder={`Cari ${mode === "assessment" ? "Assessment" : "Program"}...`} value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <div className="w-48">
                <Dropdown 
                  label="Filter Status" 
                  items={mode === "assessment" 
                    ? [{ label: "Semua", value: "semua" }, { label: "Aktif", value: "aktif" }, { label: "Nonaktif", value: "nonaktif" }] 
                    : [{ label: "Semua", value: "SEMUA" }, { label: "Aktif", value: "AKTIF" }, { label: "Selesai", value: "SELESAI" }, { label: "Terhapus", value: "TERHAPUS" }]} 
                  value={mode === "assessment" ? filterStatus : filterStatusProgram} 
                  onChange={mode === "assessment" ? setFilterStatus : setFilterStatusProgram} 
                />
              </div>
            </div>
            <Button text={`+ Tambah ${mode === "assessment" ? "Assessment" : "Program"}`} onClick={() => navigate(`/ho/${mode}/non-akademik/create`)} />
          </div>

          <Card className="w-full bg-white/80 flex-1 rounded-xl shadow-md p-4">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <Table columns={columns} data={currentData} />
            )}
          </Card>

          {/* PAGINATION */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <Button text="◀ Prev" variant="ghost" disabled={page <= 1} onClick={() => setPage(page - 1)} />
            <span className="text-sm text-gray-600 font-medium">{page} / {totalPages}</span>
            <Button text="Next ▶" variant="ghost" disabled={page >= totalPages} onClick={() => setPage(page + 1)} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardNonAkademik;