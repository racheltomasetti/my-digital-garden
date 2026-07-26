import Image from "next/image";

export default function NOW() {
  return (
    <div className="flex flex-col items-center py-3">
      <Image
        src="/story/media/photos/future-is-now.png"
        alt="The future is now"
        width={600}
        height={400}
        quality={95}
        className="rounded-md"
      />
    </div>
  );
}
