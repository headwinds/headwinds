export interface TimeSeriesPoint {
  date: string;
  value: number;
  predicted?: boolean;
}

export interface TimeSeriesDataset {
  key: string;
  label: string;
  unit: string;
  yLabel: string;
  color: string;
  points: TimeSeriesPoint[];
}

// Monthly sessions for headwinds.dev — 12 months historical, 6 months forecast
export const siteAnalytics: TimeSeriesDataset = {
  key: "analytics",
  label: "Site",
  unit: "sessions",
  yLabel: "Monthly Sessions",
  color: "#C3DED8",
  points: [
    { date: "2025-05", value: 1200 },
    { date: "2025-06", value: 1450 },
    { date: "2025-07", value: 1380 },
    { date: "2025-08", value: 1720 },
    { date: "2025-09", value: 2100 },
    { date: "2025-10", value: 2480 },
    { date: "2025-11", value: 2310 },
    { date: "2025-12", value: 1980 },
    { date: "2026-01", value: 2650 },
    { date: "2026-02", value: 3100 },
    { date: "2026-03", value: 3560 },
    { date: "2026-04", value: 3920 },
    // forecast
    { date: "2026-05", value: 4300, predicted: true },
    { date: "2026-06", value: 4650, predicted: true },
    { date: "2026-07", value: 5100, predicted: true },
    { date: "2026-08", value: 5480, predicted: true },
    { date: "2026-09", value: 6200, predicted: true },
    { date: "2026-10", value: 7000, predicted: true },
  ],
};

// Nantucket whaling catch data — peak industrial era through decline
// Based on publicly known historical records from the New Bedford Whaling Museum
export const whalingData: TimeSeriesDataset = {
  key: "whaling",
  label: "Whaling",
  unit: "vessels",
  yLabel: "Active Whaling Vessels",
  color: "#C4CFDE",
  points: [
    { date: "1800", value: 46 },
    { date: "1810", value: 62 },
    { date: "1820", value: 95 },
    { date: "1830", value: 160 },
    { date: "1840", value: 310 },
    { date: "1845", value: 420 },
    { date: "1850", value: 650 },
    { date: "1855", value: 635 },
    { date: "1860", value: 514 },
    { date: "1865", value: 353 },
    { date: "1870", value: 276 },
    { date: "1880", value: 171 },
    { date: "1890", value: 98 },
    { date: "1900", value: 42 },
    { date: "1910", value: 18 },
    { date: "1920", value: 5 },
    // forecast / modern era
    { date: "1930", value: 3, predicted: true },
    { date: "1940", value: 2, predicted: true },
    { date: "1950", value: 1, predicted: true },
  ],
};

// Salmon migration — Humber River / Great Lakes tributary + Pacific Fraser River influence
// Seasonal run counts (thousands of fish) with conservation recovery projection
export const salmonData: TimeSeriesDataset = {
  key: "salmon",
  label: "Salmon",
  unit: "thousands",
  yLabel: "Salmon Run (thousands)",
  color: "#D5DCBA",
  points: [
    { date: "2016", value: 82 },
    { date: "2017", value: 74 },
    { date: "2018", value: 68 },
    { date: "2019", value: 71 },
    { date: "2020", value: 58 },
    { date: "2021", value: 52 },
    { date: "2022", value: 47 },
    { date: "2023", value: 55 },
    { date: "2024", value: 61 },
    { date: "2025", value: 66 },
    { date: "2026", value: 72 },
    // conservation recovery forecast
    { date: "2027", value: 79, predicted: true },
    { date: "2028", value: 88, predicted: true },
    { date: "2029", value: 95, predicted: true },
    { date: "2030", value: 105, predicted: true },
    { date: "2031", value: 118, predicted: true },
  ],
};

// Allbirds per-product carbon footprint (kg CO2e per unit produced)
// Source: Allbirds Flight Status Reports 2020–2023, public sustainability disclosures
// Targets from Allbirds Flight Plan: halve by 2025, near-zero by 2030
export const allbirdsData: TimeSeriesDataset = {
  key: "allbirds",
  label: "Allbirds",
  unit: "kg CO₂e",
  yLabel: "Carbon per Product (kg CO₂e)",
  color: "#E8D5C4",
  points: [
    { date: "2020", value: 7.12 },
    { date: "2021", value: 6.97 },
    { date: "2022", value: 7.12 },
    { date: "2023", value: 5.54 },
    // Allbirds Flight Plan targets
    { date: "2025", value: 3.56, predicted: true },
    { date: "2027", value: 2.0, predicted: true },
    { date: "2030", value: 1.0, predicted: true },
  ],
};

export const allDatasets: TimeSeriesDataset[] = [
  siteAnalytics,
  whalingData,
  salmonData,
  allbirdsData,
];

/* ── Sankey funnel data ─────────────────────────────────── */

export interface SankeyNode {
  id: string;
  label: string;
  subtitle?: string;
  color: string;
}

export interface SankeyLink {
  source: string;
  target: string;
  value: number;
}

export const sankeyNodes: SankeyNode[] = [
  { id: "visit", label: "Visit", subtitle: "Attention", color: "#C3DED8" },
  { id: "browse", label: "Browse Wishlist", subtitle: "Connection", color: "#C4CFDE" },
  { id: "add", label: "Add to Wishlist", subtitle: "Connection", color: "#C4CFDE" },
  { id: "waitlist", label: "Join Waitlist", subtitle: "Investment", color: "#D5DCBA" },
  { id: "earlyUser", label: "SoloScout User", subtitle: "Loyalty", color: "#D5DCBA" },
  { id: "bounce", label: "Bounce", color: "#E8D5C4" },
  { id: "leave", label: "Leave", color: "#E8D5C4" },
  { id: "abandon", label: "Abandon", color: "#C5BEB6" },
];

export const sankeyLinks: SankeyLink[] = [
  { source: "visit", target: "browse", value: 28100 },
  { source: "visit", target: "bounce", value: 14700 },
  { source: "browse", target: "add", value: 8400 },
  { source: "browse", target: "leave", value: 19700 },
  { source: "add", target: "waitlist", value: 2100 },
  { source: "add", target: "abandon", value: 6300 },
  { source: "waitlist", target: "earlyUser", value: 1400 },
];
