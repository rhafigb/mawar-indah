import { getSupabaseClient } from './supabase';
// ... interface Order tetap sama

// FUNGSI UTAMA UNTUK MENGUPDATE ATAU MENAMBAH PELANGGAN BARU
async function handleCustomerUpsert(order: any) {
    const supabase = getSupabaseClient(); // Panggil klien disini
    
    const { data: existing, error: findError } = await supabase
        .from('customers')
        .select('id, total_orders, total_spent')
        .eq('phone', order.whatsapp_number)
        .single();
    
    if (findError && findError.code !== 'PGRST116') { console.error("Error checking customer:", findError); return; }

    if (existing) {
        const newTotalOrders = existing.total_orders + 1;
        const newTotalSpent = Number(existing.total_spent) + order.total_amount;
        
        await supabase
            .from('customers')
            .update({ total_orders: newTotalOrders, total_spent: newTotalSpent, })
            .eq('id', existing.id);
    } else {
        await supabase
            .from('customers')
            .insert({
                name: order.customer_name,
                phone: order.whatsapp_number,
                total_orders: 1,
                total_spent: order.total_amount,
            });
    }
}

// CREATE
export async function addOrder(order: any) {
  await handleCustomerUpsert(order);
  
  const supabase = getSupabaseClient(); // Panggil klien disini
  const { data, error } = await supabase.from('orders').insert([order]).select();
  if (error) throw error;
  return data;
}

// READ
export async function getOrders() {
  const supabase = getSupabaseClient(); // Panggil klien disini
  const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false }); 
  if (error) throw error;
  return data as any[];
}

// UPDATE STATUS
export async function updateOrderStatus(id: number, status: string) {
  const supabase = getSupabaseClient(); // Panggil klien disini
  const { data, error } = await supabase.from('orders').update({ status }).eq('id', id).select();
  if (error) throw error;
  return data;
}

// DELETE
export async function deleteOrder(id: number) {
  const supabase = getSupabaseClient(); // Panggil klien disini
  const { error } = await supabase.from('orders').delete().eq('id', id);
  if (error) throw error;
}