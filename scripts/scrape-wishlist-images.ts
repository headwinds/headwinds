/**
 * Scrape brand images for wishlist items.
 *
 * Fetches each wishlist URL and extracts the best available brand image
 * using a priority cascade:
 *   1. og:image (Open Graph)
 *   2. twitter:image (Twitter Card)
 *   3. apple-touch-icon
 *   4. Largest PNG favicon
 *   5. /favicon.ico fallback
 *
 * Usage:
 *   pnpm add -D cheerio tsx          # one-time setup
 *   npx tsx scripts/scrape-wishlist-images.ts
 *
 * Output:
 *   - Writes scripts/wishlist-images.json  (url → imageUrl map)
 *   - Logs failures to scripts/wishlist-scrape-errors.json
 */

import * as cheerio from "cheerio";
import { writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { wishlistItems } from "../components/wishlists/wishlists-data";

const __dirname = dirname(fileURLToPath(import.meta.url));

const DELAY_MS = 1500;
const TIMEOUT_MS = 10_000;
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Resolve a potentially relative URL against the page's origin. */
function toAbsolute(href: string, pageUrl: string): string {
  try {
    return new URL(href, pageUrl).href;
  } catch {
    return href;
  }
}

/** Extract the best image URL from an HTML page. */
function extractImage(html: string, pageUrl: string): string | null {
  const $ = cheerio.load(html);

  // 1. og:image
  const og =
    $('meta[property="og:image"]').attr("content") ||
    $('meta[name="og:image"]').attr("content");
  if (og) return toAbsolute(og, pageUrl);

  // 2. twitter:image
  const tw =
    $('meta[name="twitter:image"]').attr("content") ||
    $('meta[property="twitter:image"]').attr("content");
  if (tw) return toAbsolute(tw, pageUrl);

  // 3. apple-touch-icon
  const apple = $('link[rel="apple-touch-icon"]').attr("href");
  if (apple) return toAbsolute(apple, pageUrl);

  // 4. Largest PNG favicon
  let bestIcon: { href: string; size: number } | null = null;
  $('link[rel="icon"][type="image/png"]').each((_, el) => {
    const href = $(el).attr("href");
    const sizes = $(el).attr("sizes"); // e.g. "192x192"
    if (href) {
      const size = sizes ? parseInt(sizes.split("x")[0], 10) : 0;
      if (!bestIcon || size > bestIcon.size) {
        bestIcon = { href, size };
      }
    }
  });
  if (bestIcon) return toAbsolute((bestIcon as { href: string }).href, pageUrl);

  // 5. Any favicon link
  const favicon =
    $('link[rel="icon"]').attr("href") ||
    $('link[rel="shortcut icon"]').attr("href");
  if (favicon) return toAbsolute(favicon, pageUrl);

  return null;
}

async function scrapeOne(
  url: string
): Promise<{ image: string | null; error?: string }> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      redirect: "follow",
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!res.ok) {
      return { image: null, error: `HTTP ${res.status}` };
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      // If not HTML, try /favicon.ico as a fallback
      const origin = new URL(url).origin;
      return { image: `${origin}/favicon.ico` };
    }

    const html = await res.text();
    const image = extractImage(html, url);

    if (!image) {
      const origin = new URL(url).origin;
      return { image: `${origin}/favicon.ico` };
    }

    return { image };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { image: null, error: message };
  }
}

async function main() {
  const results: Record<string, string> = {};
  const errors: Record<string, string> = {};

  // Deduplicate URLs
  const uniqueItems = Array.from(
    new Map(wishlistItems.map((item) => [item.url, item])).values()
  );

  console.log(`Scraping ${uniqueItems.length} unique URLs...\n`);

  for (let i = 0; i < uniqueItems.length; i++) {
    const item = uniqueItems[i];
    const progress = `[${i + 1}/${uniqueItems.length}]`;

    process.stdout.write(`${progress} ${item.name}... `);

    const { image, error } = await scrapeOne(item.url);

    if (image) {
      results[item.url] = image;
      console.log(`✓ ${image.slice(0, 80)}`);
    } else {
      errors[item.url] = error || "No image found";
      console.log(`✗ ${error}`);
    }

    if (i < uniqueItems.length - 1) {
      await sleep(DELAY_MS);
    }
  }

  // Write outputs
  const outDir = resolve(__dirname, ".");
  const resultsPath = resolve(outDir, "wishlist-images.json");
  const errorsPath = resolve(outDir, "wishlist-scrape-errors.json");

  writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\n✓ Wrote ${Object.keys(results).length} images → ${resultsPath}`);

  if (Object.keys(errors).length > 0) {
    writeFileSync(errorsPath, JSON.stringify(errors, null, 2));
    console.log(
      `✗ ${Object.keys(errors).length} failures → ${errorsPath}`
    );
  }

  console.log("\nDone! To apply images to wishlists-data.ts, run:");
  console.log("  npx tsx scripts/apply-wishlist-images.ts");
}

main().catch(console.error);
