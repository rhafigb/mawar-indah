import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Deklarasikan variabel untuk menahan instance klien Supabase
let supabaseClient: SupabaseClient | undefined;

// Fungsi untuk mendapatkan/membuat instance klien Supabase
export function getSupabaseClient(): SupabaseClient {
  // Cek apakah klien sudah dibuat, jika ya, kembalikan yang sudah ada
  if (supabaseClient) {
    return supabaseClient;
  }

  // Next.js WAJIB menggunakan variabel dengan prefix NEXT_PUBLIC_ untuk klien
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Pastikan variabel ada
  if (!supabaseUrl) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is required.');
  }
  if (!supabaseKey) {
    throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is required.');
  }

  // Buat klien baru dan simpan di variabel luar
  supabaseClient = createClient(supabaseUrl, supabaseKey);
  return supabaseClient;
}

// Sekarang, setiap kali Anda menggunakan Supabase, panggil fungsi ini:
export const supabase = getSupabaseClient();