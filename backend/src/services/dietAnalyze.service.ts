import { ai } from "../utils/gemini";

export interface GeminiDietResult {
  is_trigger: boolean;
  confidence: number;
  foods_detected: string[];
  explanation: string;
}

function extractJson(text: string) {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

export async function analyzeDietWithGemini(
  dietNotes: string
): Promise<GeminiDietResult> {
  const prompt = `
       Anda adalah asisten ahli nutrisi dermatologi. Tugas Anda adalah menganalisis catatan makanan harian dan menentukan apakah makanan tersebut dapat memicu jerawat (acne trigger).

        Gunakan panduan ilmiah berikut:
        - Indeks Glikemik Tinggi (Gula, tepung putih, minuman manis).
        - Produk Susu (Dairy).
        - Makanan Berminyak/Gorengan.
        - Makanan Olahan (Processed foods).

        Catatan Makanan: "${dietNotes}"

        Instruksi Output:
        1. foods_detected: Daftar makanan spesifik yang ditemukan.
        2. is_trigger: true jika ada makanan pemicu, false jika aman.
        3. confidence: Skor keyakinan Anda (0.0 - 1.0).
        4. explanation: Berikan penjelasan singkat, edukatif, dan gunakan bahasa yang friendly dalam Bahasa Indonesia (maksimal 5 kalimat).

        Keluarkan hasil dalam format JSON seperti ini:
        
        {
        "is_trigger": boolean,
        "confidence": number,
        "foods_detected": string[],
        "explanation": string
        }
    `;

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });

  const rawText = result.text;
  const cleanJson = extractJson(rawText!);

  let parsed;
  try {
    parsed = JSON.parse(cleanJson);
  } catch (err) {
    console.error("Gemini raw response:", rawText);
    throw new Error("Invalid AI JSON response");
  }

  return parsed;
}

export function isValidDietResult(data: any) {
  return (
    typeof data?.is_trigger === "boolean" &&
    typeof data?.confidence === "number" &&
    data.confidence >= 0 &&
    data.confidence <= 1 &&
    Array.isArray(data?.foods_detected) &&
    typeof data?.explanation === "string"
  );
}
