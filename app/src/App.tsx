import { useLayoutEffect } from 'react';
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
