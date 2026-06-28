import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { playClick, playHover } from '@/lib/audio';
import { Rocket, ChevronRight } from 'lucide-react';
interface SplashScreenProps {
  onComplete: () => void;
  onTransitionStart: () => void;
  onGateShow: () => void;
}

const SplashScreen = ({ onComplete, onTransitionStart, onGateShow }: SplashScreenProps) => {
  const isMobile = useIsMobile();
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowGate(true);
            onGateShow();
          }, 300); // Breathe gap
          return 100;
        }
        return prev + 2.5; // Smooth incremental load
      });
    }, 30);

    return () => {
      clearInterval(interval);
    };
  }, [onGateShow]);

  const handleEnterPortfolio = async () => {
    playClick();

    // Trigger full screen mode across all browsers
    try {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        await docEl.requestFullscreen();
      } else if ((docEl as any).mozRequestFullScreen) { /* Firefox */
        await (docEl as any).mozRequestFullScreen();
      } else if ((docEl as any).webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        await (docEl as any).webkitRequestFullscreen();
      } else if ((docEl as any).msRequestFullscreen) { /* IE/Edge */
        await (docEl as any).msRequestFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen request bypassed by user/browser settings:", err);
    }

    // Start exit transition
    onTransitionStart();
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 2200); // 2.2 seconds total transition delay to let background zoom & fog load
  };

  return (
    <div 
      className={`
        fixed inset-0 z-[100] flex flex-col items-center justify-center select-none overflow-hidden
        transition-all duration-1000 ease-in-out
        ${showGate ? 'bg-transparent' : 'bg-[#090d16]'}
        ${isExiting ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}
      `}
    >
      {/* Self-contained styling for custom animations (scroll wheel, perspective grid) */}
      <style>{`
        @keyframes scroll-wheel-anim {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.3; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-scroll-wheel {
          animation: scroll-wheel-anim 1.6s ease-in-out infinite;
        }
        @keyframes horizon-glow-anim {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .animate-horizon-glow {
          animation: horizon-glow-anim 3s ease-in-out infinite;
        }
      `}</style>

 
      {/* Background neon ambient mesh highlights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Left Side Cyan Mesh */}
        <div className="absolute left-[-15%] top-[25%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-cyan-500/10 rounded-full blur-[100px] sm:blur-[130px] animate-pulse" />
        {/* Right Side Purple Mesh */}
        <div className="absolute right-[-15%] top-[25%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-purple-500/10 rounded-full blur-[100px] sm:blur-[130px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* 3D Perspective Grid Floor at bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[32%] bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:36px_36px] [transform:perspective(480px)_rotateX(62deg)_translateY(40px)] origin-bottom opacity-40 sm:opacity-50 pointer-events-none" 
      />
      {/* Glowing Horizon Line */}
      <div className="absolute bottom-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent pointer-events-none animate-horizon-glow" />

      <div className="relative z-10 flex flex-col items-center justify-center max-w-3xl px-6 text-center w-full">
        {!showGate ? (
          /* SECTION 1: CORE INITIALIZING LOADER */
          <div className="flex flex-col items-center gap-8 animate-fade-in">
            {/* Animated circles loader */}
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <div className="absolute inset-2 border-4 border-primary/30 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
            </div>

            {/* Tagline */}
            <div className="flex items-center gap-2.5 text-xs sm:text-sm uppercase tracking-widest font-mono font-medium text-white/90">
              <span>create</span>
              <span className="text-cyan-400 animate-pulse">•</span>
              <span>learn</span>
              <span className="text-cyan-400 animate-pulse">•</span>
              <span>build</span>
            </div>

            {/* Progress bar */}
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full gradient-hero transition-all duration-100 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-white/60 text-[10px] font-mono tracking-wider uppercase animate-pulse">Initializing Interface...</p>
          </div>
        ) : (
          /* SECTION 2: THE IMMERSIVE ENTER GATE SCREEN */
          <div className="flex flex-col items-center justify-center w-full animate-scale-in">
            
            {/* 1. Welcome Tagline Header */}
            <div className="flex items-center justify-center gap-4 w-full max-w-md mb-4 sm:mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20" />
              <span className="text-[10px] sm:text-xs font-mono font-black text-white/90 tracking-[0.35em] uppercase whitespace-nowrap pl-1 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                WELCOME TO MY PORTFOLIO
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20" />
            </div>

            {/* 2. Full Name Typography */}
            <div className="space-y-1 mb-2 sm:mb-4">
              <h1 className="text-3xl xs:text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-[0.12em] uppercase select-none leading-none font-mono">
                KANYABOYINA
              </h1>
              <h1 className="text-4xl xs:text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-[0.15em] uppercase select-none leading-none bg-gradient-to-r from-cyan-400 via-primary-hover to-purple-500 bg-clip-text text-transparent filter drop-shadow-[0_0_25px_rgba(59,130,246,0.3)]">
                MANISH
              </h1>
            </div>

            {/* 3. Developer Tagline Framer Representing •━━━━━━• */}
            <div className="flex items-center justify-center gap-3 w-full max-w-md my-3 sm:my-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="h-0.5 w-10 sm:w-16 bg-gradient-to-r from-transparent to-cyan-500/40 relative flex items-center justify-end">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 absolute -right-0.5 shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-cyan-400 tracking-[0.45em] uppercase font-mono whitespace-nowrap pl-1">
                FULL STACK DEVELOPER
              </span>
              <div className="h-0.5 w-10 sm:w-16 bg-gradient-to-l from-transparent to-cyan-500/40 relative flex items-center justify-start">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 absolute -left-0.5 shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
              </div>
            </div>

            {/* 4. Skills Triad Separated by Pipes */}
            <div className="flex items-center gap-2.5 sm:gap-4 justify-center text-[9px] sm:text-xs font-mono font-bold text-white/80 tracking-widest uppercase mb-6 sm:mb-10 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <span>AI/ML ENTHUSIAST</span>
              <span className="text-white/20 font-light">|</span>
              <span>PROBLEM SOLVER</span>
              <span className="text-white/20 font-light">|</span>
              <span>INNOVATOR</span>
            </div>

            {/* 5. Custom Capsule [ ENTER PORTFOLIO > ] Button Wrapper */}
            <div className="relative rounded-full p-[1.5px] bg-gradient-to-r from-cyan-500 via-primary to-purple-500 shadow-glow transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.45)] hover:scale-105 active:scale-95 animate-fade-in group" style={{ animationDelay: '400ms' }}>
              <button
                onClick={handleEnterPortfolio}
                onMouseEnter={playHover}
                className="px-10 py-4 rounded-full bg-background/95 hover:bg-background/25 text-foreground hover:text-white font-black font-mono tracking-[0.2em] text-xs sm:text-sm uppercase flex items-center justify-center gap-3.5 transition-colors duration-300 w-full cursor-pointer relative z-10"
              >
                <Rocket className="h-4.5 w-4.5 text-cyan-400 group-hover:animate-bounce" />
                <span>ENTER PORTFOLIO</span>
                <ChevronRight className="h-4.5 w-4.5 text-purple-400 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* 6. Discover explore experience tagline */}
            <p className="text-[9px] sm:text-[10px] font-mono font-bold text-white/60 tracking-[0.3em] uppercase mt-6 sm:mt-12 animate-fade-in" style={{ animationDelay: '500ms' }}>
              DISCOVER  •  EXPLORE  •  EXPERIENCE
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;
