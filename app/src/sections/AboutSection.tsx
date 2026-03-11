import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
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
          stagger: 0.16,
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
      id="about"
      className="relative py-28 md:py-40 px-6 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 50% at 15% 55%, rgba(0,217,255,0.04) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-24 items-center">

          {/* Photo column */}
          <div className="fade-up flex justify-center">
            <div className="relative">
              {/* Outer slow-pulsing ring */}
              <div
                className="absolute rounded-full"
                style={{
                  inset: '-16px',
                  border: '1px solid rgba(0,217,255,0.14)',
                  animation: 'pulse-ring 5s ease-in-out infinite',
                }}
              />
              {/* Middle ring */}
              <div
                className="absolute rounded-full"
                style={{
                  inset: '-8px',
                  border: '1px solid rgba(0,217,255,0.08)',
                }}
              />
              {/* Photo */}
              <div
                className="relative rounded-full overflow-hidden flex items-center justify-center"
                style={{
                  width: 'clamp(200px, 30vw, 280px)',
                  height: 'clamp(200px, 30vw, 280px)',
                  background: 'rgba(15, 20, 40, 0.9)',
                  border: '1px solid rgba(0,217,255,0.18)',
                  boxShadow: '0 0 60px rgba(0,217,255,0.07)',
                }}
              >
                <img
                  src="/images/IMG_7145.jpeg"
                  alt="Tito"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="w-full text-center md:text-left">
            <p className="fade-up font-script mb-2" style={{ color: '#00d9ff', fontSize: '1.2rem' }}>
              Who is
            </p>
            <h2
              className="fade-up font-heading mb-8"
              style={{ fontSize: 'clamp(28px, 5vw, 4rem)', color: '#dce8f0' }}
            >
              Tito?
            </h2>

            <div className="space-y-5">
              <p className="fade-up font-body" style={{ color: '#7a92b0', fontSize: '1.15rem', lineHeight: 1.8 }}>
                I'm a state-certified peer support specialist, soprano saxophonist, and someone who found
                his way through mental illness partly through music.
              </p>
              <p className="fade-up font-body" style={{ color: '#7a92b0', fontSize: '1.15rem', lineHeight: 1.8 }}>
                I built this space for people carrying heavy things who sense that healing lives
                somewhere beyond words alone.
              </p>
              <p className="fade-up font-body" style={{ color: '#7a92b0', fontSize: '1.15rem', lineHeight: 1.8 }}>
                This work is rooted in modal music, mystical traditions, and lived experience —
                not a textbook.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
