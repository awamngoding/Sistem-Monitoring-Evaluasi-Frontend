/* eslint-disable no-unused-vars */
import Sidebar from "../../../components/Sidebar";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function DetailAssessmentNonAkademik() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [questions, setQuestions] = useState([]);
  const [daftarPengisi, setDaftarPengisi] = useState([]);
  const [totalPengisi, setTotalPengisi] = useState(0); // State baru untuk pembagi persentase
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const res = await fetch(`http://localhost:3000/assessment/${id}`);
        const data = await res.json();

        setQuestions(data.questions || []);
        setDaftarPengisi(data.daftar_pengisi || []);
        setTotalPengisi(data.total_pengisi || 0);
      } catch (error) {
        console.error("Gagal mengambil detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F3F4F4]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E5AA7]"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#2E5AA7] to-[#4989C2] min-h-screen p-4 flex flex-col lg:flex-row gap-3">
      <Sidebar />

      {/* MAIN */}
      <main className="flex-1 flex flex-col bg-[#F3F4F4] rounded-[25px] lg:rounded-[40px] px-10 pt-6 pb-9 overflow-auto">
        <h1 className="text-xl font-semibold text-gray-500 mt-3 mb-4 text-center">
          Analisis Hasil Assessment
        </h1>

        <div className="flex flex-col w-full gap-6">
          {/* CARD DAFTAR PENGISI (GURU) */}
          <Card className="w-full bg-white rounded-2xl shadow-md p-6 border-l-8 border-amber-500">
            <h2 className="text-lg font-bold text-[#2E5AA7] mb-3 flex items-center gap-2">
              Daftar Guru yang Sudah Mengisi ({totalPengisi})
            </h2>
            {daftarPengisi && daftarPengisi.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {daftarPengisi.map((nama, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold border border-amber-200 shadow-sm"
                  >
                    {nama}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic font-light">
                Belum ada guru yang mengisi assessment ini.
              </p>
            )}
          </Card>

          {/* CONTAINER DAFTAR SOAL & DIAGRAM */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-bold text-gray-700">
                Statistik Jawaban
              </h2>
              <Button
                text="← Kembali"
                variant="ghost"
                onClick={() => navigate("/ho/dashboard")}
              />
            </div>

            {questions.map((q, index) => (
              <Card
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
              >
                {/* PERTANYAAN */}
                <div className="flex items-start gap-4 mb-8">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2E5AA7] text-white font-bold shrink-0 shadow-md">
                    {index + 1}
                  </div>
                  <p className="text-lg font-medium text-gray-800 pt-1 leading-relaxed">
                    {q.question}
                  </p>
                </div>

                {/* DIAGRAM BATANG (BAR CHART) */}

                <div className="space-y-5 pl-14">
                  {q.stats?.map((stat, i) => {
                    // Hitung persentase berdasarkan total pengisi
                    const percentage =
                      totalPengisi > 0 ? (stat.count / totalPengisi) * 100 : 0;

                    return (
                      <div key={i} className="group">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600 group-hover:text-black transition-colors font-medium">
                            {stat.label}
                          </span>
                          <span className="font-bold text-[#2E5AA7]">
                            {stat.count} Guru ({Math.round(percentage)}%)
                          </span>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="w-full bg-gray-100 h-3.5 rounded-full overflow-hidden border border-gray-50 shadow-inner">
                          {/* Progress Bar Filler */}
                          <div
                            className="bg-gradient-to-r from-[#2E5AA7] to-[#4989C2] h-full transition-all duration-1000 ease-out shadow-sm"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default DetailAssessmentNonAkademik;
