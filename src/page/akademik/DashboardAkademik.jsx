/* eslint-disable no-unused-vars */
import Sidebar from "../../components/Sidebar";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Search from "../../components/Search";
import Table from "../../components/Table";
import Toggle from "../../components/Toggle";
import Dropdown from "../../components/Dropdown";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Send } from "lucide-react";

import { useState, useEffect } from "react";

function DashboardAkademik() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("aktif");
  const [toggling, setToggling] = useState({});
  const [assessments, setAssessments] = useState([]);

  const limit = 10;
  const start = (page - 1) * limit;
  const end = start + limit;

  const hitungRemaining = (sent_at, tenggat) => {
    if (!sent_at) return "-";
    const deadline = new Date(sent_at);
    deadline.setDate(deadline.getDate() + (tenggat ?? 7));
    const now = new Date();
    const diff = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? `${diff} hari lagi` : "Tenggat habis";
  };

  const filteredAssessments = assessments
    .filter((item) => {
      if (filterStatus === "aktif") return item.aktif;
      if (filterStatus === "nonaktif") return !item.aktif;
      return true;
    })
    .filter((item) =>
      [item.nama, item.ho, item.sekolah]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
    );

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/assessment?jenis=akademik",
        );
        const data = await res.json();

        const mapped = data.map((item) => ({
          id: item.id_assessment,
          nama: item.nama ?? "-",
          ho: item.ho ?? "-",
          sekolah: item.sekolah ?? "-",
          jumlah_pengisi: item.jumlah_pengisi ?? 0,
          sent: item.status === "Proses Pengisian",
          sent_at: item.sent_at,
          tenggat: item.tenggat ?? 7,
          aktif: item.aktif ?? true,
        }));

        setAssessments(mapped);
      } catch (err) {
        console.error("Gagal mengambil assessment", err);
      }
    };

    fetchAssessments();
  }, []);

  const currentData = filteredAssessments.slice(start, end);
  const totalPages = Math.ceil(filteredAssessments.length / limit);

  const handleSend = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/assessment/${id}/send`, {
        method: "PATCH",
      });

      if (!res.ok) throw new Error(`Status ${res.status}`);

      setAssessments((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, sent: true, sent_at: new Date().toISOString() }
            : item,
        ),
      );

      toast.success("Assessment berhasil dikirim ke sekolah!");
    } catch (err) {
      console.error("Gagal mengirim assessment:", err);
      toast.error("Gagal mengirim assessment");
    }
  };

  const handleToggleAktif = async (id) => {
    try {
      if (toggling[id]) return;
      setToggling((prev) => ({ ...prev, [id]: true }));

      const res = await fetch(
        `http://localhost:3000/assessment/${id}/toggle-aktif`,
        { method: "PATCH" },
      );

      if (!res.ok) throw new Error(`Status ${res.status}`);

      setAssessments((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, aktif: !item.aktif } : item,
        ),
      );
    } catch (err) {
      console.error("Gagal toggle aktif:", err);
    } finally {
      setToggling((prev) => ({ ...prev, [id]: false }));
    }
  };

  const filterOptions = [
    { label: "Semua", value: "semua" },
    { label: "Aktif", value: "aktif" },
    { label: "Nonaktif", value: "nonaktif" },
  ];

  return (
    <div className="bg-gradient-to-b from-[#2E5AA7] to-[#4989C2] min-h-screen p-4 flex flex-col lg:flex-row gap-3">
      <Sidebar />

      <main className="flex-1 flex flex-col bg-[#F3F4F4] rounded-[25px] lg:rounded-[40px] px-10 pt-6 pb-9 overflow-auto">
        <h1 className="text-xl font-semibold text-gray-500 mt-3 mb-4 text-center">
          Riwayat Assessment Akademik
        </h1>

        <div className="flex flex-col h-full gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-72">
                <Search
                  placeholder="Cari assessment..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="w-48">
                <Dropdown
                  label="Status"
                  items={filterOptions}
                  value={filterStatus}
                  onChange={setFilterStatus}
                />
              </div>
            </div>
            <Button
              text="+ Tambah Data"
              onClick={() => navigate("/ho/assessment/akademik/create")}
            />
          </div>

          <Card className="w-full bg-white/80 flex-1 rounded-xl shadow-md p-4">
            <Table
              columns={[
                {
                  header: "No",
                  align: "text-center",
                  render: (row, idx) => start + idx + 1,
                },
                { header: "Nama Assessment", accessor: "nama" },
                { header: "Nama HO", accessor: "ho" },
                { header: "Sekolah", accessor: "sekolah" },
                {
                  header: "Jumlah Pengisi",
                  align: "text-center",
                  render: (row) => (
                    <span className="text-gray-600 text-sm">
                      {row.jumlah_pengisi} orang
                    </span>
                  ),
                },
                {
                  header: "Tenggat",
                  align: "text-center",
                  render: (row) => (
                    <span className="text-gray-600 text-sm">
                      {hitungRemaining(row.sent_at, row.tenggat)}
                    </span>
                  ),
                },
                {
                  header: "Aksi",
                  align: "text-center",
                  render: (row) => (
                    <div className="flex justify-center gap-2">
                      <Button
                        icon={<Eye size={16} />}
                        variant="ghost"
                        className="text-amber-500 hover:text-amber-600 hover:bg-transparent shadow-none"
                        onClick={() =>
                          navigate(`/ho/assessment/akademik/detail/${row.id}`)
                        }
                      />
                      {!row.sent && (
                        <Button
                          icon={<Pencil size={16} />}
                          variant="ghost"
                          className="text-yellow-500 hover:text-yellow-600 hover:bg-transparent shadow-none"
                          onClick={() =>
                            navigate(`/ho/assessment/akademik/edit/${row.id}`)
                          }
                        />
                      )}
                      {!row.sent && (
                        <Button
                          icon={<Send size={16} />}
                          variant="ghost"
                          className="text-green-500 hover:text-green-600 hover:bg-transparent shadow-none"
                          onClick={() => handleSend(row.id)}
                        />
                      )}
                      <Toggle
                        checked={row.aktif}
                        onChange={() => handleToggleAktif(row.id)}
                        disabled={toggling[row.id]}
                      />
                    </div>
                  ),
                },
              ]}
              data={currentData}
            />
          </Card>

          <div className="flex items-center justify-center gap-4">
            <Button
              text="◀ Prev"
              variant="ghost"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            />
            <span className="text-sm text-gray-600 font-medium">
              {page} / {totalPages}
            </span>
            <Button
              text="Next ▶"
              variant="ghost"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardAkademik;
