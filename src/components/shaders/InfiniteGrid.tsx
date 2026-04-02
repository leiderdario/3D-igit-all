'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface InfiniteGridProps {
  scrollProgress: React.MutableRefObject<number>;
}

export default function InfiniteGrid({ scrollProgress }: InfiniteGridProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uColor1: { value: new THREE.Color('#FFFFFF') },
      uColor2: { value: new THREE.Color('#00F0FF') },
      uColor3: { value: new THREE.Color('#FF00AA') },
    }),
    []
  );

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    
    void main() {
      vUv = uv;
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform float uScroll;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    
    void main() {
      vec2 uv = vUv;
      
      // Create base grid
      float gridSize = 3.0;
      vec2 grid = abs(fract(uv * gridSize - 0.5) - 0.5) / fwidth(uv * gridSize);
      float line = min(grid.x, grid.y);
      float gridPattern = 1.0 - min(line, 1.0);
      
      // Perspective depth effect
      float depth = pow(1.0 - uv.y, 1.5);
      
      // Subtle wave distortion based on scroll
      float wave = sin(uv.y * 20.0 + uTime * 0.5 + uScroll * 50.0) * 0.003;
      wave += cos(uv.x * 15.0 + uTime * 0.3) * 0.002;
      
      // Color gradient from white to cyan with magenta accents
      float colorMix = sin(uv.y * 3.14159 + uTime * 0.2 + uScroll * 10.0) * 0.5 + 0.5;
      vec3 lineColor = mix(uColor1, uColor2, colorMix);
      
      // Add magenta highlights at certain intervals
      float magentaPulse = sin(uTime * 0.5 + uv.x * 10.0) * 0.5 + 0.5;
      lineColor = mix(lineColor, uColor3, magentaPulse * 0.2);
      
      // Grid intensity based on depth
      float alpha = gridPattern * depth * 0.6;
      
      // Glow at grid intersections
      float glow = pow(gridPattern, 2.0) * depth * 0.3;
      lineColor += glow * uColor2 * 0.5;
      
      // Subtle moving particles on grid lines
      float particleSpeed = uTime * 0.5;
      float particle1 = smoothstep(0.02, 0.0, length(fract(uv * gridSize + vec2(particleSpeed * 0.1, 0.0)) - 0.5) - 0.02);
      float particle2 = smoothstep(0.02, 0.0, length(fract(uv * gridSize + vec2(0.0, particleSpeed * 0.15)) - 0.5) - 0.02);
      lineColor += (particle1 + particle2) * uColor1 * 0.3 * depth;
      
      // Horizon glow
      float horizonGlow = smoothstep(0.1, 0.5, 1.0 - uv.y) * 0.2;
      lineColor += horizonGlow * uColor2;
      
      // Final output
      float finalAlpha = alpha + glow + horizonGlow * 0.5;
      
      gl_FragColor = vec4(lineColor, clamp(finalAlpha, 0.0, 1.0));
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uScroll.value = scrollProgress.current;
    }
    
    if (meshRef.current) {
      // Subtle rotation for dynamism
      meshRef.current.rotation.x = -0.5 + Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
      meshRef.current.rotation.z = Math.cos(state.clock.getElapsedTime() * 0.05) * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <planeGeometry args={[100, 100, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
