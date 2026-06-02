import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Award, ExternalLink, ShieldCheck, ChevronLeft, ChevronRight, Mouse } from 'lucide-react';
import { playClick, playHover } from '@/lib/audio';

// Import certificate images
import certificate1 from '@/assets/certificate-1.png';
import certificate2 from '@/assets/certificate-2.png';
import certificate3 from '@/assets/certificate-3.png';
import certificate4 from '@/assets/certificate-4.png';
import certificate5 from '@/assets/certificate-5.png';
import certificate6 from '@/assets/certificate-6.png';
import certificate7 from '@/assets/certificate-7.png';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  image: string;
  url: string;
  glowColor: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: 'Databases with SQL',
    issuer: 'NxtWave',
    image: certificate1,
    url: 'https://s3-ap-south-1.amazonaws.com/nkb-backend-ccbp-media-static/certificates/share/KUOIIYLIAE.png',
    glowColor: '42, 115, 204' // Slate Blue
  },
  {
    id: 2,
    title: 'Static Website Development',
    issuer: 'NxtWave',
    image: certificate2,
    url: 'https://s3-ap-south-1.amazonaws.com/nkb-backend-ccbp-media-static/certificates/share/QICCEYHRLM.png',
    glowColor: '212, 175, 55' // Elegant Gold
  },
  {
    id: 3,
    title: 'Responsive Web Design',
    issuer: 'NxtWave',
    image: certificate3,
    url: 'https://s3-ap-south-1.amazonaws.com/nkb-backend-ccbp-media-static/certificates/share/NTOTIJGROR.png',
    glowColor: '212, 175, 55' // Elegant Gold
  },
  {
    id: 4,
    title: 'Developer Foundations',
    issuer: 'NxtWave (CCBP)',
    image: certificate4,
    url: 'https://certificates.ccbp.in/intensive/developer-foundations?id=LSRWQOKOXZ',
    glowColor: '226, 232, 240' // Platinum White
  },
  {
    id: 5,
    title: 'Dynamic Web Applications',
    issuer: 'NxtWave (CCBP)',
    image: certificate5,
    url: 'https://certificates.ccbp.in/intensive/dynamic-web-application?id=KIBSBFJECA',
    glowColor: '42, 115, 204' // Slate Blue
  },
  {
    id: 6,
    title: 'JavaScript Essentials',
    issuer: 'NxtWave (CCBP)',
    image: certificate6,
    url: 'https://certificates.ccbp.in/intensive/javascript-essentials?id=SUTFNGHTRH',
    glowColor: '212, 175, 55' // Elegant Gold
  },
  {
    id: 7,
    title: 'Responsive Design Using Flexbox',
    issuer: 'NxtWave (CCBP)',
    image: certificate7,
    url: 'https://certificates.ccbp.in/intensive/flexbox?id=CNCEWAOGIF',
    glowColor: '212, 175, 55' // Elegant Gold
  },
  {
    id: 8,
    title: 'Programming Fundamentals',
    issuer: 'Coursera (U.Mich)',
    image: 'https://res.cloudinary.com/dpxvhojoh/image/upload/v1755881312/Screenshot_2025-08-22_221252_v0s7mq.png',
    url: 'https://coursera.org/share/ef07bd252ec10ea4491becd7663c6563',
    glowColor: '42, 115, 204' // Slate Blue
  },
  {
    id: 9,
    title: 'Programming Foundations (Python)',
    issuer: 'CCBP Intensive',
    image: 'https://res.cloudinary.com/dpxvhojoh/image/upload/v1755881312/Screenshot_2025-08-22_221252_v0s7mq.png',
    url: 'https://certificates.ccbp.in/intensive/programming-foundations?id=VRQRIOUTKB',
    glowColor: '42, 115, 204' // Slate Blue
  }
];

const Certificates = () => {
  const [activeIndex, setActiveIndex] = useState<number>(3); // Balanced middle item on load
  const dragStartX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const lastWheelTime = useRef<number>(0);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);

  const resetAutoplay = () => {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
    }
    autoplayTimer.current = setInterval(() => {
      setActiveIndex(prev => (prev === certificates.length - 1 ? 0 : prev + 1));
    }, 3800);
  };

  useEffect(() => {
    autoplayTimer.current = setInterval(() => {
      setActiveIndex(prev => (prev === certificates.length - 1 ? 0 : prev + 1));
    }, 3800);

    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [certificates.length]);

  // Navigation handlers with wrap-around infinite loop
  const handlePrev = () => {
    playClick();
    setActiveIndex(prev => (prev === 0 ? certificates.length - 1 : prev - 1));
    resetAutoplay();
  };

  const handleNext = () => {
    playClick();
    setActiveIndex(prev => (prev === certificates.length - 1 ? 0 : prev + 1));
    resetAutoplay();
  };

  // Drag / Swipe gesture listeners
  const handleDragStart = (clientX: number) => {
    isDragging.current = true;
    dragStartX.current = clientX;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging.current) return;
    const deltaX = clientX - dragStartX.current;
    
    // Swipe sensitivity threshold
    if (Math.abs(deltaX) > 60) {
      if (deltaX > 0) {
        // Swipe Right -> Show Previous (Wrap around)
        setActiveIndex(prev => (prev === 0 ? certificates.length - 1 : prev - 1));
        playClick();
      } else {
        // Swipe Left -> Show Next (Wrap around)
        setActiveIndex(prev => (prev === certificates.length - 1 ? 0 : prev + 1));
        playClick();
      }
      resetAutoplay();
      isDragging.current = false; // block multiple shifts in a single swipe
    }
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) > 8 || Math.abs(e.deltaX) > 8) {
      const now = Date.now();
      if (now - lastWheelTime.current > 400) {
        if (e.deltaY > 0 || e.deltaX > 0) {
          setActiveIndex(prev => (prev === certificates.length - 1 ? 0 : prev + 1));
          playClick();
        } else {
          setActiveIndex(prev => (prev === 0 ? certificates.length - 1 : prev - 1));
          playClick();
        }
        resetAutoplay();
        lastWheelTime.current = now;
      }
    }
  };

  // 3D coverflow layout mathematics calculation
  const getCardStyle = (index: number) => {
    const offset = index - activeIndex;
    const absOffset = Math.abs(offset);
    
    // Hide cards that are out of bounds for rendering efficiency
    if (absOffset > 3) {
      return {
        opacity: 0,
        visibility: 'hidden' as const,
        transform: 'translate3d(-50%, -50%, -350px) rotateY(0deg) scale(0)',
        zIndex: 0
      };
    }

    // Mathematical 3D cylinder projection curve
    const angle = offset * 28; // 28 degrees separation
    const radius = 300; // Cylindrical radius
    const radian = (angle * Math.PI) / 180;
    
    const translateX = Math.sin(radian) * radius;
    const translateZ = (Math.cos(radian) - 1) * radius + (offset === 0 ? 45 : -90);
    
    // Rotate cards inwards to face the viewer
    const rotateY = -angle;
    
    // Scaling
    const scale = offset === 0 ? 1.15 : 0.85;
    
    // Opacity decay
    const opacity = offset === 0 ? 1 : absOffset === 1 ? 0.8 : absOffset === 2 ? 0.45 : 0.15;
    
    // Z-index stack
    const zIndex = 20 - absOffset;

    const currentGlow = certificates[activeIndex].glowColor;

    return {
      left: '50%',
      top: '50%',
      transform: `translate3d(calc(-50% + ${translateX}px), -50%, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
      visibility: 'visible' as const,
      boxShadow: offset === 0 
        ? `0 0 30px rgba(${currentGlow}, 0.2), 0 0 10px rgba(${currentGlow}, 0.12)` 
        : 'none',
      border: offset === 0 
        ? `2px solid rgba(${currentGlow}, 0.65)` 
        : '1px solid rgba(255, 255, 255, 0.06)',
      // Dynamic hardware-accelerated 3D reflection (downward mirror reflection)
      WebkitBoxReflect: 'below 10px linear-gradient(transparent, transparent 40%, rgba(255, 255, 255, 0.14))',
      transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)', // smooth spring cylinder glide
    };
  };

  return (
    <section id="certificates" className="py-12 bg-background relative overflow-hidden select-none scroll-mt-20">
      {/* Background glow highlights */}
      <div className="absolute left-1/4 top-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-6 animate-fade-in-up">
          <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">My Achievements</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Certificates
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Highlighting certifications and achievements that reflect my growth and expertise.
          </p>
        </div>

        {/* 3D coverflow Carousel Frame */}
        <div className="relative w-full overflow-hidden py-4 flex flex-col items-center justify-center min-h-[350px]">
          
          {/* Left / Right edge fade gradients */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background via-background/20 to-transparent z-30 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background via-background/20 to-transparent z-30 pointer-events-none" />

          {/* Perspective viewport wrapper */}
          <div 
            className="relative w-full max-w-4xl h-[230px] perspective-[1000px] transform-style-3d cursor-grab active:cursor-grabbing"
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
            onWheel={handleWheel}
          >
            {certificates.map((cert, index) => {
              const isCenter = index === activeIndex;
              return (
                <div
                  key={cert.id}
                  style={getCardStyle(index)}
                  onClick={() => {
                    if (!isCenter) {
                      setActiveIndex(index);
                      playClick();
                      resetAutoplay();
                    }
                  }}
                  className="absolute rounded-xl overflow-hidden bg-card/60 backdrop-blur-md w-[280px] h-[210px] transform-style-3d group"
                >
                  {/* Certificate Screenshot Image Face */}
                  <img 
                    src={cert.image} 
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />

                  {/* Sleek verified hover overlay bar on the active card */}
                  {isCenter && (
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                      <div className="space-y-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="text-left">
                          <h4 className="text-xs font-bold text-foreground line-clamp-1">{cert.title}</h4>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{cert.issuer}</p>
                        </div>
                        <Button 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            playClick();
                            window.open(cert.url, '_blank');
                          }}
                          className="w-full h-8 text-[10px] font-mono font-bold gradient-hero text-white shadow-glow flex items-center justify-center gap-1 border border-primary/20 interactive-button"
                        >
                          <ExternalLink className="h-3 w-3" />
                          VERIFY CREDENTIAL
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Active card details HUD directly beneath Coverflow */}
          <div className="text-center mt-6 mb-4 h-10 animate-fade-in">
            <h3 className="text-lg font-bold text-foreground transition-colors duration-300">
              {certificates[activeIndex].title}
            </h3>
            <p className="text-xs text-primary uppercase tracking-widest font-mono font-semibold mt-1 transition-colors duration-300">
              {certificates[activeIndex].issuer}
            </p>
          </div>

          {/* Slider Controls (Arrow Circle HUD & Dot navigators) */}
          <div className="flex flex-col items-center gap-4 mt-2">
            {/* Unified glassmorphism pill capsule container */}
            <div className="flex items-center gap-4 px-4 py-2 rounded-full border border-white/10 bg-card/40 backdrop-blur-md relative z-40 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
              {/* Previous button */}
              <button 
                onClick={handlePrev}
                onMouseEnter={playHover}
                className="w-8 h-8 rounded-full border border-white/10 bg-black/40 text-foreground hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center interactive-button"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Glowing index dots */}
              <div className="flex items-center gap-2 px-1">
                {certificates.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => { setActiveIndex(index); playClick(); resetAutoplay(); }}
                    onMouseEnter={playHover}
                    className={`
                      w-2 h-2 rounded-full transition-all duration-300
                      ${index === activeIndex 
                        ? 'w-4 bg-primary shadow-[0_0_8px_rgba(0,240,255,0.8)]' 
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/75'
                      }
                    `}
                  />
                ))}
              </div>

              {/* Next button */}
              <button 
                onClick={handleNext}
                onMouseEnter={playHover}
                className="w-8 h-8 rounded-full border border-white/10 bg-black/40 text-foreground hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center interactive-button"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Gesture Guide text with Mouse dragging/scrolling icon */}
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-mono font-medium mt-2">
              <Mouse className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span>Drag, swipe, or scroll</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Certificates;
