/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import {
  LockKeyhole,
  User,
  ChevronLeft,
  Fingerprint,
  Sparkles,
  MousePointer2,
} from "lucide-react";
import Swal from "sweetalert2";

// ATOMIC COMPONENTS
import Input from "../../components/Input";
import Button from "../../components/Button";
import PageWrapper from "../../components/PageWrapper";
import Label from "../../components/Label";

// ASSETS
import logo_ypamdr_blue from "../../assets/img/YPA-MDR-LOGO.png";
import akademikBg from "../../assets/img/akademik.jpg";
import karakterBg from "../../assets/img/karakter.jpg";
import kecakapanhidupBg from "../../assets/img/kecakapanhidup.jpeg";
import senibudayaBg from "../../assets/img/senibudaya.jpg";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [activePillar, setActivePillar] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const ASTRA_BLUE = "#0a5ea8";
  const LIGHT_BLUE = "#3b82f6";
  const ERROR_RED = "#ef4444";

  const pillars = [
    {
      title: "Akademik",
      image: akademikBg,
      code: "PILLAR 01",
      desc: "Membangun SDM unggul melalui transformasi pendidikan berkualitas.",
    },
    {
      title: "Karakter",
      image: karakterBg,
      code: "PILLAR 02",
      desc: "Membentuk generasi berbudi pekerti luhur dan berintegritas tinggi.",
    },
    {
      title: "Kecakapan",
      image: kecakapanhidupBg,
      code: "PILLAR 03",
      desc: "Mewujudkan kemandirian ekonomi daerah berbasis vokasi unggulan.",
    },
    {
      title: "Budaya",
      image: senibudayaBg,
      code: "PILLAR 04",
      desc: "Menjaga warisan nusantara untuk peradaban masa depan.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePillar((prev) => (prev + 1) % pillars.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX - innerWidth / 2) / 60;
    const y = (clientY - innerHeight / 2) / 60;
    setMousePosition({ x, y });
  };

  const getTargetPath = (decoded) => {
    // Debugging - lihat isi decoded
    console.log("Isi decoded token:", decoded);

    // Ambil role (backend kirimnya pake 'role', bukan 'nama_role')
    const role = String(decoded.role || "")
      .trim()
      .toLowerCase();
    const jenis = String(decoded.jenis || "")
      .trim()
      .toLowerCase();

    console.log("Role yang didapat:", role);
    console.log("Jenis:", jenis);

    // Cek role
    if (role === "admin") {
      return "/admin/dashboard";
    }

    if (role === "ho") {
      return jenis === "akademik"
        ? "/ho/dashboard/akademik"
        : "/ho/dashboard/non-akademik";
    }

    // Default ke sekolah
    return "/sekolah/dashboard";
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      localStorage.clear();
      // 1. Kirim dengan key yang sesuai DTO NestJS
      const res = await axios.post("http://localhost:3000/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const token = res.data.access_token;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);

      Swal.fire({
        html: `
        <style>
          .auth-container { font-family: 'Poppins', sans-serif; display: flex; flex-direction: column; align-items: center; padding: 40px 20px; }
          .logo-text { font-size: 32px; font-weight: 900; color: white; -webkit-text-stroke: 1px ${LIGHT_BLUE}; letter-spacing: 3px; margin-bottom: 8px; }
          .subtitle-text { font-size: 9px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 30px; text-align: center; }
          .loader-wrapper { width: 180px; height: 3px; background: #f3f4f6; border-radius: 10px; overflow: hidden; position: relative; }
          .loader-bar { width: 0%; height: 100%; background: linear-gradient(90deg, ${ASTRA_BLUE}, ${LIGHT_BLUE}); animation: fillBar 1.8s forwards; }
          @keyframes fillBar { 100% { width: 100%; } }
        </style>
        <div class="auth-container">
          <h1 class="logo-text">YPA-MDR</h1>
          <p class="subtitle-text">Sistem Pemantauan dan Evaluasi Program</p>
          <div class="loader-wrapper"><div class="loader-bar"></div></div>
        </div>`,
        background: "#ffffff",
        showConfirmButton: false,
        timer: 2500,
        width: "400px",
        customClass: { popup: "rounded-[2.5rem] shadow-2xl" },
      });

      const targetPath = getTargetPath(decoded);
      setTimeout(() => navigate(targetPath), 2500);
    } catch (err) {
      // 2. Proses error data dari NestJS (Handle Array/Object)
      const errorData = err.response?.data;
      let serverMessage = "INVALID CREDENTIALS";

      if (errorData?.message) {
        serverMessage = Array.isArray(errorData.message)
          ? errorData.message.join(" | ")
          : errorData.message;
      }

      Swal.fire({
        html: `
        <style>
          .auth-container { font-family: 'Poppins', sans-serif; display: flex; flex-direction: column; align-items: center; padding: 40px 20px; }
          .logo-text-error { font-size: 32px; font-weight: 900; color: white; -webkit-text-stroke: 1px ${ERROR_RED}; letter-spacing: 3px; margin-bottom: 8px; animation: shake 0.4s both; }
          .error-msg { margin-top: 20px; font-size: 11px; font-weight: 800; color: ${ERROR_RED}; text-transform: uppercase; text-align: center; line-height: 1.5; }
          @keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } }
        </style>
        <div class="auth-container">
          <h1 class="logo-text-error">YPA-MDR</h1>
          <p class="error-msg">ACCESS DENIED:<br>${serverMessage}</p>
        </div>`,
        background: "#ffffff",
        showConfirmButton: true,
        confirmButtonText: "RETRY",
        confirmButtonColor: ERROR_RED,
        width: "400px",
        customClass: {
          popup: "rounded-[2.5rem] shadow-2xl",
          confirmButton:
            "rounded-full px-8 py-2 text-[10px] font-black tracking-widest",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper className="!p-0 h-screen w-full bg-[#0a5ea8] flex overflow-hidden select-none">
      {/* LEFT PANEL: PARALLAX */}
      <div
        className="hidden lg:flex lg:w-[65%] relative overflow-hidden bg-white"
        onMouseMove={handleMouseMove}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePosition.x,
              y: mousePosition.y,
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5 }}
            className="absolute -inset-20 bg-cover bg-center"
            style={{ backgroundImage: `url(${pillars[activePillar].image})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent z-10" />
        <div className="relative z-30 w-full h-full flex flex-col justify-between p-20">
          <img
            src={logo_ypamdr_blue}
            alt="Logo"
            className="h-11 w-auto self-start"
          />
          <div className="max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar}
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 40, opacity: 0 }}
                className="space-y-4"
              >
                <span className="text-[#0a5ea8] font-mono text-sm font-black tracking-widest">
                  {pillars[activePillar].code}
                </span>
                <h2 className="text-[100px] font-[1000] leading-none uppercase">
                  {pillars[activePillar].title}
                </h2>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-end justify-between">
            <div className="flex gap-3 mb-4">
              {pillars.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 transition-all duration-700 ${idx === activePillar ? "w-[60px] bg-[#0a5ea8]" : "w-[15px] bg-black/10"}`}
                />
              ))}
            </div>
            <div className="p-6 bg-white/30 backdrop-blur-xl rounded-[2rem] w-[280px] shadow-2xl flex gap-4 items-center">
              <div className="w-10 h-10 rounded-xl bg-[#0a5ea8] flex items-center justify-center text-white">
                <Sparkles size={18} />
              </div>
              <p className="text-[11px] font-bold italic">
                "{pillars[activePillar].desc}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: LOGIN FORM */}
      <div className="w-full lg:w-[35%] bg-[#0a5ea8] flex flex-col justify-center p-12 lg:p-20 relative">
        <button
          onClick={() => navigate("/")}
          className="absolute top-12 left-12 flex items-center gap-3 text-[10px] font-black text-white/50 uppercase hover:text-white transition-all"
        >
          <ChevronLeft size={14} /> Portal
        </button>
        <div className="w-full max-w-[260px] mx-auto space-y-12 z-10">
          <div className="space-y-6">
            <div className="w-14 h-14 bg-white flex items-center justify-center shadow-2xl">
              <Fingerprint size={28} className="text-[#0a5ea8]" />
            </div>
            <div className="space-y-1">
              <h2 className="text-3xl font-[1000] text-white uppercase tracking-tighter">
                LOGIN
              </h2>
              <p className="text-[8px] font-black text-white/60 uppercase tracking-[0.4em]">
                Sistem Pemantauan dan Evaluasi
              </p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-10">
            <div className="space-y-8">
              <div className="group space-y-3">
                <Label
                  text="Email Employee"
                  className="!text-[10px] !font-black !text-white/60 tracking-widest !capitalize"
                />
                <div className="relative border-b-2 border-white/20 group-focus-within:border-white pb-3">
                  <Input
                    type="email"
                    placeholder="name@ypamdr.astra.co.id"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="!bg-transparent !border-none !text-white w-full font-bold text-[13px]"
                    required
                  />
                  <User
                    className="absolute right-0 top-0 text-white/30"
                    size={16}
                  />
                </div>
              </div>
              <div className="group space-y-3">
                <Label
                  text="Password Employee"
                  className="!text-[10px] !font-black !text-white/60 tracking-widest !capitalize"
                />
                <div className="relative border-b-2 border-white/20 group-focus-within:border-white pb-3">
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="!bg-transparent !border-none !text-white w-full tracking-widest font-bold text-[13px]"
                    required
                  />
                  <LockKeyhole
                    className="absolute right-0 top-0 text-white/30"
                    size={16}
                  />
                </div>
              </div>
            </div>
            <Button
              text={loading ? "Verifying..." : "LOGIN"}
              type="submit"
              disabled={loading}
              className="w-full !py-4.5 !bg-[#059669] hover:!bg-white !text-white hover:!text-[#059669] !rounded-full !text-[10px] font-[1000] tracking-[0.5em] shadow-xl transition-all"
            />
          </form>
          <div className="pt-8 opacity-50 flex flex-col items-center gap-4">
            <div className="h-px bg-white/20 w-full" />
            <p className="text-[7px] font-black text-white uppercase text-center tracking-widest">
              Membangun fondasi pendidikan Indonesia demi masa depan
              berkelanjutan.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Login;
