import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Palette, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Users,
    title: 'Monthly Circles',
    description: 'Virtual gatherings for shared healing experiences',
  },
  {
    icon: Palette,
    title: 'Creative Workshops',
    description: 'Learn to use music and art for emotional wellness',
  },
  {
    icon: Heart,
    title: 'Peer Support Network',
    description: 'Connect with others on similar healing journeys',
  },
];

export default function CommunitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const centerImageRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ringsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const centerImage = centerImageRef.current;
    const pillarElements = pillarsRef.current.filter(Boolean);
    const rings = ringsRef.current;
    const cta = ctaRef.current;

    if (!section || !heading || !centerImage || pillarElements.length === 0 || !rings || !cta) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.set(heading, { y: 30, opacity: 0 });
      ScrollTrigger.create({
        trigger: heading,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(heading, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
          });
        },
        once: true,
      });

      // Center image circle reveal
      gsap.set(centerImage, { clipPath: 'circle(0% at 50% 50%)' });
      ScrollTrigger.create({
        trigger: centerImage,
        start: 'top 75%',
        onEnter: () => {
          gsap.to(centerImage, {
            clipPath: 'circle(50% at 50% 50%)',
            duration: 1,
            delay: 0.3,
            ease: 'power3.out',
          });
        },
        once: true,
      });

      // Sound rings animation
      const ringElements = rings.querySelectorAll('.community-ring');
      ringElements.forEach((ring, index) => {
        gsap.set(ring, { scale: 0, opacity: 0 });
        ScrollTrigger.create({
          trigger: rings,
          start: 'top 70%',
          onEnter: () => {
            gsap.to(ring, {
              scale: 2,
              opacity: 0.3,
              duration: 2,
              delay: 0.8 + index * 0.3,
              ease: 'power2.out',
            });
          },
          once: true,
        });
      });

      // Pillars orbit entrance
      pillarElements.forEach((pillar, index) => {
        gsap.set(pillar, { opacity: 0, scale: 0.8 });
        ScrollTrigger.create({
          trigger: pillar,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(pillar, {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              delay: 1 + index * 0.15,
              ease: 'power2.out',
            });
          },
          once: true,
        });
      });

      // CTA bounce in
      gsap.set(cta, { scale: 0, opacity: 0 });
      ScrollTrigger.create({
        trigger: cta,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(cta, {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: 1.5,
            ease: 'back.out(1.7)',
          });
        },
        once: true,
      });

      // Continuous ring pulse
      ringElements.forEach((ring, index) => {
        gsap.to(ring, {
          scale: 2.5,
          opacity: 0,
          duration: 3,
          delay: 2 + index * 1,
          repeat: -1,
          ease: 'power1.out',
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="community"
      ref={sectionRef}
      className="relative py-20 sm:py-32 bg-gradient-to-b from-[#1a1a2e] to-[#151525] overflow-hidden"
    >
      {/* Decorative mandala pattern (subtle) - hidden on mobile to prevent overflow */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-auto pointer-events-none opacity-5 hidden sm:block"
        viewBox="0 0 400 400"
      >
        <circle cx="200" cy="200" r="150" fill="none" stroke="#c9a961" strokeWidth="1" />
        <circle cx="200" cy="200" r="120" fill="none" stroke="#c9a961" strokeWidth="1" />
        <circle cx="200" cy="200" r="90" fill="none" stroke="#c9a961" strokeWidth="1" />
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1="200"
            y1="200"
            x2={200 + 150 * Math.cos((i * Math.PI) / 4)}
            y2={200 + 150 * Math.sin((i * Math.PI) / 4)}
            stroke="#c9a961"
            strokeWidth="1"
          />
        ))}
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl text-[#e8d4a0] font-light mb-4">
            Join Our Community
          </h2>
          <p className="font-body text-[#e8d4a0]/80 text-lg max-w-2xl mx-auto">
            Connect, heal, and grow together in a supportive space designed for your wellness journey
          </p>
        </div>

        {/* Center Hub Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center Image */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              <div
                ref={centerImageRef}
                className="w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-soft-lg"
              >
                <img
                  src="/images/community.jpg"
                  alt="Community gathering"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Sound rings */}
              <div ref={ringsRef} className="absolute inset-0 pointer-events-none">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="community-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 rounded-full border-2 border-[#c9a961]"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Pillars Grid */}
          <div className="grid sm:grid-cols-3 gap-8 mb-12">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={index}
                  ref={(el) => { pillarsRef.current[index] = el; }}
                  className="text-center group"
                >
                  {/* Icon */}
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#c9a961]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-pulse-glow">
                      <Icon className="w-8 h-8 text-[#c9a961]" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl text-white mb-2">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-[#e8d4a0]/70 text-sm">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div ref={ctaRef} className="text-center">
            <Button
              size="lg"
              className="bg-[#c9a961] text-[#1a1a2e] hover:bg-[#e8d4a0] transition-all duration-300 group"
            >
              Become a Member
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
