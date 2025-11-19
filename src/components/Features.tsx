import { Truck, MessageCircle, Sprout, BrainCircuit } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Truck size={24} />,
      title: "Pengiriman Cepat",
      desc: "Aman & Terjamin",
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Order via WA",
      desc: "Transaksi Mudah",
    },
    {
      icon: <Sprout size={24} />,
      title: "Kualitas Premium",
      desc: "Tanaman Sehat",
    },
    {
      icon: <BrainCircuit size={24} />,
      title: "Edukasi AI",
      desc: "Panduan Perawatan",
    },
  ];

  return (
    <section className="py-10 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {features.map((item, index) => (
          <div key={index} className="p-4 flex flex-col items-center group hover:-translate-y-1 transition duration-300">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center text-brand-green mb-3 group-hover:bg-brand-green group-hover:text-white transition">
              {item.icon}
            </div>
            <h3 className="font-bold text-gray-900">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}