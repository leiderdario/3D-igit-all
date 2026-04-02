'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  EffectComposer, 
  Bloom, 
  ChromaticAberration, 
  Noise,
  Vignette,
  DepthOfField
} from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing';
import * as THREE from 'three';
import InfiniteGrid from './shaders/InfiniteGrid';
import ParticleField from './ParticleField';
import FloatingHardware from './FloatingHardware';
import LightStreaks from './LightStreaks';

// Custom shader for grid distortion based on scroll
const gridVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const gridFragmentShader = `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uResolution;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vec2 uv = vUv;
    
    // Create infinite grid effect
    float gridSize = 2.0;
    vec2 grid = abs(fract(uv * gridSize - 0.5) - 0.5) / fwidth(uv * gridSize);
    float line = min(grid.x, grid.y);
    float gridPattern = 1.0 - min(line, 1.0);
    
    // Add perspective depth
    float depth = 1.0 - uv.y;
    depth = pow(depth, 2.0);
    
    // Scroll-based animation
    float scrollOffset = uScroll * 10.0;
    float wave = sin(uv.y * 10.0 + uTime + scrollOffset) * 0.02;
    
    // Color gradient
    vec3 color = mix(uColor1, uColor2, uv.y + wave);
    
    // Apply grid
    float alpha = gridPattern * depth * 0.8;
    
    // Add glow at intersections
    float glow = pow(gridPattern, 3.0) * depth;
    color += glow * uColor1 * 0.5;
    
    gl_FragColor = vec4(color, alpha + glow * 0.5);
  }
`;

function Scene() {
  const { viewport, size } = useThree();
  const scrollProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = window.scrollY / scrollHeight;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Pass scroll data to shaders if needed
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF00AA" />
      <pointLight position={[0, 0, 5]} intensity={0.3} color="#FFFFFF" />
      
      {/* Infinite Grid */}
      <InfiniteGrid scrollProgress={scrollProgress} />
      
      {/* Particle Field */}
      <ParticleField count={2000} scrollProgress={scrollProgress} />
      
      {/* Light Streaks */}
      <LightStreaks scrollProgress={scrollProgress} />
      
      {/* Floating Hardware */}
      <FloatingHardware scrollProgress={scrollProgress} />
      
      {/* Post-processing Effects */}
      <EffectComposer>
        <Bloom 
          intensity={0.8}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          kernelSize={KernelSize.LARGE}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(0.002, 0.002)}
          radialModulation={false}
          modulationOffset={0}
        />
        <Noise
          opacity={0.15}
          blendFunction={BlendFunction.OVERLAY}
        />
        <Vignette
          offset={0.3}
          darkness={0.7}
          blendFunction={BlendFunction.NORMAL}
        />
        <DepthOfField
          focusDistance={0.01}
          focalLength={0.05}
          bokehScale={2}
        />
      </EffectComposer>
    </>
  );
}

export default function ThreeBackground() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 75 }}
      dpr={[1, isMobile ? 1.5 : 2]}
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#0A0A0A',
      }}
    >
      <Scene />
    </Canvas>
  );
}
