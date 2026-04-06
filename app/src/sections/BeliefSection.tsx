import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function BeliefSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [contentRef.current, badgeRef.current],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-20 min-h-screen min-h-[100dvh] flex items-end md:items-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/portrait.jpg"
          alt="Tito with saxophone"
          className="w-full h-full object-cover object-top"
          style={{ filter: 'saturate(0.7) contrast(1.05)' }}
        />
        <div className="absolute inset-0 vignette" />
        {/* Mobile: bottom-up gradient */}
        <div
          className="absolute inset-0 md:hidden"
          style={{ background: 'linear-gradient(to top, rgba(11,13,16,0.95) 35%, rgba(11,13,16,0.5) 65%, transparent 100%)' }}
        />
        {/* Desktop: left gradient */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{ background: 'linear-gradient(to right, rgba(11,13,16,0.82) 0%, rgba(11,13,16,0.45) 55%, transparent 100%)' }}
        />
      </div>

      {/* Badge */}
      <div ref={badgeRef} className="absolute right-4 md:right-[6vw] top-6 md:top-[8vh] flex items-center gap-2 z-10">
        <span className="w-2 h-2 rounded-full bg-accent-gold flex-shrink-0" />
        <span className="font-mono text-xs text-text-secondary tracking-cinematic">
          Peer Support • Modal Music
        </span>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full px-6 pb-16 md:pb-0
                   md:absolute md:left-[6vw] md:top-1/2 md:-translate-y-1/2"
        style={{ maxWidth: 'min(90vw, 560px)' }}
      >
        <h2
          className="font-display font-black text-text-primary uppercase tracking-wide-cinematic leading-display mb-4"
          style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)' }}
        >
          If music has ever felt like the only thing that understood you
        </h2>
        <p className="text-accent-gold text-base md:text-xl font-medium mb-4">
          You're in the right place.
        </p>
        {/* Bio — shown on mobile inline, desktop as separate element */}
        <p className="text-text-secondary text-sm leading-relaxed md:hidden">
          I'm Tito — a state-certified peer support specialist and saxophonist.
          I build quiet, modal soundscapes and honest conversations for people
          navigating heavy seasons.
        </p>
      </div>

      {/* Bio — desktop only, bottom right */}
      <p
        className="hidden md:block absolute right-[6vw] bottom-[6vh] text-right z-10"
        style={{ width: 'min(34vw, 420px)' }}
      >
        <span className="text-text-secondary text-sm leading-relaxed">
          I'm Tito — a state-certified peer support specialist and saxophonist.
          I build quiet, modal soundscapes and honest conversations for people
          navigating heavy seasons.
        </span>
      </p>
    </section>
  );
}
