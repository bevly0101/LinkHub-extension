---
name: Obsidian Glass
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#d4c0d7'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#9d8ba0'
  outline-variant: '#504254'
  surface-tint: '#ebb2ff'
  primary: '#ebb2ff'
  on-primary: '#520072'
  primary-container: '#bc13fe'
  on-primary-container: '#ffffff'
  inverse-primary: '#9800d0'
  secondary: '#dcfdff'
  on-secondary: '#00373a'
  secondary-container: '#00f1fd'
  on-secondary-container: '#006a6f'
  tertiary: '#ffb2b8'
  on-tertiary: '#67001d'
  tertiary-container: '#ec004e'
  on-tertiary-container: '#140002'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#f8d8ff'
  primary-fixed-dim: '#ebb2ff'
  on-primary-fixed: '#320047'
  on-primary-fixed-variant: '#74009f'
  secondary-fixed: '#6ff6ff'
  secondary-fixed-dim: '#00dce6'
  on-secondary-fixed: '#002022'
  on-secondary-fixed-variant: '#004f53'
  tertiary-fixed: '#ffdadb'
  tertiary-fixed-dim: '#ffb2b8'
  on-tertiary-fixed: '#40000f'
  on-tertiary-fixed-variant: '#91002d'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
This design system embodies a "Cyberpunk Noir" aesthetic, merging the cold, high-tech atmosphere of a digital future with the stark, high-contrast shadows of film noir. The target audience includes power users, developers, and night-time creatives who demand an environment that minimizes eye strain while maximizing visual impact.

The style is a hybrid of **Minimalism** and **Glassmorphism**, applied to a **pure black foundation**. Surfaces are either "void" (true black) or "glass" (semi-transparent overlays). The emotional response should be one of sophisticated edge, technical precision, and immersive focus. All elements should feel like glowing data projected onto polished obsidian.

## Colors
The palette is built for OLED optimization and extreme contrast.
- **Primary (Electric Purple):** Used for primary actions, active states, and critical branding elements.
- **Secondary (Cyan):** Used for data visualization, informational accents, and secondary interactive elements.
- **Tertiary (Neon Pink):** Reserved for destructive actions or urgent notifications.
- **Neutral (True Black):** The base background layer (#000000) to ensure perfect blacks.
- **Surface (Obsidian Glass):** Layers are built using low-opacity white tints (3-7%) to create a sense of depth without breaking the dark aesthetic.

## Typography
The typography uses **Hanken Grotesk** exclusively to maintain a sharp, contemporary, and technical feel. 
- **Headlines:** Use tight letter-spacing and heavy weights to simulate architectural structure.
- **Labels:** Use uppercase with increased tracking for a "system readout" appearance.
- **Contrast:** High-level headers should use the primary or secondary neon colors, while body text remains in high-contrast off-white (e.g., #E0E0E0) for legibility against the black void.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy to evoke a sense of rigid, technical architecture. 
- **Desktop:** 12-column grid with 24px gutters and wide 64px margins to allow the "void" to breathe.
- **Mobile:** 4-column grid with 16px gutters and margins.
- **Spacing Rhythm:** Based on an 8px linear scale. Use generous padding inside "Glass" containers to emphasize the translucency and distance from the background. Elements should feel grouped into discrete modules rather than a continuous flow.

## Elevation & Depth
Depth is created through **Obsidian Glass** layering rather than traditional shadows.
- **Level 0 (The Void):** Pure #000000 background.
- **Level 1 (Surface):** Semi-transparent white fill (3%) with a 1px solid border (10% white). This creates a "glass plate" effect.
- **Level 2 (Active/Floating):** Use a subtle **Backdrop Blur** (12px to 20px) and a primary-tinted inner glow.
- **Glows:** Instead of drop shadows, use "Neon Bloom." Apply a blurred outer glow using the primary or secondary color with very low opacity (15-20%) to simulate light emitting from the UI elements onto the glass.

## Shapes
This design system utilizes **Sharp (0px)** corners for all primary containers, buttons, and input fields. The lack of roundedness reinforces the aggressive, technical, and "noir" precision of the system. 
- **Exceptions:** Use circular shapes only for user avatars or status indicators to provide a visual break from the rigid grid. 
- **Lines:** Use thin 1px lines for dividers, using the `border_glass` token.

## Components
- **Buttons:** Primary buttons feature a solid Electric Purple fill with black text. Secondary buttons are transparent with a 1px Cyan border and Cyan text. On hover, buttons should trigger a "Neon Bloom" (outer glow).
- **Glass Cards:** Containers for content must use the 3% white tint and backdrop-filter: blur. The 1px border is mandatory to define the edge against the pure black background.
- **Input Fields:** Sharp 1px borders. The border should "ignite" (change to Cyan or Purple) when focused, accompanied by a subtle glow.
- **Chips/Labels:** Use the `label-caps` typography style. Backgrounds should be high-opacity glass (10-15%) to distinguish them from the card they sit on.
- **Progress Bars:** Use a dual-color gradient (Primary to Secondary) for the fill, set against a dark glass track.
- **Scrollbars:** Ultra-thin (4px) with a Primary color thumb and no track background.