/* eslint-disable no-unused-vars */
import React from "react";
import logo_ypamdr from "../assets/img/logo_ypamdr.png";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
 
// Warna icon watermark
const ICON_COLOR = "#FFF6F6";
 
// Icon 1: Lingkaran Konsentris
const IconLingkaran = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke={ICON_COLOR} strokeWidth="4">
    <circle cx="50" cy="50" r="8" />
    <circle cx="50" cy="50" r="20" />
    <circle cx="50" cy="50" r="32" />
    <circle cx="50" cy="50" r="44" />
  </svg>
);
 
// Icon 2: Belah Ketupat
const IconKetupat = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke={ICON_COLOR} strokeWidth="4">
    <polygon points="50,42 58,50 50,58 42,50" />
    <polygon points="50,30 70,50 50,70 30,50" />
    <polygon points="50,18 82,50 50,82 18,50" />
    <polygon points="50,6 94,50 50,94 6,50" />
  </svg>
);
 
// Icon 3: Segi Enam
const IconSegiEnam = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke={ICON_COLOR} strokeWidth="4">
    <polygon points="50,44 55,47 55,53 50,56 45,53 45,47" />
    <polygon points="50,32 66,41 66,59 50,68 34,59 34,41" />
    <polygon points="50,20 77,35 77,65 50,80 23,65 23,35" />
    <polygon points="50,8 88,29 88,71 50,92 12,71 12,29" />
  </svg>
);
 
// Icon 4: Chevron (Panah)
const IconChevron = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke={ICON_COLOR} strokeWidth="4">
    <polyline points="20,75 50,48 80,75" />
    <polyline points="20,58 50,31 80,58" />
    <polyline points="20,41 50,14 80,41" />
    <polyline points="20,24 50,-3 80,24" />
  </svg>
);
 
// Komponen Background SVG untuk Catur Dharma Astra (Watermark Menyebar)
const CaturDharmaBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
 
      {/* Icon 1: Lingkaran — kiri atas, besar, sedikit miring */}
      <IconLingkaran className="absolute -top-12 -left-12 w-72 h-72 opacity-15 -rotate-12" />
 
      {/* Icon 2: Ketupat — tengah agak kiri, lebih kecil */}
      <IconKetupat className="absolute top-6 left-[38%] w-52 h-52 opacity-10 rotate-6" />
 
      {/* Icon 3: Segi Enam — kanan bawah, besar */}
      <IconSegiEnam className="absolute -bottom-14 -right-10 w-80 h-80 opacity-15 rotate-12" />
 
      {/* Icon 4: Chevron — kanan atas, medium */}
      <IconChevron className="absolute -top-8 right-[12%] w-64 h-64 opacity-10 -rotate-6" />
 
      {/* Bonus: Lingkaran lagi di pojok kanan tengah agar lebih penuh */}
      <IconLingkaran className="absolute top-[30%] -right-16 w-56 h-56 opacity-10 rotate-45" />
 
      {/* Bonus: Ketupat kecil di bawah kiri */}
      <IconKetupat className="absolute -bottom-10 left-[20%] w-48 h-48 opacity-10 -rotate-12" />
 
    </div>
  );
};
 
const Footer = () => {
  const currentYear = new Date().getFullYear();
 
  return (
    <footer className="relative overflow-hidden bg-[#0a5ea8] text-white selection:bg-transparent selection:text-yellow-400">
 
      {/* Memanggil Background Watermark */}
      <CaturDharmaBackground />
 
      {/* Konten Utama dibungkus dengan relative z-10 agar selalu berada di atas watermark */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Logo Section */}
        <div className="mb-12">
          <div className="relative inline-block">
            <div className="w-56 h-auto mb-4">
              <img
                src={logo_ypamdr}
                alt="YPA-MDR Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
 
        {/* Main Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Programs Column */}
          <div>
            <h3 className="font-semibold text-lg mb-5">Program</h3>
            <ul className="space-y-3 underline">
              {[
                "Beasiswa Pendidikan",
                "Pelatihan Guru",
                "Infrastruktur Sekolah",
                "Literasi Digital",
                "Pemberdayaan Masyarakat",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-white/80 hover:text-white transition-colors text-sm block py-1.5"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Quick Links Column */}
          <div>
            <h3 className="font-semibold text-lg mb-5">Tautan Cepat</h3>
            <ul className="space-y-3 underline">
              {[
                "Tentang Kami",
                "Berita & Artikel",
                "Galeri",
                "Publikasi",
                "Karir",
                "FAQ",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-white/80 hover:text-white transition-colors text-sm block py-1.5"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Contact Info Column */}
          <div>
            <h3 className="font-semibold text-lg mb-5">Kontak</h3>
            <div className="space-y-5 underline">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 flex-shrink-0" size={18} />
                <a
                  href="https://maps.google.com/?q=Gedung+B,+AMDI+Lantai+5+Jl.+Gaya+Motor+Raya+No.+8+Jakarta+Utara+14330"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors text-sm leading-tight"
                >
                  <span className="font-semibold text-white">Gedung B, AMDI Lantai 5</span>
                  <br />
                  Jl. Gaya Motor Raya No. 8<br />
                  Jakarta Utara 14330
                </a>
              </div>
 
              <div className="flex items-center gap-3">
                <Phone size={18} />
                <a
                  href="tel:0216522555"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  (021) 6522-5555
                </a>
              </div>
 
              <div className="flex items-center gap-3">
                <Mail size={18} />
                <a
                  href="mailto:ypamdr@gmail.com"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  ypamdr@gmail.com
                </a>
              </div>
 
              <div className="pt-2">
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                  >
                    <Facebook size={16} className="text-[#1877F2]" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                  >
                    <Instagram size={16} className="text-[#E4405F]" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                  >
                    <Youtube size={16} className="text-[#FF0000]" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
 
        {/* Divider */}
        <div className="h-px bg-white/20 mb-8"></div>
 
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-white/60 text-sm">
              © {currentYear} Yayasan Pendidikan Astra Michael D. Ruslim
            </p>
          </div>
          <div className="flex gap-8">
            {["Kebijakan Privasi", "Syarat & Ketentuan"].map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-white/60 hover:text-white transition-colors text-sm"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
 
export default Footer;
 
