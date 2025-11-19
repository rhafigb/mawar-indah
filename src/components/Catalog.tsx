"use client";
import { useState } from "react";
import { Search, MessageCircle } from "lucide-react";
import { products } from "@/lib/data";
import Image from "next/image";

export default function Catalog() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="katalog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Katalog Tanaman Pilihan</h2>
          <p className="text-gray-600">Temukan mawar dan tanaman hias terbaik untuk koleksi Anda.</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 relative">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari tanaman (misal: Mawar Merah)..."
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-green-200 outline-none transition shadow-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group flex flex-col border border-gray-100">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-brand-green">
                    {product.category}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">Tanaman sehat, akar kuat, siap kirim.</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-brand-green">
                      Rp {product.price.toLocaleString("id-ID")}
                    </span>
                    <a
                      href={`https://wa.me/6281234567890?text=Halo%20Mawar%20Indah,%20saya%20tertarik%20membeli%20${encodeURIComponent(product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition shadow-lg shadow-green-200 flex items-center justify-center"
                      aria-label="Beli via WhatsApp"
                    >
                      <MessageCircle size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
              Produk tidak ditemukan.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}