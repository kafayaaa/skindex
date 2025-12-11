"use client";

import { supabaseBrowser } from "@/lib/supabase-browser";
import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    const supabase = supabaseBrowser();
    supabase.auth.signOut();
    window.location.href = "/login";
  }, []);

  return <p>Logging out...</p>;
}
