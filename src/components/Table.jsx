/* eslint-disable react/prop-types */
export default function Table({ columns = [], data = [], footer }) {
  return (
    <div className="w-full bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
      <table className="w-full border-collapse">
        {/* HEADER: Solid Blue with High Contrast */}
        <thead>
          <tr className="bg-[#1E5AA5]">
            {columns.map((col, index) => (
              <th
                key={index}
                className={`px-6 py-4 font-black text-[10px] uppercase tracking-[0.15em] text-white/90 border-b border-blue-800/20 ${col.align || "text-left"}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY: Clean Rows with Subtle Striping */}
        <tbody className="text-gray-600">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              // SELANG-SELING HALUS: Putih & Biru Pucat (Sangat Tipis)
              className={`border-b border-gray-50 last:border-0 transition-colors ${
                rowIndex % 2 === 0 ? "bg-white" : "bg-[#F8FAFF]"
              } hover:bg-blue-50/50`} // Hover tetap ada tapi cuma ganti warna tipis
            >
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-6 py-3 ${col.align || "text-left"}`}
                >
                  <div className="text-[11px] font-bold tracking-tight text-gray-700">
                    {col.render ? col.render(row, rowIndex) : row[col.accessor]}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        {/* FOOTER */}
        {footer && (
          <tfoot className="bg-gray-50 border-t-2 border-gray-100">
            {footer}
          </tfoot>
        )}
      </table>
    </div>
  );
}
