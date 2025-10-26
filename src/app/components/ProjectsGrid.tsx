"use client";

import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectPasswordModal from "./ProjectPasswordModal";
import projectsData from "@/data/projects.json";

interface Project {
  slug: string;
  title: string;
  status: "active" | "archive" | "locked";
  description: string;
  techStack: string[];
  lastUpdated: string;
  thumbnailUrl: string;
  isLocked: boolean;
  password: string | null;
}

export default function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState<{
    slug: string;
    password: string;
  } | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Filter and check unlock status
    const filteredProjects = (projectsData as Project[]).map((project) => {
      // Check if project is unlocked in session
      const isUnlocked = sessionStorage.getItem(
        `project_unlocked_${project.slug}`
      );

      return {
        ...project,
        // Override locked status if unlocked in session
        status:
          project.isLocked && !isUnlocked ? "locked" : (project.status as "active" | "archive" | "locked"),
      };
    });

    setProjects(filteredProjects);
  }, []);

  const handlePasswordRequired = (slug: string, password: string) => {
    setSelectedProject({ slug, password });
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  if (projects.length === 0) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            slug={project.slug}
            title={project.title}
            status={project.status}
            description={project.description}
            techStack={project.techStack}
            lastUpdated={project.lastUpdated}
            thumbnailUrl={project.thumbnailUrl}
            isLocked={project.isLocked}
            password={project.password}
            onPasswordRequired={handlePasswordRequired}
          />
        ))}
      </div>

      {/* Password Modal */}
      {selectedProject && (
        <ProjectPasswordModal
          isOpen={!!selectedProject}
          projectSlug={selectedProject.slug}
          correctPassword={selectedProject.password}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
