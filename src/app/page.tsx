"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import HomeNav from "@/app/components/HomeNav";
import WelcomeModal from "@/app/components/WelcomeModal";

const Garden = dynamic(() => import("@/app/components/garden/Garden"), {
  ssr: false,
  loading: () => <div className="home-garden-loading" />,
});

function SectionFrame({ id, label }: { id: string; label: string }) {
  return (
    <section id={id} className="home-section">
      <p className="section-tag">{label}</p>
      <div className="section-frame" aria-hidden="true" />
    </section>
  );
}

export default function RootPage() {
  const [welcomeOpen, setWelcomeOpen] = useState(false);

  useEffect(() => {
    setWelcomeOpen(true);
  }, []);

  const closeWelcome = useCallback(() => {
    setWelcomeOpen(false);
  }, []);

  return (
    <main className="home-page">
      <WelcomeModal isOpen={welcomeOpen} onClose={closeWelcome} />
      <HomeNav />

      <section id="top" className="home-garden">
        <Garden
          onLighthouseClick={() => {
            window.location.href = "https://unlock-ki.com";
          }}
        />
      </section>

      <div className="full-divider" />

      <SectionFrame id="ray" label="##ray" />

      <div className="full-divider" />

      <SectionFrame id="builds" label="##builds" />

      <div className="full-divider" />

      <SectionFrame id="ki" label="##ki" />
    </main>
  );
}
