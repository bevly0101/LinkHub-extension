---
name: Luminous Ether
colors:
  surface: '#10131a'
  surface-dim: '#10131a'
  surface-bright: '#363940'
  surface-container-lowest: '#0b0e14'
  surface-container-low: '#191c22'
  surface-container: '#1d2026'
  surface-container-high: '#272a31'
  surface-container-highest: '#32353c'
  on-surface: '#e1e2eb'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e1e2eb'
  inverse-on-surface: '#2e3037'
  outline: '#849495'
  outline-variant: '#3a494b'
  surface-tint: '#00dbe7'
  primary: '#e1fdff'
  on-primary: '#00363a'
  primary-container: '#00f2ff'
  on-primary-container: '#006a71'
  inverse-primary: '#00696f'
  secondary: '#d1bcff'
  on-secondary: '#3c0090'
  secondary-container: '#7000ff'
  on-secondary-container: '#ddcdff'
  tertiary: '#fff5f8'
  on-tertiary: '#5f004e'
  tertiary-container: '#ffcdea'
  on-tertiary-container: '#b20095'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#74f5ff'
  primary-fixed-dim: '#00dbe7'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d1bcff'
  on-secondary-fixed: '#23005b'
  on-secondary-fixed-variant: '#5700c9'
  tertiary-fixed: '#ffd8ee'
  tertiary-fixed-dim: '#ffade2'
  on-tertiary-fixed: '#3b002f'
  on-tertiary-fixed-variant: '#86006f'
  background: '#10131a'
  on-background: '#e1e2eb'
  surface-variant: '#32353c'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 72px
    fontWeight: '800'
    lineHeight: 80px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style
The design system is built on the concept of "Luminous Ether," capturing the fluid, high-energy movement of the Aurora Borealis. It targets a forward-thinking audience in the creative, tech, or entertainment sectors who value immersion and emotional resonance. 

The aesthetic is a refined evolution of Glassmorphism, characterized by:
- **Ethereal Flow:** Backgrounds are never static; they utilize soft, multi-stop radial gradients that mimic shifting atmospheric lights.
- **Vibrant Glass:** UI surfaces act as semi-transparent crystalline layers that catch and refract the underlying light.
- **Dynamic Energy:** Subtle motion and high-contrast accents create a sense of life and constant evolution.
- **Minimalist Structure:** To balance the visual density of gradients, the functional layout remains strictly organized with generous whitespace and precise typography.

## Colors
This design system utilizes a "Deep Space" foundation to allow vibrant light phenomena to pop.

- **Primary (Electric Teal):** Used for critical actions, active states, and focus indicators. It represents the core energy of the aurora.
- **Secondary (Deep Violet):** The structural base for gradients and surfaces, providing depth and a sense of the night sky.
- **Tertiary (Neon Pink):** An accent color used sparingly for notifications, highlights, or "hot" interactive elements.
- **Neutral:** A range of ultra-dark navies and blacks (#05070A to #1A1D23) used for background layers and deep-level containers.

**Gradient Logic:** Backgrounds should use a mix of `primary` and `secondary` with low-opacity `tertiary` blooms. All glass surfaces must use a 10-15% white tint with a high-saturation background blur (32px+).

## Typography
The typography strategy balances high-tech precision with geometric friendliness.

- **Headlines (Sora):** Set in heavy weights with tight letter-spacing. Use "Display" sizes for landing moments, often styled with a subtle linear gradient from White to Primary.
- **Body (Hanken Grotesk):** Chosen for its exceptional clarity against dark, complex backgrounds. Maintain high line-height to ensure legibility over blurred textures.
- **Labels & Data (JetBrains Mono):** Provides a "technical" undercurrent. Use All-Caps for small labels to create a professional, instrumentation-like feel.

## Layout & Spacing
The layout follows a fluid, organic philosophy held together by a rigid 12-column grid.

- **Desktop:** 12-column grid, 24px gutters, 64px side margins. Large "hero" sections should bleed edge-to-edge to maximize the gradient impact.
- **Tablet:** 8-column grid, 20px gutters, 40px side margins.
- **Mobile:** 4-column grid, 16px gutters, 20px side margins.

Spacing should favor `lg` and `xl` values to prevent the UI from feeling cluttered. Elements should feel as though they are floating in an expansive void. Use "Safe Zones" around interactive components to ensure the background blurs don't interfere with touch targets.

## Elevation & Depth
Depth is created through "Optical Refraction" rather than traditional shadows.

1.  **Level 0 (Base):** Deep neutral background with animated radial mesh gradients.
2.  **Level 1 (Surface):** Glassmorphic panels with `backdrop-filter: blur(40px)`, 10% white opacity, and a 1px inner stroke (White, 15% opacity) to define the edge.
3.  **Level 2 (Active/Floating):** Higher transparency, 60px blur, and a subtle external glow using the Primary or Secondary color (15% spread, 20% opacity).
4.  **Level 3 (Popovers/Modals):** Darkest glass (25% opacity) to ensure focus, with a distinct 2px Primary color border-top to indicate hierarchy.

Avoid black shadows; use colored "ambient glows" to simulate light emitting from the glass panels.

## Shapes
The shape language is "Rounded-Geometric."

- **Containers:** Use `rounded-lg` (1rem) for most glass panels to keep the look modern and approachable.
- **Interactive Elements:** Buttons and inputs use `rounded-xl` (1.5rem) or full pills to contrast against the more structural containers.
- **Decorative Elements:** Use perfectly circular "light orbs" in the background with massive blurs (150px+) to create the aurora effect.
- **Strokes:** Use ultra-thin (1px) borders for all glass containers to maintain a sharp, high-end tech feel.

## Components
- **Buttons:** Primary buttons are solid Electric Teal with a slight outer glow. Secondary buttons use the glass style with a white 1px border. On hover, buttons should "brighten" (increase exposure).
- **Input Fields:** Semi-transparent dark fills (5% white). On focus, the bottom border glows with a Primary-to-Secondary gradient.
- **Chips:** Pill-shaped, using high-contrast colors (Tertiary) for status or "High Energy" labels.
- **Cards:** Glassmorphic with a subtle vertical gradient (White 10% to White 2%). Text inside cards should use `Body-md` for descriptions and `Label-sm` for metadata.
- **Lists:** Separated by low-opacity white lines (5%). Hovering over a list item triggers a soft violet "bloom" behind the text.
- **Visualizers:** This system encourages the use of "Glow Lines"—1px lines that use a gradient stroke to guide the eye between sections.