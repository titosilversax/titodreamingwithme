import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const anchorLinks = [
    { label: 'About', href: '/#about' },
    { label: 'Listen', href: '/#listen' },
  ];

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = href.replace('/', '');
    if (isHome) {
      e.preventDefault();
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
    // On other pages, let the full href navigate home then jump to section
  };

  const linkStyle = { color: '#7a92b0', letterSpacing: '0.06em' };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
        style={{
          background: isScrolled ? 'rgba(10, 14, 26, 0.92)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(0,217,255,0.07)' : 'none',
        }}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between max-w-7xl mx-auto">
          <Link
            to="/"
            className="font-script text-xl lg:text-2xl transition-colors"
            style={{ color: '#00d9ff' }}
          >
            tito dreaming with me
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {anchorLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="font-ui text-sm tracking-wide transition-colors"
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#00d9ff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#7a92b0')}
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/offerings"
              className="font-ui text-sm tracking-wide transition-colors"
              style={linkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#00d9ff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#7a92b0')}
            >
              Offerings
            </Link>
            <a
              href="https://prismatic-music-garden.kit.com/freeguide"
              className="btn-outline-cyan"
              style={{ fontSize: '0.7rem', padding: '0.55rem 1.25rem' }}
            >
              Free Star Map
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden transition-colors flex items-center justify-center"
            style={{ color: '#dce8f0', minWidth: '44px', minHeight: '44px' }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className="fixed inset-0 z-[99] md:hidden"
        style={{
          background: 'rgba(10, 14, 26, 0.97)',
          backdropFilter: 'blur(20px)',
          opacity: isMobileMenuOpen ? 1 : 0,
          visibility: isMobileMenuOpen ? 'visible' : 'hidden',
          transition: 'opacity 0.35s ease, visibility 0.35s ease',
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-10">
          {anchorLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="font-heading text-2xl tracking-widest transition-colors"
              style={{ color: '#dce8f0' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#00d9ff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#dce8f0')}
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/offerings"
            className="font-heading text-2xl tracking-widest transition-colors"
            style={{ color: '#dce8f0' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Offerings
          </Link>
          <a
            href="https://prismatic-music-garden.kit.com/freeguide"
            className="btn-cyan mt-4"
          >
            Free Star Map
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
