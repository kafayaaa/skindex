export interface SkinLog {
  id: string; // bigserial
  user_id: string; // uuid
  date: string; // date (unique per user per day)
  notes: string;
  stress_level: number; // 1–5
  sleep_hours: number; // numeric
  diet_notes: string;
  mood?: string | null; // optional
}

export type SkinMetric =
  | "acne_score"
  | "oiliness_score"
  | "redness_score"
  | "moisture_score";

interface SkinRule {
  condition: (log: SkinLog) => boolean;
  reason: string;
  tag: "stress" | "sleep" | "diet" | "hydration" | "mood";
}

export const SKIN_RULES: Record<SkinMetric, SkinRule[]> = {
  acne_score: [
    {
      condition: (log) => log.stress_level >= 4,
      reason:
        "Sepertinya pikiran lagi penat, nih. Stres berlebih bisa memicu peradangan yang bikin jerawat gampang muncul.",
      tag: "stress",
    },
    {
      condition: (log) => log.sleep_hours < 6,
      reason:
        "Waktu istirahatmu kurang, lho. Kulit butuh tidur yang cukup untuk memperbaiki diri dari jerawat.",
      tag: "sleep",
    },
  ],

  oiliness_score: [
    {
      condition: (log) => log.stress_level >= 4,
      reason:
        "Lagi banyak pikiran? Stres seringkali bikin kelenjar minyak jadi lebih aktif dari biasanya.",
      tag: "stress",
    },
    {
      condition: (log) => log.sleep_hours < 6,
      reason:
        "Begadang bisa mengganggu keseimbangan minyak di wajahmu, bikin kulit terasa lebih berminyak.",
      tag: "sleep",
    },
  ],

  redness_score: [
    {
      condition: (log) => log.stress_level >= 4,
      reason:
        "Hati-hati, stres yang tinggi bisa bikin kulitmu jadi lebih sensitif dan gampang kemerahan.",
      tag: "stress",
    },
  ],

  moisture_score: [
    {
      condition: (log) => log.sleep_hours < 6,
      reason:
        "Tidur yang kurang bikin kulit sulit mengunci kelembapan alami, jadi terasa lebih kering deh.",
      tag: "sleep",
    },
  ],
};
