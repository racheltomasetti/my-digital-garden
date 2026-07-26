import MediaGallery from "./MediaGallery";
import BuilderNote from "@/app/components/ki/BuilderNote";
import WhatIsKi from "@/app/components/ki/WhatIsKi";
import AI from "@/app/components/ki/AI";
import Acknowledgements from "@/app/components/ki/Acknowledgements";

/* origin story section */

export default function OriginStory() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center py-6">
        <div className="w-full max-w-[200px] aspect-[9/16] rounded-lg overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/3EUnAy8VjAA?autoplay=1&mute=1&loop=1&playlist=3EUnAy8VjAA&controls=0"
            title="Building Me"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="text-sm italic text-[var(--tx-2)] mt-3 text-center">
          [august 27, 2022 - november 3, 2025]
        </p>
      </div>

      <MediaGallery />

      <div>
        <p className="component-tag">// BuilderNote</p>
        <BuilderNote />
      </div>

      <div>
        <p className="component-tag">// WhatIsKi</p>
        <WhatIsKi />
      </div>

      <div>
        <p className="component-tag">// AI</p>
        <AI />
      </div>

      <div>
        <p className="component-tag">// Acknowledgements</p>
        <Acknowledgements />
      </div>
    </div>
  );
}
