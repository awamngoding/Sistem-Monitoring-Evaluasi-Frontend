/* eslint-disable react/prop-types */
// 🔹 WAJIB IMPORT ICON INI BIAR MAKIN GANTENG 🔹
import { Search as SearchIcon } from "lucide-react";

export default function Search({
  placeholder = "Cari data...",
  value,
  onChange,
  className = "",
}) {
  return (
    // Bungkus pakai relative & group biar icon-nya bisa bereaksi pas input di-klik
    <div className={`relative group w-full ${className}`}>
      {/* ================= ICON SEARCH ================= */}
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
        <SearchIcon
          size={18}
          // Icon otomatis berubah jadi biru pas input diketik/diklik (focus-within)
          className="text-gray-400 group-focus-within:text-[#1E5AA5] transition-colors duration-300"
        />
      </div>

      {/* ================= INPUT FIELD ================= */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full
          pl-10 pr-4 py-2.5
          bg-white
          border border-gray-200
          rounded-xl
          text-sm text-gray-700 placeholder-gray-400
          
          /* 🔹 SHADOW BIASA & SHADOW SAAT HOVER 🔹 */
          shadow-[0_2px_10px_rgba(0,0,0,0.04)] 
          hover:shadow-[0_4px_15px_rgba(30,90,165,0.08)]
          
          /* 🔹 EFEK SAAT DI-KLIK (FOCUS) 🔹 */
          focus:outline-none
          focus:border-[#1E5AA5]
          focus:ring-4
          focus:ring-[#1E5AA5]/15
          
          transition-all duration-300
        "
      />
    </div>
  );
}
