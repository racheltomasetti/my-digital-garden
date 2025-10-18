"use client";

import { useRef, useEffect } from "react";
import { kalam, perpetua } from "@/app/fonts";

interface DemoShowcaseProps {
  projectName: string;
  demoNumber: number;
  githubUrl: string;
  timestamp: string;
  blurb?: string; // Optional quick thoughts/description
  webVideoSrc: string;
  mobileVideoSrc: string;
  webVideoStartTime?: number; // Time in seconds when mobile video should start
}

export default function DemoShowcase({
  projectName,
  demoNumber,
  githubUrl,
  timestamp,
  blurb,
  webVideoSrc,
  mobileVideoSrc,
  webVideoStartTime = 57,
}: DemoShowcaseProps) {
  const webVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // Auto-play mobile video when web video reaches specified time
  useEffect(() => {
    const webVideo = webVideoRef.current;
    const mobileVideo = mobileVideoRef.current;

    if (!webVideo || !mobileVideo) return;

    const handleTimeUpdate = () => {
      if (webVideo.currentTime >= webVideoStartTime && mobileVideo.paused) {
        mobileVideo.play().catch((error) => {
          console.log("Auto-play prevented:", error);
        });
      }
    };

    webVideo.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      webVideo.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [webVideoStartTime]);

  return (
    <section className="pb-16 max-w-[1600px] mx-auto px-8">
      {/* Demo Card */}
      <div
        className="rounded-3xl border-4 p-8 md:p-12"
        style={{
          backgroundColor: "var(--ui)",
          borderColor: "var(--accent)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Top Bar: Project Name & GitHub */}
        <div
          className="flex items-center justify-between mb-6 pb-4 border-b-2"
          style={{ borderColor: "var(--ui-2)" }}
        >
          {/* Left: Project Name · Demo # */}
          <div className={`text-lg md:text-xl font-bold ${kalam.className}`} style={{ color: "var(--tx)" }}>
            {projectName} · Demo #{demoNumber}
          </div>

          {/* Right: GitHub Link */}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
            style={{ color: "var(--tx)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--tx)";
            }}
            aria-label="View on GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>

        {/* Timestamp Header */}
        <div className="mb-8 text-center">
          <h3
            className={`text-2xl md:text-3xl font-bold mt-2 ${kalam.className}`}
            style={{ color: "var(--accent)" }}
          >
            {timestamp}
          </h3>
          {blurb && (
            <p
              className={`mt-4 text-base md:text-lg max-w-3xl mx-auto ${perpetua.className}`}
              style={{ color: "var(--tx-2)" }}
            >
              {blurb}
            </p>
          )}
        </div>

        {/* Demo Videos */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-start">
          {/* Web Demo Video */}
          <div className="flex flex-col flex-1 max-w-[700px]">
            <h3
              className={`text-2xl md:text-3xl font-bold mb-4 text-center ${kalam.className}`}
              style={{ color: "var(--accent)" }}
            >
              Web
            </h3>
            <div
              className="rounded-2xl overflow-hidden border-4 transition-all hover:scale-[1.02]"
              style={{ borderColor: "var(--accent)" }}
            >
              <video
                ref={webVideoRef}
                className="w-full bg-black"
                controls
                preload="metadata"
                style={{ height: "70vh" }}
              >
                <source src={webVideoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Mobile Demo Video */}
          <div
            className="flex flex-col flex-shrink-0"
            style={{ width: "400px" }}
          >
            <h3
              className={`text-2xl md:text-3xl font-bold mb-4 text-center ${kalam.className}`}
              style={{ color: "var(--accent)" }}
            >
              Mobile
            </h3>
            <div
              className="rounded-2xl overflow-hidden border-4 transition-all hover:scale-[1.02]"
              style={{ borderColor: "var(--accent)" }}
            >
              <video
                ref={mobileVideoRef}
                className="w-full bg-black"
                controls
                preload="metadata"
                style={{ height: "70vh" }}
              >
                <source src={mobileVideoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
