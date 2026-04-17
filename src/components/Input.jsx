/* eslint-disable react/prop-types */
export default function Input({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  ...props // <--- Ini untuk menangkap prop tambahan seperti 'readOnly' atau 'name'
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props} // <--- Ini untuk menyalurkan prop tersebut ke tag input asli
      className={`
        w-full
        px-3 py-2
        border border-gray-300
        rounded-lg
        text-sm
        focus:outline-none
        focus:ring-2
        focus:ring-[#2E5AA7]/30
        focus:border-[#2E5AA7]
        transition
        ${className}
      `}
    />
  );
}
