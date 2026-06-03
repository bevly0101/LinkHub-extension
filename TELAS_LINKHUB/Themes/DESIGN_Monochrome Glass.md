---
name: Monochrome Glass
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#ffffff'
  on-tertiary: '#2f3131'
  tertiary-container: '#e2e2e2'
  on-tertiary-container: '#636565'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 64px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.2'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  container-max: 1440px
---

## Brand & Style

The design system is rooted in **Monochrome Glassmorphism**, a style that prioritizes material texture, optical transparency, and structural depth over hue. The target audience includes high-end creative professionals, architects, and technical specialists who value clarity and focused environments.

The brand personality is **ethereal yet grounded**, evoking a sense of calm, precision, and luxury. By stripping away color, the interface directs all attention to content and hierarchy, using light-refraction metaphors to guide the user. The emotional response should be one of "digital weightlessness"—an interface that feels like etched glass floating in a void.

## Colors

This design system operates on a strictly grayscale axis. The palette is designed for a **dark mode default**, utilizing varying degrees of luminosity rather than saturation.

- **Primary:** Pure white (#FFFFFF), reserved exclusively for high-priority text, icons, and interactive states to maximize contrast against the dark void.
- **Secondary:** A deep obsidian (#1A1A1A), used for the base of glass containers to provide enough contrast for the backdrop-blur effect to be legible.
- **Neutral/Surface:** The true background (#0F0F0F), creating an infinite depth behind the glass layers.
- **Functional Grays:** Mid-range grays are used sparingly for secondary text and subtle borders to maintain the monochrome integrity.

## Typography

The typography strategy leverages **Hanken Grotesk** for its sharp, contemporary geometry, providing a clean "etched" look on glass surfaces. **JetBrains Mono** is introduced for labels and metadata to reinforce the technical, precise nature of the design system.

Headlines should utilize tight tracking and substantial weight to create focal points within the transparent UI. Body text requires generous line-height to ensure legibility when overlaid on complex background blurs. All labels are set in monospaced caps to act as structural anchors for the layout.

## Layout & Spacing

This design system utilizes a **Fluid Grid** model with high-margin "safe zones" to emphasize the floating nature of the components. 

- **Desktop:** 12-column grid with 24px gutters. Outer margins are expansive (64px) to let the background breathe.
- **Mobile:** 4-column grid with 16px gutters and 20px margins. 
- **Rhythm:** All spacing is derived from an 8px base unit. 

Layouts should favor asymmetrical compositions and significant vertical whitespace. Elements are grouped in "glass clusters"—related items housed within a single translucent container to maintain organizational clarity without using heavy solid fills.

## Elevation & Depth

Depth is the primary communicator of hierarchy in this design system. It is achieved through three layers of visual physics:

1.  **Backdrop Blur:** Every surface must have a `backdrop-filter: blur(20px)`. This creates the "glass" effect and ensures content remains legible over background noise.
2.  **Inner Glow:** Glass surfaces feature a 1px white border with 10-15% opacity. This "rim light" simulates the edge of a glass pane catching light from above.
3.  **Soft Shadows:** Elevated elements use ultra-diffused shadows (`spread: 0`, `blur: 40px`, `color: rgba(0,0,0,0.5)`). Shadows should not look "inky" but rather like a soft obstruction of light.

Interactive states are indicated by increasing the brightness of the glass (lower transparency) or intensifying the inner glow.

## Shapes

The shape language is **Refined and Geometric**. We use `roundedness: 2` (0.5rem base) to soften the technical feel of the monochrome palette while maintaining a professional, structured silhouette.

Large containers like cards and modals should use `rounded-xl` (1.5rem) to emphasize their "object" quality. Buttons and input fields use the base 0.5rem radius. Elements should never be fully sharp (0px) nor fully circular (pill), as the design system seeks a balance between architectural rigidity and organic softness.

## Components

### Buttons
Primary buttons are high-contrast: white text on a semi-transparent white background (20% opacity) that brightens to 30% on hover. Secondary buttons are ghost-style with only the 1px rim-light border.

### Cards
Cards are the primary expression of the glass aesthetic. They must include the backdrop blur, the 1px semi-transparent border, and a subtle top-to-bottom linear gradient (from `white @ 5%` to `white @ 2%`).

### Inputs
Fields are dark and recessed. Use a subtle inner shadow to create a "carved" look into the glass surface. The active state is marked by a 1px solid white bottom border.

### Lists & Navigation
Navigation items use **JetBrains Mono** labels. Active states are indicated by a small white dot (4px) next to the label, rather than a background change, to keep the UI light.

### Additional Components: The "Vignette"
A specialized component for this system is the "Vignette"—a large, non-interactive blurred shape in the background that provides the color/texture for the glass components to refract.