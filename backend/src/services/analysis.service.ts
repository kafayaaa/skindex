import { supabase } from "../utils/supabase";
import { AnalysisResult } from "../types/types";

/**
 * Ambil analysis TERBARU milik user
 */
export async function getLatestAnalysis(
  userId: string
): Promise<AnalysisResult | null> {
  const { data, error } = await supabase
    .from("analysis_results")
    .select("*")
    .eq("user_id", userId)
    .order("generated_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    // jika tidak ada data, Supabase akan error
    if (error.code === "PGRST116") {
      return null;
    }
    throw error;
  }

  return data;
}

/**
 * Ambil analysis SEBELUM analysis tertentu
 */
export async function getPreviousAnalysis(
  userId: string,
  currentGeneratedAt: string
): Promise<AnalysisResult | null> {
  const { data, error } = await supabase
    .from("analysis_results")
    .select("*")
    .eq("user_id", userId)
    .lt("generated_at", currentGeneratedAt)
    .order("generated_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw error;
  }

  return data;
}

export async function getAnalysisByDate(userId: string, date: string) {
  const start = `${date}T00:00:00Z`;
  const end = `${date}T23:59:59Z`;

  const { data } = await supabase
    .from("analysis_results")
    .select("*")
    .eq("user_id", userId)
    .gte("generated_at", start)
    .lte("generated_at", end)
    .order("generated_at", { ascending: false })
    .limit(1)
    .single();

  return data;
}
