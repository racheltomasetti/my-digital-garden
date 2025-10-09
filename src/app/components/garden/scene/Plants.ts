import * as THREE from "three";
import {
  createYellowRose,
  createTree,
  createBush,
  createFlower,
  createRock,
  createGrassBlade,
} from "../utils/geometries";

// Helper function to check if position is too close to lighthouse or other plants
function isValidPosition(
  x: number,
  z: number,
  minDistance: number,
  existingPositions: { x: number; z: number }[],
  blockViewPath: boolean = false
): boolean {
  // Check distance from lighthouse at (-2, -2)
  const distToLighthouse = Math.sqrt((x + 2) ** 2 + (z + 2) ** 2);
  if (distToLighthouse < 1.5) return false; // Don't place too close to lighthouse

  // Block view path between camera (5, 1.6, 6) and lighthouse (-2, 0, -2)
  if (blockViewPath) {
    // Camera is at (5, 6) in XZ plane, lighthouse at (-2, -2)
    // Check if position is in the path - use a cone/frustum from camera to lighthouse
    const cameraX = 5, cameraZ = 6;
    const lighthouseX = -2, lighthouseZ = -2;

    // Vector from camera to lighthouse
    const viewDirX = lighthouseX - cameraX;
    const viewDirZ = lighthouseZ - cameraZ;
    const viewLength = Math.sqrt(viewDirX ** 2 + viewDirZ ** 2);

    // Vector from camera to point
    const pointDirX = x - cameraX;
    const pointDirZ = z - cameraZ;
    const pointDist = Math.sqrt(pointDirX ** 2 + pointDirZ ** 2);

    // Dot product to find projection
    const dot = (pointDirX * viewDirX + pointDirZ * viewDirZ) / (viewLength * pointDist);

    // If point is in front of camera (dot > 0) and within cone
    if (dot > 0.7 && pointDist < viewLength) {
      // Point is roughly in the view path - reject it
      return false;
    }
  }

  // Check distance from existing plants
  for (const pos of existingPositions) {
    const dist = Math.sqrt((x - pos.x) ** 2 + (z - pos.z) ** 2);
    if (dist < minDistance) return false;
  }

  return true;
}

// Random position within bounds
function getRandomPosition(
  minX: number,
  maxX: number,
  minZ: number,
  maxZ: number,
  minDistance: number,
  existingPositions: { x: number; z: number }[],
  blockViewPath: boolean = false
): { x: number; z: number } | null {
  let attempts = 0;
  while (attempts < 50) {
    const x = minX + Math.random() * (maxX - minX);
    const z = minZ + Math.random() * (maxZ - minZ);
    if (isValidPosition(x, z, minDistance, existingPositions, blockViewPath)) {
      return { x, z };
    }
    attempts++;
  }
  return null;
}

// Fibonacci spiral position generator
const GOLDEN_ANGLE = 2.399; // ≈137.5° in radians
const LIGHTHOUSE_X = -2;
const LIGHTHOUSE_Z = -2;
const SPIRAL_START_RADIUS = 5.1;

function getSpiralPosition(
  index: number,
  scalingConstant: number,
  minDistance: number,
  existingPositions: { x: number; z: number }[],
  jitterAmount: number = 0.4,
  blockViewPath: boolean = false
): { x: number; z: number } | null {
  // Calculate base spiral position
  const angle = index * GOLDEN_ANGLE;
  const radius = SPIRAL_START_RADIUS + scalingConstant * Math.sqrt(index);

  // Add random jitter for organic feel
  const jitterX = (Math.random() - 0.5) * jitterAmount;
  const jitterZ = (Math.random() - 0.5) * jitterAmount;

  const x = LIGHTHOUSE_X + Math.cos(angle) * radius + jitterX;
  const z = LIGHTHOUSE_Z + Math.sin(angle) * radius + jitterZ;

  // Check bounds
  if (x < -12 || x > 12 || z < -12 || z > 12) {
    return null;
  }

  // Check if position is valid
  if (isValidPosition(x, z, minDistance, existingPositions, blockViewPath)) {
    return { x, z };
  }

  return null;
}

export function populateGarden(scene: THREE.Scene): THREE.Object3D[] {
  const plants: THREE.Object3D[] = [];
  const positions: { x: number; z: number }[] = [];

  // Yellow Rose Garden - three rings around lighthouse
  const rosesPerRing = 11;
  const lighthouseX = -2;
  const lighthouseZ = -2;
  const roseRadii = [2.2, 2.9, 3.6]; // Three rings

  for (let ring = 0; ring < roseRadii.length; ring++) {
    const radius = roseRadii[ring];
    const angleOffset = ring * 0.3; // Offset each ring slightly

    for (let i = 0; i < rosesPerRing; i++) {
      const rose = createYellowRose();

      const angle = (i * Math.PI * 2) / rosesPerRing + angleOffset;
      const x = lighthouseX + Math.cos(angle) * radius + (Math.random() - 0.5) * 0.2;
      const z = lighthouseZ + Math.sin(angle) * radius + (Math.random() - 0.5) * 0.2;

      rose.position.set(x, 0, z);
      rose.rotation.y = Math.random() * Math.PI * 2;
      rose.scale.set(1, 0.9 + Math.random() * 0.2, 1); // Vary height slightly

      scene.add(rose);
      plants.push(rose);
      positions.push({ x, z });
    }
  }

  // Now place plants in spiral pattern (bushes, trees, rocks)
  // Using a shared spiral index counter for natural distribution
  let spiralIndex = 0;

  // Bushes scattered throughout spiral (all ranges) - place some before and after trees
  const totalBushCount = 21;
  const bushesBeforeTrees = Math.floor(totalBushCount * 0.6); // 60% before trees
  const bushesAfterTrees = totalBushCount - bushesBeforeTrees; // 40% after trees

  let bushesPlaced = 0;
  let bushSpiralIndex = 0;

  // Place first batch of bushes
  while (bushesPlaced < bushesBeforeTrees && bushSpiralIndex < 500) {
    const pos = getSpiralPosition(bushSpiralIndex, 0.35, 0.8, positions);
    bushSpiralIndex++;

    if (pos) {
      const size = 0.5 + Math.random() * 0.7;
      const bush = createBush(size);
      bush.position.set(pos.x, 0, pos.z);
      scene.add(bush);
      plants.push(bush);
      positions.push(pos);
      bushesPlaced++;
    }
  }

  // Trees on outer rings (avoiding camera view path)
  const treeCount = 18;
  let treesPlaced = 0;
  while (treesPlaced < treeCount && spiralIndex < 500) {
    const pos = getSpiralPosition(spiralIndex, 0.4, 1.5, positions, 0.4, true);
    spiralIndex++;

    if (pos) {
      const height = 2.0 + Math.random() * 1.5;
      const tree = createTree(height);
      tree.position.set(pos.x, 0, pos.z);
      tree.rotation.y = Math.random() * Math.PI * 2;
      scene.add(tree);
      plants.push(tree);
      positions.push(pos);
      treesPlaced++;
    }
  }

  // Place remaining bushes after trees (on outer rings)
  while (bushesPlaced < totalBushCount && spiralIndex < 500) {
    const pos = getSpiralPosition(spiralIndex, 0.4, 0.8, positions);
    spiralIndex++;

    if (pos) {
      const size = 0.5 + Math.random() * 0.7;
      const bush = createBush(size);
      bush.position.set(pos.x, 0, pos.z);
      scene.add(bush);
      plants.push(bush);
      positions.push(pos);
      bushesPlaced++;
    }
  }

  // Rocks scattered throughout spiral
  const rockCount = 16;
  let rocksPlaced = 0;
  let rockSpiralIndex = 5; // Offset slightly from flowers
  while (rocksPlaced < rockCount && rockSpiralIndex < 500) {
    const pos = getSpiralPosition(rockSpiralIndex, 0.35, 0.6, positions);
    rockSpiralIndex++;

    if (pos) {
      const size = 0.2 + Math.random() * 0.6;
      const rock = createRock(size);
      rock.position.set(pos.x, 0, pos.z);
      rock.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      scene.add(rock);
      positions.push(pos);
      rocksPlaced++;
    }
  }

  // Colorful flowers outside the trees (outer rings) - expand to edges
  const flowerColors = [
    0xff69b4, // Pink
    0xda70d6, // Orchid
    0xff1493, // Deep pink
    0xee82ee, // Violet
    0xffa07a, // Light salmon
    0xff6347, // Tomato red
    0xffd700, // Gold
  ];

  const flowerCount = 70;
  let flowersPlaced = 0;
  while (flowersPlaced < flowerCount && spiralIndex < 800) {
    const pos = getSpiralPosition(spiralIndex, 0.5, 0.4, positions);
    spiralIndex++;

    if (pos) {
      const color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
      const flower = createFlower(color);
      flower.position.set(pos.x, 0, pos.z);
      flower.rotation.y = Math.random() * Math.PI * 2;
      scene.add(flower);
      plants.push(flower);
      positions.push(pos);
      flowersPlaced++;
    }
  }

  // Grass blades (150-200 in dense patches)
  const grassCount = 180;
  for (let i = 0; i < grassCount; i++) {
    // Create grass patches throughout
    const patchX = -12 + Math.random() * 24;
    const patchZ = -12 + Math.random() * 24;

    // Skip if too close to lighthouse
    if (Math.sqrt((patchX + 2) ** 2 + (patchZ + 2) ** 2) > 1.5) {
      const blade = createGrassBlade();
      blade.position.set(
        patchX + (Math.random() - 0.5) * 0.3,
        0,
        patchZ + (Math.random() - 0.5) * 0.3
      );
      scene.add(blade);
      plants.push(blade);
    }
  }

  console.log(`Garden populated with ${plants.length} plants total`);
  return plants;
}
