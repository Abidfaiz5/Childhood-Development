---
name: Serene Clinical & Developmental Intelligence
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3e4947'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6e7977'
  outline-variant: '#bdc9c6'
  surface-tint: '#006a63'
  primary: '#005c55'
  on-primary: '#ffffff'
  primary-container: '#0f766e'
  on-primary-container: '#a3faef'
  inverse-primary: '#80d5cb'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fd'
  on-secondary-container: '#57657b'
  tertiary: '#005c54'
  on-tertiary: '#ffffff'
  tertiary-container: '#00776d'
  on-tertiary-container: '#91fdef'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#9cf2e8'
  primary-fixed-dim: '#80d5cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#00504a'
  secondary-fixed: '#d5e3fd'
  secondary-fixed-dim: '#b9c7e0'
  on-secondary-fixed: '#0d1c2f'
  on-secondary-fixed-variant: '#3a485c'
  tertiary-fixed: '#89f5e7'
  tertiary-fixed-dim: '#6bd8cb'
  on-tertiary-fixed: '#00201d'
  on-tertiary-fixed-variant: '#005049'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Inter
    fontSize: 3rem
    fontWeight: '600'
    lineHeight: '1.15'
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: '1.35'
    letterSpacing: -0.01em
  title-md:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: '1.55'
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0.005em
  label-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: '1.25'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: '1.25'
    letterSpacing: 0.02em
  caption:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: 0.03em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
---

## Brand & Style
The design system establishes an atmosphere of quiet authority, deliberate restraint, and clinical empathy tailored for high-stakes early childhood development consultancy in Pakistan. It balances institutional credibility with human warmth, addressing NGOs, private health networks, educational bodies, and government stakeholders.

The visual style is rooted in modern minimalism enriched with quiet warmth. Generous whitespace, precise typographic hierarchies, and unembellished surfaces project institutional rigor and strategic clarity. The interface avoids distracting novelties, high-gloss gradients, and aggressive visual noise in favor of serene, purposeful utility that honors sensitive developmental and health data.

## Colors
The palette relies on a single commanding accent anchored by balanced slate neutrals and soft, warm-grey structural planes.

- **Primary (`#0F766E`)**: Deep strategic teal. Communicates clinical precision, developmental stewardship, and calm stability. Used strictly for primary actions, critical state emphasis, active navigation anchors, and key developmental metrics.
- **Secondary (`#334155`)**: Slate charcoal. Applied to primary headings, high-priority data points, and structural interface indicators.
- **Tertiary (`#0D9488`)**: A muted lighter teal for secondary supportive states, inline indicators, and focused accents.
- **Neutral (`#64748B`)**: Balanced cool slate for auxiliary metadata, labels, passive icons, and borders.
- **Canvas & Backgrounds**: The foundational canvas leverages soft, warm stone/zinc tiers (`#F8FAFC` base page, `#F1F5F9` panel fills), set against pure white (`#FFFFFF`) interior cards.
- **Text Hierarchies**: Lead data and headers use `#0F172A`, standard body copy uses `#334155`, and supporting administrative labels sit at `#64748B`.

## Typography
The system employs `Inter` across all functional roles to provide neutral, crystal-clear readability for complex healthcare indicators and quantitative analytics. 

- **Scale & Contrast**: Subtle weight shifts (from 400 Regular to 600 Semi-Bold) indicate hierarchy without visual heaviness.
- **Tabular Data & Metrics**: Analytical readouts, cohort timelines, and demographic summaries must apply open-type tabular lining numerals (`tnum`) to maintain structural vertical alignment.
- **Tracking & Proportion**: Tightened negative letter spacing is applied to large sizes to ensure compact, confident headlines, while positive tracking is reserved for small micro-labels and uppercase section tags.

## Layout & Spacing
The layout operates on a clean 12-column fluid grid system pinned to a maximum content container width of `1440px`.

- **Responsive Grid**:
  - **Desktop (1024px+)**: 12 columns, `1.5rem` (`24px`) gutters, and `2.5rem` (`40px`) exterior margin.
  - **Tablet (768px - 1023px)**: 8 columns, `1.25rem` (`20px`) gutters, and `1.5rem` (`24px`) exterior margin.
  - **Mobile (< 768px)**: 4 columns, `1rem` (`16px`) gutters, and `1rem` (`16px`) exterior margin.
- **Rhythm & Structure**: Spacing establishes generous room around analytical visualizations, avoiding clustered dashboards. Padding within cards and layout panels must not dip below `space-md`, while section separation defaults to `space-xl` or `space-2xl` to ensure cognitive decompression.

## Elevation & Depth
Elevation is realized strictly through tonal separation and hairline boundaries rather than dramatic dropped shadows.

- **Flat Tonal Hierarchy**:
  - Canvas Floor: Subdued warm stone/zinc tint (`#F8FAFC`).
  - Structural Panels & Drawers: Soft surface wash (`#F1F5F9`).
  - Active Work Surface / Cards: Pure white (`#FFFFFF`).
- **Hairline Outlines**: Surface boundaries use a delicate 1px border (`#E2E8F0` on white, `#CBD5E1` on muted backgrounds).
- **Shadowless Focus**: Surfaces remain completely flat. Where floating elements (dropdown popovers, modal dialogues) require separation, apply a razor-fine border paired with a quiet, diffused ambient veil: `0 4px 20px -2px rgba(15, 23, 42, 0.04)`.

## Shapes
The shape language favors crisp, disciplined, and gentle geometry that conveys stability and high-end executive delivery.

- **Corner Radii Scale**:
  - Standard elements (inputs, tags, buttons): `0.25rem` (`4px`).
  - Contained cards and data modules: `0.5rem` (`8px`).
  - Modal containers and major panels: `0.75rem` (`12px`).
- Sharp, non-distracting curves maintain professional sobriety while eliminating harsh industrial points. Circular styling is reserved exclusively for user avatars and simple status dots.

## Components

- **Buttons**:
  - *Primary*: Deep teal background (`#0F766E`), white text, crisp 4px corners, hover shift to `#115E59`.
  - *Secondary / Outlined*: Hairline 1px border (`#E2E8F0`), pure white surface, dark slate text (`#0F172A`), hover background `#F8FAFC`.
  - *Ghost*: Transparent background, slate text (`#334155`), hover background `#F1F5F9`.
- **Cards & Data Panels**:
  - Crisp white background (`#FFFFFF`), 1px solid border (`#E2E8F0`), `8px` corner radius. Padding must follow generous scales (`1.5rem` desktop, `1rem` mobile).
- **Form Inputs & Search**:
  - Background `#FFFFFF` with 1px border (`#CBD5E1`). Focus state drops border color to deep teal (`#0F766E`) with an unobtrusive 1px inner ring—never an aggressive fuzzy outer glow. Placeholder text in `#94A3B8`.
- **Chips & Status Tags**:
  - Subtle contextual indicators: soft neutral wash (`#F1F5F9`) with `#334155` text. Clinical/Active indicators use a light teal wash (`#F0FDFA`) with `#0F766E` text and 1px border (`#CCFBF1`). Radii fixed to `4px`.
- **Selection Controls (Checkboxes & Radios)**:
  - Unchecked: 1px border (`#94A3B8`), white interior.
  - Checked: Solid `#0F766E` fill with pure white tick or pip. Square checkboxes utilize `2px` soft radius; radios are circular.
- **Lists & Data Tables**:
  - Flush horizontal divider lines (`#F1F5F9`), zero vertical borders. Header rows styled in `#64748B`, `0.75rem`, medium weight, tracked wide. Hover rows tint smoothly to `#F8FAFC`.
- **Consultancy Metric Tiles**:
  - Dedicated KPI widgets featuring top-aligned micro-labels (`label-sm`), prominent semi-bold numerical callouts (`headline-md`) using tabular figures, and quiet localized metadata indicators.