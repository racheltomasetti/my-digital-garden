export const THEME_TRANSITION_MS = 800;

export const THEME_COLORS = {
  light: {
    bg: "#f6f1e6",
    text: "#1a1a1a",
    muted: "#7a756d",
    line: "#dcd6c9",
  },
  dark: {
    bg: "#1a1a1a",
    text: "#f0ede8",
    muted: "#6b6760",
    line: "#242220",
  },
} as const;

export function themeEase(progress: number): number {
  return progress < 0.5
    ? 2 * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 2) / 2;
}

export function parseCssColor(color: string): [number, number, number] {
  const hex = color.trim();
  if (hex.startsWith("#")) {
    const h = hex.replace("#", "");
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ];
  }

  const match = hex.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (match) {
    return [Number(match[1]), Number(match[2]), Number(match[3])];
  }

  return [0, 0, 0];
}

export function lerpColor(from: string, to: string, t: number): string {
  const [r1, g1, b1] = parseCssColor(from);
  const [r2, g2, b2] = parseCssColor(to);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

export function lerpHex(from: string, to: string, t: number): string {
  return lerpColor(from, to, t);
}
