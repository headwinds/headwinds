import fs from "node:fs/promises";
import path from "node:path";

const REPO_ROOT = path.resolve(__dirname, "..");
const OUTPUT_PATH = path.join(REPO_ROOT, "components/landing/insights-data.ts");

interface BrandSpec {
  id: string;
  label: string;
  whaleSpecies: string;
}

interface BrandMetrics {
  ceo: string;
  stock_price: string;
  latest_news: { title: string; url: string };
  sustainability: { title: string; url: string };
  spirit_whale: { name: string; species: string; fun_fact: string };
}

const BRANDS: BrandSpec[] = [
  { id: "nintendo", label: "Nintendo", whaleSpecies: "Humpback Whale" },
  { id: "bmw", label: "BMW", whaleSpecies: "Blue Whale" },
  { id: "ea-sports", label: "EA Sports", whaleSpecies: "Orca" },
  { id: "lexmark", label: "Lexmark", whaleSpecies: "Sperm Whale" },
  { id: "mitsubishi", label: "Mitsubishi", whaleSpecies: "Fin Whale" },
  { id: "home-depot", label: "The Home Depot", whaleSpecies: "Grey Whale" },
  { id: "bacardi", label: "Bacardi", whaleSpecies: "Humpback Whale" },
  { id: "microsoft", label: "Microsoft", whaleSpecies: "Blue Whale" },
  { id: "huggies", label: "Huggies", whaleSpecies: "Beluga Whale" },
  { id: "chase", label: "Chase Manhattan", whaleSpecies: "Sperm Whale" },
  { id: "labatt", label: "Labatt", whaleSpecies: "Orca" },
  { id: "td-bank", label: "TD Bank", whaleSpecies: "Grey Whale" },
];

const SYSTEM_PROMPT =
  "You return concise, factual portfolio data with trustworthy citations. Return only JSON.";

function buildPrompt(brand: BrandSpec): string {
  return `Return ONLY valid JSON (no markdown) with fields for ${brand.label}: { "ceo": "current CEO full name", "stock_price": "current stock price with currency symbol, or 'Private'", "latest_news": { "title": "recent headline", "url": "https URL" }, "sustainability": { "title": "recent sustainability/ESG headline", "url": "https URL" }, "spirit_whale": { "name": "a real named individual ${brand.whaleSpecies}", "species": "${brand.whaleSpecies}", "fun_fact": "one sentence fun fact" } }`;
}

function parseMetrics(answer: string): BrandMetrics | null {
  try {
    const cleaned = answer.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start === -1 || end === -1) return null;
    const candidate = cleaned.slice(start, end + 1);
    const normalized = candidate
      .replace(/[\u201c\u201d]/g, '"')
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/,\s*([}\]])/g, "$1");
    const parsed = JSON.parse(normalized) as BrandMetrics;
    if (
      !parsed?.ceo ||
      !parsed?.stock_price ||
      !parsed?.latest_news?.title ||
      !parsed?.latest_news?.url ||
      !parsed?.sustainability?.title ||
      !parsed?.sustainability?.url ||
      !parsed?.spirit_whale?.name ||
      !parsed?.spirit_whale?.species ||
      !parsed?.spirit_whale?.fun_fact
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

async function fetchFromPerplexity(prompt: string): Promise<string | null> {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) return null;

  const res = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "sonar-pro",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Perplexity error ${res.status}: ${text}`);
  }

  const data = await res.json();
  const answer = data?.choices?.[0]?.message?.content;
  return typeof answer === "string" ? answer : null;
}

async function fetchFromSummarize(prompt: string): Promise<string | null> {
  const summarizeUrl =
    process.env.SCOUT_SUMMARIZE_URL ||
    process.env.SCOUT_SUMMARY_API_URL_PROD ||
    process.env.SCOUT_SUMMARIZE_API_URL ||
    "http://127.0.0.1:5004";

  const res = await fetch(`${summarizeUrl}/api/perplexity/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt,
      personality: "default",
      system_override: SYSTEM_PROMPT,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Summarize error ${res.status}: ${text}`);
  }

  const data = await res.json();
  const answer =
    (typeof data.answer === "string" && data.answer) ||
    (typeof data.response === "string" && data.response) ||
    null;

  return answer;
}

async function fetchMetrics(brand: BrandSpec): Promise<BrandMetrics> {
  let prompt = buildPrompt(brand);

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    let answer: string | null = null;

    try {
      answer = await fetchFromSummarize(prompt);
    } catch (err) {
      if (attempt === 1) {
        console.warn(`[${brand.id}] summarize unavailable:`, err);
      }
    }

    if (!answer) {
      answer = await fetchFromPerplexity(prompt);
    }

    const parsed = answer ? parseMetrics(answer) : null;
    if (parsed) {
      return parsed;
    }

    prompt = `${buildPrompt(brand)} Return strictly RFC8259 JSON only with no prose, comments, or markdown.`;
    console.warn(`[${brand.id}] parse failed on attempt ${attempt}, retrying...`);
  }

  throw new Error(`Unable to parse metrics for ${brand.id} after retries`);
}

function toTsFile(data: Record<string, BrandMetrics>): string {
  const header = `export interface BrandMetrics {\n  ceo: string;\n  stock_price: string;\n  latest_news: { title: string; url: string };\n  sustainability: { title: string; url: string };\n  spirit_whale: { name: string; species: string; fun_fact: string };\n}\n\n`;
  const generatedNote = "// Generated by scripts/generate-brand-insights.ts\n";
  const body = `export const brandInsightsData: Record<string, BrandMetrics> = ${JSON.stringify(data, null, 2)};\n`;
  return `${header}${generatedNote}${body}`;
}

async function main() {
  const result: Record<string, BrandMetrics> = {};

  for (const brand of BRANDS) {
    console.log(`Generating insights for ${brand.label}...`);
    result[brand.id] = await fetchMetrics(brand);
  }

  const fileText = toTsFile(result);
  await fs.writeFile(OUTPUT_PATH, fileText, "utf8");
  console.log(`Wrote ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
