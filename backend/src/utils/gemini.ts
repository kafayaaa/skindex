import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";
export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const model = ai.models.get({
  model: "gemini-2.5-flash",
});
