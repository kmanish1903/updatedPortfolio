import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const isMobile = useIsMobile();
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Complete after animation
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onComplete(), 500);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

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

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Animated circles loader */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <div className="absolute inset-2 border-4 border-primary/30 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          <div className="absolute inset-4 border-4 border-primary/40 border-t-transparent rounded-full animate-spin" style={{ animationDuration: '2s' }} />
        </div>

        {/* Tagline */}
        <div className="flex items-center gap-3 text-lg font-medium">
          <span className="text-foreground animate-fade-in" style={{ animationDelay: '0ms' }}>create</span>
          <span className="text-primary text-xl animate-pulse">•</span>
          <span className="text-foreground animate-fade-in" style={{ animationDelay: '200ms' }}>learn</span>
          <span className="text-primary text-xl animate-pulse">•</span>
          <span className="text-foreground animate-fade-in" style={{ animationDelay: '400ms' }}>build</span>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-muted/30 rounded-full overflow-hidden">
          <div 
            className="h-full gradient-hero transition-all duration-100 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading text */}
        <p className="text-muted-foreground text-sm">Loading portfolio...</p>
      </div>
    </div>
  );
};

export default SplashScreen;
