import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Starfield } from '../components/Starfield';
import { ArrowUpRight, Users, Music, Map, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Offering {
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
  position: { left: string; top: string };
  entranceFrom: { x?: string; y?: string };
}

const offerings: Offering[] = [
  {
    title: '1:1 Navigation',
    description: 'Three months of peer support + sound.',
    link: 'Apply',
    icon: <Users className="w-5 h-5" />,
    position: { left: '18vw', top: '26vh' },
    entranceFrom: { x: '-40vw' },
  },
  {
    title: 'Modal Sound Sessions',
    description: 'Live improvisation for emotional regulation.',
    link: 'Book',
    icon: <Music className="w-5 h-5" />,
    position: { left: '68vw', top: '24vh' },
    entranceFrom: { x: '40vw' },
  },
  {
    title: 'The Star Map (Free)',
    description: 'A guide to mapping moods to modes.',
    link: 'Download',
    icon: <Map className="w-5 h-5" />,
    position: { left: '16vw', top: '62vh' },
    entranceFrom: { y: '40vh' },
  },
  {
    title: 'Community Cuento',
    description: 'A quiet space for stories + listening.',
    link: 'Join',
    icon: <MessageCircle className="w-5 h-5" />,
    position: { left: '70vw', top: '60vh' },
    entranceFrom: { y: '40vh' },
  },
];

export function OfferingsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<SVGEllipseElement>(null);
  const ring2Ref = useRef<SVGEllipseElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Title block entrance
      scrollTl.fromTo(
        titleRef.current,
        { scale: 0.82, opacity: 0, y: '10vh' },
        { scale: 1, opacity: 1, y: 0, ease: 'power2.out' },
        0
      );

      // Orbit rings entrance
      scrollTl.fromTo(
        [ring1Ref.current, ring2Ref.current],
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, ease: 'power2.out' },
        0.05
      );

      // Node entrances with stagger
      nodeRefs.current.forEach((node, index) => {
        if (!node) return;
        const offering = offerings[index];
        const fromX = offering.entranceFrom.x || 0;
        const fromY = offering.entranceFrom.y || 0;

        scrollTl.fromTo(
          node,
          { x: fromX, y: fromY, opacity: 0 },
          { x: 0, y: 0, opacity: 1, ease: 'power2.out' },
          0.08 + index * 0.04
        );
      });

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(
        titleRef.current,
        { scale: 1, opacity: 1, y: 0 },
        { scale: 0.92, opacity: 0, y: '-8vh', ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        [ring1Ref.current, ring2Ref.current],
        { opacity: 1, scale: 1 },
        { opacity: 0.25, scale: 1.08, ease: 'power2.in' },
        0.72
      );

      nodeRefs.current.forEach((node, index) => {
        if (!node) return;
        const offering = offerings[index];
        const toX = offering.entranceFrom.x ? offering.entranceFrom.x : 0;
        const toY = offering.entranceFrom.y ? offering.entranceFrom.y : 0;
        const multiplier = 1.5;

        scrollTl.fromTo(
          node,
          { opacity: 1, x: 0, y: 0 },
          { 
            opacity: 0, 
            x: typeof toX === 'string' ? `${parseFloat(toX) * multiplier}vw` : 0, 
            y: typeof toY === 'string' ? `${parseFloat(toY) * multiplier}vh` : 0,
            ease: 'power2.in' 
          },
          0.74 + index * 0.02
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="offerings"
      className="section-pinned z-30"
    >
      {/* Starfield Background */}
      <Starfield starCount={100} />

      {/* Orbit Rings SVG */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <defs>
          <pattern id="dashPattern" patternUnits="userSpaceOnUse" width="20" height="20">
            <line x1="0" y1="0" x2="10" y2="0" stroke="rgba(244,246,255,0.14)" strokeWidth="1" />
          </pattern>
        </defs>
        <ellipse
          ref={ring1Ref}
          cx="50%"
          cy="50%"
          rx="26vw"
          ry="18vh"
          className="orbit-ring"
          strokeDasharray="8 6"
        />
        <ellipse
          ref={ring2Ref}
          cx="50%"
          cy="50%"
          rx="38vw"
          ry="26vh"
          className="orbit-ring"
          strokeDasharray="12 8"
        />
      </svg>

      {/* Center Title */}
      <div 
        ref={titleRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10"
      >
        <h2 
          className="font-display font-black text-text-primary uppercase tracking-wide-cinematic leading-display mb-2"
          style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
        >
          Offerings
        </h2>
        <p className="text-text-secondary text-sm md:text-base font-light">
          Choose the depth that fits your season.
        </p>
      </div>

      {/* Offering Nodes */}
      {offerings.map((offering, index) => (
        <div
          key={offering.title}
          ref={(el) => { nodeRefs.current[index] = el; }}
          className="absolute z-20"
          style={{ 
            left: offering.position.left, 
            top: offering.position.top,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="glass-card rounded-2xl p-5 w-[240px] md:w-[280px] transition-all duration-300 hover:border-accent-gold/30 hover:shadow-glow group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center text-accent-gold">
                {offering.icon}
              </div>
              <h3 className="font-display font-bold text-text-primary text-sm uppercase tracking-tight-cinematic">
                {offering.title}
              </h3>
            </div>
            <p className="text-text-secondary text-xs leading-relaxed mb-4">
              {offering.description}
            </p>
            <button className="flex items-center gap-1 text-accent-gold text-xs font-medium group-hover:gap-2 transition-all">
              {offering.link}
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
