import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ListenersSectionProps {
  className?: string;
}

const ListenersSection = ({ className = '' }: ListenersSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const comingSoonRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          },
        }
      );

      // Coming soon animation
      gsap.fromTo(
        comingSoonRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: comingSoonRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cuentos"
      className={`relative min-h-screen flex flex-col justify-center bg-[#0B0F1F] py-20 md:py-32 ${className}`}
    >
      {/* Subtle starfield background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/constellation-starfield.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.2,
          }}
        />
      </div>

      <div className="relative z-10 px-6 lg:px-12 max-w-4xl mx-auto w-full">
        {/* Header */}
        <div ref={headerRef} className="mb-12 text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#F5F1E8] tracking-wide mb-4">
            FOR <span className="text-[#D4A574]">LISTENERS</span>
          </h2>
          <p className="font-body text-base md:text-lg text-[#A9B3C7] max-w-2xl mx-auto">
            30-minute surrealist sound journeys for your nervous system.
          </p>
        </div>

        {/* Coming Soon Panel */}
        <div
          ref={comingSoonRef}
          className="glass-card rounded-[28px] p-12 md:p-16 text-center border border-[#D4A574]/20"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#D4A574]/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-[#D4A574]" />
            </div>
          </div>
          
          <h3 className="font-heading text-3xl md:text-4xl text-[#F5F1E8] mb-4 tracking-wider">
            COMING SOON
          </h3>
          <p className="font-body text-[#A9B3C7] max-w-xl mx-auto text-lg leading-relaxed">
            The studio is quiet, but the stories are brewing. Check back soon for our first collection of sound journeys.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ListenersSection;
