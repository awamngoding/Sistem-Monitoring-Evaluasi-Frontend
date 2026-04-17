import Sidebar from "../../components/Sidebar";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { ClipboardCheck, FolderKanban, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DashboardnonAkademik() {
  const [user, setUser] = useState({ nama: "", role: "", jenis: null });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const d = jwtDecode(token);
        setUser({
          nama: d.nama ?? d.email ?? "User",
          role: d.nama_role ?? d.role ?? "-",
          jenis: d.jenis ?? null,
        });
      } catch {
        localStorage.clear();
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const cards = [
    {
      icon: <ClipboardCheck size={28} className="text-orange-500" />,
      label: "Assessment Non-Akademik",
      desc: "Kelola dan pantau assessment non-akademik sekolah binaan",
      path: "/ho/assessment/non-akademik",
      bg: "bg-orange-50",
      border: "border-orange-200",
    },
    {
      icon: <FolderKanban size={28} className="text-rose-500" />,
      label: "Program Kegiatan",
      desc: "Kelola program kegiatan non-akademik sekolah binaan",
      path: "/ho/program/non-akademik",
      bg: "bg-rose-50",
      border: "border-rose-200",
    },
    {
      icon: <CalendarDays size={28} className="text-teal-500" />,
      label: "List Schedule",
      desc: "Lihat jadwal kegiatan non-akademik",
      path: "/ho/penjadwalan/non-akademik",
      bg: "bg-teal-50",
      border: "border-teal-200",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        {/* HEADER */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-[#1E5AA5] uppercase tracking-widest mb-1">
            Head Office — Non Akademik
          </p>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Selamat datang,{" "}
            <span className="font-semibold text-[#1E5AA5]">{user.nama}</span>
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <button
              key={card.path}
              onClick={() => navigate(card.path)}
              className={`text-left rounded-2xl border ${card.border} ${card.bg} p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 active:scale-95`}
            >
              <div className="mb-4">{card.icon}</div>
              <p className="font-bold text-gray-800 text-base">{card.label}</p>
              <p className="text-xs text-gray-500 mt-1">{card.desc}</p>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
