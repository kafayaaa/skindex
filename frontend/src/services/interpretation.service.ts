// services/interpretation.service.ts
import { supabase } from "@/lib/supabase";
import { AnalysisInterpretation } from "@/types/Skin";

export async function getInterpretations() {
  const { data, error } = await supabase
    .from("analysis_interpretations")
    .select("*");

  if (error) throw error;
  return data;
}
