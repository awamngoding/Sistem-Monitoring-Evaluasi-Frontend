import Sidebar from "../../components/Sidebar";
import Card from "../../components/Card";
import Button from "../../components/Button";
import PageWrapper from "../../components/PageWrapper";

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
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3000/assessment/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok)
          throw new Error(data?.message || "Gagal memuat assessment");
        setAssessment({
          ...data,
          questions: Array.isArray(data.questions) ? data.questions : [],
        });
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
    <PageWrapper className="h-screen bg-[#EEF5FF] flex overflow-hidden !p-0">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden px-4 md:px-12 pt-6 md:pt-10 pb-0">
        <Card className="flex-1 flex flex-col !m-0 !p-0 rounded-t-[2.5rem] rounded-b-[2.5rem] border-none shadow-2xl bg-white overflow-auto">
          <div className="px-8 py-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[#1E5AA5] font-black mb-2">
                    Isi Assessment Sekolah
                  </p>
                  <h1 className="text-3xl font-black text-gray-800">
                    {assessment?.nama ?? "Isi Assessment"}
                  </h1>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    text="← Kembali"
                    variant="ghost"
                    onClick={() => navigate("/sekolah/dashboard")}
                    className="!rounded-xl"
                  />
                </div>
              </div>

              <Card className="bg-white rounded-[1.75rem] shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-bold text-gray-700">
                    Nama Lengkap Pengisi (Guru) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={namaPengisi}
                    onChange={(e) => setNamaPengisi(e.target.value)}
                    placeholder="Masukkan nama lengkap Anda..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#2E5AA7] outline-none transition"
                  />
                  <p className="text-[11px] text-gray-400 italic">
                    * Wajib diisi karena akun ini digunakan secara kolektif oleh sekolah.
                  </p>
                </div>
              </Card>

              {assessment?.questions.map((q, index) => (
                <Card key={index} className="bg-white rounded-[1.75rem] shadow-sm border border-gray-200 p-6">
                  <p className="font-semibold text-gray-800 mb-5">
                    {index + 1}. {q.question}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleJawab(q.id_pertanyaan, opt)}
                        className={`w-full px-4 py-3 rounded-2xl border text-left text-sm font-semibold transition ${
                          jawaban[q.id_pertanyaan] === opt
                            ? "bg-[#2E5AA7] text-white border-[#2E5AA7]"
                            : "bg-white text-gray-700 border-gray-200 hover:border-[#2E5AA7]"
                        }`}
                      >
                        {String.fromCharCode(65 + i)}. {opt}
                      </button>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                Pastikan semua pertanyaan terjawab sebelum mengirim.
              </div>
              <Button
                text={submitting ? "Mengirim..." : "Kirim Jawaban"}
                onClick={handleSubmit}
                disabled={submitting}
              />
            </div>
          </div>
        </Card>
      </main>
    </PageWrapper>
  );
}

export default IsiAssessmentSekolah;
