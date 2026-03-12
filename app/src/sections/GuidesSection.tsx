import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GuidesSection = () => {
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
          stagger: 0.14,
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
      id="guides"
      className="relative py-28 md:py-40 px-6 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 80% 40%, rgba(0,217,255,0.04) 0%, transparent 60%)',
        }}
      />

      {/* Top divider line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px"
        style={{
          height: '80px',
          background: 'linear-gradient(to bottom, transparent, rgba(0,217,255,0.25), transparent)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Section heading */}
        <div className="text-center mb-16">
          <p className="fade-up font-script mb-3" style={{ color: '#00d9ff', fontSize: '1.2rem' }}>
            start here
          </p>
          <h2
            className="fade-up font-heading mb-4"
            style={{ fontSize: 'clamp(28px, 4.5vw, 36px)', color: '#dce8f0' }}
          >
            A Free Guide for Songwriters & Creatives
          </h2>
          <p className="fade-up font-body" style={{ color: '#7a92b0', fontSize: '1.1rem', maxWidth: '520px', margin: '0 auto' }}>
            New to music? Just starting to write? This is exactly where to begin —
            no experience required, only curiosity.
          </p>
        </div>

        {/* Single card */}
        <div className="fade-up">
          <div
            className="glass-card rounded-2xl p-10 md:p-14 flex flex-col gap-6 group"
            style={{ transition: 'border-color 0.4s ease, box-shadow 0.4s ease' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0,217,255,0.28)';
              e.currentTarget.style.boxShadow = '0 0 60px rgba(0,217,255,0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0,217,255,0.10)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Label */}
            <div className="flex items-center gap-3">
              <span
                className="font-ui uppercase tracking-widest"
                style={{ fontSize: '0.65rem', color: 'rgba(0,217,255,0.55)' }}
              >
                For Songwriters &amp; Creatives
              </span>
              <span
                className="font-ui uppercase tracking-widest px-2 py-0.5 rounded"
                style={{
                  fontSize: '0.6rem',
                  color: 'rgba(0,217,255,0.7)',
                  border: '1px solid rgba(0,217,255,0.2)',
                  background: 'rgba(0,217,255,0.05)',
                }}
              >
                Beginner Friendly
              </span>
            </div>

            {/* Title */}
            <div>
              <h3
                className="font-heading mb-2"
                style={{ fontSize: 'clamp(22px, 3vw, 28px)', color: '#dce8f0', lineHeight: 1.3 }}
              >
                The Emotional Star Map
              </h3>
              <p
                className="font-body italic"
                style={{ fontSize: '1rem', color: 'rgba(122,146,176,0.8)' }}
              >
                A Songwriter's Guide to Mapping Feelings in Music
              </p>
            </div>

            {/* Description */}
            <p
              className="font-body"
              style={{ fontSize: '1.05rem', color: '#7a92b0', lineHeight: 1.85 }}
            >
              A creative framework for translating raw emotion into music. Whether you've
              never written a song or are just finding your voice — this guide meets you
              exactly where you are. Seven modal palettes. Four emotional bridges.
              A song-feeling journal to help you turn what you feel into what you create.
            </p>

            {/* What you'll get */}
            <ul
              className="font-body flex flex-col gap-2"
              style={{ fontSize: '0.95rem', color: '#7a92b0' }}
            >
              {[
                'Understand how emotions map to music — even without theory',
                'Discover your personal sound palette',
                'Use journaling prompts to unlock your first (or next) song',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span style={{ color: 'rgba(0,217,255,0.5)', marginTop: '2px' }}>✦</span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Notion badge */}
            <p
              className="font-ui"
              style={{ fontSize: '0.75rem', color: 'rgba(122,146,176,0.55)', letterSpacing: '0.04em' }}
            >
              ✦ Delivered as an interactive Notion guide — free to duplicate and use at your own pace.
            </p>

            {/* CTA */}
            <div className="pt-2">
              <a href="https://titodreamingwith.me/initial-optin" className="btn-outline-cyan">
                Download Free
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuidesSection;
