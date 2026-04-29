import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Youtube, Instagram, Music, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const blocks = contentRef.current?.querySelectorAll('.footer-block');
      if (!blocks) return;

      blocks.forEach((block) => {
        gsap.fromTo(
          block,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 0.4,
            }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: <Youtube className="w-5 h-5" />, label: 'YouTube', url: 'https://youtube.com/@titosilversax' },
    { icon: <Instagram className="w-5 h-5" />, label: 'Instagram', url: 'https://instagram.com/titosilversax' },
    { icon: <Music className="w-5 h-5" />, label: 'Bandcamp', url: 'https://titosilversax.bandcamp.com/' },
  ];

  const navLinks = [
    { label: 'Listen', id: 'listen' },
    { label: 'Offerings', id: 'offerings' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <footer 
      ref={sectionRef}
      id="listen"
      className="relative bg-bg-primary z-50 py-16 md:py-24"
    >
      <div 
        ref={contentRef}
        className="max-w-[980px] mx-auto px-6 lg:px-12"
      >
        {/* Wordmark + Mission */}
        <div className="footer-block text-center mb-12">
          <h3 className="font-mono text-lg text-text-primary tracking-cinematic mb-4">
            tito dreaming with me
          </h3>
          <p className="text-text-secondary text-sm max-w-md mx-auto leading-relaxed">
            Healing guidance through music, peer support, and lived experience.
          </p>
        </div>

        {/* Social Links */}
        <div className="footer-block flex items-center justify-center gap-6 mb-10">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-secondary hover:text-accent-gold transition-colors group"
            >
              <span className="group-hover:scale-110 transition-transform">
                {link.icon}
              </span>
              <span className="text-sm">{link.label}</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>

        {/* Navigation Links */}
        <div className="footer-block flex items-center justify-center gap-6 mb-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-text-secondary/70 hover:text-text-primary text-sm transition-colors"
            >
              {link.label}
            </button>
          ))}
          <Link
            to="/privacy"
            className="text-text-secondary/70 hover:text-text-primary text-sm transition-colors"
          >
            Privacy
          </Link>
          <Link
            to="/terms"
            className="text-text-secondary/70 hover:text-text-primary text-sm transition-colors"
          >
            Terms
          </Link>
        </div>

        {/* Email */}
        <div className="footer-block text-center mb-6">
          <a 
            href="mailto:hello@titodreamingwith.me"
            className="text-accent-gold text-sm hover:underline"
          >
            hello@titodreamingwith.me
          </a>
        </div>

        {/* Disclaimer */}
        <div className="footer-block text-center mb-8">
          <p className="text-text-secondary/40 text-xs max-w-lg mx-auto">
            This is peer support, not therapy or medical treatment.
          </p>
        </div>

        {/* Divider */}
        <div className="footer-block w-full h-px bg-text-primary/8 mb-8" />

        {/* Copyright */}
        <div className="footer-block text-center">
          <p className="font-mono text-xs text-text-secondary/30 tracking-cinematic">
            © 2026 Tito Dreaming With Me
          </p>
        </div>
      </div>
    </footer>
  );
}
