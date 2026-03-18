/* eslint-disable react/prop-types */
export default function Label({
  text,
  htmlFor,
  required = false,
  className = "",
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={`
        block
        text-sm
        font-medium
        text-gray-700
        mb-1
        ${className}
      `}
    >
      {text}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}
