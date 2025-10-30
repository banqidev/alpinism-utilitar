import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

type RegionId = 'romania' | 'moldova';

interface RegionMeta {
  id: RegionId;
  name: string;
  nameRu: string;
  cities: string[];
  citiesRu: string[];
}

const VIEWBOX = { w: 800, h: 500 };
const PADDING = 5;
const SCALE_SHRINK = 0.8;
const LEFT_PERCENT = 0.48;
const LEFT_GRAY = 'hsl(0 0% 65%)';
const LEFT_EXTRA_PX = 10;
const TOP_EXTRA_PX = 0;
const BOTTOM_EXTRA_PX = 200;

const META: Record<RegionId, RegionMeta> = {
  romania: {
    id: 'romania',
    name: 'România',
    nameRu: 'Румыния',
    cities: ['București', 'Cluj-Napoca', 'Iași'],
    citiesRu: ['Бухарест', 'Клуж-Напока', 'Яссы'],
  },
  moldova: {
    id: 'moldova',
    name: 'Moldova',
    nameRu: 'Молдова',
    cities: ['Chișinău', 'Bălți', 'Tiraspol'],
    citiesRu: ['Кишинев', 'Бельцы', 'Тирасполь'],
  },
};

type BBox = { x: number; y: number; width: number; height: number };

async function loadMainPath(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const txt = await res.text();
    const doc = new DOMParser().parseFromString(txt, 'image/svg+xml');
    const all = Array.from(doc.querySelectorAll('path')) as SVGPathElement[];
    const candidates = all.filter((p) => {
      const d = p.getAttribute('d');
      if (!d) return false;
      const op = p.getAttribute('opacity') || p.getAttribute('fill-opacity') || '1';
      const id = (p.id || '').toLowerCase();
      const cls = (p.getAttribute('class') || '').toLowerCase();
      if (op === '0' || id.includes('background') || cls.includes('background')) return false;
      return true;
    });
    if (!candidates.length) return null;
    candidates.sort((a, b) => b.getAttribute('d')!.length - a.getAttribute('d')!.length);
    return candidates[0].getAttribute('d')!;
  } catch {
    return null;
  }
}

function useCountryPaths() {
  const [ro, setRo] = useState<string | null>(null);
  const [md, setMd] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const rom = await loadMainPath('/maps/ro.svg');
      if (isMounted) setRo(rom);
      const mol = await loadMainPath('/maps/md.svg');
      if (isMounted) setMd(mol);
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return { romania: ro, moldova: md };
}

function computeTransform(box: BBox | null) {
  if (!box) return undefined;
  const targetH = (VIEWBOX.h - 2 * PADDING) * SCALE_SHRINK;
  const scale = targetH / box.height;
  const centerX = VIEWBOX.w / 2;
  const centerY = VIEWBOX.h / 2;
  const x = centerX - (box.x + box.width / 2) * scale;
  const y = centerY - (box.y + box.height / 2) * scale;
  return `translate(${x}, ${y}) scale(${scale})`;
}

type ViewMode = 'moldova' | 'romania';

export function InteractiveMap() {
  const { language } = useLanguage();
  const [mode, setMode] = useState<ViewMode>('moldova');
  const [hovered, setHovered] = useState<boolean>(false);

  const paths = useCountryPaths();
  const activePath = mode === 'romania' ? paths.romania : paths.moldova;

  const pathRef = useRef<SVGPathElement | null>(null);
  const [box, setBox] = useState<BBox | null>(null);

  useLayoutEffect(() => {
    if (!pathRef.current) return;
    try {
      const b = pathRef.current.getBBox();
      setBox({ x: b.x, y: b.y, width: b.width, height: b.height });
    } catch {
      setBox(null);
    }
  }, [activePath, mode]);

  const t = computeTransform(box);
  const leftWidth = Math.max(0, Math.min(1, LEFT_PERCENT)) * VIEWBOX.w + LEFT_EXTRA_PX;
  const clipY = -TOP_EXTRA_PX;
  const clipH = VIEWBOX.h + TOP_EXTRA_PX + BOTTOM_EXTRA_PX;

  const fillColor = hovered ? 'url(#primaryGradient)' : 'hsla(186, 68%, 32%, 0.18)';
  const strokeColor = 'hsl(186, 68%, 32%)';

  const meta = META[mode];
  const name = language === 'ro' ? meta.name : meta.nameRu;
  const cities = language === 'ro' ? meta.cities : meta.citiesRu;

  return (
      <div className="relative w-full max-w-4xl mx-auto" data-testid="interactive-map">
        <div className="mb-3 flex justify-end">
          <div className="inline-flex rounded-xl border border-primary/30 bg-card/80 backdrop-blur px-1 py-1 shadow-sm">
            {(['moldova', 'romania'] as ViewMode[]).map((m) => {
              const active = mode === m;
              const label =
                  m === 'moldova'
                      ? language === 'ro'
                          ? 'Moldova'
                          : 'Молдова'
                      : language === 'ro'
                          ? 'România'
                          : 'Румыния';
              return (
                  <button
                      key={m}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setMode(m)}
                      className={[
                        'px-3 py-1.5 text-sm rounded-lg transition-colors',
                        active ? 'bg-primary text-primary-foreground shadow' : 'text-foreground hover:bg-primary/10',
                      ].join(' ')}
                  >
                    {label}
                  </button>
              );
            })}
          </div>
        </div>

        <svg
            key={`${mode}-${activePath?.length ?? 0}`}
            viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(186, 68%, 32%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(186, 68%, 32%)" stopOpacity="0.5" />
            </linearGradient>

            <clipPath id="leftClip" clipPathUnits="userSpaceOnUse">
              <rect x="0" y={clipY} width={leftWidth} height={clipH} />
            </clipPath>
          </defs>

          {activePath && (
              <>
                <path
                    ref={pathRef}
                    d={activePath}
                    transform={t}
                    fill={fillColor}
                    stroke="none"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                />
                {mode === 'romania' && (
                    <path
                        d={activePath}
                        transform={t}
                        fill={LEFT_GRAY}
                        clipPath="url(#leftClip)"
                        stroke="none"
                        pointerEvents="none"
                    />
                )}
                <path
                    d={activePath}
                    transform={t}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={2}
                    vectorEffect="non-scaling-stroke"
                    pointerEvents="none"
                />
              </>
          )}
        </svg>

        {hovered && (
            <div
                className="absolute top-52 right-20 bg-card/95 backdrop-blur-sm border border-primary/30 rounded-md p-4 shadow-lg max-w-xs animate-fade-in"
                data-testid="map-tooltip"
            >
              <h4 className="font-semibold text-foreground mb-2">{name}</h4>
              <p className="text-sm text-muted-foreground mb-2">
                {language === 'ro' ? 'Orașe principale:' : 'Основные города:'}
              </p>
              <ul className="text-sm text-foreground space-y-1">
                {cities.map((city, idx) => (
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
