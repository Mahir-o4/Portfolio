# Scroll Animation Guide

## Overview
Your portfolio already has a scroll animation system! Components animate into view as users scroll down the page using Intersection Observer.

## How It Works

### 1. The Hook: `useScrollAnimation`
Located in `hooks/useScrollAnimation.ts`, this hook:
- Watches when a component enters the viewport
- Triggers once (component stays visible after animating in)
- Returns `ref` (attach to element) and `isVisible` (boolean state)

### 2. Available Animation Classes

#### Fade Animations
- **`.fade-in`** - Simple fade in
- **`.fade-in-up`** - Fade in while sliding up 20px

#### Slide Animations
- **`.slide-in-left`** - Slide in from left side
- **`.slide-in-right`** - Slide in from right side
- **`.slide-in-up`** - Slide up 30px with fade

#### Pop/Scale Animations
- **`.pop-in`** - Bouncy scale-up effect (playful)
- **`.scale-in`** - Smooth scale-up effect (subtle)
- **`.scroll-element`** - Default fade-up animation

## Usage Examples

### Basic Pattern (Used in HeroSection)
```tsx
'use client';
import { useEffect, useState } from 'react';

export default function MyComponent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);  // Triggers on mount
  }, []);

  return (
    <div className={`${isVisible ? 'slide-in-left' : 'opacity-0'}`}>
      Content here
    </div>
  );
}
```

### With Scroll Detection (Recommended)
```tsx
'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function MyComponent() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className={`${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
      Content animates when scrolled into view
    </div>
  );
}
```

### Multiple Elements with Staggered Delay
```tsx
'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function MyComponent() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref}>
      {/* First element - no delay */}
      <div className={`${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
        <h2>Title</h2>
      </div>

      {/* Second element - 200ms delay */}
      <div 
        className={`${isVisible ? 'slide-in-left' : 'opacity-0'}`}
        style={{ animationDelay: '0.2s' }}
      >
        <p>Content</p>
      </div>

      {/* Third element - 400ms delay */}
      <div 
        className={`${isVisible ? 'pop-in' : 'opacity-0'}`}
        style={{ animationDelay: '0.4s' }}
      >
        <button>Call to Action</button>
      </div>
    </section>
  );
}
```

### Grid of Cards (Each Animates Separately)
```tsx
'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function CardsGrid() {
  const { ref, isVisible } = useScrollAnimation();

  const cards = [1, 2, 3, 4, 5, 6];

  return (
    <section ref={ref} className="grid grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <div
          key={card}
          className={`${isVisible ? 'pop-in' : 'opacity-0'}`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          Card {card}
        </div>
      ))}
    </section>
  );
}
```

## Animation Recommendations

| Element Type | Recommended Animation | Why |
|--------------|----------------------|-----|
| Section Headers | `fade-in-up` | Professional, draws attention |
| Text Content | `slide-in-left` | Natural reading flow |
| Images/Side Content | `slide-in-right` | Balances layout |
| Cards/Buttons | `pop-in` | Playful, interactive feel |
| Subtle Elements | `scale-in` | Gentle, doesn't distract |
| List Items | `fade-in-up` with stagger | Creates cascade effect |

## Customizing the Hook

### Adjust Trigger Point
Edit `hooks/useScrollAnimation.ts`:

```typescript
{
  threshold: 0.1,  // Trigger when 10% visible (0-1)
  rootMargin: '0px 0px -50px 0px',  // Offset trigger point
}
```

- **threshold**: 0.1 = 10%, 0.5 = 50%, 1.0 = 100%
- **rootMargin**: Negative bottom value delays trigger until element is higher

### Allow Multiple Triggers
Remove this line to re-animate on scroll:
```typescript
observer.unobserve(entry.target);  // Delete to allow re-trigger
```

## Real-World Examples from Your Codebase

### AboutSection Pattern
```tsx
<div className={`${isVisible ? 'slide-in-left' : 'opacity-0'}`} 
     style={{ animationDelay: '0.2s' }}>
  {/* Content */}
</div>
```

### ProjectsSection Pattern
```tsx
{projects.map((project, index) => (
  <ProjectCard
    key={project.id}
    className={`${isVisible ? 'scroll-element' : 'opacity-0'}`}
    style={{ animationDelay: `${index * 0.1}s` }}
  />
))}
```

## Tips

1. **Always start with `opacity-0`** - Prevents flicker before animation
2. **Use delays for hierarchy** - Important content first, details later
3. **Don't overdo it** - Too much animation is distracting
4. **Match animation to content** - Formal content = subtle, playful content = bouncy
5. **Test on slower devices** - Animations should enhance, not hinder

## Quick Copy-Paste Templates

### Basic Component
```tsx
'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function MyComponent() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref}>
      <div className={`${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
        {/* Your content */}
      </div>
    </section>
  );
}
```

### Staggered List
```tsx
const { ref, isVisible } = useScrollAnimation();
const items = ['Item 1', 'Item 2', 'Item 3'];

<div ref={ref}>
  {items.map((item, i) => (
    <div
      key={i}
      className={`${isVisible ? 'slide-in-up' : 'opacity-0'}`}
      style={{ animationDelay: `${i * 0.15}s` }}
    >
      {item}
    </div>
  ))}
</div>
```
