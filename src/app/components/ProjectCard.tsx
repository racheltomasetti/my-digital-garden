"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { perpetua, kalam } from "@/app/fonts";
import { useTheme } from "@/app/contexts/ThemeContext";

interface ProjectCardProps {
  slug: string;
  title: string;
  status: "active" | "archive" | "locked";
  description: string;
  techStack: string[];
  lastUpdated: string;
  thumbnailUrl: string;
  isLocked: boolean;
  password: string | null;
  onPasswordRequired: (slug: string, password: string) => void;
}

export default function ProjectCard({
  slug,
  title,
  status,
  description,
  techStack,
  lastUpdated,
  thumbnailUrl,
  isLocked,
  password,
  onPasswordRequired,
}: ProjectCardProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (isLocked && password) {
      onPasswordRequired(slug, password);
    } else {
      router.push(`/projects/${slug}`);
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "active":
        return "var(--accent)";
      case "archive":
        return "var(--tx-3)";
      case "locked":
        return "#ef4444";
      default:
        return "var(--tx-2)";
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${
        isHovered ? "scale-105" : "scale-100"
      }`}
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
        boxShadow: isHovered
          ? theme === "light"
            ? "0 20px 50px 0 rgba(0, 0, 0, 0.25)"
            : "0 20px 50px 0 rgba(0, 0, 0, 0.5)"
          : theme === "light"
          ? "0 8px 32px 0 rgba(0, 0, 0, 0.15)"
          : "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Lock Icon Overlay */}
      {isLocked && (
        <div className="absolute top-4 right-4 z-10">
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
            style={{ color: "#ef4444" }}
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
      )}

      {/* Thumbnail */}
      <div className="relative w-full h-48 bg-gray-300">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover"
          onError={(e) => {
            // Fallback if image doesn't exist
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title & Status */}
        <div className="flex items-start justify-between gap-2">
          <h3
            className={`text-xl font-bold ${perpetua.className}`}
            style={{ color: "var(--tx)" }}
          >
            {title}
          </h3>
          <span
            className={`text-xs font-bold uppercase px-2 py-1 rounded ${kalam.className}`}
            style={{
              color: getStatusColor(),
              backgroundColor:
                theme === "light"
                  ? "rgba(0, 0, 0, 0.05)"
                  : "rgba(255, 255, 255, 0.1)",
            }}
          >
            {status}
          </span>
        </div>

        {/* Description */}
        <p
          className={`text-sm line-clamp-1 ${perpetua.className}`}
          style={{ color: "var(--tx-2)" }}
        >
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className={`text-xs px-2 py-1 rounded ${perpetua.className}`}
              style={{
                backgroundColor:
                  theme === "light"
                    ? "rgba(0, 0, 0, 0.1)"
                    : "rgba(255, 255, 255, 0.15)",
                color: "var(--tx-2)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Last Updated */}
        <p
          className={`text-xs ${perpetua.className}`}
          style={{ color: "var(--tx-3)" }}
        >
          Last updated: {new Date(lastUpdated).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
