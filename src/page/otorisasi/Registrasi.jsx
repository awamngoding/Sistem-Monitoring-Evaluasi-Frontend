import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ypaLogo from "../../assets/img/YPA-MDR-LOGO.png";
import { Mail, Lock, User, School } from "lucide-react";
import { toast } from "react-toastify";

export default function Registrasi() {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedSekolah, setSelectedSekolah] = useState("");
  const [sekolahList, setSekolahList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSekolah = async () => {
      try {
        const res = await fetch("http://localhost:3000/sekolah");
        const data = await res.json();
        setSekolahList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSekolah();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!selectedSekolah) return toast.error("Pilih sekolah terlebih dahulu");

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama,
          email,
          password,
          id_sekolah: Number(selectedSekolah),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Gagal registrasi");

      toast.success("Registrasi berhasil! Silakan login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10"
      >
        <img src={ypaLogo} alt="YPA Logo" className="w-32 mb-6 mx-auto" />

        <h1 className="text-2xl font-extrabold text-[#2755a1] mb-1 text-center">
          Daftar Akun Sekolah
        </h1>
        <p className="text-gray-500 text-sm text-center mb-6">
          Isi data diri dan pilih sekolah kamu
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* NAMA */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Nama</label>
            <div className="relative mt-1">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama lengkap"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-[#2755a1]"
                required
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <div className="relative mt-1">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email aktif"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-[#2755a1]"
                required
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Buat password"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-[#2755a1]"
                required
              />
            </div>
          </div>

          {/* SEKOLAH */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Sekolah
            </label>
            <div className="relative mt-1">
              <School
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <select
                value={selectedSekolah}
                onChange={(e) => setSelectedSekolah(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-[#2755a1]"
                required
              >
                <option value="">Pilih sekolah</option>
                {sekolahList.map((s) => (
                  <option key={s.id_sekolah} value={s.id_sekolah}>
                    {s.nama_sekolah}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#2755a1] hover:bg-[#1e4280] rounded-xl text-white font-bold text-lg mt-2"
          >
            {loading ? "Mendaftar..." : "Daftar"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Sudah punya akun?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#2755a1] font-semibold cursor-pointer hover:underline"
          >
            Login di sini
          </span>
        </p>
      </motion.div>
    </div>
  );
}
