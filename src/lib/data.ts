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
  { id: 1, title: "Cara Menyiram Mawar", desc: "Siram di pagi hari (06:00 - 09:00) langsung ke media tanam, hindari daun agar tidak berjamur." },
  { id: 2, title: "Pemupukan Tepat", desc: "Gunakan NPK 16-16-16 setiap 2 minggu sekali. Seling dengan pupuk kandang setiap bulan." },
  { id: 3, title: "Penanganan Hama", desc: "Jika daun berlubang, semprotkan campuran air sabun cuci piring tipis atau minyak neem." },
];