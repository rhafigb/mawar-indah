import { Product } from "@/types";

// Kategori untuk filter
export const categories = ["Semua", "Mawar", "Indoor", "Anggrek", "Aksesoris"];

export const products: Product[] = [
  { id: 1, name: "Mawar Merah Holland", price: 45000, category: "Mawar", image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=500&q=80" },
  { id: 2, name: "Mawar Putih Avalanche", price: 50000, category: "Mawar", image: "https://images.unsplash.com/photo-1533616688419-0e1579b9d05d?auto=format&fit=crop&w=500&q=80" },
  { id: 3, name: "Monstera Deliciosa", price: 120000, category: "Indoor", image: "https://images.unsplash.com/photo-1614594975525-e45852b22486?auto=format&fit=crop&w=500&q=80" },
  { id: 4, name: "Anggrek Bulan", price: 85000, category: "Anggrek", image: "https://images.unsplash.com/photo-1566827996997-9c79d5d5798d?auto=format&fit=crop&w=500&q=80" },
  { id: 5, name: "Kaktus Mini", price: 25000, category: "Indoor", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=500&q=80" },
  { id: 6, name: "Mawar Pink Soft", price: 48000, category: "Mawar", image: "https://images.unsplash.com/photo-1496857239036-1fb137683000?auto=format&fit=crop&w=500&q=80" },
  { id: 7, name: "Pupuk Organik Cair", price: 15000, category: "Aksesoris", image: "https://images.unsplash.com/photo-1622383563227-044011358d36?auto=format&fit=crop&w=500&q=80" },
];

export const tips = [
  { id: 1, title: "Cara Bertanya ke Asisten AI", desc: "Gunakan kalimat yang jelas dan langsung. Contoh : "Bagaimana cara merawat Bunga Aglonema"" },
  { id: 2, title: "Tips Dapat Jawaban Akurat", desc: "Sebutkan jenis tanaman jika diketahui, jelaskan komdisi sekitar seperti cuaca dan lokasi." },
  { id: 3, title: "Jelajahi & Eksperimen", desc: "Lihat demo percakapan untuk inspirasi pertanyaan, ajukan berbagai pertanyaan seputar tanaman." },
];
