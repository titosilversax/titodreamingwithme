import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, Instagram, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ClosingSectionProps {
  className?: string;
}

const ClosingSection = ({ className = '' }: ClosingSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        headlineRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        sublineRef.current,
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        formRef.current,
        { y: '12vh', opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, ease: 'none' },
        0.15
      );

      // SETTLE (30% - 70%): Hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        [headlineRef.current, sublineRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(
        formRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`section-pinned ${className}`}
    >
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/images/closing-horizon.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-[#0B0F1F]/60" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-4">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#F5F1E8] tracking-wide leading-tight">
            MUSIC IS A DOOR.
            <br />
            <span className="text-[#D4A574]">WALK THROUGH IT.</span>
          </h2>
        </div>

        {/* Subline */}
        <p
          ref={sublineRef}
          className="font-body text-base md:text-lg text-[#A9B3C7] text-center mb-10"
        >
          Questions? Collaborations? Just want to say hi?
        </p>

        {/* Contact Form */}
        <div
          ref={formRef}
          className="w-full max-w-md"
        >
          <div className="glass-card rounded-[28px] p-6 md:p-8">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#5A9A8E]/20 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-[#5A9A8E]" />
                </div>
                <h3 className="font-heading text-xl text-[#F5F1E8] mb-2">
                  Message Sent!
                </h3>
                <p className="font-body text-sm text-[#A9B3C7]">
                  Thank you for reaching out. We&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1f3a] text-[#F5F1E8] font-body text-sm border border-[#F5F1E8]/10 focus:border-[#D4A574] focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your email"
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1f3a] text-[#F5F1E8] font-body text-sm border border-[#F5F1E8]/10 focus:border-[#D4A574] focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-[#1a1f3a] text-[#F5F1E8] font-body text-sm border border-[#F5F1E8]/10 focus:border-[#D4A574] focus:outline-none transition-colors resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn-gold flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </form>
            )}
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#1a1f3a] flex items-center justify-center text-[#A9B3C7] hover:text-[#D4A574] hover:bg-[#2a3050] transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#1a1f3a] flex items-center justify-center text-[#A9B3C7] hover:text-[#D4A574] hover:bg-[#2a3050] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="mailto:hello@titodreamingwith.me"
              className="w-10 h-10 rounded-full bg-[#1a1f3a] flex items-center justify-center text-[#A9B3C7] hover:text-[#D4A574] hover:bg-[#2a3050] transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0F1F] to-transparent" />
    </section>
  );
};

export default ClosingSection;
