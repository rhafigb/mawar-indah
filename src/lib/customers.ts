import { supabase } from './supabase';

export interface Customer {
  id: number;
  created_at: string;
  name: string;
  email: string | null;
  phone: string;
  total_orders: number;
  total_spent: number;
}

// READ: Ambil semua pelanggan
export async function getCustomers() {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('total_spent', { ascending: false }); // Urutkan dari yang paling banyak belanja
  
  if (error) throw error;
  return data as Customer[];
}

// DELETE: Hapus pelanggan
export async function deleteCustomer(id: number) {
  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', id);

  if (error) throw error;
}