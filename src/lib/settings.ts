import { getSupabaseClient } from './supabase';
// ... interface StoreSettings tetap sama

const CONFIG_ID = 1;

// READ
export async function getSettings() {
  const supabase = getSupabaseClient(); // Panggil klien disini
  const { data, error } = await supabase.from('store_settings').select('*').eq('id', CONFIG_ID).single();

  if (error && error.code !== 'PGRST116') throw error; 
  
  if (!data) {
    return { 
      id: CONFIG_ID, store_name: 'Mawar Indah Default', store_description: '', whatsapp_number: 'N/A', 
      business_email: 'info@example.com', address_detail: 'Belum diatur', google_maps_embed_url: '', 
    } as any;
  }

  return {
    ...data,
    google_maps_embed_url: String(data.google_maps_embed_url || ''),
    address_detail: String(data.address_detail || 'Belum diatur'),
    store_description: String(data.store_description || ''),
  } as any;
}

// UPDATE
export async function updateSettings(updates: any) {
  const supabase = getSupabaseClient(); // Panggil klien disini
  const { data, error } = await supabase.from('store_settings').update(updates).eq('id', CONFIG_ID).select().single();

  if (error) {
    throw new Error(error.message || "Gagal mengupdate data di Supabase.");
  }
  return data;
}