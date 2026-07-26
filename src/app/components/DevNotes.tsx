"use client";

import { useState } from "react";

const SUBPAGES = [
  { href: "/garden", label: "full-screen garden scene" },
  { href: "/ki/terra", label: "terra — ki's cycle app" },
  { href: "/mind", label: "mind (logo link-out page)" },
  { href: "/mind/12-favorite-problems", label: "mind / favorite problems" },
] as const;

export default function DevNotes() {
  const [open, setOpen] = useState(true);

  return (
    <div className="dev-notes" data-open={open}>
      <button
        type="button"
        className="dev-notes-toggle"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "✕ dev notes" : "☰ dev notes"}
      </button>

      {open && (
        <div className="dev-notes-body">
          <p className="dev-notes-heading">sub-pages found in codebase</p>
          <ul className="dev-notes-list">
            {SUBPAGES.map(({ href, label }) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {href}
                </a>
                <span className="dev-notes-label">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
