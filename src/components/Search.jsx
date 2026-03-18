/* eslint-disable react/prop-types */
export default function Search({
  placeholder = "Search...",
  value,
  onChange,
  className = "",
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        w-full
        px-4 py-2
        border border-gray-300
        rounded-lg
        text-sm
        focus:outline-none
        focus:ring-2
        focus:ring-[#2E5AA7]/30
        focus:border-[#2E5AA7]
        ${className}
      `}
    />
  );
}
