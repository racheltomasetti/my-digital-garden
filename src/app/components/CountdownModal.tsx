"use client";

import { useEffect, useState } from "react";
import { kalam } from "@/app/fonts";
import { useTheme } from "@/app/contexts/ThemeContext";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownModal() {
  const { theme } = useTheme();
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      // Target: October 29, 2025, 7:00 PM EST
      // EST is UTC-5, so 7:00 PM EST = 12:00 AM UTC (next day)
      const targetDate = new Date("2025-10-30T00:00:00Z"); // Oct 29, 7 PM EST in UTC
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsExpired(true);
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    // Initial calculation
    calculateTimeRemaining();

    // Update every second
    const interval = setInterval(calculateTimeRemaining, 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed top-20 right-4 md:top-24 md:right-6 z-[1000] transition-all duration-500 ease-out`}
    >
      {/* Glassmorphism Card */}
      <div
        className={`
          relative overflow-hidden rounded-2xl
          transition-all duration-300 ease-out
          ${kalam.className}
          ${isExpired ? "animate-pulse" : ""}
        `}
        style={{
          background: theme === "light" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: theme === "light" ? "2px solid rgba(0, 0, 0, 0.15)" : "2px solid rgba(255, 255, 255, 0.1)",
          boxShadow: theme === "light" ? "0 8px 32px 0 rgba(0, 0, 0, 0.15)" : "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
          minWidth: "280px",
        }}
      >
        {/* Countdown Content */}
        <div className="p-3">
          <div className="flex items-center justify-center gap-3 text-center">
            <span
              className="text-2xl font-bold tabular-nums"
              style={{ color: "var(--tx)" }}
            >
              {timeRemaining.days}
            </span>
            <span
              className="text-sm opacity-70"
              style={{ color: "var(--tx-2)" }}
            >
              {timeRemaining.days === 1 ? "day" : "days"}
            </span>

            <span
              className="text-2xl font-bold tabular-nums"
              style={{ color: "var(--tx)" }}
            >
              {timeRemaining.hours}
            </span>
            <span
              className="text-sm opacity-70"
              style={{ color: "var(--tx-2)" }}
            >
              {timeRemaining.hours === 1 ? "hour" : "hours"}
            </span>

            <span
              className="text-2xl font-bold tabular-nums"
              style={{ color: "var(--tx)" }}
            >
              {timeRemaining.minutes}
            </span>
            <span
              className="text-sm opacity-70"
              style={{ color: "var(--tx-2)" }}
            >
              {timeRemaining.minutes === 1 ? "minute" : "minutes"}
            </span>

            <span
              className="text-2xl font-bold tabular-nums"
              style={{ color: "var(--tx)" }}
            >
              {timeRemaining.seconds}
            </span>
            <span
              className="text-sm opacity-70"
              style={{ color: "var(--tx-2)" }}
            >
              {timeRemaining.seconds === 1 ? "second" : "seconds"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
