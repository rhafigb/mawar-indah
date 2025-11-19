import { supabase } from './supabase';

// Definisi Tipe Data Produk
export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image_url: string;
  is_active: boolean;
  description?: string; // Field deskripsi (opsional)
}

// --- FUNGSI UNTUK PUBLIK (CUSTOMER) ---

// 1. Ambil SEMUA produk (Untuk Katalog & Admin)
export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: false }); // Produk terbaru muncul di atas
  
  if (error) throw error;
  return data as Product[];
}

// 2. Ambil SATU produk berdasarkan ID (Untuk Halaman Detail)
export async function getProductById(id: number) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single(); // .single() memastikan return 1 objek

  if (error) throw error;
  return data as Product;
}

// 3. CARI produk berdasarkan nama (Untuk Search Bar Katalog)
export async function searchProducts(query: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .ilike('name', `%${query}%`); // ilike = case insensitive (huruf besar/kecil dianggap sama)

  if (error) throw error;
  return data as Product[];
}

// --- FUNGSI UNTUK ADMIN ---

// 4. TAMBAH produk baru
export async function addProduct(product: Omit<Product, 'id' | 'created_at' | 'is_active'>) {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select();

  if (error) throw error;
  return data;
}

// 5. UPDATE/EDIT produk
export async function updateProduct(id: number, updates: Partial<Product>) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) throw error;
  return data;
}

// 6. HAPUS produk
export async function deleteProduct(id: number) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
}