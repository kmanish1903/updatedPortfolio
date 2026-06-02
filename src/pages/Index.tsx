import { useState, useEffect, lazy, Suspense } from 'react';
import Header from '@/components/portfolio/Header';
import Hero from '@/components/portfolio/Hero';
import Stats from '@/components/portfolio/Stats';
import Projects from '@/components/portfolio/Projects';
import Skills from '@/components/portfolio/Skills';
import Certificates from '@/components/portfolio/Certificates';
import Contact from '@/components/portfolio/Contact';
import ScrollProgress from '@/components/portfolio/ScrollProgress';
import { useIsMobile } from '@/hooks/use-mobile';
import InteractiveCursor from '@/components/3d/InteractiveCursor';

const SplashScreen = lazy(() => import('@/components/3d/SplashScreen'));
const ParticlesBackground = lazy(() => import('@/components/3d/ParticlesBackground'));

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Check if user has visited before in this session
    const visited = sessionStorage.getItem('hasVisited');
    if (visited) {
      setShowSplash(false);
      setHasVisited(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('hasVisited', 'true');
    setHasVisited(true);
  };

  return (
    <div className="min-h-screen bg-[#090d16]">
      {/* Global Interactive Cursor Particle Trail */}
      <InteractiveCursor />

      {showSplash ? (
        <Suspense fallback={
          <div className="fixed inset-0 z-[100] bg-[#090d16] flex flex-col items-center justify-center select-none overflow-hidden">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        }>
          <SplashScreen onComplete={handleSplashComplete} />
        </Suspense>
      ) : (
        <>
          {/* Particles Background - desktop only */}
          {!isMobile && (
            <Suspense fallback={null}>
              <ParticlesBackground />
            </Suspense>
          )}

          <ScrollProgress />
          <Header />
          <main>
            <Hero />
            <Stats />
            <Projects />
            <Skills />
            <Certificates />
            <Contact />
          </main>
        </>
      )}
    </div>
  );
};

export default Index;
