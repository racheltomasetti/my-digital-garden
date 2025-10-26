"use client";

import ProfileHeader from "@/app/components/profile/ProfileHeader";
import MainNav from "@/app/components/navigation/MainNav";
import LiveIndicator from "@/app/components/LiveIndicator";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      {/* Live Indicator */}
      <LiveIndicator />

      {/* Profile Header */}
      <ProfileHeader />

      {/* Main Navigation */}
      <MainNav />

      {/* Main Content Area - This will be built out as you add content */}
      <main className="w-full px-6 md:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <section className="space-y-8">
            {/* Placeholder content - replace with your actual content structure */}
            <div className="p-8 border-2 border-current rounded-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Welcome to My Mind Hub
              </h2>
              <p className="text-lg opacity-80">
                This is your personal profile and exploration space. Content
                areas will be added here as you build them out.
              </p>
            </div>

            {/* Add more content sections here */}
          </section>
        </div>
      </main>
    </div>
  );
}
