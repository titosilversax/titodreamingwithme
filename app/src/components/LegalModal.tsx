import { useEffect } from 'react';

type LegalTab = 'terms' | 'privacy';

interface LegalModalProps {
  tab: LegalTab;
  onClose: () => void;
}

const LegalModal = ({ tab, onClose }: LegalModalProps) => {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(10,14,26,0.92)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl p-8 md:p-12"
        style={{
          background: 'rgba(12,16,32,0.98)',
          border: '1px solid rgba(0,217,255,0.14)',
          boxShadow: '0 0 80px rgba(0,217,255,0.07)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 font-ui"
          style={{ color: 'rgba(122,146,176,0.6)', fontSize: '1.2rem', background: 'none', border: 'none', cursor: 'pointer' }}
          aria-label="Close"
        >
          ✕
        </button>

        {tab === 'terms' ? <TermsContent /> : <PrivacyContent />}
      </div>
    </div>
  );
};

const h2Style: React.CSSProperties = {
  color: '#dce8f0',
  fontSize: '1.5rem',
  fontFamily: 'inherit',
  marginBottom: '0.5rem',
  marginTop: '0',
};

const h3Style: React.CSSProperties = {
  color: '#00d9ff',
  fontSize: '0.8rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  marginTop: '2rem',
  marginBottom: '0.5rem',
};

const pStyle: React.CSSProperties = {
  color: '#7a92b0',
  fontSize: '0.95rem',
  lineHeight: 1.8,
  marginBottom: '0.75rem',
};

const metaStyle: React.CSSProperties = {
  color: 'rgba(122,146,176,0.45)',
  fontSize: '0.72rem',
  letterSpacing: '0.05em',
  marginBottom: '2rem',
};

const TermsContent = () => (
  <div>
    <p className="font-script" style={{ color: '#00d9ff', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
      tito dreaming with me
    </p>
    <h2 className="font-heading" style={h2Style}>Terms of Service</h2>
    <p className="font-ui" style={metaStyle}>Effective date: March 16, 2026</p>

    <p className="font-body" style={pStyle}>
      By accessing this website or purchasing any service from Tito Dreaming With Me, you agree to the following terms. Please read them carefully.
    </p>

    <h3 className="font-ui" style={h3Style}>1. About This Service</h3>
    <p className="font-body" style={pStyle}>
      Tito Dreaming With Me offers peer support coaching, music-based healing guidance, and free educational resources. These services are provided by Tito (titosilversax), a state-certified peer support specialist operating as Tito Dreaming With Me.
    </p>
    <p className="font-body" style={pStyle}>
      <strong style={{ color: '#dce8f0' }}>This is not therapy.</strong> Tito Dreaming With Me is not a licensed mental health practice. No services provided here constitute psychotherapy, clinical counseling, psychiatric treatment, or medical advice. Tito is not a licensed therapist, psychologist, or medical professional.
    </p>

    <h3 className="font-ui" style={h3Style}>2. Eligibility</h3>
    <p className="font-body" style={pStyle}>
      You must be 18 years of age or older to purchase coaching services. By booking a session, you confirm that you are not currently in a mental health crisis requiring clinical intervention. If you are experiencing a crisis, please contact the 988 Suicide &amp; Crisis Lifeline by calling or texting <strong style={{ color: '#dce8f0' }}>988</strong>.
    </p>

    <h3 className="font-ui" style={h3Style}>3. Coaching Services &amp; Payment</h3>
    <p className="font-body" style={pStyle}>
      Coaching packages (The Navigation Session, The Journey, The Deep Navigation) are booked and paid through Paperbell. Full payment is due at time of booking. All prices are listed in USD.
    </p>
    <p className="font-body" style={pStyle}>
      Sessions are non-transferable. If you need to reschedule, please do so at least 24 hours in advance through your Paperbell client portal. Late cancellations (under 24 hours) or no-shows may forfeit that session.
    </p>

    <h3 className="font-ui" style={h3Style}>4. Refund Policy</h3>
    <p className="font-body" style={pStyle}>
      Refunds are available for unused sessions within 7 days of purchase if no sessions have been completed. Once a session has taken place, that session is non-refundable. Remaining unused sessions in a package may be refunded at Tito's discretion. To request a refund, contact us at the email listed below.
    </p>

    <h3 className="font-ui" style={h3Style}>5. Free Resources</h3>
    <p className="font-body" style={pStyle}>
      Free guides (including the Songwriting &amp; Emotional Expression Guide) are provided as-is for educational and creative purposes. By downloading a free resource, you may be added to an email list. You can unsubscribe at any time.
    </p>

    <h3 className="font-ui" style={h3Style}>6. Intellectual Property</h3>
    <p className="font-body" style={pStyle}>
      All content on this website — including text, images, music, and guides — is the intellectual property of Tito Dreaming With Me. You may not reproduce, distribute, or use any content for commercial purposes without written permission.
    </p>

    <h3 className="font-ui" style={h3Style}>8. Limitation of Liability</h3>
    <p className="font-body" style={pStyle}>
      Tito Dreaming With Me shall not be held liable for any outcomes resulting from coaching sessions or use of free resources. Peer support is a complement to, not a substitute for, professional mental health care. You participate at your own discretion.
    </p>

    <h3 className="font-ui" style={h3Style}>9. Changes to These Terms</h3>
    <p className="font-body" style={pStyle}>
      We may update these terms from time to time. Continued use of this website after changes constitutes acceptance of the revised terms.
    </p>

    <h3 className="font-ui" style={h3Style}>10. Contact</h3>
    <p className="font-body" style={pStyle}>
      For questions about these terms, reach out via email at{' '}
      <a href="mailto:hello@titodreamingwith.me" style={{ color: '#00d9ff', textDecoration: 'none' }}>
        hello@titodreamingwith.me
      </a>
      , via Instagram{' '}
      <a href="https://instagram.com/titosilversax" target="_blank" rel="noopener noreferrer" style={{ color: '#00d9ff', textDecoration: 'none' }}>
        @titosilversax
      </a>
      , or through the application form on this site.
    </p>
  </div>
);

const PrivacyContent = () => (
  <div>
    <p className="font-script" style={{ color: '#00d9ff', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
      tito dreaming with me
    </p>
    <h2 className="font-heading" style={h2Style}>Privacy Policy</h2>
    <p className="font-ui" style={metaStyle}>Effective date: March 16, 2026</p>

    <p className="font-body" style={pStyle}>
      Your privacy matters. This policy explains what information Tito Dreaming With Me collects, how it is used, and how it is protected.
    </p>

    <h3 className="font-ui" style={h3Style}>1. Information We Collect</h3>
    <p className="font-body" style={pStyle}>
      We collect information you voluntarily provide when you:
    </p>
    <ul style={{ ...pStyle, paddingLeft: '1.5rem', marginTop: 0 }}>
      <li>Fill out the coaching application form (via Tally) — name, email, and responses to application questions</li>
      <li>Download a free guide — name and email address</li>
      <li>Book a coaching session (via Paperbell) — name, email, and payment information (handled by Paperbell)</li>
    </ul>
    <p className="font-body" style={pStyle}>
      We do not knowingly collect data from anyone under 18.
    </p>

    <h3 className="font-ui" style={h3Style}>2. How We Use Your Information</h3>
    <p className="font-body" style={pStyle}>
      Your information is used to:
    </p>
    <ul style={{ ...pStyle, paddingLeft: '1.5rem', marginTop: 0 }}>
      <li>Respond to coaching inquiries and schedule sessions</li>
      <li>Deliver free guides and resources you've requested</li>
      <li>Send occasional emails about new offerings and guides (you can unsubscribe anytime)</li>
      <li>Improve the quality of our services</li>
    </ul>
    <p className="font-body" style={pStyle}>
      We do not sell, rent, or share your personal information with third parties for marketing purposes.
    </p>

    <h3 className="font-ui" style={h3Style}>3. Third-Party Services</h3>
    <p className="font-body" style={pStyle}>
      We use the following third-party platforms, each with their own privacy policies:
    </p>
    <ul style={{ ...pStyle, paddingLeft: '1.5rem', marginTop: 0 }}>
      <li><strong style={{ color: '#dce8f0' }}>Tally</strong> — coaching application form</li>
      <li><strong style={{ color: '#dce8f0' }}>Paperbell</strong> — session booking and payment processing</li>
      <li><strong style={{ color: '#dce8f0' }}>Notion</strong> — free guide delivery</li>
      <li><strong style={{ color: '#dce8f0' }}>Vercel</strong> — website hosting</li>
    </ul>

    <h3 className="font-ui" style={h3Style}>4. Cookies &amp; Analytics</h3>
    <p className="font-body" style={pStyle}>
      This website does not currently use tracking cookies or analytics software. Third-party embeds (such as Tally) may set their own cookies per their privacy policies.
    </p>

    <h3 className="font-ui" style={h3Style}>5. Data Retention</h3>
    <p className="font-body" style={pStyle}>
      We retain your information for as long as necessary to provide services or as required by applicable law. You may request deletion of your data at any time by contacting us.
    </p>

    <h3 className="font-ui" style={h3Style}>6. Your Rights</h3>
    <p className="font-body" style={pStyle}>
      You have the right to access, correct, or request deletion of your personal data. To exercise these rights, reach out via the contact information below.
    </p>

    <h3 className="font-ui" style={h3Style}>7. Changes to This Policy</h3>
    <p className="font-body" style={pStyle}>
      We may update this privacy policy periodically. Any changes will be posted on this page with an updated effective date.
    </p>

    <h3 className="font-ui" style={h3Style}>8. Contact</h3>
    <p className="font-body" style={pStyle}>
      For privacy-related questions, reach out via email at{' '}
      <a href="mailto:hello@titodreamingwith.me" style={{ color: '#00d9ff', textDecoration: 'none' }}>
        hello@titodreamingwith.me
      </a>
      , via Instagram{' '}
      <a href="https://instagram.com/titosilversax" target="_blank" rel="noopener noreferrer" style={{ color: '#00d9ff', textDecoration: 'none' }}>
        @titosilversax
      </a>
      , or through the application form on this site.
    </p>
  </div>
);

export default LegalModal;
export type { LegalTab };
