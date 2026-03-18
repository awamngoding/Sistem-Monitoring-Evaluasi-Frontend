/* eslint-disable no-unused-vars */
import Sidebar from "../../components/Sidebar";
import Card from "../../components/Card";
import Button from "../../components/Button";

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

function IsiAssessmentSekolah() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [assessment, setAssessment] = useState(null);
  const [jawaban, setJawaban] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [namaPengisi, setNamaPengisi] = useState(""); // State untuk menyimpan nama pengisi

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const res = await fetch(`http://localhost:3000/assessment/${id}`);
        const data = await res.json();
        setAssessment(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssessment();
  }, [id]);

  const handleJawab = (id_pertanyaan, jawaban_dipilih) => {
    setJawaban((prev) => ({ ...prev, [id_pertanyaan]: jawaban_dipilih }));
  };

  const handleSubmit = async () => {
    if (!assessment) return;

    // VALIDASI: Cek apakah nama pengisi sudah diisi
    if (!namaPengisi.trim()) {
      return toast.error("Silakan isi Nama Lengkap Anda terlebih dahulu!");
    }

    const totalSoal = assessment.questions.length;
    const totalDijawab = Object.keys(jawaban).length;

    if (totalDijawab < totalSoal)
      return toast.error("Harap jawab semua pertanyaan terlebih dahulu!");

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const id_user = decoded.sub;

      const payload = {
        id_user,
        nama_pengisi: namaPengisi, // Tambahkan nama pengisi ke payload
        jawaban: Object.entries(jawaban).map(([id_pertanyaan, jawaban]) => ({
          id_pertanyaan: Number(id_pertanyaan),
          jawaban,
        })),
      };

      const res = await fetch(`http://localhost:3000/assessment/${id}/jawab`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Gagal submit jawaban");

      toast.success("Jawaban berhasil dikirim!");
      navigate("/sekolah/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengirim jawaban");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="bg-gradient-to-b from-[#2E5AA7] to-[#4989C2] min-h-screen p-4 flex flex-col lg:flex-row gap-3">
      <Sidebar />

      <main className="flex-1 flex flex-col bg-[#F3F4F4] rounded-[25px] lg:rounded-[40px] px-10 pt-6 pb-9 overflow-auto">
        <h1 className="text-xl font-semibold text-gray-500 mt-3 mb-4 text-center">
          {assessment?.nama ?? "Isi Assessment"}
        </h1>

        <div className="flex flex-col gap-4">
          {/* INPUT NAMA PENGISI */}
          <Card className="bg-white rounded-xl shadow-md p-6 border-l-8 border-[#2E5AA7]">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">
                Nama Lengkap Pengisi (Guru){" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={namaPengisi}
                onChange={(e) => setNamaPengisi(e.target.value)}
                placeholder="Masukkan nama lengkap Anda..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2E5AA7] outline-none transition"
              />
              <p className="text-[10px] text-gray-400 italic">
                * Wajib diisi karena akun ini digunakan secara kolektif oleh
                sekolah.
              </p>
            </div>
          </Card>

          {/* DAFTAR PERTANYAAN */}
          {assessment?.questions.map((q, index) => (
            <Card key={index} className="bg-white rounded-xl shadow-md p-6">
              <p className="font-semibold text-gray-700 mb-4">
                {index + 1}. {q.question}
              </p>

              <div className="grid grid-cols-2 gap-3">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleJawab(q.id_pertanyaan, opt)}
                    className={`px-4 py-2 rounded-lg border text-left text-sm transition ${
                      jawaban[q.id_pertanyaan] === opt
                        ? "bg-[#2E5AA7] text-white border-[#2E5AA7]"
                        : "bg-white text-gray-700 border-gray-300 hover:border-[#2E5AA7]"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}. {opt}
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <Button
            text="← Kembali"
            variant="ghost"
            onClick={() => navigate("/sekolah/dashboard")}
          />
          <Button
            text={submitting ? "Mengirim..." : "Kirim Jawaban"}
            onClick={handleSubmit}
            disabled={submitting}
          />
        </div>
      </main>
    </div>
  );
}

export default IsiAssessmentSekolah;
