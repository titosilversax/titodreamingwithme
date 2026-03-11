import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SkoolSection = () => {
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
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="community"
      className="relative py-28 md:py-40 px-6 overflow-hidden"
    >
      {/* Background elements */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,217,255,0.03) 0%, transparent 70%)',
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
        <div className="flex flex-col items-center text-center">
          <div
            className="fade-up flex items-center justify-center mb-6"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(0,217,255,0.05)',
              border: '1px solid rgba(0,217,255,0.15)',
              color: '#00d9ff',
            }}
          >
            <Users size={28} style={{ opacity: 0.9 }} />
          </div>

          <p className="fade-up font-script mb-3" style={{ color: '#00d9ff', fontSize: '1.2rem' }}>
            join the community
          </p>
          <h2
            className="fade-up font-heading mb-6"
            style={{ fontSize: 'clamp(32px, 5vw, 44px)', color: '#dce8f0', lineHeight: 1.1 }}
          >
            Dream into Yourself
          </h2>
          <p
            className="fade-up font-body mb-8"
            style={{
              color: '#7a92b0',
              fontSize: '1.15rem',
              lineHeight: 1.8,
              maxWidth: '38rem',
            }}
          >
            A community space for spiritual and integrative musicians learning to compose with
            emotional color. Connect with like-minded artists, share your journey, and deepen
            your musical expression in a supportive environment.
          </p>

          <div className="fade-up mt-4">
            <a
              href="https://www.skool.com/meditative-musicians-6593"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-cyan"
              style={{
                fontSize: '0.85rem',
                padding: '0.85rem 2.25rem',
                boxShadow: '0 0 20px rgba(0, 217, 255, 0.1)',
              }}
            >
              <span>Join on Skool</span>
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>

          {/* Features snippet */}
          <div className="fade-up grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-16 w-full" style={{ borderTop: '1px solid rgba(0,217,255,0.08)' }}>
             <div className="flex flex-col items-center flex-1">
                <span className="font-heading mb-2" style={{ color: '#dce8f0', fontSize: '1.1rem' }}>Discussions</span>
                <span className="font-body text-center" style={{ color: '#7a92b0', fontSize: '0.95rem' }}>Connect through music and shared experiences.</span>
             </div>
             <div className="flex flex-col items-center flex-1">
                <span className="font-heading mb-2" style={{ color: '#dce8f0', fontSize: '1.1rem' }}>Emotional Color</span>
                <span className="font-body text-center" style={{ color: '#7a92b0', fontSize: '0.95rem' }}>Learn to compose with deep feeling.</span>
             </div>
             <div className="flex flex-col items-center flex-1">
                <span className="font-heading mb-2" style={{ color: '#dce8f0', fontSize: '1.1rem' }}>Free Access</span>
                <span className="font-body text-center" style={{ color: '#7a92b0', fontSize: '0.95rem' }}>Join the community at no cost.</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkoolSection;
