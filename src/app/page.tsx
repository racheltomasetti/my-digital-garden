"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const Garden = dynamic(() => import("@/app/components/garden/Garden"), {
  ssr: false,
  loading: () => <div className="home-garden-loading" />,
});

const CALENDLY_URL = "#"; // wire up Calendly URL

function FitStatement({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const fit = () => {
      text.style.fontSize = "1px";
      const isDesktop = container.clientWidth >= 768;
      const fraction = isDesktop ? 0.55 : 0.92;
      const next = (container.clientWidth * fraction) / text.scrollWidth;
      text.style.fontSize = `${next}px`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(container);
    void document.fonts.ready.then(fit);

    return () => ro.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="home-hero">
      {href ? (
        <a
          ref={(el) => {
            textRef.current = el;
          }}
          href={href}
          className="statement statement-link"
        >
          {children}
        </a>
      ) : (
        <h1
          ref={(el) => {
            textRef.current = el;
          }}
          className="statement"
        >
          {children}
        </h1>
      )}
    </section>
  );
}

export default function RootPage() {
  return (
    <main className="home-viewport">
      <FitStatement>
        RAY BUILDS{" "}
        <Link href="/garden" className="statement-accent statement-ki">
          KI
        </Link>
      </FitStatement>

      <div className="full-divider" />

      <section className="home-garden">
        <Garden
          onLighthouseClick={() => {
            window.location.href = "https://unlock-ki.com";
          }}
        />
      </section>

      <div className="full-divider" />

      <FitStatement href={CALENDLY_URL}>
        LET US <span className="statement-accent">DANCE</span>
      </FitStatement>
    </main>
  );
}
