import { Heart, Music, Pen, Mic } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#0B0F1F] py-16 px-6 lg:px-12">
      {/* 100% Human Badge */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="glass-card rounded-[28px] p-8 md:p-10 text-center">
          <h3 className="font-heading text-2xl md:text-3xl text-[#F5F1E8] mb-6">
            100% <span className="text-[#D4A574]">HUMAN-MADE</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#D4A574]/20 flex items-center justify-center mb-3">
                <Music className="w-6 h-6 text-[#D4A574]" />
              </div>
              <p className="font-body text-sm text-[#A9B3C7]">
                Every note played live by human hands
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#D4A574]/20 flex items-center justify-center mb-3">
                <Pen className="w-6 h-6 text-[#D4A574]" />
              </div>
              <p className="font-body text-sm text-[#A9B3C7]">
                Every word written by human hearts
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#D4A574]/20 flex items-center justify-center mb-3">
                <Mic className="w-6 h-6 text-[#D4A574]" />
              </div>
              <p className="font-body text-sm text-[#A9B3C7]">
                Every narration spoken by human voices
              </p>
            </div>
          </div>
          <p className="font-body text-sm text-[#A9B3C7] mt-6">
            No AI. No automation. Just two people creating healing space for you.
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-script text-2xl text-[#F5F1E8] hover:text-[#D4A574] transition-colors inline-block mb-4"
            >
              tito dreaming with me
            </a>
            <p className="font-body text-sm text-[#A9B3C7]">
              Healing through music · Creating through feeling
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm tracking-wider text-[#F5F1E8] mb-4">
              QUICK LINKS
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'All Cuentos', href: '#cuentos' },
                { label: 'The Observatory', href: '#cuentos' },
                { label: 'The Emotional Star Map', href: '#starmap' },
                { label: 'Book a Session', href: '#contact' },
                { label: 'About', href: '#saxophone' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="font-body text-sm text-[#A9B3C7] hover:text-[#D4A574] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading text-sm tracking-wider text-[#F5F1E8] mb-4">
              CONNECT
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'YouTube', href: 'https://youtube.com' },
                { label: 'Instagram', href: 'https://instagram.com' },
                { label: 'Email Newsletter', href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }
                    }}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="font-body text-sm text-[#A9B3C7] hover:text-[#D4A574] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#F5F1E8]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-[#A9B3C7]">
            © 2026 Tito Dreaming With Me · 100% human-made
          </p>
          <div className="flex items-center gap-1 text-[#A9B3C7]">
            <span className="font-body text-xs">Made with</span>
            <Heart className="w-3 h-3 text-[#8b4049]" fill="#8b4049" />
            <span className="font-body text-xs">for healing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
