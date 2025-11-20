import { getSupabaseClient } from "./supabase";

export interface Order {
  id: number;
  customer_name: string;
  whatsapp_number: string;
  items_summary: string;
  total_amount: number;
  status: "Proses" | "Selesai" | "Batal";
  created_at: string;
}

// CREATE — Tidak update tabel customers lagi
export async function addOrder(order: Omit<Order, "id" | "created_at">) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("orders")
    .insert([order])
    .select();

  if (error) throw error;
  return data as Order[];
}

// READ
export async function getOrders() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Order[];
}

// UPDATE STATUS
export async function updateOrderStatus(id: number, status: Order["status"]) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select();

  if (error) throw error;
  return data as Order[];
}

// DELETE
export async function deleteOrder(id: number) {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from("orders").delete().eq("id", id);

  if (error) throw error;
}
