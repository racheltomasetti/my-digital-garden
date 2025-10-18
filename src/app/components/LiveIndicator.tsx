"use client";

import { useEffect, useState } from "react";
import { kalam } from "@/app/fonts";

interface StreamStatus {
  isLive: boolean;
  title?: string;
  game?: string;
  viewerCount?: number;
  thumbnailUrl?: string;
  username?: string;
}

export default function LiveIndicator() {
  const [streamStatus, setStreamStatus] = useState<StreamStatus>({ isLive: false });
  const [isVisible, setIsVisible] = useState(false);

  const fetchStreamStatus = async () => {
    try {
      const response = await fetch("/api/stream-status");
      const data = await response.json();
      setStreamStatus(data);

      // Handle visibility with smooth transitions
      if (data.isLive && !isVisible) {
        setIsVisible(true);
      } else if (!data.isLive && isVisible) {
        setIsVisible(false);
      }
    } catch (error) {
      console.error("Failed to fetch stream status:", error);
      setStreamStatus({ isLive: false });
      setIsVisible(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchStreamStatus();

    // Poll every 60 seconds
    const interval = setInterval(fetchStreamStatus, 60000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Don't render anything if not live
  if (!streamStatus.isLive) {
    return null;
  }

  const handleClick = () => {
    // Get username from the stream status response or fallback
    // We'll need to add this to the API response
    window.open(`https://twitch.tv/${streamStatus.username || ""}`, "_blank", "noopener,noreferrer");
  };

  return (
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
        onClick={handleClick}
        className={`
          relative overflow-hidden rounded-2xl cursor-pointer
          transition-all duration-300 ease-out
          hover:scale-105 hover:shadow-2xl
          ${kalam.className}
        `}
        style={{
          background: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "2px solid rgba(227, 83, 54, 0.5)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
          maxWidth: "320px",
        }}
      >
        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Live Badge with Pulse Animation */}
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              {/* Pulsing background circle */}
              <div
                className="absolute w-3 h-3 rounded-full animate-ping"
                style={{ backgroundColor: "rgba(239, 68, 68, 0.75)" }}
              />
              {/* Solid dot */}
              <div
                className="relative w-3 h-3 rounded-full"
                style={{ backgroundColor: "#ef4444" }}
              />
            </div>
            <span
              className="text-lg font-bold tracking-wide"
              style={{ color: "#ef4444" }}
            >
              LIVE
            </span>
          </div>

          {/* Stream Title */}
          {streamStatus.title && (
            <h3
              className="text-base font-semibold line-clamp-2 leading-tight"
              style={{ color: "var(--tx)" }}
            >
              {streamStatus.title}
            </h3>
          )}

          {/* Game Name */}
          {streamStatus.game && (
            <p
              className="text-sm opacity-90"
              style={{ color: "var(--tx-2)" }}
            >
              {streamStatus.game}
            </p>
          )}

          {/* Viewer Count */}
          {streamStatus.viewerCount !== undefined && (
            <div className="flex items-center gap-2">
              {/* Eye Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "var(--accent)" }}
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span className="text-sm font-medium" style={{ color: "var(--tx)" }}>
                {streamStatus.viewerCount.toLocaleString()} watching
              </span>
            </div>
          )}

          {/* Watch Stream Button */}
          <div
            className="mt-2 text-center py-2 px-4 rounded-lg font-bold text-sm transition-all hover:scale-105"
            style={{
              backgroundColor: "var(--accent)",
              color: "#fff",
            }}
          >
            Watch Stream
          </div>
        </div>

        {/* Accent border glow effect on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: "0 0 20px rgba(227, 83, 54, 0.4)",
          }}
        />
      </div>
    </div>
  );
}
