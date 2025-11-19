import { supabase } from './supabase';

// Fungsi untuk mengambil ringkasan statistik & data grafik
export async function getDashboardStats() {
  
  // 1. Hitung Total Produk Aktif
  const { count: productCount, error: prodError } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });

  // 2. Ambil Semua Pesanan (kecuali yang Batal)
  const { data: orders, error: orderError } = await supabase
    .from('orders')
    .select('total_amount, status, created_at');

  if (prodError || orderError) {
    console.error("Error fetching stats:", prodError || orderError);
    return { productCount: 0, totalOrders: 0, totalRevenue: 0, chartData: [] };
  }

  // 3. Hitung Total Pesanan & Pendapatan
  // Filter yang tidak batal untuk pendapatan
  const validOrders = orders?.filter(o => o.status !== 'Batal') || [];
  const totalOrders = orders?.length || 0;
  const totalRevenue = validOrders.reduce((sum, order) => sum + Number(order.total_amount), 0);

  // 4. Format Data untuk Grafik (Kelompokkan per Hari)
  // Menggunakan Map untuk menjumlahkan penjualan di hari yang sama
  const salesMap: Record<string, number> = {};

  validOrders.forEach((order) => {
    const date = new Date(order.created_at);
    // Format hari: "Sen", "Sel", "Rab" (Sesuai locale ID)
    const dayName = date.toLocaleDateString('id-ID', { weekday: 'short' });
    
    if (salesMap[dayName]) {
      salesMap[dayName] += Number(order.total_amount);
    } else {
      salesMap[dayName] = Number(order.total_amount);
    }
  });

  // Ubah ke format Array untuk Recharts
  // Urutan hari mungkin acak tergantung data, tapi cukup untuk visualisasi sederhana
  const chartData = Object.keys(salesMap).map(key => ({
    name: key,
    sales: salesMap[key]
  }));

  return {
    productCount: productCount || 0,
    totalOrders,
    totalRevenue,
    chartData
  };
}

// Fungsi untuk mengambil 5 pesanan terbaru
export async function getRecentOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error("Error fetching recent orders:", error);
    return [];
  }
  
  return data;
}