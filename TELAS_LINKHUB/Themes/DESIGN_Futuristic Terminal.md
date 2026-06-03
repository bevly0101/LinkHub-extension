---
name: Futuristic Terminal
colors:
  surface: '#111318'
  surface-dim: '#111318'
  surface-bright: '#37393e'
  surface-container-lowest: '#0c0e12'
  surface-container-low: '#1a1c20'
  surface-container: '#1e2024'
  surface-container-high: '#282a2e'
  surface-container-highest: '#333539'
  on-surface: '#e2e2e8'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e2e2e8'
  inverse-on-surface: '#2f3035'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#d1bcff'
  on-secondary: '#3c0090'
  secondary-container: '#7000ff'
  on-secondary-container: '#ddcdff'
  tertiary: '#fff3f3'
  on-tertiary: '#67001d'
  tertiary-container: '#ffcdd0'
  on-tertiary-container: '#be003d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d1bcff'
  on-secondary-fixed: '#23005b'
  on-secondary-fixed-variant: '#5700c9'
  tertiary-fixed: '#ffdadb'
  tertiary-fixed-dim: '#ffb2b8'
  on-tertiary-fixed: '#40000f'
  on-tertiary-fixed-variant: '#91002d'
  background: '#111318'
  on-background: '#e2e2e8'
  surface-variant: '#333539'
typography:
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
  code-snippet:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 40px
  margin-mobile: 16px
  container-max: 1440px
---

## Brand & Style
The design system is engineered for high-performance environments where data density and technical precision are paramount. It targets a technical audience—developers, sys-admins, and data scientists—who value efficiency over ornamentation. 

The aesthetic is a fusion of **Futuristic Minimalism** and **Glassmorphism**, specifically modeled after heads-up displays (HUDs) and advanced command-line interfaces. The UI should evoke a sense of "mission control"—authoritative, real-time, and deeply technical. Key visual drivers include ultra-thin lines, semi-transparent layers that imply depth without physical weight, and a disciplined "monitored" atmosphere.

## Colors
The palette is rooted in a "Deep Space" neutral base to minimize eye strain during long sessions while maximizing the "glow" effect of functional elements.

- **Primary (Electric Cyan):** Used for critical paths, active states, and primary data readouts. It should feel radioactive and high-energy.
- **Secondary (Neural Violet):** Used for secondary interactions, data grouping, and decorative accents that don't require immediate attention.
- **Tertiary (Warning Red):** Reserved strictly for errors, system alerts, and destructive actions.
- **Neutral Surface:** A multi-layered dark scale ranging from `#0A0C10` (background) to `#1A1D23` (panels).

Apply a 5-10% opacity cyan tint to all semi-transparent "glass" surfaces to maintain brand consistency within the depth stack.

## Typography
Typography is a functional tool for data hierarchy. 
- **Headlines:** Use **Space Grotesk** for a futuristic, geometric feel. It provides the "display" character of the system.
- **Body:** **Geist** provides extreme legibility for technical documentation and dense descriptions.
- **Data & Labels:** **JetBrains Mono** is the workhorse. Use it for all numerical data, status labels, and button text to emphasize the "terminal" nature of the product. 

All labels should be treated with a slight letter-spacing increase to mimic hardware readouts.

## Layout & Spacing
The layout follows a **Rigid Fluid Grid**. While the container responds to screen size, the internal components are governed by a strict 4px baseline grid to ensure mathematical alignment.

- **Desktop:** 12-column grid with 24px gutters. Use "split-screen" or "modular dashboard" layouts where panels are docked to the edges of the viewport.
- **Mobile:** Single column. Collapsible sidebars are replaced by bottom-anchored "Command Sheets."
- **Data Density:** Use tight spacing (4px/8px) between related data points and larger gaps (24px/32px) between distinct functional modules.

## Elevation & Depth
Depth is conveyed through **Glassmorphism** and **Luminous Outlines** rather than traditional shadows.

1.  **Level 0 (Background):** Deepest matte neutral.
2.  **Level 1 (Panels):** Semi-transparent (80% opacity) with a 12px backdrop blur. Borders are 1px solid at 10% white.
3.  **Level 2 (Active/Hover):** Increase border opacity to 30% and add a subtle 2px "inner glow" using the Primary Cyan color.
4.  **Level 3 (Modals):** Full backdrop blur (20px) with a Primary Cyan outer "scanline" shadow—a 1px spread shadow with 0 blur to create a hard technical outline.

Avoid soft, organic shadows. All "glows" should feel like light emitted from a screen.

## Shapes
The shape language is **Strictly Geometric**. 

- **Corners:** 0px radius across all components. Sharp corners reinforce the precision of a digital terminal.
- **Accents:** Use 45-degree "clipped corners" (dog-ear notches) for primary action buttons or high-level status indicators to evoke a futuristic military/industrial aesthetic.
- **Lines:** Use 1px "hairline" separators. For visual interest, allow lines to extend slightly beyond their intersection points (crosshair style).

## Components
- **Buttons:** Sharp 0px corners. Primary buttons have a solid Cyan background with black JetBrains Mono text. Secondary buttons are outlined with a "glitch" hover effect (slight horizontal offset on hover).
- **Input Fields:** Bottom-border only by default. On focus, the field gains a subtle cyan background tint and a blinking underscore cursor at the end of the text.
- **Chips/Status:** Small, monospaced text boxes. Use "Active" (Cyan), "Idle" (Violet), and "Critical" (Red). Include a small 4px square "indicator light" icon next to the text.
- **Progress Bars:** Segmented blocks rather than a smooth continuous fill. Each block represents 5% or 10% of the total.
- **Cards/Panels:** Always include a small "coordinate label" in the top right corner (e.g., `SEC_01 // DATA_NODE`) in 8pt JetBrains Mono to enhance the technical flavor.
- **Data Tables:** Zebra-striping is replaced by thin 1px horizontal lines at 5% opacity. Headers are always uppercase with a Primary Cyan bottom border.