import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Music } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SaxophoneSectionProps {
  className?: string;
}

const SaxophoneSection = ({ className = '' }: SaxophoneSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const saxRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        saxRef.current,
        { x: '-60vw', opacity: 0, rotate: -6, scale: 0.92 },
        { x: 0, opacity: 1, rotate: 0, scale: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: '18vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        bodyRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // SETTLE (30% - 70%): Elements hold position

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        saxRef.current,
        { x: 0, opacity: 1 },
        { x: '-22vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        glowRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        [headlineRef.current, bodyRef.current, ctaRef.current],
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.72
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToCuentos = () => {
    const cuentosSection = document.getElementById('cuentos');
    if (cuentosSection) {
      cuentosSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="saxophone"
      className={`section-pinned ${className}`}
    >
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/images/lyrics-night-sky.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-[#0B0F1F]/60" />

      {/* Gold Glow behind saxophone */}
      <div
        ref={glowRef}
        className="absolute left-[15vw] top-1/2 -translate-y-1/2 w-[50vw] h-[50vw] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,165,116,0.28) 0%, rgba(0,0,0,0) 70%)',
        }}
      />

      {/* Saxophone Image */}
      <div
        ref={saxRef}
        className="absolute left-[8vw] md:left-[12vw] top-1/2 -translate-y-1/2 h-[50vh] md:h-[65vh] lg:h-[72vh]"
      >
        <img
          src="/images/saxophone-glow.jpg"
          alt="Golden saxophone"
          className="h-full w-auto object-contain"
          style={{
            filter: 'drop-shadow(0 0 30px rgba(212, 165, 116, 0.3))',
          }}
        />
      </div>

      {/* Text Content - Right Side */}
      <div className="absolute right-[8vw] md:right-[10vw] top-1/2 -translate-y-1/2 max-w-[40vw] md:max-w-[35vw]">
        {/* Headline */}
        <div ref={headlineRef} className="mb-6 md:mb-8">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F5F1E8] leading-tight tracking-wide">
            EVERY NOTE
            <br />
            <span className="text-[#D4A574]">PLAYED LIVE</span>
          </h2>
        </div>

        {/* Body Text */}
        <div ref={bodyRef} className="mb-8">
          <p className="font-body text-sm md:text-base lg:text-lg text-[#A9B3C7] leading-relaxed">
            Surrealist modal soundscapes for your nervous system. No loops. No AI. Just breath, brass, and the night sky.
          </p>
        </div>

        {/* CTA Button */}
        <button
          ref={ctaRef}
          onClick={scrollToCuentos}
          className="btn-gold flex items-center gap-2 group"
        >
          <Music className="w-4 h-4" />
          Hear a Cuento
        </button>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0F1F] to-transparent" />
    </section>
  );
};

export default SaxophoneSection;
