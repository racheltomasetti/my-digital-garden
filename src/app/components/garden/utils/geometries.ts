import * as THREE from "three";

// Yellow Rose
export function createYellowRose(): THREE.Group {
  const rose = new THREE.Group();

  // Stem (green, thin cylinder)
  const stemGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.7, 6);
  const stemMaterial = new THREE.MeshStandardMaterial({
    color: 0x2d5016,
    roughness: 0.7,
  });
  const stem = new THREE.Mesh(stemGeometry, stemMaterial);
  stem.position.y = 0.35;
  rose.add(stem);

  // Leaves (2-3 small green shapes)
  const leafGeometry = new THREE.BoxGeometry(0.15, 0.05, 0.08);
  const leafMaterial = new THREE.MeshStandardMaterial({
    color: 0x4a9b4f,
    roughness: 0.5,
  });

  for (let i = 0; i < 3; i++) {
    const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
    const angle = (i * Math.PI * 2) / 3;
    leaf.position.set(Math.cos(angle) * 0.08, 0.3 + i * 0.1, Math.sin(angle) * 0.08);
    leaf.rotation.z = Math.PI / 4;
    rose.add(leaf);
  }

  // Petals (outer layer - golden yellow)
  const outerPetalMaterial = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    roughness: 0.3,
  });

  const petalCount = 12;
  const petalRadius = 0.12;
  for (let i = 0; i < petalCount; i++) {
    const angle = (i * Math.PI * 2) / petalCount;
    const petalGeometry = new THREE.SphereGeometry(0.06, 6, 6);
    const petal = new THREE.Mesh(petalGeometry, outerPetalMaterial);
    petal.position.set(
      Math.cos(angle) * petalRadius,
      0.75,
      Math.sin(angle) * petalRadius
    );
    petal.scale.set(1, 0.8, 0.6);
    rose.add(petal);
  }

  // Inner petals (brighter yellow, smaller)
  const innerPetalMaterial = new THREE.MeshStandardMaterial({
    color: 0xffc720,
    roughness: 0.3,
  });

  const innerPetalCount = 6;
  const innerPetalRadius = 0.06;
  for (let i = 0; i < innerPetalCount; i++) {
    const angle = (i * Math.PI * 2) / innerPetalCount;
    const petalGeometry = new THREE.SphereGeometry(0.04, 6, 6);
    const petal = new THREE.Mesh(petalGeometry, innerPetalMaterial);
    petal.position.set(
      Math.cos(angle) * innerPetalRadius,
      0.78,
      Math.sin(angle) * innerPetalRadius
    );
    rose.add(petal);
  }

  // Center
  const centerGeometry = new THREE.SphereGeometry(0.03, 6, 6);
  const centerMaterial = new THREE.MeshStandardMaterial({
    color: 0xffa500,
    roughness: 0.4,
  });
  const center = new THREE.Mesh(centerGeometry, centerMaterial);
  center.position.y = 0.8;
  rose.add(center);

  // Store random phase for wind animation
  rose.userData.phase = Math.random() * Math.PI * 2;

  return rose;
}

// Tree
export function createTree(height: number = 2.5): THREE.Group {
  const tree = new THREE.Group();

  // Trunk
  const trunkHeight = height * 0.6;
  const trunkGeometry = new THREE.CylinderGeometry(0.15, 0.2, trunkHeight, 6);
  const trunkMaterial = new THREE.MeshStandardMaterial({
    color: 0x4a3425,
    roughness: 0.9,
    flatShading: true,
  });
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk.position.y = trunkHeight / 2;
  tree.add(trunk);

  // Canopy (cone shape)
  const canopyHeight = height * 0.8;
  const canopyGeometry = new THREE.ConeGeometry(0.8, canopyHeight, 8);
  const canopyMaterial = new THREE.MeshStandardMaterial({
    color: 0x4a9b4f,
    roughness: 0.7,
    flatShading: true,
  });
  const canopy = new THREE.Mesh(canopyGeometry, canopyMaterial);
  canopy.position.y = trunkHeight + canopyHeight / 2;
  tree.add(canopy);

  tree.userData.phase = Math.random() * Math.PI * 2;

  return tree;
}

// Bush
export function createBush(size: number = 0.8): THREE.Group {
  const bush = new THREE.Group();

  const bushMaterial = new THREE.MeshStandardMaterial({
    color: 0x6bb068,
    roughness: 0.8,
    flatShading: true,
  });

  // Create 3-5 overlapping spheres for organic look
  const sphereCount = 3 + Math.floor(Math.random() * 3);
  for (let i = 0; i < sphereCount; i++) {
    const radius = size * (0.3 + Math.random() * 0.3);
    const sphereGeometry = new THREE.SphereGeometry(radius, 6, 6);
    const sphere = new THREE.Mesh(sphereGeometry, bushMaterial);

    const angle = (i * Math.PI * 2) / sphereCount;
    const distance = size * 0.2;
    sphere.position.set(
      Math.cos(angle) * distance,
      radius * 0.8,
      Math.sin(angle) * distance
    );
    bush.add(sphere);
  }

  bush.userData.phase = Math.random() * Math.PI * 2;

  return bush;
}

// Generic Flower
export function createFlower(color: number): THREE.Group {
  const flower = new THREE.Group();

  // Stem
  const stemGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.5, 6);
  const stemMaterial = new THREE.MeshStandardMaterial({
    color: 0x2d5016,
    roughness: 0.7,
  });
  const stem = new THREE.Mesh(stemGeometry, stemMaterial);
  stem.position.y = 0.25;
  flower.add(stem);

  // Petals (5-8 in circular pattern)
  const petalCount = 5 + Math.floor(Math.random() * 4);
  const petalMaterial = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.4,
  });

  for (let i = 0; i < petalCount; i++) {
    const angle = (i * Math.PI * 2) / petalCount;
    const petalGeometry = new THREE.BoxGeometry(0.08, 0.08, 0.02);
    const petal = new THREE.Mesh(petalGeometry, petalMaterial);
    petal.position.set(
      Math.cos(angle) * 0.08,
      0.55,
      Math.sin(angle) * 0.08
    );
    petal.rotation.y = angle;
    flower.add(petal);
  }

  // Center
  const centerGeometry = new THREE.SphereGeometry(0.04, 6, 6);
  const centerMaterial = new THREE.MeshStandardMaterial({
    color: 0xffa500,
    roughness: 0.4,
  });
  const center = new THREE.Mesh(centerGeometry, centerMaterial);
  center.position.y = 0.55;
  flower.add(center);

  flower.userData.phase = Math.random() * Math.PI * 2;

  return flower;
}

// Rock
export function createRock(size: number = 0.5): THREE.Mesh {
  const geometry = new THREE.DodecahedronGeometry(size, 0);

  // Randomly distort vertices for irregular shape
  const positionAttribute = geometry.getAttribute('position');
  for (let i = 0; i < positionAttribute.count; i++) {
    const x = positionAttribute.getX(i);
    const y = positionAttribute.getY(i);
    const z = positionAttribute.getZ(i);

    positionAttribute.setXYZ(
      i,
      x * (0.8 + Math.random() * 0.4),
      y * (0.8 + Math.random() * 0.4),
      z * (0.8 + Math.random() * 0.4)
    );
  }
  geometry.computeVertexNormals();

  const material = new THREE.MeshStandardMaterial({
    color: 0x888888,
    roughness: 1.0,
    flatShading: true,
  });

  const rock = new THREE.Mesh(geometry, material);
  rock.position.y = size * 0.5;

  return rock;
}

// Grass Blade
export function createGrassBlade(): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(0.03, 0.3, 0.01);
  const material = new THREE.MeshStandardMaterial({
    color: 0x3d7c3f,
    side: THREE.DoubleSide,
    roughness: 0.8,
  });

  const blade = new THREE.Mesh(geometry, material);
  blade.position.y = 0.15;
  blade.rotation.z = (Math.random() - 0.5) * 0.3; // Slight random tilt
  blade.userData.phase = Math.random() * Math.PI * 2;

  return blade;
}
