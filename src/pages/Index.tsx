import { useState, useEffect, lazy, Suspense } from 'react';
import Header from '@/components/portfolio/Header';
import Hero from '@/components/portfolio/Hero';
import Projects from '@/components/portfolio/Projects';
import Skills from '@/components/portfolio/Skills';
import Certificates from '@/components/portfolio/Certificates';
import Contact from '@/components/portfolio/Contact';
import ScrollProgress from '@/components/portfolio/ScrollProgress';
import { useIsMobile } from '@/hooks/use-mobile';
import InteractiveCursor from '@/components/3d/InteractiveCursor';
import CinematicBackground from '@/components/3d/CinematicBackground';

const SplashScreen = lazy(() => import('@/components/3d/SplashScreen'));
const ParticlesBackground = lazy(() => import('@/components/3d/ParticlesBackground'));

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);
  const [portfolioState, setPortfolioState] = useState<'loading' | 'gateway' | 'transitioning' | 'active'>('loading');
  const [activeSection, setActiveSection] = useState<'about' | 'projects' | 'skills' | 'certificates' | 'contact'>('about');
  const [scrollY, setScrollY] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Check if user has visited before in this session
    const visited = sessionStorage.getItem('hasVisited');
    if (visited) {
      setShowSplash(false);
      setHasVisited(true);
      setPortfolioState('active');
    }
  }, []);

  useEffect(() => {
    if (portfolioState !== 'active') return;

    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Detect active section based on half-viewport threshold
      const sections = ['about', 'projects', 'skills', 'certificates', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight * 0.45;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId as any);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [portfolioState]);

  useEffect(() => {
    if (showSplash) return;

    const timer = setTimeout(() => {
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // Trigger reveal slightly before it is fully in view
        threshold: 0.05,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            observer.unobserve(entry.target); // Trigger only once
          }
        });
      }, observerOptions);

      const revealElements = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-scale'
      );
      revealElements.forEach((el) => observer.observe(el));

      return () => {
        observer.disconnect();
      };
    }, 150); // Short delay to ensure browser paints DOM

    return () => clearTimeout(timer);
  }, [showSplash]);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('hasVisited', 'true');
    setHasVisited(true);
    setPortfolioState('active');
  };

  const handleTransitionStart = () => {
    setPortfolioState('transitioning');
  };

  const handleGateShow = () => {
    setPortfolioState('gateway');
  };

  return (
    <div className="min-h-screen bg-[#090d16]">
      {/* Global Interactive Cursor Particle Trail */}
      <InteractiveCursor />

      {/* Global Cinematic Mountain Landscape Background */}
      <CinematicBackground 
        stage={portfolioState} 
        activeSection={activeSection} 
        scrollY={scrollY} 
        isMobile={isMobile} 
      />

      {showSplash ? (
        <Suspense fallback={
          <div className="fixed inset-0 z-[100] bg-[#090d16] flex flex-col items-center justify-center select-none overflow-hidden">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        }>
          <SplashScreen 
            onComplete={handleSplashComplete} 
            onTransitionStart={handleTransitionStart}
            onGateShow={handleGateShow}
          />
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
          
          <main className="relative z-10">
            <Hero />
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
