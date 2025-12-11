"use client";

import { supabase } from "@/lib/supabase";

import Link from "next/link";
import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  UserPlus,
} from "lucide-react";
import Header from "@/components/Header";
import { TiArrowLeftOutline } from "react-icons/ti";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    // username: "",
    email: "",
    password: "",
    confirmPassword: "",
    // agreeToTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      // username,
      email,
      password,
      confirmPassword,
    } = formData;

    if (
      // !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("Semua field wajib diisi.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Kata sandi tidak cocok!");
      return;
    }

    // 1. Sign up ke Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      alert(signUpError.message);
      return;
    }

    const user = data.user;

    if (!user) {
      alert("Terjadi kesalahan: user tidak ditemukan setelah sign up.");
      return;
    }

    alert("Akun berhasil dibuat. Silakan cek email untuk verifikasi.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen text-zinc-900 dark:text-zinc-50 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
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
                <UserPlus className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
              </div> */}
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                Buat Akun Baru
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                Bergabung dengan Skindex untuk memulai perjalanan kulit sehat
                Anda.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              {/* <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                >
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="text"
                    id="name"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div> */}

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
                {/* <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  Minimal 8 karakter dengan kombinasi huruf dan angka
                </p> */}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                >
                  Konfirmasi Kata Sandi
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms Agreement */}
              {/* <div>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="w-4 h-4 mt-1 text-cyan-600 rounded focus:ring-cyan-500 border-zinc-300 dark:border-zinc-700"
                    required
                  />
                  <span className="ml-2 text-sm text-zinc-700 dark:text-zinc-300">
                    Saya menyetujui{" "}
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
                    </Link>{" "}
                    SkinProgress
                  </span>
                </label>
              </div> */}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Daftar Sekarang
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            {/* Divider */}
            {/* <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-zinc-300 dark:border-zinc-700"></div>
              <span className="px-4 text-sm text-zinc-500 dark:text-zinc-400">
                Atau daftar dengan
              </span>
              <div className="flex-1 border-t border-zinc-300 dark:border-zinc-700"></div>
            </div> */}

            {/* Social Register */}
            {/* <div className="space-y-3">
              <button className="w-full py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors flex items-center justify-center gap-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                </svg>
                <span className="text-zinc-700 dark:text-zinc-300">Google</span>
              </button>
            </div> */}

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-zinc-600 dark:text-zinc-400">
                Sudah punya akun?{" "}
                <Link
                  href="/signin"
                  className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium transition-colors"
                >
                  Masuk di sini
                </Link>
              </p>
            </div>
          </div>

          {/* Benefits */}
          {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 rounded-lg bg-cyan-50 dark:bg-cyan-900/20">
              <div className="font-medium text-cyan-700 dark:text-cyan-300">
                Analisis Gratis
              </div>
              <div className="text-zinc-600 dark:text-zinc-400">
                3 analisis/bulan
              </div>
            </div>
            <div className="text-center p-3 rounded-lg bg-cyan-50 dark:bg-cyan-900/20">
              <div className="font-medium text-cyan-700 dark:text-cyan-300">
                Progress Tracking
              </div>
              <div className="text-zinc-600 dark:text-zinc-400">
                Pantau perkembangan kulit
              </div>
            </div>
            <div className="text-center p-3 rounded-lg bg-cyan-50 dark:bg-cyan-900/20">
              <div className="font-medium text-cyan-700 dark:text-cyan-300">
                Personalized
              </div>
              <div className="text-zinc-600 dark:text-zinc-400">
                Rekomendasi khusus untukmu
              </div>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
}
