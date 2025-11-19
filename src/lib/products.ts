import { getSupabaseClient } from './supabase';

// --- KUNCI FIX: DEFINISI INTERFACE PRODUCT DI SINI ---
export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image_url: string;
  is_active: boolean;
  description?: string;
}
// ----------------------------------------------------

// READ
export async function getProducts() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('products').select('*').order('id', { ascending: false }); 
  if (error) throw error;
  return data as Product[]; // Menggunakan interface Product yang baru diexport
}

// GET SINGLE
export async function getProductById(id: number) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error) throw error;
  return data as Product;
}

// SEARCH
export async function searchProducts(query: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('products').select('*').ilike('name', `%${query}%`); 
  if (error) throw error;
  return data as Product[];
}

// CREATE
export async function addProduct(product: Omit<Product, 'id' | 'is_active'>) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('products').insert([product]).select();
  if (error) throw error;
  return data;
}

// UPDATE
export async function updateProduct(id: number, updates: Partial<Product>) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from('products').update(updates).eq('id', id).select();
  if (error) throw error;
  return data;
}

// DELETE
export async function deleteProduct(id: number) {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
}