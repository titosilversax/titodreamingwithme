import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Music, Headphones, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

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
      className="relative py-20 sm:py-32 bg-gradient-to-b from-[#faf8f5] to-white overflow-hidden"
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
          stroke="#d6bfa6"
          strokeWidth="1"
          strokeDasharray="8,8"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl text-charcoal font-light mb-4">
            Services
          </h2>
          <p className="font-body text-text-gray text-lg max-w-2xl mx-auto">
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
            return (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`relative bg-white rounded-lg shadow-soft hover:shadow-soft-lg transition-shadow duration-500 overflow-hidden ${service.color} border-t-4`}
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
                  <div className="absolute top-4 right-4 bg-amber-400 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="p-8">
                  {/* Icon */}
                  <div className="mb-6">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 ${
                        hoveredCard === index ? 'scale-110' : ''
                      }`}
                      style={{
                        backgroundColor:
                          index === 0
                            ? 'rgba(214, 191, 166, 0.2)'
                            : index === 1
                            ? 'rgba(251, 191, 36, 0.2)'
                            : 'rgba(45, 212, 191, 0.2)',
                      }}
                    >
                      <Icon
                        className="w-7 h-7"
                        style={{
                          color:
                            index === 0
                              ? '#c6b1a0'
                              : index === 1
                              ? '#d97706'
                              : '#0d9488',
                        }}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl text-charcoal mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-text-gray text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature, fIndex) => (
                      <li
                        key={fIndex}
                        className="flex items-center gap-2 text-sm text-text-gray"
                      >
                        <Check className="w-4 h-4 text-warm-beige flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    variant={service.buttonVariant}
                    className={`w-full transition-all duration-300 ${
                      service.buttonVariant === 'default'
                        ? 'bg-warm-beige text-charcoal hover:bg-warm-beige-dark'
                        : 'border-warm-beige text-charcoal hover:bg-warm-beige/10'
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
