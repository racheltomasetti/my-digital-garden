"use client";

import { useEffect } from "react";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="welcome-modal" onClick={onClose} role="presentation">
      <div
        className="welcome-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="welcome-modal-title" className="welcome-modal-title">
          welcome to ray&apos;s garden
        </h2>
        <p className="welcome-modal-hint">
          click the red lighthouse to enter
        </p>
        <button type="button" className="welcome-modal-dismiss" onClick={onClose}>
          enter
        </button>
      </div>
    </div>
  );
}
