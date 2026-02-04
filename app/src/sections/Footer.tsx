import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Youtube, Facebook, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Community', href: '#community' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const waveRef = useRef<SVGPathElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const socialsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const wave = waveRef.current;
    const content = contentRef.current;
    const columns = columnsRef.current.filter(Boolean);
    const socials = socialsRef.current;
    const bottom = bottomRef.current;

    if (!footer || !wave || !content || columns.length === 0 || !socials || !bottom) return;

    const ctx = gsap.context(() => {
      // Wave draw animation
      const length = wave.getTotalLength();
      gsap.set(wave, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      ScrollTrigger.create({
        trigger: footer,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(wave, {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: 'power2.out',
          });
        },
        once: true,
      });

      // Content fade in
      gsap.set(content, { opacity: 0 });
      ScrollTrigger.create({
        trigger: content,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(content, {
            opacity: 1,
            duration: 0.6,
            delay: 0.3,
            ease: 'power2.out',
          });
        },
        once: true,
      });

      // Columns stagger rise
      columns.forEach((column, index) => {
        gsap.set(column, { y: 40, opacity: 0 });
        ScrollTrigger.create({
          trigger: column,
          start: 'top 95%',
          onEnter: () => {
            gsap.to(column, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: 0.4 + index * 0.15,
              ease: 'power2.out',
            });
          },
          once: true,
        });
      });

      // Social icons pop in
      const socialIcons = socials.querySelectorAll('a');
      socialIcons.forEach((icon, index) => {
        gsap.set(icon, { scale: 0 });
        ScrollTrigger.create({
          trigger: socials,
          start: 'top 95%',
          onEnter: () => {
            gsap.to(icon, {
              scale: 1,
              duration: 0.4,
              delay: 0.8 + index * 0.1,
              ease: 'back.out(1.7)',
            });
          },
          once: true,
        });
      });

      // Bottom bar fade
      gsap.set(bottom, { opacity: 0 });
      ScrollTrigger.create({
        trigger: bottom,
        start: 'top 100%',
        onEnter: () => {
          gsap.to(bottom, {
            opacity: 1,
            duration: 0.5,
            delay: 1,
            ease: 'power2.out',
          });
        },
        once: true,
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="relative bg-charcoal text-white overflow-hidden">
      {/* Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-16"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            ref={waveRef}
            d="M0,60 C300,120 900,0 1200,60 L1200,0 L0,0 Z"
            fill="#faf8f5"
            stroke="none"
          />
        </svg>
      </div>

      <div ref={contentRef} className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Column 1 - About */}
            <div ref={(el) => { columnsRef.current[0] = el; }}>
              <h3 className="font-display text-2xl mb-4">HARMONIC HEALING</h3>
              <p className="font-body text-white/70 text-sm leading-relaxed mb-6">
                Healing through sound and shared experience. Combining ambient saxophone
                music with peer support to guide your wellness journey.
              </p>
              {/* Social Links */}
              <div ref={socialsRef} className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-warm-beige transition-colors duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div ref={(el) => { columnsRef.current[1] = el; }}>
              <h4 className="font-display text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="font-body text-white/70 text-sm hover:text-warm-beige transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Contact */}
            <div ref={(el) => { columnsRef.current[2] = el; }}>
              <h4 className="font-display text-lg mb-4">Get in Touch</h4>
              <div className="space-y-3">
                <p className="font-body text-white/70 text-sm">
                  hello@harmonichealing.com
                </p>
                <p className="font-body text-white/70 text-sm">
                  +1 (555) 123-4567
                </p>
                <p className="font-body text-white/70 text-sm">
                  Available worldwide via video call
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            ref={bottomRef}
            className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <p className="font-body text-white/50 text-sm">
              © 2026 Harmonic Healing. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="font-body text-white/50 text-sm hover:text-warm-beige transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="font-body text-white/50 text-sm hover:text-warm-beige transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
