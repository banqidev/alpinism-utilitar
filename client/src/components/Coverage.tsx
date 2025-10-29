import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { InteractiveMap } from './InteractiveMap';

export function Coverage() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="coverage"
      ref={sectionRef}
      className="py-20 md:py-28 bg-background"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t.coverage.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
            {t.coverage.subtitle}
          </p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            {t.coverage.description}
          </p>
        </div>

        <div
          className={`relative max-w-5xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="relative rounded-md border border-border shadow-lg bg-card p-8">
            <InteractiveMap />
            <p className="text-center text-sm text-muted-foreground mt-6">
              {t.language === 'ro' 
                ? 'Treceți cu mouse-ul peste regiuni pentru mai multe detalii' 
                : 'Наведите курсор на регионы для получения дополнительной информации'}
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="text-center p-6 bg-card rounded-md border border-border hover-elevate">
              <div className="text-3xl font-bold text-primary mb-2">România</div>
              <p className="text-muted-foreground">
                {t.language === 'ro'
                  ? 'Servicii complete în toată țara'
                  : 'Полное обслуживание по всей стране'}
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-md border border-border hover-elevate">
              <div className="text-3xl font-bold text-primary mb-2">Moldova</div>
              <p className="text-muted-foreground">
                {t.language === 'ro'
                  ? 'Acoperire completă în toate regiunile'
                  : 'Полное покрытие во всех регионах'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
