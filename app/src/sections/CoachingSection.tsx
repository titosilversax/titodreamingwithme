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
          <p className="fade-up font-script mb-3" style={{ color: '#00d9ff', fontSize: '1.2rem' }}>
            go deeper
          </p>
          <h2
            className="fade-up font-heading mb-4"
            style={{ fontSize: 'clamp(28px, 4.5vw, 36px)', color: '#dce8f0' }}
          >
            Ready to Go Deeper?
          </h2>
          <p
            className="fade-up font-body"
            style={{ color: '#7a92b0', fontSize: '1.1rem', maxWidth: '36rem', margin: '0 auto' }}
          >
            One-on-one healing guidance through music, peer support, and lived experience.
          </p>
        </div>

        {/* Tally application form */}
        <div className="fade-up" style={{ position: 'relative', height: '100vh' }}>
          <iframe
            src="https://tally.so/r/KYoE2X?transparentBackground=1&formEventsForwarding=1"
            width="100%"
            height="100%"
            title="Apply to Work with Tito Dreaming With Me"
            style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, border: 0 }}
          />
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
