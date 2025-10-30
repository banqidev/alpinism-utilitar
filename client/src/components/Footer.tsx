import { useLanguage } from '@/contexts/LanguageContext';
import logoUrl from '@assets/img.png';

export function Footer() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logoUrl} alt="Alpinism Utilitar" className="h-12 w-12" />
              <span className="font-semibold text-lg text-foreground">
                {t.footer.company}
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  data-testid="link-footer-about"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  data-testid="link-footer-services"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('coverage')}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  data-testid="link-footer-coverage"
                >
                  {t.nav.coverage}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  data-testid="link-footer-contact"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {t.footer.services}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{language === 'ro' ? 'Spălare geamuri' : 'Мойка окон'}</li>
              <li>{language === 'ro' ? 'Curățare fațade' : 'Очистка фасадов'}</li>
              <li>{language === 'ro' ? 'Reparații acoperișuri' : 'Ремонт крыш'}</li>
              <li>{language === 'ro' ? 'Telecomunicații' : 'Телекоммуникации'}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {t.footer.contactInfo}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Chișinău, Moldova</li>
              <li>
                <a
                  href="mailto:info.alpinism@gmail.com"
                  className="hover:text-primary transition-colors"
                  data-testid="link-footer-email"
                >
                  info.alpinism@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+37368219898"
                  className="hover:text-primary transition-colors"
                  data-testid="link-footer-phone"
                >
                  +373 68 219 898
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Alpinism Utilitar. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
