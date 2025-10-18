"use client";

import { useEffect, useState } from "react";
import { kalam, perpetua } from "@/app/fonts";

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      // Small delay for smooth entrance
      setTimeout(() => {
        setIsOpen(true);
        setTimeout(() => setIsVisible(true), 50);
      }, 500);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      localStorage.setItem("hasVisited", "true");
    }, 300);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center px-4 transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      onClick={handleBackdropClick}
    >
      {/* Modal Card */}
      <div
        className={`relative max-w-lg w-full rounded-3xl overflow-hidden transition-all duration-300 ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
        style={{
          background: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "2px solid rgba(227, 83, 54, 0.3)",
          boxShadow: "0 20px 60px 0 rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Content */}
        <div className="p-8 md:p-10 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2
              className={`text-4xl md:text-5xl font-bold ${kalam.className}`}
              style={{ color: "var(--accent)" }}
            >
              Welcome!
            </h2>
            <div
              className="w-16 h-1 mx-auto rounded-full"
              style={{ backgroundColor: "var(--accent-2)" }}
            />
          </div>

          {/* Site Overview */}
          <div className={`space-y-4 ${perpetua.className}`}>
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: "var(--tx)" }}
            >
              Welcome to my digital garden! This site has two main sections:
            </p>

            <div className="space-y-3 pl-4">
              <div className="space-y-1">
                <p
                  className="text-lg md:text-xl font-semibold"
                  style={{ color: "var(--accent)" }}
                >
                  HOME
                </p>
                <p
                  className="text-base md:text-lg"
                  style={{ color: "var(--tx-2)" }}
                >
                  An interactive garden visualization representing my journey
                </p>
              </div>

              <div className="space-y-1">
                <p
                  className="text-lg md:text-xl font-semibold"
                  style={{ color: "var(--accent)" }}
                >
                  NOW
                </p>
                <p
                  className="text-base md:text-lg"
                  style={{ color: "var(--tx-2)" }}
                >
                  What I&apos;m currently building and learning
                </p>
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="space-y-3">
            <h3
              className={`text-xl md:text-2xl font-semibold ${kalam.className}`}
              style={{ color: "var(--tx)" }}
            >
              Keyboard Shortcuts
            </h3>

            <div className={`space-y-2 ${perpetua.className}`}>
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <kbd
                    className="px-3 py-1.5 rounded-lg text-sm font-mono font-semibold min-w-[2.5rem] text-center"
                    style={{
                      backgroundColor: "var(--ui-2)",
                      color: "var(--tx)",
                      border: "1px solid var(--ui-3)",
                    }}
                  >
                    ←
                  </kbd>
                  <kbd
                    className="px-3 py-1.5 rounded-lg text-sm font-mono font-semibold min-w-[2.5rem] text-center"
                    style={{
                      backgroundColor: "var(--ui-2)",
                      color: "var(--tx)",
                      border: "1px solid var(--ui-3)",
                    }}
                  >
                    →
                  </kbd>
                </div>
                <span
                  className="text-base md:text-lg"
                  style={{ color: "var(--tx-2)" }}
                >
                  Navigate between pages
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <kbd
                    className="px-3 py-1.5 rounded-lg text-sm font-mono font-semibold min-w-[2.5rem] text-center"
                    style={{
                      backgroundColor: "var(--ui-2)",
                      color: "var(--tx)",
                      border: "1px solid var(--ui-3)",
                    }}
                  >
                    L
                  </kbd>
                  <kbd
                    className="px-3 py-1.5 rounded-lg text-sm font-mono font-semibold min-w-[2.5rem] text-center"
                    style={{
                      backgroundColor: "var(--ui-2)",
                      color: "var(--tx)",
                      border: "1px solid var(--ui-3)",
                    }}
                  >
                    D
                  </kbd>
                </div>
                <span
                  className="text-base md:text-lg"
                  style={{ color: "var(--tx-2)" }}
                >
                  Toggle light/dark mode
                </span>
              </div>
            </div>
          </div>

          {/* Dismiss Button */}
          <button
            onClick={handleClose}
            className={`w-full py-3 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg ${kalam.className}`}
            style={{
              backgroundColor: "var(--accent)",
              color: "#fff",
            }}
          >
            Got it! Start exploring
          </button>

          {/* ESC hint */}
          <p
            className={`text-center text-sm ${perpetua.className}`}
            style={{ color: "var(--tx-3)" }}
          >
            Press{" "}
            <kbd className="text-xs" style={{ color: "var(--tx-2)" }}>
              ESC
            </kbd>{" "}
            or click outside to close
          </p>
        </div>

        {/* Accent glow effect */}
        <div
          className="absolute inset-0 rounded-3xl opacity-50 pointer-events-none"
          style={{
            boxShadow: "inset 0 0 40px rgba(227, 83, 54, 0.1)",
          }}
        />
      </div>
    </div>
  );
}
