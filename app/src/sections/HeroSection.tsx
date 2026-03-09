import { useMemo, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface HeroSectionProps {
  className?: string;
}

// Deterministic pseudo-random so star positions never change between renders
function makePRNG(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const geoRef = useRef<SVGSVGElement>(null);

  const stars = useMemo(() => {
    const rand = makePRNG(42);
    return Array.from({ length: 130 }, (_, i) => ({
      x: rand() * 100,
      y: rand() * 100,
      size: i < 8 ? 2 + rand() * 1.2 : i < 35 ? 1.2 + rand() * 0.8 : 0.6 + rand() * 0.6,
      opacity: i < 8 ? 0.6 + rand() * 0.4 : i < 35 ? 0.3 + rand() * 0.5 : 0.1 + rand() * 0.3,
      delay: rand() * 6,
      duration: 2.5 + rand() * 4,
      bright: i < 8,
    }));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(starsRef.current, { opacity: 0 }, { opacity: 1, duration: 2.5 });

      tl.fromTo(
        geoRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 3 },
        '-=2'
      );

      const lines = contentRef.current?.querySelectorAll('.hero-line');
      if (lines?.length) {
        tl.fromTo(
          lines,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.22 },
          '-=1.8'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden ${className}`}
    >
      {/* Starfield */}
      <div ref={starsRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0 }}>
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.bright ? '#a8efff' : '#dce8f0',
              opacity: star.opacity,
              animation: `${star.bright ? 'twinkle-bright' : 'twinkle'} ${star.duration}s ${star.delay}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Sacred geometry — subtle hexagonal grid */}
      <svg
        ref={geoRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0 }}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="hex" x="0" y="0" width="90" height="104" patternUnits="userSpaceOnUse">
            <polygon
              points="45,3 87,26 87,78 45,101 3,78 3,26"
              fill="none"
              stroke="#00d9ff"
              strokeWidth="0.4"
              opacity="0.35"
            />
          </pattern>
          <radialGradient id="hexFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.05" />
            <stop offset="60%" stopColor="white" stopOpacity="0.02" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="hexMask">
            <rect width="100%" height="100%" fill="url(#hexFade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex)" mask="url(#hexMask)" />

        {/* Concentric rings at center — sacred geometry feel */}
        {[80, 160, 240, 340].map((r, i) => (
          <circle
            key={i}
            cx="50%"
            cy="50%"
            r={r}
            fill="none"
            stroke="#00d9ff"
            strokeWidth="0.3"
            opacity={0.08 - i * 0.015}
          />
        ))}
      </svg>

      {/* Radial ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 48%, rgba(0,217,255,0.055) 0%, transparent 70%)',
        }}
      />

      {/* Hero content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        style={{ paddingTop: '5rem' }}
      >
        {/* Brand script line */}
        <p
          className="hero-line font-script mb-5"
          style={{ color: '#00d9ff', fontSize: '1.3rem', opacity: 0.85 }}
        >
          tito dreaming with me
        </p>

        {/* Main headline */}
        <h1
          className="hero-line font-body italic text-balance leading-snug mb-7"
          style={{
            fontSize: 'clamp(1.75rem, 4.5vw, 3.5rem)',
            color: '#dce8f0',
            fontWeight: 400,
            lineHeight: 1.35,
          }}
        >
          "If music has ever felt like the only thing that understood you —
          you're in the right place."
        </h1>

        {/* Thin divider */}
        <div
          className="hero-line mx-auto mb-7"
          style={{
            width: 48,
            height: 1,
            background:
              'linear-gradient(90deg, transparent, rgba(0,217,255,0.6), transparent)',
          }}
        />

        {/* Subheadline */}
        <p
          className="hero-line font-body text-balance mb-10"
          style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
            color: '#7a92b0',
            lineHeight: 1.7,
          }}
        >
          Healing guidance through music, peer support, and lived experience.
        </p>

        {/* CTA */}
        <div className="hero-line">
          <a
            href="https://titodreamingwith.me/initial-optin"
            className="btn-cyan"
          >
            Get Your Free Emotional Star Map
          </a>
        </div>

        {/* Tagline below CTA */}
        <p
          className="hero-line font-script mt-6"
          style={{ color: 'rgba(0,217,255,0.45)', fontSize: '1.05rem' }}
        >
          Dream into yourself
        </p>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '120px',
          background: 'linear-gradient(to top, #0a0e1a, transparent)',
        }}
      />

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        style={{ color: 'rgba(122,146,176,0.5)' }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
