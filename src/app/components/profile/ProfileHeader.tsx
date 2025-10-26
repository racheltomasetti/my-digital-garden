"use client";

import { useTheme } from "@/app/contexts/ThemeContext";

export default function ProfileHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full px-6 py-8 md:px-12 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Theme Toggle - Fixed top right on mobile, normal position on desktop */}
        <button
          onClick={toggleTheme}
          className="fixed top-6 right-6 z-50 text-3xl hover:opacity-70 transition-all md:absolute md:top-12 md:right-12"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Profile Info */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl font-bold mb-2">RAY</h1>
            <p className="text-lg md:text-xl opacity-80">
              Builder, Creator, Explorer
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
