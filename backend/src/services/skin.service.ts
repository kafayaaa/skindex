import { ai } from "../utils/gemini";

export interface GeminiSkinResult {
  acne_score: number;
  oiliness_score: number;
  redness_score: number;
  moisture_score: number;
}

function extractJson(text: string) {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

export async function analyzeSkinWithGemini(
  imageBase64: string
): Promise<GeminiSkinResult> {
  const prompt = `
    You are a dermatology AI.
    Your task is to analyze facial skin and evaluate its condition based on several parameters.
    For each parameter, you MUST return a score from **1 (worst condition)** to **10 (best condition)**.

    Return ONLY valid JSON:

    {
      "acne_score": number, // Scale: 1 (severe acne) to 10 (clear skin)
      "oiliness_score": number, // Scale: 1 (very oily) to 10 (perfectly balanced/matte)
      "redness_score": number, // Scale: 1 (severe redness/inflammation) to 10 (calm skin)
      "moisture_score": number // Scale: 1 (very dry/dehydrated) to 10 (well-hydrated/moisturized)
    }
  `;

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: imageBase64,
            },
          },
        ],
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
