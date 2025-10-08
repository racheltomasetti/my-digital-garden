# Garden Layout Enhancement Request

## Current State

The garden uses random positioning with distance-based collision detection. Plants are placed randomly within bounds, avoiding the lighthouse and each other.

## Desired State

Implement a Fibonacci spiral (golden spiral) pattern for plant placement while maintaining some randomness. The lighthouse at position (-2, 0, -2) should be the center/origin of the spiral.

## Requirements

1. **Fibonacci/Golden Spiral Pattern:**

   - Use golden angle (≈137.5° or 2.399 radians) for plant angular distribution
   - Plants should follow a spiral pattern radiating from the lighthouse
   - Distance from center should increase following Fibonacci sequence or golden ratio

2. **Maintain Randomness:**

   - Keep some random variation in positioning (jitter/offset from exact spiral points)
   - This creates a natural, organic look while maintaining the underlying spiral structure
   - Suggested jitter: ±0.2 to ±0.5 units from calculated spiral position

3. **Plant-Specific Behavior:**

   - **Yellow Roses:** Maintain current close clustering around lighthouse (innermost spiral rings)
   - **Trees:** Place on outer spiral rings, still avoiding camera view path
   - **Bushes:** Middle rings of spiral
   - **Flowers:** Distributed throughout spiral with more density in middle rings
   - **Rocks:** Scattered along spiral
   - **Grass:** Maintain current patch-based approach or adapt to spiral pattern

4. **Technical Implementation:**

   - Calculate spiral positions using:
     - Golden angle for rotation: `θ = i × 137.5° (or 2.399 radians)`
     - Distance from center: `r = c × sqrt(i)` where i is the plant index and c is a scaling constant
   - Add random jitter to each calculated position
   - Maintain existing collision detection to prevent overlapping
   - Keep lighthouse at center: (-2, 0, -2)

5. **Visual Result:**
   - Should create subtle synchronicity and visual flow
   - Pattern should be noticeable but not overly geometric
   - Natural, organic appearance maintained through randomness
   - Creates sense of intentional design radiating from lighthouse

## Keep Unchanged

- Lighthouse position and rose garden around it
- Camera view path blocking logic for trees
- Minimum distance constraints between plants
- Plant variety and counts (or similar)
- Rock rotations and grass blade implementations
