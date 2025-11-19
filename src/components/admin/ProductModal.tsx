"use client";
import { useState, useEffect, useRef } from "react";
import { X, Save, Loader2, UploadCloud } from "lucide-react";
import { Product } from "@/lib/products";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: any) => Promise<void>;
  initialData?: Product | null;
}

export default function ProductModal({ isOpen, onClose, onSave, initialData }: ProductModalProps) {
  // State fleksibel
  const [formData, setFormData] = useState<{
    name: string;
    price: number | "";
    stock: number | "";
    category: string;
    description: string;
  }>({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: ""
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [existingImageUrl, setExistingImageUrl] = useState<string>("");
  
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // Mode Edit
        setFormData({
          name: initialData.name,
          price: initialData.price,
          stock: initialData.stock,
          category: initialData.category,
          description: initialData.description || ""
        });
        setExistingImageUrl(initialData.image_url);
        setImagePreview(initialData.image_url);
      } else {
        // Mode Tambah: Reset Semua
        setFormData({ name: "", price: "", stock: "", category: "", description: "" });
        setExistingImageUrl("");
        setImagePreview("");
      }
      setImageFile(null);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('products') 
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('products').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let finalImageUrl = existingImageUrl;

      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      }

      if (!finalImageUrl) {
        alert("Mohon pilih gambar produk!");
        setIsSaving(false);
        return;
      }

      await onSave({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        image_url: finalImageUrl
      });

      onClose();
    } catch (error: any) {
      console.error("Error saving:", error);
      alert(`Gagal menyimpan: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fade-in max-h-[90vh] overflow-y-auto">
        
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0 z-10">
          <h3 className="font-bold text-gray-800 text-lg">
            {initialData ? "Edit Produk" : "Tambah Produk Baru"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Upload Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Foto Produk</label>
            <div 
              className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition relative h-48 bg-gray-50 ${imagePreview ? 'border-brand-green' : 'border-gray-300 hover:border-brand-green/50'}`}
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <div className="relative w-full h-full">
                  <Image src={imagePreview} alt="Preview" fill className="object-contain rounded-lg" />
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <UploadCloud size={32} className="mx-auto mb-2" />
                  <p className="text-sm font-medium">Klik untuk upload</p>
                </div>
              )}
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>
          </div>

          {/* Nama Produk */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
            <input required type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green/20 outline-none"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* Harga & Stok */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
              <input required type="number" placeholder="0" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green/20 outline-none"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value === "" ? "" : Number(e.target.value)})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
              <input required type="number" placeholder="0" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green/20 outline-none"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value === "" ? "" : Number(e.target.value)})}
              />
            </div>
          </div>

          {/* PERBAIKAN: Kategori sekarang Input Text Bebas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
            <input 
              required 
              type="text" 
              placeholder="Contoh: Mawar, Indoor, Pupuk..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green/20 outline-none"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            />
          </div>

          {/* Deskripsi (Opsional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
            <textarea 
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green/20 outline-none"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition">Batal</button>
            <button type="submit" disabled={isSaving} className="px-6 py-2 bg-brand-green text-white rounded-lg font-medium hover:bg-emerald-800 transition flex items-center gap-2 disabled:opacity-70">
              {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}