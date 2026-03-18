/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import ypaLogo from "../../assets/img/YPA-MDR-LOGO.png";
import akademikBg from "../../assets/img/akademik.jpg";
import karakterBg from "../../assets/img/karakter.jpg";
import kecakapanhidupBg from "../../assets/img/kecakapanhidup.jpeg";
import senibudayaBg from "../../assets/img/senibudaya.jpg";
import { jwtDecode } from "jwt-decode";

import { Mail, Lock, Check } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  // FORM STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI STATE
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      title: "Akademik",
      description:
        "Meningkatkan kualitas pendidikan melalui berbagai program, salah satunya dengan memberikan pelatihan akademik untuk meningkatkan kompetensi SDM di lingkungan sekolah binaan.",
      bgImage: akademikBg,
    },
    {
      title: "Karakter",
      description:
        "Warga sekolah diberikan pembinaan untuk mengembangkan karakter yang berlandaskan nilai-nilai luhur bangsa Indonesia.",
      bgImage: karakterBg,
    },
    {
      title: "Kecakapan Hidup",
      description:
        "Siswa dibekali dengan kecakapan hidup agar dapat meningkatkan perekonomian di daerahnya.",
      bgImage: kecakapanhidupBg,
    },
    {
      title: "Seni Budaya",
      description:
        "Pembinaan seni budaya diberikan agar seni budaya lokal dapat dilestarikan.",
      bgImage: senibudayaBg,
    },
  ];

  // ANIMATION VARIANTS
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePillar((prev) => (prev + 1) % pillars.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      localStorage.removeItem("token");

      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Email atau Password salah");

      const result = await res.json();

      const token = result.access_token;

      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      const role = decoded.role.toLowerCase();
      const jenis = decoded.jenis;

      const rolePaths = {
        admin: "/admin/dashboard",
        ho:
          jenis === "akademik"
            ? "/ho/assessment/akademik/dashboard"
            : "/ho/dashboard",
        ao: "/ao/dashboard",
        vendor: "/vendor/dashboard",
        guru: "/sekolah/dashboard",
        pengurus: "/pengurus/dashboard",
      };

      setLoginSuccess(true);

      await new Promise((r) => setTimeout(r, 1500));

      navigate(rolePaths[role] || "/");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-10">
      {/* SUCCESS OVERLAY */}
      <AnimatePresence>
        {loginSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/95 z-50 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="w-24 h-24 bg-[#2755a1] rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#2755a1]">
                Login Berhasil
              </h2>
              <p className="text-gray-600 mt-2">Mengalihkan ke dashboard...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-6xl bg-white rounded-2xl lg:rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row">
          {/* LEFT - FORM */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:w-1/2 px-5 py-8 sm:px-8 sm:py-10 lg:p-14"
          >
            <motion.img
              variants={item}
              src={ypaLogo}
              alt="YPA Logo"
              className="w-32 sm:w-40 mb-8"
            />

            <motion.h1
              variants={item}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2755a1] mb-3"
            >
              Selamat Datang 👋
            </motion.h1>

            <motion.p
              variants={item}
              className="text-gray-500 mb-6 sm:mb-8 lg:mb-10 text-sm sm:text-base lg:text-lg font-semibold"
            >
              Silakan masuk untuk melanjutkan aktivitas Anda.
            </motion.p>

            <motion.form
              variants={item}
              onSubmit={handleLogin}
              className="space-y-6"
            >
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Email
                </label>
                <div className="relative mt-2">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-[#2755a1]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative mt-2">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-[#2755a1]"
                    required
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3 bg-[#2755a1] hover:bg-[#1e4280] rounded-xl text-white font-bold text-lg"
              >
                {loading ? "Loading..." : "Sign In"}
              </motion.button>
              <p className="text-center text-sm text-gray-500 mt-4">
                Belum punya akun?{" "}
                <span
                  onClick={() => navigate("/registrasi")}
                  className="text-[#2755a1] font-semibold cursor-pointer hover:underline"
                >
                  Daftar di sini
                </span>
              </p>
            </motion.form>
          </motion.div>

          {/* RIGHT - PILLAR */}
          <div className="lg:w-1/2 relative overflow-hidden min-h-[300px] lg:min-h-full">
            <motion.div
              key={activePillar}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${pillars[activePillar].bgImage})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10"></div>

            <div className="relative z-10 h-full flex items-end p-6 sm:p-8">
              <div className="max-w-md">
                <h2 className="text-lg font-bold text-white mb-2">
                  {pillars[activePillar].title}
                </h2>
                <p className="text-xs text-white/80 leading-relaxed">
                  {pillars[activePillar].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
