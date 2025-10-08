"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import StoryModal from "./StoryModal";
import { kalam, dancingScript } from "../fonts";

const VISITED_KEY = "rays-garden-visited";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasVisited, setHasVisited] = useState(true); // Default to true to avoid flash
  const router = useRouter();
  const pathname = usePathname();

  // Check localStorage on mount
  useEffect(() => {
    const visited = localStorage.getItem(VISITED_KEY);
    setHasVisited(!!visited);
  }, []);

  const handleMyStoryClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Check if first visit
    if (!hasVisited) {
      setShowModal(true);
    } else {
      // Navigate directly for returning visitors
      router.push("/story#bottom");
    }
  };

  const handleStartFromBeginning = () => {
    // Set visited flag
    localStorage.setItem(VISITED_KEY, "true");
    setHasVisited(true);
    setShowModal(false);
    // Navigate to beginning
    router.push("/story#bottom");
  };

  const handleJumpToNow = () => {
    // Set visited flag
    localStorage.setItem(VISITED_KEY, "true");
    setHasVisited(true);
    setShowModal(false);
    // Navigate to now
    router.push("/story#top");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 bg-white/5 backdrop-blur-md">
        <div className="flex justify-between items-center">
          {/* Left: RAY'S GARDEN logo */}
          <Link
            href="/"
            className={`text-2xl font-bold text-white hover:text-white/80 transition-colors ${dancingScript.className}`}
          >
            RAY&apos;S GARDEN
          </Link>

          {/* Right: Desktop navigation links */}
          <div className={`hidden md:flex gap-8 ${kalam.className}`}>
            <a
              href="/story#bottom"
              onClick={handleMyStoryClick}
              className={`text-white text-2xl hover:text-white/80 transition-colors cursor-pointer ${
                pathname === "/story" ? "font-bold" : ""
              }`}
            >
              MY STORY
            </a>
            <Link
              href="/story#top"
              className={`text-white text-2xl hover:text-white/80 transition-colors ${
                pathname === "/story" ? "font-bold" : ""
              }`}
            >
              NOW
            </Link>
            <Link
              href="/connect"
              className={`text-white text-2xl hover:text-white/80 transition-colors ${
                pathname === "/connect" ? "font-bold" : ""
              }`}
            >
              CONNECT
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
            <a
              href="/story#bottom"
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                handleMyStoryClick(e);
              }}
              className={`text-white hover:text-white/80 transition-colors cursor-pointer ${
                pathname === "/story" ? "font-bold" : ""
              }`}
            >
              MY STORY
            </a>
            <Link
              href="/story#top"
              className={`text-white hover:text-white/80 transition-colors ${
                pathname === "/story" ? "font-bold" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              NOW
            </Link>
            <Link
              href="/connect"
              className={`text-white hover:text-white/80 transition-colors ${
                pathname === "/connect" ? "font-bold" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              CONNECT
            </Link>
          </div>
        )}
      </nav>

      {/* First-time visitor modal */}
      <StoryModal
        isOpen={showModal}
        onStartFromBeginning={handleStartFromBeginning}
        onJumpToNow={handleJumpToNow}
      />
    </>
  );
}
