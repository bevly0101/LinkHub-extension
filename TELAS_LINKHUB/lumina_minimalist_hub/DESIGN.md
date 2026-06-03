---
name: Lumina Minimalist Hub
colors:
  surface: '#f8f9ff'
  surface-dim: '#d0dbed'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dee9fc'
  surface-container-highest: '#d9e3f6'
  on-surface: '#121c2a'
  on-surface-variant: '#424754'
  inverse-surface: '#27313f'
  inverse-on-surface: '#eaf1ff'
  outline: '#727785'
  outline-variant: '#c2c6d6'
  surface-tint: '#005ac2'
  primary: '#0058be'
  on-primary: '#ffffff'
  primary-container: '#2170e4'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#924700'
  on-tertiary: '#ffffff'
  tertiary-container: '#b75b00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#f8f9ff'
  on-background: '#121c2a'
  surface-variant: '#d9e3f6'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

The design system is centered on extreme clarity, reduction, and intentionality. It is designed for users who seek a distraction-free start to their web browsing experience, prioritizing cognitive ease and rapid information retrieval. 

The aesthetic blends **Minimalism** with subtle **Glassmorphism**. It utilizes expansive whitespace (breathability) to elevate content, while leveraging soft translucency for interactive layers to maintain a sense of environmental depth. The emotional goal is to evoke a sense of calm, order, and digital cleanliness. The interface should feel "light" as if elements are floating on a clean, physical surface.

## Colors

The palette is anchored by a high-contrast charcoal-on-off-white foundation to ensure maximum legibility. 

- **Primary:** A soft electric blue used sparingly for focus states, primary actions, and active indicators.
- **Neutral:** A range of slate and charcoal grays define the hierarchy of text and iconography.
- **Surface:** Backgrounds utilize an off-white tint to reduce eye strain compared to pure white. 
- **Dark Mode:** When active, the system shifts to a "Dark Graphite" theme, swapping the background to a deep navy-black while maintaining the electric blue accent for continuity. Glass elements should increase in saturation to maintain visibility against darker backgrounds.

## Typography

This design system uses **Inter** exclusively to achieve a systematic, utilitarian, and modern feel. 

Typography is used to create hierarchy through weight and scale rather than color. Large display headers should use tighter letter spacing to feel more cohesive. Body text is optimized for readability with generous line heights. Labels and small captions utilize a slightly heavier weight (Medium/SemiBold) to ensure they remain legible even at reduced sizes or within tight UI components like chips and tags.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for the central shortcut hub to ensure the core utility remains predictable and centered, while the background remains fluid.

- **Grid:** A 12-column grid is used for desktop layouts, transitioning to a simple 2-column or 1-column stack on mobile.
- **Rhythm:** An 8px linear scale governs all padding and margins. 
- **Shortcuts:** Shortcut icons are arranged in a centered flexible grid (Auto-fit) with a minimum gap of 32px to maintain the "high whitespace" aesthetic.
- **Margins:** Desktop views should feature generous side margins (48px+) to prevent the UI from feeling cramped on ultra-wide displays.

## Elevation & Depth

Depth is communicated through **Glassmorphism** and **Ambient Shadows**.

1.  **Level 0 (Base):** The off-white background (#F9FAFB).
2.  **Level 1 (Cards/Shortcuts):** Flat with no shadow, appearing as if etched into the background. On hover, they gain a very soft, high-blur shadow.
3.  **Level 2 (Overlays/Modals):** These use a backdrop-filter (blur: 12px) and a semi-transparent white fill (70% opacity). They are paired with a diffuse shadow: `0px 10px 30px rgba(0, 0, 0, 0.04)`.
4.  **Level 3 (Tooltips/Popovers):** Sharp, high-contrast borders (1px solid #E5E7EB) with a smaller, more focused shadow to indicate immediate proximity to the cursor.

## Shapes

The design system employs a **Squircle**-inspired aesthetic. While standard CSS `border-radius` is used, the values are tuned to provide a soft, organic feel that avoids the harshness of sharp corners or the "toy-like" feel of full pills.

- **Icons & Shortcuts:** Use `rounded-lg` (1rem / 16px) to create the signature squircle look.
- **Buttons:** Use `rounded-md` (0.5rem / 8px) for a more precise, functional appearance.
- **Modals:** Use `rounded-xl` (1.5rem / 24px) to emphasize their role as distinct, floating containers.

## Components

### Buttons
Primary buttons use the electric blue background with white text. They should have no shadow in their default state, gaining a subtle lift on hover. "Ghost" buttons (outline only) are preferred for secondary actions like "Edit Grid" or "Settings."

### Shortcut Icons
The core of the hub. Each icon is a 64x64px squircle. Backgrounds should be minimal—either a subtle light gray or a low-opacity version of the brand's primary color. Labels are placed 8px below the icon using `label-md`.

### Input Fields (Search)
The search bar is the focal point. It should be large, with a `body-lg` font size, a 1px soft gray border, and 16px of horizontal padding. On focus, the border transitions to the primary electric blue with a subtle glow (0px 0px 0px 4px rgba(59, 130, 246, 0.1)).

### Modals & Overlays
Modals must utilize `backdrop-filter: blur(12px)`. The transition should be a soft fade-in with a slight scale-up (0.95 to 1.0). Use a 1px border of `white` at 20% opacity to create a "glass edge" effect.

### Chips/Tags
Used for categorizing shortcuts. These are small, using `label-sm` typography, with a light gray background and `rounded-xl` (pill) shape to distinguish them from the squircle shortcuts.