import { getSupabaseClient } from './supabase';

// INTERFACE YANG LEBIH SESUAI DENGAN KOMPONEN
export interface StoreSettings {
  store_name: string;
  store_address: string;
  phone_number: string;
  email: string;
  whatsapp_number: string;
  instagram_url?: string;
  tiktok_url?: string;
  bank_account_number?: string;
  bank_account_name?: string;
}

const CONFIG_ID = 1;

export async function getSettings(): Promise<StoreSettings> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('store_settings')
    .select('*')
    .eq('id', CONFIG_ID)
    .single();

  if (error && error.code !== 'PGRST116') throw error; 
  
  // Return default settings jika tidak ada data
  if (!data) {
    return {
      store_name: 'Mawar Indah Jewelry',
      store_address: 'Alamat toko belum diatur',
      phone_number: '',
      email: 'info@mawarindah.com',
      whatsapp_number: '',
      instagram_url: '',
      tiktok_url: '',
      bank_account_number: '',
      bank_account_name: ''
    };
  }

  // Mapping data dari database ke interface
  return {
    store_name: data.store_name || 'Mawar Indah Jewelry',
    store_address: data.store_address || data.address_detail || 'Alamat toko belum diatur',
    phone_number: data.phone_number || '',
    email: data.email || data.business_email || 'info@mawarindah.com',
    whatsapp_number: data.whatsapp_number || '',
    instagram_url: data.instagram_url || '',
    tiktok_url: data.tiktok_url || '',
    bank_account_number: data.bank_account_number || '',
    bank_account_name: data.bank_account_name || ''
  };
}

export async function updateSettings(updates: Partial<StoreSettings>): Promise<StoreSettings> {
  const supabase = getSupabaseClient();
  
  const updateData = {
    ...updates,
    id: CONFIG_ID,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('store_settings')
    .upsert(updateData)
    .select()
    .single();

  if (error) {
    throw new Error(error.message || "Gagal mengupdate data di Supabase.");
  }
  
  return data as StoreSettings;
}