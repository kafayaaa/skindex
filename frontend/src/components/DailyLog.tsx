import { useSkin } from "@/context/SkinContext";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { PiForkKnifeBold } from "react-icons/pi";

export default function DailyLog({ date }: { date: Date }) {
  const { logs, loading, error } = useSkin();

  const formatDateToISO = (d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Ambil string tanggal yang diformat dari prop 'date'
  const selectedDateString = formatDateToISO(date);

  if (loading) return <p>Memuat log...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const filteredLogs = logs.filter((log) => log.date === selectedDateString);

  if (filteredLogs.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mb-3">
          Belum ada catatan nih hari ini
        </p>
        <button className="text-lg md:text-xl font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300">
          Tambah catatan dulu yuk!
        </button>
      </div>
    );
  }

  return (
    <div>
      {filteredLogs.map((log) => (
        <div key={log.id}>
          <div className="text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 rounded-lg p-4">
            <p className="text-xs md:text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-4">
              Log Hari Ini
            </p>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <MdOutlineStickyNote2 className="text-lg md:text-xl text-amber-500" />
                <p className="text-sm md:text-base">Catatan:</p>
              </div>
              <p className="text-sm md:text-base">{log.notes}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <PiForkKnifeBold className="text-lg md:text-xl text-rose-500" />
                <p className="text-sm md:text-base">Diet:</p>
              </div>
              <p className="text-sm md:text-base">{log.diet_notes}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
