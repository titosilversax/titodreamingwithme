import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDelay: number;
}

interface StarfieldProps {
  starCount?: number;
  className?: string;
}

export function Starfield({ starCount = 120, className = '' }: StarfieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    // Generate stars with Poisson-disc-like spacing (avoid center crowding)
    const stars: Star[] = [];
    const centerX = 50;
    const centerY = 50;
    const centerAvoidRadius = 15; // Avoid center 15%

    for (let i = 0; i < starCount; i++) {
      let x: number, y: number, distFromCenter: number;
      let attempts = 0;
      
      do {
        x = Math.random() * 100;
        y = Math.random() * 100;
        distFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        attempts++;
      } while (distFromCenter < centerAvoidRadius && attempts < 50);

      stars.push({
        x,
        y,
        size: Math.random() * 2 + 1.5, // 1.5px to 3.5px
        opacity: Math.random() * 0.3 + 0.35, // 0.35 to 0.65
        animationDelay: Math.random() * 3,
      });
    }
    
    starsRef.current = stars;
    
    // Force re-render
    if (containerRef.current) {
      containerRef.current.style.opacity = '1';
    }
  }, [starCount]);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity: 0, transition: 'opacity 0.6s ease' }}
    >
      {starsRef.current.map((star, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-text-primary animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.animationDelay}s`,
          }}
        />
      ))}
    </div>
  );
}
