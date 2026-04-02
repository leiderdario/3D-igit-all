'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

interface FloatingHardwareProps {
  scrollProgress: React.MutableRefObject<number>;
}

// Circuit Board Component
function CircuitBoard({ position, scale = 1, rotationSpeed = 0.5 }: { position: [number, number, number]; scale?: number; rotationSpeed?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const circuitTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    
    // Dark green background
    ctx.fillStyle = '#0a1a0a';
    ctx.fillRect(0, 0, 256, 256);
    
    // Draw circuit lines
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    
    // Horizontal lines
    for (let y = 20; y < 256; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      let x = 0;
      while (x < 256) {
        const length = 20 + Math.random() * 60;
        ctx.lineTo(x + length, y);
        x += length;
        if (Math.random() > 0.5 && x < 230) {
          const turn = (Math.random() > 0.5 ? 1 : -1) * 20;
          ctx.lineTo(x, y + turn);
          ctx.lineTo(x + 20, y + turn);
          x += 20;
        }
      }
      ctx.stroke();
    }
    
    // Draw components
    ctx.fillStyle = '#333';
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * 220 + 20;
      const y = Math.random() * 220 + 20;
      const size = 8 + Math.random() * 12;
      ctx.fillRect(x, y, size, size);
      
      // Pins
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(x - 2, y + size / 2 - 1, 2, 2);
      ctx.fillRect(x + size, y + size / 2 - 1, 2, 2);
      ctx.fillStyle = '#333';
    }
    
    // Chip
    ctx.fillStyle = '#111';
    ctx.fillRect(80, 80, 96, 96);
    ctx.fillStyle = '#333';
    for (let i = 0; i < 8; i++) {
      ctx.fillRect(75, 80 + i * 12, 5, 6);
      ctx.fillRect(176, 80 + i * 12, 5, 6);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.getElapsedTime() * rotationSpeed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={position} scale={scale}>
        <mesh>
          <boxGeometry args={[2, 1.5, 0.05]} />
          <meshStandardMaterial
            map={circuitTexture}
            emissive="#001100"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
        {/* Glowing LED */}
        <mesh position={[0.5, 0.3, 0.03]}>
          <circleGeometry args={[0.08, 16]} />
          <meshBasicMaterial color="#00ff00" />
        </mesh>
        <mesh position={[-0.5, 0.3, 0.03]}>
          <circleGeometry args={[0.06, 16]} />
          <meshBasicMaterial color="#ff0000" />
        </mesh>
      </group>
    </Float>
  );
}

// Server Rack Component
function ServerRack({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Main body */}
        <mesh>
          <boxGeometry args={[0.8, 2.5, 0.4]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Server slots */}
        {[...Array(5)].map((_, i) => (
          <group key={i} position={[0, 0.9 - i * 0.45, 0.21]}>
            <mesh>
              <boxGeometry args={[0.6, 0.35, 0.02]} />
              <meshStandardMaterial color="#0d0d15" metalness={0.8} roughness={0.3} />
            </mesh>
            {/* LED lights */}
            <mesh position={[-0.2, 0, 0.02]}>
              <circleGeometry args={[0.02, 8]} />
              <meshBasicMaterial color="#00ff00" />
            </mesh>
            <mesh position={[0, 0, 0.02]}>
              <circleGeometry args={[0.02, 8]} />
              <meshBasicMaterial color="#00ff00" />
            </mesh>
            <mesh position={[0.2, 0, 0.02]}>
              <circleGeometry args={[0.02, 8]} />
              <meshBasicMaterial color="#00f0ff" />
            </mesh>
          </group>
        ))}
        {/* Ventilation */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.6, 1.5, 0.02]} />
          <meshStandardMaterial color="#0a0a15" metalness={0.8} roughness={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

// GPU/Chip Component
function GPUChip({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.4;
      groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Main chip */}
        <mesh>
          <boxGeometry args={[1.2, 1.2, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Heat spreader */}
        <mesh position={[0, 0, 0.1]}>
          <boxGeometry args={[0.8, 0.8, 0.05]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Pins */}
        {[...Array(8)].map((_, i) => (
          <group key={i}>
            <mesh position={[-0.5 + i * 0.14, 0.7, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.1, 8]} />
              <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[-0.5 + i * 0.14, -0.7, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.1, 8]} />
              <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        ))}
        {/* RGB strip */}
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[1.25, 0.05, 0.02]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>
      </group>
    </Float>
  );
}

export default function FloatingHardware({ scrollProgress }: FloatingHardwareProps) {
  const hardwareRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (hardwareRef.current) {
      // Subtle parallax based on scroll
      hardwareRef.current.position.y = -scrollProgress.current * 5;
      hardwareRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={hardwareRef}>
      {/* Circuit Boards */}
      <CircuitBoard position={[-8, 2, -5]} scale={1.5} rotationSpeed={0.3} />
      <CircuitBoard position={[7, -3, -8]} scale={1.2} rotationSpeed={0.4} />
      <CircuitBoard position={[-5, -8, -6]} scale={1} rotationSpeed={0.6} />
      
      {/* Server Racks */}
      <ServerRack position={[6, 4, -7]} scale={1.3} />
      <ServerRack position={[-7, -5, -9]} scale={1.1} />
      
      {/* GPU/Chips */}
      <GPUChip position={[5, -2, -6]} scale={1.2} />
      <GPUChip position={[-6, 5, -8]} scale={0.8} />
      <GPUChip position={[8, 1, -10]} scale={1} />
      
      {/* Additional circuit boards at different angles */}
      <group position={[0, 0, -12]} rotation={[0.3, 0.5, 0.2]}>
        <CircuitBoard position={[0, 0, 0]} scale={2} rotationSpeed={0.2} />
      </group>
    </group>
  );
}
