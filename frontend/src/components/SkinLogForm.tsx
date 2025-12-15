"use client";

import { useState } from "react";
import { createSkinLog } from "@/services/skinLog.service";
import { Calendar, Edit, Moon, Zap, Apple, Smile } from "lucide-react"; // Import icons

export default function SkinLogForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    notes: "",
    stress_level: 3,
    sleep_hours: 7,
    diet_notes: "",
    mood: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "stress_level" || name === "sleep_hours"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createSkinLog({
        date: form.date,
        notes: form.notes,
        stress_level: form.stress_level,
        sleep_hours: form.sleep_hours,
        diet_notes: form.diet_notes,
        mood: form.mood || null,
      });
      alert("Log harian berhasil disimpan");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message ?? "Gagal menyimpan log");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6 transition-colors">
      {/* Form Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400">
          <Edit className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Tambah Log Harian
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Catat rutinitas dan kondisi kulit Anda hari ini
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Field */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            <Calendar className="w-4 h-4" />
            Tanggal
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Skin Notes */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Catatan Kondisi Kulit
          </label>
          <textarea
            name="notes"
            placeholder="Misal: Kulit terasa lebih kering, muncul jerawat kecil di dagu..."
            value={form.notes}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
          />
        </div>

        {/* Stress & Sleep in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stress Level */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              <Zap className="w-4 h-4" />
              Tingkat Stres (1-10)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                name="stress_level"
                min="1"
                max="10"
                value={form.stress_level}
                onChange={handleChange}
                className="flex-1 accent-cyan-600"
              />
              <span className="w-8 text-center font-medium text-cyan-600 dark:text-cyan-400">
                {form.stress_level}
              </span>
            </div>
            <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              <span>Rendah</span>
              <span>Tinggi</span>
            </div>
          </div>

          {/* Sleep Hours */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              <Moon className="w-4 h-4" />
              Jam Tidur
            </label>
            <div className="relative">
              <input
                type="number"
                name="sleep_hours"
                step="0.5"
                min="0"
                max="24"
                value={form.sleep_hours}
                onChange={handleChange}
                className="w-full pl-4 pr-12 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400">
                jam
              </span>
            </div>
          </div>
        </div>

        {/* Diet Notes */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            <Apple className="w-4 h-4" />
            Catatan Pola Makan
          </label>
          <textarea
            name="diet_notes"
            placeholder="Misal: Banyak minum air, makan pedas siang hari..."
            value={form.diet_notes}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
          />
        </div>

        {/* Mood */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            <Smile className="w-4 h-4" />
            Mood (Opsional)
          </label>
          <input
            name="mood"
            placeholder="Misal: Senang, Lelah, Santai..."
            value={form.mood}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
            loading
              ? "bg-zinc-300 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 cursor-not-allowed"
              : "bg-cyan-600 hover:bg-cyan-700 text-white"
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Menyimpan...</span>
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Simpan Log Harian</span>
            </>
          )}
        </button>
      </form>

      {/* Form Footer Note */}
      <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700">
        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
          Log ini akan membantu Skindex menganalisis pola dan pemicu kondisi
          kulit Anda.
        </p>
      </div>
    </div>
  );
}
