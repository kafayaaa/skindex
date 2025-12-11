"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Result {
  skin_type: string;
  explanation: string;
  detected_issues: string[];
}

export default function InitializePage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState(Date);
  const [skinType, setSkinType] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("photo", file);

    const res = await fetch("http://localhost:4000/api/skin-check/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    setResult(data.data); // { skin_type, explanation }
    setSkinType(data.data.skin_type);
    setLoading(false);
  };

  const handleSave = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return alert("User tidak ditemukan");

    const { error } = await supabase.from("profiles").insert({
      id: user.id,
      username,
      dob,
      skin_type: skinType,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors">
      <div className="w-full min-h-screen flex flex-col justify-center items-center gap-10">
        <h1>
          Sebelum menggunakan aplikasi ini, silahkan lakukan proses berikut
        </h1>
        <div className="flex flex-col">
          <form className="flex flex-col gap-5">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            <button
              type="submit"
              onClick={handleUpload}
              disabled={!file || loading}
            >
              {loading ? "Loading..." : "Cek Tipe Kulit"}
            </button>
          </form>
          {result && (
            <div>
              <h2>Result:</h2>
              <p>Skin Type: {result.skin_type}</p>
              <p>Reason: {result.explanation}</p>
            </div>
          )}
        </div>
        <form className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="date"
            placeholder="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />

          <button
            type="submit"
            onClick={handleSave}
            disabled={!skinType || loading}
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}
