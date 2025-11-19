"use client";
import { useState, useEffect } from "react";
import { Search, Plus, Trash2, CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";
import { getOrders, addOrder, deleteOrder, updateOrderStatus, Order } from "@/lib/orders";
import OrderModal from "@/components/admin/OrderModal";
import Toast from "@/components/ui/Toast";

// Definisikan type untuk status yang valid
type OrderStatus = "Proses" | "Selesai" | "Batal";

export default function PesananPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<{message: string, type: "success" | "error"} | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  const handleAddOrder = async (data: any) => {
    try {
      await addOrder(data);
      setToast({ message: "Pesanan berhasil dicatat!", type: "success" });
      loadData();
    } catch (e) {
      setToast({ message: "Gagal mencatat pesanan.", type: "error" });
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus riwayat pesanan ini?")) {
      await deleteOrder(id);
      setOrders(orders.filter(o => o.id !== id));
      setToast({ message: "Pesanan dihapus.", type: "success" });
    }
  };

  // PERBAIKAN: Gunakan type OrderStatus yang spesifik
  const handleStatusChange = async (id: number, newStatus: OrderStatus) => {
    await updateOrderStatus(id, newStatus);
    // Optimistic update
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    setToast({ message: `Status diubah ke ${newStatus}`, type: "success" });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
        case 'Selesai': return <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs border border-green-100"><CheckCircle size={12}/> Selesai</span>;
        case 'Batal': return <span className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs border border-red-100"><XCircle size={12}/> Batal</span>;
        default: return <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-full text-xs border border-blue-100"><Clock size={12}/> Proses</span>;
    }
  };

  const filteredOrders = orders.filter(order => 
    order.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddOrder} />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Daftar Pesanan</h1>
          <p className="text-gray-500">Catat transaksi manual dari WhatsApp di sini.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-brand-green text-white px-4 py-2.5 rounded-xl hover:bg-emerald-800 transition flex items-center gap-2 shadow-sm">
          <Plus size={18} /> Catat Pesanan Baru
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input type="text" placeholder="Cari nama pelanggan..." className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-brand-green transition"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
           <div className="p-20 flex flex-col items-center text-gray-500 gap-3"><Loader2 className="animate-spin" /> <p>Memuat data...</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4">Pelanggan</th>
                  <th className="px-6 py-4">Ringkasan Item</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{order.customer_name}</div>
                        <div className="text-xs text-gray-400">{new Date(order.created_at).toLocaleDateString('id-ID')} • {order.whatsapp_number}</div>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate" title={order.items_summary}>{order.items_summary}</td>
                    <td className="px-6 py-4 font-bold text-brand-green">Rp {order.total_amount.toLocaleString("id-ID")}</td>
                    <td className="px-6 py-4">
                        {/* Dropdown Status Cepat */}
                        <select 
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                            className="bg-transparent border-none text-xs font-medium focus:ring-0 cursor-pointer hover:underline"
                        >
                            <option value="Proses">Proses</option>
                            <option value="Selesai">Selesai</option>
                            <option value="Batal">Batal</option>
                        </select>
                        {/* Visual Indicator (Optional, next to dropdown) */}
                        <span className="ml-2 inline-block">{getStatusBadge(order.status)}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                        <button onClick={() => handleDelete(order.id)} className="p-2 text-gray-400 hover:text-red-600 transition"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                )) : (
                    <tr><td colSpan={5} className="text-center py-10 text-gray-400">Belum ada pesanan tercatat.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}