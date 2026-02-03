import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Text3D, Center, Environment } from '@react-three/drei';
import { useIsMobile } from '@/hooks/use-mobile';
import * as THREE from 'three';

// 3D Logo Component
const Logo3D = ({ onComplete }: { onComplete: () => void }) => {
  const [opacity, setOpacity] = useState(0);
  
  useEffect(() => {
    // Fade in
    const fadeIn = setTimeout(() => setOpacity(1), 100);
    // Trigger complete after animation
    const complete = setTimeout(() => onComplete(), 2500);
    
    return () => {
      clearTimeout(fadeIn);
      clearTimeout(complete);
    };
  }, [onComplete]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[5, -5, 5]} intensity={0.5} color="#8b5cf6" />
      
      <Center>
        <Float
          speed={2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <group>
            {/* K Letter */}
            <mesh position={[-1.2, 0, 0]}>
              <boxGeometry args={[0.8, 2, 0.3]} />
              <meshStandardMaterial 
                color="#3b82f6"
                metalness={0.8}
                roughness={0.2}
                transparent
                opacity={opacity}
              />
            </mesh>
            <mesh position={[-0.6, 0.4, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.4, 1.2, 0.3]} />
              <meshStandardMaterial 
                color="#3b82f6"
                metalness={0.8}
                roughness={0.2}
                transparent
                opacity={opacity}
              />
            </mesh>
            <mesh position={[-0.6, -0.4, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <boxGeometry args={[0.4, 1.2, 0.3]} />
              <meshStandardMaterial 
                color="#3b82f6"
                metalness={0.8}
                roughness={0.2}
                transparent
                opacity={opacity}
              />
            </mesh>
            
            {/* M Letter */}
            <mesh position={[0.6, 0, 0]}>
              <boxGeometry args={[0.3, 2, 0.3]} />
              <meshStandardMaterial 
                color="#8b5cf6"
                metalness={0.8}
                roughness={0.2}
                transparent
                opacity={opacity}
              />
            </mesh>
            <mesh position={[1.5, 0, 0]}>
              <boxGeometry args={[0.3, 2, 0.3]} />
              <meshStandardMaterial 
                color="#8b5cf6"
                metalness={0.8}
                roughness={0.2}
                transparent
                opacity={opacity}
              />
            </mesh>
            <mesh position={[1.05, 0.5, 0]} rotation={[0, 0, Math.PI / 6]}>
              <boxGeometry args={[0.3, 1, 0.3]} />
              <meshStandardMaterial 
                color="#8b5cf6"
                metalness={0.8}
                roughness={0.2}
                transparent
                opacity={opacity}
              />
            </mesh>
            <mesh position={[1.05, 0.5, 0]} rotation={[0, 0, -Math.PI / 6]}>
              <boxGeometry args={[0.3, 1, 0.3]} />
              <meshStandardMaterial 
                color="#8b5cf6"
                metalness={0.8}
                roughness={0.2}
                transparent
                opacity={opacity}
              />
            </mesh>
          </group>
        </Float>
      </Center>
      
      {/* Particles */}
      <Particles />
      
      <Environment preset="city" />
    </>
  );
};

// Particles for splash screen
const Particles = () => {
  const count = 100;
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 10;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 10;
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#3b82f6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Mobile fallback - simple animated text
const MobileSplash = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="text-6xl font-bold gradient-text-hero animate-pulse">
        KM
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
};

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const isMobile = useIsMobile();
  const [isExiting, setIsExiting] = useState(false);

  const handleComplete = () => {
    setIsExiting(true);
    setTimeout(() => onComplete(), 500);
  };

  return (
    <div 
      className={`
        fixed inset-0 z-[100] bg-background flex items-center justify-center
        transition-opacity duration-500
        ${isExiting ? 'opacity-0' : 'opacity-100'}
      `}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/30 rounded-full blur-3xl animate-pulse" />
      </div>

      {isMobile ? (
        <MobileSplash onComplete={handleComplete} />
      ) : (
        <div className="w-full h-full">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <Logo3D onComplete={handleComplete} />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* Loading text */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center">
        <p className="text-muted-foreground text-sm animate-pulse">Loading portfolio...</p>
      </div>
    </div>
  );
};

export default SplashScreen;
