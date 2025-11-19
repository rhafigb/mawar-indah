"use client";
import { useState } from "react";
import { X, MessageCircle, Loader2, MapPin, User, Phone } from "lucide-react";
// Import fungsi addOrder dari service logic
import { addOrder } from "@/lib/orders"; 
import { Product } from "@/lib/products"; 

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export default function CheckoutModal({ isOpen, onClose, product }: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    quantity: 1
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !product) return null;

  const totalPrice = product.price * formData.quantity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Panggil fungsi addOrder (Ini akan menjalankan handleCustomerUpsert di backend)
      const orderPayload = {
        customer_name: formData.name,
        whatsapp_number: formData.phone,
        total_amount: totalPrice,
        status: 'Proses',
        items_summary: `${formData.quantity}x ${product.name}`,
      };
      
      await addOrder(orderPayload); 

      // 2. Redirect ke WhatsApp
      const message = `Halo Mawar Indah, saya ingin memesan:
---------------------------
*Produk:* ${product.name}
*Jumlah:* ${formData.quantity}
*Total:* Rp ${totalPrice.toLocaleString('id-ID')}
*Alamat:* ${formData.address}
---------------------------
Mohon diproses ya! (Data sudah tercatat di Admin)`;
      
      const waUrl = `https://wa.me/6281312132075?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');

      onClose();
      
    } catch (error) {
      console.error("Error checkout:", error);
      alert("Gagal memproses pesanan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
        
        <div className="bg-brand-green p-4 flex justify-between items-center text-white">
          <h3 className="font-bold text-lg">Formulir Pemesanan</h3>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Info Produk & Jumlah */}
            <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center mb-4 border border-gray-200">
                <div>
                    <p className="text-sm font-bold text-gray-800 line-clamp-1">{product.name}</p>
                    <p className="text-xs text-brand-green">Rp {product.price.toLocaleString("id-ID")} / pcs</p>
                </div>
                <div className="text-right flex items-center gap-2">
                    <label className="text-sm text-gray-600">Jumlah:</label>
                    <input 
                      type="number" 
                      min="1" 
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 1})}
                      className="w-16 text-center border border-gray-300 rounded-lg p-1 text-sm font-bold focus:border-brand-green"
                    />
                </div>
            </div>

            {/* Input Data Diri */}
            <div className="space-y-3">
                <div className="relative">
                    <input 
                      required type="text" placeholder="Nama Lengkap"
                      className="w-full pl-4 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-green/20 outline-none"
                      value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="relative">
                    <input 
                      required type="tel" placeholder="Nomor WhatsApp"
                      className="w-full pl-4 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-green/20 outline-none"
                      value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div className="relative">
                    <textarea 
                      required placeholder="Alamat Pengiriman Lengkap" rows={2}
                      className="w-full pl-4 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-brand-green/20 outline-none"
                      value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </div>
            </div>

            {/* Total & Button */}
            <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600 font-medium">Total Bayar:</span>
                    <span className="text-2xl font-bold text-brand-green">Rp {totalPrice.toLocaleString("id-ID")}</span>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition flex items-center justify-center gap-2 shadow-lg shadow-green-200 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <MessageCircle size={20} />}
                  Lanjut ke WhatsApp
                </button>
                <p className="text-[10px] text-gray-400 text-center mt-2">Data pesanan akan otomatis tercatat di sistem kami.</p>
            </div>
        </form>
      </div>
    </div>
  );
}