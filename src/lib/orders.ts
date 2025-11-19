import { getSupabaseClient } from './supabase';

/**
 * INTERFACE ORDER YANG SESUAI DENGAN KOMPONEN REACT
 */
export interface Order {
    id: number;
    customer_name: string;
    whatsapp_number: string;
    items_summary: string; // <-- TAMBAHKAN INI
    total_amount: number;
    status: 'Proses' | 'Selesai' | 'Batal'; // <-- SESUAIKAN DENGAN KOMPONEN
    created_at: string;
}

// FUNGSI UTAMA UNTUK MENGUPDATE ATAU MENAMBAH PELANGGAN BARU
async function handleCustomerUpsert(order: Order) {
    const supabase = getSupabaseClient();
    
    const { data: existing, error: findError } = await supabase
        .from('customers')
        .select('id, total_orders, total_spent')
        .eq('phone', order.whatsapp_number)
        .single();
    
    // PGRST116 adalah kode untuk 'No rows found', yang diharapkan jika pelanggan baru
    if (findError && findError.code !== 'PGRST116') { 
        console.error("Error checking customer:", findError); 
        return; 
    }

    if (existing) {
        const newTotalOrders = existing.total_orders + 1;
        const newTotalSpent = Number(existing.total_spent) + order.total_amount;
        
        await supabase
            .from('customers')
            .update({ total_orders: newTotalOrders, total_spent: newTotalSpent })
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
export async function addOrder(order: Omit<Order, 'id' | 'created_at'>) {
    await handleCustomerUpsert(order as Order);
    
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('orders').insert([order]).select();
    if (error) throw error;
    return data as Order[];
}

// READ
export async function getOrders() {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false }); 
    if (error) throw error;
    return data as Order[];
}

// UPDATE STATUS
export async function updateOrderStatus(id: number, status: Order['status']) {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('orders').update({ status }).eq('id', id).select();
    if (error) throw error;
    return data as Order[];
}

// DELETE
export async function deleteOrder(id: number) {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from('orders').delete().eq('id', id);
    if (error) throw error;
}