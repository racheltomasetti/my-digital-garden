# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**my-digital-garden** is an interactive 3D personal website built with Next.js 15 and Three.js. It features a fully-rendered mind garden with Fibonacci spiral-based plant placement, a clickable lighthouse, day/night theme transitions, and keyboard-driven navigation.

## Development Commands

### Running the Application
```bash
# Development server (uses Turbopack)
npm run dev

# Production build (uses Turbopack)
npm run build

# Start production server
npm start

# Lint
npm run lint
```

### Environment Setup
Create a `.env.local` file with Twitch API credentials for the live streaming indicator:
```
TWITCH_CLIENT_ID=your_client_id
TWITCH_CLIENT_SECRET=your_client_secret
TWITCH_USERNAME=your_username
```

## Architecture

### Three.js 3D Scene Architecture

The 3D garden scene is the core feature and follows a modular structure:

**Main Entry Point:**
- `src/app/components/garden/Garden.tsx` - Main component that orchestrates the entire 3D scene
  - Initializes Three.js renderer, scene, and camera
  - Manages theme transitions (800ms smooth color interpolation)
  - Handles animation loop with plant swaying, beacon rotation, and particle systems
  - Implements raycasting for lighthouse click detection

**Scene Objects** (`src/app/components/garden/scene/`):
- `Lighthouse.ts` - Red and white lighthouse with rotating beacon and point light
- `Plants.ts` - Fibonacci spiral placement algorithm (golden angle 137.5°)
  - 33 yellow roses in 3 rings around lighthouse
  - Trees, bushes, flowers positioned using `getSpiralPosition()` with jitter
  - Avoids blocking camera view path from (5,2.5,6) to lighthouse at (-2,0,-2)
- `Ocean.ts` - Shader-based animated ocean with wave displacement
- `Mountains.ts` - Background mountain silhouettes
- `Particles.ts` - Butterflies and pollen particles with physics-based movement

**Geometry Utilities** (`src/app/components/garden/utils/geometries.ts`):
- Factory functions for creating plant geometries (roses, trees, bushes, flowers, grass, rocks)
- Uses Three.js primitives (cylinders, cones, spheres) with `flatShading` for stylized look

### Theme System

**Context-Based Theme Management:**
- `src/app/contexts/ThemeContext.tsx` - Global theme state ("dark" | "light")
  - Persists to localStorage
  - Keyboard shortcuts: D/L toggles theme, Arrow keys navigate pages
  - Applies theme class to `<html>` element for CSS variables

**Theme Transitions:**
- All theme changes animate over 800ms using custom easing function
- Interpolates: sky colors, ground color, lights (ambient, directional, beacon), star opacity, ocean colors, plant brightness
- Sky gradient uses custom ShaderMaterial with three color uniforms (top, horizon, bottom)

### Page Structure (Next.js App Router)

**Pages:**
- `/` (Home) - 3D garden scene (`src/app/page.tsx`)
- `/ki` - "Now" page showing current projects (`src/app/ki/page.tsx`)

**Layout:**
- `src/app/layout.tsx` - Root layout with ThemeProvider and WelcomeModal
  - Inline script prevents flash of unstyled content (FOUC) by reading localStorage theme before hydration
  - Uses Caveat font from Google Fonts

### API Routes

- `src/app/api/stream-status/route.ts` - Twitch API integration
  - Checks if user is live streaming
  - Implements 60-second cache and OAuth token management
  - Returns `{ isLive, title, game, viewerCount, thumbnailUrl, username }`

### Component Organization

**UI Components:**
- `src/app/components/Navigation.tsx` - Page navigation with keyboard hints
- `src/app/components/MissionModal.tsx` - Modal triggered by clicking lighthouse
- `src/app/components/WelcomeModal.tsx` - First-visit modal
- `src/app/components/LiveIndicator.tsx` - Twitch live status indicator
- `src/app/components/DemoShowcase.tsx` - Project showcase component

**Legacy Components** (`src/components/`):
- ProfileCard, TextType - Older components, may be unused or for specific pages

### Styling

**Flexoki Color System:**
- Custom CSS variables in `src/app/globals.css` define dual-theme Flexoki palette
- Variables: `--bg`, `--bg-2`, `--tx`, `--tx-2`, `--tx-3`, `--ui`, `--ui-2`, `--ui-3`, `--accent`, `--accent-2`
- Tailwind CSS 4 with PostCSS (`@tailwindcss` import)
- Namespaced styles in `src/app/styles/namespaced.css`

### Key Technical Details

**Three.js Scene Setup:**
- Camera: PerspectiveCamera at (5, 2.5, 6) looking at (0, 1, 0)
- Ground: 50x50 plane rotated to horizontal
- Sky: Large inverted sphere (radius 50) with custom gradient shader
- Stars: 3,333 points distributed across upper hemisphere using spherical coordinates
- Lights: Ambient, directional, and animated beacon point light

**Animation Loop:**
- Plant swaying: Different frequencies per plant type (grass fastest, trees slowest)
- Beacon: Rotates at 0.5 rad/s, emissive intensity pulses
- Beacon light: Sweeps in circle, intensity flashes
- Ocean waves: Time-based vertex shader displacement
- Butterflies: Sinusoidal flight paths
- Pollen: Drift physics with deltaTime

**Fibonacci Spiral Placement:**
- Golden angle: 2.399 radians (≈137.5°)
- Spiral starts at radius 4.9 from lighthouse center
- Each index: `radius = START_RADIUS + scalingConstant * sqrt(index)`
- Jitter applied for organic look
- Collision detection with `minDistance` parameter

**Performance Optimizations:**
- Garden component uses `dynamic` import with `ssr: false` (client-side only)
- Plant types pre-calculated via bounding box in useEffect (not in animation loop)
- Renderer pixel ratio capped at 2
- Zoom/pinch gestures prevented

## Common Patterns

**Adding New Scene Objects:**
1. Create factory function in `src/app/components/garden/scene/` (e.g., `createNewObject()`)
2. Return a `THREE.Group` or `THREE.Mesh`
3. Import and call in `Garden.tsx` useEffect
4. Add to scene: `scene.add(newObject)`
5. Store reference in `sceneRefs.current` if theme transitions needed

**Making Objects Clickable:**
1. Set `object.userData.clickable = true` on the object or parent group
2. Raycaster in `Garden.tsx` handleClick will detect clicks
3. Traverse parent chain to find clickable ancestor

**Theme Transition Support:**
1. Store object reference in `sceneRefs.current` during scene setup
2. In theme transition useEffect, define start and target values
3. Lerp colors/values over 800ms duration using custom easing
4. Use `lerpColors()` for THREE.Color interpolation

## File Paths & Aliases

- `@/*` resolves to `./src/*` (configured in `tsconfig.json`)
- Three.js scene files: `src/app/components/garden/scene/`
- Global styles: `src/app/globals.css`
- Fonts: `src/app/fonts/`

## Notes

- The project uses Turbopack (Next.js 15 default) for faster builds
- All Three.js code is client-side only (no SSR)
- Theme state initializes on client to avoid hydration mismatch
- Keyboard navigation is global via ThemeContext event listeners (prevents conflicts with input fields)
