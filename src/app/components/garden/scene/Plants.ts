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

export function populateGarden(scene: THREE.Scene): THREE.Object3D[] {
  const plants: THREE.Object3D[] = [];
  const positions: { x: number; z: number }[] = [];

  // Yellow Rose Garden - create abundant clusters around lighthouse
  const roseCount = 45; // Much more roses for lush look
  const lighthouseX = -2;
  const lighthouseZ = -2;

  for (let i = 0; i < roseCount; i++) {
    const rose = createYellowRose();

    // Create roses in multiple rings and clusters
    const ring = Math.floor(i / 12); // 12 roses per ring
    const angleOffset = ring * 0.4; // Offset each ring
    const radius = 1.8 + ring * 0.6; // Tighter, more rings
    const angle = (i * Math.PI * 2) / 12 + angleOffset;

    const x = lighthouseX + Math.cos(angle) * radius + (Math.random() - 0.5) * 0.3;
    const z = lighthouseZ + Math.sin(angle) * radius + (Math.random() - 0.5) * 0.3;

    rose.position.set(x, 0, z);
    rose.rotation.y = Math.random() * Math.PI * 2;
    rose.scale.set(1, 0.9 + Math.random() * 0.2, 1); // Vary height slightly

    scene.add(rose);
    plants.push(rose);
    positions.push({ x, z });
  }

  // Trees (15-18 trees scattered around, not blocking camera view)
  const treeCount = 18;
  for (let i = 0; i < treeCount; i++) {
    const pos = getRandomPosition(-12, 12, -12, 12, 1.5, positions, true); // Block view path
    if (pos) {
      const height = 2.0 + Math.random() * 1.5;
      const tree = createTree(height);
      tree.position.set(pos.x, 0, pos.z);
      tree.rotation.y = Math.random() * Math.PI * 2;
      scene.add(tree);
      plants.push(tree);
      positions.push(pos);
    }
  }

  // Bushes (30-35 bushes for fullness)
  const bushCount = 35;
  for (let i = 0; i < bushCount; i++) {
    const pos = getRandomPosition(-12, 12, -12, 12, 0.8, positions);
    if (pos) {
      const size = 0.5 + Math.random() * 0.7;
      const bush = createBush(size);
      bush.position.set(pos.x, 0, pos.z);
      scene.add(bush);
      plants.push(bush);
      positions.push(pos);
    }
  }

  // Other colorful flowers (50+ flowers in abundant clusters)
  const flowerColors = [
    0xff69b4, // Pink
    0xda70d6, // Orchid
    0xff1493, // Deep pink
    0xee82ee, // Violet
    0xffa07a, // Light salmon
    0xff6347, // Tomato red
    0xffd700, // Gold
  ];

  const flowerCount = 60;
  for (let i = 0; i < flowerCount; i++) {
    const pos = getRandomPosition(-12, 12, -12, 12, 0.4, positions);
    if (pos) {
      const color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
      const flower = createFlower(color);
      flower.position.set(pos.x, 0, pos.z);
      flower.rotation.y = Math.random() * Math.PI * 2;
      scene.add(flower);
      plants.push(flower);
      positions.push(pos);
    }
  }

  // Rocks (20-25 rocks)
  const rockCount = 25;
  for (let i = 0; i < rockCount; i++) {
    const pos = getRandomPosition(-12, 12, -12, 12, 0.6, positions);
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
