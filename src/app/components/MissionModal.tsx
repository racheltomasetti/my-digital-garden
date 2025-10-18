"use client";

import { useEffect } from "react";
import { kalam, perpetua, dancingScript } from "@/app/fonts";

interface MissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MissionModal({ isOpen, onClose }: MissionModalProps) {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
      onClick={onClose}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.33)" }}
    >
      {/* Modal Container */}
      <div
        className="relative w-11/12 max-w-md p-8 pb-12 rounded-lg shadow-2xl animate-scale-in"
        style={{
          backgroundColor: "var(--bg)",
          border: "2px solid var(--ui-2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Content */}
        <div style={{ color: "var(--tx)" }}>
          <h2
            className={`text-4xl font-bold mb-6 text-center ${kalam.className}`}
            style={{ color: "var(--accent)" }}
          >
            CORE MISSION
          </h2>

          <div className={`space-y-4 ${kalam.className}`}>
            <p
              className="text-4xl leading-relaxed italic text-center"
              style={{ color: "var(--tx)" }}
            >
              To unlock the mind and connect back to
              <br />
              <span className="font-bold">Self</span>
            </p>

            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--tx-2)" }}
            >
              {/* Every journey begins with clarity of purpose. This space will hold
              the guiding principles and vision that drive this digital
              presence. */}
            </p>
          </div>
        </div>

        {/* Close Button */}
        {/* <button
          onClick={onClose}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-2xl transition-colors"
          style={{ color: "var(--tx-2)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--tx)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--tx-2)";
          }}
          aria-label="Close modal"
        >
          ×
        </button> */}
      </div>
    </div>
  );
}
