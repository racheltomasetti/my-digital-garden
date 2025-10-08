"use client";

import Navigation from "@/app/components/Navigation";
import { kalam } from "@/app/fonts";

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
    <div className="min-h-screen bg-gradient-to-t from-slate-900 via-slate-800 to-slate-700">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 px-8 pb-12">
        <div className="max-w-6xl mx-auto text-white">
          <h1
            className={`text-6xl md:text-7xl font-bold mb-6 mt-6 ${kalam.className}`}
          >
            Self Toolkit
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl">
            [This is your space to share the tools, resources, frameworks, and
            practices that help you navigate your journey. What are the
            essential items in your toolkit?]
          </p>
        </div>
      </section>

      {/* Toolkit Categories */}
      <section className="px-8 pb-20">
        <div className="max-w-6xl mx-auto space-y-16">
          {toolkitCategories.map((category, idx) => (
            <div key={idx} className="space-y-6">
              <div>
                <h2
                  className={`text-4xl font-bold text-white mb-3 ${kalam.className}`}
                >
                  {category.title}
                </h2>
                <p className="text-lg text-white/80">{category.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {category.tools.map((tool, toolIdx) => (
                  <div
                    key={toolIdx}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-6 hover:bg-white/10 transition-colors border border-white/10"
                  >
                    <h3 className="text-2xl font-semibold text-white mb-3">
                      {tool.name}
                    </h3>
                    <p className="text-white/80 mb-4">{tool.description}</p>
                    {tool.link !== "#" && (
                      <a
                        href={tool.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                      >
                        Learn more →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Add more categories section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 border-dashed">
            <p className="text-white/60 text-center text-lg">
              [Add more categories of tools and resources here. Consider
              organizing by: productivity tools, learning resources, frameworks
              you use, books that influenced you, practices and habits, etc.]
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
