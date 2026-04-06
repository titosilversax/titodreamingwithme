import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Starfield } from '../components/Starfield';
import { Send, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const microlineRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(
        [headlineRef.current, formRef.current, microlineRef.current],
        { opacity: 0 },
        { opacity: 1, ease: 'power2.out', stagger: 0.05 },
        0
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(
        [headlineRef.current, formRef.current, microlineRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.70
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="section-pinned z-40"
    >
      {/* Starfield Background */}
      <Starfield starCount={90} />

      {/* Glow behind headline */}
      <div 
        className="absolute left-[6vw] top-1/2 -translate-y-1/2 w-[40vw] h-[50vh] glow-gold opacity-30"
      />

      {/* Left Headline */}
      <div 
        ref={headlineRef}
        className="absolute left-[6vw] top-1/2 -translate-y-1/2"
        style={{ width: 'min(40vw, 520px)' }}
      >
        <h2 
          className="font-display font-black text-text-primary uppercase tracking-wide-cinematic leading-display mb-4"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
        >
          Let's build a sound that fits your season.
        </h2>
        <p className="text-text-secondary text-sm md:text-base leading-relaxed">
          Tell me what you're holding. I'll respond within 48 hours.
        </p>
      </div>

      {/* Right Contact Form */}
      <div 
        ref={formRef}
        className="absolute right-[6vw] top-1/2 -translate-y-1/2"
        style={{ width: 'min(40vw, 480px)' }}
      >
        <div className="bg-bg-secondary border border-text-primary/8 rounded-2xl p-6 md:p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto mb-4">
                <Send className="w-7 h-7 text-accent-gold" />
              </div>
              <h3 className="font-display font-bold text-text-primary text-lg mb-2">
                Message Sent
              </h3>
              <p className="text-text-secondary text-sm">
                Thank you for reaching out. I'll be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-mono text-xs text-text-secondary tracking-cinematic mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-text-primary/18 py-2 text-text-primary text-sm placeholder:text-text-secondary/40 focus:border-accent-gold transition-colors"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block font-mono text-xs text-text-secondary tracking-cinematic mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-text-primary/18 py-2 text-text-primary text-sm placeholder:text-text-secondary/40 focus:border-accent-gold transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block font-mono text-xs text-text-secondary tracking-cinematic mb-2">
                  What are you navigating?
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-text-primary/18 py-2 text-text-primary text-sm placeholder:text-text-secondary/40 focus:border-accent-gold transition-colors resize-none"
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
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Microline */}
      <div 
        ref={microlineRef}
        className="absolute left-[6vw] bottom-[6vh] flex items-center gap-2"
      >
        <Mail className="w-4 h-4 text-text-secondary/50" />
        <span className="font-mono text-xs text-text-secondary/50 tracking-cinematic">
          Or email: hello@titodreamingwith.me
        </span>
      </div>
    </section>
  );
}
