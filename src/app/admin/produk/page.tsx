"use client";
import { useState, useEffect } from "react";
import { Plus, Search, Pencil, Trash2, Loader2 } from "lucide-react";
import Image from "next/image";
import { getProducts, deleteProduct, updateProduct, addProduct, Product } from "@/lib/products";
import Toast from "@/components/ui/Toast";
import ProductModal from "@/components/admin/ProductModal";

export default function ProdukPage() {
  // State Data
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // State UI Interaction
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<{message: string, type: "success" | "error"} | null>(null);

  // 1. Load Data saat pertama kali
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (e) {
      showToast("Gagal memuat data produk", "error");
    } finally {
      setIsLoading(false);
    }
  }

  // Helper untuk menampilkan notifikasi
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
  };

  // 2. Handle Simpan (Tambah Baru / Edit)
  const handleSaveProduct = async (formData: any) => {
    try {
      if (editingProduct) {
        // Mode Edit
        await updateProduct(editingProduct.id, formData);
        showToast("Produk berhasil diperbarui!", "success");
      } else {
        // Mode Tambah
        await addProduct(formData);
        showToast("Produk baru berhasil ditambahkan!", "success");
      }
      // Refresh data tabel
      loadData();
    } catch (e) {
      showToast("Gagal menyimpan data.", "error");
      throw e; // Lempar error agar modal tidak tertutup otomatis jika gagal
    }
  };

  // 3. Handle Hapus
  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus produk ini secara permanen?")) {
      try {
        await deleteProduct(id);
        // Update UI secara optimistik (langsung hapus dari list tanpa reload)
        setProducts(products.filter((p) => p.id !== id));
        showToast("Produk berhasil dihapus.", "success");
      } catch (e) {
        showToast("Gagal menghapus produk.", "error");
      }
    }
  };

  // Fungsi helper untuk membuka modal
  const openAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  // Filter Pencarian Client-side
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Komponen Toast Notifikasi */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      {/* Komponen Modal Form */}
      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveProduct}
        initialData={editingProduct}
      />

      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Produk</h1>
          <p className="text-gray-500">Kelola katalog, stok, dan deskripsi produk.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-brand-green text-white px-4 py-2.5 rounded-xl hover:bg-emerald-800 transition flex items-center gap-2 shadow-sm"
        >
          <Plus size={18} /> Tambah Produk
        </button>
      </div>

      {/* Toolbar Pencarian */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Cari nama atau kategori..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-brand-green transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tabel Data */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
           <div className="p-20 flex flex-col items-center justify-center text-gray-500 gap-3">
              <Loader2 className="animate-spin w-8 h-8 text-brand-green" /> 
              <p>Sedang memuat data...</p>
           </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 w-[30%]">Info Produk</th>
                  <th className="px-6 py-4 w-[30%]">Deskripsi</th>
                  <th className="px-6 py-4 w-[20%]">Harga & Stok</th>
                  <th className="px-6 py-4 w-[20%] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    
                    {/* Kolom 1: Gambar & Nama */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                          <Image 
                            src={product.image_url} 
                            alt={product.name} 
                            fill 
                            className="object-cover"
                            sizes="48px"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/100?text=No+Img"
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 line-clamp-1">{product.name}</div>
                          <div className="text-xs text-brand-green bg-green-50 px-2 py-0.5 rounded-full inline-block mt-1 border border-green-100">
                            {product.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    {/* Kolom 2: Deskripsi (Dipotong max 2 baris) */}
                    <td className="px-6 py-4">
                        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2" title={product.description}>
                            {product.description || <span className="italic text-gray-300">Tidak ada deskripsi</span>}
                        </p>
                    </td>

                    {/* Kolom 3: Harga & Stok */}
                    <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          Rp {product.price.toLocaleString("id-ID")}
                        </div>
                        <div className={`text-xs mt-1 ${product.stock < 5 ? 'text-red-600 font-bold flex items-center gap-1' : 'text-gray-500'}`}>
                            {product.stock < 5 && "⚠️"} Stok: {product.stock}
                        </div>
                    </td>
                    
                    {/* Kolom 4: Tombol Aksi */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(product)}
                          className="p-2 text-gray-500 hover:text-brand-green hover:bg-green-50 rounded-lg transition border border-transparent hover:border-green-200"
                          title="Edit Produk"
                        >
                          <Pencil size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition border border-transparent hover:border-red-200"
                          title="Hapus Produk"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                    <tr>
                        <td colSpan={4} className="text-center py-12 text-gray-400">
                            <div className="flex flex-col items-center gap-2">
                                <Search className="w-8 h-8 opacity-20" />
                                <p>Tidak ada produk yang ditemukan.</p>
                            </div>
                        </td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}