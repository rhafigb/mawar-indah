"use client";
import { useState, useEffect } from "react";
import { MapPin, Clock, Phone, Navigation, Loader2, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { getSettings, StoreSettings } from "@/lib/settings";

export default function LokasiPage() {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const data = await getSettings();
      setSettings(data);
    } catch (e) {
      console.error("Gagal memuat pengaturan lokasi:", e);
    } finally {
      setIsLoading(false);
    }
  }

  const displayData =
    settings ||
    ({
      store_name: "Toko Mawar Indah",
      whatsapp_number: "N/A",
      business_email: "N/A",
      address_detail: "Data lokasi belum diatur di Admin Panel.",
      google_maps_embed_url: "",
    } as StoreSettings);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <Loader2 className="animate-spin w-8 h-8 text-brand-green" />
      </div>
    );
  }

  const navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    displayData.address_detail
  )}`;

  return (
    // FIX 1: Hapus pt-24 dari main, biarkan section hijau mengalir ke atas
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* FIX 2: Tambahkan padding-top internal yang cukup (pt-24) pada section hijau 
                       untuk mengkompensasi tinggi Navbar fixed */}
      <section className="bg-brand-green text-white pt-24 pb-16 md:pt-24 md:pb-20 rounded-b-4xl md:rounded-b-[3rem] shadow-sm relative z-0 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Kunjungi Kebun Kami</h1>
          <p className="text-green-100">
            Semua data diambil secara dinamis dari pengaturan admin.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 w-full grow">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Card */}
          <div className="lg:col-span-1 bg-white p-8 rounded-2xl shadow-lg h-fit border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 border-b pb-4">
              Kios Mawar Indah
            </h3>
            <div className="grid grid-cols-1 gap-4 mb-8">
              {" "}
              <p className="text-gray-600">
                Kios kami berdedikasi menyediakan tanaman hias berkualitas
                tinggi. Turun temurun usaha kami berkembang menjadi penyedia
                tanaman yang dipercaya oleh ratusan pelanggan sejak tahun 1990.
              </p>
            </div>

            <div className="space-y-6">
              {/* Alamat */}
              <div className="flex gap-4">
                <div className="bg-green-50 p-3 rounded-lg text-brand-green h-fit">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Alamat Toko</h4>
                  <p className="text-gray-600 text-sm mt-1 whitespace-pre-line">
                    {displayData.address_detail}
                  </p>
                </div>
              </div>

              {/* Jam Operasional (tetap statis) */}
              <div className="flex gap-4">
                <div className="bg-green-50 p-3 rounded-lg text-brand-green h-fit">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Jam Operasional</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    Senin - Jumat: 08:00 - 17:00
                    <br />
                    Sabtu - Minggu: 07:00 - 18:00
                  </p>
                </div>
              </div>

              {/* Kontak Dinamis */}
              <div className="flex gap-4">
                <div className="bg-green-50 p-3 rounded-lg text-brand-green h-fit">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Kontak Utama</h4>
                  <p className="text-gray-600 text-sm mt-1">
                    WA: {displayData.whatsapp_number}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Email: {displayData.business_email}
                  </p>
                </div>
              </div>

              {/* Tombol Petunjuk Arah */}
              <a
                href={navigationUrl}
                target="_blank"
                className="mt-6 w-full text-center bg-brand-green text-white py-3 rounded-xl font-bold hover:bg-emerald-800 transition flex items-center justify-center gap-2"
              >
                <Navigation size={18} /> Petunjuk Arah
              </a>
            </div>
          </div>

          {/* Map Section (Dynamic Embed) */}
          <div className="lg:col-span-2 bg-white p-2 rounded-2xl shadow-lg h-[400px] lg:h-auto border border-gray-200">
            {displayData.google_maps_embed_url ? (
              <iframe
                src={displayData.google_maps_embed_url}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "1rem" }}
                allowFullScreen={true}
                loading="lazy"
                title={`Peta Lokasi ${displayData.store_name}`}
              ></iframe>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 bg-gray-100 rounded-lg">
                <MapPin size={40} className="mb-3 opacity-50" />
                <p>Admin belum memasukkan link embed peta.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </main>
  );
}
