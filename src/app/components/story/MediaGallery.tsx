import Image from "next/image";

type MediaItem =
  | { type: "image"; src: string; label: string }
  | { type: "video"; src: string; label: string };

const ITEMS: MediaItem[] = [
  { type: "image", src: "/story/media/photos/rocky-ferry.jpg", label: "rocky-ferry" },
  { type: "image", src: "/story/media/photos/the-time-is-now.png", label: "the-time-is-now" },
  { type: "image", src: "/story/media/photos/love.jpg", label: "love" },
  { type: "image", src: "/story/media/photos/red-flower-left.png", label: "red-flower-left" },
  { type: "image", src: "/story/media/photos/red-flower-right.png", label: "red-flower-right" },
  { type: "image", src: "/assets/about-me.png", label: "about-me" },
  { type: "image", src: "/assets/about-me-2.png", label: "about-me-2" },
  { type: "image", src: "/assets/journal-on-rocks.png", label: "journal-on-rocks" },
  { type: "image", src: "/assets/energy-light.png", label: "energy-light" },
  { type: "image", src: "/assets/energy-dark.png", label: "energy-dark" },
  { type: "image", src: "/assets/whiteflower.png", label: "whiteflower" },
  { type: "image", src: "/assets/flippedwhiteflower.png", label: "flippedwhiteflower" },
  { type: "image", src: "/assets/red-flowers.png", label: "red-flowers" },
  { type: "image", src: "/assets/glow.png", label: "glow" },
  { type: "image", src: "/assets/merge-light.png", label: "merge-light" },
  { type: "image", src: "/assets/terra-ki-connection.png", label: "terra-ki-connection" },
  { type: "image", src: "/assets/signature.png", label: "signature" },
  { type: "image", src: "/assets/sun.png", label: "sun" },
  { type: "image", src: "/assets/3-03-26.PNG", label: "3-03-26" },
  { type: "video", src: "/demos/ki-web-demo1.mp4", label: "ki-web-demo1" },
  { type: "video", src: "/demos/ki-mobile-demo1.mp4", label: "ki-mobile-demo1" },
  { type: "video", src: "/demos/ki-mobile-demo2.mp4", label: "ki-mobile-demo2" },
];

export default function MediaGallery() {
  return (
    <div className="media-grid">
      {ITEMS.map((item) => (
        <div key={item.src} className="media-tile">
          {item.type === "image" ? (
            <div className="media-tile-frame">
              <Image
                src={item.src}
                alt={item.label}
                fill
                sizes="(min-width: 768px) 25vw, 45vw"
                className="media-tile-img"
              />
            </div>
          ) : (
            <div className="media-tile-frame">
              <video
                className="media-tile-video"
                src={item.src}
                muted
                loop
                playsInline
                autoPlay
              />
            </div>
          )}
          <span className="media-tile-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
