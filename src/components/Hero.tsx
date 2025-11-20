import Link from "next/link";
import { ArrowRight, Bot } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden"
    >
      {/* FIX: bg-gradient-to-br -> bg-linear-to-br (Tailwind v4) */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-green-50 to-white" />

      <div className="max-w-7xl mx-auto px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Hadirkan Keindahan Alami <br />
          <span className="text-brand-green">Di Halaman Rumah Anda</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Pusat tanaman hias berkualitas dengan integrasi monitoring
          ketersediaan dan asisten AI pintar untuk panduan perawatan tanaman
          Anda.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="#katalog"
            className="px-8 py-4 bg-brand-green text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-emerald-800 transition flex items-center justify-center gap-2"
          >
            Lihat Katalog <ArrowRight size={20} />
          </Link>
          <Link
            href="#edukasi"
            className="px-8 py-4 bg-white text-brand-green border border-brand-green rounded-full font-semibold hover:bg-green-50 transition flex items-center justify-center gap-2"
          >
            <Bot size={20} /> Tanya AI (Edukasi)
          </Link>
        </div>
      </div>
    </section>
  );
}
