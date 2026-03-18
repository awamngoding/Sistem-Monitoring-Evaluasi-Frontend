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

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a5ea8] text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Logo Section */}
        <div className="mb-12">
          <div className="relative inline-block">
            {/* Logo Image */}
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
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 flex-shrink-0" size={18} />
                <p className="text-white/80 text-sm leading-relaxed">
                  Gedung B, AMDI Lantai 5<br />
                  Jl. Gaya Motor Raya No.8
                  <br />
                  Jakarta Utara 14330
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <Phone size={18} />
                <a
                  href="tel:0216522555"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  (021) 6522-5555
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail size={18} />
                <a
                  href="mailto:ypamdr@gmail.com"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  ypamdr@gmail.com
                </a>
              </div>

              {/* Social Media */}
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
            <p className="text-white/40 text-xs mt-1.5">
              Terdaftar di Kementerian Hukum dan HAM RI
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
