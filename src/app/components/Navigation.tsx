"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { kalam } from "../fonts";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Check if we're on a themed page (not home)
  const isThemedPage = pathname !== "/";

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-8 py-6 backdrop-blur-md"
        style={
          isThemedPage
            ? { backgroundColor: "var(--ui)", opacity: 0.95 }
            : { backgroundColor: "rgba(255, 255, 255, 0.05)" }
        }
      >
        <div className="flex justify-between items-center">
          {/* Left: RAY'S GARDEN logo */}
          <Link
            href="/"
            className={`text-3xl font-bold transition-colors ${kalam.className}`}
            style={isThemedPage ? { color: "var(--tx)" } : { color: "white" }}
            onMouseEnter={(e) => {
              if (isThemedPage) {
                e.currentTarget.style.color = "var(--tx-2)";
              } else {
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
              }
            }}
            onMouseLeave={(e) => {
              if (isThemedPage) {
                e.currentTarget.style.color = "var(--tx)";
              } else {
                e.currentTarget.style.color = "white";
              }
            }}
          >
            RAY&apos;S GARDEN
          </Link>

          {/* Right: Desktop navigation links */}
          <div className={`hidden md:flex gap-8 ${kalam.className}`}>
            <Link
              href="/ki"
              className={`text-3xl transition-colors ${
                pathname === "/ki" ? "font-bold" : ""
              }`}
              style={isThemedPage ? { color: "var(--tx)" } : { color: "white" }}
              onMouseEnter={(e) => {
                if (isThemedPage) {
                  e.currentTarget.style.color = "var(--tx-2)";
                } else {
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
                }
              }}
              onMouseLeave={(e) => {
                if (isThemedPage) {
                  e.currentTarget.style.color = "var(--tx)";
                } else {
                  e.currentTarget.style.color = "white";
                }
              }}
            >
              KI
            </Link>
          </div>

          {/* Mobile: Hamburger menu button */}
          <button
            className="md:hidden text-2xl transition-colors"
            style={isThemedPage ? { color: "var(--tx)" } : { color: "white" }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            onMouseEnter={(e) => {
              if (isThemedPage) {
                e.currentTarget.style.color = "var(--tx-2)";
              } else {
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
              }
            }}
            onMouseLeave={(e) => {
              if (isThemedPage) {
                e.currentTarget.style.color = "var(--tx)";
              } else {
                e.currentTarget.style.color = "white";
              }
            }}
          >
            ☰
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden mt-4 flex flex-col gap-4 animate-fade-in ${kalam.className}`}
          >
            <Link
              href="/ki"
              className={`transition-colors ${
                pathname === "/ki" ? "font-bold" : ""
              }`}
              style={isThemedPage ? { color: "var(--tx)" } : { color: "white" }}
              onClick={() => setIsMobileMenuOpen(false)}
              onMouseEnter={(e) => {
                if (isThemedPage) {
                  e.currentTarget.style.color = "var(--tx-2)";
                } else {
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
                }
              }}
              onMouseLeave={(e) => {
                if (isThemedPage) {
                  e.currentTarget.style.color = "var(--tx)";
                } else {
                  e.currentTarget.style.color = "white";
                }
              }}
            >
              KI
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
