import { useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navigation } from './components/Navigation';
import { HeroSection } from './sections/HeroSection';
import { BeliefSection } from './sections/BeliefSection';
import { OfferingsDetailSection } from './sections/OfferingsDetailSection';
import { ContactSection } from './sections/ContactSection';
import { FooterSection } from './sections/FooterSection';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useLayoutEffect(() => {
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Resolve hash anchors after React renders and images begin loading
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    // rAF ensures the DOM is painted; timeout gives images time to reserve space
    const raf = requestAnimationFrame(() => {
      const timer = setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      return () => clearTimeout(timer);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative bg-bg-primary min-h-screen">
      <div className="grain-overlay" />
      <Navigation />
      <main className="relative">
        <HeroSection />
        <BeliefSection />
        <OfferingsDetailSection />
        <ContactSection />
        <FooterSection />
      </main>
    </div>
  );
}

export default App;
