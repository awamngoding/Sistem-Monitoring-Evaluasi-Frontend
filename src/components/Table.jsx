/* eslint-disable react/prop-types */
export default function Table({ columns = [], data = [] }) {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        {/* HEADER */}
        <thead className="bg-[#2E5AA7] text-white text-sm">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className={`px-5 py-3 font-semibold tracking-wide ${col.align || "text-left"}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y divide-gray-100">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 transition">
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-5 py-3 text-gray-700 ${col.align || "text-left"}`}
                >
                  {col.render ? col.render(row, rowIndex) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
