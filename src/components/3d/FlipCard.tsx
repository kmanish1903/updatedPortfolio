import { useState, ReactNode } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  className?: string;
}

const FlipCard = ({ front, back, className = '' }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isMobile = useIsMobile();

  // On mobile, just show front
  if (isMobile) {
    return <div className={className}>{front}</div>;
  }

  return (
    <div 
      className={`relative cursor-pointer ${className}`}
      style={{ 
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          {front}
        </div>
        
        {/* Back */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {back}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
