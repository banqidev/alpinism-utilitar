import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Mail, Phone } from 'lucide-react';
import contactImage from '@assets/img_2.png';

export function Contact() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setIsVisible(true);
        },
        { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
      <section id="contact" ref={sectionRef} className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div
              className={`text-center mb-16 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t.contact.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Imaginea în loc de formular */}
            <div
                className={`transition-all duration-700 delay-100 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
            >
              <div className="overflow-hidden rounded-xl shadow-lg">
                <img
                    src={contactImage}
                    alt="Contact"
                    className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Informațiile de contact */}
            <div
                className={`space-y-6 transition-all duration-700 delay-200 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
            >
              <Card className="p-6 hover-elevate">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-md">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {t.contact.location}
                    </h3>
                    <p className="text-muted-foreground" data-testid="text-address">
                      Bulevardul Decebal 99E<br />
                      Chișinău, MD-2038<br />
                      Moldova
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-elevate">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-md">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {t.contact.email}
                    </h3>
                    <a
                        href="mailto:info.alpinism@gmail.com"
                        className="text-primary hover:underline"
                        data-testid="link-email"
                    >
                      info.alpinism@gmail.com
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-elevate">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-md">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {t.contact.phone}
                    </h3>
                    <a
                        href="tel:+37368219898"
                        className="text-primary hover:underline text-lg"
                        data-testid="link-phone"
                    >
                      +373 68 219 898
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
  );
}
