import GuidesSection from '../sections/GuidesSection';
import CoachingSection from '../sections/CoachingSection';

// Simple page header for the offerings route
const OfferingsHero = () => (
  <section
    className="relative pt-40 pb-20 px-6 text-center overflow-hidden"
  >
    {/* Background glow */}
    <div
      className="absolute pointer-events-none"
      style={{
        inset: 0,
        background:
          'radial-gradient(ellipse 70% 55% at 50% 30%, rgba(0,217,255,0.05) 0%, transparent 65%)',
      }}
    />

    <div className="relative z-10 max-w-3xl mx-auto">
      <p
        className="font-script mb-4"
        style={{ color: '#00d9ff', fontSize: '1.2rem' }}
      >
        tito dreaming with me
      </p>

      <h1
        className="font-heading mb-6"
        style={{
          fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
          color: '#dce8f0',
          lineHeight: 1.2,
        }}
      >
        Offerings
      </h1>

      <p
        className="font-body"
        style={{
          color: '#7a92b0',
          fontSize: '1.15rem',
          lineHeight: 1.75,
          maxWidth: '36rem',
          margin: '0 auto',
        }}
      >
        Free guides, one-on-one healing guidance, and everything in between.
        Start wherever you are.
      </p>
    </div>
  </section>
);

const OfferingsPage = () => (
  <>
    <OfferingsHero />
    <GuidesSection />
    <CoachingSection />
  </>
);

export default OfferingsPage;
