import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Starfield } from '../components/Starfield';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        headlineRef.current?.querySelectorAll('.word') ?? [],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.06 },
        0.1
      );
      tl.fromTo(subheadlineRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 0.5);
      tl.fromTo(ctaRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, 0.8);
      tl.fromTo(bottomRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1.1);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex items-center justify-center z-10 min-h-screen min-h-[100dvh]"
    >
      {/* Background photo */}
      <div className="absolute inset-0">
        <img
          src="/generated-image.png"
          alt=""
          width="1920"
          height="1080"
          className="w-full h-full object-cover object-center"
          style={{ filter: 'saturate(0.6) contrast(1.05)' }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(11,13,16,0.55)' }} />
      </div>

      <div className="absolute inset-0">
        <Starfield starCount={60} />
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] glow-gold opacity-30 pointer-events-none" />

      <div className="relative z-10 text-center px-6 w-full max-w-3xl mx-auto">
        <h1
          ref={headlineRef}
          className="font-script italic font-semibold text-text-primary leading-display mb-5"
          style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)' }}
        >
          <span className="word inline-block">Write</span>{' '}
          <span className="word inline-block">songs</span>{' '}
          <span className="word inline-block">that</span>{' '}
          <span className="word inline-block">sound</span>{' '}
          <span className="word inline-block">exactly</span>{' '}
          <span className="word inline-block">how</span>{' '}
          <span className="word inline-block">you</span>{' '}
          <span className="word inline-block">feel.</span>
        </h1>

        <p
          ref={subheadlineRef}
          className="text-text-secondary text-base md:text-xl mb-8 font-light max-w-2xl mx-auto"
        >
          Stop losing the raw emotion of your songs to "safe" chord patterns. Map the feeling directly to the music.
        </p>

        <div ref={ctaRef} className="flex flex-col items-center gap-5">
          <p className="font-script italic text-accent-gold/90" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}>
            "Damn the rules! It's the feeling that counts."
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          <button
            onClick={() => document.getElementById('toolkit')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto btn-hover px-8 py-3 bg-accent-gold text-bg-primary font-medium rounded-full text-sm tracking-wide transition-all hover:shadow-glow"
          >
            Get the Songwriter's Edition
          </button>
          <button
            onClick={() => document.getElementById('free-guide')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto btn-hover px-8 py-3 border border-text-primary/20 text-text-primary rounded-full text-sm tracking-wide transition-all hover:border-accent-gold hover:text-accent-gold"
          >
            Get the Free Guide
          </button>
          </div>
        </div>
      </div>

      <div ref={bottomRef} className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <span className="font-mono text-xs text-text-secondary/40 tracking-cinematic">Scroll</span>
        <ChevronDown className="w-4 h-4 text-text-secondary/40 animate-bounce" />
      </div>
    </section>
  );
}
