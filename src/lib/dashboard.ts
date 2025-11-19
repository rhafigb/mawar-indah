import { getSupabaseClient } from './supabase';

export async function getDashboardStats() {
  const supabase = getSupabaseClient(); // Panggil klien disini

  // 1. Hitung Total Produk
  const { count: productCount, error: prodError } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });

  // 2. Ambil Semua Pesanan
  const { data: orders, error: orderError } = await supabase
    .from('orders')
    .select('total_amount, status, created_at')
    .order('created_at', { ascending: true });

  if (prodError || orderError) throw new Error("Gagal mengambil data dashboard");

  // 3. Hitung Statistik Manual
  const totalOrders = orders?.length || 0;
  const totalRevenue = orders?.filter(o => o.status !== 'Batal').reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

  // 4. Format Data untuk Grafik
  const salesMap: Record<string, number> = {};

  orders?.forEach((order) => {
    if (order.status === 'Batal') return;
    
    const date = new Date(order.created_at);
    const dayName = date.toLocaleDateString('id-ID', { weekday: 'short' });
    
    if (salesMap[dayName]) {
      salesMap[dayName] += Number(order.total_amount);
    } else {
      salesMap[dayName] = Number(order.total_amount);
    }
  });

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

export async function getRecentOrders() {
    const supabase = getSupabaseClient(); // Panggil klien disini
    const { data } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5); 
    return data || [];
}