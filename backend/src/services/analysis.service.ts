import { supabase } from "../utils/supabase";
import { AnalysisResult } from "../lib/skin/types";

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
