import { useState, useRef, useEffect } from 'react';
import mindcareOverview from '@/assets/mindcare-overview.png';
import mindcareAuth from '@/assets/mindcare-auth.jpg';
import mindcareDashboard from '@/assets/mindcare-dashboard.jpg';
import mindcareAnalytics from '@/assets/mindcare-analytics.jpg';
import mindcareSupport from '@/assets/mindcare-support.jpg';
import { playHover, playClick } from '@/lib/audio';
import { Layers } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const MindCareShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const isMobile = useIsMobile();

  // Global mousemove tracker: even a tiny mouse movement anywhere on the screen tilts and skews the showcase!
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      // Normalized coordinates relative to window bounds (-0.5 to 0.5)
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

  // Staggered 3D circular orbiting coordinates, widely spread to fill the entire container with elegant spacing!
  const cards = [
    // === CENTERPIECE (01 Landing Page) ===
    {
      id: 1,
      num: '01',
      name: 'Landing Page',
      image: mindcareOverview,
      style: {
        width: '50%',
        maxWidth: '480px', // Enlarged centerpiece card
        zIndex: 35, // topmost centerpiece card
        top: '50%',
        left: '50%',
        baseRotateX: 4,
        baseRotateY: 8,
        baseRotateZ: 0,
        baseTranslateZ: 35, // Rest closer to the viewer
        parallaxFactor: 0.1,
        glowColor: '168, 85, 247', // Purple
      },
    },
    // === TOP LEFT (02 Login Page) ===
    {
      id: 2,
      num: '02',
      name: 'Login Page',
      image: mindcareAuth,
      style: {
        width: '32%',
        maxWidth: '300px', // Enlarged orbiting card
        zIndex: 20,
        top: '15%',
        left: '16%', // Pushed further left and top to fill boundary
        baseRotateX: 12,
        baseRotateY: -22,
        baseRotateZ: -2,
        baseTranslateZ: 10,
        parallaxFactor: 0.28,
        glowColor: '59, 130, 246', // Blue
      },
    },
    // === TOP CENTER (03 Dashboard) ===
    {
      id: 3,
      num: '03',
      name: 'Dashboard',
      image: mindcareDashboard,
      style: {
        width: '32%',
        maxWidth: '300px',
        zIndex: 18,
        top: '12%',
        left: '50%', // Balanced center-top
        baseRotateX: 15,
        baseRotateY: -5,
        baseRotateZ: 0,
        baseTranslateZ: 5, // Back layer
        parallaxFactor: 0.18,
        glowColor: '139, 92, 246', // Violet
      },
    },
    // === TOP RIGHT (04 Mood Check-In) ===
    {
      id: 4,
      num: '04',
      name: 'Mood Check-In',
      image: mindcareDashboard, // Mood check-in
      style: {
        width: '32%',
        maxWidth: '300px',
        zIndex: 22,
        top: '16%',
        left: '84%', // Pushed further right and top
        baseRotateX: 10,
        baseRotateY: 22,
        baseRotateZ: 2,
        baseTranslateZ: 10,
        parallaxFactor: 0.24,
        glowColor: '236, 72, 153', // Pink
      },
    },
    // === MIDDLE LEFT (05 Goals) ===
    {
      id: 5,
      num: '05',
      name: 'Goals',
      image: mindcareDashboard, // Goals
      style: {
        width: '32%',
        maxWidth: '300px',
        zIndex: 24,
        top: '50%',
        left: '12%', // Pushed further left
        baseRotateX: -5,
        baseRotateY: -25,
        baseRotateZ: 0,
        baseTranslateZ: 15,
        parallaxFactor: 0.22,
        glowColor: '59, 130, 246', // Blue
      },
    },
    // === MIDDLE RIGHT (08 Profile) ===
    {
      id: 8,
      num: '08',
      name: 'Profile',
      image: mindcareAuth, // Profile screen mockup
      style: {
        width: '32%',
        maxWidth: '300px',
        zIndex: 26,
        top: '50%',
        left: '88%', // Pushed further right
        baseRotateX: -5,
        baseRotateY: 25,
        baseRotateZ: 0,
        baseTranslateZ: 15,
        parallaxFactor: 0.25,
        glowColor: '168, 85, 247', // Purple
      },
    },
    // === BOTTOM LEFT (06 Insights) ===
    {
      id: 6,
      num: '06',
      name: 'Insights',
      image: mindcareAnalytics,
      style: {
        width: '32%',
        maxWidth: '300px',
        zIndex: 28,
        top: '85%',
        left: '18%', // Pushed further left and bottom
        baseRotateX: -12,
        baseRotateY: -15,
        baseRotateZ: 0,
        baseTranslateZ: 10,
        parallaxFactor: 0.26,
        glowColor: '0, 240, 255', // Cyan
      },
    },
    // === BOTTOM RIGHT (07 AI Assistant) ===
    {
      id: 7,
      num: '07',
      name: 'AI Assistant',
      image: mindcareSupport,
      style: {
        width: '32%',
        maxWidth: '300px',
        zIndex: 32, // Closer to view
        top: '84%',
        left: '82%', // Spaced out
        baseRotateX: -12,
        baseRotateY: 15, // Rotate towards center
        baseRotateZ: 0,
        baseTranslateZ: 20,
        parallaxFactor: 0.32,
        glowColor: '139, 92, 246', // Violet
      },
    },
  ];

  const displayedCards = isMobile
    ? cards
        .filter(c => [1, 2, 3, 6, 7].includes(c.id))
        .map(c => {
          if (c.id === 1) {
            return {
              ...c,
              style: {
                ...c.style,
                width: '58%',
                maxWidth: '240px',
                top: '50%',
                left: '50%',
              }
            };
          }
          if (c.id === 2) {
            return {
              ...c,
              style: {
                ...c.style,
                width: '32%',
                maxWidth: '120px',
                top: '20%',
                left: '22%',
              }
            };
          }
          if (c.id === 3) {
            return {
              ...c,
              style: {
                ...c.style,
                width: '32%',
                maxWidth: '120px',
                top: '20%',
                left: '78%',
              }
            };
          }
          if (c.id === 6) {
            return {
              ...c,
              style: {
                ...c.style,
                width: '32%',
                maxWidth: '120px',
                top: '80%',
                left: '22%',
              }
            };
          }
          if (c.id === 7) {
            return {
              ...c,
              style: {
                ...c.style,
                width: '32%',
                maxWidth: '120px',
                top: '80%',
                left: '78%',
              }
            };
          }
          return c;
        })
    : cards;

  const getCardTransformStyle = (card: typeof cards[0]) => {
    const { parallaxFactor, baseRotateX, baseRotateY, baseRotateZ, baseTranslateZ, zIndex } = card.style;
    
    // Parallax mouse translations
    const moveX = mouse.x * 55 * parallaxFactor;
    const moveY = mouse.y * 55 * parallaxFactor;

    // Smooth dynamic tilting surrounding the base rotation skews
    const rotateX = baseRotateX + mouse.y * -22 * (parallaxFactor + 0.4);
    const rotateY = baseRotateY + mouse.x * 22 * (parallaxFactor + 0.4);

    const isCenter = card.id === 1;
    const isActive = activeCard === card.id;

    // Calculate dynamic 3D translations
    const zOffset = isActive 
      ? 80 // Fly forward dramatically on active hover!
      : baseTranslateZ; // Base Z depth coordinates

    // Build transform string with custom 3D projection
    const dynamicTransform = `
      translate(-50%, -50%)
      translate3d(${moveX}px, ${moveY}px, ${zOffset}px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg)
      rotateZ(${baseRotateZ}deg)
      scale(${isActive ? 1.05 : 1})
    `;

    return {
      transform: dynamicTransform,
      zIndex: isActive ? 60 : zIndex,
      transition: 'transform 0.12s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s ease, border-color 0.3s ease',
      boxShadow: isActive
        ? `0 28px 55px rgba(0, 0, 0, 0.7), 0 0 32px rgba(${card.style.glowColor}, 0.45)`
        : isCenter 
          ? `0 10px 30px rgba(0, 0, 0, 0.45), 0 0 18px rgba(${card.style.glowColor}, 0.1)`
          : `0 8px 25px rgba(0, 0, 0, 0.4)`,
      border: isActive
        ? `2.5px solid rgba(${card.style.glowColor}, 0.85)`
        : `1px solid rgba(255, 255, 255, 0.08)`,
    };
  };

  return (
    <>
      <div 
        ref={containerRef}
        className="relative w-full h-[420px] xs:h-[480px] sm:h-[540px] md:h-[580px] lg:h-[620px] bg-black/40 rounded-3xl border border-white/5 overflow-hidden select-none cursor-pointer p-4 perspective-[800px] transform-style-3d group shadow-[inset_0_0_40px_rgba(0,0,0,0.75)]"
      >
        {/* Background radial glowing ambient lines */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.06)_0%,transparent_80%)] pointer-events-none transition-opacity duration-700" 
          style={{
            opacity: 1,
            transform: `translate3d(${mouse.x * 20}px, ${mouse.y * 20}px, 0)`,
            transition: 'transform 0.3s ease-out'
          }}
        />

        {/* 3D Orbiting Connection Lines SVG matching mockup perfectly */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none z-0">
          {/* Dash Orbit Path ellipse (expanded RX and RY to represent wider spaced orbit path) */}
          <ellipse 
            cx="50%" 
            cy="50%" 
            rx={isMobile ? "30%" : "36%"} 
            ry={isMobile ? "30%" : "33%"} 
            className="stroke-primary/20 stroke-[1.5] fill-none" 
            style={{ strokeDasharray: '6, 6' }}
          />
          {/* Radial lines connecting center card to surrounding orbiting panels */}
          <line x1="50%" y1="50%" x2={isMobile ? "22%" : "16%"} y2={isMobile ? "20%" : "15%"} className="stroke-cyan-500/20 stroke-1" />
          {!isMobile && <line x1="50%" y1="50%" x2="50%" y2="12%" className="stroke-purple-500/20 stroke-1" />}
          <line x1="50%" y1="50%" x2={isMobile ? "78%" : "84%"} y2={isMobile ? "20%" : "16%"} className="stroke-pink-500/20 stroke-1" />
          {!isMobile && <line x1="50%" y1="50%" x2="12%" y2="50%" className="stroke-blue-500/20 stroke-1" />}
          {!isMobile && <line x1="50%" y1="50%" x2="88%" y2="50%" className="stroke-purple-500/20 stroke-1" />}
          <line x1="50%" y1="50%" x2={isMobile ? "22%" : "18%"} y2={isMobile ? "80%" : "85%"} className="stroke-cyan-500/20 stroke-1" />
          <line x1="50%" y1="50%" x2={isMobile ? "78%" : "82%"} y2={isMobile ? "80%" : "84%"} className="stroke-purple-500/20 stroke-1" />
        </svg>
        
        {/* 3D Floating Scattered panels */}
        {displayedCards.map((card) => {
          const positionStyles = { top: card.style.top, left: card.style.left };

          return (
            <div
              key={card.id}
              onMouseEnter={() => { playHover(); setActiveCard(card.id); }}
              onMouseLeave={() => setActiveCard(null)}
              onClick={() => { playClick(); setSelectedImage(card.image); setSelectedName(card.name); }}
              style={{
                ...positionStyles,
                ...getCardStyle(card),
              }}
              className="absolute rounded-xl overflow-hidden backdrop-blur-[2px] transform-style-3d shadow-2xl transition-all duration-300 hover:scale-[1.03]"
            >
              {/* Mockup Numbered Capsule Tag above card */}
              <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/75 border border-white/10 backdrop-blur-sm text-[7px] font-bold font-mono text-cyan-400 flex items-center gap-1 shadow-md z-30 transition-colors duration-300 group-hover:border-cyan-500/30">
                <span className="text-[6px] px-0.5 rounded bg-cyan-500 text-black font-extrabold">{card.num}</span>
                <span>{card.name}</span>
              </div>

              {/* Screenshot Panel */}
              <img 
                src={card.image} 
                alt={card.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01] pointer-events-none"
              />
              
              {/* Active Card Glow HUD */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 pointer-events-none flex flex-col justify-end p-3 text-left"
                style={{
                  opacity: activeCard === card.id ? 1 : 0
                }}
              >
                <span className="text-[8px] font-mono font-bold text-cyan-400 tracking-widest uppercase mb-0.5 animate-pulse">
                  🔍 CLICK TO EXPAND
                </span>
                <h4 className="text-[11px] sm:text-xs font-bold text-white leading-tight">{card.name}</h4>
              </div>
            </div>
          );
        })}

        {/* Bottom HUD Bar strictly matching mockup! */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md z-40 shadow-[0_4px_30px_rgba(0,0,0,0.5)] whitespace-nowrap">
          <Layers className="h-3.5 w-3.5 text-primary animate-pulse" />
          <span className="text-[9px] sm:text-[10px] font-bold font-mono text-white tracking-[0.18em] uppercase select-none">
            Click card to view in high resolution
          </span>
        </div>
      </div>

      {/* Futuristic Interactive Fullscreen Lightbox Overlay Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 cursor-zoom-out animate-fade-in"
          onClick={() => { playClick(); setSelectedImage(null); }}
        >
          {/* Top Info Capsule */}
          {selectedName && (
            <div className="absolute top-6 left-6 px-4 py-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-[10px] sm:text-xs font-mono font-bold text-cyan-400 tracking-wider shadow-lg z-50">
              MindCare AI • <span className="text-white font-mono">{selectedName}</span>
            </div>
          )}

          {/* Close Indicator Capsule */}
          <div className="absolute top-6 right-6 px-4 py-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-[10px] sm:text-xs font-mono font-bold text-white tracking-widest cursor-pointer hover:border-primary/50 transition-colors shadow-lg z-50 flex items-center gap-2">
            <span>CLOSE VIEW</span>
            <span className="text-primary font-bold">[×]</span>
          </div>

          {/* Screenshot Render in Full resolution */}
          <img 
            src={selectedImage} 
            alt={selectedName || "Mockup Screenshot"} 
            className="max-w-[92%] max-h-[85vh] object-contain rounded-2xl border border-white/15 shadow-[0_0_50px_rgba(0,240,255,0.15)] animate-scale-in"
            onClick={(e) => e.stopPropagation()} // Prevent close on clicking the image
          />
        </div>
      )}
    </>
  );

  function getCardStyle(card: typeof cards[0]) {
    const baseStyle = getCardTransformStyle(card);
    return {
      ...baseStyle,
      width: card.style.width,
      maxWidth: card.style.maxWidth,
    };
  }
};

export default MindCareShowcase;
