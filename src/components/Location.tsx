import { MapPin, Clock, Phone, Map as MapIcon } from "lucide-react";

export default function Location() {
  return (
    <section id="lokasi" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Info Text */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Kunjungi Kebun Kami</h2>
            <p className="text-gray-400 mb-8">
              Lihat langsung koleksi tanaman kami dan konsultasikan kebutuhan
              taman Anda dengan ahli kami di lokasi.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-gray-800 p-3 rounded-lg text-brand-green">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Alamat</h4>
                  <p className="text-gray-400">
                    Jl. Agrowisata No. 45, Lembang, Jawa Barat.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-gray-800 p-3 rounded-lg text-brand-green">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Jam Operasional</h4>
                  <p className="text-gray-400">
                    Senin - Minggu: 08:00 - 17:00 WIB
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-gray-800 p-3 rounded-lg text-brand-green">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Kontak</h4>
                  <p className="text-gray-400">+62 812-3456-7890</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-gray-800 rounded-2xl overflow-hidden h-80 md:h-auto relative flex items-center justify-center group">
            {/* Background Image Simulation */}
            <div className="absolute inset-0 bg-gray-700 opacity-50 group-hover:opacity-40 transition" />
            
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="relative z-10 bg-white text-gray-900 px-6 py-3 rounded-full font-bold hover:bg-brand-green hover:text-white transition shadow-lg flex items-center gap-2"
            >
              <MapIcon size={18} /> Buka Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}