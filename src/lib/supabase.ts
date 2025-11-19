import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Deklarasikan variabel untuk menahan instance klien Supabase
let supabaseClient: SupabaseClient | undefined;

// FUNGSI UTAMA: Hanya dieksekusi saat dipanggil
export function getSupabaseClient(): SupabaseClient {
  
  if (supabaseClient) {
    return supabaseClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is required.');
  }
  if (!supabaseKey) {
    throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is required.');
  }

  // Buat klien baru dan simpan
  supabaseClient = createClient(supabaseUrl, supabaseKey);
  return supabaseClient;
}