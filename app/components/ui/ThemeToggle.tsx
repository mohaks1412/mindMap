"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-12 h-6" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative inline-flex w-11 h-6 rounded-full bg-bg-soft/60 border border-border/50 hover:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
      aria-label="Toggle theme"
    >
      {/* Track background */}
      <div className="absolute inset-0 rounded-full bg-bg-soft/50" />
      
      {/* Toggle pill */}
      <div
        className={`relative w-5 h-5 mx-0.5 rounded-full shadow-md flex items-center justify-center transition-all duration-300 ease-out group-hover:shadow-lg ${
          isDark 
            ? "translate-x-5 bg-fg/90 shadow-fg/20 border border-fg/20" 
            : "bg-accent shadow-accent/30 border border-accent/30"
        }`}
      >
        {/* Icons */}
        {isDark ? (
          <Moon size={12} className="text-fg-muted/90" strokeWidth={2.5} />
        ) : (
          <Sun size={12} className="text-accent-fg" strokeWidth={2.5} />
        )}
      </div>
    </button>
  );
}
