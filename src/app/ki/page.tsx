"use client";

import { useRef } from "react";
import Navigation from "@/app/components/Navigation";
import { kalam, notoSans } from "@/app/fonts";
import TextType from "@/components/TextType";
import DemoShowcase from "@/app/components/DemoShowcase";

export default function KIPage() {
  const connectSectionRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navigation />
      {/* BUILDING NOW SECTION */}
      <section className="pt-32 px-8 pb-8 max-w-7xl mx-auto">
        <TextType
          text={["WHAT I'M BUILDING NOW"]}
          className={`text-4xl md:text-6xl font-bold mb-12 text-center ${kalam.className}`}
          textColors={["var(--accent)"]}
          typingSpeed={60}
          pauseDuration={1800}
          showCursor={true}
          cursorCharacter="|"
        />
      </section>

      {/* Projects Grid Section */}
      {/* <section className="px-8 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <Link href="/ki/builder-ki">
            <div
              className="p-6 rounded-lg border-2 transition-all hover:scale-105 cursor-pointer h-full flex flex-col"
              style={{
                backgroundColor: "var(--ui)",
                borderColor: "var(--accent)",
              }}
            >
              <div className="space-y-3 flex-grow">
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-xl font-bold ${kalam.className}`}
                    style={{ color: "var(--tx)" }}
                  >
                    KI
                  </h3>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${notoSans.className}`}
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "white",
                    }}
                  >
                    BUILDING
                  </span>
                </div>
                <p
                  className={`text-sm ${notoSans.className}`}
                  style={{ color: "var(--tx-2)" }}
                >
                  A digital extension of the mind.
                </p>
              </div>
            </div>
          </Link>

          <Link href="/ki/cycle-ki">
            <div
              className="p-6 rounded-lg border-2 transition-all hover:scale-105 cursor-pointer h-full flex flex-col"
              style={{
                backgroundColor: "var(--ui)",
                borderColor: "var(--accent)",
              }}
            >
              <div className="space-y-3 flex-grow">
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-xl font-bold ${kalam.className}`}
                    style={{ color: "var(--tx)" }}
                  >
                    Women's Expert Assistant
                  </h3>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${notoSans.className}`}
                    style={{
                      backgroundColor: "var(--accent-2)",
                      color: "white",
                    }}
                  >
                    PLANNING
                  </span>
                </div>
                <p
                  className={`text-sm ${notoSans.className}`}
                  style={{ color: "var(--tx-2)" }}
                >
                  Hormonal Cycle Expert Assistant. A tool to help women
                  understand their bodies and live in their flow.
                </p>
              </div>
            </div>
          </Link>

          <Link href="/ki/mind-ki">
            <div
              className="p-6 rounded-lg border-2 transition-all hover:scale-105 cursor-pointer h-full flex flex-col"
              style={{
                backgroundColor: "var(--ui)",
                borderColor: "var(--accent)",
              }}
            >
              <div className="space-y-3 flex-grow">
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-xl font-bold ${kalam.className}`}
                    style={{ color: "var(--tx)" }}
                  >
                    my-digital-garden
                  </h3>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${notoSans.className}`}
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "white",
                    }}
                  >
                    IN PROGRESS
                  </span>
                </div>
                <p
                  className={`text-sm ${notoSans.className}`}
                  style={{ color: "var(--tx-2)" }}
                >
                  Where we are now.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section> */}

      {/* Demo Showcase */}
      <DemoShowcase
        projectName="KI"
        demoNumber={1}
        githubUrl="https://github.com/racheltomasetti/builder-ki"
        timestamp="Ocotber 17, 2025 ~ 1:42 AM EST"
        blurb="you can tell how badly i need sleep by the fact i said august 17, 2025 and didn't bat an eye"
        webVideoSrc="/demos/ki-web-demo1.mp4"
        mobileVideoSrc="/demos/ki-mobile-demo1.mov"
        webVideoStartTime={57}
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
            let&apos;s build together.
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
