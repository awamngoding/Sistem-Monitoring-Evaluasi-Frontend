/* eslint-disable react/prop-types */
import {
  ArrowLeft,
  ClipboardCheck,
  FolderKanban,
  Activity,
} from "lucide-react";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [time, setTime] = useState("");
  const [user, setUser] = useState({ nama: "", role: "", jenis: null });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTime(`${formattedTime} (${timezone})`);
    };

    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser({
        nama: decoded.nama ?? decoded.email ?? "User",
        role: decoded.role ?? "-",
        jenis: decoded.jenis ?? null,
      });
    }

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const isHO = user.role === "HO";
  const isAkademik = user.jenis === "akademik";
  const isNonAkademik = user.jenis === "non-akademik";

  return (
    <aside className="w-72 lg:w-80 bg-gradient-to-b from-[#2E5AA7]/10 to-[#4989C2]/10 text-white p-6 lg:p-10 flex flex-col ml-4 lg:ml-12 mt-4 lg:mt-10 rounded-[20px] lg:rounded-[30px]">
      {/* BACK TO ONBOARDING */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-white mb-6 transition"
      >
        <ArrowLeft size={26} strokeWidth={3} />
      </button>

      {/* PROFILE */}
      <div className="mb-12 flex items-center gap-3">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#2E5AA7] font-bold">
          {user.nama.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="font-semibold text-base leading-none">{user.nama}</h2>
          <p className="text-xs text-white/70 mt-1">{user.role}</p>
        </div>
      </div>

      {/* MENU */}
      <nav className="space-y-6 text-white/80 mt-10 py-4">
        <div className="space-y-4 ml-2">
          {/* ASSESSMENT */}
          {isHO && isAkademik && (
            <Menu
              icon={<ClipboardCheck size={18} />}
              label="Assessment"
              active={location.pathname.includes("/assessment/akademik")}
              onClick={() => navigate("/ho/assessment/akademik/dashboard")}
            />
          )}

          {isHO && isNonAkademik && (
            <Menu
              icon={<ClipboardCheck size={18} />}
              label="Assessment"
              active={
                location.pathname.includes("/non-akademik") ||
                location.pathname === "/ho/dashboard"
              }
              onClick={() => navigate("/ho/dashboard")}
            />
          )}

          {!isHO && (
            <Menu
              icon={<ClipboardCheck size={18} />}
              label="Assessment"
              active={location.pathname.includes("/assessment")}
              onClick={() => navigate("/sekolah/dashboard")}
            />
          )}

       
          {isHO && isAkademik && (
            <Menu
              icon={<FolderKanban size={18} />}
              label="Program Kegiatan"
              active={location.pathname.includes("/program/akademik")}
              onClick={() => navigate("/ho/program/akademik")}
            />
          )}

          {isHO && isNonAkademik && (
            <Menu
              icon={<FolderKanban size={18} />}
              label="Program Kegiatan"
              active={location.pathname.includes("/program/non-akademik")}
              onClick={() => navigate("/ho/program/non-akademik")}
            />
          )}

          {!isHO && (
            <Menu icon={<FolderKanban size={18} />} label="Program Kegiatan" />
          )}

          <Menu icon={<Activity size={18} />} label="Progress Monitoring" />
        </div>

        <div className="mt-2 ml-1 py-25">
          <div className="ml-2 mt-auto pt-60 text-xs text-white/100 leading-relaxed">
            © 2026 YPA-MDR. All rights reserved. Kebijakan Privasi
          </div>
          <div className="ml-2 mb-10">
            <p className="text-xs text-white/60">Current Time</p>
            <p className="text-lg font-semibold tracking-wide">{time}</p>
          </div>
        </div>
      </nav>
    </aside>
  );
}

function Menu({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 cursor-pointer transition ${
        active ? "text-white font-semibold" : "hover:text-white"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
