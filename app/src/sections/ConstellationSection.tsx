import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ConstellationSectionProps {
  className?: string;
}

const ConstellationSection = ({ className = '' }: ConstellationSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const constellationRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        cardRef.current,
        { scale: 0.82, opacity: 0, y: '10vh' },
        { scale: 1, opacity: 1, y: 0, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        titleRef.current,
        { x: '-10vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        constellationRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // SETTLE (30% - 70%): Hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        cardRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.70
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToStarMap = () => {
    const starMapSection = document.getElementById('starmap');
    if (starMapSection) {
      starMapSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // SVG Constellation nodes
  const nodes = [
    { x: 50, y: 20, label: 'Ionian', color: '#f8f9fa' },
    { x: 80, y: 35, label: 'Dorian', color: '#4a5d7c' },
    { x: 85, y: 65, label: 'Phrygian', color: '#8b4049' },
    { x: 65, y: 85, label: 'Lydian', color: '#f4d58d' },
    { x: 35, y: 85, label: 'Mixolydian', color: '#6b8e23' },
    { x: 15, y: 65, label: 'Aeolian', color: '#5f6c7b' },
    { x: 20, y: 35, label: 'Locrian', color: '#6b5b95' },
  ];

  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0],
    [0, 3], [1, 4], [2, 5], [3, 6],
  ];

  return (
    <section
      ref={sectionRef}
      id="constellation"
      className={`section-pinned ${className}`}
    >
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/images/hero-starfield.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-[#0B0F1F]/40" />

      {/* Constellation Card */}
      <div
        ref={cardRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] md:w-[78vw] h-auto md:h-[78vh]"
      >
        <div className="glass-card rounded-[28px] p-6 md:p-10 h-full flex flex-col">
          {/* Title Section */}
          <div ref={titleRef} className="mb-4 md:mb-6">
            <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl text-[#F5F1E8] tracking-wide mb-2">
              THE EMOTIONAL <span className="text-[#D4A574]">STAR MAP</span>
            </h2>
            <p className="font-body text-sm md:text-base text-[#A9B3C7]">
              Navigate music by feeling, not theory.
            </p>
          </div>

          {/* Constellation Graphic */}
          <div
            ref={constellationRef}
            className="flex-1 flex items-center justify-center min-h-[200px] md:min-h-0 my-4"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full max-h-[40vh] md:max-h-[50vh]"
              style={{ overflow: 'visible' }}
            >
              {/* Connection lines */}
              {connections.map(([start, end], i) => (
                <line
                  key={i}
                  x1={nodes[start].x}
                  y1={nodes[start].y}
                  x2={nodes[end].x}
                  y2={nodes[end].y}
                  stroke="rgba(212, 165, 116, 0.3)"
                  strokeWidth="0.3"
                />
              ))}

              {/* Nodes */}
              {nodes.map((node, i) => (
                <g key={i}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="3"
                    fill={node.color}
                    style={{
                      filter: `drop-shadow(0 0 4px ${node.color})`,
                    }}
                  />
                  <text
                    x={node.x}
                    y={node.y + 6}
                    textAnchor="middle"
                    fill="#F5F1E8"
                    fontSize="3"
                    fontFamily="Cinzel"
                    opacity="0.8"
                  >
                    {node.label}
                  </text>
                </g>
              ))}

              {/* Center star */}
              <circle
                cx="50"
                cy="52"
                r="4"
                fill="#D4A574"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(212, 165, 116, 0.8))',
                }}
              />
            </svg>
          </div>

          {/* CTA Section */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
            <button
              onClick={scrollToStarMap}
              className="btn-gold flex items-center gap-2 group w-full sm:w-auto justify-center"
            >
              <Star className="w-4 h-4" />
              Get the Star Map
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#starmap"
              onClick={(e) => {
                e.preventDefault();
                scrollToStarMap();
              }}
              className="font-body text-sm text-[#A9B3C7] hover:text-[#D4A574] transition-colors flex items-center gap-1"
            >
              See what's inside
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0F1F] to-transparent" />
    </section>
  );
};

export default ConstellationSection;
