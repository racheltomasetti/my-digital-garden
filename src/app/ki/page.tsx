"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Navigation from "@/app/components/Navigation";
import { kalam, notoSans } from "@/app/fonts";
import TextType from "@/components/TextType";
import { useTheme } from "@/app/contexts/ThemeContext";
import ProfileCard from "@/components/ProfileCard";
import VideoModal from "@/components/VideoModal";

export default function KIPage() {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const connectSectionRef = useRef<HTMLElement>(null);

  // Define theme-aware colors for the TextType component
  const textColors = theme === "dark" ? ["var(--tx)"] : ["var(--tx)"];

  // Scroll to connect section
  const scrollToConnect = () => {
    connectSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navigation />

      {/* Main 2-Column Layout: Profile Card Left, Projects Right */}
      <section className="pt-32 px-8 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Column: Profile Card */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              {/* Background gradient container */}
              <div
                className="absolute inset-0 rounded-2xl blur-3xl opacity-30 -z-10"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.4) 0%, rgba(147, 51, 234, 0.3) 50%, transparent 70%)",
                  width: "400px",
                  height: "300px",
                  transform: "translate(-50%, -50%)",
                  left: "50%",
                  top: "50%",
                }}
              />
              <ProfileCard
                name="RAY"
                title="MASTER BUILDER"
                handle="raybuilds021"
                //avatarUrl="/path/to/avatar.jpg"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                behindGradient="radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y), hsla(200, 100%, 70%, 0.3) 4%, hsla(200, 50%, 60%, 0.2) 10%, hsla(200, 25%, 50%, 0.1) 50%, transparent 100%)"
                innerGradient="linear-gradient(145deg, rgba(30, 30, 50, 0.8) 0%, rgba(60, 40, 80, 0.6) 50%, rgba(80, 20, 100, 0.4) 100%)"
                miniAvatarUrl={undefined}
                onContactClick={scrollToConnect}
                onCardClick={() => setIsModalOpen(true)}
              />
            </div>
          </div>

          {/* Right Column: Projects */}
          <div className="flex flex-col">
            <TextType
              text={["CURRENTLY BUILDING"]}
              className={`text-3xl md:text-4xl font-bold mb-8 ${kalam.className}`}
              textColors={["var(--accent)"]}
              typingSpeed={60}
              pauseDuration={1800}
              showCursor={true}
              cursorCharacter="|"
            />

            <div className="flex flex-col gap-6">
              {/* Builder-KI Card */}
              <Link href="/ki/builder-ki">
                <div
                  className="p-6 rounded-lg border-2 transition-all hover:scale-105 cursor-pointer"
                  style={{
                    backgroundColor: "var(--ui)",
                    borderColor: "var(--accent)",
                  }}
                >
                  <div className="space-y-3">
                    <h3
                      className={`text-xl font-bold ${kalam.className}`}
                      style={{ color: "var(--tx)" }}
                    >
                      builder-toolkit
                    </h3>
                    <p
                      className={`text-sm ${notoSans.className}`}
                      style={{ color: "var(--tx-2)" }}
                    >
                      A digital extension of the builder's journey, an AI
                      toolkit that helps builders synthesize context and build
                      intentionally with AI.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Cycle-KI Card */}
              <Link href="/ki/cycle-ki">
                <div
                  className="p-6 rounded-lg border-2 transition-all hover:scale-105 cursor-pointer"
                  style={{
                    backgroundColor: "var(--ui)",
                    borderColor: "var(--accent)",
                  }}
                >
                  <div className="space-y-3">
                    <h3
                      className={`text-xl font-bold ${kalam.className}`}
                      style={{ color: "var(--tx)" }}
                    >
                      cycle-toolkit
                    </h3>
                    <p
                      className={`text-sm ${notoSans.className}`}
                      style={{ color: "var(--tx-2)" }}
                    >
                      Menstrual Cycle Expert Assistant. A tool to help women
                      understand their cycles and live in alignment with their
                      bodies.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Mind-KI (Digital Garden) Card */}
              <Link href="/ki/mind-ki">
                <div
                  className="p-6 rounded-lg border-2 transition-all hover:scale-105 cursor-pointer"
                  style={{
                    backgroundColor: "var(--ui)",
                    borderColor: "var(--accent)",
                  }}
                >
                  <div className="space-y-3">
                    <h3
                      className={`text-xl font-bold ${kalam.className}`}
                      style={{ color: "var(--tx)" }}
                    >
                      my-digital-garden
                    </h3>
                    <p
                      className={`text-sm ${notoSans.className}`}
                      style={{ color: "var(--tx-2)" }}
                    >
                      This digital space. A place to share my story, the work,
                      and the journey of building.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoId="Um-PlX6oPBQ"
        caption="HOW IT FEELS BUILDING WITH AI"
      />

      {/* Connect Section - Call to Action */}
      <section
        ref={connectSectionRef}
        className="mt-24 py-16 px-8"
        style={{
          backgroundColor: "var(--ui)",
          borderTop: "2px solid var(--accent)",
        }}
      >
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Heading */}
          <h2
            className={`text-5xl md:text-6xl font-bold ${kalam.className}`}
            style={{ color: "var(--accent)" }}
          >
            let's build together.
          </h2>

          {/* Email */}
          <a
            href="mailto:build.ray.build@gmail.com"
            className={`block text-2xl md:text-3xl transition-colors ${notoSans.className}`}
            style={{ color: "var(--tx)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--tx)";
            }}
          >
            build.ray.build@gmail.com
          </a>

          {/* GitHub Link */}
          <a
            href="https://github.com/racheltomasetti"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-transform hover:scale-110"
            style={{ color: "var(--tx)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--tx)";
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
