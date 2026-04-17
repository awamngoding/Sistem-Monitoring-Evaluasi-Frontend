/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// IMPORT ICONS
import {
  Database,
  MapPin,
  Globe,
  Search as SearchIcon,
  BookOpen,
  Navigation,
  ShieldCheck,
  Activity,
  Eye,
  Rocket,
  Mountain,
  Target,
  ChevronRight,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  MoveRight,
  School,
  GraduationCap,
  Layers,
} from "lucide-react";

// IMPORT COMPONENTS (Sesuai spill komponen atomik bos)
import Navbar from "../../components/Navbar";
import Dropdown from "../../components/Dropdown";
import Footer from "../../components/Footer";
import Table from "../../components/Table";

// ASSETS
import seniImg from "../../assets/img/senibudaya.jpg";
import picturependidikan from "../../assets/img/pichture_pendidikan 1.png";

// FIX MARKER ICON LEAFLET
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [22, 36],
  iconAnchor: [11, 36],
});
L.Marker.prototype.options.icon = DefaultIcon;

const Onboarding = () => {
  const [wilayahList, setWilayahList] = useState([]);
  const [sekolahList, setSekolahList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWilayah, setSelectedWilayah] = useState(null);
  const [mapCenter, setMapCenter] = useState([-2.5, 118]);

  // State Pagination Tabel Sekolah
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [resWilayah, resSekolah] = await Promise.all([
          axios.get("http://localhost:3000/wilayah"),
          axios.get("http://localhost:3000/sekolah"),
        ]);
        // Hanya wilayah aktif
        setWilayahList(resWilayah.data.filter((w) => w.status === true));
        setSekolahList(resSekolah.data);
      } catch (err) {
        console.error("Sync Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter Sekolah berdasarkan Wilayah yang dipilih di peta/dropdown
  const filteredSekolah = selectedWilayah
    ? sekolahList.filter((s) => s.id_wilayah === selectedWilayah.id_wilayah)
    : [];

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSekolah.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSekolah.length / itemsPerPage);

  // Options untuk Dropdown Wilayah (Quick Navigation)
  const wilayahOptions = [
    { value: "all", label: "PILIH WILAYAH BINAAN" },
    ...wilayahList.map((w) => ({
      value: w.id_wilayah,
      label: w.nama_wilayah.split("/").pop().toUpperCase(),
    })),
  ];

  function MapController({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
      if (center) map.flyTo(center, zoom || 9, { duration: 2 });
    }, [center, zoom, map]);
    return null;
  }

  // Kolom Tabel Sekolah (Minimalist Luxury)
  const schoolColumns = [
    {
      header: "NPSN",
      align: "text-center w-20",
      render: (row) => (
        <span className="text-[9px] font-mono font-bold text-gray-400">
          {row.npsn}
        </span>
      ),
    },
    {
      header: "INSTITUSI PENDIDIKAN",
      align: "text-left",
      render: (row) => (
        <div className="flex flex-col py-1">
          <span className="font-black text-[#1E5AA5] text-[10px] uppercase tracking-tighter leading-none">
            {row.nama_sekolah}
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[7px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-black uppercase">
              {row.jenjang}
            </span>
            <span className="text-[7px] text-gray-400 font-bold uppercase italic">
              Grade {row.akreditasi}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "INFO",
      align: "text-right w-12",
      render: (row) => (
        <button className="p-1.5 hover:bg-blue-50 text-[#1E5AA5] rounded-lg transition-all">
          <ArrowRight size={12} />
        </button>
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] font-sans selection:bg-[#1E5AA5] selection:text-white overflow-x-hidden">
      <Navbar
        isDashboard
        searchValue={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* --- SECTION 1: HERO --- */}
      <section className="bg-[#F7F8F0] pt-32 pb-24 px-6 relative flex items-center min-h-[85vh]">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1E5AA5]/[0.01] pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16 w-full relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 bg-white px-4 py-1.5 rounded-full shadow-sm border border-blue-50">
              <Sparkles size={14} className="text-amber-400" />
              <span className="text-[9px] font-black text-[#1E5AA5] uppercase tracking-[0.4em]">
                Corporate Social Impact
              </span>
            </div>
            <h1 className="text-6xl lg:text-[84px] font-[1000] text-gray-900 leading-[0.85] tracking-tighter uppercase">
              SATU <br /> <span className="text-[#1E5AA5]">INDONESIA</span>{" "}
              <br /> CERDAS
            </h1>
            <p className="text-gray-500 text-sm md:text-lg leading-relaxed max-w-md font-medium border-l-4 border-[#1E5AA5] pl-8">
              Membangun fondasi pendidikan unggul di pelosok negeri demi
              mewujudkan generasi emas Indonesia yang mandiri.
            </p>
            <div className="flex items-center gap-6">
              <button className="bg-[#1E5AA5] text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center gap-3 shadow-xl shadow-blue-900/20 active:scale-95">
                Eksplorasi Wilayah <MoveRight size={16} />
              </button>
            </div>
          </div>
          <div className="hidden lg:flex justify-end animate-in fade-in zoom-in duration-1000">
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-100/50 rounded-[4rem] blur-3xl" />
              <img
                src={picturependidikan}
                alt="Hero"
                className="w-[450px] relative z-10 drop-shadow-2xl animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: 4 PILAR --- */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          {[
            {
              t: "Akademik",
              i: <BookOpen size={28} />,
              c: "Transformasi kualitas pedagogik dan kompetensi guru binaan.",
            },
            {
              t: "Karakter",
              i: <ShieldCheck size={28} />,
              c: "Penanaman budi pekerti luhur berbasis nilai kebangsaan.",
            },
            {
              t: "Kecakapan",
              i: <Activity size={28} />,
              c: "Pengembangan vokasi untuk kemandirian ekonomi lokal.",
            },
            {
              t: "Budaya",
              i: <Globe size={28} />,
              c: "Pelestarian identitas nusantara di tengah arus globalisasi.",
            },
          ].map((p, i) => (
            <div
              key={i}
              className="group flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#1E5AA5] group-hover:bg-[#1E5AA5] group-hover:text-white transition-all duration-500 mb-8 shadow-sm">
                {p.i}
              </div>
              <h3 className="text-base font-[1000] text-gray-900 uppercase tracking-tighter mb-3">
                {p.t}
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed max-w-[200px] font-medium">
                {p.c}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- SECTION 3: DASHBOARD GEOSPATIAL (MAP & SCHOOLS) --- */}
      <section className="py-32 px-6 bg-[#EEF5FF]">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-16 space-y-3">
            <span className="text-[#1E5AA5] font-black text-[10px] uppercase tracking-[0.6em] block">
              Sistem Informasi Geografis
            </span>
            <h2 className="text-4xl lg:text-5xl font-[1000] text-gray-900 tracking-tighter uppercase leading-none">
              SEBARAN <span className="text-[#1E5AA5]">Sekolah Binaan</span>
            </h2>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-0 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.12)] border border-gray-200 overflow-hidden bg-white rounded-[1rem]">
            {/* LEFT: MAP INTERFACE */}
            <div className="lg:col-span-7 h-[600px] relative bg-gray-50 border-r border-gray-100">
              <MapContainer
                center={mapCenter}
                zoom={5}
                style={{ height: "100%", width: "100%" }}
                zoomControl={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  opacity={0.6}
                />
                <ZoomControl position="bottomright" />
                <MapController
                  center={mapCenter}
                  zoom={selectedWilayah ? 11 : 5}
                />

                {wilayahList.map((w) => (
                  <Marker
                    key={w.id_wilayah}
                    position={[w.latitude, w.longitude]}
                    eventHandlers={{
                      click: () => {
                        setMapCenter([w.latitude, w.longitude]);
                        setSelectedWilayah(w);
                        setCurrentPage(1);
                      },
                    }}
                  >
                    <Popup className="custom-popup-flat-premium">
                      <div className="p-3 min-w-[150px] text-center space-y-1">
                        <p className="font-black text-[#1E5AA5] uppercase text-[10px]">
                          {w.nama_wilayah.split("/").pop()}
                        </p>
                        <p className="text-[8px] text-gray-400 font-bold uppercase italic">
                          Klik untuk filter data sekolah
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
              <div className="absolute top-6 left-6 z-[1000] bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">
                  Live Node Tracking
                </span>
              </div>
            </div>

            {/* RIGHT: SCHOOL LIST PANEL */}
            <div className="lg:col-span-5 flex flex-col h-[600px] bg-white">
              <div className="p-8 bg-gray-50/50 border-b border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 italic underline decoration-blue-200">
                      Current Wilayah:
                    </span>
                    <h3 className="text-xl font-[1000] text-[#1E5AA5] uppercase leading-none tracking-tighter">
                      {selectedWilayah
                        ? selectedWilayah.nama_wilayah.split("/").pop()
                        : "Pilih Wilayah"}
                    </h3>
                  </div>
                  <div className="p-3 bg-white rounded-2xl border border-gray-100 shadow-sm text-[#1E5AA5]">
                    <School size={20} />
                  </div>
                </div>

                <Dropdown
                  items={wilayahOptions}
                  value={selectedWilayah?.id_wilayah || "all"}
                  onChange={(val) => {
                    const found = wilayahList.find((w) => w.id_wilayah === val);
                    if (found) {
                      setMapCenter([found.latitude, found.longitude]);
                      setSelectedWilayah(found);
                      setCurrentPage(1);
                    }
                  }}
                  className="!rounded-xl !border-gray-200 !text-[10px] font-black uppercase"
                />
              </div>

              <div className="flex-1 overflow-hidden flex flex-col p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers size={14} className="text-gray-300" />
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                      Inventory List
                    </span>
                  </div>
                  <span className="text-[10px] font-black text-[#1E5AA5] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 uppercase italic">
                    {filteredSekolah.length} Unit
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto pr-1">
                  {selectedWilayah ? (
                    filteredSekolah.length > 0 ? (
                      <Table
                        columns={schoolColumns}
                        data={currentItems}
                        className="min-w-full hover-row-blue-flat"
                      />
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center p-10 grayscale opacity-40">
                        <GraduationCap size={48} strokeWidth={1} />
                        <p className="text-[10px] font-black uppercase mt-4 tracking-widest">
                          Data sekolah belum terintegrasi
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-10">
                      <Navigation
                        size={40}
                        className="text-blue-100 mb-6 animate-pulse"
                      />
                      <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] leading-relaxed">
                        Silakan interaksi dengan peta <br /> untuk memuat basis
                        data sekolah
                      </p>
                    </div>
                  )}
                </div>

                {/* MINI PAGINATION */}
                {selectedWilayah && filteredSekolah.length > itemsPerPage && (
                  <div className="pt-6 mt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                      Page {currentPage} of {totalPages}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.max(p - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 disabled:opacity-30 transition-all"
                      >
                        <ChevronLeft size={14} />
                      </button>
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.min(p + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 disabled:opacity-30 transition-all"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: SENI & BUDAYA --- */}
      <section className="bg-white py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex items-end justify-between border-l-8 border-[#1E5AA5] pl-8">
            <h2 className="text-4xl lg:text-5xl font-[1000] text-gray-900 uppercase tracking-tighter leading-[0.85]">
              RAGAM <br /> <span className="text-[#1E5AA5]">SENI BUDAYA</span>
            </h2>
            <p className="hidden md:block text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] max-w-[250px] text-right italic leading-relaxed">
              Mewarisi kearifan lokal melalui pengembangan kreativitas seni di
              lingkungan sekolah binaan.
            </p>
          </div>

          <div className="flex overflow-x-auto gap-8 pb-12 scrollbar-hide snap-x">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div
                key={i}
                className="min-w-[280px] h-[380px] relative group snap-center overflow-hidden bg-gray-100 rounded-[2rem] shadow-sm transition-all duration-700"
              >
                <img
                  src={seniImg}
                  alt="Culture"
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-x-6 bottom-6 translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl">
                    <span className="text-[8px] font-black text-blue-300 uppercase tracking-[0.3em] mb-2 block">
                      CULTURAL PRESERVATION
                    </span>
                    <h4 className="text-sm font-black text-white uppercase tracking-tight mb-4">
                      Gelar Seni Budaya Nusantara {i + 1}
                    </h4>
                    <button className="flex items-center gap-2 text-[8px] font-black text-white uppercase tracking-[0.2em] hover:text-blue-300 transition-colors">
                      Eksplorasi Karya <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 5: MANIFESTO --- */}
      <section className="py-32 bg-[#F7F8F0] px-6">
        <div className="max-w-7xl mx-auto border-y border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {[
              {
                t: "Vision",
                i: <Eye size={24} />,
                c: "Menjadi lembaga sosial yang kredibel untuk meningkatkan mutu elemen pendidikan daerah binaan.",
              },
              {
                t: "Mission",
                i: <Rocket size={24} />,
                c: "Mendorong pembinaan sekolah melalui 4 Pilar Pendidikan dan membangun sinergitas stakeholders.",
              },
              {
                t: "Goal",
                i: <Mountain size={24} />,
                c: "Mewujudkan sekolah unggul binaan yang mandiri, berprestasi, dan berwawasan global.",
              },
              {
                t: "Aim",
                i: <Target size={24} />,
                c: "Melahirkan generasi muda yang kompeten untuk mewujudkan Indonesia yang lebih sejahtera.",
              },
            ].map((m, idx) => (
              <div
                key={idx}
                className="p-12 space-y-8 hover:bg-white transition-all duration-500 group"
              >
                <div className="text-[#1E5AA5] group-hover:scale-125 transition-transform duration-500">
                  {m.i}
                </div>
                <h3 className="text-xl font-[1000] text-gray-900 uppercase tracking-tighter">
                  {m.t}
                </h3>
                <p className="text-xs leading-relaxed text-gray-400 font-bold uppercase tracking-wide italic">
                  {m.c}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Onboarding;
