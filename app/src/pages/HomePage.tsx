import { Link } from 'react-router-dom';
import AboutSection from '../sections/AboutSection';
import ListenSection from '../sections/ListenSection';

// Simple intro section matching the offerings page visual rhythm
const IntroSection = () => (
  <section
    className="relative py-28 md:py-40 px-6 overflow-hidden"
    id="hero"
  >
    {/* Background glow */}
    <div
      className="absolute pointer-events-none"
      style={{
        inset: 0,
        background:
          'radial-gradient(ellipse 65% 55% at 50% 48%, rgba(0,217,255,0.055) 0%, transparent 70%)',
      }}
    />

    <div className="relative z-10 max-w-3xl mx-auto text-center">
      <p
        className="font-script mb-5"
        style={{ color: '#00d9ff', fontSize: '1.3rem', opacity: 0.85 }}
      >
        tito dreaming with me
      </p>

      <h1
        className="font-body italic text-balance leading-snug mb-7"
        style={{
          fontSize: 'clamp(1.75rem, 4.5vw, 3.5rem)',
          color: '#dce8f0',
          fontWeight: 400,
          lineHeight: 1.35,
        }}
      >
        "If music has ever felt like the only thing that understood you —
        you're in the right place."
      </h1>

      <div
        className="mx-auto mb-7"
        style={{
          width: 48,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(0,217,255,0.6), transparent)',
        }}
      />

      <p
        className="font-body text-balance mb-10"
        style={{
          fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
          color: '#7a92b0',
          lineHeight: 1.7,
        }}
      >
        Healing guidance through music, peer support, and lived experience.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="https://prismatic-music-garden.kit.com/freeguide"
          className="btn-cyan"
        >
          Get Your Free Emotional Star Map
        </a>
        <Link to="/offerings" className="btn-outline-cyan">
          Work With Me
        </Link>
      </div>

      <p
        className="font-script mt-8"
        style={{ color: 'rgba(0,217,255,0.45)', fontSize: '1.05rem' }}
      >
        Dream into yourself
      </p>
    </div>
  </section>
);

const HomePage = () => (
  <div style={{ paddingTop: '5rem' }}>
    <IntroSection />
    <AboutSection />
    <ListenSection />
  </div>
);

export default HomePage;
