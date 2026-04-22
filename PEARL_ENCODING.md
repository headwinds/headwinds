# Pearl Encoding

## Overview

Replace the text token format `[⚪pearl:83da1a44]` with a color-coded visual marker that machines can locate programmatically. The text format remains as a fallback for non-browser contexts.

## Encoding Scheme

An 8-character hex ID like `83da1a44` maps to a colored orb:

| Chars | Bits | Encodes |
|-------|------|---------|
| `83da1a` (1–6) | 24 bits / 16.7M values | Fill color `#83da1a` |
| `44` (7–8) | 8 bits / 256 values | Specular highlight brightness |

### Fill Color

The first 6 hex characters map 1:1 to an RGB color. This is the primary machine-readable signal — a DOM query or pixel sampler at the orb's center recovers the first 6 chars of the ID.

### Highlight Byte

The last 2 hex characters (0x00–0xFF) control the brightness of the pearl's specular highlight, mapped to a lightness range of 80%–95%. This encodes the remaining 8 bits without affecting the core fill color.

## Rendering

```tsx
interface PearlProps {
  id: string;
  size?: number;
  className?: string;
}

function Pearl({ id, size = 18, className = "" }: PearlProps) {
  const hex6 = id.slice(0, 6).padEnd(6, "0");
  const color = `#${hex6}`;

  const tailByte = parseInt(id.slice(6, 8) || "80", 16);
  const highlightLightness = 80 + (tailByte / 255) * 15;

  return (
    <span
      data-pearl={id}
      className={`inline-block align-middle rounded-full shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(
          circle at 35% 35%,
          hsl(0 0% ${highlightLightness}%) 0%,
          ${color} 50%,
          color-mix(in srgb, ${color}, black 30%) 100%
        )`,
        boxShadow: "0 0 0 1px rgba(0,0,0,0.08)",
      }}
      title={`pearl:${id}`}
    >
      <noscript>{`[⚪pearl:${id}]`}</noscript>
    </span>
  );
}
```

## Machine Retrieval

### DOM-based (lossless)

```js
// Find a specific pearl
document.querySelector('[data-pearl="83da1a44"]');

// Find all pearls
document.querySelectorAll('[data-pearl]');

// Read the ID
element.dataset.pearl; // "83da1a44"
```

### Vision-based (from screenshots)

1. Locate small circles with solid, non-background colors
2. Sample the center pixel → first 6 hex chars of the ID
3. Sample the highlight brightness → last 2 hex chars (lossy, approximate)

**Requirements for pixel-accurate retrieval:**
- The pearl center must be a flat solid color (gradients only at edges)
- Minimum 16–20px diameter with an 8–10px solid core
- Fully opaque (no alpha) — compositing against different backgrounds corrupts the RGB
- Avoid JPEG — use PNG or render in the DOM

## Text Fallback

For non-browser contexts (logs, emails, notes, markdown, CLI output), use the text token:

```
[⚪pearl:83da1a44]
```

### Utilities

```tsx
// Parse text token → ID
function parsePearlToken(text: string): string | null {
  const match = text.match(/\[⚪pearl:([0-9a-fA-F]+)\]/);
  return match ? match[1] : null;
}

// ID → text token
function pearlToText(id: string): string {
  return `[⚪pearl:${id}]`;
}
```

## Design Constraints

| Concern | Guidance |
|---------|----------|
| **Similar IDs** | `83da1a44` and `83da1b44` differ by one bit — visually near-identical. Pearls are for machine retrieval, not human differentiation. |
| **Accessibility** | Always include `title` or `aria-label` with the ID. Color alone is not accessible. |
| **Compression** | JPEG smears pixel colors. Prefer PNG for screenshots or rely on DOM retrieval. |
| **Background blending** | Keep pearls fully opaque. Alpha compositing changes the final RGB and breaks decoding. |
| **Reserved palette** | Consider reserving a saturation/hue range that the app's UI palette avoids, making pearl detection easier in automated scans. |
