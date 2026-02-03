import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const quoteCardRef = useRef<HTMLDivElement>(null);
  const quoteTextRef = useRef<HTMLHeadingElement>(null);
  const attributionRef = useRef<HTMLParagraphElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const quoteCard = quoteCardRef.current;
    const quoteText = quoteTextRef.current;
    const attribution = attributionRef.current;
    const link = linkRef.current;
    const rings = ringsRef.current;

    if (!section || !bg || !quoteCard || !quoteText || !attribution || !link || !rings) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(bg, { scale: 1.1, opacity: 0 });
      gsap.set(quoteCard, { rotateY: -15, opacity: 0, x: -50 });
      gsap.set(quoteText, { clipPath: 'inset(0 100% 0 0)' });
      gsap.set(attribution, { opacity: 0, y: 20 });
      gsap.set(link, { opacity: 0, y: 20 });

      // Entrance timeline
      const tl = gsap.timeline({ delay: 0.3 });

      tl.to(bg, {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: 'power2.out',
      })
        .to(
          quoteCard,
          {
            rotateY: 0,
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=1.4'
        )
        .to(
          quoteText,
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.5,
            ease: 'power2.out',
          },
          '-=0.6'
        )
        .to(
          attribution,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.8'
        )
        .to(
          link,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4'
        );

      // Sound wave rings animation
      const ringElements = rings.querySelectorAll('.sound-ring');
      ringElements.forEach((ring, index) => {
        gsap.to(ring, {
          scale: 2.5,
          opacity: 0,
          duration: 3,
          delay: index * 1,
          repeat: -1,
          ease: 'power1.out',
        });
      });

      // Scroll parallax effect
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(bg, {
            y: progress * 30 + '%',
            scale: 1 + progress * 0.15,
          });
          gsap.set(quoteCard, {
            y: progress * -50,
            rotateX: progress * 5,
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image with Ken Burns */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform' }}
      >
        <img
          src="/images/hero-bg.jpg"
          alt="Healing atmosphere"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
      </div>

      {/* Sound Wave Rings */}
      <div
        ref={ringsRef}
        className="absolute right-[15%] top-1/2 -translate-y-1/2 pointer-events-none"
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="sound-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-warm-beige/30"
            style={{ transform: 'translate(-50%, -50%) scale(0)' }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-end px-4 sm:px-8 lg:px-16">
        <div
          ref={quoteCardRef}
          className="max-w-xl mr-0 lg:mr-[10%]"
          style={{ perspective: '1000px' }}
        >
          {/* Quote Card with Glassmorphism */}
          <div className="glass-dark rounded-lg p-8 sm:p-12 border border-white/10">
            {/* Quote Mark */}
            <div className="text-warm-beige text-6xl sm:text-8xl font-display leading-none mb-4 opacity-60">
              "
            </div>

            {/* Quote Text */}
            <h1
              ref={quoteTextRef}
              className="font-display text-3xl sm:text-4xl lg:text-5xl text-white font-light leading-tight mb-6"
            >
              I Believe Sound & Story Heal.
            </h1>

            {/* Attribution */}
            <p
              ref={attributionRef}
              className="font-body text-white/80 text-lg mb-4"
            >
              - Your Name
            </p>

            {/* Event Link */}
            <a
              ref={linkRef}
              href="#contact"
              className="inline-block font-body text-warm-beige text-sm hover:text-white transition-colors duration-300 underline underline-offset-4"
            >
              Upcoming Event: Healing Sound Journey - March 2026
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
