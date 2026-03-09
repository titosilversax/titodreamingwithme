import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const guides = [
  {
    number: '01',
    label: 'For Healing & Wellness',
    title: 'The Emotional Star Map',
    subtitle: 'A Guide to Mapping Feelings for Healing & Wellness',
    description:
      'A feeling-first navigation system for anyone carrying big emotions. Seven emotional territories. Four bridges between them. A daily journal practice.',
    cta: 'Download Free',
    href: 'https://titodreamingwith.me/initial-optin',
  },
  {
    number: '02',
    label: 'For Songwriters',
    title: 'The Emotional Star Map',
    subtitle: "A Songwriter's Guide to Mapping Feelings in Music",
    description:
      'A creative framework for translating raw emotion into music. Seven modal palettes. Four emotional bridges. A song feeling journal.',
    cta: 'Download Free',
    href: 'https://titodreamingwith.me/initial-optin',
  },
];

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

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Section heading */}
        <div className="text-center mb-16">
          <p className="fade-up font-script mb-3" style={{ color: '#00d9ff', fontSize: '1.2rem' }}>
            begin here
          </p>
          <h2
            className="fade-up font-heading mb-4"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', color: '#dce8f0' }}
          >
            Two Free Guides
          </h2>
          <p className="fade-up font-body" style={{ color: '#7a92b0', fontSize: '1.1rem' }}>
            No music background required for either.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {guides.map((guide) => (
            <div
              key={guide.number}
              className="fade-up glass-card rounded-2xl p-8 md:p-10 flex flex-col gap-5 group"
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
              {/* Number + label */}
              <div className="flex items-baseline gap-4">
                <span
                  className="font-heading"
                  style={{ fontSize: '3.5rem', color: 'rgba(0,217,255,0.15)', lineHeight: 1 }}
                >
                  {guide.number}
                </span>
                <span
                  className="font-ui uppercase tracking-widest"
                  style={{ fontSize: '0.65rem', color: 'rgba(0,217,255,0.55)' }}
                >
                  {guide.label}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3
                  className="font-heading mb-1"
                  style={{ fontSize: '1.05rem', color: '#dce8f0', lineHeight: 1.4 }}
                >
                  {guide.title}
                </h3>
                <p
                  className="font-body italic"
                  style={{ fontSize: '0.95rem', color: 'rgba(122,146,176,0.8)' }}
                >
                  {guide.subtitle}
                </p>
              </div>

              {/* Description */}
              <p
                className="font-body flex-1"
                style={{ fontSize: '1.05rem', color: '#7a92b0', lineHeight: 1.75 }}
              >
                {guide.description}
              </p>

              {/* CTA */}
              <div>
                <a href={guide.href} className="btn-outline-cyan">
                  {guide.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuidesSection;
