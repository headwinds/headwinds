# Brand Infographics — drop-in section for headwinds.vercel.app

A self-contained Feltron-style infographic section: 12 brand cards that
stagger-reveal on scroll, pairing numeric callouts with duotone monochrome
photography. Built to match the Headwinds cream/taupe aesthetic and your
existing Inter font.

## What's in this folder

```
BrandInfographics.tsx   ← the React component (drop in as-is)
brandData.ts            ← the 12-brand data model (edit copy/metrics here)
public/                 ← 12 duotone .jpg images (rename folder, see below)
```

## Install (3 steps)

### 1. Copy the files

- Put `BrandInfographics.tsx` and `brandData.ts` into your components folder
  (e.g. `components/BrandInfographics.tsx`). Keep them side-by-side — the
  component imports `./brandData`.
- Copy the **contents** of this `public/` folder into your app's public
  directory under a `headwinds-infographics/` subfolder, so the images resolve at:

  ```
  public/headwinds-infographics/mitsubishi.jpg
  public/headwinds-infographics/ea-sports.jpg
  ... (12 files)
  ```

  (Next.js serves `public/headwinds-infographics/x.jpg` at `/headwinds-infographics/x.jpg`,
  which is exactly the path the component requests via `IMG_BASE`.)

### 2. Install the motion library

```bash
npm install motion
```

The component imports from `motion/react` (the current name for framer-motion —
same package). If you already use `framer-motion`, change the import line in
`BrandInfographics.tsx` to `from "framer-motion"`.

### 3. Render it at the bottom of your page

```tsx
import BrandInfographics from "@/components/BrandInfographics";

export default function Page() {
  return (
    <main>
      {/* ...hero, projects, "BRANDS I'VE WORKED WITH" grid... */}
      <BrandInfographics />
    </main>
  );
}
```

That's it. The section renders below your brand grid and animates in as the
user scrolls to it.

## How it works

- **Scroll reveal** — uses Motion's `whileInView` with `viewport={{ once: true }}`.
  Cards stagger in (60 ms apart) with a gentle spring; stat numbers fade in a
  beat later. Total stagger stays under ~400 ms so it never feels sluggish.
- **Self-styled** — all CSS is scoped under `.hw-*` class names and injected once
  into `<head>` on mount, so it won't collide with your global styles or Tailwind.
- **Palette** — sampled directly from your site:
  page `#f3eae1`, card `#eae3d9`, taupe accent `#bbae9e`, ink `#34322d`.
  Override by editing the `:root`-style block at the top of the `STYLES` string.
- **Font** — inherits Inter via `--font-inter`. If your Inter CSS variable has a
  different name, set `--font-inter` on a wrapping element, or edit the
  `font-family` line in `STYLES`.
- **Accessible** — semantic `<article>` / `<dl>` markup, alt text on every photo,
  `prefers-reduced-motion` respected, lazy-loaded images with fixed dimensions
  (no layout shift).

## Editing content

All copy and numbers live in `brandData.ts`. Each entry has:

| Field        | Shows up as                                  |
| ------------ | -------------------------------------------- |
| `index`      | the small "01" number                        |
| `name`       | card title                                   |
| `sector`     | uppercase label under the title              |
| `hero`       | the giant headline metric + caption          |
| `stats[3]`   | the three-column numeric callout row         |
| `narrative`  | the paragraph                                |
| `agency`     | footer — Agency                              |
| `award`      | footer — Award                               |
| `reputation` | footer — Public opinion (italic)             |
| `image`      | filename in `/public/headwinds-infographics/`|

## Swapping an image

Drop a replacement into `public/headwinds-infographics/` and update the `image`
field. The images here are luminance-mapped duotones (shadows `#6c6962` →
midtones `#bbae9e` → highlights `#f3eae1`) at 1000×746, ~70–240 KB each.

## Data sources

All metrics are drawn from public disclosures, brand-value rankings (Interbrand,
Brand Finance), sustainability ratings (EcoVadis, MSCI, NRDC commentary) and
creative-award records (Cannes Lions, Red Dot, D.I.C.E., CASSIES). See the
accompanying brand research report for full citations.
