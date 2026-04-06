import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Starfield } from '../components/Starfield';
import { Youtube, Instagram, Music } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const links = [
  {
    icon: <Youtube className="w-5 h-5" />,
    label: 'YouTube',
    href: 'https://youtube.com/@titosilversax',
  },
  {
    icon: <Instagram className="w-5 h-5" />,
    label: 'Instagram',
    href: 'https://instagram.com/titosilversax',
  },
  {
    icon: <Music className="w-5 h-5" />,
    label: 'Bandcamp',
    href: 'https://titosilversax.bandcamp.com/',
  },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
      id="contact"
      className="relative z-40 py-32 md:py-48"
    >
      {/* Background photo */}
      <div className="absolute inset-0">
        <img
          src="/contact-bg.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ filter: 'saturate(0.5) contrast(1.05)' }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(11,13,16,0.72)' }} />
      </div>

      <div className="absolute inset-0">
        <Starfield starCount={40} />
      </div>

      <div ref={innerRef} className="relative z-10 text-center px-6 max-w-xl mx-auto">
        <p className="font-mono text-xs text-accent-gold tracking-cinematic uppercase mb-4">
          get in touch
        </p>

        <h2
          className="font-display font-black text-text-primary uppercase tracking-wide-cinematic leading-display mb-6"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          Let's talk.
        </h2>

        <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-10">
          Whether you have questions, want to work together, or just want to say hi —
          I'd love to hear from you.
        </p>

        <a
          href="mailto:hello@titodreamingwith.me"
          className="inline-block btn-hover px-8 py-3 bg-accent-gold text-bg-primary font-medium rounded-full text-sm tracking-wide transition-all hover:shadow-glow mb-12"
        >
          hello@titodreamingwith.me
        </a>

        <div className="flex items-center justify-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 text-text-secondary hover:text-accent-gold transition-colors"
            >
              {link.icon}
              <span className="font-mono text-xs tracking-cinematic">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
