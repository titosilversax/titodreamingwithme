import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "The combination of peer support and sound healing has transformed my recovery journey. I finally feel understood.",
    name: 'Sarah M.',
    title: 'Recovery Warrior',
  },
  {
    quote:
      "I've never experienced anything like the ambient saxophone sessions. It's meditation, but deeper.",
    name: 'Michael T.',
    title: 'Wellness Enthusiast',
  },
  {
    quote:
      "Having someone who truly understands the recovery journey makes all the difference. The coaching has been life-changing.",
    name: 'Jennifer K.',
    title: 'Peer Support Advocate',
  },
  {
    quote:
      "The healing audio library has become an essential part of my daily routine. I sleep better and feel more centered.",
    name: 'David R.',
    title: 'Mindfulness Practitioner',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const carousel = carouselRef.current;

    if (!section || !heading || !carousel) return;

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

      // Carousel entrance
      gsap.set(carousel, { opacity: 0 });
      ScrollTrigger.create({
        trigger: carousel,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(carousel, {
            opacity: 1,
            duration: 0.6,
            delay: 0.3,
            ease: 'power2.out',
          });
        },
        once: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const goToPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-32 bg-gradient-to-b from-[#faf8f5] to-white overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-warm-beige/5 via-transparent to-warm-beige/5 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl text-charcoal font-light mb-4">
            What People Say
          </h2>
          <div className="w-20 h-1 bg-warm-beige mx-auto" />
        </div>

        {/* 3D Carousel */}
        <div
          ref={carouselRef}
          className="relative"
          style={{ perspective: '1200px' }}
        >
          <div className="relative h-[400px] sm:h-[350px]" style={{ transformStyle: 'preserve-3d' }}>
            {testimonials.map((testimonial, index) => {
              const offset = index - activeIndex;
              const isActive = index === activeIndex;

              let transform = 'translateX(-50%) translateZ(-200px) rotateY(0deg) scale(0.8)';
              let opacity = 0;
              let zIndex = 0;

              if (isActive) {
                transform = 'translateX(-50%) translateZ(100px) rotateY(0deg) scale(1)';
                opacity = 1;
                zIndex = 10;
              } else if (offset === 1 || (activeIndex === testimonials.length - 1 && index === 0)) {
                transform = 'translateX(20%) translateZ(0) rotateY(-15deg) scale(0.85)';
                opacity = 0.5;
                zIndex = 5;
              } else if (offset === -1 || (activeIndex === 0 && index === testimonials.length - 1)) {
                transform = 'translateX(-120%) translateZ(0) rotateY(15deg) scale(0.85)';
                opacity = 0.5;
                zIndex = 5;
              }

              return (
                <div
                  key={index}
                  className="absolute left-1/2 top-0 w-full max-w-2xl transition-all duration-600 ease-dramatic"
                  style={{
                    transform,
                    opacity,
                    zIndex,
                  }}
                >
                  <div className="bg-white rounded-lg shadow-soft-lg p-8 sm:p-12">
                    {/* Quote Icon */}
                    <div className="mb-6">
                      <Quote className="w-10 h-10 text-warm-beige/60" />
                    </div>

                    {/* Quote Text */}
                    <blockquote className="font-display text-xl sm:text-2xl text-charcoal italic leading-relaxed mb-8">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Attribution */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-warm-beige/20 flex items-center justify-center">
                        <span className="font-display text-lg text-warm-beige-dark">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-body font-semibold text-charcoal">
                          {testimonial.name}
                        </p>
                        <p className="font-body text-sm text-text-gray">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrev}
              className="rounded-full border-warm-beige text-charcoal hover:bg-warm-beige/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-warm-beige w-6'
                      : 'bg-warm-beige/40 hover:bg-warm-beige/60'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full border-warm-beige text-charcoal hover:bg-warm-beige/10"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
