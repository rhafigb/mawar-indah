"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { getProducts, searchProducts, Product } from "@/lib/products";
import { Search, MessageCircle, Filter, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function KatalogPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dynamicCategories, setDynamicCategories] = useState<string[]>(["Semua"]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const categories = products.map(p => p.category);
      const uniqueCategories = ["Semua", ...Array.from(new Set(categories))].sort();
      setDynamicCategories(uniqueCategories);
    }
  }, [products]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) handleSearch();
      else fetchData();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  async function fetchData() {
    setIsLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Gagal ambil data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSearch() {
    setIsLoading(true);
    try {
      const data = await searchProducts(searchQuery);
      setProducts(data);
    } catch (error) {
      console.error("Error search:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const filteredProducts = products.filter((product) => {
    return activeCategory === "Semua" || product.category === activeCategory;
  });

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-20">
      <Navbar />
      
      <div className="bg-brand-green text-white pt-10 pb-16 md:pt-16 md:pb-20 rounded-b-4xl md:rounded-b-[3rem] shadow-sm relative z-0 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Katalog Tanaman</h1>
          <p className="text-green-100 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Temukan koleksi tanaman hias terbaru kami.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 mb-8 relative z-10 w-full">
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5 group-focus-within:text-brand-green transition" />
              <input 
                type="text" 
                placeholder="Cari nama tanaman..." 
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-green focus:ring-2 focus:ring-green-100 outline-none transition text-sm shadow-sm"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-auto overflow-x-auto pb-1 scrollbar-hide">
              <div className="flex gap-2 px-1">
                {dynamicCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition border ${
                      activeCategory === cat 
                        ? "bg-brand-green border-brand-green text-white shadow-md" 
                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 pb-24 grow w-full">
        {isLoading ? (
          <div className="flex justify-center py-20">
             <Loader2 className="w-10 h-10 text-brand-green animate-spin" />
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link href={`/katalog/${product.id}`} key={product.id} className="block h-full">
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden group border border-gray-100 flex flex-col h-full cursor-pointer">
                  <div className="relative h-56 md:h-64 overflow-hidden bg-gray-100">
                    <Image 
                      src={product.image_url} 
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition duration-700"
                      onError={(e) => {(e.target as HTMLImageElement).src = "https://via.placeholder.com/300?text=No+Image"}}
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-brand-green shadow-sm border border-green-100">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-800 text-lg leading-tight mb-2 line-clamp-2 group-hover:text-brand-green transition">
                      {product.name}
                    </h3>
                    <div className="mt-auto pt-4 border-t border-dashed border-gray-100 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Harga</span>
                        <span className="text-lg font-bold text-brand-green">Rp {product.price.toLocaleString("id-ID")}</span>
                      </div>
                      <div className="bg-green-500 hover:bg-green-600 text-white p-2.5 rounded-full shadow-green-200 shadow-lg active:scale-95 transition shrink-0 z-10 hover:rotate-12">
                        <MessageCircle size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200 mx-4">
            <Filter size={32} className="mx-auto text-gray-300 mb-3"/>
            <h3 className="font-bold text-gray-700">Produk tidak ditemukan</h3>
            <button onClick={() => {setSearchQuery(""); setActiveCategory("Semua")}} className="mt-3 text-brand-green text-sm hover:underline">
              Reset Filter
            </button>
          </div>
        )}
      </section>
      <Footer />
      <Chatbot />
    </main>
  );
}