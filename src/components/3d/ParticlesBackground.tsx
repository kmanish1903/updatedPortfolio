import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/use-mobile';

const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 20;
      pos[i + 1] = (Math.random() - 0.5) * 20;
      pos[i + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    const color1 = new THREE.Color('#3b82f6');
    const color2 = new THREE.Color('#8b5cf6');
    
    for (let i = 0; i < count * 3; i += 3) {
      const mixRatio = Math.random();
      const mixed = color1.clone().lerp(color2, mixRatio);
      cols[i] = mixed.r;
      cols[i + 1] = mixed.g;
      cols[i + 2] = mixed.b;
    }
    return cols;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
      
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(state.clock.elapsedTime + i) * 0.002;
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
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const ParticlesBackground = () => {
  const isMobile = useIsMobile();
  
  // Don't render 3D particles on mobile for performance
  if (isMobile) {
    return null;
  }

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: false,
          alpha: true,
          powerPreference: 'low-power'
        }}
        style={{ background: 'transparent' }}
      >
        <FloatingParticles />
      </Canvas>
    </div>
  );
};

export default ParticlesBackground;
