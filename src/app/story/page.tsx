"use client";

import Navigation from "@/app/components/Navigation";
import { kalam } from "@/app/fonts";
import { Chrono } from "react-chrono";

// Timeline data structure - add your story entries here
const timelineItems = [
  {
    title: "2024 - Most Recent Chapter",
    cardTitle: "Your Latest Journey",
    cardSubtitle: "Add your date here",
    cardDetailedText: "This is where you'll add details about your most recent experiences and developments. Replace this placeholder text with your actual story content.",
  },
  {
    title: "2023 - Previous Chapter",
    cardTitle: "Another Milestone",
    cardSubtitle: "Add your date here",
    cardDetailedText: "Add details about this period in your journey. Each entry can be as detailed as you'd like.",
  },
  {
    title: "The Beginning",
    cardTitle: "Where It All Started",
    cardSubtitle: "Add your date here",
    cardDetailedText: "This is the beginning of your story. Replace with your actual origin story and early experiences.",
  },
];

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-slate-900 via-slate-800 to-slate-700">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-[70vh] pt-24 px-8 flex items-center justify-center">
        <div className="max-w-4xl w-full text-white">
          <h1 className={`text-6xl md:text-7xl font-bold mb-8 ${kalam.className}`}>
            My Journey
          </h1>

          <div className="space-y-6 text-lg md:text-xl leading-relaxed">
            {/* Main narrative paragraph */}
            <p className="text-xl md:text-2xl font-light">
              [This is your space to share the synthesized narrative of your complete journey.
              What's the overarching story that connects all the chapters of your life?]
            </p>

            {/* Key learnings section */}
            <div className="pt-4">
              <h2 className={`text-3xl font-semibold mb-4 ${kalam.className}`}>
                Key Learnings
              </h2>
              <ul className="space-y-3 pl-6">
                <li className="list-disc">
                  [Learning #1: Add a key insight from your journey]
                </li>
                <li className="list-disc">
                  [Learning #2: Add another important lesson]
                </li>
                <li className="list-disc">
                  [Learning #3: Add one more crucial takeaway]
                </li>
              </ul>
            </div>

            {/* Vision statement */}
            <div className="pt-4">
              <h2 className={`text-3xl font-semibold mb-4 ${kalam.className}`}>
                The Vision
              </h2>
              <p className="text-xl md:text-2xl font-medium italic border-l-4 border-yellow-500 pl-6 py-2">
                [What world are you working toward? What's your big vision for the future?
                This is your bold statement about the impact you want to make.]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-5xl font-bold text-white mb-12 text-center ${kalam.className}`}>
            The Timeline
          </h2>

          <div className="timeline-container">
            <Chrono
              items={timelineItems}
              mode="VERTICAL"
              cardHeight={200}
              theme={{
                primary: "#f59e0b", // yellow-500
                secondary: "#1e293b", // slate-800
                cardBgColor: "#334155", // slate-700
                titleColor: "#fff",
                titleColorActive: "#fbbf24", // yellow-400
              }}
              fontSizes={{
                cardSubtitle: "0.875rem",
                cardText: "1rem",
                cardTitle: "1.25rem",
                title: "1rem",
              }}
              slideShow={false}
              scrollable={false}
              disableClickOnCircle={true}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
