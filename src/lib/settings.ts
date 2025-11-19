import { getSupabaseClient } from './supabase';

// INTERFACE YANG SESUAI DENGAN FRONTEND
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

// DEFAULT SETTINGS YANG SESUAI
const defaultSettings: StoreSettings = {
  id: CONFIG_ID,
  store_name: 'Mawar Indah Jewelry',
  store_description: '',
  whatsapp_number: '',
  business_email: 'info@mawarindah.com',
  address_detail: 'Belum diatur',
  google_maps_embed_url: ''
};

// READ - SESUAIKAN DENGAN STRUCTURE FRONTEND
export async function getSettings(): Promise<StoreSettings> {
  const supabase = getSupabaseClient();
  
  try {
    const { data, error } = await supabase
      .from('store_settings')
      .select('*')
      .eq('id', CONFIG_ID)
      .single();

    // Jika tidak ada data, return default settings
    if (error && error.code === 'PGRST116') {
      return defaultSettings;
    }

    if (error) {
      console.error('Error fetching settings:', error);
      return defaultSettings;
    }

    // Mapping data dari database ke format yang diharapkan frontend
    return {
      id: data?.id || CONFIG_ID,
      store_name: data?.store_name || defaultSettings.store_name,
      store_description: data?.store_description || defaultSettings.store_description,
      whatsapp_number: data?.whatsapp_number || defaultSettings.whatsapp_number,
      business_email: data?.business_email || data?.email || defaultSettings.business_email,
      address_detail: data?.address_detail || data?.store_address || defaultSettings.address_detail,
      google_maps_embed_url: data?.google_maps_embed_url || defaultSettings.google_maps_embed_url
    };
    
  } catch (error) {
    console.error('Error in getSettings:', error);
    return defaultSettings;
  }
}

// UPDATE - SESUAIKAN DENGAN STRUCTURE FRONTEND
export async function updateSettings(updates: Partial<StoreSettings>): Promise<StoreSettings> {
  const supabase = getSupabaseClient();
  
  try {
    // Data yang akan diupdate ke database
    const updateData = {
      id: CONFIG_ID,
      store_name: updates.store_name,
      store_description: updates.store_description,
      whatsapp_number: updates.whatsapp_number,
      business_email: updates.business_email,
      address_detail: updates.address_detail,
      google_maps_embed_url: updates.google_maps_embed_url,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('store_settings')
      .upsert(updateData)
      .select()
      .single();

    if (error) {
      console.error('Supabase update error:', error);
      throw new Error(`Gagal menyimpan pengaturan: ${error.message}`);
    }

    // Return data dalam format yang diharapkan frontend
    return {
      id: data.id,
      store_name: data.store_name,
      store_description: data.store_description || '',
      whatsapp_number: data.whatsapp_number,
      business_email: data.business_email || data.email || '',
      address_detail: data.address_detail || data.store_address || '',
      google_maps_embed_url: data.google_maps_embed_url || ''
    };
    
  } catch (error) {
    console.error('Error in updateSettings:', error);
    throw error;
  }
}