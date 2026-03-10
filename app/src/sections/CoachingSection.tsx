import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    name: 'The Navigation\nSession',
    price: '$150',
    description:
      'One focused hour of personalized healing guidance. We begin where you are — no agenda, no performance.',
    cta: 'Book Now',
    href: 'https://app.paperbell.com/checkout/packages/121537',
    featured: false,
  },
  {
    name: 'The Journey',
    price: '$397',
    description:
      'Three sessions of sustained healing guidance. Enough space to go deep, find patterns, and begin real movement.',
    cta: 'Book Now',
    href: 'https://app.paperbell.com/checkout/packages/118390',
    featured: true,
  },
  {
    name: 'The Deep\nNavigation',
    price: '$747',
    description:
      'Six sessions of ongoing healing work over 2–3 months. For those ready for sustained transformation.',
    cta: 'Book Now',
    href: 'https://app.paperbell.com/checkout/packages/204726',
    featured: false,
  },
];

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

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="fade-up relative flex flex-col"
              style={{ borderRadius: '1.25rem' }}
            >
              {pkg.featured && (
                <div
                  className="absolute -top-px left-0 right-0 h-px"
                  style={{
                    background: 'linear-gradient(90deg, transparent, #00d9ff, transparent)',
                    borderRadius: '9999px',
                  }}
                />
              )}

              <div
                className="flex flex-col flex-1 rounded-2xl p-7 md:p-8"
                style={{
                  background: pkg.featured
                    ? 'rgba(0,217,255,0.05)'
                    : 'rgba(10, 14, 26, 0.80)',
                  backdropFilter: 'blur(20px)',
                  border: pkg.featured
                    ? '1px solid rgba(0,217,255,0.28)'
                    : '1px solid rgba(0,217,255,0.09)',
                  boxShadow: pkg.featured
                    ? '0 0 60px rgba(0,217,255,0.08), 0 0 120px rgba(0,217,255,0.04)'
                    : 'none',
                  transition: 'border-color 0.4s ease',
                }}
              >
                {pkg.featured && (
                  <div className="mb-4">
                    <span
                      className="font-ui uppercase tracking-widest"
                      style={{
                        fontSize: '0.6rem',
                        color: '#00d9ff',
                        background: 'rgba(0,217,255,0.1)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        border: '1px solid rgba(0,217,255,0.25)',
                      }}
                    >
                      Most Popular
                    </span>
                  </div>
                )}

                <h3
                  className="font-heading mb-4"
                  style={{
                    fontSize: '1.05rem',
                    color: '#dce8f0',
                    lineHeight: 1.35,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {pkg.name}
                </h3>

                <div className="mb-5">
                  <span
                    className="font-heading"
                    style={{ fontSize: '2.5rem', color: pkg.featured ? '#00d9ff' : '#dce8f0' }}
                  >
                    {pkg.price}
                  </span>
                </div>

                <p
                  className="font-body flex-1 mb-7"
                  style={{ fontSize: '1.05rem', color: '#7a92b0', lineHeight: 1.75 }}
                >
                  {pkg.description}
                </p>

                <a
                  href={pkg.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={pkg.featured ? 'btn-cyan' : 'btn-outline-cyan'}
                  style={{ textAlign: 'center' }}
                >
                  {pkg.cta}
                </a>
              </div>
            </div>
          ))}
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
