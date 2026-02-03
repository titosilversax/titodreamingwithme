import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Music, Heart, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const credentialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imageFrame = imageFrameRef.current;
    const image = imageRef.current;
    const heading = headingRef.current;
    const paragraphs = paragraphsRef.current.filter(Boolean);
    const quote = quoteRef.current;
    const credentials = credentialsRef.current;

    if (!section || !imageFrame || !image || !heading || paragraphs.length === 0 || !quote || !credentials) return;

    const ctx = gsap.context(() => {
      // Image frame animation
      gsap.set(imageFrame, { rotate: -10, scale: 0.8, opacity: 0 });
      ScrollTrigger.create({
        trigger: imageFrame,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(imageFrame, {
            rotate: 5,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
          });
        },
        once: true,
      });

      // Image blob reveal
      gsap.set(image, { clipPath: 'circle(0% at 50% 50%)' });
      ScrollTrigger.create({
        trigger: image,
        start: 'top 75%',
        onEnter: () => {
          gsap.to(image, {
            clipPath: 'circle(50% at 50% 50%)',
            duration: 1.2,
            delay: 0.3,
            ease: 'power3.out',
          });
        },
        once: true,
      });

      // Heading split text animation (simplified)
      gsap.set(heading, { opacity: 0, y: 30 });
      ScrollTrigger.create({
        trigger: heading,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(heading, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.5,
            ease: 'power2.out',
          });
        },
        once: true,
      });

      // Paragraphs stagger
      paragraphs.forEach((para, index) => {
        gsap.set(para, { y: 40, opacity: 0 });
        ScrollTrigger.create({
          trigger: para,
          start: 'top 90%',
          onEnter: () => {
            gsap.to(para, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: 0.6 + index * 0.15,
              ease: 'power2.out',
            });
          },
          once: true,
        });
      });

      // Quote slide in
      gsap.set(quote, { x: 80, opacity: 0 });
      ScrollTrigger.create({
        trigger: quote,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(quote, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: 1,
            ease: 'power2.out',
          });
        },
        once: true,
      });

      // Credentials typewriter effect (simplified)
      gsap.set(credentials, { opacity: 0 });
      ScrollTrigger.create({
        trigger: credentials,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(credentials, {
            opacity: 1,
            duration: 1,
            delay: 1.4,
            ease: 'power2.out',
          });
        },
        once: true,
      });

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(image, {
            y: progress * -40,
            rotate: progress * 3,
          });
          gsap.set(imageFrame, {
            rotate: 5 - progress * 7,
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 sm:py-32 bg-gradient-to-b from-white to-[#faf8f5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Image */}
          <div className="relative">
            {/* Decorative Frame */}
            <div
              ref={imageFrameRef}
              className="absolute inset-0 bg-warm-beige/30 rounded-lg transform rotate-3 scale-105"
              style={{ willChange: 'transform' }}
            />

            {/* Profile Image */}
            <div
              ref={imageRef}
              className="relative rounded-lg overflow-hidden shadow-soft-lg"
              style={{ willChange: 'clip-path, transform' }}
            >
              <img
                src="/images/profile.jpg"
                alt="Your Name - Saxophonist and Peer Support Specialist"
                className="w-full aspect-square object-cover"
              />
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-warm-beige/20 rounded-full animate-float" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-warm-beige/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
          </div>

          {/* Right Column - Content */}
          <div className="lg:pl-8">
            <h2
              ref={headingRef}
              className="font-display text-4xl sm:text-5xl text-charcoal font-light mb-4"
            >
              My Story
            </h2>

            <p
              ref={(el) => { paragraphsRef.current[0] = el; }}
              className="font-body text-warm-beige-dark text-lg mb-6"
            >
              From lived experience to shared healing
            </p>

            <p
              ref={(el) => { paragraphsRef.current[1] = el; }}
              className="font-body text-text-gray leading-relaxed mb-4"
            >
              My journey began in the depths of personal struggle, where I discovered that healing
              often comes from unexpected places. For me, that place was in the resonant tones of
              the saxophone and the profound connection of shared experience.
            </p>

            <p
              ref={(el) => { paragraphsRef.current[2] = el; }}
              className="font-body text-text-gray leading-relaxed mb-4"
            >
              As a certified peer support specialist, I bring not just training, but the deep
              understanding that comes from walking the path of recovery myself. My ambient
              saxophone work—rooted in jazz harmony and extended techniques—became both my
              personal healing practice and a way to help others find their own resonance.
            </p>

            <p
              ref={(el) => { paragraphsRef.current[3] = el; }}
              className="font-body text-text-gray leading-relaxed mb-8"
            >
              Today, I combine these dual passions to create spaces where sound and story
              intertwine, offering pathways to emotional wellness that honor both the scientific
              power of sound healing and the transformative nature of authentic human connection.
            </p>

            {/* Pull Quote */}
            <blockquote
              ref={quoteRef}
              className="relative pl-6 border-l-4 border-warm-beige mb-8"
            >
              <p className="font-display text-2xl sm:text-3xl text-charcoal italic">
                "Music doesn't just heal—it transforms pain into beauty, isolation into connection."
              </p>
            </blockquote>

            {/* Credentials */}
            <div ref={credentialsRef} className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-text-gray">
                <Award className="w-4 h-4 text-warm-beige" />
                <span>Certified Peer Support Specialist</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-gray">
                <Music className="w-4 h-4 text-warm-beige" />
                <span>Jazz Saxophonist</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-gray">
                <Heart className="w-4 h-4 text-warm-beige" />
                <span>Wellness Coach</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
