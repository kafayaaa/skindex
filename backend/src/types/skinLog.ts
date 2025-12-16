export interface SkinLog {
  id: string;
  user_id: string;
  date: string; // YYYY-MM-DD
  notes: string;
  stress_level: number; // 1–5
  sleep_hours: number;
  diet_notes: string;
  mood?: string | null;
}
