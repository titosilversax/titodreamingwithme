import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Check,
  Music,
  FileText,
  MessageSquare,
  Sparkles,
  Headphones,
  ArrowRight
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

gsap.registerPlugin(ScrollTrigger);

interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  includes: { icon: React.ReactNode; text: string }[];
  cta: string;
  ctaAction: () => void;
  ctaHref?: string;
  cta2?: string;
  ctaAction2?: () => void;
  highlighted?: boolean;
  badge?: string;
}

const services: ServiceDetail[] = [
  {
    id: 'free-guide',
    title: 'The Emotional Star Map',
    subtitle: 'Free Guide',
    price: 'Free',
    priceNote: 'Delivered to your inbox',
    description: 'The original 6-page guide to mapping seven emotional territories onto the musical modes. Includes the Quick-Start Process and The 4 Emotional Bridges. No music background needed — just honesty about how you feel.',
    features: [
      'The 7 Emotional Palettes mapped to modes',
      'The Quick-Start Process',
      'The 4 Emotional Bridges',
      'Journaling prompts for each mode',
      'No music background required',
    ],
    includes: [
      { icon: <FileText className="w-4 h-4" />, text: '6-page digital guide' },
      { icon: <Sparkles className="w-4 h-4" />, text: 'Quick-Start Process' },
      { icon: <Music className="w-4 h-4" />, text: 'The 4 Emotional Bridges' },
    ],
    cta: 'Download Free Guide',
    ctaAction: () => {
      window.open('https://outreach.titodreamingwith.me/freeguide', '_blank');
    },
  },
  {
    id: 'toolkit',
    title: "The Emotional Star Map: Songwriter's Edition",
    subtitle: 'Emotional Processing System',
    price: '$27',
    priceNote: 'One-time purchase',
    description: 'The full system for turning a heavy feeling into a finished song. Everything you need to move from stuck to sonically honest.',
    features: [
      'Interactive Notion Workspace (Duplicatable)',
      '5 Structured Song Feeling Journal Sessions',
      '"Star Note" deep-dive for every palette',
      'Printable PDF Workbook (22 pages)',
      'Modal Listening Playlist & Chord Charts',
    ],
    includes: [
      { icon: <FileText className="w-4 h-4" />, text: 'The Processing Guide — A structured container for emotional excavation and self-regulation.' },
      { icon: <Sparkles className="w-4 h-4" />, text: 'Notion Template — a digital archive to track your song\'s emotional growth.' },
      { icon: <Music className="w-4 h-4" />, text: 'Emotional Landscapes — A map for identifying and honoring the specific "color" of your current internal state.' },
      { icon: <Music className="w-4 h-4" />, text: 'Transition Frameworks — The roadmap for safely moving through heavy emotions without bypassing the truth of the feeling.' },
    ],
    cta: 'Get the Full System — $27',
    ctaAction: () => {
      window.open('https://titosilversax.gumroad.com/l/thestarmap', '_blank');
    },
    ctaHref: 'https://titosilversax.gumroad.com/l/thestarmap',
    highlighted: true,
    badge: 'Recommended',
  },
  {
    id: 'grief-cuento',
    title: 'The Sound of Your Grief',
    subtitle: 'Digital Product',
    price: '$47',
    priceNote: 'One-time purchase',
    description: 'A sound companion for the grief you can\'t put into words. A 30-minute healing Cuento and body-mapping workbook that helps you locate where grief lives — and which modes carry it best.',
    features: [
      '30-minute original composition',
      'Companion workbook (PDF)',
      'Body mapping exercises',
      'Mode-grief correlations',
      'Lifetime access',
    ],
    includes: [
      { icon: <Headphones className="w-4 h-4" />, text: '30-min healing soundscape' },
      { icon: <FileText className="w-4 h-4" />, text: '20-page companion workbook' },
      { icon: <MessageSquare className="w-4 h-4" />, text: 'Reflection prompts' },
    ],
    cta: 'Get early access',
    ctaAction: () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
];

const faqs = [
  {
    question: 'What is peer support, and how is it different from therapy?',
    answer: 'Peer support is based on shared lived experience. I\'m not a licensed therapist — I\'m someone who has navigated mental illness and found healing through music. Our work together is collaborative, experiential, and rooted in modal frameworks rather than clinical diagnosis or treatment.',
  },
  {
    question: 'Do I need a music background to work with you?',
    answer: 'Not at all. Everything I offer is designed to meet you where you are, musically and emotionally. The Star Map and sound sessions are accessible whether you\'ve never played an instrument or you\'re a professional musician.',
  },
  {
    question: 'What are modal frameworks?',
    answer: 'Musical modes are scales with distinct emotional qualities. The major scale (Ionian) sounds happy; the minor scale (Aeolian) sounds sad. But there are seven modes total, each carrying unique emotional textures. I use these as maps for emotional navigation.',
  },
  {
    question: 'How does the sliding scale work?',
    answer: 'Pricing for the 90-day Deep Navigation is discussed after your application — because I want to understand your situation before we talk numbers. If cost is a barrier, reach out anyway. I reserve a limited number of spots for people who need it.',
  },
  {
    question: 'Can I combine offerings?',
    answer: 'Absolutely. Many clients start with a single Modal Sound Session to see if we\'re a good fit, then move into the 90-day container. The Star Map is a great foundation for any of the deeper work.',
  },
];

export function OfferingsDetailSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const processRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const fadeUp = (el: Element | null, delay = 0) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        );
      };

      fadeUp(headerRef.current);

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
          }
        );
      });

      fadeUp(processRef.current);
      fadeUp(faqRef.current);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="offerings"
      ref={sectionRef}
      className="relative bg-bg-primary py-20 md:py-32 z-35"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="font-mono text-xs text-accent-gold tracking-cinematic uppercase mb-4 block">
            The Path
          </span>
          <h2 className="font-display font-black text-text-primary uppercase tracking-wide-cinematic leading-display mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Choose Your Starting Point
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto">
            Every tool here was built feeling-first — to help you write music that actually sounds like you.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-gold/30 bg-accent-gold/10 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-gold flex-shrink-0" />
            <span className="font-mono text-xs text-accent-gold tracking-cinematic">
              Available in English &amp; Spanish — También en español
            </span>
          </div>
        </div>

        {/* Peer Support Trust Bridge */}
        <div className="max-w-2xl mx-auto mb-14 text-center">
          <p className="font-script italic text-accent-gold/80 mb-3" style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)' }}>
            "This is about more than chords — it's about finding your way home."
          </p>
          <p className="text-text-secondary text-xs md:text-sm font-mono tracking-cinematic">
            Built by a certified peer support specialist who found his way back through sound.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`relative rounded-2xl p-6 md:p-8 transition-all duration-300 hover:scale-[1.02] scroll-mt-24 ${
                service.highlighted 
                  ? 'bg-gradient-to-br from-accent-gold/10 to-accent-gold/5 border-2 border-accent-gold/30' 
                  : 'glass-card border border-text-primary/10'
              }`}
            >
              {service.badge && (
                <div className="absolute -top-3 left-6">
                  <span className="bg-accent-gold text-bg-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {service.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <span className="font-mono text-xs text-text-secondary/60 tracking-cinematic uppercase">
                  {service.subtitle}
                </span>
                <h3 className="font-display font-bold text-text-primary text-xl uppercase tracking-tight-cinematic mt-1">
                  {service.title}
                </h3>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className={`font-display font-black text-2xl ${service.price === 'Free' ? 'text-accent-gold' : 'text-text-primary'}`}>
                    {service.price}
                  </span>
                </div>
                <span className="text-text-secondary/60 text-xs">
                  {service.priceNote}
                </span>
              </div>

              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* What's Included */}
              <div className="mb-6">
                <span className="font-mono text-xs text-text-secondary/60 tracking-cinematic uppercase mb-3 block">
                  What's Included
                </span>
                <ul className="space-y-2">
                  {service.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                      <span className="text-accent-gold mt-0.5 flex-shrink-0">{item.icon}</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features List */}
              <div className="mb-8">
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary/80">
                      <Check className="w-4 h-4 text-accent-gold mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                {service.ctaHref ? (
                  <a
                    href={service.ctaHref}
                    className={`w-full btn-hover py-3 px-6 rounded-full font-medium text-sm tracking-wide flex items-center justify-center gap-2 transition-all ${
                      service.highlighted
                        ? 'bg-accent-gold text-bg-primary hover:shadow-glow'
                        : 'border border-text-primary/20 text-text-primary hover:border-accent-gold hover:text-accent-gold'
                    }`}
                  >
                    {service.cta}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                <button
                  onClick={service.ctaAction}
                  className={`w-full btn-hover py-3 px-6 rounded-full font-medium text-sm tracking-wide flex items-center justify-center gap-2 transition-all ${
                    service.highlighted
                      ? 'bg-accent-gold text-bg-primary hover:shadow-glow'
                      : 'border border-text-primary/20 text-text-primary hover:border-accent-gold hover:text-accent-gold'
                  }`}
                >
                  {service.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
                )}
                {service.cta2 && service.ctaAction2 && (
                  <button
                    onClick={service.ctaAction2}
                    className="w-full btn-hover py-3 px-6 rounded-full font-medium text-sm tracking-wide flex items-center justify-center gap-2 transition-all border border-accent-gold/30 text-accent-gold hover:border-accent-gold"
                  >
                    {service.cta2}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div ref={processRef} className="mb-24">
          <div className="text-center mb-12">
            <span className="font-mono text-xs text-accent-gold tracking-cinematic uppercase mb-4 block">
              The Journey
            </span>
            <h3 className="font-display font-bold text-text-primary text-2xl uppercase tracking-tight-cinematic">
              How We Work Together
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Reach Out',
                description: 'Send me a voice memo on Instagram or drop me an email. Tell me what you\'re navigating and what you\'re hoping to find.',
              },
              {
                step: '02',
                title: 'We Map It',
                description: 'If we decide to work together, we\'ll map your emotional landscape and identify which modes and sounds resonate with your experience.',
              },
              {
                step: '03',
                title: 'Sound Meets You',
                description: 'Through our sessions, the music becomes a container — a place to feel, process, and begin to move through what you\'re carrying.',
              },
            ].map((item, index) => (
              <div key={index} className="relative text-center md:text-left">
                <span className="font-display font-black text-5xl text-accent-gold/20 mb-4 block">
                  {item.step}
                </span>
                <h4 className="font-display font-bold text-text-primary text-lg uppercase tracking-tight-cinematic mb-3">
                  {item.title}
                </h4>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {item.description}
                </p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 right-0 transform translate-x-1/2">
                    <ArrowRight className="w-6 h-6 text-text-primary/10" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div ref={faqRef} className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="font-mono text-xs text-accent-gold tracking-cinematic uppercase mb-4 block">
              Questions
            </span>
            <h3 className="font-display font-bold text-text-primary text-2xl uppercase tracking-tight-cinematic">
              Frequently Asked
            </h3>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="glass-card border border-text-primary/8 rounded-xl px-6 data-[state=open]:border-accent-gold/30"
              >
                <AccordionTrigger className="text-left text-text-primary text-sm font-medium hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-text-secondary text-sm leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Ready to Go Deeper */}
        <div id="coaching" className="mt-24 pt-24 border-t border-text-primary/10 scroll-mt-24">
          {/* Prismatic Philosophy */}
          <div className="text-center mb-16">
            <blockquote className="font-script italic text-accent-gold/80 mb-6" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)' }}>
              "Every mode is a color of emotion. Every chord is a feeling crystallized."
            </blockquote>
            <span className="font-mono text-xs text-accent-gold tracking-cinematic uppercase mb-4 block">
              Ready to Go Deeper?
            </span>
            <h3 className="font-display font-bold text-text-primary text-2xl uppercase tracking-tight-cinematic mb-4">
              High-Touch Human Upgrades
            </h3>
            <p className="text-text-secondary text-sm md:text-base max-w-xl mx-auto">
              The digital tools are your foundation. When you're ready for live, guided work — this is where we meet.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Deep Navigation */}
            <div className="glass-card border border-text-primary/10 rounded-2xl p-6 md:p-8">
              <span className="font-mono text-xs text-text-secondary/60 tracking-cinematic uppercase">90-Day Intensive</span>
              <h4 className="font-display font-bold text-text-primary text-xl uppercase tracking-tight-cinematic mt-1 mb-3">
                The Deep Navigation
              </h4>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                A 90-day private container to find your voice through life's heaviest transitions — grief, identity loss, burnout, or cultural disconnection. Guided through music, modal frameworks, and peer-supported practice.
              </p>
              <ul className="space-y-2 mb-6">
                {['6 one-on-one sessions over 90 days', 'Custom Emotional Star Map', 'Original saxophone recording made for you', 'Async voice note support between sessions', 'Bilingual — English & Spanish', 'Sliding scale pricing'].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-secondary/80">
                    <Check className="w-4 h-4 text-accent-gold mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => window.open('https://tally.so/r/KYoE2X', '_blank')}
                  className="w-full btn-hover py-3 px-6 rounded-full font-medium text-sm tracking-wide flex items-center justify-center gap-2 transition-all border border-text-primary/20 text-text-primary hover:border-accent-gold hover:text-accent-gold"
                >
                  Apply for a spot <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => window.open('https://tally.so/r/D4D9JN', '_blank')}
                  className="w-full btn-hover py-3 px-6 rounded-full font-medium text-sm tracking-wide flex items-center justify-center gap-2 transition-all border border-accent-gold/30 text-accent-gold hover:border-accent-gold"
                >
                  Send a voice memo first <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Sound Sessions */}
            <div className="glass-card border border-text-primary/10 rounded-2xl p-6 md:p-8">
              <span className="font-mono text-xs text-text-secondary/60 tracking-cinematic uppercase">Single Sessions</span>
              <h4 className="font-display font-bold text-text-primary text-xl uppercase tracking-tight-cinematic mt-1 mb-3">
                Modal Sound Sessions
              </h4>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                A live soundscape built around exactly where you are emotionally — no script, no agenda, just sound meeting you. Created in real-time to support regulation, release, or reflection.
              </p>
              <ul className="space-y-2 mb-6">
                {['60-minute live improvisation', 'Pre-session intention setting', 'Post-session integration notes', 'Recording of your session', 'Available in-person or virtual', '$150 per session'].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-secondary/80">
                    <Check className="w-4 h-4 text-accent-gold mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => window.open('https://outreach.titodreamingwith.me/freeguide', '_blank')}
                className="w-full btn-hover py-3 px-6 rounded-full font-medium text-sm tracking-wide flex items-center justify-center gap-2 transition-all border border-text-primary/20 text-text-primary hover:border-accent-gold hover:text-accent-gold"
              >
                Join the waitlist <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <p className="text-text-secondary text-sm mb-4">
            Not sure where to start?
          </p>
          <button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn-hover inline-flex items-center gap-2 text-accent-gold text-sm font-medium hover:underline"
          >
            Drop me a line
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
