"use client";

import { useState, useEffect, useCallback } from "react";

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
}

const BRANDS: BrandMeta[] = [
  { id: "nintendo", label: "Nintendo", col: 0, row: 0 },
  { id: "bmw", label: "BMW", col: 1, row: 0 },
  { id: "ea-sports", label: "EA Sports", col: 2, row: 0 },
  { id: "lexmark", label: "Lexmark", col: 3, row: 0 },
  { id: "mitsubishi", label: "Mitsubishi", col: 0, row: 1 },
  { id: "home-depot", label: "The Home Depot", col: 1, row: 1 },
  { id: "bacardi", label: "Bacardí", col: 2, row: 1 },
  { id: "microsoft", label: "Microsoft", col: 3, row: 1 },
  { id: "huggies", label: "Huggies", col: 0, row: 2 },
  { id: "chase", label: "Chase Manhattan", col: 1, row: 2 },
  { id: "labatt", label: "Labatt", col: 2, row: 2 },
  { id: "td-bank", label: "TD Bank", col: 3, row: 2 },
];

const brandMap = new Map(BRANDS.map((b) => [b.id, b]));

export function getBrand(id: BrandId): BrandMeta | undefined {
  return brandMap.get(id);
}

// ---------------------------------------------------------------------------
// Single logo sprite – fills its parent container
// ---------------------------------------------------------------------------

interface BrandTrophyProps {
  brandId: BrandId;
  className?: string;
}

export function BrandTrophy({ brandId, className = "" }: BrandTrophyProps) {
  const brand = brandMap.get(brandId);
  if (!brand) return null;

  const xPct = COLS > 1 ? (brand.col / (COLS - 1)) * 100 : 0;
  const yPct = ROWS > 1 ? (brand.row / (ROWS - 1)) * 100 : 0;

  return (
    <div
      className={`relative w-full h-full ${className}`}
      role="img"
      aria-label={brand.label}
      title={brand.label}
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
// Responsive grid
// ---------------------------------------------------------------------------

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function BrandTrophyGrid() {
  const [visibleBrands, setVisibleBrands] = useState<BrandMeta[]>([]);

  const getGridCount = useCallback(() => {
    if (typeof window === "undefined") return 6;
    const w = window.innerWidth;
    if (w < 480) return 4;
    if (w < 640) return 6;
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

  const gridCols =
    visibleBrands.length <= 4
      ? "grid-cols-2"
      : visibleBrands.length <= 6
        ? "grid-cols-3"
        : "grid-cols-4";

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
            className="rounded-xl bg-[#EAE3DA] aspect-[23/18] overflow-hidden"
          >
            <BrandTrophy brandId={brand.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
