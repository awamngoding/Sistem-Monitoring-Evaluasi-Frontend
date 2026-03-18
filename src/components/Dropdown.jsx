/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";

export default function Dropdown({
  label,
  items = [],
  value,
  onChange,
  disabled = false,
  width = "w-60",
}) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const ref = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (disabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    let top = rect.bottom + 8;
    const left = rect.left;
    const width = rect.width;

    const dropdownHeight = 200;
    if (top + dropdownHeight > window.innerHeight) {
      top = rect.top - dropdownHeight - 8;
    }

    setPosition({ top, left, width });
    setOpen((prev) => !prev);
  };

  const selectedLabel =
    items.find((item) => item.value === value)?.label || label;

  return (
    <div ref={ref} className={`relative ${width}`}>
      <button
        disabled={disabled}
        onClick={handleToggle}
        className={`
          w-full flex items-center justify-between gap-2
          px-4 py-2.5 rounded-xl border
          bg-white shadow-sm text-sm font-medium
          transition duration-200
          ${
            disabled
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "hover:border-[#0a5ea8] hover:text-[#0a5ea8]"
          }
        `}
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed z-[99999] bg-white border border-gray-200 rounded-2xl shadow-2xl p-2 max-h-72 overflow-y-auto"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: `${position.width}px`,
            }}
          >
            {items.map((item, index) => (
              <DropdownItem
                key={index}
                label={item.label}
                active={item.value === value}
                onClick={() => {
                  onChange?.(item.value);
                  setOpen(false);
                }}
              />
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
}

function DropdownItem({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        group relative w-full text-left px-4 py-3 rounded-xl
        transition-all duration-200
        ${
          active
            ? "bg-blue-50 text-[#0a5ea8] font-semibold"
            : "hover:bg-blue-50 hover:text-[#0a5ea8]"
        }
      `}
    >
      <span className="text-sm">{label}</span>
      <span
        className={`
          absolute left-0 top-2 bottom-2 w-1 bg-[#0a5ea8] rounded-full
          transition-opacity duration-200
          ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
        `}
      />
    </button>
  );
}
