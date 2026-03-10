const socialLinks = [
  {
    label: 'Instagram',
    handle: '@titosilversax',
    href: 'https://instagram.com/titosilversax',
  },
  {
    label: 'YouTube',
    handle: '@titosilversax',
    href: 'https://youtube.com/@titosilversax',
  },
  {
    label: 'TikTok',
    handle: '@titosilversax',
    href: 'https://tiktok.com/@titosilversax',
  },
  {
    label: 'Skool',
    handle: 'Community',
    href: 'https://skool.com',
  },
  {
    label: 'Bandcamp',
    handle: 'titosilversax',
    href: 'https://bandcamp.com',
  },
];

const Footer = () => {
  return (
    <footer
      className="relative overflow-hidden py-20 px-6"
      style={{ borderTop: '1px solid rgba(0,217,255,0.08)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(0,217,255,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Brand */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-script inline-block mb-2 transition-colors"
          style={{ color: '#00d9ff', fontSize: '1.75rem', textDecoration: 'none' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#a8efff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#00d9ff')}
        >
          tito dreaming with me
        </a>

        {/* Tagline */}
        <p
          className="font-body italic mb-10"
          style={{ color: 'rgba(122,146,176,0.65)', fontSize: '1rem' }}
        >
          Dream into yourself 🌙
        </p>

        {/* Social links */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-1 transition-all duration-300"
              style={{ textDecoration: 'none' }}
            >
              <span
                className="font-ui uppercase tracking-widest"
                style={{
                  fontSize: '0.6rem',
                  color: 'rgba(122,146,176,0.5)',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(0,217,255,0.7)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(122,146,176,0.5)')}
              >
                {link.label}
              </span>
              <span
                className="font-body"
                style={{
                  fontSize: '0.95rem',
                  color: '#7a92b0',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#00d9ff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#7a92b0')}
              >
                {link.handle}
              </span>
            </a>
          ))}
        </div>

        {/* Divider */}
        <div
          className="mx-auto mb-8"
          style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(0,217,255,0.3), transparent)',
          }}
        />

        {/* Copyright */}
        <p
          className="font-ui"
          style={{ fontSize: '0.72rem', color: 'rgba(122,146,176,0.4)', letterSpacing: '0.04em' }}
        >
          © 2026 Tito Dreaming With Me
        </p>
      </div>
    </footer>
  );
};

export default Footer;
