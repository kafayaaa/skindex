import { supabase } from "@/lib/supabase";

export async function getAnalysisByDate(date: string) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Unauthorized");
  }

  /**
   * date format: YYYY-MM-DD
   * generated_at: timestamptz
   */
  const { data, error } = await supabase
    .from("analysis_results")
    .select("*")
    .eq("user_id", user.id)
    .gte("generated_at", `${date}T00:00:00`)
    .lte("generated_at", `${date}T23:59:59`)
    .order("generated_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
}
