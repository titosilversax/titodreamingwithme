import { Link } from 'react-router-dom';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import ListenSection from '../sections/ListenSection';

// Bridge section — invites ready visitors toward /offerings
const WorkWithMeBridge = () => (
  <section
    className="relative py-28 md:py-36 px-6 overflow-hidden"
    id="work-with-me"
  >
    {/* Glow */}
    <div
      className="absolute pointer-events-none"
      style={{
        inset: 0,
        background:
          'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(0,217,255,0.05) 0%, transparent 65%)',
      }}
    />

    {/* Top divider */}
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-px"
      style={{
        height: '80px',
        background: 'linear-gradient(to bottom, transparent, rgba(0,217,255,0.25), transparent)',
      }}
    />

    <div className="relative z-10 max-w-2xl mx-auto text-center">
      <p
        className="font-script mb-4"
        style={{ color: '#00d9ff', fontSize: '1.2rem' }}
      >
        ready to go deeper?
      </p>

      <h2
        className="font-heading mb-6"
        style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', color: '#dce8f0' }}
      >
        Work With Me
      </h2>

      <p
        className="font-body mb-10"
        style={{
          color: '#7a92b0',
          fontSize: '1.1rem',
          lineHeight: 1.75,
          maxWidth: '34rem',
          margin: '0 auto 2.5rem',
        }}
      >
        Free guides, one-on-one healing sessions, and everything in between.
        If something here is calling to you, this is where to go next.
      </p>

      <Link to="/offerings" className="btn-cyan">
        See All Offerings
      </Link>

      <p
        className="font-script mt-8"
        style={{ color: 'rgba(0,217,255,0.4)', fontSize: '1rem' }}
      >
        Dream into yourself
      </p>
    </div>
  </section>
);

const HomePage = () => (
  <>
    <HeroSection />
    <AboutSection />
    <ListenSection />
    <WorkWithMeBridge />
  </>
);

export default HomePage;
