import { useState, useEffect, lazy, Suspense } from 'react';
import Header from '@/components/portfolio/Header';
import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import Stats from '@/components/portfolio/Stats';
import Projects from '@/components/portfolio/Projects';
import Skills from '@/components/portfolio/Skills';
import Certificates from '@/components/portfolio/Certificates';
import Contact from '@/components/portfolio/Contact';
import ScrollProgress from '@/components/portfolio/ScrollProgress';
import { useIsMobile } from '@/hooks/use-mobile';

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
    <div className="min-h-screen">
      {/* 3D Splash Screen - only on first visit */}
      {showSplash && (
        <Suspense fallback={null}>
          <SplashScreen onComplete={handleSplashComplete} />
        </Suspense>
      )}

      {/* Particles Background - desktop only */}
      {!isMobile && !showSplash && (
        <Suspense fallback={null}>
          <ParticlesBackground />
        </Suspense>
      )}

      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <About />
        <Stats />
        <Projects />
        <Skills />
        <Certificates />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
