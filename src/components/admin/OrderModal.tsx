"use client";
import { useState } from "react";
import { X, Save, Loader2 } from "lucide-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
}

export default function OrderModal({ isOpen, onClose, onSave }: OrderModalProps) {
  const [formData, setFormData] = useState({
    customer_name: "",
    whatsapp_number: "",
    items_summary: "",
    total_amount: "" as number | "",
    status: "Proses"
  });
  
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave({
        ...formData,
        total_amount: Number(formData.total_amount)
      });
      setFormData({ customer_name: "", whatsapp_number: "", items_summary: "", total_amount: "", status: "Proses" }); // Reset
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Catat Pesanan Baru</h3>
          <button onClick={onClose}><X size={20} className="text-gray-400 hover:text-gray-600" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pelanggan</label>
            <input required type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-green/20 outline-none"
              value={formData.customer_name} onChange={(e) => setFormData({...formData, customer_name: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">No. WhatsApp</label>
            <input type="text" placeholder="08..." className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-green/20 outline-none"
              value={formData.whatsapp_number} onChange={(e) => setFormData({...formData, whatsapp_number: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ringkasan Barang</label>
            <textarea required placeholder="Contoh: 2 Mawar, 1 Pupuk" rows={2} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-green/20 outline-none"
              value={formData.items_summary} onChange={(e) => setFormData({...formData, items_summary: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Total Harga (Rp)</label>
               <input required type="number" className="w-full px-4 py-2 border rounded-lg outline-none"
                 value={formData.total_amount} onChange={(e) => setFormData({...formData, total_amount: Number(e.target.value)})} />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Status Awal</label>
               <select className="w-full px-4 py-2 border rounded-lg outline-none bg-white"
                 value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                 <option value="Proses">Proses</option>
                 <option value="Selesai">Selesai</option>
                 <option value="Batal">Batal</option>
               </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">Batal</button>
            <button type="submit" disabled={isSaving} className="px-6 py-2 bg-brand-green text-white rounded-lg hover:bg-emerald-800 transition flex items-center gap-2">
              {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}