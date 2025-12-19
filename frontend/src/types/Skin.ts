export type SkinType =
  | "kering"
  | "dry"
  | "berminyak"
  | "oily"
  | "normal"
  | "sensitif"
  | "sensitive"
  | "kombinasi"
  | "combination"
  | "tidak diketahui";

export type AnalysisStatus = "pending" | "processing" | "completed" | "failed";

export type ProductCategory =
  | "cleanser"
  | "moisturizer"
  | "serum"
  | "sunscreen";

export type TriggerType = "diet" | "stress" | "sleep" | "product";

export type SubscriptionPlan = "free" | "premium";

export interface Profile {
  id?: string; // uuid (PK) = auth.users.id
  photo?: string;
  username: string | null; // optional
  skin_type: SkinType; // enum
  dob: Date; // date
  is_premium?: boolean;
  created_at?: string; // timestamptz
}

export interface EditableProfile {
  id?: string;
  username: string; // selalu string
  photo: string | null;
  skin_type: SkinType;
  dob: Date;
  is_premium?: boolean;
  created_at?: string;
}

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

export interface Photo {
  id: number; // bigserial
  user_id: string; // uuid
  log_id: string | null; // FK optional
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
  acne_locations: string[];
  redness_locations: string[];
  generated_at: string; // timestamptz
}

export interface AnalysisInterpretation {
  id: number;
  user_id: string;
  photo_id: number;
  severity: "low" | "medium" | "high";
  intro_text: string;
  concerns: string[];
  recommendations: {
    title: string;
    category: string;
    priority: 1 | 2 | 3;
    severity: "low" | "medium" | "high";
    descriptions: string[];
  }[];
  generated_at: string;
}

export type SkinConcern = "acne" | "redness" | "oiliness" | "dehydration";

export type SkinCondition =
  | "balanced"
  | "oily"
  | "oily_dehydrated"
  | "oily_acne_prone"
  | "dry"
  | "dry_dehydrated"
  | "dry_irritated"
  | "sensitive"
  | "inflamed";

export interface SkinRecommendation {
  id: number;
  interpretation_id: number;

  title: string;
  description: string;

  category: RecommendationCategory;
  priority: 1 | 2 | 3;

  created_at: string;
}

export type RecommendationCategory =
  | "routine"
  | "ingredient"
  | "lifestyle"
  | "warning";

export type Severity = "low" | "moderate" | "high";

export interface Interpretation {
  opening: string;
  summary: string;
  skin_condition: string;
  concerns: string[];
  severity: Severity;
}

export interface Recommendation {
  id: number;
  title: string;
  description: string;
  category: "routine" | "ingredient" | "warning";
  priority: 1 | 2 | 3;
}

export interface AnalysisDetail {
  id: number;
  opening: string;
  summary: string;
  skin_condition: string;
  concerns: string[];
  severity: "low" | "moderate" | "high";
  analysis_recommendations: Recommendation[];
}

export type InsightReason =
  | "ok"
  | "no_analysis"
  | "first_analysis"
  | "missing_skin_log";

export type SkinMetric =
  | "acne_score"
  | "oiliness_score"
  | "redness_score"
  | "moisture_score";

export type InsightStatus = "improved" | "worsened" | "stable";

export interface SkinInsightItem {
  metric: SkinMetric;
  status: InsightStatus;
  delta: number;
  causes: string[];
  recommendations: string[];
}

export interface SkinInsightResponse {
  date: string | null;
  reason: InsightReason;
  insights: SkinInsightItem[];
}
