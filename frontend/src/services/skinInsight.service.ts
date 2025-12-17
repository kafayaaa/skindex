import { supabase } from "@/lib/supabase";
import { SkinInsightResponse } from "@/types/Skin";

export async function getSkinInsight(
  date?: string
): Promise<SkinInsightResponse> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("No active session");
  }

  const params = date ? `?date=${date}` : "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/skin-insight${params}`,
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Skin insight fetch failed: ${res.status} ${text}`);
  }

  return res.json();
}
