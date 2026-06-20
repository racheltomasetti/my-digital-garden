"use client";
import dynamic from "next/dynamic";
import Image from "next/image";

const Garden = dynamic(() => import("@/app/components/garden/Garden"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-gradient-to-b from-sky-300 to-orange-200 flex items-center justify-center">
      <p className="text-2xl">Loading garden...</p>
    </div>
  ),
});

export default function RootPage() {
  return (
    <main>
      <section className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "min(78vw, 520px)",
              aspectRatio: "1 / 1",
              borderRadius: "9999px",
              overflow: "hidden",
              border: "1px solid var(--line)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.03) inset",
              background: "#0f1116",
            }}
          >
            <Garden
              onLighthouseClick={() =>
                window.open("https://unlock-ki.com", "_blank", "noopener,noreferrer")
              }
            />
          </div>
        </div>
      </section>
    </main>
  );
}
