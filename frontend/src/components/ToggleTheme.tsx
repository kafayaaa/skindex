import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <Sun className="h-5 w-5 dark:hidden text-cyan-500" />
      <Moon className="h-5 w-5 hidden dark:block text-cyan-500" />
    </button>
  );
}
