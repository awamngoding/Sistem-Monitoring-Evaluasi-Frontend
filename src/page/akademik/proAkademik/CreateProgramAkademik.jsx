/* eslint-disable no-undef */
import Sidebar from "../../../components/Sidebar";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import Input from "../../../components/Input";
import PageWrapper from "../../../components/PageWrapper";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  ArrowLeft,
  Save,
  Upload,
  ChevronDown,
  BookOpen,
  PlusCircle,
  Info,
  Target,
  FileText,
} from "lucide-react";

function CreateProgramAkademik() {
  const navigate = useNavigate();

  // State Mode & UI
  const [isTemplateMode, setIsTemplateMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Data List
  const [sekolahList, setSekolahList] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [aoList, setAoList] = useState([]);
  const [templateList, setTemplateList] = useState([]);

  // Form State
  const [namaHO, setNamaHO] = useState("");
  const [wilayahInfo, setWilayahInfo] = useState({ kota: "", provinsi: "" });
  const [selectedSekolah, setSelectedSekolah] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedAO, setSelectedAO] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [namaProgram, setNamaProgram] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tahun, setTahun] = useState(new Date().getFullYear());
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [fileMou, setFileMou] = useState(null);

  // Dropdown States
  const [openDrop, setOpenDrop] = useState(null); // 'sekolah', 'ao', 'vendor', 'template'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        if (token) {
          const decoded = jwtDecode(token);
          setNamaHO(decoded.nama || "Head Office");
        }
        const [resSek, resAo, resVen, resTem] = await Promise.all([
          fetch("http://localhost:3000/sekolah", { headers }),
          fetch("http://localhost:3000/users/ao", { headers }),
          fetch("http://localhost:3000/vendor", { headers }),
          fetch("http://localhost:3000/program?kategori=AKADEMIK", { headers }),
        ]);
        setSekolahList(await resSek.json());
        setAoList(await resAo.json());
        setVendorList(await resVen.json());
        setTemplateList(await resTem.json());
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleSekolahSelect = (id) => {
    setSelectedSekolah(id);
    setOpenDrop(null);
    const s = sekolahList.find((i) => i.id_sekolah === id);
    if (s)
      setWilayahInfo({
        kota: s.wilayah?.nama_wilayah,
        provinsi: s.wilayah?.parent?.nama_wilayah,
      });
  };

  const saveProgram = async () => {
    if (!selectedSekolah || !selectedAO || !namaProgram.trim() || !fileMou)
      return toast.error("Lengkapi data yang wajib diisi!");

    setLoading(true);
    const formData = new FormData();
    formData.append("nama_program", namaProgram);
    formData.append("deskripsi", deskripsi || "");
    formData.append("id_sekolah", String(selectedSekolah));
    formData.append("id_pengawas", String(selectedAO));
    if (selectedVendor) {
      formData.append("id_vendor", String(selectedVendor));
    }
    formData.append("kategori", "AKADEMIK");
    formData.append("status_program", "Draft");
    formData.append("tahun", String(tahun));
    if (tanggalMulai) {
      formData.append("tanggal_mulai", tanggalMulai);
    }

    formData.append("file_mou", fileMou);

    try {
      const res = await fetch("http://localhost:3000/program", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      });
      if (res.ok) {
        toast.success("Program Berhasil Dibuat!");
        navigate("/ho/program/akademik");
      } else {
        const b = await res.json();
        toast.error(b.message);
      }
    } catch (err) {
      toast.error("Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  const DropdownTrigger = ({ type, placeholder, value }) => (
    <button
      type="button"
      onClick={() => setOpenDrop(openDrop === type ? null : type)}
      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm transition-all ${openDrop === type ? "border-orange-500 ring-2 ring-orange-500/10" : "border-gray-200 bg-gray-50/50 hover:border-gray-300"}`}
    >
      <span
        className={`truncate ${value ? "text-gray-800 font-bold" : "text-gray-400"}`}
      >
        {value || placeholder}
      </span>
      <ChevronDown
        size={14}
        className={`transition-transform ${openDrop === type ? "rotate-180 text-orange-500" : ""}`}
      />
    </button>
  );

  return (
    <PageWrapper className="h-screen bg-[#EEF5FF] flex overflow-hidden !p-0">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden px-4 md:px-12 pt-6 md:pt-10 pb-0">
        <Card className="flex-1 flex flex-col !m-0 !p-0 rounded-t-[2.5rem] rounded-b-[2.5rem] border-none shadow-2xl bg-white overflow-hidden relative">
          <div className="px-8 pt-6 pb-6 shrink-0">
            <header className="flex flex-row items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-orange-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition animate-pulse"></div>
                  <div className="relative p-3.5 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl text-white shadow-xl">
                    <PlusCircle size={22} strokeWidth={2} />
                  </div>
                </div>
                <div className="flex flex-col -space-y-1">
                  <Label
                    text="Sistem Monitoring dan Evaluasi Program"
                    className="!text-[8px] !text-[#1E5AA5] !font-black tracking-[0.3em] !mb-1 uppercase"
                  />
                  <h1 className="text-xl font-black text-gray-800 tracking-tight uppercase leading-none">
                    Inisiasi Program{" "}
                    <span className="text-orange-500">Akademik</span>
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  text="← Kembali"
                  icon={<ArrowLeft size={14} />}
                  onClick={() => navigate("/ho/program/akademik")}
                  className="group !bg-gray-600 hover:!bg-gray-700 !rounded-xl !px-5 !py-2.5 !text-[10px] font-black text-white shadow-lg active:scale-95 transition-all flex items-center gap-2"
                />
              </div>
            </header>

            <div className="flex flex-row items-center gap-3 mb-6">
              <div className="flex items-center gap-3 px-5 py-2.5 bg-orange-50 text-orange-600 rounded-xl border border-orange-100 font-black text-[9px] uppercase tracking-[0.2em] shrink-0">
                <BookOpen size={14} /> Kategori: Akademik YPA-MDR
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col px-10 pb-4">
            <div className="flex-1 bg-white border border-gray-100 rounded-3xl overflow-hidden flex flex-col shadow-sm">
              <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Informasi Target */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-3 border-b-2 border-orange-100">
                      <div className="p-2 bg-orange-50 rounded-lg">
                        <Target size={20} className="text-orange-600" />
                      </div>
                      <h3 className="text-lg font-black text-gray-800 uppercase tracking-wide">
                        Informasi Target
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label text="Sekolah Sasaran" required />
                        <div className="relative">
                          <DropdownTrigger
                            type="sekolah"
                            placeholder="Pilih Sekolah"
                            value={
                              sekolahList.find(
                                (s) => s.id_sekolah === selectedSekolah,
                              )?.nama_sekolah
                            }
                          />
                          {openDrop === "sekolah" && (
                            <ul className="absolute z-40 w-full bg-white border border-gray-100 mt-2 rounded-xl shadow-2xl max-h-48 overflow-y-auto p-1">
                              {sekolahList.map((s) => (
                                <li
                                  key={s.id_sekolah}
                                  onClick={() =>
                                    handleSekolahSelect(s.id_sekolah)
                                  }
                                  className="px-4 py-2 hover:bg-orange-50 rounded-lg cursor-pointer text-sm font-bold text-gray-600 transition-colors"
                                >
                                  {s.nama_sekolah}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3">
                        <div>
                          <Label text="Provinsi" />
                          <p className="text-sm font-black text-orange-600">
                            {wilayahInfo.provinsi || "-"}
                          </p>
                        </div>
                        <div>
                          <Label text="Kabupaten / Kota" />
                          <p className="text-sm font-black text-orange-600">
                            {wilayahInfo.kota || "-"}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label text="Pengawas (AO)" required />
                        <div className="relative">
                          <DropdownTrigger
                            type="ao"
                            placeholder="Pilih Pengawas"
                            value={
                              aoList.find((a) => a.id_user === selectedAO)?.nama
                            }
                          />
                          {openDrop === "ao" && (
                            <ul className="absolute z-40 w-full bg-white border border-gray-100 mt-2 rounded-xl shadow-2xl max-h-48 overflow-y-auto p-1">
                              {aoList.map((a) => (
                                <li
                                  key={a.id_user}
                                  onClick={() => {
                                    setSelectedAO(a.id_user);
                                    setOpenDrop(null);
                                  }}
                                  className="px-4 py-2 hover:bg-orange-50 rounded-lg cursor-pointer text-sm font-bold text-gray-600 transition-colors"
                                >
                                  {a.nama}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detail Program */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-3 border-b-2 border-orange-100">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <Info size={20} className="text-green-600" />
                      </div>
                      <h3 className="text-lg font-black text-gray-800 uppercase tracking-wide">
                        Detail Program
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex p-1 bg-gray-100 rounded-xl">
                        <button
                          onClick={() => {
                            setIsTemplateMode(false);
                            setNamaProgram("");
                          }}
                          className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${!isTemplateMode ? "bg-white text-orange-600 shadow-sm" : "text-gray-400"}`}
                        >
                          Custom
                        </button>
                        <button
                          onClick={() => setIsTemplateMode(true)}
                          className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${isTemplateMode ? "bg-white text-orange-600 shadow-sm" : "text-gray-400"}`}
                        >
                          Template
                        </button>
                      </div>

                      {isTemplateMode && (
                        <div className="space-y-2">
                          <Label text="Pilih Template" />
                          <div className="relative">
                            <DropdownTrigger
                              type="template"
                              placeholder="Pilih Template"
                              value={
                                templateList.find(
                                  (t) => t.id_program === selectedTemplate,
                                )?.nama_program
                              }
                            />
                            {openDrop === "template" && (
                              <ul className="absolute z-40 w-full bg-white border border-gray-100 mt-2 rounded-xl shadow-2xl max-h-48 overflow-y-auto p-1">
                                {templateList.map((t) => (
                                  <li
                                    key={t.id_program}
                                    onClick={() => {
                                      setSelectedTemplate(t.id_program);
                                      setNamaProgram(t.nama_program);
                                      setDeskripsi(t.deskripsi || "");
                                      setOpenDrop(null);
                                    }}
                                    className="px-4 py-2 hover:bg-orange-50 rounded-lg cursor-pointer text-sm font-bold text-gray-600 transition-colors"
                                  >
                                    {t.nama_program}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label text="Nama Program" required />
                        <Input
                          placeholder="cth: Pelatihan IT"
                          value={namaProgram}
                          onChange={(e) => setNamaProgram(e.target.value)}
                          className="bg-gray-50 border-transparent focus:bg-white font-bold"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label text="Deskripsi Singkat" />
                        <textarea
                          className="w-full bg-gray-50 border-none rounded-xl p-4 text-sm font-medium focus:ring-2 focus:ring-orange-500/20 h-32 resize-none"
                          placeholder="Tulis tujuan program..."
                          value={deskripsi}
                          onChange={(e) => setDeskripsi(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Logistik & Dokumen */}
                <div className="mt-8 space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b-2 border-orange-100">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <FileText size={20} className="text-blue-600" />
                    </div>
                    <h3 className="text-lg font-black text-gray-800 uppercase tracking-wide">
                      Logistik & Dokumen
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label text="Tahun" required />
                      <Input
                        type="number"
                        value={tahun}
                        onChange={(e) => setTahun(e.target.value)}
                        className="bg-gray-50 border-transparent text-center font-black"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label text="Mulai" />
                      <Input
                        type="date"
                        value={tanggalMulai}
                        onChange={(e) => setTanggalMulai(e.target.value)}
                        className="bg-gray-50 border-transparent text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label text="Vendor Eksternal" />
                      <div className="relative">
                        <DropdownTrigger
                          type="vendor"
                          placeholder="Pilih Vendor (Optional)"
                          value={
                            vendorList.find(
                              (v) => v.id_vendor === selectedVendor,
                            )?.nama_vendor
                          }
                        />
                        {openDrop === "vendor" && (
                          <ul className="absolute z-40 w-full bg-white border border-gray-100 mt-2 rounded-xl shadow-2xl max-h-48 overflow-y-auto p-1">
                            <li
                              onClick={() => {
                                setSelectedVendor(null);
                                setOpenDrop(null);
                              }}
                              className="px-4 py-2 hover:bg-gray-100 rounded-lg italic text-gray-400 text-sm"
                            >
                              Tanpa Vendor
                            </li>
                            {vendorList.map((v) => (
                              <li
                                key={v.id_vendor}
                                onClick={() => {
                                  setSelectedVendor(v.id_vendor);
                                  setOpenDrop(null);
                                }}
                                className="px-4 py-2 hover:bg-orange-50 rounded-lg cursor-pointer text-sm font-bold text-gray-600 transition-colors"
                              >
                                {v.nama_vendor}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label text="Upload MOU" required />
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-orange-50/30 hover:border-orange-500 transition-all cursor-pointer group">
                      <Upload
                        size={24}
                        className="text-gray-300 group-hover:text-orange-500 mb-2 transition-colors"
                      />
                      <div className="text-center px-4">
                        <p className="text-[10px] font-black text-gray-400 group-hover:text-orange-600 truncate w-full">
                          {fileMou ? fileMou.name : "KLIK UNTUK UNGGAH MOU"}
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => setFileMou(e.target.files[0])}
                        accept=".pdf,.jpg,.png"
                      />
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                  <Button
                    text={loading ? "Menyimpan..." : "Simpan Program"}
                    icon={<Save size={14} />}
                    disabled={loading}
                    onClick={saveProgram}
                    className="!bg-orange-50 !text-orange-600 hover:!bg-orange-600 hover:!text-white !rounded-xl !px-6 !py-3 !text-sm font-black transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </PageWrapper>
  );
}

export default CreateProgramAkademik;
