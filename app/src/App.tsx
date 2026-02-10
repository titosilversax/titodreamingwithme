import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import AnimatedNav from './components/AnimatedNav';
import HeroSection from './sections/HeroSection';
import ScienceSection from './sections/ScienceSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import CommunitySection from './sections/CommunitySection';
import TestimonialsSection from './sections/TestimonialsSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none none',
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <AnimatedNav />
      <main>
        <HeroSection />
        <ScienceSection />
        <AboutSection />
        <ServicesSection />
        <CommunitySection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
