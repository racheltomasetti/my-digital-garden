"use client";

import { useEffect, useRef, useState } from "react";
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
import { createMountains } from "./scene/Mountains";
import MissionModal from "@/app/components/MissionModal";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function Garden() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme } = useTheme();

  // Refs to store scene objects for theme transitions
  const sceneRefs = useRef<{
    skyMaterial: THREE.ShaderMaterial | null;
    groundMaterial: THREE.MeshStandardMaterial | null;
    ambientLight: THREE.AmbientLight | null;
    directionalLight: THREE.DirectionalLight | null;
    beaconLight: THREE.PointLight | null;
    ocean: THREE.Mesh | null;
    plants: THREE.Object3D[] | null;
    stars: THREE.Points | null;
  }>({
    skyMaterial: null,
    groundMaterial: null,
    ambientLight: null,
    directionalLight: null,
    beaconLight: null,
    ocean: null,
    plants: null,
    stars: null,
  });

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

    // Define color schemes for day/night
    const skyColors = {
      light: {
        top: new THREE.Color(0x87ceeb), // Soft light blue
        horizon: new THREE.Color(0xffb3d9), // Pastel pink
        bottom: new THREE.Color(0xffd4a3), // Soft peach
      },
      dark: {
        top: new THREE.Color(0x0a1128), // Deep night blue
        horizon: new THREE.Color(0x0f1a30), // Dark blue-purple
        bottom: new THREE.Color(0x1a2332), // Slightly lighter dark blue
      },
    };

    // Get initial colors based on current theme
    const currentSkyColors =
      theme === "dark" ? skyColors.dark : skyColors.light;

    // Create scene with sunset gradient background
    const scene = new THREE.Scene();

    // Create gradient using a large sphere with dynamic colors
    const skyShaderMaterial = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {
        topColor: { value: currentSkyColors.top.clone() },
        horizonColor: { value: currentSkyColors.horizon.clone() },
        bottomColor: { value: currentSkyColors.bottom.clone() },
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
    });
    const sunsetGradient = new THREE.Mesh(
      new THREE.SphereGeometry(50, 32, 32),
      skyShaderMaterial
    );
    scene.add(sunsetGradient);
    sceneRefs.current.skyMaterial = skyShaderMaterial;
    console.log("Scene created with sunset sky");

    // Create stars for night sky
    const starCount = 3333;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    const starTwinkleOffsets = new Float32Array(starCount); // For varied twinkling

    // Distribute stars across the sky dome
    for (let i = 0; i < starCount; i++) {
      // Use spherical coordinates for natural sky distribution
      const radius = 45; // Slightly inside the sky sphere
      const theta = Math.random() * Math.PI * 2; // Full circle around Y axis
      const phi = Math.random() * Math.PI * 0.5; // Only upper hemisphere (0 to PI/2)

      // Convert spherical to cartesian coordinates
      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.cos(phi); // Y is up
      starPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      // Vary star sizes
      starSizes[i] = Math.random() * 0.05 + 0.03;

      // Random phase offset for twinkling
      starTwinkleOffsets[i] = Math.random() * Math.PI * 2;
    }

    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3)
    );
    starGeometry.setAttribute("size", new THREE.BufferAttribute(starSizes, 1));
    starGeometry.setAttribute(
      "twinkleOffset",
      new THREE.BufferAttribute(starTwinkleOffsets, 1)
    );

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      sizeAttenuation: true,
      transparent: true,
      opacity: theme === "dark" ? 0.9 : 0,
      blending: THREE.AdditiveBlending,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    sceneRefs.current.stars = stars;
    console.log("Stars added to sky");

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
    const initialGroundColor = theme === "dark" ? 0x1a2a1a : 0x4a7c3f;
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: initialGroundColor,
      roughness: 0.9,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2; // Rotate to be horizontal
    ground.receiveShadow = true;
    scene.add(ground);
    sceneRefs.current.groundMaterial = groundMaterial;
    console.log("Ground plane added");

    // Create and add mountains (in background, before ocean)
    const mountains = createMountains();
    scene.add(mountains);
    console.log("Mountains added");

    // Create and add ocean in the distance
    const ocean = createOcean();
    scene.add(ocean);
    sceneRefs.current.ocean = ocean;
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
    sceneRefs.current.plants = plants;
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

    // Add lights with theme-appropriate initial values
    const initialAmbientIntensity = theme === "dark" ? 0.3 : 0.6;
    const initialAmbientColor = theme === "dark" ? 0xb0c4de : 0xffffff;
    const ambientLight = new THREE.AmbientLight(
      initialAmbientColor,
      initialAmbientIntensity
    );
    scene.add(ambientLight);
    sceneRefs.current.ambientLight = ambientLight;

    const initialDirectionalIntensity = theme === "dark" ? 0.4 : 0.8;
    const directionalLight = new THREE.DirectionalLight(
      0xfff5e1,
      initialDirectionalIntensity
    );
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);
    sceneRefs.current.directionalLight = directionalLight;

    // Lighthouse beacon point light (more intense at night)
    const initialBeaconIntensity = theme === "dark" ? 3.0 : 1.5;
    const beaconLight = new THREE.PointLight(
      0xffffe0,
      initialBeaconIntensity,
      15,
      2
    );
    beaconLight.position.set(-2, 4.5, -2); // At beacon position
    scene.add(beaconLight);
    sceneRefs.current.beaconLight = beaconLight;
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

      // Rotate and pulse beacon light (dramatic sweeping effect)
      const baseIntensity = theme === "dark" ? 3.0 : 1.5;
      beaconLight.intensity =
        Math.sin(time * 3) > 0 ? baseIntensity * 2 : baseIntensity * 0.5;
      const angle = time * 2.0;
      beaconLight.position.x = -2 + Math.cos(angle) * 2.0;
      beaconLight.position.z = -2 + Math.sin(angle) * 2.0;

      // Animate stars twinkling
      if (stars) {
        const starMaterial = stars.material as THREE.PointsMaterial;
        const geometry = stars.geometry;
        const twinkleOffsets = geometry.getAttribute("twinkleOffset");

        // Update star opacity with individual twinkling
        if (twinkleOffsets) {
          const baseOpacity = starMaterial.opacity;
          // Very subtle overall pulse, individual stars twinkle via shader/size
          starMaterial.opacity = baseOpacity;

          // Optional: Slowly rotate stars for variety
          stars.rotation.y = time * 0.01;
        }
      }

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

    // Handle clicks on lighthouse (raycaster for 3D object picking)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates (-1 to +1)
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Update raycaster with camera and mouse position
      raycaster.setFromCamera(mouse, camera);

      // Check for intersections with all objects in the scene
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        // Check if any intersected object or its parent is the lighthouse
        for (const intersect of intersects) {
          let obj: THREE.Object3D | null = intersect.object;

          // Traverse up the parent chain to find clickable objects
          while (obj) {
            if (obj.userData.clickable) {
              // Trigger lighthouse glow effect
              const lighthouseMeshes = lighthouse.children.filter(
                (child) => child instanceof THREE.Mesh
              ) as THREE.Mesh[];

              lighthouseMeshes.forEach((mesh) => {
                const material = mesh.material as THREE.MeshStandardMaterial;
                const originalEmissive =
                  material.emissive?.clone() || new THREE.Color(0x000000);
                const originalIntensity = material.emissiveIntensity || 0;

                // Set glow
                material.emissive = new THREE.Color(0xffffaa);
                material.emissiveIntensity = 0.3;

                // Reset after brief moment
                setTimeout(() => {
                  material.emissive = originalEmissive;
                  material.emissiveIntensity = originalIntensity;
                }, 200);
              });

              // Open modal
              setIsModalOpen(true);
              return;
            }
            obj = obj.parent;
          }
        }
      }
    };

    window.addEventListener("click", handleClick);

    // Cleanup
    return () => {
      console.log("Cleaning up garden");
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClick);
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

  // Theme transition effect
  useEffect(() => {
    if (!containerRef.current) return;

    const refs = sceneRefs.current;
    if (!refs.skyMaterial) return;

    console.log("Theme changed to:", theme);

    // Define color schemes
    const skyColors = {
      light: {
        top: new THREE.Color(0x87ceeb),
        horizon: new THREE.Color(0xffb3d9),
        bottom: new THREE.Color(0xffd4a3),
      },
      dark: {
        top: new THREE.Color(0x0a1128),
        horizon: new THREE.Color(0x0f1a30),
        bottom: new THREE.Color(0x1a2332),
      },
    };

    const targetColors = theme === "dark" ? skyColors.dark : skyColors.light;
    const targetGroundColor = new THREE.Color(
      theme === "dark" ? 0x1a2a1a : 0x4a7c3f
    );
    const targetAmbientColor = new THREE.Color(
      theme === "dark" ? 0xb0c4de : 0xffffff
    );
    const targetAmbientIntensity = theme === "dark" ? 0.3 : 0.6;
    const targetDirectionalIntensity = theme === "dark" ? 0.4 : 0.8;
    const targetBeaconIntensity = theme === "dark" ? 3.0 : 1.5;
    const targetStarOpacity = theme === "dark" ? 0.9 : 0;
    const targetOceanColors =
      theme === "dark"
        ? {
            deep: new THREE.Color(0x0a1a2a),
            shallow: new THREE.Color(0x1a3a4a),
            foam: new THREE.Color(0x4a6a7a),
          }
        : {
            deep: new THREE.Color(0x0d4f6e),
            shallow: new THREE.Color(0x2a9bd8),
            foam: new THREE.Color(0xb8e6f5),
          };

    // Store starting values
    const startSkyColors = {
      top: refs.skyMaterial.uniforms.topColor.value.clone(),
      horizon: refs.skyMaterial.uniforms.horizonColor.value.clone(),
      bottom: refs.skyMaterial.uniforms.bottomColor.value.clone(),
    };
    const startGroundColor = refs.groundMaterial?.color.clone();
    const startAmbientColor = refs.ambientLight?.color.clone();
    const startAmbientIntensity = refs.ambientLight?.intensity ?? 0.6;
    const startDirectionalIntensity = refs.directionalLight?.intensity ?? 0.8;
    const startBeaconIntensity = refs.beaconLight?.intensity ?? 1.5;
    const startStarOpacity =
      (refs.stars?.material as THREE.PointsMaterial)?.opacity ?? 0;
    const oceanMaterial = refs.ocean?.material as THREE.ShaderMaterial;
    const startOceanColors = oceanMaterial
      ? {
          deep: oceanMaterial.uniforms.deepWaterColor.value.clone(),
          shallow: oceanMaterial.uniforms.shallowWaterColor.value.clone(),
          foam: oceanMaterial.uniforms.foamColor.value.clone(),
        }
      : null;

    // Animate transition over 0.8 seconds
    const duration = 800;
    const startTime = Date.now();

    const animateTransition = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easing function
      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      // Interpolate sky colors
      refs.skyMaterial!.uniforms.topColor.value.lerpColors(
        startSkyColors.top,
        targetColors.top,
        eased
      );
      refs.skyMaterial!.uniforms.horizonColor.value.lerpColors(
        startSkyColors.horizon,
        targetColors.horizon,
        eased
      );
      refs.skyMaterial!.uniforms.bottomColor.value.lerpColors(
        startSkyColors.bottom,
        targetColors.bottom,
        eased
      );

      // Interpolate ground color
      if (refs.groundMaterial && startGroundColor) {
        refs.groundMaterial.color.lerpColors(
          startGroundColor,
          targetGroundColor,
          eased
        );
      }

      // Interpolate ambient light
      if (refs.ambientLight && startAmbientColor) {
        refs.ambientLight.color.lerpColors(
          startAmbientColor,
          targetAmbientColor,
          eased
        );
        refs.ambientLight.intensity =
          startAmbientIntensity +
          (targetAmbientIntensity - startAmbientIntensity) * eased;
      }

      // Interpolate directional light intensity
      if (refs.directionalLight) {
        refs.directionalLight.intensity =
          startDirectionalIntensity +
          (targetDirectionalIntensity - startDirectionalIntensity) * eased;
      }

      // Interpolate beacon light intensity
      if (refs.beaconLight) {
        refs.beaconLight.intensity =
          startBeaconIntensity +
          (targetBeaconIntensity - startBeaconIntensity) * eased;
      }

      // Interpolate star opacity (fade in/out)
      if (refs.stars) {
        const starMaterial = refs.stars.material as THREE.PointsMaterial;
        starMaterial.opacity =
          startStarOpacity + (targetStarOpacity - startStarOpacity) * eased;
      }

      // Interpolate ocean colors
      if (oceanMaterial && startOceanColors) {
        oceanMaterial.uniforms.deepWaterColor.value.lerpColors(
          startOceanColors.deep,
          targetOceanColors.deep,
          eased
        );
        oceanMaterial.uniforms.shallowWaterColor.value.lerpColors(
          startOceanColors.shallow,
          targetOceanColors.shallow,
          eased
        );
        oceanMaterial.uniforms.foamColor.value.lerpColors(
          startOceanColors.foam,
          targetOceanColors.foam,
          eased
        );
      }

      // Adjust plant brightness/saturation
      if (refs.plants) {
        refs.plants.forEach((plant) => {
          plant.traverse((child) => {
            if (
              child instanceof THREE.Mesh &&
              child.material instanceof THREE.MeshStandardMaterial
            ) {
              // Store original color if not already stored
              if (!child.userData.originalColor) {
                child.userData.originalColor = child.material.color.clone();
              }

              const originalColor = child.userData.originalColor;
              const darkenFactor = theme === "dark" ? 0.7 : 1.0;
              const targetPlantColor = originalColor
                .clone()
                .multiplyScalar(darkenFactor);

              if (!child.userData.startColor) {
                child.userData.startColor = child.material.color.clone();
              }

              child.material.color.lerpColors(
                child.userData.startColor,
                targetPlantColor,
                eased
              );

              // Clear start color on completion
              if (progress >= 1) {
                child.userData.startColor = null;
              }
            }
          });
        });
      }

      if (progress < 1) {
        requestAnimationFrame(animateTransition);
      } else {
        console.log("Theme transition complete");
      }
    };

    animateTransition();
  }, [theme]);

  return (
    <>
      <div
        ref={containerRef}
        className="w-full h-screen fixed top-0 left-0 overflow-hidden"
        style={{ margin: 0, padding: 0 }}
      />
      <MissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
