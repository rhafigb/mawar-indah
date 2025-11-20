"use client";
import { useState, useEffect } from "react";
import StatCard from "@/components/admin/StatCard";
import { Leaf, AlertTriangle, Users, Loader2 } from "lucide-react";
import Image from "next/image";
import { getSupabaseClient } from "@/lib/supabase";

interface Product {
  id: number;
  name: string;
  category: string | null;
  stock: number;
  image_url: string | null;
}

export default function AdminDashboard() {
  const [productCount, setProductCount] = useState<number>(0);
  const [lowStockCount, setLowStockCount] = useState<number>(0);
  const [messagesCount, setMessagesCount] = useState<number>(0);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const supabase = getSupabaseClient();

      try {
        // PRODUCTS
        const { data: products } = await supabase.from("products").select("*");

        setProductCount(products?.length || 0);

        const lowStock = products?.filter((p) => p.stock <= 5) || [];
        setLowStockCount(lowStock.length);
        setLowStockProducts(lowStock);

        // CUSTOMERS (messages)
        const { data: customers } = await supabase
          .from("customers")
          .select("*");

        setMessagesCount(customers?.length || 0);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-brand-green">
        <Loader2 className="animate-spin w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard Mawar Indah
        </h1>
        <p className="text-gray-500">Informasi ringkas untuk Admin.</p>
      </div>

      {/* StatCards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Tanaman di Katalog"
          value={productCount.toString()}
          change="Data Produk"
          isPositive={true}
          icon={Leaf}
          color="green"
        />
        <StatCard
          title="Produk Stok Rendah"
          value={lowStockCount.toString()}
          change="Stok <= 5"
          isPositive={false}
          icon={AlertTriangle}
          color="orange"
        />
        <StatCard
          title="Jumlah Pesan Masuk"
          value={messagesCount.toString()}
          change="Dari Pelanggan"
          isPositive={true}
          icon={Users}
          color="blue"
        />
      </div>

      {/* Tabel Stok Rendah dengan Gambar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">
            Produk dengan Stok Rendah
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-4">Gambar</th>
                <th className="px-6 py-4">Nama Produk</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Stok</th>
              </tr>
            </thead>
            <tbody>
              {lowStockProducts.length > 0 ? (
                lowStockProducts.map((p) => (
                  <tr key={p.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="w-12 aspect-square relative">
                        {p.image_url ? (
                          <Image
                            src={p.image_url}
                            alt={p.name}
                            fill
                            className="object-cover rounded-lg"
                            sizes="48px" // 12 * 4 = 48px
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                            -
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {p.name}
                    </td>
                    <td className="px-6 py-4">{p.category || "-"}</td>
                    <td className="px-6 py-4 text-red-600 font-bold">
                      {p.stock}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-400">
                    Semua stok aman.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
