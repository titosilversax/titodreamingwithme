import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Check, 
  Calendar, 
  Clock, 
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
  highlighted?: boolean;
}

const services: ServiceDetail[] = [
  {
    id: 'deep-navigation',
    title: 'The Deep Navigation',
    subtitle: '90-Day Intensive',
    price: '$1,500 – $2,500',
    priceNote: 'Sliding scale available',
    description: 'A private container for navigating significant emotional transitions — grief, identity loss, burnout, or cultural disconnection. This is not therapy. This is guided emotional navigation through music, modal frameworks, and peer-supported practice.',
    features: [
      '6 one-on-one sessions (2 per month)',
      'Custom Emotional Star Map',
      'Original saxophone recording made for you',
      'Async voice note support between sessions',
      'Bilingual (English & Spanish)',
    ],
    includes: [
      { icon: <Calendar className="w-4 h-4" />, text: 'Month 1: Mapping — 2 sessions + Custom Star Map + Curated modal playlist' },
      { icon: <Music className="w-4 h-4" />, text: 'Month 2: Movement — 2 sessions + Modal journaling practice + MIDI chord vault' },
      { icon: <Sparkles className="w-4 h-4" />, text: 'Month 3: Integration — 2 sessions + Personal wellness ritual document' },
    ],
    cta: 'Apply for a spot',
    ctaAction: () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    },
    highlighted: true,
  },
  {
    id: 'sound-sessions',
    title: 'Modal Sound Sessions',
    subtitle: 'Single Sessions',
    price: '$150',
    priceNote: 'per 60-minute session',
    description: 'Live saxophone improvisation designed to meet you exactly where you are emotionally. Each session is a unique soundscape created in real-time to support regulation, release, or reflection.',
    features: [
      '60-minute live improvisation',
      'Pre-session intention setting',
      'Post-session integration notes',
      'Recording of your session',
      'Available in-person or virtual',
    ],
    includes: [
      { icon: <Clock className="w-4 h-4" />, text: '15-min intention setting call' },
      { icon: <Headphones className="w-4 h-4" />, text: '45-min live soundscape' },
      { icon: <FileText className="w-4 h-4" />, text: 'Written integration notes' },
    ],
    cta: 'Book a session',
    ctaAction: () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
  {
    id: 'star-map',
    title: 'The Emotional Star Map',
    subtitle: 'Free Guide',
    price: 'Free',
    priceNote: 'Delivered to your inbox',
    description: 'A Notion-based guide mapping all seven musical modes to their emotional equivalents — with original names, journaling prompts, and a starting point for building your own sound practice. No music background required.',
    features: [
      'Complete mode-emotion mapping',
      'Journaling prompts for each mode',
      'Curated playlist starters',
      'Notion template format',
      'Lifetime updates',
    ],
    includes: [
      { icon: <FileText className="w-4 h-4" />, text: '30-page digital guide' },
      { icon: <Music className="w-4 h-4" />, text: 'Sample modal playlist' },
      { icon: <Sparkles className="w-4 h-4" />, text: 'Journaling framework' },
    ],
    cta: 'Get the free guide',
    ctaAction: () => {
      window.open('https://prismatic-music-garden.kit.com/freeguide', '_blank');
    },
  },
  {
    id: 'grief-cuento',
    title: 'The Sound of Your Grief',
    subtitle: 'Digital Product',
    price: '$47',
    priceNote: 'One-time purchase',
    description: 'A 30-minute healing Cuento composed specifically for grief and loss, paired with a short workbook that helps you locate where grief lives in your body — and which musical modes carry it best.',
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
    cta: 'Join the waitlist',
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
    answer: 'For the 90-day Deep Navigation container, I offer a sliding scale from $1,500 to $2,500 based on your financial situation. If cost is a barrier, let\'s talk — I reserve a limited number of spots at the lower end of the scale.',
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
            Work With Me
          </span>
          <h2 className="font-display font-black text-text-primary uppercase tracking-wide-cinematic leading-display mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Choose Your Path
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto">
            Every offering was built from the inside out — from someone who found his way back through sound.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-24">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`relative rounded-2xl p-6 md:p-8 transition-all duration-300 hover:scale-[1.02] ${
                service.highlighted 
                  ? 'bg-gradient-to-br from-accent-gold/10 to-accent-gold/5 border-2 border-accent-gold/30' 
                  : 'glass-card border border-text-primary/10'
              }`}
            >
              {service.highlighted && (
                <div className="absolute -top-3 left-6">
                  <span className="bg-accent-gold text-bg-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Most Popular
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
                description: 'Send me a message or book a free 15-minute call. Tell me what you\'re navigating and what you\'re hoping to find.',
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

        {/* Final CTA */}
        <div className="text-center mt-16">
          <p className="text-text-secondary text-sm mb-4">
            Not sure which offering is right for you?
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
            Let's talk it through
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
