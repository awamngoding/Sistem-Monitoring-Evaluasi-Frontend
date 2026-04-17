/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  ArrowLeft,
  LogOut,
  ClipboardCheck,
  FolderKanban,
  LayoutDashboard,
  ChevronDown,
  Database,
  Clock,
  Menu as MenuIcon,
  X,
  User,
  Shield,
  CalendarDays,
  BarChart3,
  Settings,
  MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import logo_ypamdr from "../assets/img/logo_ypamdr.png";

export default function Sidebar() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [user, setUser] = useState({ nama: "", role: "", jenis: null });
  const [isMasterOpen, setIsMasterOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // --- LOGIC TIME (Real-time Clock) ---
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      );
      setDate(
        now.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // --- LOGIC AUTH & USER (Ambil Data Token) ---
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
  }, [location.pathname, navigate]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // --- LOGIC ROLE DETECTION (PERBAIKAN KRUSIAL) ---
  // --- LOGIC ROLE DETECTION (PERBAIKAN KRUSIAL) ---
  const roleUser = (user.role?.trim() || "").toLowerCase();
  const isAdmin = roleUser === "admin";
  const isHO = roleUser === "ho";

  // Deteksi Jenis
  const jenisRaw = (user.jenis?.trim() || "").toLowerCase();
  const isNonAkademik = jenisRaw.includes("non");
  const isAkademik = !isNonAkademik && jenisRaw.includes("akademik");
  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  // --- DINAMIS NAV ITEMS (Sesuai Path di App.jsx kamu) ---
  const navItems = [
    // --- ADMIN ---
    ...(isAdmin
      ? [
          {
            icon: <LayoutDashboard size={20} />,
            label: "Dashboard",
            path: "/admin/dashboard",
            exact: true,
          },
        ]
      : []),

    // --- HO (AKADEMIK / NON-AKADEMIK) ---
    ...(isHO
      ? [
          {
            icon: <LayoutDashboard size={20} />,
            label: "Dashboard",
            path: isAkademik
              ? "/ho/dashboard/akademik"
              : "/ho/dashboard/non-akademik",
            exact: true,
          },
          {
            icon: <ClipboardCheck size={20} />,
            label: "Assessment",
            path: isAkademik
              ? "/ho/assessment/akademik"
              : "/ho/assessment/non-akademik",
          },
          {
            icon: <FolderKanban size={20} />,
            label: "Program Kegiatan",
            path: isAkademik
              ? "/ho/program/akademik"
              : "/ho/program/non-akademik",
          },
          {
            icon: <CalendarDays size={20} />,
            label: "List Schedule",
            path: isAkademik
              ? "/ho/penjadwalan/akademik"
              : "/ho/penjadwalan/non-akademik",
          },
        ]
      : []),

    // --- SEKOLAH ---
    ...(!isHO && !isAdmin
      ? [
          {
            icon: <ClipboardCheck size={20} />,
            label: "Assessment",
            path: "/sekolah/dashboard",
          },
          {
            icon: <FolderKanban size={20} />,
            label: "Program Kegiatan",
            path: "/sekolah/program",
          },
        ]
      : []),
  ];

  const masterItems = [
    {
      label: "Data Pengurus",
      path: "/admin/pengurus",
      icon: <User size={16} />,
    },
    { label: "Data HO", path: "/admin/ho", icon: <Shield size={16} /> },
    { label: "Data AO", path: "/admin/ao", icon: <Shield size={16} /> },
    {
      label: "Data Wilayah",
      path: "/admin/wilayah",
      icon: <MapPin size={16} />,
    },
    {
      label: "Data Sekolah",
      path: "/admin/sekolah",
      icon: <BarChart3 size={16} />,
    },
    {
      label: "Data Vendor",
      path: "/admin/vendor",
      icon: <Settings size={16} />,
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full font-sans text-white">
      <div className="flex items-center justify-between px-6 pt-8 pb-6">
        <button
          onClick={() => navigate("/")}
          className="p-2 rounded-xl transition-all hover:bg-black/10 text-[#BFDBFE]"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* USER PROFILE DENGAN AKSEN LENGKUNGAN HALUS */}
      <div className="relative px-6 mb-10 mt-4">
        {/* Efek Lengkungan Putih di Background (Sangat Smooth) */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-24 bg-gradient-to-r from-white/10 to-transparent rounded-r-[3rem] -ml-2 pointer-events-none" />

        <div className="relative flex items-center gap-4">
          {/* Avatar dengan Border Putih Tebal (Highlight) */}
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-full bg-white p-1 shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
              <div className="w-full h-full rounded-full bg-[#1E5AA5] flex items-center justify-center font-black text-white text-xl uppercase tracking-tighter">
                {user.nama?.charAt(0)}
              </div>
            </div>
            {/* Status Online Indicator */}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-[3px] border-[#1E5AA5] rounded-full shadow-sm" />
          </div>

          {/* Text User Info */}
          <div className="min-w-0 flex-1">
            <h2 className="text-[16px] font-black text-white leading-tight truncate drop-shadow-sm">
              {user.nama || "Memuat..."}
            </h2>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[9px] font-black text-blue-100 bg-white/20 px-2 py-0.5 rounded-md uppercase tracking-[0.1em] backdrop-blur-sm">
                {user.role}
              </span>
              {user.jenis && (
                <span className="text-[9px] font-bold text-blue-200 uppercase opacity-80 italic">
                  • {user.jenis}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* NAV LINKS */}
      <nav className="flex-1 overflow-y-auto px-4 space-y-3 custom-scrollbar pt-2">
        {navItems.map((item) => {
          const active = item.exact
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full group flex items-center rounded-xl px-4 py-3.5 transition-all duration-300 relative ${
                active
                  ? "bg-white/10 shadow-md border-l-4 border-white"
                  : "hover:bg-black/10"
              }`}
            >
              <span
                className={`transition-transform duration-300 group-hover:scale-110 ${active ? "text-white" : "text-blue-200 group-hover:text-white"}`}
              >
                {item.icon}
              </span>
              <span
                className={`ml-3 text-sm tracking-wide ${active ? "text-white font-bold" : "text-blue-100 font-medium group-hover:text-white"}`}
              >
                {item.label}
              </span>
            </button>
          );
        })}

        {/* MASTER DATA (ADMIN ONLY) */}
        {isAdmin && (
          <div className="pt-4 mt-4 border-t border-white/10">
            <button
              onClick={() => setIsMasterOpen(!isMasterOpen)}
              className="w-full flex items-center justify-between rounded-xl px-4 py-3.5 transition-all hover:bg-black/10 text-[#BFDBFE]"
            >
              <div className="flex items-center gap-3">
                <Database size={20} />
                <span className="text-sm font-semibold">Master Data</span>
              </div>
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${isMasterOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${isMasterOpen ? "max-h-[400px] mt-2" : "max-h-0"}`}
            >
              <div className="ml-6 pl-4 py-2 space-y-2 border-l-2 border-white/10 text-blue-300">
                {masterItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${location.pathname.startsWith(item.path) ? "bg-white/10 text-white font-bold" : "hover:text-white hover:bg-black/10"}`}
                  >
                    {item.icon} <span className="text-xs">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* BOTTOM ACTION */}
      <div className="p-5 border-t border-white/10 flex flex-col gap-4">
        <div className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-black/20 to-black/40 border border-white/10 shadow-inner">
          <div className="flex items-center gap-1.5 mb-1.5 opacity-80 text-blue-200 uppercase tracking-widest text-[9px] font-bold">
            <Clock size={12} /> Live Waktu
          </div>
          <p className="text-2xl font-black text-white tabular-nums tracking-wider">
            {time}
          </p>
          <p className="text-[10px] font-semibold text-blue-100 uppercase mt-1 opacity-80">
            {date}
          </p>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <button
            onClick={() => setIsSettingOpen(true)}
            className="col-span-1 flex items-center justify-center rounded-xl py-3.5 bg-white/10 text-white hover:bg-white/20 border border-white/10 active:scale-95 transition-all shadow-lg"
          >
            <Settings size={20} />
          </button>
          <button
            onClick={handleLogout}
            className="col-span-4 flex items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-xs bg-[#E23E57] text-white hover:bg-[#c82333] active:scale-95 transition-all shadow-lg"
          >
            <LogOut size={18} /> Keluar Sistem
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        .font-sans { font-family: 'Plus Jakarta Sans', sans-serif; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
      `}</style>
      <div className="lg:hidden fixed top-0 left-0 w-full bg-[#1E5AA5] px-6 py-4 flex justify-between items-center z-[100] border-b border-white/10">
        <img
          src={logo_ypamdr}
          alt="Logo"
          className="h-5 w-auto brightness-0 invert"
        />
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 bg-white/10 rounded-lg text-white"
        >
          <MenuIcon size={24} />
        </button>
      </div>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full z-[95] w-72 lg:hidden transition-transform duration-300 bg-[#1E5AA5] ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-6 right-6 text-white/50 hover:text-white"
        >
          <X size={24} />
        </button>
        <SidebarContent />
      </div>
      <aside className="hidden lg:flex flex-col h-screen w-[280px] flex-shrink-0 z-10 bg-[#1E5AA5] shadow-[4px_0_24px_rgba(0,0,0,0.15)]">
        <SidebarContent />
      </aside>
    </>
  );
}
