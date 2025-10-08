"use client";

import { useEffect } from "react";
import Navigation from "@/app/components/Navigation";

export default function StoryPage() {
  useEffect(() => {
    // Wait 150ms before scrolling to let page render
    const scrollTimeout = setTimeout(() => {
      const hash = window.location.hash;
      if (hash === "#top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (hash === "#bottom") {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 150);

    return () => clearTimeout(scrollTimeout);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-orange-200">
      <Navigation />

      {/* Top section - NOW */}
      <section
        id="top"
        className="min-h-screen pt-24 px-8 flex items-center justify-center"
      >
        <div className="max-w-4xl">
          <h1 className="text-6xl font-bold text-white mb-8">NOW</h1>
        </div>
      </section>

      {/* Middle section - Timeline */}
      <section className="min-h-screen px-8 flex items-center justify-center bg-white/10 backdrop-blur-sm">
        <div className="max-w-4xl">
          <h2 className="text-5xl font-bold text-white mb-8">The Journey</h2>
        </div>
      </section>

      {/* Bottom section - The Beginning */}
      <section
        id="bottom"
        className="min-h-screen px-8 flex items-center justify-center"
      >
        <div className="max-w-4xl">
          <h1 className="text-6xl font-bold text-white mb-8">The Beginning</h1>
        </div>
      </section>
    </div>
  );
}
