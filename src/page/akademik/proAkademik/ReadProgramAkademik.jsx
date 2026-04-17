/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import Sidebar from "../../../components/Sidebar";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Search from "../../../components/Search";
import Table from "../../../components/Table";
import Dropdown from "../../../components/Dropdown";
import PageWrapper from "../../../components/PageWrapper";
import Label from "../../../components/Label";
import Pagination from "../../../components/Pagination";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import {
  Eye,
  FileText,
  Plus,
  Filter,
  Edit,
  Trash2,
  MoreHorizontal,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { useState, useEffect } from "react";

function ReadProgramAkademik() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [programs, setPrograms] = useState([]);

  const limit = 10;
  const start = (page - 1) * limit;
  const end = start + limit;

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      const newStatus = currentStatus === "Aktif" ? "Draft" : "Aktif";

      const res = await fetch(`http://localhost:3000/program/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status_program: newStatus }),
      });

      if (!res.ok) throw new Error("Gagal mengubah status");

      toast.success(`Status program berhasil diubah menjadi ${newStatus}`);
      // Refresh data
      const fetchRes = await fetch(
        "http://localhost:3000/program?kategori=AKADEMIK",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await fetchRes.json();
      setPrograms(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengubah status program");
    }
  };

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "http://localhost:3000/program?kategori=AKADEMIK",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (!res.ok) throw new Error("Gagal mengambil data program");

        const data = await res.json();
        setPrograms(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        toast.error("Gagal memuat daftar program.");
      }
    };

    fetchPrograms();
  }, []);

  const filteredPrograms = programs
    .filter((item) => {
      if (filterStatus === "Semua") return true;
      return item.status_program?.toLowerCase() === filterStatus.toLowerCase();
    })
    .filter((item) =>
      [item.nama_program, item.sekolah, item.kode_program]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
    );

  const currentData = filteredPrograms.slice(start, end);
  const totalPages = Math.ceil(filteredPrograms.length / limit) || 1;

  const filterOptions = [
    { label: "Semua", value: "Semua" },
    { label: "Aktif", value: "Aktif" },
    { label: "Draft", value: "Draft" },
  ];

  const tableColumns = [
    {
      header: "NO",
      align: "text-center w-[60px]",
      render: (_, index) => (
        <span className="text-[10px] font-mono font-bold text-gray-400">
          {String(start + index + 1).padStart(2, "0")}
        </span>
      ),
    },
    {
      header: "KODE PROGRAM",
      align: "text-left",
      render: (row) => (
        <span className="font-mono text-gray-600 text-[11px] font-bold uppercase tracking-wider">
          {row.kode_program || "-"}
        </span>
      ),
    },
    {
      header: "NAMA PROGRAM",
      align: "text-left",
      render: (row) => (
        <span className="font-black text-gray-800 text-[11px] uppercase leading-tight">
          {row.nama_program || "-"}
        </span>
      ),
    },
    {
      header: "SEKOLAH",
      align: "text-left",
      render: (row) => (
        <span className="text-gray-600 text-[10px] font-bold">
          {row.sekolah || "-"}
        </span>
      ),
    },
    {
      header: "PENGAWAS",
      align: "text-center",
      render: (row) => (
        <span className="text-gray-600 text-[10px] font-bold">
          {row.pengawas || "-"}
        </span>
      ),
    },
    {
      header: "TAHUN",
      align: "text-center",
      render: (row) => (
        <span className="font-mono text-gray-600 text-[10px] font-bold">
          {row.tahun || "-"}
        </span>
      ),
    },
    {
      header: "STATUS",
      align: "text-center",
      render: (row) => (
        <span
          className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-wider border ${
            row.status_program === "Aktif"
              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
              : "bg-amber-50 text-amber-600 border-amber-100"
          }`}
        >
          {row.status_program || "Draft"}
        </span>
      ),
    },
    {
      header: "AKSI",
      align: "text-center w-[140px]",
      render: (row) => (
        <div className="flex justify-center gap-2">
          <Button
            text=""
            icon={<Eye size={12} />}
            onClick={() => navigate(`/ho/program/akademik/detail/${row.id_program}`)}
            className="!bg-amber-50 !text-amber-600 hover:!bg-amber-600 hover:!text-white !rounded-lg !px-3 !py-2 !w-auto !h-auto transition-all shadow-sm"
          />
          <Button
            text=""
            icon={<Edit size={12} />}
            onClick={() => navigate(`/ho/program/akademik/edit/${row.id_program}`)}
            className="!bg-blue-50 !text-blue-600 hover:!bg-blue-600 hover:!text-white !rounded-lg !px-3 !py-2 !w-auto !h-auto transition-all shadow-sm"
          />
          <Button
            text=""
            icon={row.status_program === "Aktif" ? <ToggleRight size={12} /> : <ToggleLeft size={12} />}
            onClick={() => handleToggleStatus(row.id_program, row.status_program)}
            className={`!rounded-lg !px-3 !py-2 !w-auto !h-auto transition-all shadow-sm ${
              row.status_program === "Aktif"
                ? "!bg-emerald-50 !text-emerald-600 hover:!bg-emerald-600 hover:!text-white"
                : "!bg-gray-50 !text-gray-600 hover:!bg-gray-600 hover:!text-white"
            }`}
          />
        </div>
      ),
    },
  ];

  return (
    <PageWrapper className="h-screen bg-[#EEF5FF] flex overflow-hidden !p-0">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden px-4 md:px-12 pt-6 md:pt-10 pb-0">
        <Card className="flex-1 flex flex-col !m-0 !p-0 rounded-t-[2.5rem] rounded-b-[2.5rem] border-none shadow-2xl bg-white overflow-hidden relative">
          <div className="px-8 pt-6 pb-6 shrink-0">
            <header className="flex flex-row items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-orange-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition animate-pulse"></div>
                  <div className="relative p-3.5 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl text-white shadow-xl">
                    <FileText size={22} strokeWidth={2} />
                  </div>
                </div>
                <div className="flex flex-col -space-y-1">
                  <Label
                    text="Sistem Monitoring dan Evaluasi Program"
                    className="!text-[8px] !text-[#1E5AA5] !font-black tracking-[0.3em] !mb-1 uppercase"
                  />
                  <h1 className="text-xl font-black text-gray-800 tracking-tight uppercase leading-none">
                    Master Data{" "}
                    <span className="text-orange-500">Program Akademik</span>
                  </h1>
                </div>
              </div>

              <Button
                text="+ Tambah Program"
                icon={<Plus size={14} />}
                onClick={() => navigate("/ho/program/akademik/create")}
                className="group !bg-orange-500 hover:!bg-orange-700 !rounded-xl !px-5 !py-2.5 !text-[10px] font-black text-white shadow-lg active:scale-95 transition-all flex items-center gap-2"
              />
            </header>

            <div className="flex flex-row items-center gap-3">
              <div className="flex items-center gap-3 px-5 py-2.5 bg-orange-50 text-orange-600 rounded-xl border border-orange-100 font-black text-[9px] uppercase tracking-[0.2em] shrink-0">
                <FileText size={14} /> Total: {filteredPrograms.length} Program
              </div>
              <div className="w-72">
                <Search
                  placeholder="Cari program..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="!pl-12 !pr-4 !py-2.5 !bg-gray-50/80 !border-gray-200/50 !rounded-xl !text-[11px] !font-bold outline-none focus:!bg-white focus:!ring-4 focus:!ring-orange-100/50 transition-all shadow-sm"
                />
              </div>
              <div className="w-48">
                <Dropdown
                  label="Status"
                  items={filterOptions}
                  value={filterStatus}
                  onChange={setFilterStatus}
                  className="!bg-gray-50/80 !border-gray-200/50 !rounded-xl !text-[11px] !font-bold focus:!bg-white focus:!ring-4 focus:!ring-orange-100/50 transition-all shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col px-10 pb-4">
            <div className="flex-1 bg-white border border-gray-100 rounded-3xl overflow-hidden flex flex-col shadow-sm">
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <Table
                  columns={tableColumns}
                  data={currentData}
                  className="min-w-full"
                />
                {currentData.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full py-20 opacity-20 text-gray-900">
                    <FileText size={40} className="mb-2" />
                    <p className="text-xs font-black uppercase tracking-widest">
                      Data Tidak Ditemukan
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="px-10 py-5 bg-gray-50/50 shrink-0 border-t border-gray-100">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              className="!justify-center"
            />
          </div>
        </Card>
      </main>
    </PageWrapper>
  );
}

export default ReadProgramAkademik;
