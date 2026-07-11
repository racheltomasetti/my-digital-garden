"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);
  const [isManualOverride, setIsManualOverride] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Initialize theme from system preference or manual override
  useEffect(() => {
    const manualOverride = localStorage.getItem("themeManualOverride");
    const savedTheme = localStorage.getItem("theme") as Theme | null;

    if (manualOverride === "true" && savedTheme) {
      // User has manually set a preference via keyboard
      setTheme(savedTheme);
      setIsManualOverride(true);
    } else {
      // Use system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
      setIsManualOverride(false);
    }
    setMounted(true);
  }, []);

  // Listen for system theme changes (only if not manually overridden)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-update if user hasn't manually overridden
      if (!isManualOverride) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [isManualOverride]);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.classList.add("theme-ready");

    if (isManualOverride) {
      localStorage.setItem("theme", theme);
      localStorage.setItem("themeManualOverride", "true");
    }
  }, [theme, mounted, isManualOverride]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    setIsManualOverride(true); // Mark as manual override when toggled via keyboard
  }, []);

  // Keyboard listener for "D" / "L" theme toggle
  useEffect(() => {
    if (typeof window === "undefined" || !mounted) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Only toggle if not typing in an input/textarea
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (
        event.key === "d" ||
        event.key === "D" ||
        event.key === "l" ||
        event.key === "L"
      ) {
        toggleTheme();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTheme, mounted]);

  // Keyboard listener for arrow key navigation (main pages + project pages)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only navigate if not typing in an input/textarea
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pathname, router]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return default value during SSR or if used outside provider
    return { theme: "dark" as Theme, toggleTheme: () => {} };
  }
  return context;
}
