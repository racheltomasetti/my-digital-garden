"use client";

import Navigation from "@/app/components/Navigation";
import { kalam, notoSans } from "@/app/fonts";
import TextType from "@/components/TextType";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function StoryPage() {
  const { theme } = useTheme();
  const textColors = [theme === "dark" ? "#d3c6aa" : "#575279"];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navigation />

      {/* Hero Section with TextType */}
      <section className="pt-30 px-8 pb-12">
        <h1>
          <TextType
            text={[
              "the journey begins...",
              "this is my story.",
              "a story of building, breaking, and becoming.",
            ]}
            typingSpeed={60}
            pauseDuration={1800}
            showCursor={true}
            cursorCharacter="|"
            textColors={textColors}
            className={`text-5xl md:text-6xl font-bold text-center ${kalam.className}`}
          />
        </h1>
      </section>

      {/* Story Container */}
      <div className="max-w-4xl mx-auto px-8 pb-24 space-y-24">
        {/* REUSABLE BLOCK 1: Simple Text Narrative */}
        <article className="space-y-6">
          <h2
            className={`text-4xl font-bold ${kalam.className}`}
            style={{ color: "var(--accent)" }}
          >
            Chapter One: The Beginning
          </h2>
          <div
            className={`text-lg leading-relaxed space-y-4 ${notoSans.className}`}
            style={{ color: "var(--tx)" }}
          >
            <p>
              [Replace with your story: This is where you share the raw,
              unfiltered beginning. The moment you realized you needed to build
              something. The struggle to be heard, to be seen.]
            </p>
            <p>
              [Continue the narrative here. Multiple paragraphs work well for
              deep storytelling. Share the emotions, the context, the why.]
            </p>
          </div>
        </article>

        {/* REUSABLE BLOCK 2: Quote/Emphasis Block */}
        <article className="space-y-6">
          <blockquote
            className="border-l-4 pl-6 py-4 italic"
            style={{
              borderColor: "var(--accent)",
              color: "var(--tx-2)",
            }}
          >
            <p className={`text-2xl ${kalam.className}`}>
              &ldquo;This is a space for pull quotes, important realizations, or key
              moments that deserve emphasis.&rdquo;
            </p>
          </blockquote>
        </article>

        {/* REUSABLE BLOCK 3: Image + Caption */}
        <article className="space-y-6">
          <div
            className="w-full aspect-video rounded-lg overflow-hidden"
            style={{ backgroundColor: "var(--ui)" }}
          >
            {/* Placeholder for image */}
            <div className="w-full h-full flex items-center justify-center">
              <span
                className={`text-xl ${notoSans.className}`}
                style={{ color: "var(--tx-2)" }}
              >
                [Image placeholder: Screenshot, photo, or visual element]
              </span>
            </div>
          </div>
          <p
            className={`text-sm text-center italic ${notoSans.className}`}
            style={{ color: "var(--tx-2)" }}
          >
            Caption for the image above. Context, date, significance.
          </p>
        </article>

        {/* REUSABLE BLOCK 4: Two-Column Text (Before/After, Then/Now) */}
        <article className="space-y-6">
          <h2
            className={`text-4xl font-bold ${kalam.className}`}
            style={{ color: "var(--accent)" }}
          >
            The Shift
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="p-6 rounded-lg"
              style={{ backgroundColor: "var(--ui)" }}
            >
              <h3
                className={`text-2xl font-bold mb-4 ${kalam.className}`}
                style={{ color: "var(--tx)" }}
              >
                Before
              </h3>
              <p
                className={`${notoSans.className}`}
                style={{ color: "var(--tx)" }}
              >
                [Describe the before state. The struggle, the confusion, the old
                way of being.]
              </p>
            </div>
            <div
              className="p-6 rounded-lg"
              style={{ backgroundColor: "var(--ui)" }}
            >
              <h3
                className={`text-2xl font-bold mb-4 ${kalam.className}`}
                style={{ color: "var(--tx)" }}
              >
                After
              </h3>
              <p
                className={`${notoSans.className}`}
                style={{ color: "var(--tx)" }}
              >
                [Describe the after state. The clarity, the decision, the new
                path forward.]
              </p>
            </div>
          </div>
        </article>

        {/* REUSABLE BLOCK 5: Timeline Entry */}
        <article className="space-y-6">
          <div className="flex items-start gap-6">
            <div
              className="flex-shrink-0 w-24 text-right"
              style={{ color: "var(--accent)" }}
            >
              <p className={`text-xl font-bold ${kalam.className}`}>2024</p>
              <p className={`text-sm ${notoSans.className}`}>December</p>
            </div>
            <div className="flex-1">
              <h3
                className={`text-2xl font-bold mb-3 ${kalam.className}`}
                style={{ color: "var(--tx)" }}
              >
                Milestone Title
              </h3>
              <p
                className={`${notoSans.className}`}
                style={{ color: "var(--tx)" }}
              >
                [Describe what happened at this point in time. Major decisions,
                breakthroughs, challenges overcome.]
              </p>
            </div>
          </div>
        </article>

        {/* REUSABLE BLOCK 6: List/Bullet Points */}
        <article className="space-y-6">
          <h2
            className={`text-4xl font-bold ${kalam.className}`}
            style={{ color: "var(--accent)" }}
          >
            Key Learnings
          </h2>
          <ul
            className={`space-y-3 ${notoSans.className}`}
            style={{ color: "var(--tx)" }}
          >
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>•</span>
              <span>
                [Learning or insight #1: Something you discovered along the
                way.]
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>•</span>
              <span>
                [Learning or insight #2: A principle that guides your work.]
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }}>•</span>
              <span>
                [Learning or insight #3: What you&apos;d tell your past self.]
              </span>
            </li>
          </ul>
        </article>

        {/* REUSABLE BLOCK 7: Code/Technical Snippet (Optional) */}
        <article className="space-y-6">
          <h2
            className={`text-4xl font-bold ${kalam.className}`}
            style={{ color: "var(--accent)" }}
          >
            Technical Breakthrough
          </h2>
          <div
            className="p-6 rounded-lg font-mono text-sm overflow-x-auto"
            style={{
              backgroundColor: "var(--ui)",
              color: "var(--tx)",
            }}
          >
            <pre>{`// Optional: Share code snippets or technical moments
function breakthrough() {
  return "the moment everything clicked";
}`}</pre>
          </div>
          <p
            className={`text-sm ${notoSans.className}`}
            style={{ color: "var(--tx-2)" }}
          >
            [Context for the code: Why this mattered, what it solved.]
          </p>
        </article>

        {/* REUSABLE BLOCK 8: Pull Section (Highlight/Callout) */}
        <article className="space-y-6">
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
              [This is a callout section for important realizations, pivotal
              moments, or emotional beats that deserve special attention.]
            </p>
          </div>
        </article>

        {/* REUSABLE BLOCK 9: Simple Text Narrative (Continued) */}
        <article className="space-y-6">
          <h2
            className={`text-4xl font-bold ${kalam.className}`}
            style={{ color: "var(--accent)" }}
          >
            Where I Am Now
          </h2>
          <div
            className={`text-lg leading-relaxed space-y-4 ${notoSans.className}`}
            style={{ color: "var(--tx)" }}
          >
            <p>
              [The current state of your journey. What you&apos;re building, why it
              matters, how it feels to finally be doing this work.]
            </p>
            <p>
              [The ongoing chapter. The work that still needs to be done. The
              excitement about what&apos;s next.]
            </p>
          </div>
        </article>

        {/* Final Section: Looking Forward */}
        <article className="space-y-6 text-center">
          <h2
            className={`text-4xl font-bold ${kalam.className}`}
            style={{ color: "var(--accent)" }}
          >
            The Journey Continues
          </h2>
          <p
            className={`text-xl ${notoSans.className}`}
            style={{ color: "var(--tx-2)" }}
          >
            [This story isn&apos;t finished. It&apos;s being written, one day at a time.]
          </p>
        </article>
      </div>
    </div>
  );
}
