"use client";

import Navigation from "@/app/components/Navigation";
import { kalam, notoSans } from "@/app/fonts";
import { Chrono } from "react-chrono";
import { useTheme } from "@/app/contexts/ThemeContext";

// Timeline data structure - add your story entries here
const timelineItems = [
  {
    title: "2024 - Most Recent Chapter",
    cardTitle: "Your Latest Journey",
    cardSubtitle: "Add your date here",
    cardDetailedText:
      "This is where you'll add details about your most recent experiences and developments. Replace this placeholder text with your actual story content.",
  },
  {
    title: "2023 - Previous Chapter",
    cardTitle: "Another Milestone",
    cardSubtitle: "Add your date here",
    cardDetailedText:
      "Add details about this period in your journey. Each entry can be as detailed as you'd like.",
  },
  {
    title: "The Beginning",
    cardTitle: "Where It All Started",
    cardSubtitle: "Add your date here",
    cardDetailedText:
      "This is the beginning of your story. Replace with your actual origin story and early experiences.",
  },
];

export default function StoryPage() {
  const { theme } = useTheme();

  const chronoTheme = {
    primary: theme === "dark" ? "#D0A215" : "#AD8301", // flexoki-yellow-400 : flexoki-yellow-600
    secondary: theme === "dark" ? "#282726" : "#E6E4D9", // flexoki-base-900 : flexoki-base-100
    cardBgColor: theme === "dark" ? "#403E3C" : "#F2F0E5", // flexoki-base-800 : flexoki-base-50
    titleColor: theme === "dark" ? "#CECDC3" : "#100F0F", // flexoki-base-200 : flexoki-black
    titleColorActive: theme === "dark" ? "#D0A215" : "#AD8301", // flexoki-yellow-400 : flexoki-yellow-600
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-[70vh] pt-24 px-8 flex items-center justify-center">
        <div className="max-w-4xl w-full" style={{ color: "var(--tx)" }}>
          <h1
            className={`text-6xl md:text-7xl font-bold mb-8 mt-8 ${kalam.className}`}
          >
            My Journey
          </h1>

          <div
            className={`space-y-6 text-lg md:text-xl leading-relaxed ${notoSans.className}`}
          >
            {/* Main narrative paragraph */}
            <p className="text-xl md:text-2xl font-light">[hi there]</p>

            {/* Key learnings section */}
            <div className="pt-4">
              <h2 className={`text-3xl font-semibold mb-4 ${kalam.className}`}>
                Key Learnings
              </h2>
              <ul className="space-y-3 pl-6">
                <li className="list-disc"></li>
                <li className="list-disc"></li>
                <li className="list-disc"></li>
              </ul>
            </div>

            {/* Vision statement */}
            <div className="pt-4">
              <h2 className={`text-3xl font-semibold mb-4 ${kalam.className}`}>
                The Vision
              </h2>
              <p
                className="text-xl md:text-2xl font-medium italic border-l-4 pl-6 py-2"
                style={{ borderColor: "var(--accent)" }}
              >
                [world... hold on]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      {/* <section className="py-16 px-8"> */}
      {/* <div className="max-w-6xl mx-auto">
          <h2
            className={`text-5xl font-bold mb-12 text-center ${kalam.className}`}
            style={{ color: 'var(--tx)' }}
          >
            The Timeline
          </h2>

          <div className="timeline-container">
            <Chrono
              items={timelineItems}
              mode="VERTICAL"
              cardHeight={200}
              theme={chronoTheme}
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
        </div> */}
      {/* </section> */}
    </div>
  );
}
