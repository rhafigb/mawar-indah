import { Flower2, Instagram, Facebook, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Flower2 className="text-brand-green" size={24} />
          <span className="text-white font-bold text-lg">Mawar Indah</span>
        </div>
        <p className="text-sm mb-6">
          © {new Date().getFullYear()} Mawar Indah. Rancang Bangun Website Katalog Tanaman Terintegrasi.
        </p>
        <div className="flex justify-center gap-6">
          <Link href="#" className="hover:text-brand-green transition">
            <Instagram size={20} />
          </Link>
          <Link href="#" className="hover:text-brand-green transition">
            <Facebook size={20} />
          </Link>
          <Link href="#" className="hover:text-brand-green transition">
            <Twitter size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}