import { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Monitor,
  Desk,
  Keyboard,
  Mouse,
  CoffeeMug,
  Plant,
  FloatingCode,
  AmbientParticles
} from './WorkspaceElements';

const Scene = () => {
  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[3, 2, 4]} fov={45} />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <pointLight position={[-2, 2, 2]} intensity={0.3} color="#3b82f6" />
      <pointLight position={[2, 1, -2]} intensity={0.2} color="#8b5cf6" />
      
      {/* Controls */}
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />
      
      {/* Workspace Elements */}
      <group position={[0, -0.5, 0]}>
        <Monitor />
        <Desk />
        <Keyboard />
        <Mouse />
        <CoffeeMug />
        <Plant />
        <FloatingCode />
        <AmbientParticles />
      </group>
      
      {/* Environment */}
      <Environment preset="city" />
    </>
  );
};

const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center bg-background/50 rounded-xl">
    <div className="text-center space-y-4">
      <div className="relative w-16 h-16 mx-auto">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="text-muted-foreground text-sm">Loading 3D Workspace...</p>
    </div>
  </div>
);

const DeveloperWorkspace = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`relative ${isMobile ? 'h-[300px]' : 'h-[500px]'} w-full`}>
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          shadows
          dpr={1}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: isMobile ? 'low-power' : 'high-performance'
          }}
          style={{ background: 'transparent' }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default DeveloperWorkspace;
