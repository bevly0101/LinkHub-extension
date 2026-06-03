---
name: Obsidian Glass
colors:
  surface: '#111125'
  surface-dim: '#111125'
  surface-bright: '#37374d'
  surface-container-lowest: '#0c0c1f'
  surface-container-low: '#1a1a2e'
  surface-container: '#1e1e32'
  surface-container-high: '#28283d'
  surface-container-highest: '#333348'
  on-surface: '#e2e0fc'
  on-surface-variant: '#cdc2d7'
  inverse-surface: '#e2e0fc'
  inverse-on-surface: '#2f2e43'
  outline: '#968da0'
  outline-variant: '#4b4454'
  surface-tint: '#d6baff'
  primary: '#d6baff'
  on-primary: '#430089'
  primary-container: '#aa73ff'
  on-primary-container: '#3a0079'
  inverse-primary: '#7931d9'
  secondary: '#c7c5d5'
  on-secondary: '#302f3b'
  secondary-container: '#484855'
  on-secondary-container: '#b9b7c6'
  tertiary: '#ffb961'
  on-tertiary: '#472a00'
  tertiary-container: '#c88118'
  on-tertiary-container: '#3e2400'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ecdcff'
  primary-fixed-dim: '#d6baff'
  on-primary-fixed: '#280057'
  on-primary-fixed-variant: '#6000bf'
  secondary-fixed: '#e3e0f1'
  secondary-fixed-dim: '#c7c5d5'
  on-secondary-fixed: '#1b1a26'
  on-secondary-fixed-variant: '#464552'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb961'
  on-tertiary-fixed: '#2b1700'
  on-tertiary-fixed-variant: '#663e00'
  background: '#111125'
  on-background: '#e2e0fc'
  surface-variant: '#333348'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
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
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
  container-padding: 20px
---

## Brand & Style

This design system blends **Glassmorphism** with a **High-Contrast Dark** aesthetic. It is tailored for high-stakes environments like cybersecurity, fintech, and data monitoring where focus and hierarchy are paramount. 

The visual narrative is "Obsidian Depth": a dark, immersive canvas where information floats on semi-transparent planes. The emotional response is one of sophisticated control, precision, and futuristic intelligence. Elements utilize background blurs, subtle inner glows, and vibrant neon accents to guide the eye toward critical data points without overwhelming the user's cognitive load.

## Colors

The palette is anchored by a deep **Obsidian** base, providing a high-contrast foundation for vibrant, functional accents.

- **Background:** A layered approach starting from a near-black obsidian (`#0F0F1A`) for the base, moving to a deep indigo-tinted surface (`#1A1A2E`) for containers.
- **Primary Accent:** A luminous electric violet used for active states, primary actions, and brand identification.
- **Semantic Accents:** 
  - **Critical:** A hot neon red for immediate threats.
  - **High:** A vivid orange for significant warnings.
  - **Medium:** A bright emerald for stable/positive metrics.
  - **Low:** A serene sky blue for informational/low-priority data.
- **Glass Effects:** Surfaces use white at 5-10% opacity with a 20px-40px background blur to create depth and separation.

## Typography

The typography system prioritizes legibility in low-light environments. 

- **Hanken Grotesk** is used for headlines to provide a sharp, contemporary feel that matches the technical nature of the UI.
- **Inter** provides a highly readable, neutral foundation for all body copy and descriptions.
- **Geist** is reserved for labels, data points, and technical metadata, utilizing its monospaced-influenced clarity to distinguish functional values from narrative text.
- Large displays should utilize tighter letter spacing to maintain a "locked-in" technical look.

## Layout & Spacing

This design system employs a **Fixed Grid** strategy for dashboard environments, ensuring data visualizations remain consistent and proportional.

- **Grid:** A 12-column grid on desktop with 24px gutters. Elements typically span 3, 4, 6, or 12 columns.
- **Rhythm:** An 8px linear scale is the standard, though a 4px "half-step" is permitted for tight technical components like data tables or nested status chips.
- **Mobile Adaptation:** On mobile, the grid collapses to a single column with 16px margins. Complex data visualizations (like heatmaps) should use horizontal overflow scrolls or simplified sparkline alternatives.

## Elevation & Depth

Depth is not communicated through traditional drop shadows, but through **Tonal Stacking** and **Backdrop Blurs**.

1.  **Level 0 (Base):** Obsidian background (`#0F0F1A`).
2.  **Level 1 (Cards/Panels):** Semi-transparent surface (White at 5% opacity) with a `40px` backdrop blur and a `1px` subtle inner stroke (White at 10%) to define the edge.
3.  **Level 2 (Modals/Popovers):** Higher opacity surface (White at 12%) with a `60px` backdrop blur and a soft, wide outer glow in the primary color at very low (5%) opacity.

The "Liquid Glass" effect is achieved by ensuring that background gradients or floating glow-blobs are visible through the blurred surfaces, creating a sense of physical transparency and fluid movement.

## Shapes

The shape language is modern and approachable but maintains a structured edge. 

- **Standard Containers:** Use a `0.5rem` (8px) radius for buttons and small inputs.
- **Large Cards:** Use `1rem` (16px) for main dashboard panels to create a softer, more premium aesthetic.
- **Status Indicators:** Use pill-shaped (fully rounded) geometry for badges and tags to distinguish them from interactive buttons.
- **Stroke Width:** Maintain a consistent `1px` or `1.5px` stroke for all borders to ensure they look sharp on high-density displays.

## Components

### Buttons
Primary buttons use a solid gradient of the Primary color to White-tinted-Primary. Secondary buttons use the "Liquid Glass" style: semi-transparent background with a visible `1px` border.

### Status Chips
Chips must use the semantic accent colors for their icons and text, set against a low-opacity (15%) background of the same color. For example, a "Critical" chip uses red text/icon on a faint red tinted background.

### Input Fields
Inputs are dark-filled surfaces with a subtle inner shadow to look "recessed" into the glass panels. On focus, the border transitions to a Primary violet glow.

### Heatmaps & Charts
Data visualizations should utilize the semantic color scale. Heatmap cells use varying opacities of the Primary color or status colors to represent density or risk levels.

### Sidebar Navigation
The sidebar uses a continuous vertical glass pane. The active state for nav items is indicated by a vertical "light bar" on the left edge and a subtle gradient shift in the item's background.