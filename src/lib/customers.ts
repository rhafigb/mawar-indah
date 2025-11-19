import { getSupabaseClient } from './supabase';

// --- KUNCI FIX: DEFINISI INTERFACE CUSTOMER DI SINI ---
export interface Customer {
  id: number;
  created_at: string;
  name: string;
  email: string | null;
  phone: string;
  total_orders: number;
  total_spent: number;
}
// ---------------------------------------------------

// READ
export async function getCustomers() {
  const supabase = getSupabaseClient(); // Panggil klien disini
  const { data, error } = await supabase.from('customers').select('*').order('total_spent', { ascending: false }); 
  if (error) throw error;
  return data as Customer[]; // Menggunakan interface Customer yang baru diexport
}

// DELETE
export async function deleteCustomer(id: number) {
  const supabase = getSupabaseClient(); // Panggil klien disini
  const { error } = await supabase.from('customers').delete().eq('id', id);
  if (error) throw error;
}