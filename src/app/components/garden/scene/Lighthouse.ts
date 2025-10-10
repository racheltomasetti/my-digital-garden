import * as THREE from "three";

export function createLighthouse(): THREE.Group {
  const lighthouse = new THREE.Group();
  lighthouse.userData.clickable = true;

  // Base platform (stone gray)
  const baseGeometry = new THREE.CylinderGeometry(0.7, 0.7, 0.3, 8);
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: 0x888888,
    roughness: 0.9,
    flatShading: true,
  });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.y = 0.15;
  lighthouse.add(base);

  // Main tower (red, tapered octagonal cylinder)
  const towerGeometry = new THREE.CylinderGeometry(0.4, 0.5, 3.5, 8);
  const towerMaterial = new THREE.MeshStandardMaterial({
    color: 0xc41e3a, // Bold red
    roughness: 0.6,
    flatShading: true,
  });
  const tower = new THREE.Mesh(towerGeometry, towerMaterial);
  tower.position.y = 2.05; // 0.3 (base height) + 3.5/2 (tower height/2)
  lighthouse.add(tower);

  // White bands (3 horizontal stripes on tower)
  const bandPositions = [1.2, 2.2, 3.2]; // Y positions
  bandPositions.forEach((yPos) => {
    const bandGeometry = new THREE.CylinderGeometry(0.41, 0.51, 0.3, 8);
    const bandMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.5,
      flatShading: true,
    });
    const band = new THREE.Mesh(bandGeometry, bandMaterial);
    band.position.y = yPos;
    lighthouse.add(band);
  });

  // Light room (white, at top of tower)
  const lightRoomGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 8);
  const lightRoomMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.4,
    flatShading: true,
  });
  const lightRoom = new THREE.Mesh(lightRoomGeometry, lightRoomMaterial);
  lightRoom.position.y = 4.05; // Top of tower (3.8) + room height/2
  lighthouse.add(lightRoom);

  // Windows on light room (dark panels)
  const windowGeometry = new THREE.BoxGeometry(0.3, 0.2, 0.05);
  const windowMaterial = new THREE.MeshStandardMaterial({
    color: 0x333333,
    roughness: 0.3,
  });

  // 4 windows around the light room
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    const window = new THREE.Mesh(windowGeometry, windowMaterial);
    window.position.set(
      Math.cos(angle) * 0.5,
      4.05,
      Math.sin(angle) * 0.5
    );
    window.rotation.y = angle;
    lighthouse.add(window);
  }

  // Beacon (glowing yellow cylinder at very top)
  const beaconGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.4, 8);
  const beaconMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffcc,
    emissive: 0xffff00,
    emissiveIntensity: 0.5,
    roughness: 0.2,
  });
  const beacon = new THREE.Mesh(beaconGeometry, beaconMaterial);
  beacon.position.y = 4.5; // Top of light room + beacon height/2
  beacon.name = "beacon"; // Name it for animation later
  lighthouse.add(beacon);

  // Door (dark brown, at base of tower)
  const doorGeometry = new THREE.BoxGeometry(0.3, 0.6, 0.05);
  const doorMaterial = new THREE.MeshStandardMaterial({
    color: 0x3d2817,
    roughness: 0.8,
  });
  const door = new THREE.Mesh(doorGeometry, doorMaterial);
  door.position.set(0, 0.6, 0.5); // Front of tower, near ground
  lighthouse.add(door);

  // Position the entire lighthouse at the specified location
  lighthouse.position.set(-2, 0, -2);

  return lighthouse;
}
