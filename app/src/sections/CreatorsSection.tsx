import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Check, 
  Music, 
  FileText, 
  Download, 
  Zap, 
  Star
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CreatorsSectionProps {
  className?: string;
}

const territories = [
  {
    name: 'Ionian',
    title: 'White Light',
    feeling: 'Joy, Completion, Arrival',
    color: '#f8f9fa',
    image: '/images/territory-ionian.jpg',
  },
  {
    name: 'Dorian',
    title: 'Indigo Dusk',
    feeling: 'Bittersweet Hope, Noble Sadness',
    color: '#4a5d7c',
    image: '/images/territory-dorian.jpg',
  },
  {
    name: 'Phrygian',
    title: 'Crimson Smoke',
    feeling: 'Intensity, Danger, Raw Passion',
    color: '#8b4049',
    image: '/images/territory-phrygian.jpg',
  },
  {
    name: 'Lydian',
    title: 'Golden Aurora',
    feeling: 'Wonder, Floating, Dreamlike Awe',
    color: '#f4d58d',
    image: '/images/territory-lydian.jpg',
  },
  {
    name: 'Mixolydian',
    title: 'Emerald Road',
    feeling: 'Confidence, Journey, Earthy Warmth',
    color: '#6b8e23',
    image: '/images/territory-mixolydian.jpg',
  },
  {
    name: 'Aeolian',
    title: 'Slate Twilight',
    feeling: 'Sorrow, Dignity, Deep Memory',
    color: '#5f6c7b',
    image: '/images/territory-aeolian.jpg',
  },
  {
    name: 'Locrian',
    title: 'Violet Void',
    feeling: 'Unease, Dissolution, The Unknown',
    color: '#6b5b95',
    image: '/images/territory-locrian.jpg',
  },
];

const CreatorsSection = ({ className = '' }: CreatorsSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const territoriesRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  
  const [expandedTerritory, setExpandedTerritory] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          },
        }
      );

      // Problem/Solution animation
      gsap.fromTo(
        problemRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: problemRef.current,
            start: 'top 75%',
          },
        }
      );

      // Territories animation
      if (territoriesRef.current) {
        const cards = territoriesRef.current.querySelectorAll('.territory-card');
        gsap.fromTo(
          cards,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            scrollTrigger: {
              trigger: territoriesRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      // Pricing animation
      gsap.fromTo(
        pricingRef.current,
        { scale: 0.96, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: pricingRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleFreeDownload = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you! Your free Star Map sample will be sent to ${email}`);
    setEmail('');
  };

  return (
    <section
      ref={sectionRef}
      id="starmap"
      className={`relative min-h-screen bg-[#0D1C12] py-20 md:py-32 ${className}`}
    >
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1F]/50 via-transparent to-[#0B0F1F]/50" />

      <div className="relative z-10 px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#F5F1E8] tracking-wide mb-4">
            FOR <span className="text-[#D4A574]">CREATORS</span>
          </h2>
          <p className="font-body text-base md:text-lg text-[#A9B3C7] max-w-2xl">
            Stop Googling &quot;sad chord progressions.&quot; Navigate music by feeling instead.
          </p>
        </div>

        {/* Problem & Solution */}
        <div ref={problemRef} className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Problem */}
          <div className="glass-card rounded-[28px] p-6 md:p-8">
            <h3 className="font-heading text-xl text-[#F5F1E8] mb-4">
              The Problem
            </h3>
            <p className="font-body text-[#A9B3C7] mb-6">
              You know exactly how you want your song to feel. Bittersweet. Ethereal. Nostalgic with an edge.
            </p>
            <p className="font-body text-[#A9B3C7] mb-6">
              But translating that feeling into actual chords? That&apos;s where you get stuck.
            </p>
            <ul className="space-y-3">
              {[
                'Googling "sad chord progressions" (generic results)',
                'Watching music theory videos (falling asleep)',
                'Trying random chords (none feel RIGHT)',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8b4049] mt-2 flex-shrink-0" />
                  <span className="font-body text-sm text-[#A9B3C7]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution */}
          <div className="glass-card rounded-[28px] p-6 md:p-8 border-[#D4A574]/30">
            <h3 className="font-heading text-xl text-[#F5F1E8] mb-4">
              The Solution
            </h3>
            <p className="font-body text-[#A9B3C7] mb-6">
              <span className="text-[#D4A574] font-medium">The Emotional Star Map</span> is your shortcut.
            </p>
            <p className="font-body text-[#A9B3C7] mb-6">
              7 emotional territories. Deep journaling prompts. Chord progressions organized by how they make people feel.
            </p>
            <div className="flex items-center gap-2 text-[#5A9A8E]">
              <Zap className="w-5 h-5" />
              <span className="font-body text-sm">No theory required. Just honest emotion.</span>
            </div>
          </div>
        </div>

        {/* Free Lead Magnet */}
        <div className="glass-card rounded-[28px] p-6 md:p-8 mb-16 border-[#D4A574]/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#D4A574]/20 text-[#D4A574] text-xs font-body mb-3">
                FREE DOWNLOAD
              </span>
              <h3 className="font-heading text-xl md:text-2xl text-[#F5F1E8] mb-2">
                The Essential Emotional Star Map
              </h3>
              <p className="font-body text-sm text-[#A9B3C7]">
                Master Ionian + Dorian — the two most essential emotional territories.
              </p>
            </div>
            <form onSubmit={handleFreeDownload} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-3 rounded-full bg-[#1a1f3a] text-[#F5F1E8] font-body text-sm border border-[#F5F1E8]/10 focus:border-[#D4A574] focus:outline-none w-full sm:w-64"
                required
              />
              <button type="submit" className="btn-gold flex items-center justify-center gap-2 whitespace-nowrap">
                <Download className="w-4 h-4" />
                Get Free Pages
              </button>
            </form>
          </div>
        </div>

        {/* 7 Emotional Territories */}
        <div className="mb-16">
          <h3 className="font-heading text-2xl text-[#F5F1E8] mb-8 text-center">
            The <span className="text-[#D4A574]">7 Emotional Territories</span>
          </h3>
          
          <div ref={territoriesRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {territories.map((territory) => (
              <div
                key={territory.name}
                className="territory-card group cursor-pointer"
                onClick={() => setExpandedTerritory(
                  expandedTerritory === territory.name ? null : territory.name
                )}
              >
                <div 
                  className="relative rounded-[20px] overflow-hidden aspect-square mb-3"
                  style={{ boxShadow: `0 0 20px ${territory.color}30` }}
                >
                  <img
                    src={territory.image}
                    alt={territory.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1F]/80 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <span 
                      className="font-heading text-xs tracking-wider"
                      style={{ color: territory.color }}
                    >
                      {territory.name}
                    </span>
                  </div>
                </div>
                <h4 className="font-body text-sm text-[#F5F1E8] mb-1">{territory.title}</h4>
                <p className="font-body text-xs text-[#A9B3C7] line-clamp-2">{territory.feeling}</p>
                
                {expandedTerritory === territory.name && (
                  <div className="mt-3 p-3 rounded-lg bg-[#1a1f3a]/50">
                    <p className="font-body text-xs text-[#A9B3C7]">
                      Click to explore {territory.name} mode chords and progressions.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div ref={pricingRef}>
          <h3 className="font-heading text-2xl text-[#F5F1E8] mb-8 text-center">
            Choose Your <span className="text-[#D4A574]">Path</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Complete Map */}
            <div className="glass-card rounded-[28px] p-6 md:p-8">
              <h4 className="font-heading text-xl text-[#F5F1E8] mb-2">
                The Complete Map
              </h4>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-heading text-4xl text-[#D4A574]">$27</span>
                <span className="font-body text-[#A9B3C7]">one-time</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'All 7 Emotional Palettes',
                  '4 Emotional Bridges',
                  'Song Feeling Journal',
                  'Notion template (duplicable)',
                  'Obsidian vault download',
                  'Lifetime access',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[#5A9A8E]" />
                    <span className="font-body text-sm text-[#A9B3C7]">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full btn-primary flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" />
                Buy Now — $27
              </button>
            </div>

            {/* Complete Package - Best Value */}
            <div className="glass-card rounded-[28px] p-6 md:p-8 border-2 border-[#D4A574] relative">
              {/* Best Value Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 rounded-full bg-[#D4A574] text-[#0B0F1F] font-body text-xs font-medium flex items-center gap-1">
                  <Star className="w-3 h-3" fill="#0B0F1F" />
                  BEST VALUE
                </span>
              </div>

              <h4 className="font-heading text-xl text-[#F5F1E8] mb-2 mt-2">
                The Complete Package
              </h4>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-heading text-4xl text-[#D4A574]">$47</span>
                <span className="font-body text-[#A9B3C7]">one-time</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Everything in Complete Map',
                  'PLUS: 2,940 MIDI chord progressions',
                  'Organized by emotional territory',
                  'Works in any DAW (Ableton, Logic, FL Studio)',
                  'Drag & drop into your projects',
                  'Lifetime updates',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-[#5A9A8E]" />
                    <span className={`font-body text-sm ${i === 0 ? 'text-[#D4A574]' : 'text-[#A9B3C7]'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button className="w-full btn-gold flex items-center justify-center gap-2">
                <Music className="w-4 h-4" />
                Buy Now — $47
              </button>
            </div>
          </div>

          {/* Guarantee */}
          <div className="text-center mt-8">
            <p className="font-body text-sm text-[#A9B3C7]">
              <span className="text-[#5A9A8E]">60-Day Guarantee:</span> Sounds right or it&apos;s free. No questions asked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorsSection;
