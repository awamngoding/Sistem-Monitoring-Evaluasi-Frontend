import Sidebar from "../../../components/Sidebar";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import Input from "../../../components/Input";
import IconButton from "../../../components/IconButton";

import { Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function EditAssessmentNonAkademik() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [questions, setQuestions] = useState([
    {
      question: "Apakah vendor memiliki standar keamanan kerja?",
      options: [
        "Ya, lengkap",
        "Ada tetapi tidak lengkap",
        "Tidak ada",
        "Tidak tahu",
      ],
    },
    {
      question: "Apakah vendor memiliki sertifikasi resmi?",
      options: ["ISO", "SNI", "Tidak memiliki", "Dalam proses"],
    },
    {
      question: "Bagaimana kualitas pelayanan vendor?",
      options: ["Sangat Baik", "Baik", "Cukup", "Buruk"],
    },
  ]);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const res = await fetch(`http://localhost:3000/assessment/${id}`);
        const data = await res.json();

        console.log("DATA BACKEND:", data);

        setQuestions(data.questions || []);
      } catch (err) {
        console.error("Gagal mengambil assessment", err);
      }
    };

    fetchAssessment();
  }, [id]);

  // Edit pertanyaan
  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };

  // Edit pilihan
  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  // Hapus soal
  const removeQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  // Tambah soal
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
      },
    ]);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:3000/assessment/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions }), // body sesuai service
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Gagal update assessment:", errorData);
        return;
      }

      const data = await res.json();
      console.log("UPDATE RESPONSE:", data);
      navigate("/ho/dashboard");
    } catch (err) {
      console.error("Gagal update assessment", err);
    }
  };
  return (
    <div className="bg-gradient-to-b from-[#2E5AA7] to-[#4989C2] min-h-screen p-4 flex flex-col lg:flex-row gap-3">
      <Sidebar />

      {/* MAIN */}
      <main className="flex-1 flex flex-col bg-[#F3F4F4] rounded-[25px] lg:rounded-[40px] px-10 pt-6 pb-9 overflow-hidden">
        <h1 className="text-xl font-semibold text-gray-500 mt-3 mb-4 text-center">
          Edit Assessment
        </h1>

        <div className="flex flex-col w-full h-full gap-4">
          <Card className="w-full bg-white/90 rounded-2xl shadow-lg flex flex-col">
            {/* HEADER */}
            <div className="flex items-center justify-between px-8 py-5 border-b">
              <div>
                <h2 className="text-lg font-semibold text-[#2E5AA7]">
                  Edit Soal Assessment
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Total {questions.length} Pertanyaan
                </p>
              </div>

              <Button
                text="← Kembali"
                variant="ghost"
                onClick={() => navigate("/ho/dashboard")}
              />
            </div>

            {/* LIST SOAL */}
            <div className="px-8 py-6 max-h-[600px] overflow-y-auto space-y-4">
              {questions.map((q, index) => (
                <Card
                  key={index}
                  className="border border-gray-200 rounded-xl p-4 shadow-sm"
                >
                  {/* HEADER SOAL */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-4 w-full">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2E5AA7] text-white text-sm font-semibold shrink-0">
                        {index + 1}
                      </div>

                      <div className="w-full">
                        <Label text="Pertanyaan" />

                        <Input
                          value={q.question}
                          onChange={(e) =>
                            handleQuestionChange(index, e.target.value)
                          }
                          placeholder="Masukkan pertanyaan..."
                        />
                      </div>
                    </div>

                    {/* DELETE BUTTON */}
                    <IconButton
                      icon={<Trash2 size={18} />}
                      variant="danger"
                      onClick={() => removeQuestion(index)}
                    />
                  </div>

                  {/* PILIHAN */}
                  <div className="grid grid-cols-2 gap-3 pl-12">
                    {q.options.map((opt, i) => (
                      <div key={i}>
                        <Label
                          text={`Pilihan ${String.fromCharCode(65 + i)}`}
                        />

                        <Input
                          value={opt}
                          placeholder="Masukkan pilihan"
                          onChange={(e) =>
                            handleOptionChange(index, i, e.target.value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {/* FOOTER */}
            <div className="flex justify-between px-8 py-5 border-t">
              <Button text="+ Tambah Pertanyaan" onClick={addQuestion} />

              <Button text="Simpan Perubahan" onClick={handleSave} />
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default EditAssessmentNonAkademik;
