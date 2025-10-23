"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { kalam, perpetua } from "../fonts";
import { useTheme } from "../contexts/ThemeContext";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("ki");
  const pathname = usePathname();
  const { theme } = useTheme();
  const subMenuRef = useRef<HTMLDivElement>(null);
  const nowButtonRef = useRef<HTMLAnchorElement>(null);

  // Check if we're on a themed page (not home)
  const isThemedPage = pathname !== "/";
  const isKiPage = pathname === "/ki";

  // Sub-navigation items
  const subNavItems = [
    { id: "ki", label: "building NOW" },
    { id: "builds", label: "projects" },
    { id: "resources", label: "resources" },
  ];

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
    setIsSubMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Detect active section on scroll
  useEffect(() => {
    if (!isKiPage) return;

    const handleScroll = () => {
      const navHeight = 100;
      const scrollPosition = window.scrollY + navHeight + 50;

      for (const item of [...subNavItems].reverse()) {
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
  }, [isKiPage]);

  // Close sub-menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        subMenuRef.current &&
        !subMenuRef.current.contains(event.target as Node) &&
        nowButtonRef.current &&
        !nowButtonRef.current.contains(event.target as Node)
      ) {
        setIsSubMenuOpen(false);
      }
    };

    if (isSubMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSubMenuOpen]);

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
            style={
              pathname === "/"
                ? { color: "var(--accent)" }
                : isThemedPage
                ? { color: "var(--tx)" }
                : { color: "white" }
            }
            onMouseEnter={(e) => {
              if (pathname !== "/") {
                if (isThemedPage) {
                  e.currentTarget.style.color = "var(--tx-2)";
                } else {
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
                }
              }
            }}
            onMouseLeave={(e) => {
              if (pathname === "/") {
                e.currentTarget.style.color = "var(--accent)";
              } else if (isThemedPage) {
                e.currentTarget.style.color = "var(--tx)";
              } else {
                e.currentTarget.style.color = "white";
              }
            }}
          >
            HOME
          </Link>

          {/* Right: Desktop navigation links */}
          <div className={`hidden md:flex gap-8 ${kalam.className} relative`}>
            <Link
              ref={nowButtonRef}
              href="/ki"
              className={`text-3xl transition-colors ${
                pathname === "/ki" ? "font-bold" : ""
              }`}
              style={
                pathname === "/ki"
                  ? { color: "var(--accent)" }
                  : isThemedPage
                  ? { color: "var(--tx)" }
                  : { color: "white" }
              }
              onMouseEnter={(e) => {
                if (isKiPage) {
                  setIsSubMenuOpen(true);
                }
                if (pathname !== "/ki") {
                  if (isThemedPage) {
                    e.currentTarget.style.color = "var(--tx-2)";
                  } else {
                    e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
                  }
                }
              }}
              onMouseLeave={(e) => {
                if (pathname === "/ki") {
                  e.currentTarget.style.color = "var(--accent)";
                } else if (isThemedPage) {
                  e.currentTarget.style.color = "var(--tx)";
                } else {
                  e.currentTarget.style.color = "white";
                }
              }}
            >
              NOW
            </Link>

            {/* Sub-menu for /ki page - Desktop */}
            {isKiPage && isSubMenuOpen && (
              <div
                ref={subMenuRef}
                className={`absolute top-12 right-0 z-50 transition-all duration-300 ease-out ${perpetua.className}`}
                onMouseEnter={() => setIsSubMenuOpen(true)}
                onMouseLeave={() => setIsSubMenuOpen(false)}
                style={{
                  background:
                    theme === "light"
                      ? "rgba(255, 255, 255, 0.85)"
                      : "rgba(0, 0, 0, 0.5)",
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
                  borderRadius: "1rem",
                  minWidth: "180px",
                }}
              >
                <div className="p-3 flex flex-col gap-2">
                  {subNavItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left px-3 py-2 rounded-lg transition-all ${
                        activeSection === item.id ? "font-bold" : ""
                      }`}
                      style={{
                        color:
                          activeSection === item.id
                            ? "var(--accent)"
                            : "var(--tx)",
                        backgroundColor:
                          activeSection === item.id
                            ? theme === "light"
                              ? "rgba(0, 0, 0, 0.05)"
                              : "rgba(255, 255, 255, 0.1)"
                            : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (activeSection !== item.id) {
                          e.currentTarget.style.backgroundColor =
                            theme === "light"
                              ? "rgba(0, 0, 0, 0.05)"
                              : "rgba(255, 255, 255, 0.05)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeSection !== item.id) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
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
            {isKiPage ? (
              <>
                {/* Show sub-menu items directly in mobile */}
                <button
                  onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
                  className={`transition-colors text-left ${
                    pathname === "/ki" ? "font-bold" : ""
                  }`}
                  style={
                    pathname === "/ki"
                      ? { color: "var(--accent)" }
                      : isThemedPage
                      ? { color: "var(--tx)" }
                      : { color: "white" }
                  }
                >
                  NOW {isSubMenuOpen ? "▲" : "▼"}
                </button>

                {/* Sub-menu items for mobile */}
                {isSubMenuOpen && (
                  <div className="pl-4 flex flex-col gap-2">
                    {subNavItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`text-left transition-colors ${
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
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href="/ki"
                className={`transition-colors ${
                  pathname === "/ki" ? "font-bold" : ""
                }`}
                style={
                  pathname === "/ki"
                    ? { color: "var(--accent)" }
                    : isThemedPage
                    ? { color: "var(--tx)" }
                    : { color: "white" }
                }
                onClick={() => setIsMobileMenuOpen(false)}
                onMouseEnter={(e) => {
                  if (pathname !== "/ki") {
                    if (isThemedPage) {
                      e.currentTarget.style.color = "var(--tx-2)";
                    } else {
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
                    }
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname === "/ki") {
                    e.currentTarget.style.color = "var(--accent)";
                  } else if (isThemedPage) {
                    e.currentTarget.style.color = "var(--tx)";
                  } else {
                    e.currentTarget.style.color = "white";
                  }
                }}
              >
                NOW
              </Link>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
