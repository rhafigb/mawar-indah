"use server";

import { GoogleGenAI } from "@google/genai";

// Fungsi helper untuk "tidur" (delay) sebentar
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function chatWithAI(message: string) {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return "⚠️ API Key tidak ditemukan. Mohon cek file .env.local Anda.";
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });

  const prompt = `
    Kamu adalah asisten botani profesional untuk toko tanaman "Mawar Indah".
    Jawab pertanyaan berikut dengan ramah, singkat, dan gunakan emoji tanaman.
    Gunakan Bahasa Indonesia yang baik.
    
    Pertanyaan: "${message}"
  `;

  // MEKANISME RETRY (Mencoba ulang maksimal 3 kali jika server sibuk)
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", 
        contents: prompt,
      });

      // PERBAIKAN DISINI: Hapus tanda kurung ()
      // Jika response.text null/undefined, berikan string kosong atau pesan default
      return response.text || "Maaf, saya tidak menemukan jawaban.";

    } catch (error: any) {
      attempts++;
      
      // Cek jika errornya 503 (Overloaded)
      if (error.message?.includes("503") || error.status === 503) {
        console.warn(`Server sibuk (Percobaan ${attempts}/${maxAttempts})...`);
        
        if (attempts === maxAttempts) {
           return "Maaf, server AI sedang sangat sibuk saat ini. Mohon tunggu 1 menit dan coba lagi. 🙏";
        }
        
        // Tunggu 2 detik sebelum mencoba lagi
        await delay(2000); 
        continue; // Ulangi loop
      }

      // Jika error lain (bukan 503), langsung berhenti
      console.error("AI Error:", error);
      return "Maaf, terjadi kesalahan teknis pada AI.";
    }
  }

  return "Maaf, gagal menghubungi server setelah beberapa kali mencoba.";
}