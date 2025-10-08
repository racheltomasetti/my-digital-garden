import * as THREE from "three";

// Create butterflies
export function createButterflies(count: number): THREE.Group[] {
  const butterflies: THREE.Group[] = [];

  for (let i = 0; i < count; i++) {
    const butterfly = new THREE.Group();

    // Simple butterfly wings (two triangular shapes)
    const wingGeometry = new THREE.BoxGeometry(0.15, 0.08, 0.01);
    const colors = [0xffd700, 0xffa500, 0xffff00]; // Yellow/orange
    const wingMaterial = new THREE.MeshStandardMaterial({
      color: colors[Math.floor(Math.random() * colors.length)],
      emissive: colors[Math.floor(Math.random() * colors.length)],
      emissiveIntensity: 0.3,
    });

    const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
    leftWing.position.set(-0.08, 0, 0);
    leftWing.rotation.z = 0.3;
    butterfly.add(leftWing);

    const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
    rightWing.position.set(0.08, 0, 0);
    rightWing.rotation.z = -0.3;
    butterfly.add(rightWing);

    // Body
    const bodyGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.1, 6);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.rotation.z = Math.PI / 2;
    butterfly.add(body);

    // Random starting position near lighthouse
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 2;
    butterfly.position.set(
      -2 + Math.cos(angle) * radius,
      1 + Math.random() * 2,
      -2 + Math.sin(angle) * radius
    );

    // Store animation data
    butterfly.userData.phase = Math.random() * Math.PI * 2;
    butterfly.userData.speed = 0.3 + Math.random() * 0.4;
    butterfly.userData.radius = 3 + Math.random() * 2;
    butterfly.userData.baseY = 1 + Math.random() * 1.5;
    butterfly.userData.leftWing = leftWing;
    butterfly.userData.rightWing = rightWing;

    butterflies.push(butterfly);
  }

  return butterflies;
}

// Create floating pollen/firefly particles
export function createPollenParticles(count: number): THREE.Points {
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);
  const lifetimes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    // Random position in garden area
    const i3 = i * 3;
    positions[i3] = -10 + Math.random() * 20; // x
    positions[i3 + 1] = Math.random() * 0.5; // y (near ground)
    positions[i3 + 2] = -10 + Math.random() * 20; // z

    // Upward velocity with slight drift
    velocities[i3] = (Math.random() - 0.5) * 0.3; // x drift
    velocities[i3 + 1] = 0.5 + Math.random() * 0.5; // y upward
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.3; // z drift

    // Lifetime before respawn
    lifetimes[i] = Math.random() * 10;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
  geometry.setAttribute('lifetime', new THREE.BufferAttribute(lifetimes, 1));

  const material = new THREE.PointsMaterial({
    size: 0.08,
    color: 0xffffcc,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geometry, material);
}

// Animate butterflies
export function animateButterflies(butterflies: THREE.Group[], time: number) {
  butterflies.forEach((butterfly) => {
    const phase = butterfly.userData.phase;
    const speed = butterfly.userData.speed;
    const radius = butterfly.userData.radius;
    const baseY = butterfly.userData.baseY;

    // Figure-8 flight path around lighthouse
    const t = time * speed + phase;
    butterfly.position.x = -2 + Math.sin(t) * radius;
    butterfly.position.y = baseY + Math.sin(t * 2) * 0.5;
    butterfly.position.z = -2 + Math.cos(t) * radius * 0.7;

    // Face direction of movement
    const nextT = t + 0.01;
    const nextX = -2 + Math.sin(nextT) * radius;
    const nextZ = -2 + Math.cos(nextT) * radius * 0.7;
    butterfly.lookAt(nextX, butterfly.position.y, nextZ);

    // Flap wings
    const flapSpeed = 8;
    const flapAngle = Math.sin(time * flapSpeed) * 0.4 + 0.3;
    butterfly.userData.leftWing.rotation.z = flapAngle;
    butterfly.userData.rightWing.rotation.z = -flapAngle;
  });
}

// Animate pollen particles
export function animatePollenParticles(particles: THREE.Points, deltaTime: number) {
  const positions = particles.geometry.attributes.position.array as Float32Array;
  const velocities = particles.geometry.attributes.velocity.array as Float32Array;
  const lifetimes = particles.geometry.attributes.lifetime.array as Float32Array;

  for (let i = 0; i < lifetimes.length; i++) {
    const i3 = i * 3;

    // Update position based on velocity
    positions[i3] += velocities[i3] * deltaTime;
    positions[i3 + 1] += velocities[i3 + 1] * deltaTime;
    positions[i3 + 2] += velocities[i3 + 2] * deltaTime;

    // Update lifetime
    lifetimes[i] -= deltaTime;

    // Respawn if lifetime expired or too high
    if (lifetimes[i] <= 0 || positions[i3 + 1] > 5) {
      positions[i3] = -10 + Math.random() * 20;
      positions[i3 + 1] = Math.random() * 0.5;
      positions[i3 + 2] = -10 + Math.random() * 20;
      lifetimes[i] = 5 + Math.random() * 5;
    }
  }

  particles.geometry.attributes.position.needsUpdate = true;
}
