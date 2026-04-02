'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LightStreaksProps {
  scrollProgress: React.MutableRefObject<number>;
}

export default function LightStreaks({ scrollProgress }: LightStreaksProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Create light streak geometry
  const streaks = useMemo(() => {
    const streakData = [];
    const colors = ['#00F0FF', '#FF00AA', '#FFFFFF', '#00F0FF', '#FF00AA'];
    
    for (let i = 0; i < 15; i++) {
      streakData.push({
        position: [
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 30,
          -10 - Math.random() * 20,
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        scale: 0.5 + Math.random() * 1.5,
        speed: 0.2 + Math.random() * 0.5,
        delay: Math.random() * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        length: 2 + Math.random() * 8,
      });
    }
    return streakData;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      
      // Subtle movement based on scroll
      groupRef.current.position.y = -scrollProgress.current * 3;
      groupRef.current.rotation.z = Math.sin(time * 0.1) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {streaks.map((streak, i) => (
        <LightStreak
          key={i}
          position={streak.position}
          rotation={streak.rotation}
          scale={streak.scale}
          speed={streak.speed}
          delay={streak.delay}
          color={streak.color}
          length={streak.length}
        />
      ))}
    </group>
  );
}

interface LightStreakProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
  delay: number;
  color: string;
  length: number;
}

function LightStreak({ position, rotation, scale, speed, delay, color, length }: LightStreakProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uSpeed: { value: speed },
      uDelay: { value: delay },
    }),
    [color, speed, delay]
  );

  const vertexShader = `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uSpeed;
    uniform float uDelay;
    
    varying vec2 vUv;
    
    void main() {
      float time = uTime * uSpeed + uDelay;
      
      // Moving light effect
      float move = fract(time * 0.5);
      float lightPos = sin(move * 3.14159) * 0.5 + 0.5;
      
      // Create streak gradient
      float intensity = smoothstep(0.0, 0.3, vUv.x) * smoothstep(1.0, 0.7, vUv.x);
      intensity *= smoothstep(0.0, 0.5, vUv.y) * smoothstep(1.0, 0.5, vUv.y);
      
      // Add pulsing glow
      float pulse = sin(time * 3.0) * 0.3 + 0.7;
      
      // Fade edges
      float edgeFade = vUv.x * (1.0 - vUv.x) * 4.0;
      
      float alpha = intensity * pulse * edgeFade * 0.8;
      
      vec3 finalColor = uColor * (1.0 + pulse * 0.5);
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={[scale * length, scale * 0.1, scale * 0.1]}
    >
      <planeGeometry args={[1, 1, 1, 1]} />
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
