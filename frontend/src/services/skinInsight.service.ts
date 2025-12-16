import { supabase } from "@/lib/supabase";

export async function getSkinInsight() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("No active session");
  }

  const res = await fetch("http://localhost:4000/api/skin-insight", {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Skin insight fetch failed: ${res.status} ${text}`);
  }

  return res.json();
}
