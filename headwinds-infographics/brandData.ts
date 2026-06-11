// brandData.ts
// Feltron-style data model for the 12 Headwinds brand infographics.
// Each brand card combines headline metrics, a "stat row" of numeric callouts,
// a short narrative, and a duotone photograph (cream/taupe palette).
// All figures sourced from the Phase-1 research report (see /sources in each entry).

export interface BrandStat {
  /** Large numeric value, e.g. "−40%" or "436,456" */
  value: string;
  /** Caption under the value */
  label: string;
}

export interface BrandInfographic {
  id: string;
  /** Display name shown as the card title */
  name: string;
  /** Sector / one-line descriptor */
  sector: string;
  /** Two-digit index shown Feltron-style, e.g. "01" */
  index: string;
  /** Agency on record */
  agency: string;
  /** Notable award */
  award: string;
  /** The hero metric — single most striking number */
  hero: BrandStat;
  /** 3 supporting numeric callouts */
  stats: BrandStat[];
  /** Short narrative emphasising forest/water conservation + any tension */
  narrative: string;
  /** Public-opinion / reputation pull-quote stat */
  reputation: string;
  /** Filename of the duotone photograph (in /public/headwinds-infographics/) */
  image: string;
  /** Alt text for the photograph */
  imageAlt: string;
}

export const BRANDS: BrandInfographic[] = [
  {
    id: "mitsubishi",
    name: "Mitsubishi",
    sector: "Automotive & Electric",
    index: "01",
    agency: "BBDO / Dentsu (regional)",
    award: "Red Dot Grand Prix 2016",
    hero: { value: "−40%", label: "Scope 1+2 CO₂ vs 2018 baseline" },
    stats: [
      { value: "75–79%", label: "Wastewater recycled (TH/ID plants)" },
      { value: "#1", label: "US mass-market customer experience, 2023" },
      { value: "Pajero", label: "& Outlander forest programs" },
    ],
    narrative:
      "Cut direct and energy emissions 40% against a 2018 baseline while recycling up to 79% of wastewater at Thai and Indonesian plants. Forest-restoration ties run through its Pajero and Outlander heritage programs.",
    reputation: "Ranked #1 US mass-market brand for customer experience (Reputation, 2023).",
    image: "mitsubishi.jpg",
    imageAlt: "Duotone photograph of a mountain forest road for Mitsubishi",
  },
  {
    id: "ea-sports",
    name: "EA Sports",
    sector: "Interactive Entertainment",
    index: "02",
    agency: "Uncommon Creative Studio",
    award: "Cannes Lions Grand Prix 2023",
    hero: { value: "$52.5B", label: "Take-private acquisition" },
    stats: [
      { value: "83%", label: "Carbon-neutral operations" },
      { value: "95%", label: "Renewable electricity" },
      { value: "2×", label: '"Worst Company in America" (2012/13)' },
    ],
    narrative:
      "FIFA 23 × Ted Lasso took the Cannes Lions Grand Prix in 2023. Operations run 83% carbon-neutral on 95% renewable power — a reputational rebuild after two consecutive 'Worst Company in America' titles.",
    reputation: "Twice voted 'Worst Company in America' (2012, 2013) by Consumerist readers.",
    image: "ea-sports.jpg",
    imageAlt: "Duotone photograph of a floodlit stadium pitch for EA Sports",
  },
  {
    id: "lexmark",
    name: "Lexmark",
    sector: "Imaging & Print",
    index: "03",
    agency: "In-house brand studio",
    award: "EcoVadis Platinum (4 yrs, top 1%)",
    hero: { value: "436,456", label: "Trees planted via PrintReleaf" },
    stats: [
      { value: "−75%", label: "Water use since 2005" },
      { value: "−40%", label: "Water withdrawal since 2015" },
      { value: "Xerox", label: "Acquired July 2025" },
    ],
    narrative:
      "Reforested 436,456 trees through PrintReleaf and cut water use 75% since 2005. Four straight years of EcoVadis Platinum places it in the top 1% of assessed companies before its 2025 Xerox acquisition.",
    reputation: "EcoVadis Platinum sustainability rating four years running — top 1% globally.",
    image: "lexmark.jpg",
    imageAlt: "Duotone photograph of a reforested tree stand for Lexmark",
  },
  {
    id: "labatt",
    name: "Labatt",
    sector: "Brewing (AB InBev)",
    index: "04",
    agency: "Anomaly / FCB Canada",
    award: "Cannes Creative Marketer 2022/23/26",
    hero: { value: "−46%", label: "Water use per hectolitre since 2006" },
    stats: [
      { value: "350K+", label: "Emergency water cans donated" },
      { value: "2026", label: "UTRCA watershed partnership" },
      { value: "13×", label: "Canada Top 100 Employer" },
    ],
    narrative:
      "Reduced brewing water intensity 46% since 2006 and donated 350,000+ cans of emergency drinking water. A 2026 partnership with the Upper Thames River Conservation Authority targets watershed restoration.",
    reputation: "Named one of Canada's Top 100 Employers thirteen times.",
    image: "labatt.jpg",
    imageAlt: "Duotone photograph of a flowing river watershed for Labatt",
  },
  {
    id: "home-depot",
    name: "Home Depot",
    sector: "Specialty Retail",
    index: "05",
    agency: "The Richards Group / 22squared",
    award: "Fortune #1 Specialty Retail 2024",
    hero: { value: "134B gal", label: "Water saved per year via WaterSense (FY24)" },
    stats: [
      { value: "250B gal", label: "Cumulative water saved" },
      { value: "30+ yrs", label: "Wood-purchasing forestry policy" },
      { value: "70%", label: "Net-positive public opinion (YouGov)" },
    ],
    narrative:
      "WaterSense products saved an estimated 134 billion gallons in FY24 (250B cumulative) and a 30-year forestry policy favours FSC/SFI-certified wood — though the NRDC continues to press it on boreal sourcing.",
    reputation: "98% familiarity and 70% positive sentiment in YouGov polling.",
    image: "home-depot.jpg",
    imageAlt: "Duotone photograph of stacked timber lumber for Home Depot",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    sector: "Technology",
    index: "06",
    agency: "McCann / m:united",
    award: "Cannes Creative Marketer 2021",
    hero: { value: "425,000", label: "Acres of forestland protected" },
    stats: [
      { value: "2030", label: "Water-positive commitment" },
      { value: "76", label: "Water replenishment projects" },
      { value: "$388.5B", label: "#2 global brand (Interbrand)" },
    ],
    narrative:
      "Protecting 425,000+ acres of forestland and targeting water-positive operations by 2030 — with zero-water datacenter cooling launched in 2024 across 76 replenishment projects. MSCI rates it AAA.",
    reputation: "World's #2 brand at $388.5B brand value (Interbrand).",
    image: "microsoft.jpg",
    imageAlt: "Duotone photograph of a misty old-growth forest for Microsoft",
  },
  {
    id: "bmw",
    name: "BMW",
    sector: "Automotive",
    index: "07",
    agency: "Serviceplan / Goodby Silverstein",
    award: "Interbrand Top 10 Global Brand 2024",
    hero: { value: "15.9M gal", label: "Water saved at Spartanburg (2023)" },
    stats: [
      { value: "2021", label: "CO₂-neutral production since" },
      { value: "1.78 m³", label: "Water per vehicle produced" },
      { value: "1.53M", label: "Vehicle brake recall, 2024" },
    ],
    narrative:
      "Production has been CO₂-neutral since 2021 and a 2023 reverse-osmosis upgrade saved 15.9 million gallons at Spartanburg, down to 1.78 m³ of water per vehicle — alongside a new 2024 Biodiversity Policy.",
    reputation: "Slipped from Interbrand #10 (2024) to #14 (2025) amid a 1.53M-vehicle recall.",
    image: "bmw.jpg",
    imageAlt: "Duotone photograph of a winding alpine highway for BMW",
  },
  {
    id: "bacardi",
    name: "Bacardi",
    sector: "Spirits",
    index: "08",
    agency: "BBDO / Anomaly",
    award: "WHC Silver — UK spirits first",
    hero: { value: "66,370", label: "Trees planted at Charco Bendito" },
    stats: [
      { value: "2030", label: "Water-positive commitment" },
      { value: "−50%", label: "Water use over 10 years" },
      { value: "380K m³", label: "Water replenished" },
    ],
    narrative:
      "The Charco Bendito project planted 66,370 trees, restored 155 hectares and replenished 380,000+ m³ of water. Bombay Sapphire became the first UK spirits site to earn Wildlife Habitat Council Silver.",
    reputation: "Ranked #10 most valuable spirits brand at $2.4B (Brand Finance).",
    image: "bacardi.jpg",
    imageAlt: "Duotone photograph of a tropical spring and pool for Bacardi",
  },
  {
    id: "huggies",
    name: "Huggies",
    sector: "Consumer Goods (K-C)",
    index: "09",
    agency: "Ogilvy / VML",
    award: "CASSIES Grand Prix",
    hero: { value: "100%", label: "Natural-Forest-Free ambition (2024)" },
    stats: [
      { value: "−39%", label: "Forest fibre use" },
      { value: "−52.8%", label: "Water at stressed mills" },
      { value: "2030", label: "Water target met early" },
    ],
    narrative:
      "Set a 100% Natural-Forest-Free fibre ambition in 2024 — praised by the NRDC — cutting forest fibre 39% and surpassing its 2030 water target early with a 52.8% reduction at water-stressed mills.",
    reputation: "NAD struck down its '#1 Best Fitting' claim in 2024.",
    image: "huggies.jpg",
    imageAlt: "Duotone photograph of soft folded textile fibres for Huggies",
  },
  {
    id: "nintendo",
    name: "Nintendo",
    sector: "Interactive Entertainment",
    index: "10",
    agency: "Leo Burnett / in-house",
    award: "D.I.C.E. + Japan Game Award 2024",
    hero: { value: "$15.4B", label: "Brand value, +35% (Interbrand #53)" },
    stats: [
      { value: "2050", label: "Net-zero commitment" },
      { value: "ISO 14001", label: "Environmental certification" },
      { value: "Jun 2025", label: "Switch 2 launch" },
    ],
    narrative:
      "Brand value jumped 35% to $15.4B as Zelda: Tears of the Kingdom swept the 2024 awards. ISO 14001-certified with a 2050 net-zero pledge, though it sets no specific forest or water targets.",
    reputation: "Climbed to Interbrand #53 globally — one of the fastest risers of 2024.",
    image: "nintendo.jpg",
    imageAlt: "Duotone photograph of a playful arcade light pattern for Nintendo",
  },
  {
    id: "chase",
    name: "Chase",
    sector: "Financial Services (JPMorgan)",
    index: "11",
    agency: "Droga5",
    award: "J.P. Morgan — Interbrand #26",
    hero: { value: "$1T", label: "Climate finance target by 2030" },
    stats: [
      { value: "$2.5T", label: "Sustainable finance by 2030" },
      { value: "$53.5B", label: "Fossil-fuel financing, 2024" },
      { value: "#1", label: "Global fossil-fuel financier" },
    ],
    narrative:
      "Committed $1T to climate and $2.5T to sustainable finance by 2030 — yet remained the world's #1 fossil-fuel financier at $53.5B in 2024, the central tension in its environmental record.",
    reputation: "J.P. Morgan brand valued at $29.2B, Interbrand #26.",
    image: "chase.jpg",
    imageAlt: "Duotone photograph of a glass financial skyline for Chase",
  },
  {
    id: "td-bank",
    name: "TD Bank",
    sector: "Financial Services",
    index: "12",
    agency: "Leo Burnett Canada",
    award: "Brand Finance #1 Canadian brand (3 yrs)",
    hero: { value: "350,000", label: "Acres of boreal forest conserved" },
    stats: [
      { value: "$10M", label: "Boreal Wildlands investment" },
      { value: "1M trees", label: "TD Tree Days target by 2030" },
      { value: "#1", label: "Global tar-sands financier" },
    ],
    narrative:
      "Funded Canada's largest private conservation — 350,000+ acres of boreal forest via the NCC — while remaining the world's #1 tar-sands financier, a contradiction sharpened by a 2024 AML guilty plea.",
    reputation: "Brand Finance's #1 Canadian brand three years running.",
    image: "td-bank.jpg",
    imageAlt: "Duotone photograph of a vast boreal forest from above for TD Bank",
  },
];
