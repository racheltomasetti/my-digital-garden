"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { kalam } from "../fonts";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 bg-white/5 backdrop-blur-md">
        <div className="flex justify-between items-center">
          {/* Left: RAY'S GARDEN logo */}
          <Link
            href="/"
            className={`text-3xl font-bold text-white hover:text-white/80 transition-colors ${kalam.className}`}
          >
            RAY&apos;S GARDEN
          </Link>

          {/* Right: Desktop navigation links */}
          <div className={`hidden md:flex gap-8 ${kalam.className}`}>
            <Link
              href="/story"
              className={`text-white text-3xl hover:text-white/80 transition-colors ${
                pathname === "/story" ? "font-bold" : ""
              }`}
            >
              story
            </Link>
            <Link
              href="/toolkit"
              className={`text-white text-3xl hover:text-white/80 transition-colors ${
                pathname === "/toolkit" ? "font-bold" : ""
              }`}
            >
              toolkit
            </Link>
            <Link
              href="/connect"
              className={`text-white text-3xl hover:text-white/80 transition-colors ${
                pathname === "/connect" ? "font-bold" : ""
              }`}
            >
              connect
            </Link>
          </div>

          {/* Mobile: Hamburger menu button */}
          <button
            className="md:hidden text-white text-2xl hover:text-white/80 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
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
              href="/story"
              className={`text-white hover:text-white/80 transition-colors ${
                pathname === "/story" ? "font-bold" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              story
            </Link>
            <Link
              href="/toolkit"
              className={`text-white hover:text-white/80 transition-colors ${
                pathname === "/toolkit" ? "font-bold" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              toolkit
            </Link>
            <Link
              href="/connect"
              className={`text-white hover:text-white/80 transition-colors ${
                pathname === "/connect" ? "font-bold" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              connect
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
