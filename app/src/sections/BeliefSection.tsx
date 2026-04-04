import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function BeliefSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Background Image Animation
      // ENTRANCE (0-30%)
      scrollTl.fromTo(
        bgImageRef.current,
        { scale: 1.10, opacity: 0.6, x: '4vw' },
        { scale: 1.00, opacity: 1, x: 0, ease: 'none' },
        0
      );

      // Headline block entrance
      scrollTl.fromTo(
        headlineRef.current,
        { x: '-50vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      // Caption entrance
      scrollTl.fromTo(
        captionRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.15
      );

      // Paragraph entrance
      scrollTl.fromTo(
        paragraphRef.current,
        { x: '10vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.20
      );

      // Badge entrance
      scrollTl.fromTo(
        badgeRef.current,
        { y: '-6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0
      );

      // SETTLE (30-70%): Elements hold position

      // EXIT (70-100%)
      scrollTl.fromTo(
        bgImageRef.current,
        { scale: 1, opacity: 1, x: 0 },
        { scale: 1.06, opacity: 0.35, x: '-3vw', ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        captionRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        paragraphRef.current,
        { x: 0, opacity: 1 },
        { x: '6vw', opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(
        badgeRef.current,
        { y: 0, opacity: 1 },
        { y: '-4vh', opacity: 0, ease: 'power2.in' },
        0.76
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="section-pinned z-20"
    >
      {/* Background Image */}
      <div 
        ref={bgImageRef}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src="/portrait.jpg" 
          alt="Tito with saxophone"
          className="w-full h-full object-cover"
          style={{ filter: 'saturate(0.7) contrast(1.05)' }}
        />
        {/* Vignette overlay */}
        <div className="absolute inset-0 vignette" />
        {/* Dark gradient from left for text readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(11, 13, 16, 0.75) 0%, rgba(11, 13, 16, 0.4) 50%, transparent 100%)'
          }}
        />
      </div>

      {/* Top-right micro-badge */}
      <div 
        ref={badgeRef}
        className="absolute right-[6vw] top-[8vh] flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-accent-gold" />
        <span className="font-mono text-xs text-text-secondary tracking-cinematic">
          Peer Support • Modal Music
        </span>
      </div>

      {/* Left headline block */}
      <div 
        ref={headlineRef}
        className="absolute left-[6vw] top-1/2 -translate-y-1/2"
        style={{ width: 'min(44vw, 560px)' }}
      >
        <h2 
          className="font-display font-black text-text-primary uppercase tracking-wide-cinematic leading-display text-shadow-cinematic mb-4"
          style={{ fontSize: 'clamp(1.5rem, 4.5vw, 3.5rem)' }}
        >
          If music has ever felt like the only thing that understood you
        </h2>
        <p 
          ref={captionRef}
          className="text-accent-gold text-lg md:text-xl font-medium"
        >
          You're in the right place.
        </p>
      </div>

      {/* Bottom-right paragraph */}
      <p 
        ref={paragraphRef}
        className="absolute right-[6vw] bottom-[6vh] text-right"
        style={{ width: 'min(34vw, 420px)' }}
      >
        <span className="text-text-secondary text-sm md:text-base leading-relaxed">
          I'm Tito — a state-certified peer support specialist and saxophonist. 
          I build quiet, modal soundscapes and honest conversations for people 
          navigating heavy seasons.
        </span>
      </p>
    </section>
  );
}
