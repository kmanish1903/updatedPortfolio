import { useMemo } from 'react';
import splashBg from '@/assets/splash-background.jpg';
import splashBgMobile from '@/assets/splash-background-mobile.jpg';

interface EnvConfig {
  scale: string;
  brightness: string;
  fogOpacity: number;
  overlayOpacity: number;
  gradientClass: string;
  particleType: 'none' | 'sunset' | 'golden' | 'blue' | 'stars' | 'aurora' | 'sunrise';
}

const ENV_CONFIGS: Record<string, EnvConfig> = {
  loading: {
    scale: 'scale-100',
    brightness: 'brightness-[0.1]',
    fogOpacity: 0,
    overlayOpacity: 0.95,
    gradientClass: 'opacity-0',
    particleType: 'none',
  },
  gateway: {
    scale: 'scale-100',
    brightness: 'brightness-100',
    fogOpacity: 0.05,
    overlayOpacity: 0,
    gradientClass: 'bg-gradient-to-t from-orange-500/5 via-transparent to-transparent opacity-30',
    particleType: 'sunset',
  },
  transitioning: {
    scale: 'scale-108',
    brightness: 'brightness-95',
    fogOpacity: 0.3,
    overlayOpacity: 0.35,
    gradientClass: 'bg-gradient-to-tr from-amber-500/10 via-purple-900/15 to-transparent mix-blend-overlay opacity-100',
    particleType: 'golden',
  },
  about: {
    scale: 'scale-108',
    brightness: 'brightness-95',
    fogOpacity: 0.3,
    overlayOpacity: 0.55,
    gradientClass: 'bg-gradient-to-tr from-amber-500/10 via-purple-900/15 to-transparent mix-blend-overlay opacity-100',
    particleType: 'golden',
  },
  projects: {
    scale: 'scale-112',
    brightness: 'brightness-90',
    fogOpacity: 0.5,
    overlayOpacity: 0.65,
    gradientClass: 'bg-gradient-to-tr from-blue-600/15 via-cyan-900/10 to-transparent mix-blend-color-dodge opacity-100',
    particleType: 'blue',
  },
  skills: {
    scale: 'scale-116',
    brightness: 'brightness-95',
    fogOpacity: 0.15,
    overlayOpacity: 0.45,
    gradientClass: 'bg-gradient-to-tr from-indigo-950/10 via-purple-900/10 to-transparent mix-blend-overlay opacity-100',
    particleType: 'stars',
  },
  certificates: {
    scale: 'scale-120',
    brightness: 'brightness-85',
    fogOpacity: 0.05,
    overlayOpacity: 0.50,
    gradientClass: 'bg-gradient-to-tr from-emerald-500/10 via-teal-900/10 to-transparent mix-blend-color-dodge opacity-100',
    particleType: 'aurora',
  },
  contact: {
    scale: 'scale-124',
    brightness: 'brightness-95',
    fogOpacity: 0.25,
    overlayOpacity: 0.40,
    gradientClass: 'bg-gradient-to-tr from-orange-500/15 via-rose-500/10 to-transparent mix-blend-overlay opacity-100',
    particleType: 'sunrise',
  },
};

const PARTICLE_PRESETS: Record<string, { colorClass: string; animationClass: string }> = {
  none: { colorClass: 'opacity-0', animationClass: '' },
  sunset: { colorClass: 'bg-orange-400 opacity-20', animationClass: 'animate-float-slow' },
  golden: { colorClass: 'bg-amber-400 opacity-40', animationClass: 'animate-float-medium' },
  blue: { colorClass: 'bg-cyan-400 opacity-30 shadow-[0_0_8px_rgba(34,211,238,0.4)]', animationClass: 'animate-float-fast' },
  stars: { colorClass: 'bg-white opacity-85', animationClass: 'animate-twinkle' },
  aurora: { colorClass: 'bg-emerald-300 opacity-40 shadow-[0_0_8px_rgba(110,231,183,0.3)]', animationClass: 'animate-float-slow' },
  sunrise: { colorClass: 'bg-amber-500 opacity-45 shadow-[0_0_6px_rgba(245,158,11,0.2)]', animationClass: 'animate-float-medium' },
};

// Fixed positions for particles to guarantee zero rendering flicker
const STATIC_PARTICLES = [
  { id: 1, top: '22%', left: '15%', size: 'w-1 sm:w-1.5 h-1 sm:h-1.5', delay: '0s', duration: '9s' },
  { id: 2, top: '35%', left: '45%', size: 'w-1.5 sm:w-2 h-1.5 sm:h-2', delay: '2s', duration: '14s' },
  { id: 3, top: '15%', left: '72%', size: 'w-0.5 sm:w-1 h-0.5 sm:h-1', delay: '1s', duration: '11s' },
  { id: 4, top: '55%', left: '85%', size: 'w-2 sm:w-2.5 h-2 sm:h-2.5', delay: '3.5s', duration: '16s' },
  { id: 5, top: '48%', left: '28%', size: 'w-1 sm:w-1.5 h-1 sm:h-1.5', delay: '0.8s', duration: '10s' },
  { id: 6, top: '75%', left: '18%', size: 'w-1.5 sm:w-2 h-1.5 sm:h-2', delay: '1.5s', duration: '12s' },
  { id: 7, top: '65%', left: '60%', size: 'w-1 sm:w-1.5 h-1 sm:h-1.5', delay: '2.5s', duration: '13s' },
  { id: 8, top: '28%', left: '33%', size: 'w-0.5 sm:w-1 h-0.5 sm:h-1', delay: '3s', duration: '8s' },
  { id: 9, top: '82%', left: '76%', size: 'w-1.5 sm:w-2.5 h-1.5 sm:h-2.5', delay: '1.2s', duration: '17s' },
  { id: 10, top: '42%', left: '92%', size: 'w-1 sm:w-1.5 h-1 sm:h-1.5', delay: '0.2s', duration: '9s' },
  { id: 11, top: '18%', left: '26%', size: 'w-1 sm:w-1.5 h-1 sm:h-1.5', delay: '2.8s', duration: '11s' },
  { id: 12, top: '60%', left: '38%', size: 'w-1.5 sm:w-2 h-1.5 sm:h-2', delay: '1.7s', duration: '15s' },
  { id: 13, top: '78%', left: '50%', size: 'w-1 sm:w-1.5 h-1 sm:h-1.5', delay: '0.5s', duration: '12s' },
  { id: 14, top: '30%', left: '80%', size: 'w-0.5 sm:w-1 h-0.5 sm:h-1', delay: '2.2s', duration: '10s' },
];

interface CinematicBackgroundProps {
  stage: 'loading' | 'gateway' | 'transitioning' | 'active';
  activeSection?: 'about' | 'projects' | 'skills' | 'certificates' | 'contact';
  scrollY: number;
  isMobile: boolean;
}

const CinematicBackground = ({ stage, activeSection = 'about', scrollY, isMobile }: CinematicBackgroundProps) => {
  const currentKey = stage === 'active' ? activeSection : stage;
  const config = ENV_CONFIGS[currentKey] || ENV_CONFIGS.loading;
  
  const backgroundSrc = isMobile ? splashBgMobile : splashBg;
  const particlePreset = PARTICLE_PRESETS[config.particleType] || PARTICLE_PRESETS.none;

  // Parallax translation transforms calculations
  const cloudParallaxStyle1 = useMemo(() => ({
    transform: `translate3d(${scrollY * 0.04}px, 0, 0)`,
  }), [scrollY]);

  const cloudParallaxStyle2 = useMemo(() => ({
    transform: `translate3d(${scrollY * -0.02}px, 0, 0)`,
  }), [scrollY]);

  const fogParallaxStyle = useMemo(() => ({
    transform: `translate3d(0, ${scrollY * -0.03}px, 0)`,
  }), [scrollY]);

  const particleParallaxStyle = useMemo(() => ({
    transform: `translate3d(0, ${scrollY * -0.08}px, 0)`,
  }), [scrollY]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#090d16] select-none">
      {/* 1. Fallback Image Background Layer */}
      <div 
        className={`absolute inset-0 bg-cover bg-center pointer-events-none ${config.scale} ${config.brightness}`}
        style={{
          backgroundImage: `url(${backgroundSrc})`,
        }}
      />

      {/* 2. Video Background Layer - only active on large screens after entering portfolio */}
      {stage !== 'gateway' && stage !== 'loading' && !isMobile && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-cinematic pointer-events-none animate-fade-in ${config.scale} ${config.brightness}`}
          style={{ animationDuration: '2.5s' }}
        >
          <source src="/new_bg_video.mp4" type="video/mp4" />
        </video>
      )}

      {/* 2. mix-blend Color Tint Grading Overlay */}
      <div className={`absolute inset-0 pointer-events-none transition-cinematic ${config.gradientClass}`} />

      {/* 3. Drifting Clouds Parallax Layers */}
      {stage !== 'loading' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-90 transition-opacity duration-1000">
          <div 
            style={cloudParallaxStyle1}
            className="absolute top-[8%] left-[-30%] w-[75%] h-[20%] bg-white/5 rounded-full blur-[75px] sm:blur-[90px] animate-cloud-drift-slow transition-transform duration-100 ease-out" 
          />
          <div 
            style={cloudParallaxStyle2}
            className="absolute top-[12%] right-[-25%] w-[65%] h-[15%] bg-white/5 rounded-full blur-[60px] sm:blur-[75px] animate-cloud-drift-fast transition-transform duration-100 ease-out" 
          />
        </div>
      )}

      {/* 4. Drifting Valley Floor Fog Layer */}
      <div 
        className="absolute bottom-[20%] left-0 right-0 h-[18%] bg-gradient-to-t from-transparent via-white/5 to-transparent blur-[35px] pointer-events-none transition-cinematic"
        style={{
          ...fogParallaxStyle,
          opacity: config.fogOpacity,
          transitionDelay: stage === 'transitioning' ? '800ms' : '0s'
        }}
      />

      {/* 5. Star Twinkles & Drifting Particles Layer */}
      <div 
        className="absolute inset-0 pointer-events-none transition-cinematic"
        style={{
          ...particleParallaxStyle,
          opacity: config.particleType !== 'none' ? 1 : 0,
          transitionDelay: stage === 'transitioning' ? '1800ms' : '0s'
        }}
      >
        {STATIC_PARTICLES.map((p) => (
          <div 
            key={p.id}
            className={`absolute rounded-full ${p.size} ${particlePreset.colorClass} ${particlePreset.animationClass} transition-all duration-1000`}
            style={{
              top: p.top,
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* 6. Special Aurora Waves Overlay (Certificates screen only) */}
      {currentKey === 'certificates' && (
        <div className="absolute inset-x-0 top-0 h-[50%] opacity-20 pointer-events-none animate-aurora-wave animate-fade-in bg-gradient-to-tr from-emerald-500/20 via-cyan-500/10 to-transparent blur-[50px]" />
      )}

      {/* 7. Readability Dark Overlay Layer */}
      <div 
        className="absolute inset-0 bg-[#090d16] pointer-events-none transition-cinematic-opacity"
        style={{ 
          opacity: config.overlayOpacity,
          transitionDelay: stage === 'transitioning' ? '2000ms' : '0s'
        }}
      />
    </div>
  );
};

export default CinematicBackground;
