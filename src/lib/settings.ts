import { supabase } from './supabase';

export interface StoreSettings {
  id: number;
  store_name: string;
  store_description: string;
  whatsapp_number: string;
  business_email: string;
  address_detail: string;
  google_maps_embed_url: string; 
}

const CONFIG_ID = 1;

// READ: Ambil pengaturan
export async function getSettings() {
  const { data, error } = await supabase
    .from('store_settings')
    .select('*')
    .eq('id', CONFIG_ID)
    .single();

  if (error && error.code !== 'PGRST116') throw error; 
  
  if (!data) {
    return { 
      id: CONFIG_ID,
      store_name: 'Mawar Indah Default',
      store_description: '',
      whatsapp_number: 'N/A',
      business_email: 'info@example.com',
      address_detail: 'Belum diatur',
      google_maps_embed_url: '', 
    } as StoreSettings;
  }

  // FIX: Pastikan kolom baru diubah menjadi string kosong jika null.
  return {
    ...data,
    google_maps_embed_url: String(data.google_maps_embed_url || ''),
    address_detail: String(data.address_detail || 'Belum diatur'),
    store_description: String(data.store_description || ''),
    // ...
  } as StoreSettings;
}

// UPDATE: Simpan perubahan pengaturan
export async function updateSettings(updates: Partial<StoreSettings>) {
  // FIX: Menggunakan upsert untuk memastikan data dengan ID=1 selalu ada dan diupdate
  const { data, error } = await supabase
    .from('store_settings')
    .upsert({ ...updates, id: CONFIG_ID }, { onConflict: 'id' }) 
    .select()
    .single();

  if (error) {
    throw new Error(error.message || "Gagal mengupdate data di Supabase.");
  }
  return data;
}