import { getSupabaseClient } from "./supabase";

export interface Customer {
  id: number;
  created_at: string;
  name: string;
  message: string;
  product_id?: number | null;
  product_name?: string | null;
}

// INSERT
export async function addCustomer(
  name: string,
  message: string,
  productId: number | null,
  productName: string | null
) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.from("customers").insert({
    name,
    message,
    product_id: productId,
    product_name: productName,
  });

  if (error) {
    console.error("Supabase error:", error); // <– LIHAT ERROR ASLINYA
    throw error;
  }

  return data;
}

// READ
export async function getCustomers() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("customers")
    .select("id, name, message, product_name, created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// DELETE
export async function deleteCustomer(id: number) {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from("customers").delete().eq("id", id);
  if (error) throw error;
}
