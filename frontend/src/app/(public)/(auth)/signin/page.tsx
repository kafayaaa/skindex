"use client";

// import { useState } from "react";

// export default function LoginPage() {
//   const supabase = supabaseBrowser();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const login = async () => {
//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) return alert(error.message);

//     alert("Login berhasil.");
//     window.location.href = "/dashboard";
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Login</h1>

//       <input
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         type="email"
//       />

//       <input
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         type="password"
//       />

//       <button onClick={login}>Login</button>
//     </div>
//   );
// }

import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { TiArrowLeftOutline } from "react-icons/ti";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login data:", formData);
    // Implementasi login logic di sini
    const { email, password } = formData;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    if (!user) {
      alert("User tidak ditemukan setelah login.");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    // Jika profile belum ada → redirect ke initialize
    if (!profile) {
      alert("Profile belum ada. Silahkan lakukan proses berikut.");
      return router.push("/initialize");
    }

    alert("Berhasil login");
    router.push("/dashboard");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300 text-zinc-900 dark:text-zinc-50">
      <div className="absolute top-10 left-10 text-cyan-500">
        <Link href="/">
          <TiArrowLeftOutline size={40} />
        </Link>
      </div>
      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8 border border-zinc-200 dark:border-zinc-700">
            {/* Header */}
            <div className="text-center mb-8">
              {/* <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-50 dark:bg-cyan-900/30 mb-4">
                <LogIn className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
              </div> */}
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                Masuk ke Akun Anda
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                Selamat datang kembali! Silakan masuk untuk melanjutkan.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                >
                  Alamat Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="nama@email.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                >
                  Kata Sandi
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              {/* <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500 border-zinc-300 dark:border-zinc-700"
                  />
                  <span className="ml-2 text-sm text-zinc-700 dark:text-zinc-300">
                    Ingat saya
                  </span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
                >
                  Lupa kata sandi?
                </Link>
              </div> */}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Masuk
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            {/* Divider */}
            {/* <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-zinc-300 dark:border-zinc-700"></div>
              <span className="px-4 text-sm text-zinc-500 dark:text-zinc-400">
                Atau
              </span>
              <div className="flex-1 border-t border-zinc-300 dark:border-zinc-700"></div>
            </div> */}

            {/* Social Login (Opsional) */}
            {/* <div className="space-y-3">
              <button className="w-full py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors flex items-center justify-center gap-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-zinc-700 dark:text-zinc-300">
                  Lanjutkan dengan Google
                </span>
              </button>
            </div> */}

            {/* Register Link */}
            <div className="mt-8 text-center">
              <p className="text-zinc-600 dark:text-zinc-400">
                Belum punya akun?{" "}
                <Link
                  href="/signup"
                  className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium transition-colors"
                >
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Dengan masuk, Anda menyetujui{" "}
            <Link
              href="/terms"
              className="text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              Syarat & Ketentuan
            </Link>{" "}
            dan{" "}
            <Link
              href="/privacy"
              className="text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              Kebijakan Privasi
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
