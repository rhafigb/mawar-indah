"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, LogOut, Flower2 } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Produk", href: "/admin/produk", icon: Package },
    { name: "Pesanan", href: "/admin/pesanan", icon: ShoppingBag },
    { name: "Pelanggan", href: "/admin/pelanggan", icon: Users },
    { name: "Pengaturan", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 hidden md:flex flex-col z-50">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <div className="bg-brand-green p-1.5 rounded-lg text-white mr-3">
          <Flower2 size={20} />
        </div>
        <span className="font-bold text-lg text-gray-800">Mawar Admin</span>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
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

      {/* Logout Button - Direct to Home */}
      <div className="p-4 border-t border-gray-100">
        <Link 
          href="/" 
          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-all"
        >
          <LogOut size={20} />
          Keluar
        </Link>
      </div>
    </aside>
  );
}