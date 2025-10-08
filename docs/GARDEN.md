# 3D Garden Landing Page - Complete Implementation Specification

## Project Overview

Build an immersive 3D garden scene as a personal website landing page using Next.js and Three.js. The garden should feel alive through ambient animations, particles, and subtle interactivity while maintaining excellent performance. Features a red lighthouse as a focal point surrounded by yellow roses and vibrant flora.

---

## Technical Stack

### Core Technologies

- **Next.js 14+** (App Router)
- **React 18+**
- **Three.js r128** (via npm)
- **TypeScript** (recommended)
- **Tailwind CSS** (for UI overlays)

### Three.js Architecture

- Custom React hook for Three.js lifecycle management
- Client-side only rendering (use dynamic imports)
- RequestAnimationFrame loop for animations
- Responsive canvas sizing

---

## Design Specifications

### Visual Style

- **Art Direction**: Low-poly, stylized nature aesthetic with maritime accent
- **Color Palette**:
  - Ground: Warm earth tones (#8B7355, #A0826D)
  - Foliage: Vibrant greens (#4A9B4F, #6BB068, #3D7C3F)
  - Sky: Gradient from light blue to soft orange/pink
  - Lighthouse: Bold red (#C41E3A) with white trim (#FFFFFF)
  - Roses: Vibrant yellow (#FFD700, #FFC720) with green stems
  - Accents: Colorful flowers (pink, purple, and yellow roses)
- **Lighting**: Soft, warm natural lighting suggesting golden hour with lighthouse beacon
- **Atmosphere**: Peaceful, whimsical, inviting with a touch of coastal charm

### Scene Composition

```
Camera Position: (8, 5, 8) looking at lighthouse/garden center
Field of View: 60 degrees
Aspect Ratio: Responsive to window
Near/Far Clipping: 0.1 / 100

Ground: 20x20 plane
Garden Elements: Distributed across ~15x15 area
Lighthouse: Central focal point at (0, 0, 0) or slightly offset
Vertical Range: 0 to 5 units (lighthouse is tallest element)
```

---

## Implementation Plan

### Phase 1: Foundation Setup

#### Step 1.1: Create Garden Component Structure

```
/app
  /components
    /garden
      Garden.tsx          # Main garden component
      useThreeSetup.ts    # Three.js initialization hook
      useAnimation.ts     # Animation loop hook
      scene/
        SceneSetup.ts     # Scene, camera, renderer setup
        Lighting.ts       # Light configuration
        Ground.ts         # Ground plane creation
        Lighthouse.ts     # Lighthouse creation
        Plants.ts         # Plant generation logic
        Particles.ts      # Particle system
      utils/
        geometries.ts     # Reusable geometry builders
        materials.ts      # Material definitions
        helpers.ts        # Math and utility functions
  page.tsx               # Landing page with dynamic import
```

#### Step 1.2: Dynamic Three.js Import

In `app/page.tsx`:

```typescript
"use client";

import dynamic from "next/dynamic";

const Garden = dynamic(() => import("@/components/garden/Garden"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-gradient-to-b from-sky-300 to-orange-200" />
  ),
});

export default function Home() {
  return <Garden />;
}
```

---

### Phase 2: Core 3D Scene

#### Step 2.1: Three.js Initialization Hook

Create `useThreeSetup.ts`:

```typescript
// Initialize scene, camera, renderer
// Set up resize listener
// Return refs for scene, camera, renderer, canvas
// Handle cleanup on unmount
```

**Key Requirements:**

- Canvas fills viewport (100vw, 100vh)
- Responsive to window resize
- Antialias enabled
- Alpha background for overlay flexibility
- Proper cleanup of event listeners

#### Step 2.2: Scene Setup

Create `scene/SceneSetup.ts`:

```typescript
// Configure scene background (gradient sky or solid color)
// Position camera at (8, 5, 8)
// Point camera at scene center (lighthouse area)
// Set up fog for depth (optional but recommended)
```

**Fog Configuration:**

- Type: Exponential (THREE.FogExp2)
- Color: Match sky color
- Density: 0.015 (subtle depth effect)

#### Step 2.3: Ground Plane

Create `scene/Ground.ts`:

```typescript
// Create 20x20 plane geometry
// Apply earth-tone material with slight texture variation
// Rotate to be horizontal
// Add subtle vertex displacement for organic feel
```

**Ground Specifications:**

- Geometry: PlaneGeometry(20, 20, 32, 32)
- Material: MeshStandardMaterial
- Color: #8B7355
- Roughness: 0.9
- Rotation: -Math.PI / 2 (lay flat)
- Receive shadows: true

#### Step 2.4: Lighting System

Create `scene/Lighting.ts`:

```typescript
// Ambient light: soft fill
// Directional light: main sun
// Point light: lighthouse beacon (animated)
// Optional: hemisphere light for sky/ground color variation
```

**Lighting Specifications:**

- **Ambient Light**:
  - Color: #ffffff
  - Intensity: 0.6
- **Directional Light**:
  - Color: #FFF5E1 (warm white)
  - Intensity: 0.8
  - Position: (5, 10, 5)
  - Cast shadows: true (optional, performance consideration)
- **Lighthouse Point Light**:
  - Color: #FFFFE0 (light yellow)
  - Intensity: 1.5
  - Position: Top of lighthouse
  - Distance: 15 (range)
  - Decay: 2
  - Animated: Rotate/pulse for beacon effect
- **Hemisphere Light** (optional):
  - Sky color: #87CEEB
  - Ground color: #8B7355
  - Intensity: 0.4

---

### Phase 3: Lighthouse Construction

#### Step 3.1: Lighthouse Geometry

Create `scene/Lighthouse.ts`:

```typescript
function createLighthouse() {
  // Main tower: CylinderGeometry or stack of cylinders
  // Base platform: CylinderGeometry (wider, shorter)
  // Light room: Small cylinder at top
  // Beacon: Glass cylinder or cone
  // Details: Railings, door, windows
  // Return group with all elements
}
```

**Lighthouse Specifications:**

- **Total Height**: 4-5 units (tallest element in scene)
- **Tower**:
  - Geometry: CylinderGeometry(0.4, 0.5, 3.5, 8) - tapered
  - Material: MeshStandardMaterial, color: #C41E3A (red)
  - Roughness: 0.6
  - Segments: 8 (low-poly octagonal)
- **Base Platform**:
  - Geometry: CylinderGeometry(0.7, 0.7, 0.3, 8)
  - Material: MeshStandardMaterial, color: #888888 (stone)
  - Position: Y = 0.15
- **White Bands** (2-3 horizontal stripes):
  - Geometry: CylinderGeometry(0.41, 0.51, 0.3, 8)
  - Material: MeshStandardMaterial, color: #FFFFFF
  - Position: Evenly spaced on tower
- **Light Room** (top):
  - Geometry: CylinderGeometry(0.5, 0.5, 0.5, 8)
  - Material: MeshStandardMaterial, color: #FFFFFF
  - Windows: Darker boxes or transparent panels
  - Position: Y = tower height + 0.25
- **Beacon**:
  - Geometry: CylinderGeometry(0.3, 0.3, 0.4, 8)
  - Material: MeshStandardMaterial
  - Color: #FFFFCC (light yellow)
  - Emissive: #FFFF00
  - Transparency: Optional for glass effect
  - Position: Top of light room
- **Door**:
  - Geometry: BoxGeometry(0.3, 0.6, 0.05)
  - Material: Dark brown (#3D2817)
  - Position: Base of tower
- **Railing** (optional detail):
  - Thin cylinders forming circular rail around light room
  - Material: Metallic look

**Position**: Place at (0, 0, 0) or slightly offset like (-2, 0, -2) to create asymmetric composition

#### Step 3.2: Lighthouse Materials

Add to `utils/materials.ts`:

```typescript
const lighthouseMaterials = {
  tower: new THREE.MeshStandardMaterial({
    color: 0xc41e3a,
    roughness: 0.6,
    flatShading: true,
  }),
  whiteBand: new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.5,
    flatShading: true,
  }),
  base: new THREE.MeshStandardMaterial({
    color: 0x888888,
    roughness: 0.9,
  }),
  lightRoom: new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.4,
  }),
  beacon: new THREE.MeshStandardMaterial({
    color: 0xffffcc,
    emissive: 0xffff00,
    emissiveIntensity: 0.5,
    roughness: 0.2,
  }),
  door: new THREE.MeshStandardMaterial({
    color: 0x3d2817,
    roughness: 0.8,
  }),
};
```

---

### Phase 4: Garden Elements

#### Step 4.1: Geometry Utilities

Create `utils/geometries.ts` with builders for:

**Tree (Simple):**

```typescript
function createTree(height: number) {
  // Trunk: CylinderGeometry (0.2 radius, height * 0.6)
  // Canopy: ConeGeometry or SphereGeometry (radius 1-1.5)
  // Return group with trunk + canopy
}
```

**Bush/Shrub:**

```typescript
function createBush(size: number) {
  // Multiple overlapping spheres (3-5)
  // Varying radii for organic look
  // Return group
}
```

**Yellow Rose:**

```typescript
function createYellowRose() {
  // Stem: thin cylinder (0.05 radius, height 0.6-0.8)
  // Leaves: 2-3 small flat boxes or ellipses
  // Petals: 8-12 small spheres in spiral/layered pattern
  // Center: tiny sphere
  // Color: #FFD700 for outer petals, #FFC720 for inner
  // Return group
}
```

**Generic Flower:**

```typescript
function createFlower(color: string) {
  // Stem: thin cylinder (0.05 radius, height 0.5)
  // Petals: 5-8 small boxes or cylinders in circular pattern
  // Center: small sphere
  // Return group
}
```

**Rock:**

```typescript
function createRock(size: number) {
  // DodecahedronGeometry or IcosahedronGeometry
  // Randomly scale vertices for irregularity
  // Return mesh
}
```

**Grass Blade:**

```typescript
function createGrassBlade() {
  // Very thin box or plane
  // Slight curve using vertex manipulation
  // Return mesh
}
```

#### Step 4.2: Material Definitions

Create `utils/materials.ts`:

```typescript
const materials = {
  treeTrunk: new THREE.MeshStandardMaterial({
    color: 0x4a3425,
    roughness: 0.9,
  }),
  treeCanopy: new THREE.MeshStandardMaterial({
    color: 0x4a9b4f,
    roughness: 0.7,
    flatShading: true, // for low-poly look
  }),
  bush: new THREE.MeshStandardMaterial({
    color: 0x6bb068,
    roughness: 0.8,
  }),
  yellowRose: {
    petal: new THREE.MeshStandardMaterial({
      color: 0xffd700,
      roughness: 0.3,
    }),
    petalInner: new THREE.MeshStandardMaterial({
      color: 0xffc720,
      roughness: 0.3,
    }),
    stem: new THREE.MeshStandardMaterial({
      color: 0x2d5016,
      roughness: 0.7,
    }),
    leaf: new THREE.MeshStandardMaterial({
      color: 0x4a9b4f,
      roughness: 0.5,
    }),
  },
  flower: (color: number) =>
    new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.4,
    }),
  rock: new THREE.MeshStandardMaterial({
    color: 0x888888,
    roughness: 1.0,
  }),
  grass: new THREE.MeshStandardMaterial({
    color: 0x3d7c3f,
    side: THREE.DoubleSide,
  }),
};
```

#### Step 4.3: Scene Population Logic

Create `scene/Plants.ts`:

```typescript
function populateGarden(scene: THREE.Scene) {
  // Place lighthouse first at chosen position
  // Define planting zones around lighthouse
  // Create "rose garden" zone near lighthouse (15-25 yellow roses)
  // Use Poisson disc sampling or random with min distance
  // Plant 5-8 trees (varying heights 2-3.5)
  // Plant 10-15 bushes (varying sizes 0.5-1.2)
  // Plant 15-20 other flowers (pink, purple - random colors, clustered)
  // Place 8-12 rocks (varying sizes 0.3-0.8)
  // Add 50-100 grass blades in patches
}
```

**Distribution Strategy:**

- **Lighthouse**: Center or slightly offset as focal point
- **Yellow Rose Garden**: Create a cluster/ring around lighthouse base
  - Radius: 2-4 units from lighthouse
  - 15-25 roses in semi-circular or full circular arrangement
  - Vary heights (0.6-0.9) and slight rotation for natural look
- **Other Elements**: Distributed in remaining space
  - Divide ground into grid cells (e.g., 2x2 units)
  - Randomly select cells for each element type
  - Add random offset within cell for natural placement
  - Avoid blocking view of lighthouse from camera angle
  - Group similar elements (flower clusters, grass patches)

---

### Phase 5: Animation & Life

#### Step 5.1: Animation Loop Hook

Create `useAnimation.ts`:

```typescript
// Set up requestAnimationFrame loop
// Track delta time for consistent animation
// Update all animated elements
// Render scene
// Return start/stop controls
```

#### Step 5.2: Lighthouse Beacon Animation

```typescript
// Rotate beacon point light around Y-axis
// Pulse emissive intensity of beacon material
// Optional: Rotate entire beacon geometry
// Create sweeping light effect
```

**Beacon Animation Parameters:**

- Rotation speed: 0.5-1.0 radians/second (one rotation every 6-12 seconds)
- Light intensity pulse: Sine wave between 1.0 and 2.0
- Emissive pulse: Sync with light intensity
- Optional beam visualization: Cone of light sweeping

#### Step 5.3: Wind/Sway Animation

Add to plant creation:

```typescript
// Store original position in userData
// Store random phase offset for each plant
// In animation loop:
//   - Calculate sway using sine wave
//   - Apply to rotation (tilt) and/or position (sway)
//   - Use different frequencies for different plant types
```

**Animation Parameters:**

- Trees: Slow sway, 0.3-0.5 Hz, rotation amplitude 0.05 radians
- Bushes: Medium sway, 0.5-0.8 Hz, rotation amplitude 0.08 radians
- Yellow Roses: Fast sway, 1.0-1.5 Hz, rotation amplitude 0.1 radians (gentle)
- Other Flowers: Fast sway, 1.0-1.5 Hz, rotation amplitude 0.1 radians
- Grass: Very fast, 1.5-2.0 Hz, rotation amplitude 0.15 radians

**Implementation Pattern:**

```typescript
const time = clock.getElapsedTime();
plant.rotation.z = Math.sin(time * frequency + phase) * amplitude;
```

#### Step 5.4: Particle System

Create `scene/Particles.ts`:

```typescript
function createParticleSystem() {
  // Butterflies: 3-5 instances
  //   - Simple geometry (2 small triangles or boxes)
  //   - Sine wave flight path around lighthouse and roses
  //   - Flapping animation (scale oscillation)
  //   - Bright colors (yellow, orange to match theme)
  // Pollen/Fireflies: 20-30 particles
  //   - Points or small spheres
  //   - Floating upward with drift
  //   - Fade in/out
  //   - Emit from flower positions (especially yellow roses)
  // Light Sparkles: 10-15 particles
  //   - Small glowing points
  //   - Spiral around lighthouse beacon
  //   - Fade in sync with beacon pulse
  // Leaves (optional): 5-10 falling leaves
  //   - Small plane geometry
  //   - Fall with rotation
  //   - Respawn at top when reaching ground
}
```

**Butterfly Movement:**

```typescript
// Figure-8 or sine wave path around lighthouse
position.x = lighthouseX + Math.sin(time * speed) * radius;
position.y = centerY + Math.sin(time * speed * 2) * 0.5;
position.z = lighthouseZ + Math.cos(time * speed) * radius;

// Wing flapping
wingScale = 1 + Math.sin(time * flapSpeed) * 0.3;
```

#### Step 5.5: Camera Animation

Add gentle camera movement:

```typescript
// Subtle orbital rotation around lighthouse (very slow)
// Or gentle float/drift
// Should be barely noticeable, not disorienting
// Keep lighthouse in view
```

**Camera Motion:**

- Slow orbit: 0.05 radians/second around Y-axis, centered on lighthouse
- OR subtle bob: Sine wave on Y position, amplitude 0.2, frequency 0.1 Hz
- Keep lookAt point on lighthouse mid-section

---

### Phase 6: Interactivity

#### Step 6.1: Raycaster Setup

```typescript
// Create raycaster and mouse vector
// Track mouse movement
// Update raycaster on mousemove
// Detect intersections with interactive objects (roses, lighthouse)
```

#### Step 6.2: Interactive Elements

Implement:

**Hover Effects:**

- Yellow roses grow slightly when hovered (scale 1.2x)
- Roses glow brighter (increase emissive or brightness)
- Lighthouse door highlights when hovered
- Smooth transition (lerp)

**Click Interactions:**

- Yellow roses bloom (petal expansion animation)
- Lighthouse beacon intensifies/speeds up temporarily
- Butterflies attracted to clicked rose
- Emit particle burst from click point

**Cursor Following (subtle):**

- Yellow roses rotate to face cursor (within limits)
- Calculate angle to mouse position
- Lerp rotation for smoothness

#### Step 6.3: Touch Support

```typescript
// Add touch event handlers
// Convert touch to mouse coordinates
// Support tap (click) and pan (drag)
```

---

### Phase 7: Polish & Performance

#### Step 7.1: Performance Optimization

**Geometry Instancing:**

```typescript
// Use InstancedMesh for repeated elements
// Yellow roses: single InstancedMesh if same geometry
// Grass blades: single InstancedMesh
// Rocks: single InstancedMesh if same geometry
// Reduces draw calls significantly
```

**Material Reuse:**

```typescript
// Share materials across similar objects
// Store in lookup object
// Clone only when variation needed
```

**Level of Detail (optional):**

```typescript
// Reduce polygon count for distant objects
// Or use distance-based culling for grass
// Lighthouse remains high detail (focal point)
```

#### Step 7.2: Loading State

```typescript
// Show progress during scene creation
// Smooth fade-in when ready
// Preload any textures (if added later)
```

#### Step 7.3: Responsive Behavior

```typescript
// Reduce particle count on mobile
// Simplify geometry on lower-end devices
// Use device detection or performance heuristics
```

**Mobile Optimizations:**

- Reduce total objects by 30-40%
- Keep lighthouse (essential focal point)
- Reduce yellow roses to 10-12
- Disable shadows
- Lower particle count to 10-15
- Use simpler geometries (lower segment counts)
- Reduce beacon animation complexity

#### Step 7.4: UI Overlay

Add content overlay:

```typescript
// Semi-transparent panel with name/bio
// Positioned using Tailwind (absolute positioning)
// Ensures text is readable over 3D scene
// Links to other pages/sections
// Maritime/garden theme for consistency
```

---

## File Structure Summary

```
/app
  /components
    /garden
      Garden.tsx                 # Main component, orchestrates everything
      useThreeSetup.ts           # Scene/camera/renderer initialization
      useAnimation.ts            # Animation loop management
      /scene
        SceneSetup.ts            # Scene configuration
        Lighting.ts              # Light setup (including beacon)
        Ground.ts                # Ground plane
        Lighthouse.ts            # Lighthouse creation and animation
        Plants.ts                # Plant population logic
        Particles.ts             # Particle systems
      /utils
        geometries.ts            # Geometry builder functions
        materials.ts             # Material definitions
        helpers.ts               # Math utilities, random generators
  page.tsx                       # Landing page with dynamic import
```

---

## Development Milestones

### Milestone 1: Static Garden with Lighthouse

- [ ] Three.js initialized and rendering
- [ ] Ground plane visible
- [ ] Lighting configured (including static lighthouse beacon)
- [ ] Red lighthouse constructed and positioned
- [ ] 15+ yellow roses arranged around lighthouse
- [ ] 5+ trees placed
- [ ] 10+ bushes placed
- [ ] 10+ other flowers placed
- [ ] Scene looks compositionally complete with lighthouse as focal point

### Milestone 2: Animated Garden

- [ ] Lighthouse beacon rotating with pulsing light
- [ ] Wind sway on all plants (including roses)
- [ ] Butterflies flying
- [ ] Particles floating (pollen from roses, light sparkles)
- [ ] Scene feels alive and magical

### Milestone 3: Interactive Garden

- [ ] Hover detection working
- [ ] Yellow roses respond to hover
- [ ] Lighthouse responds to hover
- [ ] Click interactions trigger
- [ ] Smooth transitions

### Milestone 4: Production Ready

- [ ] Performance optimized (60fps on target devices)
- [ ] Loading state implemented
- [ ] Mobile responsive
- [ ] Content overlay added
- [ ] Cross-browser tested

---

## Testing Checklist

### Visual Quality

- [ ] Scene renders without artifacts
- [ ] Lighthouse is prominent and eye-catching
- [ ] Yellow roses are vibrant and visible
- [ ] Colors are appealing and harmonious
- [ ] Lighting creates depth and atmosphere
- [ ] Beacon light effect is convincing
- [ ] Animations are smooth
- [ ] No z-fighting or clipping issues

### Performance

- [ ] 60fps on desktop (Chrome, Firefox, Safari)
- [ ] 30fps minimum on mobile
- [ ] No memory leaks (check DevTools over 5 minutes)
- [ ] Initial load under 3 seconds
- [ ] Smooth resize behavior
- [ ] Lighthouse animation doesn't impact performance

### Interactivity

- [ ] Hover detection accurate
- [ ] Yellow roses respond smoothly to hover
- [ ] Clicks register correctly
- [ ] Touch works on mobile
- [ ] No lag on interactions
- [ ] Animations complete properly

### Responsiveness

- [ ] Works on 1920x1080 desktop
- [ ] Works on 1366x768 laptop
- [ ] Works on 375x667 mobile (iPhone SE)
- [ ] Works on 414x896 mobile (iPhone 11)
- [ ] Works on tablet sizes
- [ ] Lighthouse remains focal point at all sizes

### Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari
- [ ] Mobile Chrome

---

## Code Quality Standards

### TypeScript

- Use strict mode
- Define interfaces for all complex objects
- No `any` types without justification
- Properly type Three.js objects

### React

- Use functional components
- Properly handle cleanup in useEffect
- Memoize expensive calculations
- Follow hooks rules

### Three.js

- Dispose of geometries and materials
- Remove objects from scene before disposing
- Clear event listeners
- Cancel animation frame on unmount

### Performance

- Profile before and after optimizations
- Use Chrome DevTools Performance tab
- Target 60fps as baseline
- Monitor memory usage

---

## Future Enhancements (Post-MVP)

### Phase 8: Advanced Features

- Day/night cycle with dynamic lighting and stronger beacon at night
- Seasons system (change colors, add snow)
- Weather effects (rain, coastal fog, wind gusts)
- More particle variety (seagulls, dragonflies)
- Sound design (ocean waves, ambient nature sounds, lighthouse foghorn)
- Water/ocean in background
- Lighthouse keeper character

---

## Resources & References

### Documentation

- Three.js Docs: https://threejs.org/docs/
- Next.js Docs: https://nextjs.org/docs
- MDN Canvas: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

### Learning Resources

- Three.js Journey (bruno-simon.com)
- Three.js Examples (threejs.org/examples)
- WebGL Fundamentals (webglfundamentals.org)

### Inspiration

- Low poly nature scenes
- Monument Valley (game)
- Firewatch (game art style)
- Polyworld creations
- Lighthouse architecture and maritime aesthetics

---

## Success Criteria

The garden landing page is considered successful when:

1. Loads in under 3 seconds on average connection
2. Runs at 60fps on desktop, 30fps on mobile
3. Feels alive through continuous subtle motion
4. Red lighthouse is immediately recognizable as focal point
5. Yellow roses create a vibrant, welcoming garden atmosphere
6. Lighthouse beacon animation adds magical quality
7. User spends 10+ seconds engaging with scene
8. Positive feedback on aesthetics
9. Zero console errors
10. Works across all target browsers
11. Accessible and doesn't cause motion sickness

---

## Notes for Engineer

- **Start simple**: Get the lighthouse standing before adding details
- **Lighthouse first**: Build the lighthouse as the anchor point, then arrange garden around it
- **Rose placement matters**: Experiment with rose garden layout to find most pleasing arrangement
- **Beacon effect is key**: The rotating beacon light should feel magical, not gimmicky
- **Iterate visually**: The exact positions and colors will need tweaking
- **Performance first**: Profile early and often, especially with beacon animation
- **Feel over features**: A simple scene that feels great beats a complex one that's janky
- **Test on target devices**: Don't rely only on DevTools device emulation
- **Commit often**: Each milestone should be a stable checkpoint
- **Have fun**: This is a creative project, experiment with the aesthetic!

The goal is a garden with a charming lighthouse that makes people smile when they land on your website. The yellow roses should feel like a warm welcome. Technical excellence in service of that emotional response.
