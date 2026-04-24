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
  ChevronRight
} from "lucide-react";
 
// Warna icon watermark
const ICON_COLOR = "#FFFFFF";
 
// Icon 1: Lingkaran Konsentris
const IconLingkaran = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke={ICON_COLOR} strokeWidth="2.5">
    <circle cx="50" cy="50" r="10" />
    <circle cx="50" cy="50" r="22" />
    <circle cx="50" cy="50" r="34" />
    <circle cx="50" cy="50" r="46" />
  </svg>
);
 
// Icon 2: Belah Ketupat
const IconKetupat = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke={ICON_COLOR} strokeWidth="2.5">
    <polygon points="50,42 58,50 50,58 42,50" />
    <polygon points="50,30 70,50 50,70 30,50" />
    <polygon points="50,18 82,50 50,82 18,50" />
    <polygon points="50,6 94,50 50,94 6,50" />
  </svg>
);
 
// Icon 3: Segi Enam
const IconSegiEnam = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke={ICON_COLOR} strokeWidth="2.5">
    <polygon points="50,44 55,47 55,53 50,56 45,53 45,47" />
    <polygon points="50,32 66,41 66,59 50,68 34,59 34,41" />
    <polygon points="50,20 77,35 77,65 50,80 23,65 23,35" />
    <polygon points="50,8 88,29 88,71 50,92 12,71 12,29" />
  </svg>
);
 
// Icon 4: Chevron (Panah)
const IconChevron = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke={ICON_COLOR} strokeWidth="2.5">
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
      <IconLingkaran className="absolute -top-20 -left-20 w-96 h-96 opacity-[0.03] -rotate-12" />
      <IconKetupat className="absolute top-10 left-[35%] w-64 h-64 opacity-[0.03] rotate-6" />
      <IconSegiEnam className="absolute -bottom-20 -right-20 w-[400px] h-[400px] opacity-[0.03] rotate-12" />
      <IconChevron className="absolute -top-10 right-[10%] w-72 h-72 opacity-[0.03] -rotate-6" />
      <IconLingkaran className="absolute top-[40%] -right-24 w-80 h-80 opacity-[0.03] rotate-45" />
      <IconKetupat className="absolute -bottom-16 left-[15%] w-72 h-72 opacity-[0.03] -rotate-12" />
      
      {/* Soft Glow Elements untuk memberikan kedalaman warna */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 rounded-full blur-[100px] pointer-events-none" />
    </div>
  );
};
 
const Footer = () => {
  const currentYear = new Date().getFullYear();
 
  return (
    <footer className="relative bg-[#1E5AA5] text-white border-t border-white/10 mt-auto overflow-hidden">
 
      <CaturDharmaBackground />
 
      <div className="relative z-10 container mx-auto px-6 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Kolom 1: Logo & Deskripsi Pendek */}
          <div className="lg:col-span-1 flex flex-col items-start">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm mb-6 inline-block">
              <img
                src={logo_ypamdr}
                alt="YPA-MDR Logo"
                className="w-44 h-auto brightness-0 invert opacity-95"
              />
            </div>
            <p className="text-white/70 text-[13px] leading-relaxed font-medium mb-6">
              Membangun masa depan bangsa melalui pendidikan yang berkualitas dan pemberdayaan masyarakat yang berkelanjutan.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-[#1E5AA5] text-white transition-all duration-300 shadow-sm group">
                <Facebook size={18} className="transition-colors group-hover:text-[#1877F2]" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-[#1E5AA5] text-white transition-all duration-300 shadow-sm group">
                <Instagram size={18} className="transition-colors group-hover:text-[#E4405F]" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-[#1E5AA5] text-white transition-all duration-300 shadow-sm group">
                <Youtube size={18} className="transition-colors group-hover:text-[#FF0000]" />
              </a>
            </div>
          </div>
 
          {/* Kolom 2: Program */}
          <div className="lg:ml-auto">
            <h3 className="font-bold text-[14px] tracking-widest uppercase mb-6 text-white/90">Program Kami</h3>
            <ul className="space-y-3.5">
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
                    className="group flex items-center text-white/70 hover:text-white transition-all duration-300 text-[13.5px] font-medium"
                  >
                    <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-blue-300 mr-2" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Kolom 3: Tautan Cepat */}
          <div className="lg:ml-auto">
            <h3 className="font-bold text-[14px] tracking-widest uppercase mb-6 text-white/90">Tautan Cepat</h3>
            <ul className="space-y-3.5">
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
                    className="group flex items-center text-white/70 hover:text-white transition-all duration-300 text-[13.5px] font-medium"
                  >
                    <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-blue-300 mr-2" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Kolom 4: Kontak */}
          <div className="lg:ml-auto">
            <h3 className="font-bold text-[14px] tracking-widest uppercase mb-6 text-white/90">Hubungi Kami</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3.5 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                  <MapPin size={16} className="text-blue-300" />
                </div>
                <a
                  href="https://maps.google.com/?q=Gedung+B,+AMDI+Lantai+5+Jl.+Gaya+Motor+Raya+No.+8+Jakarta+Utara+14330"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors text-[13px] leading-relaxed font-medium pt-1"
                >
                  <span className="font-bold text-white block mb-1">Gedung B, AMDI Lantai 5</span>
                  Jl. Gaya Motor Raya No. 8<br />
                  Jakarta Utara 14330
                </a>
              </div>
 
              <div className="flex items-center gap-3.5 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                  <Phone size={16} className="text-blue-300" />
                </div>
                <a
                  href="tel:0216522555"
                  className="text-white/70 hover:text-white transition-colors text-[13px] font-medium"
                >
                  (021) 6522-5555
                </a>
              </div>
 
              <div className="flex items-center gap-3.5 group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                  <Mail size={16} className="text-blue-300" />
                </div>
                <a
                  href="mailto:ypamdr@gmail.com"
                  className="text-white/70 hover:text-white transition-colors text-[13px] font-medium"
                >
                  ypamdr@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
 
        {/* Divider Bergradasi */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>
 
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-[12.5px] font-medium text-center md:text-left">
            © {currentYear} Yayasan Pendidikan Astra Michael D. Ruslim. Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-6">
            {["Kebijakan Privasi", "Syarat & Ketentuan"].map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-white/50 hover:text-white transition-colors text-[12.5px] font-medium"
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
 
