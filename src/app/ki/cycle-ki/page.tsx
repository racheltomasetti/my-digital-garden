"use client";

import Navigation from "@/app/components/Navigation";
import { kalam, notoSans } from "@/app/fonts";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function CycleKIPage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navigation />

      {/* Video Message Section */}
      <section className="pt-24 px-8 pb-12">
        <div className="max-w-4xl mx-auto">
          <div
            className="w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: "var(--ui)", border: "2px solid var(--accent)" }}
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
                Introduction to cycle-ki
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
            cycle-ki
          </h1>
          <span
            className={`text-lg px-4 py-2 rounded-full ${notoSans.className}`}
            style={{
              backgroundColor: "var(--tx-2)",
              color: "var(--bg)",
            }}
          >
            Stage: Research
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
            This project has the deepest roots. It comes from a place of profound personal need—one
            that millions of people share but few tools adequately address.
          </p>
          <p>
            Understanding the menstrual cycle is fundamental to understanding health, mood, energy,
            and well-being. Yet most people navigate their cycles with fragmented information,
            conflicting advice, and very little personalized guidance.
          </p>
          <p>
            The pain point is real: I wanted an expert I could talk to anytime. Someone who knew
            my patterns, understood my questions, and could provide evidence-based guidance without
            judgment. That expert didn't exist.
          </p>
          <p className="font-bold" style={{ color: "var(--accent)" }}>
            So I'm building it.
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
            cycle-ki is a Menstrual Cycle Expert Assistant—a conversational AI trained on
            evidence-based research, designed to help people understand and navigate their cycles
            with confidence.
          </p>
          <p className="font-bold" style={{ color: "var(--accent)" }}>
            The Vision:
          </p>
          <ul className="space-y-2 pl-6">
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>•</span>
              <span>
                Personalized guidance based on individual cycle patterns and symptoms
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>•</span>
              <span>
                Evidence-based information sourced from medical research and expert knowledge
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>•</span>
              <span>
                A safe, non-judgmental space to ask questions and explore cycle health
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>•</span>
              <span>
                Integration with tracking tools to provide context-aware recommendations
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>•</span>
              <span>
                Educational resources that empower users to understand their bodies better
              </span>
            </li>
          </ul>
          <p className="pt-4">
            This isn't just another cycle tracker. It's an expert companion that meets you where
            you are and helps you understand the incredible complexity and wisdom of your body.
          </p>
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
              Planned Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {["Next.js", "TypeScript", "Python", "LangChain", "Vector DB", "OpenAI API"].map((tech) => (
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
              {["Claude Code", "ChatGPT", "Cursor", "Perplexity", "NotebookLM"].map((tool) => (
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

          {/* Research Process */}
          <div>
            <h3
              className={`text-2xl font-bold mb-4 ${kalam.className}`}
              style={{ color: "var(--tx)" }}
            >
              Research Process
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
                  <strong>Literature Review:</strong> Gathering evidence-based research on
                  menstrual health, hormones, cycle phases, and common conditions (PCOS,
                  endometriosis, etc.).
                </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-bold" style={{ color: "var(--accent)" }}>
                  2.
                </span>
                <p>
                  <strong>Expert Consultation:</strong> Speaking with healthcare professionals to
                  understand clinical best practices and gaps in current care.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-bold" style={{ color: "var(--accent)" }}>
                  3.
                </span>
                <p>
                  <strong>User Research:</strong> Understanding what questions people actually have,
                  what information they struggle to find, and what support they need most.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-bold" style={{ color: "var(--accent)" }}>
                  4.
                </span>
                <p>
                  <strong>AI Architecture Design:</strong> Building a conversational system that
                  can provide accurate, helpful, and compassionate responses grounded in research.
                </p>
              </div>
            </div>
          </div>

          {/* The System */}
          <div>
            <h3
              className={`text-2xl font-bold mb-4 ${kalam.className}`}
              style={{ color: "var(--tx)" }}
            >
              The Approach
            </h3>
            <div
              className={`text-lg leading-relaxed space-y-4 ${notoSans.className}`}
              style={{ color: "var(--tx)" }}
            >
              <p>
                This project requires deep respect for both the science and the lived experience.
                The AI needs to be clinically accurate while also being empathetic and accessible.
              </p>
              <p>
                I'm using RAG (Retrieval-Augmented Generation) to ground responses in verified
                medical literature. I'm using careful prompt engineering to ensure the tone is
                supportive and non-judgmental. And I'm building with privacy and safety as
                foundational principles.
              </p>
              <p>
                This is the capstone project because it brings together everything: technical
                skill, research rigor, empathy, and purpose.
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
              <span>Project scope and vision defined</span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>✓</span>
              <span>Initial research phase underway</span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>•</span>
              <span>Gathering medical literature and building knowledge base</span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>•</span>
              <span>Conducting user interviews and gathering insights</span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>•</span>
              <span>Designing conversational AI architecture</span>
            </li>
          </ul>

          <p className="font-bold pt-6" style={{ color: "var(--accent)" }}>
            Key Learnings So Far:
          </p>
          <p>
            The more I research, the more I understand how critical this tool could be. There's
            a massive gap between the information people need and what's currently accessible.
            Building this right means taking the time to do thorough research and get the
            foundation solid before rushing to code.
          </p>

          <p className="font-bold pt-6" style={{ color: "var(--accent)" }}>
            Next Steps:
          </p>
          <ul className="space-y-2 pl-6">
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>→</span>
              <span>Complete initial literature review and knowledge base</span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>→</span>
              <span>Build MVP conversational prototype</span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>→</span>
              <span>Test with small user group and iterate based on feedback</span>
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
          Research & Development
        </h2>
        <div className="space-y-8">
          {/* Research Visual Placeholder */}
          <div
            className="w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: "var(--ui)", border: "1px solid var(--accent)" }}
          >
            <span
              className={`text-xl ${notoSans.className}`}
              style={{ color: "var(--tx-2)" }}
            >
              [Visualization: Research Process & Knowledge Base Structure]
            </span>
          </div>

          {/* Prototype Placeholder */}
          <div
            className="w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: "var(--ui)", border: "1px solid var(--accent)" }}
          >
            <span
              className={`text-xl ${notoSans.className}`}
              style={{ color: "var(--tx-2)" }}
            >
              [Future: Early Prototype Screenshots]
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
