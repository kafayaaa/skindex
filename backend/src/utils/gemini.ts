import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";
export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" }); // Tambahkan 'export' di sini

// Anda masih bisa mempertahankan ini jika Anda membutuhkannya untuk kasus lain,
// tetapi kita akan mengabaikannya di file service
export const model = ai.models.get({
  model: "gemini-2.5-flash",
});
