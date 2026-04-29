import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="relative bg-bg-primary min-h-screen">
      <div className="grain-overlay" />
      <div className="max-w-2xl mx-auto px-6 py-20">
        <Link
          to="/"
          className="text-accent-gold text-sm hover:underline mb-10 inline-block"
        >
          ← Back to home
        </Link>

        <h1 className="text-3xl font-serif text-text-primary mb-2">Privacy Policy</h1>
        <p className="text-text-secondary/50 text-sm mb-12">Last updated: April 2026</p>

        <div className="space-y-10 text-text-secondary/80 text-sm leading-relaxed">
          <section>
            <h2 className="text-text-primary text-base font-medium mb-3">Who we are</h2>
            <p>
              This site is operated by Tito Silver Sax (titodreamingwith.me). When you purchase a product,
              sign up for the free guide, or contact us, you're sharing information directly with us —
              not a third-party platform.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary text-base font-medium mb-3">What we collect</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Your email address, when you opt in to the free guide or make a purchase</li>
              <li>Your name, if you provide it through a form or purchase</li>
              <li>Basic analytics data (pages visited, device type) via standard site analytics</li>
              <li>Purchase information processed securely through Gumroad</li>
            </ul>
          </section>

          <section>
            <h2 className="text-text-primary text-base font-medium mb-3">How we use it</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To deliver your purchase or free guide</li>
              <li>To send occasional emails relevant to your purchase (you can unsubscribe anytime)</li>
              <li>To improve the site and understand what resonates</li>
              <li>We do not sell, rent, or share your personal information with third parties</li>
            </ul>
          </section>

          <section>
            <h2 className="text-text-primary text-base font-medium mb-3">Third-party services</h2>
            <p>
              We use Gumroad to process payments — they have their own privacy policy.
              We may use Meta Pixel for ad attribution. No sensitive personal data is shared with advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary text-base font-medium mb-3">Your rights</h2>
            <p>
              You can request to see, update, or delete your data at any time by emailing{' '}
              <a href="mailto:hello@titodreamingwith.me" className="text-accent-gold hover:underline">
                hello@titodreamingwith.me
              </a>
              . We'll respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary text-base font-medium mb-3">Cookies</h2>
            <p>
              This site uses minimal cookies for analytics and site functionality. No tracking cookies
              are used for behavioral advertising beyond what Meta Pixel provides for ad attribution.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary text-base font-medium mb-3">Contact</h2>
            <p>
              Questions? Email us at{' '}
              <a href="mailto:hello@titodreamingwith.me" className="text-accent-gold hover:underline">
                hello@titodreamingwith.me
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
