import { getSupabaseClient } from './supabase';
// ... interface Product tetap sama

// READ
export async function getProducts() {
  const supabase = getSupabaseClient(); // Panggil klien disini
  const { data, error } = await supabase.from('products').select('*').order('id', { ascending: false }); 
  if (error) throw error;
  return data as any[];
}

// GET SINGLE
export async function getProductById(id: number) {
  const supabase = getSupabaseClient(); // Panggil klien disini
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error) throw error;
  return data as any;
}

// SEARCH
export async function searchProducts(query: string) {
  const supabase = getSupabaseClient(); // Panggil klien disini
  const { data, error } = await supabase.from('products').select('*').ilike('name', `%${query}%`); 
  if (error) throw error;
  return data as any[];
}

// CREATE
export async function addProduct(product: any) {
  const supabase = getSupabaseClient(); // Panggil klien disini
  const { data, error } = await supabase.from('products').insert([product]).select();
  if (error) throw error;
  return data;
}

// UPDATE
export async function updateProduct(id: number, updates: any) {
  const supabase = getSupabaseClient(); // Panggil klien disini
  const { data, error } = await supabase.from('products').update(updates).eq('id', id).select();
  if (error) throw error;
  return data;
}

// DELETE
export async function deleteProduct(id: number) {
  const supabase = getSupabaseClient(); // Panggil klien disini
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
}