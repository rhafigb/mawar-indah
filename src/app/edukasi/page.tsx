import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { tips } from "@/lib/data";
import { Bot, BookOpen, Leaf, Droplets, Sun } from "lucide-react";

export default function EdukasiPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-brand-green/10 text-brand-green font-bold text-sm mb-4">
            Smart Gardening
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ensiklopedia & Asisten AI
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Gabungan pengetahuan botani tradisional dengan kecerdasan buatan untuk memastikan tanaman Anda tumbuh subur.
          </p>
        </div>
      </section>

      {/* AI Features */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="bg-brand-green rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden">
          {/* Decorative BG */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
          
          <div className="flex-1 relative z-10">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <Bot size={32} /> Tanya Apapun ke AI
            </h2>
            <p className="text-green-100 mb-6 text-lg">
              Teknologi AI kami dilatih dengan ribuan data pertanian. Tanyakan hal spesifik seperti:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                <Droplets size={20} className="text-blue-300" />
                <span>"Berapa ml air untuk menyiram Monstera?"</span>
              </li>
              <li className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                <Sun size={20} className="text-yellow-300" />
                <span>"Apakah mawar tahan panas matahari langsung?"</span>
              </li>
            </ul>
            <div className="inline-block text-sm font-mono bg-black/20 px-4 py-2 rounded text-green-200">
              *Klik ikon pesan di pojok kanan bawah untuk memulai
            </div>
          </div>
          
          <div className="flex-1 flex justify-center">
             <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-xl max-w-sm w-full">
                <div className="flex items-center gap-3 border-b pb-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-white">
                        <Bot size={20} />
                    </div>
                    <div>
                        <div className="font-bold">Demo Percakapan</div>
                        <div className="text-xs text-green-600">Online</div>
                    </div>
                </div>
                <div className="space-y-4 text-sm">
                    <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none self-start">
                        Daun saya ada bercak hitam, kenapa ya?
                    </div>
                    <div className="bg-green-50 border border-green-100 p-3 rounded-lg rounded-tr-none self-end">
                        Itu kemungkinan jamur <b>Black Spot</b>. Segera pangkas daun yang terinfeksi dan kurangi kelembapan di area daun.
                    </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Static Tips Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3">
           <BookOpen className="text-brand-green" /> Panduan Dasar
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
            {tips.map((tip) => (
                <div key={tip.id} className="border border-gray-200 p-6 rounded-2xl hover:border-brand-green hover:shadow-lg transition group cursor-default">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-brand-green mb-4 group-hover:scale-110 transition">
                        <Leaf size={24} />
                    </div>
                    <h3 className="font-bold text-xl mb-3">{tip.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{tip.desc}</p>
                </div>
            ))}
        </div>
      </section>

      <Footer />
      <Chatbot />
    </main>
  );
}