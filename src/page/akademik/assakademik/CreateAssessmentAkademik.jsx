/* eslint-disable no-undef */
import Sidebar from "../../../components/Sidebar";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import Input from "../../../components/Input";
import IconButton from "../../../components/IconButton";
import bgImage from "../../../assets/img/wayangkulit.jpg";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

function CreateAssessmentAkademik() {
  const navigate = useNavigate();
  const [hoList, setHoList] = useState([]);
  const [selectedHo, setSelectedHo] = useState(null);
  const [sekolahList, setSekolahList] = useState([]);
  const [selectedSekolah, setSelectedSekolah] = useState(null);
  const [loading, setLoading] = useState(false);
  const [namaAssessment, setNamaAssessment] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""] },
  ]);
  const [tenggat, setTenggat] = useState(7);

  useEffect(() => {
    const fetchHo = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/users/ho", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setHoList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setHoList([]);
      }
    };
    fetchHo();

    const fetchSekolah = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/sekolah", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setSekolahList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setSekolahList([]);
      }
    };
    fetchSekolah();
  }, []);

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""] }]);
  };

  const removeQuestion = (index) => {
    if (questions.length === 1) return;
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const saveAssessment = async () => {
    if (!selectedHo) return toast.error("Silakan pilih HO terlebih dahulu");
    if (!selectedSekolah)
      return toast.error("Silakan pilih sekolah terlebih dahulu");
    if (!namaAssessment.trim())
      return toast.error("Nama assessment harus diisi");

    for (let q of questions) {
      if (!q.question.trim())
        return toast.error("Pertanyaan tidak boleh kosong");
      if (q.options.some((opt) => !opt.trim()))
        return toast.error("Semua pilihan harus diisi");
    }

    const payload = {
      id_ho: Number(selectedHo),
      nama: namaAssessment.trim(),
      id_sekolah: Number(selectedSekolah),
      tenggat: tenggat,
      jenis: "akademik",
      questions: questions.map((q) => ({
        question: q.question.trim(),
        options: q.options.map((opt) => opt.trim()),
      })),
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resBody = await res.json();

      if (!res.ok) {
        toast.error(resBody.message || "Gagal membuat assessment");
        return;
      }

      toast.success("Assessment akademik berhasil dibuat!");
      navigate("/ho/assessment/akademik/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Gagal membuat assessment. Cek console untuk detail.");
    } finally {
      setLoading(false);
    }
  };

  function HoPicker() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const selectedHoName =
      hoList.find((h) => h.id_user === selectedHo)?.nama || "Pilih HO";

    return (
      <div className="relative w-full max-w-xs">
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full border px-4 py-2 text-left bg-white rounded shadow"
        >
          {selectedHoName}
        </button>
        {dropdownOpen && (
          <ul className="absolute z-10 w-full bg-white border mt-1 rounded shadow max-h-60 overflow-y-auto">
            {hoList.map((ho) => (
              <li
                key={ho.id_user}
                onClick={() => {
                  setSelectedHo(ho.id_user);
                  setDropdownOpen(false);
                }}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {ho.nama}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  function SekolahPicker() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const selectedSekolahName =
      sekolahList.find((s) => s.id_sekolah === selectedSekolah)?.nama_sekolah ||
      "Pilih Sekolah";

    return (
      <div className="relative w-full max-w-xs">
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full border px-4 py-2 text-left bg-white rounded shadow"
        >
          {selectedSekolahName}
        </button>
        {dropdownOpen && (
          <ul className="absolute z-10 w-full bg-white border mt-1 rounded shadow max-h-60 overflow-y-auto">
            {sekolahList.map((s) => (
              <li
                key={s.id_sekolah}
                onClick={() => {
                  setSelectedSekolah(s.id_sekolah);
                  setDropdownOpen(false);
                }}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {s.nama_sekolah}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#2E5AA7] to-[#4989C2] min-h-screen p-4 flex flex-col lg:flex-row gap-3">
      <Sidebar />
      <main
        className="flex-1 flex flex-col items-center justify-center rounded-[25px] lg:rounded-[40px] px-10 pt-6 pb-9 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="w-full max-w-3xl flex flex-col items-center gap-8">
          <Card className="w-full bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-bold text-[#2E5AA7] mb-6">
              Buat Soal Assessment Akademik
            </h2>

            <Label text="Nama HO" required />
            <HoPicker />
            <div className="mb-6">
              <Label text="Sekolah Tujuan" required />
              <SekolahPicker />
            </div>

            <div className="mb-6">
              <Label text="Nama Assessment" required />
              <Input
                placeholder="Masukkan nama assessment..."
                value={namaAssessment}
                onChange={(e) => setNamaAssessment(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <Label text="Tenggat Pengisian (hari)" required />
              <Input
                type="number"
                placeholder="Contoh: 7"
                value={tenggat}
                onChange={(e) => setTenggat(Number(e.target.value))}
                min={1}
              />
            </div>

            <div className="max-h-[420px] overflow-y-auto pr-2 space-y-4">
              {questions.map((q, index) => (
                <Card
                  key={index}
                  className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm"
                >
                  <div className="flex justify-between items-center mb-3">
                    <Label text={`Pertanyaan ${index + 1}`} required />
                    <IconButton
                      icon={<Trash2 size={16} />}
                      onClick={() => removeQuestion(index)}
                      variant="danger"
                    />
                  </div>
                  <Input
                    placeholder="Masukkan pertanyaan..."
                    value={q.question}
                    onChange={(e) =>
                      handleQuestionChange(index, e.target.value)
                    }
                  />
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {q.options.map((opt, optIndex) => (
                      <div key={optIndex}>
                        <Label
                          text={`Pilihan ${String.fromCharCode(65 + optIndex)}`}
                        />
                        <Input
                          value={opt}
                          placeholder={`Masukkan pilihan ${String.fromCharCode(65 + optIndex)}`}
                          onChange={(e) =>
                            handleOptionChange(index, optIndex, e.target.value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex mt-6">
              <Button text="+ Tambah Pertanyaan" onClick={addQuestion} />
            </div>

            <div className="flex justify-between mt-8">
              <Button
                text="← Kembali"
                variant="ghost"
                onClick={() => navigate("/ho/assessment/akademik/dashboard")}
              />
              <Button text="Simpan Assessment" onClick={saveAssessment} />
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default CreateAssessmentAkademik;
