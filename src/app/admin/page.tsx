"use client";
import { useState, useEffect } from "react";
import StatCard from "@/components/admin/StatCard";
import { DollarSign, ShoppingCart, Package, Loader2 } from "lucide-react";
import { getDashboardStats, getRecentOrders } from "@/lib/dashboard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    productCount: 0,
    chartData: [] as any[]
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const dashboardData = await getDashboardStats();
        const recentData = await getRecentOrders();
        
        setStats(dashboardData);
        setRecentOrders(recentData);
      } catch (error) {
        console.error("Gagal memuat dashboard", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-brand-green">
        <Loader2 className="animate-spin w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Selamat datang kembali, Admin Mawar Indah.</p>
      </div>

      {/* Kartu Statistik Realtime */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Pendapatan"
          value={`Rp ${stats.totalRevenue.toLocaleString('id-ID')}`}
          change="Realtime"
          isPositive={true}
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Total Pesanan"
          value={stats.totalOrders.toString()}
          change="Semua Status"
          isPositive={true}
          icon={ShoppingCart}
          color="blue"
        />
        <StatCard
          title="Stok Produk"
          value={stats.productCount.toString()}
          change="Item Aktif"
          isPositive={true}
          icon={Package}
          color="orange"
        />
      </div>

      {/* Grafik Penjualan Dinamis */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Analisis Penjualan (Per Hari)</h3>
        <div className="h-[300px] w-full">
          {stats.chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.chartData}>
                <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#065f46" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#065f46" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9ca3af', fontSize: 12 }} 
                    dy={10}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                    tickFormatter={(value) => `Rp${value/1000}k`}
                />
                <Tooltip 
                    contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [`Rp ${value.toLocaleString('id-ID')}`, 'Penjualan']}
                />
                <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#065f46"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorSales)"
                />
                </AreaChart>
            </ResponsiveContainer>
          ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                  <DollarSign size={32} className="opacity-20" />
                  <p>Belum ada data penjualan untuk ditampilkan grafik.</p>
                  <p className="text-xs">Data akan muncul setelah Anda mencatat pesanan.</p>
              </div>
          )}
        </div>
      </div>

      {/* Tabel Pesanan Terbaru Realtime */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">5 Pesanan Terbaru</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th className="px-6 py-4">Tanggal</th>
                        <th className="px-6 py-4">Pelanggan</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {recentOrders.length > 0 ? recentOrders.map((order) => (
                        <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4">{new Date(order.created_at).toLocaleDateString('id-ID')}</td>
                            <td className="px-6 py-4 font-medium text-gray-900">{order.customer_name}</td>
                            <td className="px-6 py-4">
                                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                                    order.status === 'Selesai' ? 'bg-green-100 text-green-800' :
                                    order.status === 'Batal' ? 'bg-red-100 text-red-800' :
                                    'bg-blue-100 text-blue-800'
                                }`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-brand-green font-bold">Rp {order.total_amount.toLocaleString('id-ID')}</td>
                        </tr>
                    )) : (
                        <tr><td colSpan={4} className="text-center py-6 text-gray-400">Belum ada data pesanan.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}