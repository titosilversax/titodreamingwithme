import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CoachingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current?.querySelectorAll('.fade-up');
      if (!els?.length) return;
      gsap.fromTo(
        els,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.13,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const w = 'https://tally.so/widgets/embed.js';
    if (!document.querySelector(`script[src="${w}"]`)) {
      const s = document.createElement('script');
      s.src = w;
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="coaching"
      className="relative py-28 md:py-40 px-6 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(0,217,255,0.04) 0%, transparent 65%)',
        }}
      />

      {/* Top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px"
        style={{
          height: '80px',
          background: 'linear-gradient(to bottom, transparent, rgba(0,217,255,0.25), transparent)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Section heading */}
        <div className="text-center mb-16">
          <p className="fade-up font-script mb-3" style={{ color: '#00d9ff', fontSize: '1.4rem' }}>
            go deeper
          </p>
          <h2
            className="fade-up font-heading text-gradient-cyber mb-4"
            style={{ fontSize: 'clamp(34px, 5vw, 50px)' }}
          >
            Ready to Go Deeper?
          </h2>
          <p
            className="fade-up font-body"
            style={{ color: '#7a92b0', fontSize: '1.65rem', maxWidth: '36rem', margin: '0 auto' }}
          >
            One-on-one healing guidance through music, peer support, and lived experience.
          </p>
        </div>

        {/* Feature points */}
        <div className="fade-up max-w-lg mx-auto mb-10">
          <ul className="space-y-4">
            {[
              'One-on-one sessions rooted in music and lived experience',
              'Peer support — not therapy, but deeply real',
              'Modal music as a tool for emotional mapping and healing',
              'A safe, non-judgmental space to explore what you\'re carrying',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 font-body" style={{ color: '#7a92b0', fontSize: '1.1rem', lineHeight: 1.7 }}>
                <span style={{ color: 'rgba(0,217,255,0.55)', marginTop: '3px', flexShrink: 0 }}>✦</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Tally popup button */}
        <div className="fade-up text-center">
          <button
            data-tally-open="KYoE2X"
            data-tally-width="777"
            data-tally-align-left="1"
            data-tally-overlay="1"
            data-tally-emoji-text="👋"
            data-tally-emoji-animation="wave"
            data-tally-auto-close="1000"
            data-tally-form-events-forwarding="1"
            className="btn-cyan"
          >
            Apply to Work with Tito
          </button>
          <p className="font-ui mt-4" style={{ fontSize: '0.72rem', color: 'rgba(122,146,176,0.5)', letterSpacing: '0.05em' }}>
            Limited spots available · Applications reviewed personally
          </p>
        </div>

        {/* Disclaimer */}
        <p
          className="fade-up font-ui text-center mt-12"
          style={{
            fontSize: '0.72rem',
            color: 'rgba(122,146,176,0.5)',
            lineHeight: 1.7,
            maxWidth: '42rem',
            margin: '3rem auto 0',
            letterSpacing: '0.01em',
          }}
        >
          Tito Dreaming With Me offers coaching and peer support services, not psychotherapy or
          clinical mental health treatment. Tito is not a licensed therapist or medical professional.
          If you are experiencing a mental health crisis please contact a licensed professional or
          call{' '}
          <a
            href="tel:988"
            style={{ color: 'rgba(0,217,255,0.55)', textDecoration: 'none' }}
          >
            988
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default CoachingSection;
