import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Music, Headphones, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

// Detect touch device
const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

const services = [
  {
    icon: Heart,
    title: 'Peer Support Coaching',
    description:
      "Personalized guidance for your wellness journey, grounded in lived experience and professional training.",
    features: [
      'Weekly 1-hour sessions',
      'Personalized wellness plan',
      'Text support between sessions',
      'Progress tracking',
    ],
    cta: 'Begin Your Journey',
    color: 'border-t-warm-beige',
    buttonVariant: 'default' as const,
  },
  {
    icon: Music,
    title: 'Ambient Sound Healing',
    description:
      'Immersive saxophone soundscapes designed to reduce stress, promote relaxation, and restore emotional balance.',
    features: [
      'Live ambient performance',
      'Group or individual sessions',
      'Customized for your needs',
      'Recording available',
    ],
    cta: 'Experience the Sound',
    color: 'border-t-amber-400',
    buttonVariant: 'outline' as const,
    featured: true,
  },
  {
    icon: Headphones,
    title: 'Healing Audio Library',
    description:
      'On-demand access to curated ambient saxophone recordings for meditation, sleep, and daily wellness.',
    features: [
      'Lifetime access',
      'New monthly releases',
      'Mobile app included',
      'Community access',
    ],
    cta: 'Explore the Library',
    color: 'border-t-teal-400',
    buttonVariant: 'outline' as const,
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !heading || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.set(heading, { y: 40, opacity: 0 });
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

      // Cards 3D flip animation
      cards.forEach((card, index) => {
        gsap.set(card, {
          rotateX: 25,
          y: 80,
          opacity: 0,
        });

        ScrollTrigger.create({
          trigger: card,
          start: 'top 90%',
          onEnter: () => {
            gsap.to(card, {
              rotateX: 0,
              y: index === 1 ? -30 : 0, // Center card elevated
              opacity: 1,
              duration: 0.8,
              delay: 0.5 + index * 0.15,
              ease: 'power2.out',
            });
          },
          once: true,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    // Skip 3D effect on touch devices
    if (isTouchDevice()) return;

    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX: -rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
    setHoveredCard(null);
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-20 sm:py-32 bg-gradient-to-b from-[#151525] to-[#1a1a2e] overflow-hidden"
    >
      {/* Decorative connecting lines */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
      >
        <path
          d="M200,300 Q400,200 600,300 T1000,300"
          fill="none"
          stroke="#c9a961"
          strokeWidth="1"
          strokeDasharray="8,8"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl text-[#e8d4a0] font-light mb-4">
            Services
          </h2>
          <p className="font-body text-[#e8d4a0]/80 text-lg max-w-2xl mx-auto">
            Comprehensive healing experiences combining peer support, sound therapy,
            and digital wellness resources
          </p>
        </div>

        {/* Service Cards */}
        <div
          className="grid md:grid-cols-3 gap-8"
          style={{ perspective: '1000px' }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            // Update color logic for dark mode
            const borderColor = index === 0 ? 'border-t-[#c9a961]' : index === 1 ? 'border-t-amber-500' : 'border-t-teal-500';
            const iconBg = index === 0 ? 'rgba(201, 169, 97, 0.2)' : index === 1 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(20, 184, 166, 0.2)';
            const iconColor = index === 0 ? '#c9a961' : index === 1 ? '#f59e0b' : '#14b8a6';

            return (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`relative bg-[#1a1a2e]/50 backdrop-blur-md border border-white/10 rounded-lg shadow-soft hover:shadow-soft-lg transition-shadow duration-500 overflow-hidden ${borderColor} border-t-4`}
                style={{
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {/* Featured badge */}
                {service.featured && (
                  <div className="absolute top-4 right-4 bg-amber-500 text-[#1a1a2e] text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="p-8">
                  {/* Icon */}
                  <div className="mb-6">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 ${hoveredCard === index ? 'scale-110' : ''
                        }`}
                      style={{
                        backgroundColor: iconBg,
                      }}
                    >
                      <Icon
                        className="w-7 h-7"
                        style={{
                          color: iconColor,
                        }}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl text-white mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-[#e8d4a0]/70 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature, fIndex) => (
                      <li
                        key={fIndex}
                        className="flex items-center gap-2 text-sm text-[#e8d4a0]/80"
                      >
                        <Check className="w-4 h-4 text-[#c9a961] flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    variant={service.buttonVariant}
                    className={`w-full transition-all duration-300 ${service.buttonVariant === 'default'
                        ? 'bg-[#c9a961] text-[#1a1a2e] hover:bg-[#e8d4a0]'
                        : 'border-[#c9a961] text-[#c9a961] hover:bg-[#c9a961]/10'
                      }`}
                  >
                    {service.cta}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
