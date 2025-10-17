"use client";

import Navigation from "@/app/components/Navigation";
import { kalam, notoSans } from "@/app/fonts";

export default function MindKIPage() {
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
                Introduction to mind-ki (the digital garden)
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
            mind-ki
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
        <p
          className={`text-xl mt-4 ${notoSans.className}`}
          style={{ color: "var(--tx-2)" }}
        >
          The digital garden you&apos;re currently exploring
        </p>
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
            For years, I consumed content. I learned, I absorbed, I took in vast
            amounts of information. But I wasn&apos;t creating. I wasn&apos;t
            sharing. The knowledge stayed internal.
          </p>
          <p>
            I realized that building in public—sharing the journey, the process,
            the learnings, and the struggles—creates something far more valuable
            than any individual project. It creates connection. It creates
            accountability. It creates a body of work that reflects growth over
            time.
          </p>
          <p>
            This digital garden exists because I needed a space to share
            authentically. Not polished portfolio pieces, but the real work. The
            messy middle. The experiments. The iterations. The journey.
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
            mind-ki is a digital garden—a living space where ideas grow, evolve,
            and interconnect. It&apos;s not a blog with finished thoughts.
            It&apos;s a garden where thoughts are planted, tended, and allowed
            to develop organically over time.
          </p>
          <p className="font-bold" style={{ color: "var(--accent)" }}>
            What this space offers:
          </p>
          <ul className="space-y-2 pl-6">
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>•</span>
              <span>
                The Story: My personal journey from thinking to building
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>•</span>
              <span>
                Current Work: Real-time updates on projects in progress
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>•</span>
              <span>
                The Process: Transparent workflows showing how I build with AI
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>•</span>
              <span>
                Systems & Learnings: Frameworks and insights others can learn
                from
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>•</span>
              <span>
                Connection: A way to find like-minded builders and collaborators
              </span>
            </li>
          </ul>
          <p className="pt-4">
            This garden is meta—it&apos;s a project that documents all the other
            projects. It&apos;s the connective tissue between the work.
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
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                "Next.js 15",
                "TypeScript",
                "React",
                "Tailwind CSS",
                "Three.js",
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
              {["Claude Code", "Cursor", "ChatGPT", "v0.dev"].map((tool) => (
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

          {/* Building Process */}
          <div>
            <h3
              className={`text-2xl font-bold mb-4 ${kalam.className}`}
              style={{ color: "var(--tx)" }}
            >
              Building Process
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
                  <strong>Design & Iterate:</strong> Start with vision and
                  iterate rapidly using AI tools to explore design
                  possibilities. Use v0.dev for component prototyping, Claude
                  Code for implementation.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-bold" style={{ color: "var(--accent)" }}>
                  2.
                </span>
                <p>
                  <strong>Build Features:</strong> Implement one feature at a
                  time, testing thoroughly. Use Cursor for complex logic, Claude
                  Code for rapid iteration.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-bold" style={{ color: "var(--accent)" }}>
                  3.
                </span>
                <p>
                  <strong>Document Process:</strong> Capture decisions,
                  learnings, and workflows in real-time. Update the garden as
                  the garden itself evolves.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="font-bold" style={{ color: "var(--accent)" }}>
                  4.
                </span>
                <p>
                  <strong>Ship & Share:</strong> Deploy changes regularly. Share
                  progress on GitHub. Invite feedback and iteration from the
                  community.
                </p>
              </div>
            </div>
          </div>

          {/* Design Philosophy */}
          <div>
            <h3
              className={`text-2xl font-bold mb-4 ${kalam.className}`}
              style={{ color: "var(--tx)" }}
            >
              Design Philosophy
            </h3>
            <div
              className={`text-lg leading-relaxed space-y-4 ${notoSans.className}`}
              style={{ color: "var(--tx)" }}
            >
              <p>
                The garden embraces minimalism with personality. Clean
                typography, breathing room, and intentional color choices create
                focus. The 3D garden on the home page adds whimsy and wonder—a
                reminder that digital spaces can be playful and beautiful.
              </p>
              <p>
                Keyboard navigation (arrow keys!) makes exploration feel
                intentional. Dark/light themes honor different contexts and
                preferences. The structure is simple: Home, Story, NOW,
                Projects. Easy to navigate, hard to get lost.
              </p>
              <p>
                Every design decision asks: Does this serve the story? Does this
                help people understand the work? Does this feel authentic?
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
            What&apos;s Built:
          </p>
          <ul className="space-y-2 pl-6">
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>✓</span>
              <span>Core site structure and navigation</span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>✓</span>
              <span>3D interactive garden on home page</span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>✓</span>
              <span>Story page framework with reusable content blocks</span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>✓</span>
              <span>NOW page with projects grid and manifesto</span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>✓</span>
              <span>
                Individual project pages (builder-ki, cycle-ki, mind-ki)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>✓</span>
              <span>Dark/light theme toggle system</span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>✓</span>
              <span>Keyboard navigation (arrow keys between pages)</span>
            </li>
          </ul>

          <p className="font-bold pt-6" style={{ color: "var(--accent)" }}>
            Key Learnings:
          </p>
          <p>
            Building this garden has been deeply instructive. Every feature
            teaches something new. The 3D garden taught me Three.js basics. The
            theme system taught me CSS variables and context management. The
            keyboard navigation taught me event handling and routing logic.
          </p>
          <p>
            More importantly, building in public is transformative. It forces
            clarity. It demands intentionality. It creates accountability.
            Knowing people will see this work makes every decision more
            thoughtful.
          </p>

          <p className="font-bold pt-6" style={{ color: "var(--accent)" }}>
            What&apos;s Next:
          </p>
          <ul className="space-y-2 pl-6">
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>→</span>
              <span>Fill in Story page with actual narrative content</span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>→</span>
              <span>Add real video content to project pages</span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>→</span>
              <span>Add screenshots and demos as projects progress</span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>→</span>
              <span>Create blog/notes section for ongoing reflections</span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>→</span>
              <span>Enhance 3D garden with seasonal changes</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Meta Reflection Section */}
      <section className="px-8 py-12 max-w-4xl mx-auto">
        <div
          className="p-8 rounded-lg"
          style={{
            backgroundColor: "var(--ui)",
            borderLeft: "4px solid var(--accent)",
          }}
        >
          <p
            className={`text-2xl leading-relaxed ${kalam.className}`}
            style={{ color: "var(--tx)" }}
          >
            This page is self-referential. You&apos;re reading about the garden
            while being in the garden. That&apos;s the magic of digital
            spaces—they can reflect on themselves. They can be both the medium
            and the message.
          </p>
        </div>
      </section>

      {/* Visuals/Demos Section */}
      <section className="px-8 py-12 max-w-4xl mx-auto">
        <h2
          className={`text-4xl md:text-5xl font-bold mb-6 ${kalam.className}`}
          style={{ color: "var(--accent)" }}
        >
          The Garden in Action
        </h2>
        <div className="space-y-8">
          {/* Home Page Garden Screenshot Placeholder */}
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
              [Screenshot: 3D Interactive Garden on Home Page]
            </span>
          </div>

          {/* Theme Toggle Demo Placeholder */}
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
              [Demo: Dark/Light Theme Toggle in Action]
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
