import { supabase } from "@/lib/supabase";

export async function getPhoto(logId: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("photos")
    .select("*")
    .eq("log_id", logId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) throw error;

  return data; // boleh null
}
