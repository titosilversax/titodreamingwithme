import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Clock, Globe, Heart, Users, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ListenersSectionProps {
  className?: string;
}

const cuentos = [
  {
    id: 1,
    title: 'The Indigo Well',
    subtitle: 'A Cuento for Anxiety',
    image: '/images/cuento-indigo-well.jpg',
    duration: '30 min',
    language: 'Bilingual',
    mode: 'Dorian',
    featured: true,
  },
  {
    id: 2,
    title: 'The Crimson Desert',
    subtitle: 'A Cuento for Grief',
    image: '/images/cuento-crimson-desert.jpg',
    duration: '30 min',
    language: 'Bilingual',
    mode: 'Phrygian',
    featured: false,
  },
  {
    id: 3,
    title: 'The Golden Ladder',
    subtitle: 'A Cuento for Depression',
    image: '/images/cuento-golden-ladder.jpg',
    duration: '30 min',
    language: 'English',
    mode: 'Lydian',
    featured: false,
  },
  {
    id: 4,
    title: 'The Violet Shore',
    subtitle: 'A Cuento for Insomnia',
    image: '/images/cuento-violet-shore.jpg',
    duration: '30 min',
    language: 'Español',
    mode: 'Locrian',
    featured: false,
  },
];

const filters = ['All', 'Anxiety', 'Insomnia', 'Grief', 'Depression', 'Español'];

const ListenersSection = ({ className = '' }: ListenersSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const membershipRef = useRef<HTMLDivElement>(null);
  
  const [activeFilter, setActiveFilter] = useState('All');

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

      // Featured card animation
      gsap.fromTo(
        featuredRef.current,
        { x: '-10vw', opacity: 0, scale: 0.98 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top 75%',
          },
        }
      );

      // Grid cards animation
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.cuento-card');
        gsap.fromTo(
          cards,
          { x: '10vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      // Membership panel parallax
      gsap.fromTo(
        membershipRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: membershipRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredCuentos = activeFilter === 'All' 
    ? cuentos.filter(c => !c.featured)
    : cuentos.filter(c => !c.featured && (
        c.subtitle.includes(activeFilter) || 
        c.language === activeFilter ||
        (activeFilter === 'Español' && c.language === 'Español')
      ));

  const featuredCuento = cuentos.find(c => c.featured);

  return (
    <section
      ref={sectionRef}
      id="cuentos"
      className={`relative min-h-screen bg-[#0B0F1F] py-20 md:py-32 ${className}`}
    >
      {/* Subtle starfield background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/constellation-starfield.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.2,
          }}
        />
      </div>

      <div className="relative z-10 px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#F5F1E8] tracking-wide mb-4">
            FOR <span className="text-[#D4A574]">LISTENERS</span>
          </h2>
          <p className="font-body text-base md:text-lg text-[#A9B3C7] max-w-2xl">
            30-minute surrealist sound journeys for your nervous system.
          </p>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 mt-6">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-body transition-all ${
                  activeFilter === filter
                    ? 'bg-[#D4A574] text-[#0B0F1F]'
                    : 'bg-[#1a1f3a] text-[#A9B3C7] hover:bg-[#2a3050]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Featured Player */}
          {featuredCuento && (
            <div ref={featuredRef} className="lg:row-span-2">
              <div className="relative rounded-[28px] overflow-hidden group cursor-pointer h-full min-h-[400px]">
                <img
                  src={featuredCuento.image}
                  alt={featuredCuento.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1F] via-[#0B0F1F]/40 to-transparent" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-[#D4A574] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Play className="w-8 h-8 text-[#0B0F1F] ml-1" fill="#0B0F1F" />
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#D4A574]/20 text-[#D4A574] text-xs font-body mb-3">
                    Featured
                  </span>
                  <h3 className="font-heading text-2xl md:text-3xl text-[#F5F1E8] mb-1">
                    {featuredCuento.title}
                  </h3>
                  <p className="font-body text-[#A9B3C7] mb-4">
                    {featuredCuento.subtitle}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-[#A9B3C7]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredCuento.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      {featuredCuento.language}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Side Stack Cards */}
          <div ref={gridRef} className="space-y-4">
            {filteredCuentos.map((cuento) => (
              <div
                key={cuento.id}
                className="cuento-card relative rounded-[20px] overflow-hidden group cursor-pointer h-[140px]"
              >
                <img
                  src={cuento.image}
                  alt={cuento.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F1F]/90 via-[#0B0F1F]/60 to-transparent" />
                
                {/* Play Icon */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#D4A574]/20 flex items-center justify-center group-hover:bg-[#D4A574] transition-colors">
                  <Play className="w-5 h-5 text-[#D4A574] group-hover:text-[#0B0F1F] ml-0.5" fill="currentColor" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-center">
                  <h4 className="font-heading text-lg text-[#F5F1E8] mb-1">
                    {cuento.title}
                  </h4>
                  <p className="font-body text-sm text-[#A9B3C7] mb-2">
                    {cuento.subtitle}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-[#A9B3C7]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {cuento.duration}
                    </span>
                    <span>{cuento.language}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Membership Panel */}
        <div
          ref={membershipRef}
          className="glass-card rounded-[28px] p-8 md:p-10"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#D4A574]" />
                <span className="font-heading text-sm tracking-wider text-[#D4A574]">
                  THE OBSERVATORY
                </span>
              </div>
              <h3 className="font-heading text-2xl md:text-3xl text-[#F5F1E8] mb-2">
                Join The Observatory
              </h3>
              <p className="font-body text-[#A9B3C7] max-w-xl">
                Get ad-free Cuentos, private community access, monthly live circles, and early releases.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <span className="font-heading text-3xl text-[#D4A574]">$15/month</span>
              <button className="btn-primary flex items-center gap-2">
                <Users className="w-4 h-4" />
                Join Now
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#F5F1E8]/10">
            {[
              'Ad-free Cuentos',
              'Private Discord',
              'Live circles',
              'Early access',
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#5A9A8E]" />
                <span className="font-body text-sm text-[#A9B3C7]">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListenersSection;
