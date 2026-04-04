import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Starfield } from '../components/Starfield';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microcopyRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const starfieldRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Starfield fade in
      tl.fromTo(
        starfieldRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6 },
        0
      );

      // Headline words animation
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { opacity: 0, y: 26, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.04 },
          0.2
        );
      }

      // Subheadline
      tl.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.8
      );

      // CTAs
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('button');
        tl.fromTo(
          buttons,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
          1
        );
      }

      // Microcopy and scroll hint
      tl.fromTo(
        [microcopyRef.current, scrollHintRef.current],
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        1.2
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
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
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current, microcopyRef.current], {
              opacity: 1, y: 0, scale: 1
            });
            gsap.set(scrollHintRef.current, { opacity: 1, y: 0 });
            gsap.set(starfieldRef.current, { opacity: 1, scale: 1 });
          }
        }
      });

      // ENTRANCE (0-30%): Hold - elements already visible from load animation
      // SETTLE (30-70%): Hold - static reading window
      
      // EXIT (70-100%)
      // Headline block exit
      scrollTl.fromTo(
        headlineRef.current,
        { opacity: 1, y: 0, scale: 1 },
        { opacity: 0, y: '-18vh', scale: 0.96, ease: 'power2.in' },
        0.70
      );

      // Subheadline exit
      scrollTl.fromTo(
        subheadlineRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: '-12vh', ease: 'power2.in' },
        0.72
      );

      // Starfield exit
      scrollTl.fromTo(
        starfieldRef.current,
        { opacity: 1, scale: 1 },
        { opacity: 0.35, scale: 1.06, ease: 'power2.in' },
        0.70
      );

      // CTA row exit
      scrollTl.fromTo(
        ctaRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: '-10vh', ease: 'power2.in' },
        0.75
      );

      // Bottom elements exit
      scrollTl.fromTo(
        [microcopyRef.current, scrollHintRef.current],
        { opacity: 1, y: 0 },
        { opacity: 0, y: '6vh', ease: 'power2.in' },
        0.78
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToOfferings = () => {
    const offeringsSection = document.getElementById('offerings');
    if (offeringsSection) {
      offeringsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="hero"
      className="section-pinned flex items-center justify-center z-10"
    >
      {/* Starfield Background */}
      <div ref={starfieldRef} className="absolute inset-0">
        <Starfield starCount={140} />
      </div>

      {/* Glow behind headline */}
      <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] glow-gold opacity-50" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6" style={{ width: 'min(78vw, 980px)' }}>
        {/* Headline */}
        <h1 
          ref={headlineRef}
          className="font-display font-black text-text-primary uppercase tracking-wide-cinematic leading-display mb-6"
          style={{ fontSize: 'clamp(2rem, 8vw, 5.5rem)' }}
        >
          <span className="word inline-block">Healing</span>{' '}
          <span className="word inline-block">Soundscapes</span>
        </h1>

        {/* Subheadline */}
        <p 
          ref={subheadlineRef}
          className="text-text-secondary text-lg md:text-xl lg:text-2xl mb-10 font-light"
        >
          For the ones who feel deeply.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={scrollToOfferings}
            className="btn-hover px-8 py-3 bg-accent-gold text-bg-primary font-medium rounded-full text-sm tracking-wide transition-all hover:shadow-glow"
          >
            Explore Offerings
          </button>
          <button 
            onClick={() => window.open('https://youtube.com/@titosilversax', '_blank')}
            className="btn-hover px-8 py-3 border border-text-primary/20 text-text-primary rounded-full text-sm tracking-wide transition-all hover:border-accent-gold hover:text-accent-gold"
          >
            Listen on YouTube
          </button>
        </div>
      </div>

      {/* Bottom Microcopy */}
      <div 
        ref={microcopyRef}
        className="absolute left-[6vw] bottom-[6vh] max-w-[34vw] text-left"
      >
        <p className="font-mono text-xs text-text-secondary/70 tracking-cinematic leading-relaxed">
          Peer support + modal music.<br />
          Built from lived experience.
        </p>
      </div>

      {/* Scroll Hint */}
      <div 
        ref={scrollHintRef}
        className="absolute right-[6vw] bottom-[6vh] flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-text-secondary/50 tracking-cinematic">Scroll</span>
        <ChevronDown className="w-4 h-4 text-text-secondary/50 scroll-hint" />
      </div>
    </section>
  );
}
