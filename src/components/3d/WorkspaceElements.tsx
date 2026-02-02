import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

// Monitor Component
export const Monitor = () => {
  const screenRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (screenRef.current) {
      const material = screenRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group position={[0, 1.2, 0]}>
      {/* Monitor Frame */}
      <RoundedBox args={[2.4, 1.5, 0.1]} radius={0.05} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      
      {/* Monitor Screen */}
      <mesh ref={screenRef} position={[0, 0, 0.06]}>
        <planeGeometry args={[2.2, 1.3]} />
        <meshStandardMaterial 
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Code on screen */}
      <Text
        position={[0, 0.2, 0.07]}
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {'<Developer />'}
      </Text>
      <Text
        position={[0, -0.1, 0.07]}
        fontSize={0.08}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
        Building the future...
      </Text>
      
      {/* Monitor Stand Neck */}
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.3, 16]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Monitor Stand Base */}
      <mesh position={[0, -1.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

// Desk Component
export const Desk = () => {
  return (
    <group position={[0, -0.15, 0]}>
      {/* Desk Surface */}
      <RoundedBox args={[4, 0.1, 2]} radius={0.02} position={[0, 0, 0]}>
        <meshStandardMaterial color="#2d1f1a" roughness={0.7} />
      </RoundedBox>
      
      {/* Desk Legs */}
      {[[-1.7, -0.55, 0.7], [1.7, -0.55, 0.7], [-1.7, -0.55, -0.7], [1.7, -0.55, -0.7]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[0.08, 1, 0.08]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
};

// Keyboard Component
export const Keyboard = () => {
  return (
    <group position={[0, 0, 0.5]}>
      <RoundedBox args={[1.2, 0.05, 0.4]} radius={0.02}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.5} />
      </RoundedBox>
      {/* Keys simulation */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={i} position={[-0.5 + i * 0.09, 0.03, 0]}>
          <boxGeometry args={[0.06, 0.02, 0.06]} />
          <meshStandardMaterial color="#2a2a3e" />
        </mesh>
      ))}
    </group>
  );
};

// Mouse Component
export const Mouse = () => {
  return (
    <group position={[0.9, 0, 0.5]}>
      <RoundedBox args={[0.15, 0.06, 0.25]} radius={0.03}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.4} roughness={0.4} />
      </RoundedBox>
      {/* Mouse wheel */}
      <mesh position={[0, 0.04, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.03, 16]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
};

// Coffee Mug Component
export const CoffeeMug = () => {
  return (
    <group position={[-1.3, 0.15, 0.3]}>
      {/* Mug body */}
      <mesh>
        <cylinderGeometry args={[0.1, 0.08, 0.2, 16]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.3} />
      </mesh>
      {/* Coffee inside */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
        <meshStandardMaterial color="#3d2314" />
      </mesh>
      {/* Handle */}
      <mesh position={[0.12, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.06, 0.02, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.3} />
      </mesh>
    </group>
  );
};

// Plant Component
export const Plant = () => {
  return (
    <group position={[1.5, 0.2, -0.3]}>
      {/* Pot */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.1, 0.15, 16]} />
        <meshStandardMaterial color="#d97706" roughness={0.8} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
        <meshStandardMaterial color="#3d2314" />
      </mesh>
      {/* Leaves */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[
            Math.sin(i * 1.2) * 0.08,
            0.18 + i * 0.04,
            Math.cos(i * 1.2) * 0.08
          ]}
        >
          <sphereGeometry args={[0.06 - i * 0.008, 8, 8]} />
          <meshStandardMaterial color="#22c55e" />
        </mesh>
      ))}
    </group>
  );
};

// Floating Code Symbols
export const FloatingCode = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const symbols = ['< />', '{ }', '( )', '[ ]'];
  
  return (
    <group ref={groupRef}>
      {symbols.map((symbol, i) => (
        <Float
          key={i}
          speed={2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
          position={[
            Math.sin(i * Math.PI / 2) * 2.5,
            0.5 + Math.sin(i) * 0.3,
            Math.cos(i * Math.PI / 2) * 2.5
          ]}
        >
          <Text
            fontSize={0.2}
            color="#3b82f6"
            anchorX="center"
            anchorY="middle"
          >
            {symbol}
          </Text>
        </Float>
      ))}
    </group>
  );
};

// Ambient Particles
export const AmbientParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 50;
  
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 6;
    positions[i + 1] = Math.random() * 3 - 0.5;
    positions[i + 2] = (Math.random() - 0.5) * 4;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#3b82f6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};
