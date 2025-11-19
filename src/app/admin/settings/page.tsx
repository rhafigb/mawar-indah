"use client";
import { useState, useEffect } from "react";
import { Save, Store, MapPin, Phone, Mail, Lock, Loader2, Link as LinkIcon } from "lucide-react";
import { getSettings, updateSettings, StoreSettings } from "@/lib/settings";
import Toast from "@/components/ui/Toast";

// BUAT DEFAULT SETTINGS UNTUK INITIAL STATE
const defaultSettings: StoreSettings = {
  id: 1,
  store_name: 'Mawar Indah Jewelry',
  store_description: '',
  whatsapp_number: '',
  business_email: 'info@mawarindah.com',
  address_detail: 'Belum diatur',
  google_maps_embed_url: ''
};

export default function SettingsPage() {
  const [formData, setFormData] = useState<StoreSettings>(defaultSettings); // JANGAN NULL
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{message: string, type: "success" | "error"} | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setIsLoading(true);
    try {
      const data = await getSettings();
      setFormData(data);
    } catch (e) {
      setToast({ message: "Gagal memuat pengaturan toko.", type: "error" });
      // GUNAKAN DEFAULT SETTINGS TANPA 'as StoreSettings'
      setFormData(defaultSettings);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // HAPUS CHECK if (!formData) return; KARENA SUDAH PASTI ADA

    setIsSaving(true);
    try {
      if (!formData.store_name || !formData.whatsapp_number) {
          setToast({ message: "Nama Toko & WA Wajib diisi.", type: "error" });
          setIsSaving(false);
          return;
      }

      await updateSettings(formData);
      setToast({ message: "Pengaturan berhasil disimpan!", type: "success" });
    } catch (e: any) {
      console.error("Supabase Save Error:", e.message || e); 
      setToast({ 
        message: `Gagal menyimpan: Error Supabase. (Detail di console. Cek RLS)`, 
        type: "error" 
      });
    } finally {
      setIsSaving(false);
    }
  };

  // --- KOMPONEN MAP PREVIEW DENGAN VALIDASI KETAT ---
  const MapPreview = () => {
    const embedUrl = formData.google_maps_embed_url; // HAPUS '?' KARENA formData TIDAK NULL
    // Cek apakah URL terisi dan setidaknya memiliki format URL embed Google Maps yang valid
    const isValidUrl = embedUrl && embedUrl.startsWith('https://www.google.com/maps/embed');

    if (!embedUrl) {
        return (
            <div className="bg-gray-100 p-8 text-center text-gray-500 rounded-xl border border-dashed border-gray-300">
                <MapPin className="mx-auto w-6 h-6 mb-2" />
                <p className="text-sm">Silakan masukkan Link Embed Google Maps.</p>
            </div>
        );
    }

    if (!isValidUrl) {
        return (
            <div className="bg-red-50 p-4 text-center text-red-700 rounded-xl border border-red-200">
                <p className="font-medium text-sm">URL tidak valid. Masukkan URL yang diawali dengan 'https://www.google.com/maps/embed...'</p>
                <p className="text-xs mt-1">Hanya URL yang disalin dari fitur "Sematkan peta" Google Maps yang diperbolehkan.</p>
            </div>
        );
    }

    return (
        <div className="rounded-xl overflow-hidden border border-gray-300 shadow-md">
            <iframe
                src={embedUrl}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen={false} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    );
  };
  // -----------------------------------------------------

  if (isLoading) {
    return <div className="flex justify-center py-20"><Loader2 className="animate-spin w-8 h-8 text-brand-green" /></div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan Toko</h1>
        <p className="text-gray-500">Konsolidasi semua pengaturan toko di satu halaman.</p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 gap-6">
        <div className="space-y-6">
            
            {/* Card Informasi Dasar & Kontak */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Store size={20} className="text-brand-green" /> Informasi Dasar & Kontak
                </h3>
                
                <div className="space-y-4">
                    {/* Nama Toko & Deskripsi */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Toko</label>
                            <input 
                              type="text" 
                              required 
                              value={formData.store_name} 
                              onChange={(e) => setFormData({...formData, store_name: e.target.value})}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-green/20 outline-none" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor WhatsApp</label>
                            <div className="relative">
                                <Phone size={16} className="absolute left-3 top-3 text-gray-400" />
                                <input 
                                  type="text" 
                                  required 
                                  value={formData.whatsapp_number}
                                  onChange={(e) => setFormData({...formData, whatsapp_number: e.target.value})}
                                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-green/20 outline-none" 
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Kontak & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Bisnis</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                                <input 
                                  type="email" 
                                  value={formData.business_email}
                                  onChange={(e) => setFormData({...formData, business_email: e.target.value})}
                                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-green/20 outline-none" 
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
                            <textarea 
                              rows={2} 
                              value={formData.store_description}
                              onChange={(e) => setFormData({...formData, store_description: e.target.value})}
                              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-green/20 outline-none" 
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* CARD LOKASI */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <MapPin size={20} className="text-brand-green" /> Pengaturan Lokasi
                </h3>
                
                <div className="space-y-4">
                    {/* Alamat Detail */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Pengiriman/Toko Lengkap</label>
                        <textarea 
                          rows={2} 
                          value={formData.address_detail}
                          onChange={(e) => setFormData({...formData, address_detail: e.target.value})}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-green/20 outline-none" 
                        />
                        <p className="text-xs text-gray-500 mt-1">Digunakan untuk informasi kontak dan data pesanan.</p>
                    </div>

                    {/* Google Maps Embed Link */}
                    <div className="pt-2 border-t border-gray-100">
                        <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            Link Embed Google Maps (untuk Peta di Halaman Depan)
                            <a 
                              href="https://support.google.com/maps/answer/144361?hl=id&co=GENIE.Platform%3DDesktop" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline text-xs"
                            >
                              (Cara Mendapatkan)
                            </a>
                        </label>
                        <div className="relative">
                            <LinkIcon size={16} className="absolute left-3 top-3 text-gray-400" />
                            <input 
                              type="url" 
                              value={formData.google_maps_embed_url}
                              onChange={(e) => setFormData({...formData, google_maps_embed_url: e.target.value})}
                              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-brand-green/20 outline-none" 
                            />
                        </div>
                    </div>
                    
                    {/* Preview Peta */}
                    <div className="pt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Pratinjau Peta:</p>
                        <MapPreview />
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button 
                  type="submit" 
                  disabled={isSaving} 
                  className="bg-brand-green text-white px-6 py-3 rounded-xl hover:bg-emerald-800 transition shadow-lg flex items-center gap-2 font-medium disabled:opacity-50"
                >
                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Simpan Perubahan
                </button>
            </div>
        </div>
      </form>
    </div>
  );
}