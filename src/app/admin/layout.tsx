"use client";
import AdminSidebar from "@/components/admin/Sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Flower2, LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut } from "lucide-react";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Definisi menu untuk Mobile (disamakan dengan sidebar)
  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Produk", href: "/admin/produk", icon: Package },
    { name: "Pesanan", href: "/admin/pesanan", icon: ShoppingBag },
    { name: "Pelanggan", href: "/admin/pelanggan", icon: Users },
    { name: "Pengaturan", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Desktop (Hidden on Mobile) */}
      <AdminSidebar />

      {/* Mobile Header (Visible only on Mobile) */}
      <div className="md:hidden bg-white border-b p-4 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-2">
           <div className="bg-brand-green p-1.5 rounded text-white">
              <Flower2 size={18} />
           </div>
           <span className="font-bold text-gray-800">Mawar Admin</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu className="text-gray-600" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-gray-800/50" onClick={() => setIsMobileMenuOpen(false)}>
           <div className="bg-white w-72 h-full shadow-xl flex flex-col" onClick={(e) => e.stopPropagation()}>
              
              {/* Mobile Sidebar Header */}
              <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                  <div className="bg-brand-green p-1.5 rounded-lg text-white">
                    <Flower2 size={20} />
                  </div>
                  <span className="font-bold text-lg text-gray-800">Menu Admin</span>
              </div>

              {/* Mobile Menu Items (Lengkap) */}
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                  {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                          isActive
                            ? "bg-green-50 text-brand-green"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <item.icon size={20} />
                        {item.name}
                      </Link>
                    );
                  })}
              </nav>

              {/* Mobile Logout Button */}
              <div className="p-4 border-t border-gray-100">
                <Link 
                  href="/" 
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-all"
                >
                  <LogOut size={20} />
                  Keluar
                </Link>
              </div>
           </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="md:ml-64 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
            {children}
        </div>
      </main>
    </div>
  );
}