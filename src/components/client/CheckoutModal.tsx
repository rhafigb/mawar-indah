"use client";

import { useState } from "react";
import { X, MessageCircle, Loader2 } from "lucide-react";
import { addCustomer } from "@/lib/customers";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any | null; // kalau tidak dipakai, bisa set "any"
}

export default function CheckoutModal({
  isOpen,
  onClose,
  product,
}: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1️⃣ SIMPAN DATA DULU (cepat, tidak memicu block popup)
      addCustomer(
        formData.name,
        formData.message,
        product?.id ?? null,
        product?.name ?? null
      )
        .then(() => console.log("Data pelanggan tersimpan"))
        .catch((err) => console.error(err));

      // 2️⃣ BARU BUKA WHATSAPP (tanpa await agar tidak diblokir)
      const waUrl = `https://wa.me/6281312132075?text=${encodeURIComponent(
        `Halo, saya ${formData.name}\n\nPesan:\n${formData.message}`
      )}`;

      window.open(waUrl, "_blank");

      onClose();
    } catch (error) {
      alert("Gagal mengirim data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl">
        <div className="bg-brand-green p-4 text-white flex justify-between">
          <h3 className="font-bold text-lg">Formulir</h3>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input
            required
            type="text"
            placeholder="Nama Lengkap"
            className="w-full border p-2 rounded-lg"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <textarea
            required
            rows={3}
            placeholder="Pesan atau pertanyaan anda..."
            className="w-full border p-2 rounded-lg"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-3 rounded-lg flex justify-center items-center gap-2"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <MessageCircle />
            )}
            Kirim via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
