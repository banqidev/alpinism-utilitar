import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Region {
  id: string;
  name: string;
  nameRu: string;
  path: string;
  cities: string[];
  citiesRu: string[];
}

const regions: Region[] = [
  {
    id: 'moldova',
    name: 'Moldova',
    nameRu: 'Молдова',
    path: 'M 580 180 L 600 160 L 640 160 L 660 180 L 680 200 L 700 240 L 700 280 L 680 320 L 660 340 L 640 350 L 620 360 L 600 360 L 580 340 L 560 300 L 560 260 L 560 220 Z',
    cities: ['Chișinău', 'Bălți', 'Tiraspol'],
    citiesRu: ['Кишинев', 'Бельцы', 'Тирасполь']
  },
  {
    id: 'romania-north',
    name: 'România Nord',
    nameRu: 'Северная Румыния',
    path: 'M 280 140 L 360 120 L 420 140 L 460 160 L 500 180 L 540 180 L 560 200 L 560 240 L 540 260 L 500 260 L 460 240 L 420 220 L 380 200 L 340 180 L 300 160 Z',
    cities: ['Cluj-Napoca', 'Iași', 'Suceava'],
    citiesRu: ['Клуж-Напока', 'Яссы', 'Сучава']
  },
  {
    id: 'romania-center',
    name: 'România Centru',
    nameRu: 'Центральная Румыния',
    path: 'M 260 180 L 340 180 L 380 200 L 420 220 L 460 240 L 500 260 L 540 260 L 540 300 L 500 320 L 460 320 L 420 300 L 380 280 L 340 260 L 300 240 L 260 220 Z',
    cities: ['Brașov', 'Sibiu', 'Târgu Mureș'],
    citiesRu: ['Брашов', 'Сибиу', 'Тыргу-Муреш']
  },
  {
    id: 'romania-south',
    name: 'România Sud',
    nameRu: 'Южная Румыния',
    path: 'M 260 240 L 300 240 L 340 260 L 380 280 L 420 300 L 460 320 L 500 320 L 540 340 L 540 380 L 500 400 L 460 400 L 420 380 L 380 360 L 340 340 L 300 320 L 260 300 Z',
    cities: ['București', 'Craiova', 'Ploiești'],
    citiesRu: ['Бухарест', 'Крайова', 'Плоешти']
  },
  {
    id: 'romania-west',
    name: 'România Vest',
    nameRu: 'Западная Румыния',
    path: 'M 120 200 L 180 180 L 220 180 L 260 200 L 260 240 L 260 280 L 220 300 L 180 300 L 140 280 L 120 260 L 100 220 Z',
    cities: ['Timișoara', 'Arad', 'Oradea'],
    citiesRu: ['Тимишоара', 'Арад', 'Орадя']
  }
];

export function InteractiveMap() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const { language } = useLanguage();

  const getRegionData = (region: Region) => ({
    name: language === 'ro' ? region.name : region.nameRu,
    cities: language === 'ro' ? region.cities : region.citiesRu
  });

  return (
    <div className="relative w-full max-w-4xl mx-auto" data-testid="interactive-map">
      <svg
        viewBox="0 0 800 500"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(186, 68%, 32%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(186, 68%, 32%)" stopOpacity="0.5" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {regions.map((region) => (
          <g key={region.id}>
            <path
              d={region.path}
              fill={hoveredRegion === region.id ? 'url(#primaryGradient)' : 'hsla(186, 68%, 32%, 0.2)'}
              stroke="hsl(186, 68%, 32%)"
              strokeWidth={hoveredRegion === region.id ? '3' : '2'}
              className="transition-all duration-300 cursor-pointer"
              style={{
                filter: hoveredRegion === region.id ? 'url(#glow)' : 'none'
              }}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              data-testid={`map-region-${region.id}`}
            />
            
            {hoveredRegion === region.id && (
              <text
                x={region.id === 'moldova' ? 620 : region.id === 'romania-west' ? 160 : region.id === 'romania-south' ? 380 : 380}
                y={region.id === 'moldova' ? 260 : region.id === 'romania-north' ? 180 : region.id === 'romania-center' ? 240 : region.id === 'romania-south' ? 340 : 240}
                textAnchor="middle"
                fill="hsl(186, 68%, 32%)"
                fontSize="14"
                fontWeight="600"
                className="pointer-events-none animate-fade-in"
              >
                {getRegionData(region).name}
              </text>
            )}
          </g>
        ))}

        <circle cx="380" cy="340" r="5" fill="hsl(0, 72%, 35%)" stroke="white" strokeWidth="2" data-testid="marker-bucuresti" />
        <text x="380" y="365" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" fontWeight="500">
          {language === 'ro' ? 'București' : 'Бухарест'}
        </text>
        
        <circle cx="620" cy="260" r="5" fill="hsl(0, 72%, 35%)" stroke="white" strokeWidth="2" data-testid="marker-chisinau" />
        <text x="620" y="285" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" fontWeight="500">
          {language === 'ro' ? 'Chișinău' : 'Кишинев'}
        </text>
      </svg>

      {hoveredRegion && (
        <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm border border-primary/30 rounded-md p-4 shadow-lg max-w-xs animate-fade-in" data-testid="map-tooltip">
          <h4 className="font-semibold text-foreground mb-2">
            {getRegionData(regions.find(r => r.id === hoveredRegion)!).name}
          </h4>
          <p className="text-sm text-muted-foreground mb-2">
            {language === 'ro' ? 'Orașe principale:' : 'Основные города:'}
          </p>
          <ul className="text-sm text-foreground space-y-1">
            {getRegionData(regions.find(r => r.id === hoveredRegion)!).cities.map((city, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                {city}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
