"use client";

import Navigation from "@/app/components/Navigation";
import { kalam, notoSans } from "@/app/fonts";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function BuilderKIPage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navigation />

      {/* Project Title & Stage */}
      <section className="mt-30 px-8 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1
            className={`text-5xl md:text-7xl font-bold ${kalam.className}`}
            style={{ color: "var(--accent)" }}
          >
            builder-ki
          </h1>
          <span
            className={`text-lg px-4 py-2 rounded-full ${notoSans.className}`}
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--bg)",
            }}
          >
            Stage: Building
          </span>
        </div>
      </section>

      {/* Navigation Hint */}
      <section className="px-8 py-12 max-w-4xl mx-auto text-center">
        <p
          className={`text-lg ${notoSans.className}`}
          style={{ color: "var(--tx-2)" }}
        >
          Use arrow keys to navigate between projects • Press ↑ to return to NOW
        </p>
      </section>
    </div>
  );
}
