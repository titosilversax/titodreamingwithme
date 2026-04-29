import { Link } from 'react-router-dom';

export default function TermsOfService() {
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

        <h1 className="text-3xl font-serif text-text-primary mb-2">Terms of Service</h1>
        <p className="text-text-secondary/50 text-sm mb-12">Last updated: April 2026</p>

        <div className="space-y-10 text-text-secondary/80 text-sm leading-relaxed">
          <section>
            <h2 className="text-text-primary text-base font-medium mb-3">Overview</h2>
            <p>
              By using titodreamingwith.me and purchasing any products, you agree to these terms.
              This site is owned and operated by Tito Silver Sax.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary text-base font-medium mb-3">Not a substitute for therapy</h2>
            <p>
              Everything offered here — the guides, toolkits, and sound sessions — is peer support, not
              therapy, counseling, or medical treatment. If you are in crisis or need clinical support,
              please reach out to a licensed mental health professional or call 988 (Suicide & Crisis Lifeline).
            </p>
          </section>

          <section>
            <h2 className="text-text-primary text-base font-medium mb-3">Digital products</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>All digital products (guides, toolkits, templates) are delivered electronically</li>
              <li>Due to the nature of digital goods, all sales are final — no refunds after delivery</li>
              <li>If you experience a technical issue with your purchase, email us and we'll make it right</li>
              <li>You may use purchased materials for personal use only — not for resale or redistribution</li>
            </ul>
          </section>

          <section>
            <h2 className="text-text-primary text-base font-medium mb-3">Intellectual property</h2>
            <p>
              All content on this site — copy, design, audio, and downloadable materials — is owned by
              Tito Silver Sax unless otherwise noted. You may not reproduce or distribute it without
              written permission.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary text-base font-medium mb-3">Limitation of liability</h2>
            <p>
              We are not liable for any outcomes resulting from use of our products or content.
              Results vary and are not guaranteed. You take full responsibility for how you engage
              with the material.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary text-base font-medium mb-3">Changes to these terms</h2>
            <p>
              We may update these terms occasionally. Continued use of the site after changes
              means you accept the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-text-primary text-base font-medium mb-3">Contact</h2>
            <p>
              Questions about these terms? Email us at{' '}
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
