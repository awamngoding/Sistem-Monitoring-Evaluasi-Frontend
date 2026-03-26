/* eslint-disable react/jsx-no-undef */
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Dropdown from "../../components/Dropdown";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import seniImg from "../../assets/img/senibudaya.jpg";
import picturependidikan from "../../assets/img/pichture_pendidikan 1.png";
import iconPillar from "../../assets/img/iconPilar.png";
import empatpillar from "../../assets/img/4Pillar.png";
import indonesiaMap from "../../assets/maps/indonesia-province-simple.json";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const Onboarding = () => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const wilayahSekolah = {
    "Jawa Barat": {
      Bogor: { sd: 5, smp: 1, smk: 1 },
      Majalengka: { sd: 5 },
    },
    "DI Yogyakarta": {
      Gunungkidul: { sd: 6, smp: 1, smk: 1 },
      Bantul: { sd: 3, smp: 1, smk: 1 },
    },
    Lampung: {
      "Lampung Selatan": { sd: 9, smp: 2 },
    },
    "Jawa Timur": {
      Pacitan: { sd: 3, smp: 1, smk: 1 },
    },
    Banten: {
      Serang: { sd: 12 },
      Tangerang: { sd: 3 },
      Lebak: { sd: 9, smp: 3, smk: 1 },
    },
    "Nusa Tenggara Timur": {
      Kupang: { sd: 8, smp: 3, smk: 2 },
      "Rote Ndao": { sd: 10, smp: 4, smk: 2 },
      "Manggarai Timur": { sd: 6, smp: 4, smk: 1 },
      "Sumba Timur": { sd: 10, smp: 3, smk: 1 },
    },
    "Kalimantan Tengah": {
      Kapuas: { sd: 7, smp: 3, smk: 1 },
      "Barito Utara": { sd: 6, smp: 2, smk: 1 },
    },
    "Kalimantan Timur": {
      "Kutai Barat": { sd: 6, smp: 3 },
      "Penajam Paser Utara": { sd: 11, smp: 2, smk: 2 },
    },
    Maluku: {
      "Seram Bagian Barat": { sd: 12, smp: 4, smk: 1 },
    },
  };
  const provinceList = Object.keys(wilayahSekolah);

  const cityList =
    selectedProvince && wilayahSekolah[selectedProvince]
      ? Object.keys(wilayahSekolah[selectedProvince])
      : [];

  const generateSchools = (province) => {
    if (!wilayahSekolah[province]) return [];

    const districts = wilayahSekolah[province];

    return Object.keys(districts).map((district) => ({
      title: district,
      description: province,
      icon: iconPillar,
    }));
  };

  const getFilteredSchools = () => {
    if (!selectedProvince) return [];

    const districts = wilayahSekolah[selectedProvince];

    if (selectedCity) {
      return [
        {
          title: selectedCity,
          description: selectedProvince,
          icon: iconPillar,
        },
      ];
    }

    return Object.keys(districts).map((district) => ({
      title: district,
      description: selectedProvince,
      icon: iconPillar,
    }));
  };
  // ================= KONTEN PILAR =================
  const pilarList = [
    {
      title: "Akademik gesa",
      icon: iconPillar,
      description:
        "Meningkatkan kualitas pendidikan melalui berbagai program, salah satunya dengan memberikan pelatihan akademik untuk meningkatkan kompetensi sumber daya manusia (SDM) di lingkungan sekolah binaan.",
    },
    {
      title: "Karakter",
      icon: iconPillar,
      description:
        "Warga sekolah diberikan pembinaan untuk mengembangkan karakter yang berlandaskan nilai-nilai luhur bangsa Indonesia.",
    },
    {
      title: "Kecakapan Hidup",
      icon: iconPillar,
      description:
        "Siswa dibekali dengan kecakapan hidup agar dapat meningkatkan perekonomian di daerahnya.",
    },
    {
      title: "Seni Budaya",
      icon: iconPillar,
      description:
        "Pembinaan seni budaya diberikan agar seni budaya lokal dapat dilestarikan.",
    },
  ];

  return (
    <>
      <Navbar isDashboard />

      {/* ================= HERO ================= */}
      <section className="bg-[#F7F8F0] py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#1E5AA5] leading-tight">
              SATU Indonesia Cerdas
            </h1>

            <p className="text-[#1E5AA5]/90 text-base md:text-lg leading-relaxed max-w-xl">
              Yayasan Astra - Yayasan Pendidikan Astra Michael D. Ruslim
              merupakan wujud nyata Pilar Pendidikan dalam Kontribusi Sosial
              Keberlanjutan Astra, yaitu Astra Untuk Indonesia Cerdas. Pembinaan
              yang dilakukan Yayasan Astra - YPA MDR dilakukan secara menyeluruh
              untuk melahirkan Generasi Indonesia Cerdas yang cermat,
              berkarakter baik, mencintai budaya lokal, dan memiliki kemampuan
              kecakapan hidup untuk mengharumkan nama daerah masing-masing.
            </p>
          </div>

          {/* RIGHT IMAGE CARD */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white p-8 rounded-3xl shadow-2xl">
              <img
                src={picturependidikan}
                alt="Satu Indonesia Cerdas"
                className="w-[360px] lg:w-[460px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-28 px-6">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E5AA5]">
              4 Pilar YPA–MDR
            </h2>
            <div className="h-1 w-16 bg-[#1E5AA5] rounded-full mt-4" />
          </div>

          {/* CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-25 items-center">
            {/* LEFT - PILAesainR CARDS */}
            <div className="overflow-x-auto scrollbar-hide py-6">
              <div className="flex gap-8 w-max">
                {pilarList.map((item, index) => (
                  <Card
                    key={index}
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT - IMAGE */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-[420px] lg:w-[520px]">
                <img
                  src={empatpillar}
                  alt="Pillar YPAMDR"
                  className="w-[300px] lg:w-[400px] h-auto object-contain translate-x-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-gray-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* HEADER + SUMMARY */}
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#0a5ea8]">
              Peta Penyebaran Sekolah Binaan
            </h2>

            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Monitoring distribusi sekolah binaan Yayasan Pendidikan Astra
              berdasarkan provinsi dan kabupaten/kota di seluruh Indonesia.
            </p>

            {/* SUMMARY STRIP */}
            <div className="flex justify-center gap-10 mt-8 text-center">
              <div>
                <p className="text-3xl font-bold text-[#0a5ea8]">
                  {provinceList.length}
                </p>
                <p className="text-sm text-gray-500">Provinsi Binaan</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#0a5ea8]">
                  {
                    Object.values(wilayahSekolah).flatMap((p) => Object.keys(p))
                      .length
                  }
                </p>
                <p className="text-sm text-gray-500">Kabupaten/Kota</p>
              </div>
            </div>
          </div>

          {/* MAP HERO CONTAINER */}
          <div className="relative bg-white rounded-3xl shadow-xl border border-gray-100 p-10 mb-16 overflow-visible">
            <div className="flex justify-center">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 1050,
                  center: [118, -2],
                }}
                width={1000}
                height={450}
                style={{ width: "100%", maxWidth: "1100px" }}
              >
                <Geographies geography={indonesiaMap}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        className="cursor-pointer transition-all duration-300"
                        style={{
                          default: {
                            fill:
                              selectedProvince &&
                              geo.properties.Propinsi ===
                                selectedProvince.toUpperCase()
                                ? "#0a5ea8"
                                : "#E5E7EB",
                            stroke: "#ffffff",
                            strokeWidth: 0.6,
                            outline: "none",
                          },
                          hover: {
                            fill: "#0a5ea8",
                          },
                          pressed: {
                            fill: "#1E5AA5",
                          },
                        }}
                      />
                    ))
                  }
                </Geographies>
              </ComposableMap>
            </div>

            {/* FLOATING FILTER BAR */}
            <div className="absolute left-1/2 -bottom-10 -translate-x-1/2 w-[92%] max-w-4xl">
              <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* LEFT INFO */}
                <div className="text-left">
                  <p className="text-xs uppercase tracking-widest text-gray-400">
                    Filter Data Wilayah
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Pilih provinsi dan kabupaten/kota untuk melihat detail
                    sebaran sekolah binaan.
                  </p>
                </div>

                {/* RIGHT CONTROL */}
                <div className="flex flex-col md:flex-row gap-4">
                  <Dropdown
                    label="Pilih Provinsi"
                    value={selectedProvince}
                    onChange={(val) => {
                      setSelectedProvince(val);
                      setSelectedCity("");
                    }}
                    items={provinceList.map((prov) => ({
                      label: prov,
                      value: prov,
                    }))}
                  />

                  <Dropdown
                    label="Pilih Kota"
                    value={selectedCity}
                    onChange={(val) => setSelectedCity(val)}
                    items={cityList.map((city) => ({
                      label: city,
                      value: city,
                    }))}
                    disabled={!selectedProvince}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RESULT GRID */}
          <div className="mt-16">
            {selectedProvince ? (
              getFilteredSchools().length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {getFilteredSchools()
                    .slice(0, 4)
                    .map((school, index) => (
                      <Card
                        key={index}
                        title={school.title}
                        description={school.description}
                        icon={school.icon}
                      />
                    ))}
                </div>
              ) : (
                <div className="py-10 text-center text-gray-500">
                  Wilayah ini belum memiliki sekolah binaan
                </div>
              )
            ) : (
              <div className="py-10 text-center text-gray-400">
                Silakan pilih provinsi untuk melihat data
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-[#0a5ea8] py-48 px-6 relative overflow-hidden">
        {/* BACKGROUND PATTERN */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="max-w-7xl mx-auto space-y-20 relative z-10">
          {/* HEADER */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">
              Ragam Seni & Budaya Nusantara
            </h2>

            <div className="flex justify-center">
              <div className="w-32 h-[2px] bg-white/30 rounded-full" />
            </div>

            <p className="text-white/85 text-base md:text-lg">
              Beragam tarian daerah yang menjadi bagian dari pembinaan seni dan
              budaya dalam program Yayasan Pendidikan Astra Michael D. Ruslim.
            </p>
          </div>

          {/* HORIZONTAL SCROLL – 1 ROW */}
          <div className="relative overflow-x-auto scroll-smooth scrollbar-hide pb-10">
            <div
              className="
          flex
          gap-12
          w-max
        "
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="
              relative
              w-80
              h-[420px]
              rounded-3xl
              overflow-hidden
              shadow-xl
              ring-1 ring-white/10
              group
              bg-gray-200
              flex-shrink-0
            "
                >
                  {/* IMAGE */}
                  <div
                    className="
                absolute inset-0
                bg-cover bg-center
                transition-transform duration-700
                group-hover:scale-110
              "
                    style={{ backgroundImage: `url(${seniImg})` }}
                  />

                  {/* GRADIENT */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/10" />

                  {/* TEXT */}
                  <div className="relative z-10 h-full flex items-end p-8">
                    <h3 className="text-white text-xl font-bold tracking-wide">
                      Tarian Daerah {i + 1}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DECORATIVE BLUR */}
        <div className="absolute -top-40 -right-40 w-[520px] h-[520px] bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[520px] h-[520px] bg-white/10 rounded-full blur-3xl" />
      </section>

      {/* ================= VISI & MISI PREMIUM ================= */}
      <section className="relative py-40 px-6 overflow-hidden bg-gradient-to-b from-[#f8fbff] to-white">
        {/* Decorative Blur Background */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-200/40 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto space-y-24">
          {/* HEADER */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[#0a5ea8] to-blue-400 bg-clip-text text-transparent">
              Visi & Misi YPA–MDR
            </h2>

            <p className="text-gray-500 text-lg">
              Komitmen membangun pendidikan unggul untuk Indonesia
            </p>

            <div className="flex justify-center">
              <div className="w-32 h-1 bg-gradient-to-r from-[#0a5ea8] to-blue-400 rounded-full"></div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* ================= VISI CARD ================= */}
            <div className="group relative bg-white/70 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-2xl p-12 hover:shadow-blue-200/50 transition-all duration-500 hover:-translate-y-2">
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-[#0a5ea8] to-blue-400 rounded-2xl flex items-center justify-center shadow-lg mb-8">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6V3m0 0L8 7m4-4l4 4M4 12h16m-8 6v3m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-6">Visi</h3>

              <p className="text-gray-600 text-lg leading-relaxed">
                Menjadi lembaga sosial yang terkemuka dan kredibel di bidang
                pendidikan, khususnya di daerah tertinggal yang strategis di
                Indonesia, agar seluruh elemen pendidikan mampu meningkatkan
                kualitas akademik, intelektual, kompetensi kecakapan hidup, seni
                budaya, serta karakter berdasarkan nilai luhur bangsa Indonesia
                sebagai bagian dari Sistem Pendidikan Nasional.
              </p>

              <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
                <p className="text-sm font-semibold text-[#0a5ea8]">
                  Fokus utama: Pendidikan di daerah tertinggal strategis
                </p>
              </div>
            </div>

            {/* ================= MISI CARD ================= */}
            <div className="group relative bg-white/70 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-2xl p-12 hover:shadow-blue-200/50 transition-all duration-500 hover:-translate-y-2">
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-[#0a5ea8] to-blue-400 rounded-2xl flex items-center justify-center shadow-lg mb-8">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17v-6h6v6m-3-10a4 4 0 110 8 4 4 0 010-8z"
                  />
                </svg>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-6">Misi</h3>

              <ul className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <li className="flex gap-4">
                  <div className="w-2 h-2 mt-3 bg-[#0a5ea8] rounded-full"></div>
                  <span>
                    Mendorong pendidikan bermutu melalui{" "}
                    <b>4 Pilar Pembinaan</b>
                    (Akademis, Karakter, Seni Budaya, Kecakapan Hidup) dalam
                    mempersiapkan SDM sebagai <b>agent of change</b>
                    melalui model <i>“Sekolah Eskalator.”</i>
                  </span>
                </li>

                <li className="flex gap-4">
                  <div className="w-2 h-2 mt-3 bg-[#0a5ea8] rounded-full"></div>
                  <span>
                    Membangun sinergitas sekolah binaan dan stakeholders untuk
                    menciptakan Sekolah Unggul menuju
                    <b>
                      {" "}
                      <i>“Pride of the Nation.”</i>
                    </b>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Onboarding;
