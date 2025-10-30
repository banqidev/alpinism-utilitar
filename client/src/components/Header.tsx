import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import logoUrl from '@assets/img.png';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 hover-elevate active-elevate-2 rounded-md p-2 -ml-2"
            data-testid="link-logo"
          >
            <img src={logoUrl} alt="Alpinism Utilitar Logo" className="h-12 w-12" />
            <span className="font-semibold text-lg text-foreground hidden sm:block">
              Alpinism Utilitar
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            <Button
              variant="ghost"
              onClick={() => scrollToSection('about')}
              data-testid="link-about"
            >
              {t.nav.about}
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('services')}
              data-testid="link-services"
            >
              {t.nav.services}
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('coverage')}
              data-testid="link-coverage"
            >
              {t.nav.coverage}
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('contact')}
              data-testid="link-contact"
            >
              {t.nav.contact}
            </Button>
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-muted rounded-md p-1">
              <Button
                variant={language === 'ro' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('ro')}
                className="h-8 text-xs font-medium"
                data-testid="button-lang-ro"
              >
                RO
              </Button>
              <Button
                variant={language === 'ru' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('ru')}
                className="h-8 text-xs font-medium"
                data-testid="button-lang-ru"
              >
                RU
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border bg-background/95 backdrop-blur-md">
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                onClick={() => scrollToSection('about')}
                className="justify-start"
                data-testid="link-about-mobile"
              >
                {t.nav.about}
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('services')}
                className="justify-start"
                data-testid="link-services-mobile"
              >
                {t.nav.services}
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('coverage')}
                className="justify-start"
                data-testid="link-coverage-mobile"
              >
                {t.nav.coverage}
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection('contact')}
                className="justify-start"
                data-testid="link-contact-mobile"
              >
                {t.nav.contact}
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
