"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { getProductById, Product } from "@/lib/products";
import {
  ArrowLeft,
  MessageCircle,
  Truck,
  ShieldCheck,
  Loader2,
  Headset,
} from "lucide-react";
import CheckoutModal from "@/components/client/CheckoutModal";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  async function fetchProduct() {
    try {
      const data = await getProductById(Number(id));
      setProduct(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-10 h-10 text-brand-green" />
      </div>
    );
  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Produk Tidak Ditemukan
      </div>
    );

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col pt-24">
      <Navbar />

      {/* Modal Checkout */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={product}
      />

      <div className="max-w-7xl mx-auto px-4 w-full mb-20">
        <Link
          href="/katalog"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-green mb-6 transition"
        >
          <ArrowLeft size={20} /> Kembali ke Katalog
        </Link>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gambar */}
            <div className="relative h-[400px] md:h-[600px] bg-gray-100">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
                priority
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/600?text=No+Image";
                }}
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-sm font-bold text-brand-green shadow-sm border border-green-100">
                {product.category}
              </div>
            </div>

            {/* Info */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <p className="text-3xl font-bold text-brand-green">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    product.stock > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.stock > 0 ? `Stok: ${product.stock}` : "Stok Habis"}
                </span>
              </div>

              <div className="prose prose-sm text-gray-600 mb-8">
                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Deskripsi
                </h3>
                <p className="whitespace-pre-line leading-relaxed">
                  {product.description || "Belum ada deskripsi."}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <Headset className="text-brand-green" />
                  <div className="text-xs">
                    <p className="font-bold text-gray-900">
                      Dapatkan Informasi Lebih Lanjut!
                    </p>
                    <p className="text-gray-500">
                      Kami siap membantu apabila Anda masih kebingungan!
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsCheckoutOpen(true)}
                disabled={product.stock <= 0}
                className="w-full bg-brand-green text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-emerald-800 transition flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                <MessageCircle /> Hubungi Kami
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Chatbot />
    </main>
  );
}
