'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  scrollProgress: React.MutableRefObject<number>;
}

export default function ParticleField({ count = 2000, scrollProgress }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Generate random positions for particles
  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const colorCyan = new THREE.Color('#00F0FF');
    const colorMagenta = new THREE.Color('#FF00AA');
    const colorWhite = new THREE.Color('#FFFFFF');

    for (let i = 0; i < count; i++) {
      // Spread particles in 3D space
      positions[i * 3] = (Math.random() - 0.5) * 50; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 10; // z (depth)

      // Random color mixing
      const colorChoice = Math.random();
      let color: THREE.Color;
      if (colorChoice < 0.6) {
        color = colorWhite;
      } else if (colorChoice < 0.8) {
        color = colorCyan;
      } else {
        color = colorMagenta;
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Random sizes
      sizes[i] = Math.random() * 0.05 + 0.01;
    }

    return [positions, colors, sizes];
  }, [count]);

  const vertexShader = `
    uniform float uTime;
    uniform float uScroll;
    
    attribute float size;
    attribute vec3 customColor;
    
    varying vec3 vColor;
    varying float vAlpha;
    
    void main() {
      vColor = customColor;
      
      vec3 pos = position;
      
      // Add wave motion
      float wave = sin(pos.x * 0.5 + uTime * 0.3) * 0.1;
      wave += cos(pos.y * 0.3 + uTime * 0.2) * 0.1;
      
      // Scroll-based movement
      pos.y += uScroll * 20.0;
      pos.y = mod(pos.y + 25.0, 50.0) - 25.0;
      
      // Add subtle floating motion
      pos.x += sin(uTime * 0.5 + pos.z) * 0.05;
      pos.y += wave;
      pos.z += cos(uTime * 0.3 + pos.x) * 0.03;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      
      // Size attenuation
      gl_PointSize = size * (300.0 / -mvPosition.z);
      
      // Fade based on distance
      vAlpha = smoothstep(30.0, 5.0, -mvPosition.z) * 0.8;
      
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    
    varying vec3 vColor;
    varying float vAlpha;
    
    void main() {
      // Circular particle shape
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      
      // Soft edge
      float alpha = smoothstep(0.5, 0.2, dist);
      
      // Glow effect
      float glow = exp(-dist * 4.0) * 0.5;
      
      vec3 finalColor = vColor + glow * vec3(1.0);
      
      gl_FragColor = vec4(finalColor, (alpha + glow) * vAlpha);
    }
  `;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uScroll.value = scrollProgress.current;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-customColor"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
