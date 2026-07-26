"use client";

import { useState } from "react";

const LINKS = [
  { href: "#story", label: "story" },
  { href: "#now", label: "now" },
  { href: "#connect", label: "connect" },
] as const;

export default function HomeNav() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <nav className="home-nav" aria-label="Main">
      <div className="home-nav-inner">
        <a href="#top" className="home-nav-brand" onClick={close}>
          ray&apos;s garden
        </a>

        <ul className="home-nav-links">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="home-nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <ul className="home-nav-mobile">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href} onClick={close}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
