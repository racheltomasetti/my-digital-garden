"use client";

import { useEffect, useState } from "react";
import { perpetua } from "@/app/fonts";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function BuilderNote() {
  const { theme } = useTheme();
  const [hasRead, setHasRead] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user has read the builder's note
    const readStatus = localStorage.getItem("hasReadBuilderNote");
    setHasRead(readStatus === "true");
  }, []);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    // Mark as read
    if (!hasRead) {
      setHasRead(true);
      localStorage.setItem("hasReadBuilderNote", "true");
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <>
      {/* Builder Note Card - Fixed Top Left */}
      <div
        className={`fixed top-20 left-4 md:top-24 md:left-6 z-[1000] transition-all duration-500 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
        style={{
          pointerEvents: isVisible ? "auto" : "none",
        }}
      >
        {/* Glassmorphism Card */}
        <div
          onClick={handleOpen}
          className={`
            relative overflow-hidden rounded-2xl cursor-pointer
            transition-all duration-300 ease-out
            hover:scale-105 hover:shadow-2xl
            ${perpetua.className}
          `}
          style={{
            background:
              theme === "light"
                ? "rgba(255, 255, 255, 0.5)"
                : "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border:
              theme === "light"
                ? "2px solid rgba(0, 0, 0, 0.15)"
                : "2px solid rgba(255, 255, 255, 0.1)",
            boxShadow:
              theme === "light"
                ? "0 8px 32px 0 rgba(0, 0, 0, 0.15)"
                : "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
            maxWidth: "200px",
          }}
        >
          {/* Content */}
          <div className="p-3 flex items-center gap-3">
            {/* Play Video Icon */}
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "var(--tx)" }}
              >
                <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
              </svg>

              {/* Unread Indicator - Pulsing Dot */}
              {/* {!hasRead && (
                <>
                  <div
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-ping"
                    style={{ backgroundColor: "rgba(227, 83, 54, 0.75)" }}
                  />
                  <div
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                    style={{ backgroundColor: "var(--accent)" }}
                  />
                </>
              )} */}
            </div>

            {/* Label */}
            <span
              className="text-sm font-semibold text-center italic"
              style={{ color: "var(--tx)" }}
            >
              PLAY ME
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 transition-all duration-300"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          onClick={handleBackdropClick}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 left-4 md:top-8 md:left-8 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 z-50"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "#fff",
            }}
          >
            ✕
          </button>

          {/* Video Section - Placeholder */}
          <div className="w-full max-w-6xl aspect-video bg-gray-200 rounded-2xl flex items-center justify-center">
            <p
              className={`text-xl ${perpetua.className}`}
              style={{ color: "var(--tx-2)" }}
            >
              [Video will go here]
            </p>
          </div>
        </div>
      )}
    </>
  );
}
