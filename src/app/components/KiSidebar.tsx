"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/app/contexts/ThemeContext";
import { perpetua } from "@/app/fonts";

const sectionItems = [
  { id: "ki", label: "building NOW" },
  { id: "builds", label: "projects" },
  { id: "resources", label: "resources" },
  { id: "connect", label: "connect" },
];

export default function KiSidebar() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState("ki");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Smooth scroll to section with offset
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navHeight = 100; // Approximate nav height
      const sectionTop = section.offsetTop - navHeight;
      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      });
    }
    setIsMobileSidebarOpen(false); // Close mobile sidebar after click
  };

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const navHeight = 100;
      const scrollPosition = window.scrollY + navHeight + 50;

      for (const item of [...sectionItems].reverse()) {
        const section = document.getElementById(item.id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Sidebar - Fixed Left - Full Height */}
      <aside
        className={`hidden md:block fixed left-0 top-0 bottom-0 z-40 ${perpetua.className}`}
        style={{
          background:
            theme === "light"
              ? "rgba(255, 255, 255, 0.5)"
              : "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRight:
            theme === "light"
              ? "2px solid rgba(0, 0, 0, 0.15)"
              : "2px solid rgba(255, 255, 255, 0.1)",
          boxShadow:
            theme === "light"
              ? "8px 0 32px 0 rgba(0, 0, 0, 0.15)"
              : "8px 0 32px 0 rgba(0, 0, 0, 0.3)",
          width: "200px",
        }}
      >
        <div className="flex items-center h-full px-6">
          <nav className="flex flex-col gap-6 w-full">
            {sectionItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center gap-3 transition-all text-left group"
              >
                {/* Active indicator line */}
                <div
                  className="w-1 h-6 rounded-full transition-all"
                  style={{
                    backgroundColor:
                      activeSection === item.id
                        ? "var(--accent-2)"
                        : theme === "light"
                        ? "rgba(0, 0, 0, 0.2)"
                        : "rgba(255, 255, 255, 0.3)",
                    transform:
                      activeSection === item.id ? "scaleY(1.2)" : "scaleY(1)",
                  }}
                />
                {/* Label */}
                <span
                  className={`text-2xl transition-colors ${
                    activeSection === item.id ? "font-bold" : ""
                  }`}
                  style={{
                    color:
                      activeSection === item.id
                        ? "var(--accent)"
                        : "var(--tx-2)",
                  }}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Floating Button */}
      <button
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        className={`md:hidden fixed left-4 bottom-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all ${perpetua.className}`}
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
          color: "var(--accent)",
        }}
      >
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
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {/* Mobile Sidebar Menu */}
      {isMobileSidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMobileSidebarOpen(false)}
          />

          {/* Sidebar */}
          <aside
            className={`md:hidden fixed left-0 top-0 bottom-0 z-50 w-64 transition-transform ${perpetua.className}`}
            style={{
              background:
                theme === "light"
                  ? "rgba(255, 255, 255, 0.95)"
                  : "rgba(0, 0, 0, 0.95)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderRight:
                theme === "light"
                  ? "2px solid rgba(0, 0, 0, 0.15)"
                  : "2px solid rgba(255, 255, 255, 0.1)",
              boxShadow:
                theme === "light"
                  ? "0 8px 32px 0 rgba(0, 0, 0, 0.15)"
                  : "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="p-6">
              {/* Close button */}
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="mb-6 text-2xl"
                style={{ color: "var(--tx)" }}
              >
                ✕
              </button>

              {/* Navigation */}
              <nav className="flex flex-col gap-6">
                {sectionItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center gap-3 transition-all text-left"
                  >
                    {/* Active indicator line */}
                    <div
                      className="w-1 h-8 rounded-full transition-all"
                      style={{
                        backgroundColor:
                          activeSection === item.id
                            ? "var(--accent-2)"
                            : theme === "light"
                            ? "rgba(0, 0, 0, 0.2)"
                            : "rgba(255, 255, 255, 0.3)",
                        transform:
                          activeSection === item.id
                            ? "scaleY(1.2)"
                            : "scaleY(1)",
                        opacity: activeSection === item.id ? 0.5 : 1,
                      }}
                    />
                    {/* Label */}
                    <span
                      className={`text-lg transition-colors ${
                        activeSection === item.id ? "font-bold" : ""
                      }`}
                      style={{
                        color:
                          activeSection === item.id
                            ? "var(--accent)"
                            : "var(--tx-2)",
                      }}
                    >
                      {item.label}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
