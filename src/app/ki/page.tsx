"use client";

import Navigation from "@/app/components/Navigation";
import { kalam, notoSans } from "@/app/fonts";

export default function KIPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navigation />

      {/* Title*/}
      <section className="pt-24 px-8 pb-12">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 mt-6 ${kalam.className} text-center">
          {/* KI */}
        </h1>
      </section>

      {/* Hero Section */}
      {/* <section className="pt-24 px-8 pb-12">
        <div className="max-w-6xl mx-auto" style={{ color: "var(--tx)" }}>
          <h1
            className={`text-6xl md:text-7xl font-bold mb-6 mt-6 ${kalam.className}`}
          >
            Self Toolkit
          </h1>
          <p
            className={`text-xl md:text-2xl font-light max-w-3xl ${notoSans.className}`}
          >
            [to live in the now]
          </p>
        </div>
      </section> */}

      {/* Toolkit Categories */}
      {/*  */}
    </div>
  );
}
