---
version: "alpha"
name: "Headwinds"
description: "Personal portfolio site for Brandon Flowers — a warm, editorial design system built on cream surfaces, taupe canvas, and restrained typography."

colors:
  canvas: "#C5BEB6"
  surface: "#F3EBE2"
  surface-alt: "#EAE3DA"
  surface-hover: "#EDE5DC"
  surface-border: "#D5CEC6"
  text-primary: "#1A1A1A"
  text-body: "#3D3D3D"
  text-muted: "#6B6B6B"
  text-subtle: "#8A8A8A"
  text-on-dark: "#F5F4F2"
  text-on-dark-muted: "#AAAAAA"
  dark: "#1A1A1A"
  dark-hover: "#333333"
  accent-gold: "#C9A962"
  accent-sage: "#C3DED8"
  accent-blue: "#C4CFDE"
  accent-olive: "#D5DCBA"
  accent-peach: "#E8D5C4"
  sprite-tint: "rgb(188, 174, 158)"

typography:
  display:
    fontFamily: "Inter, sans-serif"
    fontSize: "72px"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  heading-lg:
    fontFamily: "Inter, sans-serif"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0"
  heading-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "0"
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.27em"
  caption:
    fontFamily: "Inter, sans-serif"
    fontSize: "10px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.2em"

rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  full: "9999px"

spacing:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  2xl: "24px"
  3xl: "32px"
  4xl: "48px"

components:
  nav-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    height: "64px"
    padding: "0 48px"
  nav-link:
    textColor: "{colors.text-primary}"
    typography: "{typography.body}"
  nav-link-active:
    textColor: "{colors.text-primary}"
  footer:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.lg}"
    padding: "32px 48px"
  footer-link:
    textColor: "{colors.text-subtle}"
  footer-link-hover:
    textColor: "{colors.text-on-dark}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "32px 48px"
  card-dark:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.text-on-dark}"
    rounded: "{rounded.lg}"
    padding: "16px"
  button-primary:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: "10px 24px"
  button-primary-hover:
    backgroundColor: "{colors.dark-hover}"
  button-pill:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.full}"
    padding: "6px 14px"
  stat-tile:
    rounded: "{rounded.lg}"
    padding: "16px 24px"
  modal-backdrop:
    backgroundColor: "rgba(0, 0, 0, 0.6)"
  modal-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
  modal-image:
    rounded: "{rounded.sm}"
  brand-card:
    backgroundColor: "{colors.surface-alt}"
    rounded: "{rounded.md}"
  chat-container:
    backgroundColor: "{colors.dark}"
    rounded: "{rounded.lg}"
  chat-bubble-user:
    backgroundColor: "{colors.accent-gold}"
    textColor: "{colors.dark}"
    rounded: "{rounded.lg}"
  chat-bubble-assistant:
    backgroundColor: "#2A2A2A"
    textColor: "{colors.text-on-dark}"
    rounded: "{rounded.lg}"
---

# Design System: Headwinds

## 1. Overview

Headwinds is a personal portfolio for Brandon Flowers — a developer, builder, and creative technologist. The visual identity draws on **warm neutrals**, **editorial restraint**, and **generous whitespace** to let the work speak for itself.

The aesthetic is inspired by gallery catalogues and design monographs: cream surfaces floating on a taupe canvas, with quiet pastel accents that evoke calm confidence rather than flashy self-promotion. Every surface has rounded corners and a soft shadow vocabulary; nothing is sharp or aggressive.

The site should feel like picking up a beautifully printed booklet about someone's career — unhurried, tactile, and considered.

**Target audience:** hiring managers, collaborators, and fellow developers who value craft and attention to detail.

## 2. Colors

The palette is anchored by a warm taupe canvas with cream content surfaces. Dark elements (`#1A1A1A`) provide grounding contrast. Pastel accents are reserved for stat tiles and featured project cards to provide visual variety without competing.

| Token | Hex | Role |
|:------|:----|:-----|
| `canvas` | `#C5BEB6` | Page background — the taupe "gallery wall" behind all content |
| `surface` | `#F3EBE2` | Primary card and nav background — warm cream |
| `surface-alt` | `#EAE3DA` | Secondary surface for brand logo cards and image placeholders |
| `surface-hover` | `#EDE5DC` | Hover state for interactive surfaces |
| `surface-border` | `#D5CEC6` | Subtle dividers and key-value row separators |
| `text-primary` | `#1A1A1A` | Headlines, nav text, primary content |
| `text-body` | `#3D3D3D` | Body paragraphs and descriptions |
| `text-muted` | `#6B6B6B` | Labels, captions, secondary info |
| `text-subtle` | `#8A8A8A` | Footer links, tertiary text |
| `text-on-dark` | `#F5F4F2` | Text on dark backgrounds |
| `text-on-dark-muted` | `#AAAAAA` | Secondary text on dark backgrounds |
| `dark` | `#1A1A1A` | Footer, dark cards, primary buttons |
| `dark-hover` | `#333333` | Button hover state on dark |
| `accent-gold` | `#C9A962` | Chat user bubbles, whale species badges, gold highlights |
| `accent-sage` | `#C3DED8` | Stat tile and featured project accent (sage green) |
| `accent-blue` | `#C4CFDE` | Stat tile and featured project accent (dusty blue) |
| `accent-olive` | `#D5DCBA` | Stat tile and featured project accent (olive) |
| `accent-peach` | `#E8D5C4` | Stat tile accent (warm peach) |

**Legacy tokens** in `globals.css` (`:root` variables like `--primary: #3F725E`) exist for older cross-country component styles but are not used in the modern site design. New work should use the tokens above.

## 3. Typography

**Inter** is the sole typeface, loaded via `next/font/google` and applied to `<body>`. The typographic hierarchy relies on weight and letter-spacing contrast rather than multiple families.

| Level | Size | Weight | Tracking | Usage |
|:------|:-----|:-------|:---------|:------|
| `display` | 72px | 400 (regular) | -0.02em | Landing hero headline |
| `heading-lg` | 24px | 400 | 0 | Modal brand names, section titles |
| `heading-sm` | 14px | 600 | 0 | Card titles, project names |
| `body` | 14px | 400 | 0 | Descriptions, paragraphs |
| `label` | 11px | 500 | 0.27em | All-caps section labels ("BRANDS I'VE WORKED WITH") |
| `caption` | 10px | 500 | 0.2em | All-caps sub-labels, role tags |

**Conventions:**
- Section labels are always uppercase with wide letter-spacing — this is the site's most distinctive typographic gesture.
- Headlines are large but light-weight (regular, not bold) for an editorial feel.
- Body text uses `leading-relaxed` (1.625 line-height) for comfortable reading.

## 4. Layout

The site uses a **padded canvas** approach: the entire viewport has a `#C5BEB6` background with `6px` (`p-1.5`) padding. Content surfaces (nav, cards, footer) float as rounded rectangles on this canvas, separated by `6px` gaps.

**Grid:**
- Brand logo grid: responsive 2 → 3 → 4 columns depending on viewport width.
- Featured projects: 3-column grid with `gap-4`.
- Art frames: CSS grid with `col-span-2` for featured items.
- Stats: 4-column evenly distributed row.

**Page rhythm:**
- Outer page padding: `6px` on all sides.
- Card internal padding: `32px` to `48px` (responsive with `p-8 md:p-12`).
- Section gaps within cards: `24px` (`gap-6`).
- Element gaps within sections: `8px` to `16px`.

## 4.1 Responsive QA Checklist

Every page update should be validated at minimum on these breakpoints:
- Mobile: 375px width
- Tablet: 768px width
- Desktop: 1280px width

For each breakpoint, verify:
- No horizontal scrolling appears at page level.
- Header, filter bars, and stats rows wrap without clipping.
- Cards in project/brand grids keep readable padding and typography.
- Primary actions remain visible and tappable without overlap.
- Modal content stacks or scales appropriately on mobile.
- Long labels and counts do not collide with controls.

## 5. Elevation & Depth

The design is **predominantly flat** with elevation used sparingly for emphasis:

- **Modals:** `shadow-2xl` on the card, `backdrop-blur-sm` on the overlay.
- **Content cards:** No box shadow — surfaces are distinguished by color contrast against the taupe canvas.
- **Hover states:** Color shift (surface lightens) rather than shadow changes.
- **Brand modal insights panel:** `shadow-2xl` to visually separate the slide-out from the main card.

The site relies on **color contrast** and **spatial separation** (the `6px` gap between surfaces) rather than drop shadows to create hierarchy.

## 6. Shapes

**Concentric border-radius** follows Apple's concentricity principle: inner elements have a radius equal to the outer radius minus the gap between them.

| Token | Value | Usage |
|:------|:------|:------|
| `sm` | `8px` | Buttons, modal images (inner radius: 16px outer − 8px padding) |
| `md` | `12px` | Brand logo cards |
| `lg` | `16px` | Nav bar, footer, content cards, modals |
| `full` | `9999px` | Pill buttons, suggestion chips, status indicators |

**Convention:** All rectangular UI elements are rounded. There are no sharp-cornered containers anywhere in the current design.

## 7. Components

### Nav Bar
Cream surface bar, `64px` tall, `16px` radius. Logo (HeadwindsLogo from `cross-country` at 60px container width) + "headwinds" wordmark on the left. Navigation links on the right. Active link is `font-medium`; others are regular weight.

### Footer
Dark bar (`#1A1A1A`), `16px` radius. Copyright left, social links (GitHub, LinkedIn, Twitter) right. Links are `#8A8A8A` → `#F5F4F2` on hover.

### Content Cards
Cream surface, `16px` radius, generous internal padding (`p-8 md:p-12`). Used for all major page sections (brands, projects, stats, chat).

### Brand Logo Cards
`#EAE3DA` background, `12px` radius, `aspect-[23/18]` to match the sprite sheet cell proportions. Hover reveals a gradient overlay with brand name and role. Each card has per-brand `nudgeX`/`nudgeY` offsets to center logos within the sprite.

### Brand Modal
Two-panel horizontal layout. Left panel (420px): hero image with `8px` concentric radius inside `8px` padding, brand info, and "View Project" CTA. Right panel (320px): slides in with a `translateX` transition when insights load. Contains "Brand Insights" card (cream) and "Spirit Whale" card (dark).

### Primary Button
Dark background, cream text, `8px` radius, bold small text. Used for CTAs like "View Project →".

### Chat Widget
Dark container (`#1A1A1A`), max height `400px`. User messages in `#C9A962` (gold), assistant messages in `#2A2A2A`. Suggestion chips are `rounded-full` pill buttons. Markdown rendering for assistant responses.

### Stat Tiles
Pastel accent backgrounds (sage, blue, olive, peach), `16px` radius. Large bold number + small uppercase label below.

## 8. Do's and Don'ts

### Do
- Use the taupe canvas (`#C5BEB6`) as the page background for all pages wrapped in PageShell.
- Keep the `6px` gap between all floating surfaces (nav, cards, footer).
- Use uppercase `label` typography with wide tracking for all section headers.
- Apply concentric border-radius when nesting rounded elements (outer minus gap = inner).
- Let content breathe — generous padding, relaxed line-height, spacious gaps.
- Use `accent-gold` (`#C9A962`) sparingly for interactive highlights on dark surfaces.
- Truncate long text (50 chars) in constrained layouts like the insights panel.
- Open external links in new tabs with `target="_blank" rel="noopener noreferrer"`.

### Don't
- Don't use the legacy CSS variables (`--primary`, `--secondary`, `--tertiary`) for new components — they belong to an older cross-country style era.
- Don't add drop shadows to content cards — rely on color contrast and spatial separation.
- Don't use bold weight for large headlines — display and heading-lg are regular (400) weight.
- Don't use sharp corners on any container or interactive element.
- Don't use colors outside the defined palette without a deliberate reason.
- Don't place text directly on the taupe canvas — always use a surface card.
- Don't make the chat widget taller than `400px`.
- Don't use multiple typefaces — Inter is the only font.
