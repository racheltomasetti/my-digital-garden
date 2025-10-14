{
/_ Builder's Profile Card _/
}

<section className="px-8 py-16 max-w-3xl mx-auto">
  <div
    className="rounded-2xl border-4 p-8 md:p-12 relative overflow-hidden"
    style={{
      backgroundColor: "var(--ui)",
      borderColor: "var(--accent)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    }}
  >
    {/* Card Header */}
    <div className="text-center mb-8">
      <div
        className={`text-sm uppercase tracking-widest mb-2 ${notoSans.className}`}
        style={{ color: "var(--tx-2)" }}
      >
        Builder Card #001
      </div>
      <h2
        className={`text-5xl md:text-6xl font-bold ${kalam.className}`}
        style={{ color: "var(--accent)" }}
      >
        Master Builder
      </h2>
    </div>

    {/* Stats Grid */}
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      {/* Current Streak */}
      <div
        className="p-6 rounded-lg border-2"
        style={{
          backgroundColor: "var(--bg)",
          borderColor: "var(--accent)",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-sm uppercase tracking-wide ${notoSans.className}`}
            style={{ color: "var(--tx-2)" }}
          >
            Current Streak
          </span>
          <span style={{ color: "var(--accent)" }}>🔥</span>
        </div>
        <div
          className={`text-4xl font-bold ${kalam.className}`}
          style={{ color: "var(--tx)" }}
        >
          5 days
        </div>
        <div
          className={`text-xs mt-1 ${notoSans.className}`}
          style={{ color: "var(--tx-2)" }}
        >
          Record: 18 days
        </div>
      </div>

      {/* Active Projects */}
      <div
        className="p-6 rounded-lg border-2"
        style={{
          backgroundColor: "var(--bg)",
          borderColor: "var(--accent)",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-sm uppercase tracking-wide ${notoSans.className}`}
            style={{ color: "var(--tx-2)" }}
          >
            Active Projects
          </span>
          <span style={{ color: "var(--accent)" }}>⚡</span>
        </div>
        <div
          className={`text-4xl font-bold ${kalam.className}`}
          style={{ color: "var(--tx)" }}
        >
          3
        </div>
        <div
          className={`text-xs mt-1 ${notoSans.className}`}
          style={{ color: "var(--tx-2)" }}
        >
          All in motion
        </div>
      </div>
    </div>

    {/* Current Quest */}
    <div
      className="p-6 rounded-lg border-2 mb-6"
      style={{
        backgroundColor: "var(--bg)",
        borderColor: "var(--accent)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color: "var(--accent)" }}>✨</span>
        <span
          className={`text-sm uppercase tracking-wide ${notoSans.className}`}
          style={{ color: "var(--tx-2)" }}
        >
          Current Quest
        </span>
      </div>
      <div
        className={`text-2xl md:text-3xl font-bold leading-tight ${kalam.className}`}
        style={{ color: "var(--tx)" }}
      >
        To unlock the mind and connect back to Self
      </div>
    </div>

    {/* Tools Arsenal */}
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <span style={{ color: "var(--accent)" }}>🛠️</span>
        <span
          className={`text-sm uppercase tracking-wide ${notoSans.className}`}
          style={{ color: "var(--tx-2)" }}
        >
          Tools Arsenal
        </span>
      </div>
      <div className="flex flex-wrap gap-3">
        {[
          "Claude Code",
          "Cursor",
          "ChatGPT",
          "v0.dev",
          "Next.js",
          "TypeScript",
        ].map((tool) => (
          <span
            key={tool}
            className={`px-4 py-2 rounded-lg text-sm ${notoSans.className}`}
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--bg)",
            }}
          >
            {tool}
          </span>
        ))}
      </div>
    </div>

    {/* Tagline */}
    <div
      className="text-center pt-6 border-t-2"
      style={{ borderColor: "var(--accent)" }}
    >
      <p
        className={`text-xl md:text-2xl italic ${kalam.className}`}
        style={{ color: "var(--accent)" }}
      >
        "I can build whatever the fuck I want"
      </p>
    </div>

  </div>
</section>;
