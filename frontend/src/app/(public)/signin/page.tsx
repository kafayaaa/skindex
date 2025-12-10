"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log(data, error);
  }
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col gap-2 w-80">
        <input
          className="p-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="p-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="p-2 bg-black text-white rounded" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}
