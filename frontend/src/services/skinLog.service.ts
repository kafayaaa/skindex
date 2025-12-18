import { supabase } from "@/lib/supabase";
import { SkinLog } from "@/types/Skin";

type CreateSkinLogPayload = Omit<SkinLog, "id" | "user_id">;

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

  const session = await supabase.auth.getSession();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skin-log`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.data.session?.access_token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  return res.json() as Promise<SkinLog>;
}
