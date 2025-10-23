"use client";

import { useRef } from "react";
import Link from "next/link";
import Navigation from "@/app/components/Navigation";
import KiSidebar from "@/app/components/KiSidebar";
import CountdownModal from "@/app/components/CountdownModal";
import { kalam, perpetua } from "@/app/fonts";
import TextType from "@/components/TextType"; //text typing effect
import DemoShowcase from "@/app/components/DemoShowcase";

export default function KIPage() {
  const connectSectionRef = useRef<HTMLElement>(null);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Navigation />
      <KiSidebar />
      <CountdownModal />
      {/* Main Content - Push right on desktop to avoid sidebar overlap */}
      <div className="md:ml-[200px]">
        {/* KI SECTION */}
        <section
          id="ki"
          className="pt-11 px-8 pb-8 w-full mx-auto text-center"
          style={{
            borderTop: "222px solid rgba(58, 169, 159, 0.8)",
          }}
        >
          <h1
            className={`text-4xl md:text-6xl font-bold italic mb-12 ${perpetua.className}`}
            style={{ color: "var(--accent)" }}
          >
            KI
          </h1>
          <hr
            className="w-full mx-auto border-t-3 "
            style={{ borderColor: "var(--accent-2)" }}
          />
          <br />
          {/* welcome message */}
          <p
            className={`text-center text-xl ${perpetua.className}`}
            style={{ color: "var(--tx-2)" }}
          >
            Welcome to <em>a glimpse into my mind</em>.
          </p>
          <br />
          <p
            className={`text-center text-xl ${perpetua.className}`}
            style={{ color: "var(--tx-2)" }}
          >
            Here you will find living documentation as I build <em>KI</em>.
          </p>
          <br />
          <p
            className={`text-center text-3xl ${perpetua.className}`}
            style={{ color: "var(--tx-2)" }}
          >
            in the PURSUIT OF{" "}
            <strong>
              {" "}
              <em className="text-4xl">Self.</em>
            </strong>
          </p>
        </section>

        {/* Demo Showcase */}
        {/* <DemoShowcase
          projectName="KI"
          demoNumber={1}
          githubUrl="https://github.com/racheltomasetti/builder-ki"
          timestamp="October 17, 2025 ~ 1:42 AM EST"
          blurb="you can tell how badly i need sleep by the fact i said august 17, 2025 and didn't bat an eye"
          webVideoSrc="/demos/ki-web-demo1.mp4"
          mobileVideoSrc="/demos/ki-mobile-demo1.mov"
          webVideoStartTime={57}
        /> */}

        {/* BUILDS SECTION - Placeholder */}
        <section
          id="builds"
          className="py-16 px-8 w-full mx-auto"
          style={{
            borderTop: "88px solid rgba(58, 169, 159, 0.8)",
          }}
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-8 text-center ${perpetua.className}`}
            style={{ color: "var(--accent)" }}
          >
            PROJECTS
          </h2>
          <hr
            className="w-full mx-auto border-t-3"
            style={{ borderColor: "var(--accent-2)" }}
          />
          <br />
          <p
            className={`text-center text-2xl ${perpetua.className}`}
            style={{ color: "var(--tx-2)" }}
          >
            Coming soon…
          </p>
        </section>

        {/* RESOURCES SECTION - Placeholder */}
        <section
          id="resources"
          className="py-16 px-8 w-full mx-auto"
          style={{
            borderTop: "88px solid rgba(58, 169, 159, 0.8)",
          }}
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-8 text-center ${perpetua.className}`}
            style={{ color: "var(--accent)" }}
          >
            RESOURCES
          </h2>
          <hr
            className="w-full mx-auto border-t-3"
            style={{ borderColor: "var(--accent-2)" }}
          />
          <br />
          <p
            className={`text-center text-2xl ${perpetua.className}`}
            style={{ color: "var(--tx-2)" }}
          >
            Coming soon…
          </p>
        </section>

        {/* CONNECT SECTION - Call to Action */}
        <section
          id="connect"
          ref={connectSectionRef}
          className="mt-24 py-16 px-8"
          style={{
            backgroundColor: "var(--ui)",
            borderTop: "88px solid rgba(58, 169, 159, 0.8)",
          }}
        >
          <div className="max-w-2xl mx-auto text-center space-y-8">
            {/* Heading */}
            <h2
              className={`text-4xl md:text-5xl font-bold mb-8 text-center ${perpetua.className}`}
              style={{ color: "var(--accent)" }}
            >
              CONNECT
            </h2>
            <hr
              className="w-full mx-auto border-t-3"
              style={{ borderColor: "var(--accent-2)" }}
            />
            {/* Email */}
            <a
              href="mailto:build.ray.build@gmail.com"
              className={`block text-2xl md:text-3xl transition-colors ${perpetua.className}`}
              style={{ color: "var(--tx)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--tx)";
              }}
            >
              build.ray.build@gmail.com
            </a>

            {/* GitHub Link */}
            <a
              href="https://github.com/racheltomasetti"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-transform hover:scale-110"
              style={{ color: "var(--tx)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--tx)";
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <br />
            <br />
            <br />
            <p
              className={`text-3xl font-bold ${kalam.className}`}
              style={{ color: "var(--accent)" }}
            >
              <TextType
                text="don't think, BUILD..."
                textColors={["var(--accent)"]}
              />
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
