"use client";
import { useState, useEffect } from "react";
import { Flower2, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Edukasi AI", href: "/edukasi" },
    { name: "Tentang", href: "/lokasi" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    // FIX: Navbar dibuat Fixed, Background Putih, dan Z-Index tinggi
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100 transition-all duration-300 ${
        scrolled ? "shadow-md py-2" : "py-4 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            onClick={() => setIsOpen(false)}
          >
            <div className="bg-brand-green p-2 rounded-lg text-white group-hover:bg-emerald-700 transition">
              <Flower2 size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight text-brand-green">
              Mawar Indah
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center font-medium text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`transition hover:text-brand-green ${
                  isActive(link.href)
                    ? "text-brand-green font-bold"
                    : "text-gray-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/katalog"
              className="bg-brand-green text-white px-5 py-2.5 rounded-full hover:bg-emerald-900 transition shadow-lg shadow-emerald-200 flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
            >
              <ShoppingCart size={16} /> Katalog
            </Link>
          </div>

          {/* Mobile Toggle - Selalu Abu Gelap agar terlihat di atas putih */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-brand-green p-2 rounded-md focus:outline-none focus:bg-gray-100 transition"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6 space-y-2 flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block text-lg font-medium py-3 px-2 rounded-lg hover:bg-gray-50 ${
                isActive(link.href)
                  ? "text-brand-green bg-green-50"
                  : "text-gray-600"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 mt-2 border-t border-gray-100">
            <Link
              href="/katalog"
              onClick={() => setIsOpen(false)}
              className="w-full bg-brand-green text-white px-5 py-3 rounded-xl hover:bg-emerald-900 transition shadow-lg flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} /> Lihat Katalog
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
