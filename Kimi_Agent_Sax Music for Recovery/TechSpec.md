# Technical Specification - Harmonic Healing Website

## Component Inventory

### shadcn/ui Components (Built-in)
| Component | Purpose | Customization |
|-----------|---------|---------------|
| Button | CTAs, form submit | Custom colors, hover animations |
| Card | Service cards, testimonials | 3D hover effects |
| Input | Contact form fields | Floating labels, focus animations |
| Textarea | Contact form message | Matching input styling |
| Navigation Menu | Main navigation | Glassmorphism on scroll |
| Sheet | Mobile menu | Slide-in animation |
| Carousel | Testimonials section | 3D perspective carousel |

### Third-Party Registry Components
None required - all effects achievable with GSAP + custom CSS.

### Custom Components
| Component | Purpose | Location |
|-----------|---------|----------|
| AnimatedNav | Navigation with scroll effects | `components/AnimatedNav.tsx` |
| HeroSection | Full hero with parallax | `sections/HeroSection.tsx` |
| ScienceSection | Educational content with animations | `sections/ScienceSection.tsx` |
| AboutSection | Story section with 3D effects | `sections/AboutSection.tsx` |
| ServicesSection | Hexagonal service cards | `sections/ServicesSection.tsx` |
| CommunitySection | Circular community hub | `sections/CommunitySection.tsx` |
| TestimonialsSection | 3D carousel | `sections/TestimonialsSection.tsx` |
| ContactSection | Split contact form | `sections/ContactSection.tsx` |
| Footer | Layered footer | `sections/Footer.tsx` |
| SoundWaveRings | Animated sound wave effect | `components/SoundWaveRings.tsx` |
| FloatingElement | Reusable floating animation | `components/FloatingElement.tsx` |
| ScrollReveal | Intersection observer wrapper | `components/ScrollReveal.tsx` |

## Animation Implementation Table

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Nav glassmorphism on scroll | CSS + React state | Scroll listener toggles class | Low |
| Hero Ken Burns zoom | CSS animation | `@keyframes` with scale/translate | Low |
| Hero quote 3D flip | GSAP | `gsap.from()` with rotateY | Medium |
| Sound wave rings | CSS animation | `@keyframes` scale + opacity | Low |
| Section parallax | GSAP ScrollTrigger | `scrub: true` with y transforms | Medium |
| Science cards 3D rise | GSAP ScrollTrigger | Staggered reveal with rotateX | Medium |
| SVG line draw-on | GSAP | `stroke-dashoffset` animation | Low |
| About image blob reveal | GSAP | `clip-path: circle()` animation | Medium |
| About text split reveal | GSAP SplitText | Character-by-character animation | High |
| Service cards 3D flip | GSAP ScrollTrigger | `rotateX` with perspective | Medium |
| Card hover 3D tilt | CSS + JS | Mouse position to rotateX/Y | Medium |
| Community orbit entrance | GSAP | Custom bezier path animation | High |
| Testimonial 3D carousel | GSAP | rotateY + translateZ positioning | High |
| Form input floating labels | CSS | `:focus` sibling selector | Low |
| Footer wave animation | CSS animation | SVG path morph or translate | Low |
| Continuous floating | CSS animation | `@keyframes` translateY | Low |
| Breathing glow | CSS animation | `@keyframes` box-shadow | Low |

## Animation Library Choices

### GSAP (Primary)
**Rationale:** Industry-standard for complex scroll animations, excellent performance, precise control

**Usage:**
- ScrollTrigger for all scroll-based animations
- Timeline for sequenced entrance animations
- SplitText for text reveal effects (or custom implementation)

**Installation:**
```bash
npm install gsap @gsap/react
```

### CSS Animations (Secondary)
**Rationale:** Best performance for simple continuous animations, no JS overhead

**Usage:**
- Floating elements
- Breathing glow effects
- Ken Burns background
- Hover transitions

### Intersection Observer (Native)
**Rationale:** Efficient scroll detection, native browser API

**Usage:**
- Triggering GSAP animations when sections enter viewport
- Lazy loading images

## Project File Structure

```
/mnt/okcomputer/output/app/
├── public/
│   ├── images/
│   │   ├── hero-bg.jpg
│   │   ├── profile.jpg
│   │   ├── community.jpg
│   │   └── contact.jpg
│   └── fonts/
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn components
│   │   ├── AnimatedNav.tsx
│   │   ├── SoundWaveRings.tsx
│   │   ├── FloatingElement.tsx
│   │   ├── ScrollReveal.tsx
│   │   └── ServiceCard.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ScienceSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── CommunitySection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── Footer.tsx
│   ├── hooks/
│   │   ├── useScrollPosition.ts
│   │   ├── useMousePosition.ts
│   │   └── useInView.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── animations.ts
│   ├── styles/
│   │   └── animations.css
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## Dependencies

### Core
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "gsap": "^3.12.5",
    "@gsap/react": "^2.1.0",
    "lucide-react": "^0.344.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  }
}
```

### Dev
```json
{
  "devDependencies": {
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.19",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3",
    "vite": "^5.1.0"
  }
}
```

## CSS Custom Properties

```css
:root {
  /* Colors */
  --primary: #d6bfa6;
  --primary-dark: #c6b1a0;
  --secondary: #2a2a2a;
  --secondary-light: #3a3a3a;
  --text-dark: #333333;
  --text-gray: #666666;
  --bg-light: #f5f5f5;
  --accent-glow: rgba(214, 191, 166, 0.3);
  
  /* Easing */
  --ease-ambient: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-breathe: cubic-bezier(0.45, 0, 0.55, 1);
  --ease-flow: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-dramatic: cubic-bezier(0.87, 0, 0.13, 1);
  --ease-elastic: cubic-bezier(0.68, -0.15, 0.265, 1.15);
  
  /* Timing */
  --duration-micro: 200ms;
  --duration-quick: 400ms;
  --duration-standard: 600ms;
  --duration-cinematic: 1000ms;
  
  /* Spacing */
  --section-padding: 100px;
  --container-max: 1280px;
}
```

## Responsive Strategy

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Animation Scaling
- **Desktop (lg+)**: Full animations, 3D effects, parallax
- **Tablet (md-lg)**: Reduced parallax, simplified 3D
- **Mobile (<md)**: Essential animations only, no 3D transforms

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Performance Targets

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1
- Animation frame rate: 60fps consistent

## Build Configuration

### Vite Config
```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap', '@gsap/react'],
        }
      }
    }
  }
})
```

### Tailwind Config Extensions
```javascript
theme: {
  extend: {
    colors: {
      primary: '#d6bfa6',
      'primary-dark': '#c6b1a0',
      secondary: '#2a2a2a',
    },
    fontFamily: {
      display: ['Cormorant Garamond', 'serif'],
      body: ['Lato', 'sans-serif'],
    },
    animation: {
      'float': 'float 6s ease-in-out infinite',
      'breathe': 'breathe 8s ease-in-out infinite',
      'ken-burns': 'kenBurns 20s ease-in-out infinite alternate',
    },
    keyframes: {
      float: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-10px)' },
      },
      breathe: {
        '0%, 100%': { opacity: '0.4' },
        '50%': { opacity: '0.8' },
      },
      kenBurns: {
        '0%': { transform: 'scale(1)' },
        '100%': { transform: 'scale(1.1)' },
      },
    },
  },
}
```
