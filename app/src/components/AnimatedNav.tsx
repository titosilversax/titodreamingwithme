import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Community', href: '#community' },
  { name: 'Contact', href: '#contact' },
];

export default function AnimatedNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-ambient ${
        scrolled
          ? 'glass shadow-soft py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className={`font-display text-xl sm:text-2xl font-semibold tracking-wide transition-colors duration-500 ${
              scrolled ? 'text-charcoal' : 'text-white'
            }`}
          >
            HARMONIC HEALING
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`relative font-body text-sm tracking-wide transition-colors duration-300 group ${
                  scrolled ? 'text-charcoal' : 'text-white'
                }`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-warm-beige transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </a>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Button
              onClick={() => scrollToSection('#contact')}
              className={`transition-all duration-300 ${
                scrolled
                  ? 'bg-warm-beige text-charcoal hover:bg-warm-beige-dark'
                  : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
              }`}
            >
              Book a Session
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={scrolled ? 'text-charcoal' : 'text-white'}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link, index) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="font-display text-2xl text-charcoal hover:text-warm-beige transition-colors duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {link.name}
                  </a>
                ))}
                <Button
                  onClick={() => scrollToSection('#contact')}
                  className="mt-4 bg-warm-beige text-charcoal hover:bg-warm-beige-dark"
                >
                  Book a Session
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
