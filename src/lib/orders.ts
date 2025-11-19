import { supabase } from './supabase';

export interface Order {
  id: number;
  created_at: string;
  customer_name: string;
  whatsapp_number: string;
  total_amount: number;
  status: string;
  items_summary: string;
}

// FUNGSI UTAMA UNTUK MENGUPDATE ATAU MENAMBAH PELANGGAN BARU
async function handleCustomerUpsert(order: Omit<Order, 'id' | 'created_at'>) {
    // 1. Cek apakah pelanggan sudah ada berdasarkan nomor HP
    const { data: existing, error: findError } = await supabase
        .from('customers')
        .select('id, total_orders, total_spent')
        .eq('phone', order.whatsapp_number)
        .single();
    
    // PGRST116 = Data tidak ditemukan (Ini yang kita harapkan jika pelanggan baru)
    if (findError && findError.code !== 'PGRST116') {
        console.error("Error checking customer:", findError);
        return; 
    }

    if (existing) {
        // 2. Pelanggan ada: UPDATE total order dan total spent
        const newTotalOrders = existing.total_orders + 1;
        const newTotalSpent = Number(existing.total_spent) + order.total_amount;
        
        await supabase
            .from('customers')
            .update({ 
                total_orders: newTotalOrders,
                total_spent: newTotalSpent,
            })
            .eq('id', existing.id);
    } else {
        // 3. Pelanggan baru: INSERT
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

// CREATE: Catat pesanan baru
export async function addOrder(order: Omit<Order, 'id' | 'created_at'>) {
  // <<< KUNCI: Panggil logic upsert di sini sebelum mencatat order >>>
  await handleCustomerUpsert(order);
  
  // Lanjutkan dengan mencatat order
  const { data, error } = await supabase
    .from('orders')
    .insert([order])
    .select();

  if (error) throw error;
  return data;
}

// Tambahkan kembali fungsi-fungsi lama agar file tidak error:
export async function getOrders() {
  const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false }); 
  if (error) throw error;
  return data as Order[];
}

export async function updateOrderStatus(id: number, status: string) {
  const { data, error } = await supabase.from('orders').update({ status }).eq('id', id).select();
  if (error) throw error;
  return data;
}

export async function deleteOrder(id: number) {
  const { error } = await supabase.from('orders').delete().eq('id', id);
  if (error) throw error;
}