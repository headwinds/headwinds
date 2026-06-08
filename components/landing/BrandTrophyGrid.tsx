"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

const SPRITE_URL = "/headwinds_trophies.png";
const COLS = 4;
const ROWS = 3;

export type BrandId =
  | "nintendo"
  | "bmw"
  | "ea-sports"
  | "lexmark"
  | "mitsubishi"
  | "home-depot"
  | "bacardi"
  | "microsoft"
  | "huggies"
  | "chase"
  | "labatt"
  | "td-bank";

interface BrandMeta {
  id: BrandId;
  label: string;
  col: number;
  row: number;
  role: string;
  desc: string;
  tech: string;
  route?: string;
  whaleSpecies: string;
  nudgeX?: number;
  nudgeY?: number;
}

interface BrandMetrics {
  ceo: string;
  stock_price: string;
  latest_news: { title: string; url: string };
  sustainability: { title: string; url: string };
  spirit_whale: { name: string; species: string; fun_fact: string };
}

const BRANDS: BrandMeta[] = [
  {
    id: "nintendo", label: "Nintendo", col: 0, row: 0,
    role: "Fullstack Developer",
    desc: "Wii Fitness combined a console game with a physical device. We built an instructional video-based website to teach players exercises and track their progress.",
    tech: "Flash AS3",
    route: "/projects/nintendo",
    whaleSpecies: "Humpback Whale",
    nudgeX: 2, nudgeY: 1.8,
  },
  {
    id: "bmw", label: "BMW", col: 1, row: 0,
    role: "UI Developer",
    desc: "Pick and choose parts for your new BMW and watch the car instantly change to reflect your personal style. The configuration gets sent to find an appropriate dealer or manufacturer.",
    tech: "JavaScript · Backbone",
    route: "/projects/bmw",
    whaleSpecies: "Blue Whale",
    nudgeX: 1.3, nudgeY: 2.3,
  },
  {
    id: "ea-sports", label: "EA Sports", col: 2, row: 0,
    role: "UI Developer",
    desc: "Built interactive promotional experiences for EA Sports titles, working on front-end UI and animation.",
    tech: "Flash AS3",
    whaleSpecies: "Orca",
    nudgeX: 0.4, nudgeY: 1.8,
  },
  {
    id: "lexmark", label: "Lexmark", col: 3, row: 0,
    role: "UI Developer",
    desc: "Developed enterprise web applications for Lexmark's printing and imaging solutions platform.",
    tech: "JavaScript",
    whaleSpecies: "Sperm Whale",
    nudgeX: 1.2, nudgeY: 1.6,
  },
  {
    id: "mitsubishi", label: "Mitsubishi", col: 0, row: 1,
    role: "UI Developer",
    desc: "Lancer Earth — an around the world tour featuring the Mitsubishi Lancer. This FWA award-winning experience showcased incredible 3D video from one of the artists behind The Matrix.",
    tech: "Flash AS3",
    route: "/projects/mitsubishi",
    whaleSpecies: "Fin Whale",
    nudgeX: 1.2, nudgeY: 3.3,
  },
  {
    id: "home-depot", label: "The Home Depot", col: 1, row: 1,
    role: "UI Developer",
    desc: "Built interactive tools for The Home Depot's digital experience, helping customers explore products and plan projects online.",
    tech: "JavaScript",
    whaleSpecies: "Grey Whale",
    nudgeX: 1, nudgeY: 3.7,
  },
  {
    id: "bacardi", label: "Bacardí", col: 2, row: 1,
    role: "UI Developer",
    desc: "A 360° video after-party experience in a Manhattan apartment. Users explore in first person, discovering mini games and novelty items that pull content from their Facebook profile.",
    tech: "Flash AS3 · Facebook API",
    route: "/projects/bacardi",
    whaleSpecies: "Humpback Whale",
    nudgeX: 0.8, nudgeY: 7.9,
  },
  {
    id: "microsoft", label: "Microsoft", col: 3, row: 1,
    role: "UI Developer",
    desc: "A global real-time quiz contest promoting the MSN Search Toolbar v2, played over 4 weeks with up to 12 million users. Built with SHA-256 encryption in French and English.",
    tech: "Flash AS2 · ASP.NET",
    route: "/projects/microsoft",
    whaleSpecies: "Blue Whale",
    nudgeX: 1.3, nudgeY: 2.5,
  },
  {
    id: "huggies", label: "Huggies", col: 0, row: 2,
    role: "UI Developer",
    desc: "Created engaging digital experiences for the Huggies brand, focused on connecting with new parents through interactive content.",
    tech: "Flash AS2",
    whaleSpecies: "Beluga Whale",
    nudgeX: 1.1, nudgeY: 3.1,
  },
  {
    id: "chase", label: "Chase Manhattan", col: 1, row: 2,
    role: "UI Developer",
    desc: "Developed interactive financial tools and promotional web experiences for Chase Manhattan's digital banking platform.",
    tech: "Flash AS2",
    whaleSpecies: "Sperm Whale",
    nudgeX: 1, nudgeY: 4,
  },
  {
    id: "labatt", label: "Labatt", col: 2, row: 2,
    role: "Designer & Developer",
    desc: "Designed and developed a loyalty program app for Labatt to monitor beer enthusiasts and reward them with events and special prizes.",
    tech: "Flash AS2",
    route: "/projects/labatt",
    whaleSpecies: "Orca",
    nudgeX: 0, nudgeY: 4,
  },
  {
    id: "td-bank", label: "TD Bank", col: 3, row: 2,
    role: "UI Developer",
    desc: "Built interactive digital banking tools and promotional experiences for TD Bank's online platform.",
    tech: "JavaScript",
    whaleSpecies: "Grey Whale",
    nudgeX: 1.3, nudgeY: 2,
  },
];

const brandMap = new Map(BRANDS.map((b) => [b.id, b]));

export function getBrand(id: BrandId): BrandMeta | undefined {
  return brandMap.get(id);
}

// ---------------------------------------------------------------------------
// Single logo sprite
// ---------------------------------------------------------------------------

interface BrandTrophyProps {
  brandId: BrandId;
  className?: string;
  nudgeOverride?: { x: number; y: number };
}

export function BrandTrophy({ brandId, className = "", nudgeOverride }: BrandTrophyProps) {
  const brand = brandMap.get(brandId);
  if (!brand) return null;

  const nx = nudgeOverride ? nudgeOverride.x : (brand.nudgeX ?? 0);
  const ny = nudgeOverride ? nudgeOverride.y : (brand.nudgeY ?? 0);
  const xPct = (COLS > 1 ? (brand.col / (COLS - 1)) * 100 : 0) + nx;
  const yPct = (ROWS > 1 ? (brand.row / (ROWS - 1)) * 100 : 0) + ny;

  return (
    <div
      className={`relative w-full h-full ${className}`}
      role="img"
      aria-label={brand.label}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${SPRITE_URL})`,
          backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
          backgroundPosition: `${xPct}% ${yPct}%`,
          backgroundRepeat: "no-repeat",
          filter: "brightness(1.3)",
          mixBlendMode: "multiply",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgb(188, 174, 158)",
          mixBlendMode: "lighten",
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Localhost-only sprite calibration tool
// ---------------------------------------------------------------------------

function SpriteCalibrator() {
  const [isLocal, setIsLocal] = useState(false);
  const [nudges, setNudges] = useState<Record<BrandId, { x: number; y: number }>>(() => {
    const init: Record<string, { x: number; y: number }> = {};
    for (const b of BRANDS) init[b.id] = { x: b.nudgeX ?? 0, y: b.nudgeY ?? 0 };
    return init as Record<BrandId, { x: number; y: number }>;
  });
  const [showPanel, setShowPanel] = useState(true);
  const dragRef = useRef<{
    brandId: BrandId;
    startX: number;
    startY: number;
    startNudgeX: number;
    startNudgeY: number;
    containerW: number;
    containerH: number;
  } | null>(null);

  useEffect(() => {
    setIsLocal(
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    );
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, brandId: BrandId, container: HTMLDivElement) => {
      e.preventDefault();
      e.stopPropagation();
      const rect = container.getBoundingClientRect();
      dragRef.current = {
        brandId,
        startX: e.clientX,
        startY: e.clientY,
        startNudgeX: nudges[brandId].x,
        startNudgeY: nudges[brandId].y,
        containerW: rect.width,
        containerH: rect.height,
      };
    },
    [nudges]
  );

  useEffect(() => {
    if (!isLocal) return;

    const handleMouseMove = (e: MouseEvent) => {
      const d = dragRef.current;
      if (!d) return;
      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;
      const nudgeDx = -(dx * 100) / ((COLS - 1) * d.containerW);
      const nudgeDy = -(dy * 100) / ((ROWS - 1) * d.containerH);
      setNudges((prev) => ({
        ...prev,
        [d.brandId]: {
          x: Math.round((d.startNudgeX + nudgeDx) * 10) / 10,
          y: Math.round((d.startNudgeY + nudgeDy) * 10) / 10,
        },
      }));
    };

    const handleMouseUp = () => {
      dragRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isLocal]);

  const resetAll = useCallback(() => {
    const init: Record<string, { x: number; y: number }> = {};
    for (const b of BRANDS) init[b.id] = { x: 0, y: 0 };
    setNudges(init as Record<BrandId, { x: number; y: number }>);
  }, []);

  const copyValues = useCallback(() => {
    const lines = BRANDS.filter((b) => nudges[b.id].x !== 0 || nudges[b.id].y !== 0)
      .map((b) => `  "${b.id}": nudgeX: ${nudges[b.id].x}, nudgeY: ${nudges[b.id].y}`)
      .join("\n");
    navigator.clipboard.writeText(lines || "(all zeroed)");
  }, [nudges]);

  if (!isLocal) return null;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setShowPanel((v) => !v)}
          className="text-[11px] font-mono font-bold tracking-wider text-orange-700 bg-orange-100 px-3 py-1 rounded-full"
        >
          {showPanel ? "HIDE" : "SHOW"} SPRITE CALIBRATOR
        </button>
      </div>

      {showPanel && (
        <>
          <p className="text-[10px] text-[#6B6B6B] mb-3 font-mono">
            Drag any logo to reposition it within its card. Crosshair = center target.
          </p>

          <div className="grid grid-cols-4 gap-2 mb-4">
            {BRANDS.map((brand) => (
              <div
                key={brand.id}
                className="rounded-xl bg-[#EAE3DA] aspect-[23/18] overflow-hidden relative"
                ref={(el) => {
                  if (!el) return;
                  el.dataset.brandId = brand.id;
                }}
                onMouseDown={(e) => {
                  const container = e.currentTarget;
                  handleMouseDown(e, brand.id, container);
                }}
                style={{ cursor: "grab" }}
              >
                <BrandTrophy brandId={brand.id} nudgeOverride={nudges[brand.id]} />
                {/* Center crosshair */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-6 h-[1px] bg-red-500/40" />
                </div>
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-[1px] h-6 bg-red-500/40" />
                </div>
                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 px-1 py-0.5 pointer-events-none">
                  <span className="text-[8px] font-mono text-black">
                    {brand.label} ({nudges[brand.id].x}, {nudges[brand.id].y})
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mb-3">
            <button
              onClick={copyValues}
              className="text-[10px] font-mono bg-[#2A2A2A] text-white px-3 py-1.5 rounded-lg hover:bg-[#3A3A3A]"
            >
              COPY NUDGE VALUES
            </button>
            <button
              onClick={resetAll}
              className="text-[10px] font-mono bg-red-100 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-200"
            >
              RESET ALL TO 0
            </button>
          </div>

          <pre className="bg-[#1A1A1A] text-green-400 text-[10px] font-mono p-3 rounded-lg overflow-x-auto max-h-48 overflow-y-auto">
{BRANDS.map((b) => {
  const n = nudges[b.id];
  const changed = n.x !== 0 || n.y !== 0;
  return `${changed ? "▸" : " "} ${b.id.padEnd(14)} nudgeX: ${String(n.x).padStart(6)}, nudgeY: ${String(n.y).padStart(6)}`;
}).join("\n")}
          </pre>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Responsive grid with hover + click modal
// ---------------------------------------------------------------------------

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildBrandPrompt(brand: BrandMeta): string {
  return `Return ONLY valid JSON (no markdown, no code fences, no explanation) with these fields for ${brand.label}: { "ceo": "current CEO full name", "stock_price": "current stock price with currency symbol, or 'Private' if not publicly traded", "latest_news": { "title": "a recent headline about the company", "url": "link to the article" }, "sustainability": { "title": "a recent sustainability or ESG headline", "url": "link to the article" }, "spirit_whale": { "name": "a real named individual ${brand.whaleSpecies} from research databases", "species": "${brand.whaleSpecies}", "fun_fact": "one sentence fun fact about this whale" } }`;
}

function parseMetrics(answer: string): BrandMetrics | null {
  try {
    const cleaned = answer.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start === -1 || end === -1) return null;
    return JSON.parse(cleaned.slice(start, end + 1));
  } catch {
    return null;
  }
}

function truncate(text: string, max = 50): string {
  return text.length > max ? text.slice(0, max) + "…" : text;
}

export default function BrandTrophyGrid() {
  const [visibleBrands, setVisibleBrands] = useState<BrandMeta[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<BrandMeta | null>(null);
  const [brandImage, setBrandImage] = useState<string | null>(null);
  const [brandMetrics, setBrandMetrics] = useState<BrandMetrics | null>(null);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  const fetchedRef = useRef<string | null>(null);

  const closeModal = useCallback(() => {
    setSelectedBrand(null);
    setBrandImage(null);
    setBrandMetrics(null);
    setIsLoadingMetrics(false);
    setImageLoadError(false);
    fetchedRef.current = null;
  }, []);

  useEffect(() => {
    if (!selectedBrand || fetchedRef.current === selectedBrand.id) return;
    fetchedRef.current = selectedBrand.id;

    setIsLoadingMetrics(true);
    setBrandMetrics(null);
    setBrandImage(null);
    setImageLoadError(false);

    fetch(`/api/unsplash?query=${encodeURIComponent(selectedBrand.label)}`)
      .then((r) => r.json())
      .then((d) => { if (d.url) setBrandImage(d.url); })
      .catch(() => {});

    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: buildBrandPrompt(selectedBrand) }),
    })
      .then((r) => r.json())
      .then((d) => {
        const parsed = parseMetrics(d.answer || "");
        if (parsed) setBrandMetrics(parsed);
      })
      .catch(() => {})
      .finally(() => setIsLoadingMetrics(false));
  }, [selectedBrand]);

  useEffect(() => {
    if (!selectedBrand) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedBrand, closeModal]);

  const getGridCount = useCallback(() => {
    if (typeof window === "undefined") return 6;
    const w = window.innerWidth;
    if (w < 640) return 12;
    if (w < 1024) return 8;
    return 12;
  }, []);

  useEffect(() => {
    const count = getGridCount();
    setVisibleBrands(shuffle(BRANDS).slice(0, count));

    const handleResize = () => {
      const newCount = getGridCount();
      setVisibleBrands((prev) => {
        if (prev.length === newCount) return prev;
        return shuffle(BRANDS).slice(0, newCount);
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getGridCount]);

  const gridCols = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

  const xPct = (brand: BrandMeta) => COLS > 1 ? (brand.col / (COLS - 1)) * 100 : 0;
  const yPct = (brand: BrandMeta) => ROWS > 1 ? (brand.row / (ROWS - 1)) * 100 : 0;

  return (
    <div className="bg-[#F3EBE2] rounded-2xl p-8 md:p-12 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px]">
          BRANDS I&apos;VE WORKED WITH
        </p>
        <span className="text-[11px] font-medium text-[#6B6B6B] tracking-[2px]">
          {BRANDS.length} BRANDS
        </span>
      </div>

      <div className={`grid ${gridCols} gap-2`}>
        {visibleBrands.map((brand, i) => (
          <div
            key={`${brand.id}-${i}`}
            className="rounded-xl bg-[#EAE3DA] aspect-[23/18] overflow-hidden cursor-pointer group relative"
            onClick={() => setSelectedBrand(brand)}
          >
            <BrandTrophy brandId={brand.id} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/70 via-[#1A1A1A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <p className="text-[10px] font-medium text-white/60 tracking-[2px] mb-0.5">
                {brand.role.toUpperCase()}
              </p>
              <h4 className="text-sm font-semibold text-white leading-tight">
                {brand.label}
              </h4>
            </div>
          </div>
        ))}
      </div>

      <SpriteCalibrator />

      {/* Brand Modal */}
      {selectedBrand && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]" />

          <div
            className="relative flex gap-3 max-h-[90vh] animate-[scaleIn_250ms_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main Card */}
            <div className="bg-[#F3EBE2] rounded-2xl w-[420px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              {/* Hero Image */}
              <div className="p-2 flex-shrink-0">
                <div className="relative w-full aspect-[16/9] bg-[#EAE3DA]" style={{ borderRadius: 8, overflow: "hidden" }}>
                  {brandImage && !imageLoadError ? (
                    <img
                      src={brandImage}
                      alt={selectedBrand.label}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ borderRadius: 8 }}
                      onError={() => setImageLoadError(true)}
                    />
                  ) : (
                    <>
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `url(${SPRITE_URL})`,
                          backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                          backgroundPosition: `${xPct(selectedBrand)}% ${yPct(selectedBrand)}%`,
                          backgroundRepeat: "no-repeat",
                          filter: "brightness(1.3)",
                          mixBlendMode: "multiply",
                        }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundColor: "rgb(188, 174, 158)",
                          mixBlendMode: "lighten",
                        }}
                      />
                    </>
                  )}
                  <button
                    onClick={closeModal}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-10"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M1 1l12 12M13 1L1 13" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Brand Info */}
              <div className="p-6 pt-4 flex flex-col gap-3 overflow-y-auto">
                <div className="flex flex-col gap-1">
                  <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px]">
                    {selectedBrand.tech.toUpperCase()}
                  </p>
                  <h3 className="text-2xl font-normal text-[#1A1A1A]">
                    {selectedBrand.label}
                  </h3>
                  <p className="text-xs font-medium text-[#6B6B6B]">
                    {selectedBrand.role}
                  </p>
                </div>
                <p className="text-sm text-[#3D3D3D] leading-relaxed">
                  {selectedBrand.desc}
                </p>
                {selectedBrand.route && (
                  <Link
                    href={selectedBrand.route}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-fit px-6 py-2.5 bg-[#1A1A1A] text-[#F3EBE2] rounded-lg text-sm font-bold hover:bg-[#333] transition-colors mt-1"
                  >
                    View Project →
                  </Link>
                )}
              </div>
            </div>

            {/* Insights Slide-Out Panel */}
            <div
              className="w-[320px] flex flex-col gap-3 max-h-[90vh] overflow-y-auto transition-all duration-300 ease-out"
              style={{
                opacity: isLoadingMetrics || brandMetrics ? 1 : 0,
                transform: isLoadingMetrics || brandMetrics ? "translateX(0)" : "translateX(-16px)",
              }}
            >
              {isLoadingMetrics && !brandMetrics && (
                <div className="bg-[#F3EBE2] rounded-2xl shadow-2xl p-6 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6B6B6B] animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6B6B6B] animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6B6B6B] animate-bounce [animation-delay:300ms]" />
                  </div>
                  <span className="text-xs text-[#6B6B6B]">Loading insights…</span>
                </div>
              )}

              {brandMetrics && (
                <>
                  {/* Brand Insights Card */}
                  <div className="bg-[#F3EBE2] rounded-2xl shadow-2xl p-6 flex flex-col gap-3">
                    <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px]">
                      BRAND INSIGHTS
                    </p>
                    {[
                      {
                        key: "CEO",
                        value: brandMetrics.ceo,
                        href: `https://www.google.com/search?q=${encodeURIComponent(brandMetrics.ceo + " " + selectedBrand.label + " CEO")}`,
                      },
                      {
                        key: "Stock Price",
                        value: brandMetrics.stock_price,
                        href: `https://www.google.com/finance/quote/${encodeURIComponent(selectedBrand.label)}`,
                      },
                      {
                        key: "Latest News",
                        value: truncate(brandMetrics.latest_news.title),
                        href: brandMetrics.latest_news.url,
                      },
                      {
                        key: "Sustainability",
                        value: truncate(brandMetrics.sustainability.title),
                        href: brandMetrics.sustainability.url,
                      },
                    ].map((row, i, arr) => (
                      <div
                        key={row.key}
                        className={`flex items-baseline justify-between py-2 ${i < arr.length - 1 ? "border-b border-[#D5CEC6]" : ""}`}
                      >
                        <span className="text-[11px] text-[#6B6B6B] shrink-0 mr-3">{row.key}</span>
                        <a
                          href={row.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative z-10 text-[13px] text-[#1A1A1A] hover:text-[#6B6B6B] underline decoration-[#D5CEC6] hover:decoration-[#6B6B6B] transition-colors cursor-pointer text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {row.value}
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* Spirit Whale Card */}
                  <div className="bg-[#1A1A1A] rounded-2xl shadow-2xl p-6 flex flex-col gap-2">
                    <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px] mb-1">
                      SPIRIT WHALE
                    </p>
                    <div className="flex items-baseline justify-between">
                      <h4 className="text-base font-medium text-[#F5F4F2]">
                        {brandMetrics.spirit_whale.name}
                      </h4>
                      <span className="text-[10px] text-[#C9A962] tracking-[2px]">
                        {brandMetrics.spirit_whale.species.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-[#AAAAAA] leading-relaxed">
                      {brandMetrics.spirit_whale.fun_fact}
                    </p>
                    <Link
                      href="/projects/spirit-whale"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 text-xs text-[#C9A962] hover:text-[#F5F4F2] transition-colors mt-1 cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Explore Spirit Whale Project →
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
