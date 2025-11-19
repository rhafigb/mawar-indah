import { getSupabaseClient } from './supabase';
// ... interface Customer tetap sama

// READ
export async function getCustomers() {
  const supabase = getSupabaseClient(); // Panggil klien disini
  const { data, error } = await supabase.from('customers').select('*').order('total_spent', { ascending: false }); 
  if (error) throw error;
  return data as any[];
}

// DELETE
export async function deleteCustomer(id: number) {
  const supabase = getSupabaseClient(); // Panggil klien disini
  const { error } = await supabase.from('customers').delete().eq('id', id);
  if (error) throw error;
}