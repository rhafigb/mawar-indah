"use client";

import { useState, useEffect } from "react";
import { Search, User, Trash2, Loader2 } from "lucide-react";
import { getCustomers, deleteCustomer, Customer } from "@/lib/customers";

export default function PelangganPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      const data = await getCustomers();
      setCustomers(data);
    } finally {
      setIsLoading(false);
    }
  }

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Catatan Pelanggan</h1>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari Nama..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Data List */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin w-8 h-8" />
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="bg-white p-6 rounded-2xl border shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                  {c.name.charAt(0)}
                </div>

                <div>
                  <h3 className="font-bold">{c.name}</h3>
                  <p className="text-xs text-gray-500">
                    {new Date(c.created_at).toLocaleDateString("id-ID")}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 whitespace-pre-line">{c.message}</p>

              {c.product_name && (
                <p className="text-sm text-gray-500 mt-2">
                  Produk:{" "}
                  <span className="font-semibold">{c.product_name}</span>
                </p>
              )}

              <button
                onClick={async () => {
                  if (confirm("Hapus catatan ini?")) {
                    await deleteCustomer(c.id);
                    loadData(); 
                  }
                }}
                className="mt-4 text-red-500 hover:text-red-700 flex ml-auto"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <User size={40} className="mx-auto opacity-30 mb-4" />
          <p>Belum ada catatan dari pelanggan.</p>
        </div>
      )}
    </div>
  );
}
