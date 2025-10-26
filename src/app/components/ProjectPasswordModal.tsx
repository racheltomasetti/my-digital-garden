"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { kalam, perpetua } from "@/app/fonts";
import { useTheme } from "@/app/contexts/ThemeContext";

interface ProjectPasswordModalProps {
  isOpen: boolean;
  projectSlug: string;
  correctPassword: string;
  onClose: () => void;
}

export default function ProjectPasswordModal({
  isOpen,
  projectSlug,
  correctPassword,
  onClose,
}: ProjectPasswordModalProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    // Reset state when modal opens
    if (isOpen) {
      setPassword("");
      setError(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === correctPassword) {
      // Store unlock status in sessionStorage
      sessionStorage.setItem(`project_unlocked_${projectSlug}`, "true");
      router.push(`/projects/${projectSlug}`);
      onClose();
    } else {
      setError(true);
      setPassword("");
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-300"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
      onClick={handleBackdropClick}
    >
      {/* Modal Card */}
      <div
        className="relative max-w-md w-full rounded-3xl overflow-hidden"
        style={{
          background:
            theme === "light"
              ? "rgba(255, 255, 255, 0.95)"
              : "rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border:
            theme === "light"
              ? "2px solid rgba(0, 0, 0, 0.15)"
              : "2px solid rgba(227, 83, 54, 0.3)",
          boxShadow: "0 20px 60px 0 rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{
            backgroundColor:
              theme === "light"
                ? "rgba(0, 0, 0, 0.1)"
                : "rgba(255, 255, 255, 0.1)",
            color: "var(--tx)",
          }}
        >
          ✕
        </button>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.1)",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h2
              className={`text-3xl font-bold ${kalam.className}`}
              style={{ color: "var(--accent)" }}
            >
              Protected Project
            </h2>
            <p
              className={`text-base ${perpetua.className}`}
              style={{ color: "var(--tx-2)" }}
            >
              Enter the password to access this project
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Enter password"
                className={`w-full px-4 py-3 rounded-xl ${perpetua.className}`}
                style={{
                  backgroundColor:
                    theme === "light"
                      ? "rgba(0, 0, 0, 0.05)"
                      : "rgba(255, 255, 255, 0.1)",
                  border: error
                    ? "2px solid #ef4444"
                    : theme === "light"
                    ? "2px solid rgba(0, 0, 0, 0.1)"
                    : "2px solid rgba(255, 255, 255, 0.1)",
                  color: "var(--tx)",
                  outline: "none",
                }}
                autoFocus
              />
              {error && (
                <p
                  className={`text-sm mt-2 ${perpetua.className}`}
                  style={{ color: "#ef4444" }}
                >
                  Incorrect password. Please try again.
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-6 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg ${kalam.className}`}
              style={{
                backgroundColor: "var(--accent)",
                color: "#fff",
              }}
            >
              Unlock Project
            </button>
          </form>

          {/* Hint */}
          <p
            className={`text-center text-xs ${perpetua.className}`}
            style={{ color: "var(--tx-3)" }}
          >
            Press ESC or click outside to close
          </p>
        </div>
      </div>
    </div>
  );
}
