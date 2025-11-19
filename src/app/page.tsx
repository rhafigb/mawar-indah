"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, ShieldCheck, Truck, Loader2, MessageCircle } from "lucide-react";
import { getProducts, Product } from "@/lib/products"; // Mengambil data produk dari Supabase

// Komponen Hero (Static UI)
function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-green-50 to-white" />
      <div className="max-w-7xl mx-auto px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Hadirkan Keindahan Alami <br />
          <span className="text-brand-green">Di Halaman Rumah Anda</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Pusat tanaman hias berkualitas dengan integrasi pemesanan WhatsApp instan dan asisten AI pintar untuk panduan perawatan tanaman Anda.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/katalog" className="px-8 py-4 bg-brand-green text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-emerald-800 transition flex items-center justify-center gap-2">
            Lihat Katalog <ArrowRight size={20} />
          </Link>
          <Link href="/edukasi" className="px-8 py-4 bg-white text-brand-green border border-brand-green rounded-full font-semibold hover:bg-green-50 transition flex items-center justify-center gap-2">
            Tanya AI (Edukasi)
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // LOGIKA DINAMIS: Fetch 3 produk terbaru dari Supabase
  useEffect(() => {
    async function fetchFeatured() {
      try {
        // Menggunakan getProducts() yang mengurutkan produk terbaru di atas
        const allProducts = await getProducts(); 
        // Ambil 3 produk teratas
        setFeaturedProducts(allProducts.slice(0, 3)); 
      } catch (error) {
        console.error("Gagal memuat produk unggulan", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      
      {/* Value Proposition */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-2xl bg-green-50 border border-green-100">
            <div className="w-12 h-12 mx-auto bg-brand-green text-white rounded-full flex items-center justify-center mb-4">
              <ShieldCheck />
            </div>
            <h3 className="font-bold text-lg mb-2">Garansi Hidup</h3>
            <p className="text-gray-600 text-sm">Garansi penggantian tanaman jika mati dalam perjalanan pengiriman.</p>
          </div>
          <div className="p-6 rounded-2xl bg-green-50 border border-green-100">
            <div className="w-12 h-12 mx-auto bg-brand-green text-white rounded-full flex items-center justify-center mb-4">
              <Star />
            </div>
            <h3 className="font-bold text-lg mb-2">Kualitas Super</h3>
            <p className="text-gray-600 text-sm">Tanaman dirawat oleh ahli botani profesional di kebun Lembang.</p>
          </div>
          <div className="p-6 rounded-2xl bg-green-50 border border-green-100">
            <div className="w-12 h-12 mx-auto bg-brand-green text-white rounded-full flex items-center justify-center mb-4">
              <Truck />
            </div>
            <h3 className="font-bold text-lg mb-2">Pengiriman Aman</h3>
            <p className="text-gray-600 text-sm">Packing kayu khusus untuk memastikan tanaman tetap segar.</p>
          </div>
        </div>
      </section>

      {/* Featured Catalog Teaser (Kini Dinamis) */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-brand-green font-bold uppercase tracking-wider text-sm">Produk Terbaru</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">Pilihan Unggulan Kami</h2>
            </div>
            <Link href="/katalog" className="hidden md:flex items-center gap-2 text-brand-green font-semibold hover:underline">
              Lihat Semua <ArrowRight size={16} />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-10">
                <Loader2 className="w-8 h-8 text-brand-green animate-spin" />
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {featuredProducts.map((product) => (
                <Link href={`/katalog/${product.id}`} key={product.id} className="block">
                  <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden group">
                    <div className="relative h-64 w-full">
                      <Image 
                        src={product.image_url} 
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                      <p className="text-brand-green font-bold mt-2">Rp {product.price.toLocaleString("id-ID")}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
             <div className="text-center py-10 text-gray-500">Tidak ada produk unggulan untuk ditampilkan.</div>
          )}
          
          <div className="text-center md:hidden">
            <Link href="/katalog" className="inline-flex items-center gap-2 bg-white border border-gray-300 px-6 py-3 rounded-full font-semibold text-gray-700">
              Lihat Katalog Lengkap <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* AI Education Teaser */}
      <section className="py-20 bg-brand-green text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Bingung Cara Merawat Tanaman?</h2>
            <p className="text-green-100 text-lg mb-8">
              Jangan khawatir tanaman mati. Gunakan fitur AI Chatbot kami untuk mendapatkan panduan perawatan instan.
            </p>
            <Link href="/edukasi" className="bg-white text-brand-green px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition inline-flex items-center gap-2">
              Coba AI Sekarang <ArrowRight size={20} />
            </Link>
          </div>
          <div className="relative h-80 bg-white/10 rounded-2xl backdrop-blur-sm p-6 border border-white/20 flex flex-col justify-center">
            <div className="bg-white/20 self-end p-3 rounded-2xl rounded-br-none mb-4 max-w-[80%] text-sm">
              Daun mawar saya menguning, kenapa ya?
            </div>
            <div className="bg-white text-gray-800 self-start p-3 rounded-2xl rounded-bl-none max-w-[90%] text-sm shadow-lg">
              <p className="font-bold text-brand-green mb-1 text-xs">Mawar AI:</p>
              Kemungkinan karena *overwatering*. Coba kurangi frekuensi siram. 🌿
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </main>
  );
}