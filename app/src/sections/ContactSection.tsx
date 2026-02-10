import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Send, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const formFieldsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    const leftContent = leftContentRef.current;
    const image = imageRef.current;
    const form = formRef.current;
    const formFields = formFieldsRef.current.filter(Boolean);

    if (!section || !leftContent || !image || !form || formFields.length === 0) return;

    const ctx = gsap.context(() => {
      // Left content slide in
      gsap.set(leftContent, { x: -60, opacity: 0 });
      ScrollTrigger.create({
        trigger: leftContent,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(leftContent, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
          });
        },
        once: true,
      });

      // Image fade + zoom
      gsap.set(image, { scale: 1.05, opacity: 0 });
      ScrollTrigger.create({
        trigger: image,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(image, {
            scale: 1,
            opacity: 1,
            duration: 1,
            delay: 0.2,
            ease: 'power2.out',
          });
        },
        once: true,
      });

      // Form slide in
      gsap.set(form, { x: 60, opacity: 0 });
      ScrollTrigger.create({
        trigger: form,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(form, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.3,
            ease: 'power2.out',
          });
        },
        once: true,
      });

      // Form fields stagger
      formFields.forEach((field, index) => {
        gsap.set(field, { y: 30, opacity: 0 });
        ScrollTrigger.create({
          trigger: field,
          start: 'top 95%',
          onEnter: () => {
            gsap.to(field, {
              y: 0,
              opacity: 1,
              duration: 0.5,
              delay: 0.5 + index * 0.1,
              ease: 'power2.out',
            });
          },
          once: true,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for reaching out! I will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 sm:py-32 bg-gradient-to-b from-[#151525] to-[#1a1a2e] overflow-hidden"
    >
      {/* Decorative wave background */}
      <svg
        className="absolute bottom-0 left-0 w-full h-32 pointer-events-none"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z"
          fill="rgba(201, 169, 97, 0.05)"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Info & Image */}
          <div ref={leftContentRef}>
            <h2 className="font-display text-4xl sm:text-5xl text-[#e8d4a0] font-light mb-4">
              Begin Your Healing Journey
            </h2>
            <p className="font-body text-[#e8d4a0]/80 text-lg mb-8">
              Reach out to schedule a session or learn more about how we can work together
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#c9a961]/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#c9a961]" />
                </div>
                <span className="font-body text-[#e8d4a0]/80">hello@titodreamingwith.me</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#c9a961]/20 flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-[#c9a961]" />
                </div>
                <span className="font-body text-[#e8d4a0]/80">@titosilversax</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#c9a961]/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#c9a961]" />
                </div>
                <span className="font-body text-[#e8d4a0]/80">Available worldwide via video call</span>
              </div>
            </div>

            {/* Image */}
            <div
              ref={imageRef}
              className="relative rounded-lg overflow-hidden shadow-soft-lg"
            >
              <img
                src="/images/contact.jpg"
                alt="Saxophone"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/60 to-transparent" />
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:pl-8">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-[#1a1a2e]/50 backdrop-blur-md border border-white/10 rounded-lg shadow-soft-lg p-8"
            >
              <h3 className="font-display text-2xl text-white mb-6">
                Send a Message
              </h3>

              <div className="space-y-6">
                {/* Name Field */}
                <div ref={(el) => { formFieldsRef.current[0] = el; }}>
                  <label className="block font-body text-sm text-[#e8d4a0]/80 mb-2">
                    Your Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#c9a961] focus:ring-[#c9a961]/20 transition-all duration-300 py-3 text-base"
                  />
                </div>

                {/* Email Field */}
                <div ref={(el) => { formFieldsRef.current[1] = el; }}>
                  <label className="block font-body text-sm text-[#e8d4a0]/80 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#c9a961] focus:ring-[#c9a961]/20 transition-all duration-300 py-3 text-base"
                  />
                </div>

                {/* Subject Field */}
                <div ref={(el) => { formFieldsRef.current[2] = el; }}>
                  <label className="block font-body text-sm text-[#e8d4a0]/80 mb-2">
                    Subject
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    required
                    className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#c9a961] focus:ring-[#c9a961]/20 transition-all duration-300 py-3 text-base"
                  />
                </div>

                {/* Message Field */}
                <div ref={(el) => { formFieldsRef.current[3] = el; }}>
                  <label className="block font-body text-sm text-[#e8d4a0]/80 mb-2">
                    Your Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your journey..."
                    rows={5}
                    required
                    className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#c9a961] focus:ring-[#c9a961]/20 transition-all duration-300 resize-none py-3 text-base"
                  />
                </div>

                {/* Submit Button */}
                <div ref={(el) => { formFieldsRef.current[4] = el; }}>
                  <Button
                    type="submit"
                    className="w-full bg-[#c9a961] text-[#1a1a2e] hover:bg-[#e8d4a0] transition-all duration-300 group"
                  >
                    Send Message
                    <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
