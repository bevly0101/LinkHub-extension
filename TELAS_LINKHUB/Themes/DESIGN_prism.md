---
name: Aura Frost
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434751'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737782'
  outline-variant: '#c3c6d3'
  surface-tint: '#325ca9'
  primary: '#325ca9'
  on-primary: '#ffffff'
  primary-container: '#7ca3f5'
  on-primary-container: '#00377d'
  inverse-primary: '#aec6ff'
  secondary: '#575e72'
  on-secondary: '#ffffff'
  secondary-container: '#dbe2fa'
  on-secondary-container: '#5d6478'
  tertiary: '#5a5f62'
  on-tertiary: '#ffffff'
  tertiary-container: '#a0a5a9'
  on-tertiary-container: '#363b3e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#aec6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#104490'
  secondary-fixed: '#dbe2fa'
  secondary-fixed-dim: '#bfc6dd'
  on-secondary-fixed: '#141b2c'
  on-secondary-fixed-variant: '#3f4759'
  tertiary-fixed: '#dfe3e7'
  tertiary-fixed-dim: '#c3c7cb'
  on-tertiary-fixed: '#171c1f'
  on-tertiary-fixed-variant: '#43474b'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: '0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style
The brand personality is ethereal, calm, and hyper-modern. It targets a sophisticated audience that values clarity and cognitive ease. The emotional response should be one of "digital serenity"—an interface that feels like looking through etched glass on a clear morning.

The design style is a hybrid of **Minimalism** and **Glassmorphism**. It prioritizes heavy whitespace and a reduction of "solid" containers in favor of translucent, layered surfaces. The aesthetic is defined by high-quality typography, subtle light refraction, and a rejection of heavy shadows or opaque borders.

## Colors
The palette is intentionally high-key and desaturated to maintain an airy atmosphere. 

- **Primary:** A soft, crystalline blue used sparingly for interactive cues and focus states.
- **Surface & Backgrounds:** Off-whites (#F8FAFC) and extremely light grays form the base.
- **Glass Accents:** Secondary and Tertiary colors are used primarily as tints within translucent layers to create depth.
- **Translucency:** Most "surfaces" should utilize an 80% to 40% opacity of the background color combined with a 20px to 40px backdrop-blur.

## Typography
This design system utilizes **Hanken Grotesk** across all roles to ensure a sharp, contemporary, and unified feel. 

Headlines use semi-bold weights with tight tracking to ground the airy layout. Body text is set with generous line height to promote readability against translucent backgrounds. Labels use a higher weight or all-caps styling to provide clear hierarchy in a low-contrast environment. For mobile, display sizes scale down significantly to prevent line-wrapping issues on smaller viewports.

## Layout & Spacing
The layout follows a **fluid-to-fixed** model. On mobile and tablet, a 4-column and 8-column grid is used with 16px and 24px margins respectively. On desktop, the layout centers within a 1200px container using a 12-column grid.

Spacing relies on a "breathable" rhythm. Elements should be grouped with small increments (8px, 16px) but separated by large "void" spaces (40px, 64px) to emphasize the minimalist aesthetic. This design system avoids cluttered densities; when in doubt, increase the padding.

## Elevation & Depth
Depth is created through **Backdrop Blur** and **Tonal Layering** rather than traditional black shadows.

- **Level 1 (Base):** Solid off-white background.
- **Level 2 (Cards/Containers):** White background at 60% opacity, 24px Backdrop Blur, and a 1px inner border of white at 40% opacity to simulate a "glass edge."
- **Level 3 (Modals/Overlays):** White background at 80% opacity, 40px Backdrop Blur. A very faint, large-radius colored shadow (tinted with the Primary color at 5% opacity) can be used to indicate focus.
- **Level 4 (Floating Elements):** High-opacity white with a thin, soft glow instead of a shadow.

## Shapes
Shapes are consistently **Rounded** (0.5rem base) to soften the technical feel of the interface. This curvature mimics the natural "pooling" of light on glass surfaces. 

- Interactive elements (buttons, inputs) use the standard `rounded` (8px).
- Larger containers and cards use `rounded-xl` (24px).
- Status indicators and tags use a full pill-shape to distinguish them from structural elements.

## Components
- **Buttons:** Primary buttons use a soft gradient of Primary to Accent Cyan with white text. Secondary buttons are "ghost" style with a 1px white border and frosted background.
- **Input Fields:** These should have a background of white at 30% opacity. On focus, the backdrop-blur increases and the border tints to the Primary color.
- **Cards:** Use the Level 2 elevation specs. No external shadows; only the 1px light border for definition.
- **Chips/Tags:** Small, pill-shaped elements with a subtle tint of the primary or secondary color and 40% opacity.
- **Lists:** Items are separated by subtle 1px horizontal lines at 10% opacity, or simply by vertical rhythm without lines to maintain the minimal look.
- **Frosted Dock:** A specific component for navigation—a floating bottom or side bar with 50% opacity and max backdrop-blur, sitting 16px away from the screen edge.