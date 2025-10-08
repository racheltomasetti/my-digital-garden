// import * as THREE from "three";

// function createOceanMaterial(): THREE.ShaderMaterial {
//   return new THREE.ShaderMaterial({
//     uniforms: {
//       time: { value: 0 },
//       deepWaterColor: { value: new THREE.Color(0x1e6e8e) }, // Deep teal
//       shallowWaterColor: { value: new THREE.Color(0x2a8fb8) }, // Lighter turquoise
//       foamColor: { value: new THREE.Color(0x87ceeb) }, // Light blue foam
//     },
//     vertexShader: `
//       uniform float time;
//       varying vec2 vUv;
//       varying float vElevation;

//       void main() {
//         vUv = uv;

//         // Create multiple overlapping waves for natural look
//         float wave1 = sin(position.x * 0.5 + time * 0.8) * 0.15;
//         float wave2 = sin(position.x * 0.3 - position.y * 0.4 + time * 0.5) * 0.1;
//         float wave3 = cos(position.y * 0.6 + time * 0.6) * 0.08;

//         // Combine waves
//         float elevation = wave1 + wave2 + wave3;
//         vElevation = elevation;

//         // Apply wave displacement to y position
//         vec3 newPosition = position;
//         newPosition.z = elevation;

//         gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
//       }
//     `,
//     fragmentShader: `
//       uniform vec3 deepWaterColor;
//       uniform vec3 shallowWaterColor;
//       uniform vec3 foamColor;
//       varying vec2 vUv;
//       varying float vElevation;

//       void main() {
//         // Mix colors based on wave height
//         vec3 color = mix(deepWaterColor, shallowWaterColor, smoothstep(-0.2, 0.2, vElevation));

//         // Add foam to wave peaks
//         float foam = smoothstep(0.15, 0.25, vElevation);
//         color = mix(color, foamColor, foam * 0.3);

//         // Slight gradient from near to far
//         color = mix(color, deepWaterColor, vUv.y * 0.3);

//         gl_FragColor = vec4(color, 1.0);
//       }
//     `,
//     side: THREE.DoubleSide,
//   });
// }

// export function createOcean(): THREE.Mesh {
//   // Simple wide ocean plane positioned far behind everything
//   const oceanGeometry = new THREE.PlaneGeometry(150, 30, 80, 30);
//   const oceanMaterial = createOceanMaterial();
//   const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);

//   // Position ocean far back behind the scene
//   ocean.rotation.x = -Math.PI / 2; // Make horizontal
//   ocean.position.set(0, -0.2, -35); // Far behind, lower than ground to avoid overlap

//   return ocean;
// }

// // Function to update ocean animation (call in animation loop)
// export function animateOcean(ocean: THREE.Mesh, time: number): void {
//   const material = ocean.material as THREE.ShaderMaterial;
//   if (material.uniforms && material.uniforms.time) {
//     material.uniforms.time.value = time;
//   }
// }

import * as THREE from "three";

function createOceanMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      deepWaterColor: { value: new THREE.Color(0x0d4f6e) },
      shallowWaterColor: { value: new THREE.Color(0x2a9bd8) },
      foamColor: { value: new THREE.Color(0xb8e6f5) },
    },
    vertexShader: `
      uniform float time;
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        vUv = uv;

        // Create waves
        float wave1 = sin(position.x * 0.3 + time * 1.0) * 0.2;
        float wave2 = sin(position.x * 0.5 - position.y * 0.3 + time * 0.7) * 0.15;
        float wave3 = cos(position.y * 0.4 + time * 0.9) * 0.12;

        float elevation = wave1 + wave2 + wave3;
        vElevation = elevation;

        vec3 newPosition = position;
        newPosition.z = elevation;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 deepWaterColor;
      uniform vec3 shallowWaterColor;
      uniform vec3 foamColor;
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        // Mix colors based on wave height
        vec3 color = mix(deepWaterColor, shallowWaterColor, smoothstep(-0.3, 0.3, vElevation));
        
        // Add foam to wave peaks
        float foam = smoothstep(0.2, 0.35, vElevation);
        color = mix(color, foamColor, foam * 0.5);

        // Gradient to horizon
        color = mix(color, shallowWaterColor * 1.3, vUv.y * 0.5);

        gl_FragColor = vec4(color, 1.0);
      }
    `,
    side: THREE.DoubleSide,
  });
}

export function createOcean(): THREE.Mesh {
const oceanGeometry = new THREE.PlaneGeometry(350, 50, 150, 50);
  const oceanMaterial = createOceanMaterial();
  const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);

  ocean.rotation.x = -Math.PI / 2;
  ocean.position.set(150, -0.1, -30); // Shifted right by 150 (half the width)

  return ocean;
}

export function animateOcean(ocean: THREE.Mesh, time: number): void {
  const material = ocean.material as THREE.ShaderMaterial;
  if (material.uniforms && material.uniforms.time) {
    material.uniforms.time.value = time;
  }
}