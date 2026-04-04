/**
 * Apply scraped images back into wishlists-data.ts
 *
 * Reads scripts/wishlist-images.json and updates the image fields
 * in components/wishlists/wishlists-data.ts.
 *
 * Usage:
 *   npx tsx scripts/apply-wishlist-images.ts
 */

import { readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const imagesPath = resolve(__dirname, "wishlist-images.json");
const dataPath = resolve(
  __dirname,
  "../components/wishlists/wishlists-data.ts"
);

const images: Record<string, string> = JSON.parse(
  readFileSync(imagesPath, "utf-8")
);

let source = readFileSync(dataPath, "utf-8");

let updated = 0;
for (const [url, imageUrl] of Object.entries(images)) {
  // Match:  url: "...<url>...",\n    image: "",
  // Replace image: "" with image: "<imageUrl>"
  const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `(url:\\s*"${escaped}"[^]*?image:\\s*)""`
  );

  if (pattern.test(source)) {
    source = source.replace(pattern, `$1"${imageUrl}"`);
    updated++;
  }
}

writeFileSync(dataPath, source);
console.log(`Updated ${updated}/${Object.keys(images).length} image fields in wishlists-data.ts`);
