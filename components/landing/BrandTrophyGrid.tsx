"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { BRANDS as INFOGRAPHIC_BRANDS } from "@/headwinds-infographics/brandData";
import { brandInsightsData, type BrandMetrics } from "./insights-data";

const SPRITE_URL = "/headwinds_trophies.png";
const COLS = 4;
const ROWS = 3;
const INFOGRAPHIC_IMG_BASE = "/headwinds-infographics";
const SHOW_SPRITE_CALIBRATOR = false;

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
const infographicMap = new Map(INFOGRAPHIC_BRANDS.map((b) => [b.id, b]));

const gridReveal = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const tileReveal = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 220,
      damping: 24,
    },
  },
};

function BrandInfographicTile({ brandId }: { brandId: BrandId }) {
  const infographic = infographicMap.get(brandId);
  if (!infographic) return null;

  return (
    <div className="h-full w-full bg-[#EAE3DA] border border-[#D8CEBF] p-2.5 flex flex-col gap-2 text-[#4F4D47]">
      <header className="flex items-start gap-2 border-b border-[#D8CEBF] pb-2">
        <span className="text-[10px] font-bold tracking-[0.1em] text-[#BBAE9E] leading-none pt-0.5">
          {infographic.index}
        </span>
        <div className="min-w-0">
          <p className="text-[14px] font-extrabold text-[#34322D] leading-tight truncate">
            {infographic.name}
          </p>
          <p className="text-[9px] uppercase tracking-[0.18em] text-[#8A8579] mt-1 truncate">
            {infographic.sector}
          </p>
        </div>
      </header>

      <div className="relative h-[38%] rounded-[4px] overflow-hidden bg-[#BBAE9E]">
        <img
          src={`${INFOGRAPHIC_IMG_BASE}/${infographic.image}`}
          alt={infographic.imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#34322D]/70 via-[#34322D]/35 to-transparent" />
      </div>

      <div className="border-b border-[#D8CEBF] pb-2">
        <p className="text-[34px] md:text-[38px] leading-none font-extrabold tracking-tight text-[#34322D]">
          {infographic.hero.value}
        </p>
        <p className="text-[12px] leading-tight text-[#8A8579] mt-1.5 line-clamp-2">
          {infographic.hero.label}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-[#D8CEBF]">
        {infographic.stats.map((stat) => (
          <div key={stat.label} className="border-l-2 border-[#BBAE9E] pl-1 min-w-0">
            <p className="text-[11px] font-extrabold leading-none text-[#34322D] truncate">
              {stat.value}
            </p>
            <p className="text-[8px] leading-tight text-[#8A8579] mt-1 line-clamp-3">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <p className="text-[10px] leading-relaxed text-[#4F4D47] line-clamp-4">
        {infographic.narrative}
      </p>

      <footer className="mt-auto border-t border-[#D8CEBF] pt-1.5">
        <div className="grid grid-cols-[3.6rem_1fr] gap-2 py-1 items-start border-b border-dotted border-[#D8CEBF]">
          <span className="text-[8px] uppercase tracking-[0.14em] font-bold text-[#BBAE9E]">Agency</span>
          <span className="text-[9px] leading-tight text-[#4F4D47] line-clamp-2">{infographic.agency}</span>
        </div>
        <div className="grid grid-cols-[3.6rem_1fr] gap-2 py-1 items-start border-b border-dotted border-[#D8CEBF]">
          <span className="text-[8px] uppercase tracking-[0.14em] font-bold text-[#BBAE9E]">Award</span>
          <span className="text-[9px] leading-tight text-[#4F4D47] line-clamp-2">{infographic.award}</span>
        </div>
        <div className="grid grid-cols-[3.6rem_1fr] gap-2 py-1 items-start">
          <span className="text-[8px] uppercase tracking-[0.14em] font-bold text-[#BBAE9E]">Opinion</span>
          <span className="text-[9px] leading-tight italic text-[#34322D] line-clamp-3">{infographic.reputation}</span>
        </div>
      </footer>
    </div>
  );
}

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

function truncate(text: string, max = 50): string {
  return text.length > max ? text.slice(0, max) + "…" : text;
}

export default function BrandTrophyGrid() {
  const [visibleBrands, setVisibleBrands] = useState<BrandMeta[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<BrandMeta | null>(null);
  const [brandImage, setBrandImage] = useState<string | null>(null);
  const [brandMetrics, setBrandMetrics] = useState<BrandMetrics | null>(null);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [showInfographicTiles, setShowInfographicTiles] = useState(false);
  const [hasTriggeredInfographics, setHasTriggeredInfographics] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const closeModal = useCallback(() => {
    setSelectedBrand(null);
    setBrandImage(null);
    setBrandMetrics(null);
    setImageLoadError(false);
  }, []);

  useEffect(() => {
    if (!selectedBrand) return;

    setBrandMetrics(brandInsightsData[selectedBrand.id] ?? null);
    setBrandImage(null);
    setImageLoadError(false);

    fetch(`/api/unsplash?query=${encodeURIComponent(selectedBrand.label)}`)
      .then((r) => r.json())
      .then((d) => { if (d.url) setBrandImage(d.url); })
      .catch(() => {});
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

  useEffect(() => {
    const handleScroll = () => {
      if (hasTriggeredInfographics) return;

      const section = sectionRef.current;
      if (!section) return;

      const sectionRect = section.getBoundingClientRect();
      const sectionCenterY = sectionRect.top + sectionRect.height / 2;
      const viewportCenterY = (window.innerHeight || 1) / 2;

      if (sectionCenterY <= viewportCenterY) {
        setShowInfographicTiles(true);
        setHasTriggeredInfographics(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [hasTriggeredInfographics]);

  const gridCols = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

  const xPct = (brand: BrandMeta) => COLS > 1 ? (brand.col / (COLS - 1)) * 100 : 0;
  const yPct = (brand: BrandMeta) => ROWS > 1 ? (brand.row / (ROWS - 1)) * 100 : 0;

  return (
    <div ref={sectionRef} className="bg-[#F3EBE2] rounded-2xl p-8 md:p-12 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px]">
          BRANDS I&apos;VE WORKED WITH
        </p>
        <span className="text-[11px] font-medium text-[#6B6B6B] tracking-[2px]">
          {BRANDS.length} BRANDS
        </span>
      </div>

      <motion.div
        className={`grid ${gridCols} gap-2`}
        variants={gridReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {visibleBrands.map((brand, i) => (
          <motion.div
            key={`${brand.id}-${i}`}
            className="rounded-xl bg-[#EAE3DA] overflow-hidden cursor-pointer group relative"
            onClick={() => setSelectedBrand(brand)}
            variants={tileReveal}
            style={{ aspectRatio: showInfographicTiles ? "23 / 46" : "23 / 18" }}
            animate={{ aspectRatio: showInfographicTiles ? "23 / 46" : "23 / 18" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence initial={false} mode="wait">
              {showInfographicTiles ? (
                <motion.div
                  key={`infographic-${brand.id}`}
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: -18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 18 }}
                  transition={{ duration: 0.36, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  <BrandInfographicTile brandId={brand.id} />
                </motion.div>
              ) : (
                <motion.div
                  key={`logo-${brand.id}`}
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: -18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 18 }}
                  transition={{ duration: 0.36, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
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
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      {SHOW_SPRITE_CALIBRATOR && <SpriteCalibrator />}

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
                opacity: brandMetrics ? 1 : 0,
                transform: brandMetrics ? "translateX(0)" : "translateX(-16px)",
              }}
            >
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
