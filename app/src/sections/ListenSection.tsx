import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// YouTube icon as inline SVG
const YouTubeIcon = () => (
  <svg
    width="28"
    height="20"
    viewBox="0 0 28 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="28" height="20" rx="4" fill="currentColor" />
    <path d="M11.5 5.5L19.5 10L11.5 14.5V5.5Z" fill="#0a0e1a" />
  </svg>
);

const ListenSection = () => {
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
          stagger: 0.15,
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
      id="listen"
      className="relative py-28 md:py-40 px-6 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 60% at 75% 55%, rgba(0,217,255,0.04) 0%, transparent 65%)',
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

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Section heading */}
        <div className="text-center mb-14">
          <p className="fade-up font-script mb-3" style={{ color: '#00d9ff', fontSize: '1.2rem' }}>
            the music
          </p>
          <h2
            className="fade-up font-heading mb-4"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', color: '#dce8f0' }}
          >
            The Music
          </h2>
          <p
            className="fade-up font-body"
            style={{ color: '#7a92b0', fontSize: '1.1rem', maxWidth: '32rem', margin: '0 auto' }}
          >
            Healing soundscapes for your inner world.
          </p>
        </div>

        {/* Main channel card */}
        <div
          className="fade-up glass-card rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 0 80px rgba(0,217,255,0.05)' }}
        >
          {/* Visual header */}
          <div
            className="relative flex items-center justify-center"
            style={{
              height: '220px',
              background: 'linear-gradient(135deg, rgba(0,14,30,0.95) 0%, rgba(0,30,50,0.85) 100%)',
              borderBottom: '1px solid rgba(0,217,255,0.1)',
            }}
          >
            {/* Concentric circles visual */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[120, 90, 60].map((r, i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: r * 2,
                    height: r * 2,
                    border: '1px solid rgba(0,217,255,0.08)',
                  }}
                />
              ))}
            </div>

            {/* Play button ring */}
            <a
              href="https://youtube.com/@titosilversax"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                width: 72,
                height: 72,
                background: 'rgba(0,217,255,0.12)',
                border: '1px solid rgba(0,217,255,0.3)',
                boxShadow: '0 0 40px rgba(0,217,255,0.12)',
                color: '#00d9ff',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0,217,255,0.22)';
                e.currentTarget.style.boxShadow = '0 0 60px rgba(0,217,255,0.3)';
                e.currentTarget.style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0,217,255,0.12)';
                e.currentTarget.style.boxShadow = '0 0 40px rgba(0,217,255,0.12)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              aria-label="Watch on YouTube"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ marginLeft: '3px' }}
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </a>
          </div>

          {/* Card body */}
          <div className="p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span style={{ color: '#ff0000' }}>
                  <YouTubeIcon />
                </span>
                <span
                  className="font-heading"
                  style={{ fontSize: '1.05rem', color: '#dce8f0', letterSpacing: '0.06em' }}
                >
                  @titosilversax
                </span>
              </div>
              <p
                className="font-body"
                style={{ color: '#7a92b0', fontSize: '1rem', lineHeight: 1.6 }}
              >
                Modal soundscapes, healing sessions, and music born from lived experience.
              </p>
            </div>

            <a
              href="https://youtube.com/@titosilversax"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-cyan"
              style={{ flexShrink: 0 }}
            >
              Visit Channel
            </a>
          </div>
        </div>

        {/* Subtle invitation line */}
        <p
          className="fade-up font-body italic text-center mt-10"
          style={{ color: 'rgba(122,146,176,0.5)', fontSize: '1rem' }}
        >
          Let the music meet you where you are.
        </p>
      </div>
    </section>
  );
};

export default ListenSection;
