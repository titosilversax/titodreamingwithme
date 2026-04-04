import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import OfferingsPage from './pages/OfferingsPage';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.getAll().forEach(st => st.kill());
  }, [location.pathname]);

  return (
    <div className="relative" style={{ backgroundColor: '#0a0e1a' }}>
      <div className="noise-overlay" />
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/offerings" element={<OfferingsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
