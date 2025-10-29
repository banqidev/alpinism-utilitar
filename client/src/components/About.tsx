import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Award, Shield, Users } from 'lucide-react';

export function About() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
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
            {t.about.title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div
            className={`space-y-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <p className="text-lg text-foreground leading-relaxed">
              {t.about.mission}
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              {t.about.team}
            </p>
            <p className="text-lg text-primary font-medium">
              {t.about.commitment}
            </p>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-md">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {t.about.experience}
                  </h3>
                  <p className="text-muted-foreground">
                    {t.about.experienceDesc}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div
          className={`grid md:grid-cols-3 gap-8 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Card className="p-6 text-center hover-elevate">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-md mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Siguranță</h3>
            <p className="text-muted-foreground">
              Respectarea celor mai înalte standarde de siguranță
            </p>
          </Card>

          <Card className="p-6 text-center hover-elevate">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-md mb-4">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Calitate</h3>
            <p className="text-muted-foreground">
              Servicii de înaltă calitate și conformitate
            </p>
          </Card>

          <Card className="p-6 text-center hover-elevate">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-md mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Experiență</h3>
            <p className="text-muted-foreground">
              Echipă cu expertiză solidă și competență
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
