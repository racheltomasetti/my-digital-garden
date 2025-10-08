"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { createLighthouse } from "./scene/Lighthouse";
import { populateGarden } from "./scene/Plants";
import {
  createButterflies,
  createPollenParticles,
  animateButterflies,
  animatePollenParticles,
} from "./scene/Particles";
import { createOcean, animateOcean } from "./scene/Ocean";

export default function Garden() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      console.log("No container ref");
      return;
    }

    console.log("Garden initialization starting");

    console.log("Garden component mounted, initializing Three.js");

    // Prevent zoom/pinch gestures
    const preventZoom = (e: WheelEvent | TouchEvent) => {
      if (e instanceof WheelEvent && e.ctrlKey) {
        e.preventDefault();
      }
    };

    document.addEventListener("wheel", preventZoom, { passive: false });
    document.addEventListener("touchmove", preventZoom, { passive: false });

    // Create scene with sunset gradient background
    const scene = new THREE.Scene();

    // Create sunset gradient using a large sphere
    const sunsetGradient = new THREE.Mesh(
      new THREE.SphereGeometry(50, 32, 32),
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        uniforms: {
          topColor: { value: new THREE.Color(0x87ceeb) }, // Soft light blue at top
          horizonColor: { value: new THREE.Color(0xffb3d9) }, // Pastel pink at horizon
          bottomColor: { value: new THREE.Color(0xffd4a3) }, // Soft peach at bottom
        },
        vertexShader: `
          varying vec3 vWorldPosition;
          void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 topColor;
          uniform vec3 horizonColor;
          uniform vec3 bottomColor;
          varying vec3 vWorldPosition;

          void main() {
            float h = normalize(vWorldPosition).y;

            // Blend from bottom to horizon to top
            vec3 color;
            if (h > 0.0) {
              // Above horizon: blend from horizon to top
              color = mix(horizonColor, topColor, smoothstep(0.0, 0.5, h));
            } else {
              // Below horizon: blend from bottom to horizon
              color = mix(bottomColor, horizonColor, smoothstep(-0.3, 0.0, h));
            }

            gl_FragColor = vec4(color, 1.0);
          }
        `,
      })
    );
    scene.add(sunsetGradient);
    console.log("Scene created with sunset sky");

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(5, 2.5, 6);
    camera.lookAt(0, 1, 0);
    console.log("Camera created");

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    console.log("Renderer created and canvas appended");

    // Create ground plane (larger to fill viewport edges, green grass)
    const groundGeometry = new THREE.PlaneGeometry(50, 50, 32, 32);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a7c3f, // Green grass color
      roughness: 0.9,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2; // Rotate to be horizontal
    ground.receiveShadow = true;
    scene.add(ground);
    console.log("Ground plane added");

    // Create and add ocean in the distance
    const ocean = createOcean();
    scene.add(ocean);
    console.log("Ocean added");

    // Create and add lighthouse
    const lighthouse = createLighthouse();
    scene.add(lighthouse);

    // Get reference to beacon for animation
    const beacon = lighthouse.getObjectByName("beacon") as
      | THREE.Mesh
      | undefined;
    console.log("Lighthouse added, beacon found:", !!beacon);

    // Populate garden with plants
    const plants = populateGarden(scene);
    console.log("Garden populated");

    // Pre-calculate plant types for animation (avoid bbox calculation every frame)
    let treeCount = 0,
      bushCount = 0,
      flowerCount = 0,
      grassCount = 0;
    plants.forEach((plant) => {
      const bbox = new THREE.Box3().setFromObject(plant);
      const height = bbox.max.y - bbox.min.y;

      if (height > 2) {
        plant.userData.plantType = "tree";
        treeCount++;
      } else if (height > 1) {
        plant.userData.plantType = "bush";
        bushCount++;
      } else if (height > 0.5) {
        plant.userData.plantType = "flower";
        flowerCount++;
      } else {
        plant.userData.plantType = "grass";
        grassCount++;
      }
    });
    console.log(
      `Plant types - Trees: ${treeCount}, Bushes: ${bushCount}, Flowers: ${flowerCount}, Grass: ${grassCount}`
    );

    // Create particle systems
    const butterflies = createButterflies(4);
    butterflies.forEach((b) => scene.add(b));

    const pollenParticles = createPollenParticles(25);
    scene.add(pollenParticles);
    console.log("Particles added");

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xfff5e1, 0.8);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    // Lighthouse beacon point light
    const beaconLight = new THREE.PointLight(0xffffe0, 1.5, 15, 2);
    beaconLight.position.set(-2, 4.5, -2); // At beacon position
    scene.add(beaconLight);
    console.log("Lights added");

    // Animation loop with clock for time-based animations
    const clock = new THREE.Clock();
    let animationId: number;
    let lastTime = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();
      const deltaTime = time - lastTime;
      lastTime = time;

      // Debug
      if (Math.floor(time) % 5 === 0 && time % 1 < 0.016) {
        console.log(
          "Animating at time:",
          time.toFixed(2),
          "plants count:",
          plants.length,
          "light intensity:",
          beaconLight.intensity.toFixed(2)
        );
      }

      // Animate lighthouse beacon (rotation and pulsing)
      if (beacon) {
        beacon.rotation.y = time * 0.5; // Rotate beacon

        // Pulse emissive intensity
        const beaconMaterial = beacon.material as THREE.MeshStandardMaterial;
        if (beaconMaterial.emissive) {
          beaconMaterial.emissiveIntensity = 0.5 + Math.sin(time * 2) * 0.4;
        }
      }

      // Rotate and pulse beacon light (VERY dramatic for testing)
      beaconLight.intensity = Math.sin(time * 3) > 0 ? 5.0 : 0.5; // Flash on/off
      const angle = time * 2.0; // Very fast rotation
      beaconLight.position.x = -2 + Math.cos(angle) * 2.0; // Very large circle
      beaconLight.position.z = -2 + Math.sin(angle) * 2.0;

      // Animate ocean waves
      animateOcean(ocean, time);

      // Animate particle systems
      animateButterflies(butterflies, time);
      animatePollenParticles(pollenParticles, deltaTime);

      // Animate plants with subtle wind sway
      plants.forEach((plant) => {
        const phase = plant.userData.phase || 0;
        const plantType = plant.userData.plantType;

        // Different sway for different plant types - gentle, natural movement
        switch (plantType) {
          case "tree":
            // Trees: slow, gentle sway
            plant.rotation.z = Math.sin(time * 0.6 + phase) * 0.08;
            break;
          case "bush":
            // Bushes: medium sway
            plant.rotation.z = Math.sin(time * 0.8 + phase) * 0.12;
            break;
          case "flower":
            // Roses and flowers: faster, more noticeable sway
            plant.rotation.z = Math.sin(time * 1.2 + phase) * 0.15;
            break;
          case "grass":
            // Grass: fast sway
            plant.rotation.z = Math.sin(time * 2.0 + phase) * 0.2;
            break;
        }
      });

      renderer.render(scene, camera);
    };
    animate();
    console.log("Animation started");

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      console.log("Cleaning up garden");
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("wheel", preventZoom);
      document.removeEventListener("touchmove", preventZoom);
      cancelAnimationFrame(animationId);

      // Clean up renderer and geometries
      if (
        containerRef.current &&
        renderer.domElement &&
        containerRef.current.contains(renderer.domElement)
      ) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      groundGeometry.dispose();
      groundMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen fixed top-0 left-0"
      style={{ margin: 0, padding: 0 }}
    />
  );
}
