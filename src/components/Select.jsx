/* eslint-disable react/prop-types */
import React from "react";
import { ChevronDown } from "lucide-react";

const Select = ({
  name,
  value,
  onChange,
  options,
  placeholder,
  icon: Icon,
  required,
  className = "",
}) => {
  return (
    <div className={`relative group min-w-[160px] ${className}`}>
      {/* Icon Utama di Sisi Kiri (Opsional) */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2E5AA7] transition-colors duration-300">
        {Icon && <Icon size={14} strokeWidth={3} />}
      </div>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`
          w-full 
          ${Icon ? "pl-11" : "pl-5"} pr-10 py-2.5 
          bg-gray-50/80 
          border border-gray-200/50
          rounded-xl 
          font-black 
          text-[10px] 
          tracking-wider
          text-gray-600 
          outline-none 
          cursor-pointer
          transition-all duration-300
          appearance-none
          /* Efek Inner Shadow halus agar senada dengan button */
          shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]
          focus:bg-white 
          focus:border-[#2E5AA7]/30 
          focus:ring-4 
          focus:ring-[#2E5AA7]/5
        `}
      >
        {placeholder && (
          <option value="" className="font-bold">
            {placeholder.toUpperCase()}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.id} value={opt.id} className="font-bold py-2">
            {opt.label.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Chevron Icon Sisi Kanan */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300 group-hover:text-gray-400 transition-colors">
        <ChevronDown size={14} strokeWidth={3} />
      </div>
    </div>
  );
};

export default Select;
