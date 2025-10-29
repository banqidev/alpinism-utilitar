# Design Guidelines: Industrial Climbing Services Landing Page

## Design Approach

**Selected Approach:** Reference-Based Design drawing from 4tech.pro's smooth scroll mechanics and telecom industry aesthetic, combined with industrial/construction sector visual patterns.

**Core Principles:**
- Professional trust and safety emphasis through clean, structured layouts
- Smooth, fluid scroll interactions that create engagement without distraction
- Bilingual accessibility integrated seamlessly into the experience
- Service credibility through visual hierarchy and clear information architecture

## Typography System

**Font Stack:**
- Primary: Inter or Manrope (via Google Fonts CDN) - clean, professional sans-serif
- Headings: 600-700 weight
- Body: 400-500 weight
- Accent text: 500 weight

**Type Scale:**
- Hero headline: text-5xl md:text-6xl lg:text-7xl
- Section headlines: text-3xl md:text-4xl lg:text-5xl
- Subsection titles: text-xl md:text-2xl
- Body text: text-base md:text-lg
- Small text: text-sm

## Layout System

**Spacing Primitives:** Consistent use of Tailwind units: 2, 4, 6, 8, 12, 16, 20, 24 for padding/margins

**Container Strategy:**
- Full-width sections with inner max-w-7xl containers
- Content sections: px-6 md:px-12 lg:px-16
- Vertical rhythm: py-16 md:py-20 lg:py-28 for major sections
- Subsections: py-8 md:py-12

**Grid System:**
- Services grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 with gap-8
- Feature highlights: 2-column split for about section
- Contact section: grid-cols-1 lg:grid-cols-2

## Scroll Animation System

**Implementation Approach:**
Recreate 4tech.pro's scroll behavior using Intersection Observer API with these specific effects:

**Scroll Behaviors:**
- Smooth scroll navigation: `scroll-behavior: smooth` on html element
- Section reveal animations: Fade-in from bottom (translateY(20px) to translateY(0)) with 0.6s ease-out
- Stagger delays: 100ms between grouped elements (service cards, feature items)
- Parallax effect on hero: Subtle background movement at 0.5x scroll speed
- Nav bar transformation: Transparent to solid background on scroll with backdrop blur

**Trigger Points:**
- Elements animate when 20% visible in viewport
- Header background activates after 100px scroll
- Map section triggers when 30% visible for dramatic reveal

## Language Switcher

**Placement:** Top-right corner of header, persistent across all scroll positions

**Design:**
- Compact toggle: "RO | RU" with active language highlighted
- Smooth fade transitions between language content (300ms)
- Store preference in localStorage
- Flag icons optional but text labels mandatory for clarity

## Component Library

### Header/Navigation
- Fixed position with blur backdrop when scrolled
- Logo on left (maintain logo aspect ratio, max-h-12)
- Navigation links center-aligned on desktop, hamburger on mobile
- Language switcher top-right
- CTA button "Contact" with primary styling

### Hero Section
**Layout:** Full viewport height (min-h-screen) with centered content

**Image Strategy:**
- Large hero image: Industrial climbing action shot showing team at height
- Image treatment: Subtle overlay (dark gradient from bottom) for text readability
- Position: Background cover with center focal point
- Buttons on hero: Use backdrop-blur-md with semi-transparent background

**Content:**
- Headline emphasizing 11 years experience
- Subheadline about safety and quality
- Two CTAs: "Serviciile Noastre" (primary) and "Contactează-ne" (secondary with blur background)

### About Section
**Layout:** Two-column on desktop (60/40 split), stack on mobile

**Content Structure:**
- Left column: Mission statement and company values
- Right column: Key statistics or credentials in card format
- Supporting image: Team working safely at height

### Services Showcase
**Grid Layout:** 3-column cards on desktop, 2 on tablet, 1 on mobile

**Card Design:**
- Icon at top (from Heroicons - use outline style)
- Service title (text-xl font-semibold)
- Brief description (2-3 lines)
- Hover effect: Subtle lift (translateY(-4px)) and shadow enhancement
- Consistent card height with flex layout

**Services to Display:**
1. Spălare geamuri la înălțime (Window cleaning)
2. Curățare fațade (Facade cleaning)
3. Reparații acoperișuri (Roof repairs)
4. Montaj telecomunicații (Telecom installation)
5. Toaletare arbori (Tree maintenance)
6. Montaj publicitar (Advertising installation)
7. Vopsitorii industriale (Industrial painting)
8. Întreținere preventivă (Preventive maintenance)
9. Inspecție tehnică (Technical inspection)

### Coverage Map Section
**Layout:** Full-width section with centered map container

**Map Component:**
- SVG-based map of Romania and Moldova with highlighted regions
- Interactive hover states showing city names
- Animated path strokes drawing on scroll reveal
- Legend showing service area coverage
- Moldova and Romania clearly demarcated with service regions shaded

### Contact Section
**Layout:** Split layout - form left, information right

**Form Elements:**
- Name, Email, Phone, Message fields
- Submit button with loading state
- Success message area
- All inputs with consistent styling and focus states

**Contact Information Block:**
- Address with map pin icon
- Email with envelope icon
- Phone with phone icon
- Working hours
- Embedded small map or illustration

### Footer
- Multi-column layout: Company info, Quick links, Services summary, Contact
- Social media links (if applicable)
- Copyright and credentials
- Newsletter signup area
- Trust badges: Years of experience, certifications

## Images Strategy

**Required Images:**
1. **Hero Background:** Dynamic shot of industrial climber on building facade - conveys expertise and action (full-width, high-quality)
2. **About Section:** Team photo showing safety equipment and professionalism (medium-sized, positioned right side)
3. **Services Background:** Subtle texture or pattern related to construction/industrial work (optional background treatment)
4. **Coverage Map:** Custom SVG graphic of Romania/Moldova geography
5. **Contact Section:** Office/team workspace or equipment photo (smaller, contextual)

**Image Treatment:**
- All photos: High contrast, professional grade
- Overlays where needed for text legibility
- Lazy loading for performance
- Responsive srcset for different viewports

## Visual Hierarchy Principles

**Emphasis Flow:**
1. Hero message and CTA (immediate attention)
2. Service offerings (primary value)
3. Coverage area (trust building)
4. Company credibility (supporting trust)
5. Contact pathway (conversion)

**Contrast Strategy:**
- Alternating section backgrounds (light/subtle variations)
- Strategic use of cards and elevation for information grouping
- Strong typography hierarchy guiding eye flow

## Interaction Patterns

**Micro-interactions:**
- Button hover: Slight scale (1.02) and shadow enhancement
- Card hover: Elevation increase and subtle upward movement
- Link hover: Underline animation sliding from left
- Form focus: Border emphasis and subtle glow

**Navigation:**
- Smooth scroll to sections on nav click
- Active section highlighting in navigation
- Breadcrumb trail for user orientation

This design creates a professional, trustworthy presence for industrial climbing services while incorporating smooth, engaging scroll interactions that enhance rather than distract from the core message of safety, expertise, and reliability.