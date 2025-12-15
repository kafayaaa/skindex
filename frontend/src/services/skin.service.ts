import { supabase } from "@/lib/supabase";
import { AnalysisResult } from "@/types/Skin";

export async function getAnalyzeSkin(): Promise<AnalysisResult[]> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User tidak terautentikasi");
  }

  const { data, error } = await supabase
    .from("analysis_results")
    .select("*")
    .eq("user_id", user.id)
    .order("generated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as AnalysisResult[];
}

export async function analyzeSkin(file: File, logId?: string) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("User not authenticated");
  }

  const formData = new FormData();
  formData.append("photo", file);
  if (logId) formData.append("log_id", logId);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/skin/analyze`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
      body: formData,
    }
  );

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    console.error("Analyze skin error:", errorBody);
    throw new Error(errorBody?.message || "Failed to analyze skin");
  }

  return res.json();
}
