import { useEffect, useRef } from "react";
import * as THREE from "three";

export function useThreeSetup() {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      75, // FOV (wider for more immersive first-person feel)
      window.innerWidth / window.innerHeight, // Aspect ratio
      0.1, // Near clipping plane
      100 // Far clipping plane
    );

    // Adjust camera position based on screen size
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      camera.position.set(5, 2.5, 10); // Higher camera position on mobile
      camera.lookAt(-2, 1.2, -2); // Look slightly down to center lighthouse
    } else {
      camera.position.set(5, 1.6, 10); // First-person eye level (standing height ~1.6m)
      camera.lookAt(-2, 1.6, -2); // Look straight ahead at eye level
    }

    cameraRef.current = camera;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      const isMobile = window.innerWidth < 768;

      // Update camera position on resize
      if (isMobile) {
        cameraRef.current.position.set(5, 2.5, 10);
        cameraRef.current.lookAt(-2, 1.2, -2);
      } else {
        cameraRef.current.position.set(5, 1.6, 10);
        cameraRef.current.lookAt(-2, 1.6, -2);
      }

      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);

      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return {
    scene: sceneRef.current,
    camera: cameraRef.current,
    renderer: rendererRef.current,
    containerRef,
  };
}
