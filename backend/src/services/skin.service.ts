import { ai } from "../utils/gemini";

export interface GeminiSkinResult {
  scores: {
    acne_score: number;
    oiliness_score: number;
    redness_score: number;
    moisture_score: number;
  };
  locations: {
    acne: string[];
    redness: string[];
  };
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
    You are a clinical skin analysis AI using visual inspection only.
    You are analyzing a REAL facial photograph.

    IMPORTANT — SCORING PHILOSOPHY (MUST FOLLOW):
    For acne, redness, and oiliness:
    - LOWER score = HEALTHIER skin
    - HIGHER score = WORSE condition

    For moisture:
    - LOWER score = DRY skin
    - HIGHER score = HEALTHY & hydrated skin

    DO NOT normalize skin conditions.
    If acne or redness is clearly visible, scores MUST reflect that.

    --------------------
    SCORING RULES
    --------------------

    ACNE SCORE (1 = clear skin, 10 = severe acne):
    - 1–2: clear skin, no visible acne
    - 3–4: very mild acne (1–2 small pimples)
    - 5–6: moderate acne, several visible lesions
    - 7–8: many inflammatory pimples, widespread
    - 9–10: severe acne, dense inflammation or cystic acne

    REDNESS SCORE (1 = calm skin, 10 = severe redness):
    - 1–2: no visible redness
    - 3–4: very mild redness
    - 5–6: noticeable redness
    - 7–8: strong redness with inflammation
    - 9–10: severe, widespread redness

    OILINESS SCORE (1 = balanced, 10 = very oily):
    - 1–2: matte / well-balanced skin
    - 3–4: slightly oily
    - 5–6: visibly oily
    - 7–8: very oily with shine
    - 9–10: extreme oiliness

    MOISTURE SCORE (1 = very dry, 10 = well hydrated):
    - 1–2: very dry, flaky
    - 3–4: dry
    - 5–6: normal
    - 7–8: well hydrated
    - 9–10: very healthy, plump skin

    --------------------
    LOCATION ANALYSIS
    --------------------

    Identify where acne and redness are visible.
    Use ONLY these location labels:
    - forehead
    - nose
    - chin
    - left_cheek
    - right_cheek
    - jawline

    If a condition is not visible in a location, return an empty array.

    --------------------
    STRICT RULES
    --------------------
    - Base analysis ONLY on what is visible.
    - Be clinically honest.
    - Do NOT soften results.
    - Return ONLY valid JSON.
    - NO markdown.
    - NO explanation text.

    --------------------
    OUTPUT FORMAT
    --------------------

    {
      "scores": {
        "acne_score": number,
        "redness_score": number,
        "oiliness_score": number,
        "moisture_score": number
      },
      "locations": {
        "acne": string[],
        "redness": string[]
      }
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
