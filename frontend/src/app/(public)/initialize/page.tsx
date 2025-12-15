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
      skin_type: skinType,
      dob,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  };

  return (
    // <div className="bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors">
    //   <div className="w-full min-h-screen flex flex-col justify-center items-center gap-10">
    //     <h1>
    //       Sebelum menggunakan aplikasi ini, silahkan lakukan proses berikut
    //     </h1>
    //     <div className="flex flex-col">
    //       <form className="flex flex-col gap-5">
    //         <input
    //           type="file"
    //           accept="image/*"
    //           onChange={(e) => setFile(e.target.files?.[0] ?? null)}
    //         />
    //         <button
    //           type="submit"
    //           onClick={handleUpload}
    //           disabled={!file || loading}
    //         >
    //           {loading ? "Loading..." : "Cek Tipe Kulit"}
    //         </button>
    //       </form>
    //       {result && (
    //         <div>
    //           <h2>Result:</h2>
    //           <p>Skin Type: {result.skin_type}</p>
    //           <p>Reason: {result.explanation}</p>
    //         </div>
    //       )}
    //     </div>
    //     <form className="flex flex-col gap-5">
    //       <input
    //         type="text"
    //         placeholder="Username"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //       />
    //       <input
    //         type="date"
    //         placeholder="dob"
    //         value={dob}
    //         onChange={(e) => setDob(e.target.value)}
    //       />

    //       <button
    //         type="submit"
    //         onClick={handleSave}
    //         disabled={!skinType || loading}
    //       >
    //         Simpan
    //       </button>
    //     </form>
    //   </div>
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
  <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
    {/* Header */}
    <div className="text-center mb-12">
      {/* <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-50 dark:bg-cyan-900/30 mb-6">
        <svg className="w-8 h-8 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div> */}
      <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
        Analisis Awal Kulit Anda
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
        Sebelum menggunakan aplikasi Skindex, lakukan analisis awal untuk mendapatkan rekomendasi personal
      </p>
    </div>

    {/* Two Column Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Left Column - Upload Foto */}
      <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
            <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Analisis Foto Kulit
          </h2>
        </div>

        <div className="space-y-6">
          {/* Upload Area */}
          <div className={`border-2 ${file ? 'border-cyan-500' : 'border-dashed border-zinc-300 dark:border-zinc-700'} rounded-xl p-8 text-center transition-colors`}>
            {file ? (
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                  <svg className="w-10 h-10 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100 mb-1">Foto siap dianalisis</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{file.name}</p>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                >
                  Pilih foto lain
                </button>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                  <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 mb-2">Upload foto wajah Anda</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                  Pastikan pencahayaan baik dan wajah terlihat jelas
                </p>
                <label className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg cursor-pointer transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span>Pilih Foto</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    className="hidden"
                  />
                </label>
              </>
            )}
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              !file || loading
                ? 'bg-zinc-300 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 cursor-not-allowed'
                : 'bg-cyan-600 hover:bg-cyan-700 text-white'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Menganalisis...</span>
              </div>
            ) : 'Cek Tipe Kulit'}
          </button>
        </div>
      </div>

      {/* Right Column - Form Data Diri */}
      <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/30">
            <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Data Diri
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              placeholder="masukkan username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Tanggal Lahir
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-4 py-3 text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <button
            onClick={handleSave}
            disabled={!skinType || loading}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              !skinType || loading
                ? 'bg-zinc-300 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 cursor-not-allowed'
                : 'bg-cyan-600 hover:bg-cyan-700 text-white'
            }`}
          >
            {loading ? 'Menyimpan...' : 'Simpan Profil'}
          </button>
        </div>
      </div>
    </div>

    {/* Result Display */}
    {result && (
      <div className="mt-8 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl border border-cyan-200 dark:border-cyan-800 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-full bg-white dark:bg-zinc-800">
            <svg className="w-6 h-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Hasil Analisis Siap!
            </h2>
            <p className="text-cyan-600 dark:text-cyan-400">
              Tipe kulit Anda telah berhasil dianalisis
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-lg bg-white/50 dark:bg-zinc-800/50">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Tipe Kulit</p>
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full ${
                result.skin_type === 'Normal' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                result.skin_type === 'Dry' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                result.skin_type === 'Oily' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                result.skin_type === 'Combination' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' :
                'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400'
              }`}>
                <span className="font-semibold">{result.skin_type}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white/50 dark:bg-zinc-800/50">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Penjelasan</p>
            <p className="text-zinc-700 dark:text-zinc-300">
              {result.explanation}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-cyan-200 dark:border-cyan-800">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Simpan profil Anda untuk melanjutkan ke dashboard dan mendapatkan rekomendasi personal
          </p>
        </div>
      </div>
    )}

    {/* Progress Indicator */}
    <div className="mt-12 text-center">
      <div className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
        <div className={`w-2 h-2 rounded-full ${skinType ? 'bg-cyan-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}></div>
        <span>Analisis Kulit</span>
        <div className="w-8 h-0.5 bg-zinc-300 dark:bg-zinc-700"></div>
        <div className={`w-2 h-2 rounded-full ${skinType ? 'bg-cyan-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}></div>
        <span>Data Diri</span>
        <div className="w-8 h-0.5 bg-zinc-300 dark:bg-zinc-700"></div>
        <div className={`w-2 h-2 rounded-full ${skinType && username && dob ? 'bg-cyan-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}></div>
        <span>Selesai</span>
      </div>
    </div>
  </div>
</div>
  );
}
