import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Headphones } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface LyricsSectionProps {
  className?: string;
}

const LyricsSection = ({ className = '' }: LyricsSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const lyricsLinesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      // Card enters from right
      scrollTl.fromTo(
        cardRef.current,
        { x: '60vw', opacity: 0, rotateY: -18, scale: 0.96 },
        { x: 0, opacity: 1, rotateY: 0, scale: 1, ease: 'none' },
        0
      );

      // Headline enters from left
      scrollTl.fromTo(
        headlineRef.current,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // Subheadline fades up
      scrollTl.fromTo(
        subheadlineRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      // Lyrics lines stagger in
      if (lyricsLinesRef.current) {
        const lines = lyricsLinesRef.current.querySelectorAll('.lyric-line');
        scrollTl.fromTo(
          lines,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, stagger: 0.02, ease: 'none' },
          0.15
        );
      }

      // SETTLE (30% - 70%): Hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        cardRef.current,
        { x: 0, rotateY: 0, opacity: 1 },
        { x: '26vw', rotateY: 12, opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        [headlineRef.current, subheadlineRef.current],
        { x: 0, opacity: 1 },
        { x: '-14vw', opacity: 0, ease: 'power2.in' },
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
      id="lyrics"
      className={`section-pinned ${className}`}
    >
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/images/constellation-starfield.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-[#0B0F1F]/50" />

      {/* Left Side - Headline */}
      <div className="absolute left-[8vw] top-1/2 -translate-y-1/2 max-w-[35vw] hidden md:block">
        <div ref={headlineRef} className="mb-6">
          <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl text-[#F5F1E8] leading-tight tracking-wide">
            EVERY WORD
            <br />
            <span className="text-[#D4A574]">SPOKEN</span>
          </h2>
        </div>
        <p
          ref={subheadlineRef}
          className="font-body text-base lg:text-lg text-[#A9B3C7] leading-relaxed"
        >
          Bilingual tales for anxiety, grief, and rest.
        </p>
      </div>

      {/* Right Side - Lyrics Card */}
      <div
        ref={cardRef}
        className="absolute right-[6vw] md:right-[8vw] top-1/2 -translate-y-1/2 w-[85vw] md:w-[42vw] min-h-[50vh] md:min-h-[62vh]"
        style={{ perspective: '1000px' }}
      >
        <div
          className="relative w-full h-full rounded-[28px] p-8 md:p-10"
          style={{
            background: 'linear-gradient(135deg, rgba(245, 241, 232, 0.95) 0%, rgba(245, 241, 232, 0.85) 100%)',
            boxShadow: '0 24px 70px rgba(0, 0, 0, 0.45)',
          }}
        >
          {/* Card Header */}
          <div className="mb-8">
            <span className="font-heading text-sm tracking-[0.2em] text-[#4a5d7c]">
              CUENTOS
            </span>
          </div>

          {/* Handwritten Lyrics */}
          <div ref={lyricsLinesRef} className="mb-10">
            <p className="font-script text-xl md:text-2xl lg:text-3xl text-[#0B0F1F] leading-relaxed">
              <span className="lyric-line block">The moon is a door</span>
              <span className="lyric-line block">and the tide is a key</span>
              <span className="lyric-line block">turn it slowly</span>
              <span className="lyric-line block">the water will wait for you</span>
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={scrollToCuentos}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#0B0F1F] text-[#F5F1E8] font-body text-sm hover:bg-[#1a1f3a] transition-colors group"
          >
            <Headphones className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Listen to Cuentos
          </button>

          {/* Decorative elements */}
          <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-[#D4A574]" />
          <div className="absolute bottom-6 right-6 w-3 h-3 rounded-full bg-[#4a5d7c] opacity-30" />
        </div>
      </div>

      {/* Mobile Headline (shown only on small screens) */}
      <div className="absolute top-[15vh] left-0 right-0 text-center md:hidden px-6">
        <h2 className="font-heading text-3xl text-[#F5F1E8] leading-tight tracking-wide mb-2">
          EVERY WORD <span className="text-[#D4A574]">SPOKEN</span>
        </h2>
        <p className="font-body text-sm text-[#A9B3C7]">
          Bilingual tales for anxiety, grief, and rest.
        </p>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0F1F] to-transparent" />
    </section>
  );
};

export default LyricsSection;
