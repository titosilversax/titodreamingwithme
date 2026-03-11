import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import GuidesSection from './sections/GuidesSection';
import CoachingSection from './sections/CoachingSection';
import SkoolSection from './sections/SkoolSection';
import ListenSection from './sections/ListenSection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative" style={{ backgroundColor: '#0a0e1a' }}>
      <div className="noise-overlay" />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <GuidesSection />
        <CoachingSection />
        <SkoolSection />
        <ListenSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
