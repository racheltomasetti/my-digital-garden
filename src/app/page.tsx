"use client";

import ProfileHeader from "@/app/components/profile/ProfileHeader";
import MainNav from "@/app/components/navigation/MainNav";
import LiveIndicator from "@/app/components/LiveIndicator";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      {/* Main Content Area - This will be built out as you add content */}
      <main className="w-full px-6 md:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <section className="space-y-8">
            {/* Icon at top center */}
            <div className="flex justify-center mb-8">
              <Image
                src="/icon.png"
                alt="K·I Logo"
                width={120}
                height={120}
                className="rounded-full animate-spin-continuous"
                priority
              />
            </div>

            <div className="p-2">
              <h2 className="text-4xl md:text-3xl font-bold mb-4 text-center">
                welcome to K·I
              </h2>
            </div>

            {/* Add more content sections here */}
          </section>
        </div>
      </main>
    </div>
  );
}
