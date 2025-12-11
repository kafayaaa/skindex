// src/services/skin.service.ts
import { ai } from "../utils/gemini"; // Diasumsikan 'model' sudah menggunakan SDK terbaru (@google/genai)
import fs from "fs";
import path from "path";

// Fungsi pembantu untuk mengubah file lokal menjadi format yang dipahami Gemini (Part)
function fileToGenerativePart(filePath: string, mimeType: string) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
      mimeType,
    },
  };
}

export class SkinCheckService {
  /**
   * Menganalisis kondisi kulit wajah dari foto yang diunggah.
   * @param filePath Lokasi file gambar di sistem lokal.
   * @param mimeType MIME type file, cth: 'image/jpeg', 'image/png'.
   */
  static async analyzeSkin(filePath: string, mimeType: string) {
    // Pastikan fileType adalah tipe gambar yang valid, misalnya dengan memeriksa ekstensi jika mimeType tidak tersedia.

    // 1. Buat bagian gambar (Generative Part)
    const imagePart = fileToGenerativePart(filePath, mimeType);

    // 2. Tentukan prompt sebagai System Instruction
    // Menggunakan System Instruction (seperti yang Anda lakukan) adalah praktik terbaik.
    const systemInstruction = `
        Anda adalah sistem analisis dermatologi profesional. Keluaran Anda HARUS selalu berupa objek JSON.

        Tugas Anda:
        1. Analisis kondisi kulit wajah dalam foto yang diunggah.
        2. Tentukan jenis kulit secara ketat sebagai salah satu nilai berikut: "kering", "berminyak", "normal", "sensitif", atau "kombinasi".
        3. Keluarkan HANYA objek JSON dengan struktur berikut:
            {
            "skin_type": "<salah satu dari: kering | berminyak | normal | sensitif | kombinasi | tidak diketahui>",
            "explanation": "<penjelasan singkat tentang analisis dan rekomendasi dalam Bahasa Indonesia>", // Kunci!
            "detected_issues": ["<daftar masalah seperti jerawat>", "<komedo>", "tidak ada"]
            }

        Aturan Penting:
        - KELUARKAN HANYA satu objek JSON. JANGAN sertakan teks di luar blok JSON.
        - Jika gambar buram atau wajah tidak terlihat, atur skin_type menjadi "tidak diketahui".
    `;

    try {
      const contents = [
        imagePart,
        { text: "Analyze the skin and provide the JSON output immediately." },
      ];

      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: "application/json",
        },
      });

      // --- PERBAIKAN ERROR 1: Menangani 'result.text' mungkin undefined ---

      // 1. Periksa apakah 'result.text' ada.
      if (!result.text) {
        // Jika tidak ada teks (misalnya, diblokir karena alasan keamanan), lempar error spesifik
        throw new Error("Gemini API tidak mengembalikan respons teks.");
      }

      const aiResponse = result.text.trim(); // Sekarang aman untuk dipanggil

      return JSON.parse(aiResponse);
    } catch (error) {
      // --- PERBAIKAN ERROR 2: Menangani 'error' is of type 'unknown' ---

      let errorMessage = "Terjadi kesalahan yang tidak diketahui.";

      if (error instanceof Error) {
        // Jika error adalah instance dari Error, kita bisa mengakses 'message'
        errorMessage = error.message;
      } else if (typeof error === "string") {
        // Jika error adalah string
        errorMessage = error;
      }

      console.error("Error during skin analysis:", error);

      // Gunakan errorMessage yang sudah terjamin tipenya
      throw new Error("Gagal menganalisis kulit: " + errorMessage);
    }
  }
}

// Catatan: Pastikan di file '../utils/gemini.ts' Anda menggunakan fungsi 'get' (bukan 'getGenerativeModel'):
/*
// ../utils/gemini.ts
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" }); 
export const model = ai.models.get({
    model: "gemini-2.5-flash",
});
*/
