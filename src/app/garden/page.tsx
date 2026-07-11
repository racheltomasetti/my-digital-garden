"use client";

import dynamic from "next/dynamic";

const Garden = dynamic(() => import("@/app/components/garden/Garden"), {
  ssr: false,
  loading: () => (
    <div className="garden-loading">
      <p>entering the garden…</p>
    </div>
  ),
});

export default function GardenPage() {
  return (
    <main className="garden-page">
      <Garden
        onLighthouseClick={() => {
          window.location.href = "https://unlock-ki.com";
        }}
      />
    </main>
  );
}
