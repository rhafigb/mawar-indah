"use client";
import { useState, useEffect } from "react";
import { Search, Phone, User, Trash2, Loader2 } from "lucide-react";
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
    } catch (e) {
      console.error("Gagal memuat data pelanggan", e);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm("Hapus data pelanggan ini? Riwayat order akan tetap tersimpan.")) {
      try {
        await deleteCustomer(id);
        setCustomers(customers.filter(c => c.id !== id));
      } catch (e) {
        alert("Gagal menghapus pelanggan.");
      }
    }
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Data Pelanggan</h1>
        <p className="text-gray-500">Data diambil otomatis dari formulir checkout.</p>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Cari Nama atau Nomor HP..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20 text-brand-green">
          <Loader2 className="animate-spin w-8 h-8" />
        </div>
      ) : filteredCustomers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition group">
              <div className="flex items-center gap-4 mb-6 border-b pb-4">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-brand-green text-xl font-bold">
                  {customer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{customer.name}</h3>
                  <p className="text-xs text-gray-400">Bergabung: {new Date(customer.created_at).toLocaleDateString('id-ID')}</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-gray-400" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                    <User size={16} className="text-gray-400" />
                    <span>Total Order: <span className="font-bold text-brand-green">{customer.total_orders}x</span></span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-900">Rp {customer.total_spent.toLocaleString("id-ID")}</span>
                    <span className="text-xs text-gray-500">Total Belanja</span>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                  <button onClick={() => handleDelete(customer.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition">
                    <Trash2 size={18} />
                  </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
            <User size={40} className="mx-auto mb-4 opacity-30" />
            <p>Belum ada pelanggan yang tercatat.</p>
        </div>
      )}
    </div>
  );
}