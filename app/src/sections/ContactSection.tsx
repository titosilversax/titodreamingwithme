import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Starfield } from '../components/Starfield';
import { Send, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-40 py-24 md:py-36"
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

      <div
        ref={innerRef}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12
                   flex flex-col md:flex-row md:items-center gap-10 md:gap-16"
      >
        {/* Headline */}
        <div className="flex-1">
          <h2
            className="font-display font-black text-text-primary uppercase tracking-wide-cinematic leading-display mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            Let's build a sound that fits your season.
          </h2>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed">
            Tell me what you're holding. I'll respond within 48 hours.
          </p>
          <div className="hidden md:flex items-center gap-2 mt-8">
            <Mail className="w-4 h-4 text-text-secondary/50" />
            <a href="mailto:hello@titodreamingwith.me" className="font-mono text-xs text-text-secondary/50 tracking-cinematic hover:text-accent-gold transition-colors">
              hello@titodreamingwith.me
            </a>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 w-full">
          <div className="bg-bg-secondary border border-text-primary/8 rounded-2xl p-6 md:p-8">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-7 h-7 text-accent-gold" />
                </div>
                <h3 className="font-display font-bold text-text-primary text-lg mb-2">Message Sent</h3>
                <p className="text-text-secondary text-sm">Thank you for reaching out. I'll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block font-mono text-xs text-text-secondary tracking-cinematic mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-text-primary/20 py-2 text-text-primary text-sm placeholder:text-text-secondary/40 focus:border-accent-gold focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-text-secondary tracking-cinematic mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-text-primary/20 py-2 text-text-primary text-sm placeholder:text-text-secondary/40 focus:border-accent-gold focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-text-secondary tracking-cinematic mb-2">What are you navigating?</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-text-primary/20 py-2 text-text-primary text-sm placeholder:text-text-secondary/40 focus:border-accent-gold focus:outline-none transition-colors resize-none"
                    placeholder="Share what's on your heart..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-hover py-3 bg-accent-gold text-bg-primary font-medium rounded-full text-sm tracking-wide transition-all hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-bg-primary/30 border-t-bg-primary rounded-full animate-spin" />
                  ) : (
                    <>Send Message <Send className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 mt-4 md:hidden">
            <Mail className="w-4 h-4 text-text-secondary/50" />
            <a href="mailto:hello@titodreamingwith.me" className="font-mono text-xs text-text-secondary/50 tracking-cinematic">
              hello@titodreamingwith.me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
