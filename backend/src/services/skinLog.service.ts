import { supabase } from "../utils/supabase";
import { SkinLog } from "../types/skinLog";

/**
 * Ambil skin log user berdasarkan tanggal analisis
 * @param userId
 * @param generatedAt timestamptz (ISO string)
 */
export async function getSkinLogByDate(
  userId: string,
  generatedAt: string
): Promise<SkinLog | null> {
  // Ambil tanggal saja (YYYY-MM-DD)
  const date = generatedAt.split("T")[0];

  const { data, error } = await supabase
    .from("skin_logs")
    .select("*")
    .eq("user_id", userId)
    .eq("date", date)
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
