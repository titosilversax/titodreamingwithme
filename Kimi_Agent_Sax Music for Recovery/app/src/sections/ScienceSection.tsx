import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Waves, Heart, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const facts = [
  {
    icon: Brain,
    text: "Up to 90 percent of physicians' visits are stress-related, according to the American Institute of Stress. Stress and negativity creates blockages that cause energy disturbances and can lead to disease.",
  },
  {
    icon: Waves,
    text: "Sound travels about four times faster through water than it does through air. Since our bodies are about 70 percent water, sound becomes a first choice for a natural therapy.",
  },
  {
    icon: Heart,
    text: "Matching the frequencies of healthy resonance can provide stress relief. Sound can shift our energy, removing frequencies of emotions such as fear, anger, and resentment.",
  },
  {
    icon: Sparkles,
    text: "The experience is one of absolute serenity as deep relaxation and soothing resonant sound restores balance and well-being. Vibrations lower heart rate and relax brain wave patterns.",
  },
];

export default function ScienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const line = lineRef.current;

    if (!section || !heading || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.set(heading, { x: -50, opacity: 0 });
      ScrollTrigger.create({
        trigger: heading,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(heading, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
          });
        },
        once: true,
      });

      // SVG line draw animation
      if (line) {
        const length = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        ScrollTrigger.create({
          trigger: section,
          start: 'top 60%',
          onEnter: () => {
            gsap.to(line, {
              strokeDashoffset: 0,
              duration: 1.5,
              ease: 'power2.out',
            });
          },
          once: true,
        });
      }

      // Cards stagger animation
      cards.forEach((card, index) => {
        gsap.set(card, {
          y: 60,
          rotateX: 10,
          opacity: 0,
        });

        ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(card, {
              y: 0,
              rotateX: 0,
              opacity: 1,
              duration: 0.7,
              delay: index * 0.12,
              ease: 'power2.out',
            });
          },
          once: true,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-32 bg-white overflow-hidden"
    >
      {/* Decorative SVG Wave Line */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <path
          ref={lineRef}
          d="M0,400 Q300,200 600,400 T1200,400"
          fill="none"
          stroke="#d6bfa6"
          strokeWidth="2"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column - Heading */}
          <div className="lg:col-span-4">
            <h2
              ref={headingRef}
              className="font-display text-4xl sm:text-5xl text-charcoal font-light sticky top-32"
            >
              Did You Know?
            </h2>
            <div className="mt-6 w-20 h-1 bg-warm-beige" />
          </div>

          {/* Right Column - Facts */}
          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {facts.map((fact, index) => {
                const Icon = fact.icon;
                return (
                  <div
                    key={index}
                    ref={(el) => { cardsRef.current[index] = el; }}
                    className="group bg-white rounded-lg p-6 shadow-soft hover:shadow-soft-lg transition-all duration-500 ease-ambient hover:-translate-y-2"
                    style={{ perspective: '1000px' }}
                  >
                    {/* Icon */}
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-full bg-warm-beige/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-warm-beige-dark" />
                      </div>
                    </div>

                    {/* Text */}
                    <p className="font-body text-text-gray text-sm leading-relaxed">
                      {fact.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
