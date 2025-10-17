"use client";

import Navigation from "@/app/components/Navigation";
import { kalam, notoSans } from "@/app/fonts";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function BuilderKIPage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navigation />

      {/* Video Message Section */}
      <section className="pt-24 px-8 pb-12">
        <div className="max-w-4xl mx-auto">
          <div
            className="w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center"
            style={{
              backgroundColor: "var(--ui)",
              border: "2px solid var(--accent)",
            }}
          >
            <div className="text-center space-y-4 p-8">
              <span
                className={`text-2xl ${kalam.className}`}
                style={{ color: "var(--accent)" }}
              >
                Video Placeholder
              </span>
              <p
                className={`text-sm ${notoSans.className}`}
                style={{ color: "var(--tx-2)" }}
              >
                Introduction to builder-ki
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Title & Stage */}
      <section className="px-8 pb-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1
            className={`text-5xl md:text-7xl font-bold ${kalam.className}`}
            style={{ color: "var(--accent)" }}
          >
            builder-ki
          </h1>
          <span
            className={`text-lg px-4 py-2 rounded-full ${notoSans.className}`}
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--bg)",
            }}
          >
            Stage: Building
          </span>
        </div>
      </section>

      {/* The Why Section */}
      <section className="px-8 py-12 max-w-4xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-bold mb-6 ${kalam.className}`}
          style={{ color: "var(--accent)" }}
        >
          The Why
        </h2>
        <div
          className={`text-xl leading-relaxed space-y-4 ${notoSans.className}`}
          style={{ color: "var(--tx)" }}
        >
          <p>
            The problem was clear: I was working with AI tools to build, but I
            wasn&apos;t building with intentionality. Every session started from
            scratch. Context was lost. Learnings evaporated into the ether.
          </p>
          <p>
            I needed a system—a way to synthesize the journey, capture the
            context, and build with purpose. Not just for me, but for anyone who
            wants to build better with AI.
          </p>
          <p>
            builder-ki is the answer to that need. It&apos;s the system I wished
            I had from day one.
          </p>
        </div>
      </section>

      {/* The What Section */}
      <section className="px-8 py-12 max-w-4xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-bold mb-6 ${kalam.className}`}
          style={{ color: "var(--accent)" }}
        >
          The What
        </h2>
        <div
          className={`text-xl leading-relaxed space-y-4 ${notoSans.className}`}
          style={{ color: "var(--tx)" }}
        >
          <p>
            builder-ki is a tool that extends your learning journey. It helps
            you synthesize context from your building sessions and create
            intentional documentation that grows with your project.
          </p>
          <p className="font-bold" style={{ color: "var(--accent)" }}>
            The Vision:
          </p>
          <ul className="space-y-2 pl-6">
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>•</span>
              <span>
                Capture learnings and context in real-time as you build
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>•</span>
              <span>
                Generate living documentation that reflects your current
                understanding
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>•</span>
              <span>Build a knowledge base that compounds over time</span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>•</span>
              <span>
                Share your process so others can learn from your workflow
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* The How Section */}
      <section className="px-8 py-12 max-w-4xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-bold mb-6 ${kalam.className}`}
          style={{ color: "var(--accent)" }}
        >
          The How
        </h2>
        <div className="space-y-8">
          {/* Tech Stack */}
          <div>
            <h3
              className={`text-2xl font-bold mb-4 ${kalam.className}`}
              style={{ color: "var(--tx)" }}
            >
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                "Next.js",
                "TypeScript",
                "React",
                "Tailwind CSS",
                "OpenAI API",
              ].map((tech) => (
                <span
                  key={tech}
                  className={`px-4 py-2 rounded-lg ${notoSans.className}`}
                  style={{
                    backgroundColor: "var(--ui)",
                    color: "var(--tx)",
                    border: "1px solid var(--accent)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* AI Tools */}
          <div>
            <h3
              className={`text-2xl font-bold mb-4 ${kalam.className}`}
              style={{ color: "var(--tx)" }}
            >
              AI Tools in the Workflow
            </h3>
            <div className="flex flex-wrap gap-3">
              {["Claude Code", "ChatGPT", "Cursor", "Claude.ai"].map((tool) => (
                <span
                  key={tool}
                  className={`px-4 py-2 rounded-lg ${notoSans.className}`}
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--bg)",
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Process Flow */}
          <div>
            <h3
              className={`text-2xl font-bold mb-4 ${kalam.className}`}
              style={{ color: "var(--tx)" }}
            >
              Process Flow
            </h3>
            <div
              className={`p-6 rounded-lg space-y-4 ${notoSans.className}`}
              style={{
                backgroundColor: "var(--ui)",
                color: "var(--tx)",
              }}
            >
              <div className="flex items-start gap-4">
                <span className="font-bold" style={{ color: "var(--accent)" }}>
                  1.
                </span>
                <p>
                  <strong>Build:</strong> Work on the project using AI tools
                  (Claude Code, Cursor) to write code, solve problems, and
                  iterate on features.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-bold" style={{ color: "var(--accent)" }}>
                  2.
                </span>
                <p>
                  <strong>Capture:</strong> Document key decisions, learnings,
                  and insights in real-time using builder-ki&apos;s context
                  capture system.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-bold" style={{ color: "var(--accent)" }}>
                  3.
                </span>
                <p>
                  <strong>Synthesize:</strong> Use AI to transform raw notes
                  into structured documentation that reflects current
                  understanding.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-bold" style={{ color: "var(--accent)" }}>
                  4.
                </span>
                <p>
                  <strong>Iterate:</strong> Continuously refine and update the
                  documentation as the project evolves and understanding
                  deepens.
                </p>
              </div>
            </div>
          </div>

          {/* System & Learnings */}
          <div>
            <h3
              className={`text-2xl font-bold mb-4 ${kalam.className}`}
              style={{ color: "var(--tx)" }}
            >
              The System
            </h3>
            <div
              className={`text-lg leading-relaxed space-y-4 ${notoSans.className}`}
              style={{ color: "var(--tx)" }}
            >
              <p>
                This isn&apos;t just a tool—it&apos;s a philosophy. The system
                is about creating a feedback loop between building and learning.
                Every line of code teaches you something. Every bug reveals a
                pattern. Every feature expands your mental model.
              </p>
              <p>
                builder-ki captures all of that and transforms it into knowledge
                you can revisit, refine, and share with others who are on the
                same journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current State Section */}
      <section className="px-8 py-12 max-w-4xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-bold mb-6 ${kalam.className}`}
          style={{ color: "var(--accent)" }}
        >
          Current State
        </h2>
        <div
          className={`text-xl leading-relaxed space-y-4 ${notoSans.className}`}
          style={{ color: "var(--tx)" }}
        >
          <p className="font-bold" style={{ color: "var(--accent)" }}>
            Progress:
          </p>
          <ul className="space-y-2 pl-6">
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>✓</span>
              <span>Core architecture designed and implemented</span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>✓</span>
              <span>Context capture system in active development</span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>•</span>
              <span>AI synthesis features in testing phase</span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>•</span>
              <span>Documentation generation system being refined</span>
            </li>
          </ul>

          <p className="font-bold pt-6" style={{ color: "var(--accent)" }}>
            Key Learnings:
          </p>
          <p>
            Building builder-ki has reinforced the importance of intentional
            documentation. The best documentation isn&apos;t written after the
            fact—it grows organically as you build. This project is proof of
            concept for that philosophy.
          </p>

          <p className="font-bold pt-6" style={{ color: "var(--accent)" }}>
            Next Steps:
          </p>
          <ul className="space-y-2 pl-6">
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>→</span>
              <span>Refine the context synthesis algorithm</span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>→</span>
              <span>Add export functionality for sharing workflows</span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>→</span>
              <span>Build public demo and documentation site</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Visuals/Demos Section */}
      <section className="px-8 py-12 max-w-4xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-bold mb-6 ${kalam.className}`}
          style={{ color: "var(--accent)" }}
        >
          Visuals & Demos
        </h2>
        <div className="space-y-8">
          {/* Screenshot Placeholder 1 */}
          <div
            className="w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center"
            style={{
              backgroundColor: "var(--ui)",
              border: "1px solid var(--accent)",
            }}
          >
            <span
              className={`text-xl ${notoSans.className}`}
              style={{ color: "var(--tx-2)" }}
            >
              [Screenshot: Context Capture Interface]
            </span>
          </div>

          {/* Screenshot Placeholder 2 */}
          <div
            className="w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center"
            style={{
              backgroundColor: "var(--ui)",
              border: "1px solid var(--accent)",
            }}
          >
            <span
              className={`text-xl ${notoSans.className}`}
              style={{ color: "var(--tx-2)" }}
            >
              [Screenshot: Generated Documentation Example]
            </span>
          </div>
        </div>
      </section>

      {/* Navigation Hint */}
      <section className="px-8 py-12 max-w-4xl mx-auto text-center">
        <p
          className={`text-lg ${notoSans.className}`}
          style={{ color: "var(--tx-2)" }}
        >
          Use arrow keys to navigate between projects • Press ↑ to return to NOW
        </p>
      </section>
    </div>
  );
}
