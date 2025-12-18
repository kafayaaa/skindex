import { supabase } from "@/lib/supabase";
import { TriggerDetected } from "@/types/Skin";

export async function getTriggers(): Promise<TriggerDetected[]> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User tidak terautentikasi");
  }

  const { data, error } = await supabase
    .from("triggers_detected")
    .select("*")
    .eq("user_id", user.id)
    .order("log_id", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as TriggerDetected[];
}
