"use client";

import Navigation from "@/app/components/Navigation";
import { kalam, notoSans } from "@/app/fonts";

// Toolkit items data structure - add your tools/resources here
const toolkitCategories = [
  {
    title: "Category 1",
    description: "Description of this category of tools",
    tools: [
      {
        name: "Tool Name 1",
        description:
          "Brief description of what this tool does and why you use it.",
        link: "#",
      },
      {
        name: "Tool Name 2",
        description:
          "Brief description of what this tool does and why you use it.",
        link: "#",
      },
    ],
  },
  {
    title: "Category 2",
    description: "Description of this category of tools",
    tools: [
      {
        name: "Tool Name 3",
        description:
          "Brief description of what this tool does and why you use it.",
        link: "#",
      },
      {
        name: "Tool Name 4",
        description:
          "Brief description of what this tool does and why you use it.",
        link: "#",
      },
    ],
  },
];

export default function ToolkitPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 px-8 pb-12">
        <div className="max-w-6xl mx-auto" style={{ color: "var(--tx)" }}>
          <h1
            className={`text-6xl md:text-7xl font-bold mb-6 mt-6 ${kalam.className}`}
          >
            Self Toolkit
          </h1>
          <p
            className={`text-xl md:text-2xl font-light max-w-3xl ${notoSans.className}`}
          >
            [to live in the now]
          </p>
        </div>
      </section>

      {/* Toolkit Categories */}
      {/*  */}
    </div>
  );
}
