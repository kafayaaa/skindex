import { supabase } from "@/lib/supabase";
import { SkinLog } from "@/types/Skin";

type CreateSkinLogPayload = Omit<
  SkinLog,
  "id" | "user_id"
>;

export async function getSkinLogs(): Promise<SkinLog[]> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User tidak terautentikasi");
  }

  const { data, error } = await supabase
    .from("skin_logs")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as SkinLog[];
}

export async function createSkinLog(
  payload: CreateSkinLogPayload
): Promise<SkinLog> {
  // Ambil user yang sedang login
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User tidak terautentikasi");
  }

  const { data, error } = await supabase
    .from("skin_logs")
    .insert({
      user_id: user.id,
      date: payload.date,
      notes: payload.notes,
      stress_level: payload.stress_level,
      sleep_hours: payload.sleep_hours,
      diet_notes: payload.diet_notes,
      mood: payload.mood ?? null,
    })
    .select()
    .single();

  if (error) {
    // error umum: duplicate key (log harian sudah ada)
    throw new Error(error.message);
  }

  return data as SkinLog;
}
