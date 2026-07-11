"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

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
      const next = (container.clientWidth * 0.92) / text.scrollWidth;
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
    <main>
      <div className="home-above-fold">
        <FitStatement>
          RAY BUILDS{" "}
          <Link href="/garden" className="statement-accent statement-ki">
            KI
          </Link>
        </FitStatement>

        <div className="full-divider" />

        <section className="home-spacer" aria-hidden="true" />
      </div>

      <div className="full-divider" />

      <FitStatement href={CALENDLY_URL}>
        LET US <span className="statement-accent">DANCE</span>
      </FitStatement>
    </main>
  );
}
