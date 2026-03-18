import Sidebar from "../../components/Sidebar";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Table from "../../components/Table";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { FileText, Pencil, Send } from "lucide-react";

function DashboardSekolah() {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);

  const hitungRemaining = (sent_at, tenggat) => {
    if (!sent_at) return "-";
    const deadline = new Date(sent_at);
    deadline.setDate(deadline.getDate() + (tenggat ?? 7));
    const now = new Date();
    const diff = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? `${diff} hari lagi` : "Tenggat habis";
  };

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        console.log("DECODED TOKEN:", decoded);
        const id_sekolah = decoded.id_sekolah;
        const id_user = decoded.sub;
        console.log("id_sekolah:", id_sekolah, "id_user:", id_user);

        const res = await fetch(
          `http://localhost:3000/assessment/sekolah/${id_sekolah}?id_user=${id_user}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const data = await res.json();
        setAssessments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Gagal mengambil assessment", err);
      }
    };

    fetchAssessments();
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#2E5AA7] to-[#4989C2] min-h-screen p-4 flex flex-col lg:flex-row gap-3">
      <Sidebar />

      <main className="flex-1 flex flex-col bg-[#F3F4F4] rounded-[25px] lg:rounded-[40px] px-10 pt-6 pb-9 overflow-auto">
        <h1 className="text-xl font-semibold text-gray-500 mt-3 mb-4 text-center">
          Dashboard Sekolah
        </h1>

        <Card className="w-full bg-white/80 flex-1 rounded-xl shadow-md p-4">
          <Table
            columns={[
              {
                header: "No",
                align: "text-center",
                render: (row, idx) => idx + 1,
              },
              { header: "Nama Assessment", accessor: "nama" },
              { header: "Nama HO", accessor: "ho" },
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
                header: "Status Pengisian",
                align: "text-center",
                render: (row) => (
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      row.sudah_diisi
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {row.sudah_diisi ? "Sudah Diisi" : "Belum Diisi"}
                  </span>
                ),
              },
              {
                header: "Aksi",
                align: "text-center",
                render: (row) => (
                  <div className="flex justify-center gap-2">
                    <Button
                      icon={<FileText size={16} />}
                      variant="ghost"
                      className="text-blue-500 hover:bg-transparent shadow-none"
                      onClick={() =>
                        navigate(`/sekolah/assessment/isi/${row.id_assessment}`)
                      }
                    />
                    {!row.sudah_diisi && (
                      <Button
                        icon={<Pencil size={16} />}
                        variant="ghost"
                        className="text-yellow-500 hover:bg-transparent shadow-none"
                        onClick={() =>
                          navigate(
                            `/sekolah/assessment/edit/${row.id_assessment}`,
                          )
                        }
                      />
                    )}
                  </div>
                ),
              },
            ]}
            data={assessments}
          />
        </Card>
      </main>
    </div>
  );
}

export default DashboardSekolah;
