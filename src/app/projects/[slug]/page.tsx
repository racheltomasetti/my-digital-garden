"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navigation from "@/app/components/Navigation";
import { perpetua, kalam } from "@/app/fonts";
import projectsData from "@/data/projects.json";

interface Project {
  slug: string;
  title: string;
  status: string;
  description: string;
  techStack: string[];
  lastUpdated: string;
  thumbnailUrl: string;
  isLocked: boolean;
  password: string | null;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Find the project
    const foundProject = (projectsData as Project[]).find(
      (p) => p.slug === slug
    );

    if (!foundProject) {
      router.push("/ki");
      return;
    }

    setProject(foundProject);

    // Check if locked and if user has unlocked it
    if (foundProject.isLocked) {
      const isUnlocked = sessionStorage.getItem(
        `project_unlocked_${slug}`
      );

      if (!isUnlocked) {
        router.push("/ki");
        return;
      }
    }

    setIsAuthorized(true);
  }, [slug, router]);

  if (!isAuthorized || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <p className={`text-xl ${perpetua.className}`} style={{ color: "var(--tx)" }}>
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navigation />

      {/* Main Content */}
      <div className="pt-32 px-8 pb-16 max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push("/ki#builds")}
          className={`flex items-center gap-2 mb-8 px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 ${perpetua.className}`}
          style={{
            backgroundColor: "var(--ui)",
            color: "var(--tx)",
            border: "2px solid var(--accent-2)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--accent)";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--ui)";
            e.currentTarget.style.color = "var(--tx)";
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </button>

        {/* Project Header */}
        <div className="text-center space-y-4 mb-12">
          <h1
            className={`text-4xl md:text-6xl font-bold ${perpetua.className}`}
            style={{ color: "var(--accent)" }}
          >
            {project.title}
          </h1>
          <p
            className={`text-xl md:text-2xl ${perpetua.className}`}
            style={{ color: "var(--tx-2)" }}
          >
            {project.description}
          </p>
        </div>

        <hr
          className="w-full mx-auto border-t-3 mb-12"
          style={{ borderColor: "var(--accent-2)" }}
        />

        {/* Placeholder Content Area */}
        <div className="space-y-8">
          <p
            className={`text-center text-xl ${perpetua.className}`}
            style={{ color: "var(--tx-2)" }}
          >
            Custom project content goes here...
          </p>
        </div>
      </div>
    </div>
  );
}
