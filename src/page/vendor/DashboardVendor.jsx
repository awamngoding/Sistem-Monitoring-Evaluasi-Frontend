/* eslint-disable react/prop-types */
export default function DashboardVendor() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-gray-800">
        Dashboard Vendor 🤝
      </h1>
      <p className="text-gray-600 mt-2">
        Vendor dapat melihat jadwal program dan mengupload laporan kegiatan.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card title="Program Ditugaskan" value="4" />
        <Card title="Laporan Terkirim" value="3" />
      </div>

      {/* Program */}
      <div className="mt-8 bg-white shadow rounded-2xl p-6">
        <h2 className="font-semibold text-lg mb-4">
          Jadwal Program Anda
        </h2>

        <ul className="space-y-2 text-gray-600">
          <li>📍 Sekolah A - 10 Februari 2026</li>
          <li>📍 Sekolah B - 20 Februari 2026</li>
        </ul>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h2 className="text-gray-500">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
