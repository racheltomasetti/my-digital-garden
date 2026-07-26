export default function WhatIsKi() {
  return (
    <div className="space-y-6">
      {/* What Ki Does */}
      <div className="bg-[var(--bg)] rounded-lg p-6 md:p-8 space-y-4 text-center">
        <br />
        <h3 className="text-3xl text-[var(--accent)]">
          <span className="font-semibold">AI toolkit</span>{" "}
          <span className="italic text-[var(--tx)]">for the</span>
        </h3>
        <h3 className="text-4xl  italic text-[var(--accent-2)]">~ Self ~</h3>
        <br />
        <br />
        <p className="text-xl font-semibold leading-relaxed text-[var(--tx)]">
          Explore <span className="text-[var(--accent)]"></span> Create{" "}
          <span className="text-[var(--accent)] ">|</span> Connect
        </p>
        {/* Flow of Knowledge */}
        <div className="py-6 flex flex-col items-center justify-center gap-2 text-2xl">
          <br />
          <span className="text-[var(--tx-3)]">
            <span className="italic">Thoughts</span>
          </span>
          <span className="text-[var(--accent)] text-3xl">↓</span>
          <span className="text-[var(--tx-2)] italic font ">Knowledge</span>
          <span className="text-[var(--accent)] text-4xl">↓</span>
          <span className="text-[var(--tx)] italic font-semibold ">Wisdom</span>
          <br />
        </div>
        <p className="text-2xl font-bold italic text-[var(--tx)]">
          Where mind and body are one.
        </p>
        <br />
      </div>
      {/* The Goldilocks Zone */}
      <div className="bg-[var(--bg-2)] rounded-lg p-6 md:p-8 shadow-sm space-y-4 text-center">
        <h3 className="text-2xl text-[var(--accent)] mb-6 font-semibold">
          Finding the <span className="italic font-semibold">Sweet Spot</span>
        </h3>
        <p className="text-lg leading-relaxed text-[var(--tx)]">
          Two of our most powerful tools—
          <span className="italic font-bold">mind</span> and{" "}
          <span className="italic font-bold">technology</span>—hold unlimited
          potential.
        </p>
        <br />
        <p className="text-lg leading-relaxed text-[var(--tx-2)]">
          But the mind can spiral into{" "}
          <span className="italic">overthinking</span> and{" "}
          <span className="italic">disconnection</span>.
        </p>
        <p className="text-lg leading-relaxed text-[var(--tx-2)]">
          Technology can <span className="italic">fragment attention </span> and{" "}
          <span className="italic">replace human agency</span>.
        </p>
        <br />
        <p className="text-xl leading-relaxed text-[var(--tx)] italic">
          Ki lives in <span className="underline">the Goldilocks zone</span>:
        </p>
        <br />
        <p className="text-2xl leading-relaxed text-[var(--tx)] italic font-semibold">
          utilizing technology to{" "}
          <span className="text-[var(--accent)]">become superhuman.</span>
        </p>
      </div>
    </div>
  );
}
