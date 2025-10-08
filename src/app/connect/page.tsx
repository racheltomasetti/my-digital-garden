"use client";

import Navigation from "@/app/components/Navigation";

export default function ConnectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900">
      <Navigation />

      <section className="min-h-screen pt-24 px-8 flex items-center justify-center">
        <div className="max-w-4xl">
          <h1 className="text-6xl font-bold text-white mb-8">CONNECT</h1>
          {/* <div className="text-white text-xl space-y-6">
            <p>
              Let&apos;s connect! This is where you can reach out to Ray.
            </p>
            <p>
              [Placeholder content - Add your contact information, social media links,
              contact form, or preferred communication methods here]
            </p>
            <div className="mt-12 space-y-4">
              <p className="font-semibold">Some ideas for this section:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Email address</li>
                <li>Social media links (Twitter, LinkedIn, GitHub, etc.)</li>
                <li>Contact form</li>
                <li>Calendar booking link</li>
                <li>Professional bio or collaboration interests</li>
              </ul>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
}
