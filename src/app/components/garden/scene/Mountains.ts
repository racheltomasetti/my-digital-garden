import * as THREE from "three";

/**
 * Creates a mountain range with multiple layers for depth
 * Mountains are positioned on the left side of the scene
 */
export function createMountains(): THREE.Group {
  const mountainGroup = new THREE.Group();

  // Mountain layer configurations (back to front)
  const layers = [
    // Far left mountain range (under RAY'S GARDEN text)
    {
      peaks: 5,
      baseY: -10,
      maxHeight: 15,
      xPosition: -100,
      opacity: 0.4,
      color: 0x1e293b, // slate-800
    },
    {
      peaks: 4,
      baseY: -10,
      maxHeight: 18,
      xPosition: -32,
      opacity: 0.55,
      color: 0x334155, // slate-700
    },
    {
      peaks: 3,
      baseY: -10,
      maxHeight: 22,
      xPosition: -29,
      opacity: 0.6,
      color: 0x475569, // slate-600
    },
    // Additional mountain range to fill the left sky area
    {
      peaks: 6,
      baseY: -10,
      maxHeight: 20,
      xPosition: -50,
      opacity: 0.35,
      color: 0x1e293b, // slate-800
    },
    
    {
      peaks: 4,
      baseY: -10,
      maxHeight: 26,
      xPosition: -40,
      opacity: 0.65,
      color: 0x475569, // slate-600
    },
  ];

  layers.forEach((layer, layerIndex) => {
    const mountain = createMountainLayer(
      layer.peaks,
      layer.baseY,
      layer.maxHeight,
      layer.xPosition,
      layer.opacity,
      layer.color
    );
    mountainGroup.add(mountain);
  });

  return mountainGroup;
}

/**
 * Creates a single mountain layer with multiple peaks
 */
function createMountainLayer(
  numPeaks: number,
  baseY: number,
  maxHeight: number,
  xPosition: number,
  opacity: number,
  color: number
): THREE.Mesh {
  // Create shape for mountain silhouette
  const shape = new THREE.Shape();

  const width = 60;
  const segmentWidth = width / (numPeaks * 2);

  // Start at bottom left
  shape.moveTo(0, baseY);

  // Generate mountain peaks with varying heights
  let currentX = 0;
  for (let i = 0; i < numPeaks; i++) {
    // Random height variation (70-100% of max height)
    const heightVariation = 0.7 + Math.random() * 0.3;
    const peakHeight = baseY + maxHeight * heightVariation;

    // Add slight random offset to peak x position for more organic look
    const xOffset = (Math.random() - 0.5) * segmentWidth * 0.3;

    // Go up to peak
    currentX += segmentWidth;
    shape.lineTo(currentX + xOffset, peakHeight);

    // Go down from peak
    currentX += segmentWidth;
    shape.lineTo(currentX, baseY + Math.random() * maxHeight * 0.3);
  }

  // Close the shape at bottom right
  shape.lineTo(width, baseY);
  shape.lineTo(0, baseY);

  // Extrude the shape to give it some depth
  const extrudeSettings = {
    depth: 2,
    bevelEnabled: false,
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

  // Create gradient material
  const material = new THREE.ShaderMaterial({
    uniforms: {
      baseColor: { value: new THREE.Color(color) },
      topColor: { value: new THREE.Color(color).multiplyScalar(1.3) },
      opacity: { value: opacity },
    },
    vertexShader: `
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 baseColor;
      uniform vec3 topColor;
      uniform float opacity;
      varying vec3 vPosition;

      void main() {
        // Gradient from base to top based on y position
        float gradientFactor = smoothstep(-10.0, 12.0, vPosition.y);
        vec3 color = mix(baseColor, topColor, gradientFactor);
        gl_FragColor = vec4(color, opacity);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const mountain = new THREE.Mesh(geometry, material);

  // Position the mountain on the left side
  mountain.position.set(xPosition, 0, -10);
  mountain.rotation.y = Math.PI / 6; // Slight angle toward camera

  return mountain;
}
