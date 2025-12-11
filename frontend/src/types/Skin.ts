export type SkinType =
  | "kering"
  | "berminyak"
  | "normal"
  | "sensitif"
  | "kombinasi"
  | "tidak diketahui";

export type AnalysisStatus = "pending" | "done" | "failed";

export type ProductCategory =
  | "cleanser"
  | "moisturizer"
  | "serum"
  | "sunscreen";

export type TriggerType = "diet" | "stress" | "sleep" | "product";

export type SubscriptionPlan = "free" | "premium";

export interface Profile {
  id: string; // uuid (PK) = auth.users.id
  created_at: string; // timestamptz
  username?: string | null; // optional
  skin_type: SkinType; // enum
  dob: string; // date
  is_premium: boolean;
}

export interface SkinLog {
  id: number; // bigserial
  user_id: string; // uuid
  date: string; // date (unique per user per day)
  notes: string;
  stress_level: number; // 1–5
  sleep_hours: number; // numeric
  diet_notes: string;
  mood?: string | null; // optional
}

export interface Photo {
  id: number; // bigserial
  user_id: string; // uuid
  log_id?: number | null; // FK optional
  url: string; // Supabase Storage URL
  taken_at: string; // timestamptz
  analysis_status: AnalysisStatus;
}

export interface Product {
  id: number; // bigserial
  name: string;
  brand: string;
  category: ProductCategory; // enum
  ingredients: string[]; // text[]
}

export interface SkinRoutine {
  id: number; // bigserial
  user_id: string; // uuid
  product_id: number; // bigint FK
  step: number; // order (1,2,3,...)
  used_at: string; // timestamptz
}

export interface Breakout {
  id: number; // bigserial
  user_id: string; // uuid
  date: string; // date
  severity: number; // 1–5
  location: string; // forehead, cheeks, chin
}

export interface TriggerDetected {
  id: number; // bigserial
  user_id: string; // uuid
  log_id: number; // FK skin_logs.id
  trigger_type: TriggerType; // diet, stress, sleep, product
  confidence: number; // 0–1
  description: string;
}

export interface Subscription {
  id: string; // uuid
  user_id: string; // uuid
  plan: SubscriptionPlan; // free / premium
  start_date: string; // date
  end_date: string; // date
  is_active: boolean;
}

export interface AnalysisResult {
  id: number; // bigserial
  photo_id: number; // bigint FK
  user_id: string; // uuid
  acne_score: number;
  oiliness_score: number;
  redness_score: number;
  moisture_score: number;
  generated_at: string; // timestamptz
}
