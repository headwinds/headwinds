"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type PosterState = {
  status: "idle" | "queued" | "running" | "completed" | "failed" | "error";
  progress?: string | null;
  imageUrl?: string | null;
  taskId?: string | null;
  error?: string | null;
};

const printSizes = [
  { id: "8x10", label: "8 x 10", price: "$35" },
  { id: "12x16", label: "12 x 16", price: "$65" },
  { id: "18x24", label: "18 x 24", price: "$120" },
];

const HumberPosterPreview = () => {
  const [poster, setPoster] = useState<PosterState>({ status: "idle" });
  const [sizeId, setSizeId] = useState(printSizes[1].id);

  useEffect(() => {
    let cancelled = false;

    const loadLatest = async () => {
      try {
        setPoster({ status: "running", progress: "Loading latest poster..." });

        const response = await fetch("/api/rangers/map", { cache: "no-store" });

        if (!response.ok) {
          throw new Error(`Poster load failed with ${response.status}`);
        }

        const data = await response.json();
        if (cancelled) return;

        if (data.status === "completed" && data.imageUrl) {
          setPoster({
            status: "completed",
            imageUrl: data.imageUrl,
            taskId: data.task_id || null,
            progress: data.progress || "Loaded latest generated poster.",
          });
          return;
        }

        setPoster({
          status: "idle",
          progress: data.progress || "No generated poster available yet.",
          taskId: null,
        });
      } catch (error) {
        if (!cancelled) {
          const message = error instanceof Error ? error.message : "Unknown error";
          setPoster({ status: "error", error: message });
        }
      }
    };

    void loadLatest();

    return () => {
      cancelled = true;
    };
  }, []);

  const posterImageUrl = poster.imageUrl ?? undefined;
  const ready = poster.status === "completed" && Boolean(posterImageUrl);
  const selectedSize = printSizes.find((size) => size.id === sizeId) || printSizes[1];

  return (
    <div className="bg-[#F3EBE2] rounded-2xl p-4 md:p-5 flex flex-col gap-4 border border-[#D5CEC6]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px] m-0">MAP PRINT PREVIEW</p>
          <p className="text-sm text-[#1A1A1A] m-0">Humber River / Old Mill</p>
        </div>
        <span className="text-[11px] text-[#6B6B6B] tracking-[2px] uppercase">
          {poster.status === "completed"
            ? "Ready"
            : poster.status === "failed" || poster.status === "error"
              ? "Fallback"
              : "Loading"}
        </span>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-[#D5CEC6] bg-[#EAE3DA] aspect-[4/3]">
        {ready ? (
          <img
            src={posterImageUrl}
            alt="Humber River Old Mill map poster preview"
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(26,26,26,0.10),_transparent_45%),linear-gradient(135deg,_#F3EBE2_0%,_#EAE3DA_60%,_#D5CEC6_100%)]">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(26,26,26,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,26,0.08) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <div className="rounded-xl bg-[#F3EBE2]/95 border border-[#D5CEC6] p-4 flex flex-col gap-2">
                <p className="text-xs tracking-[2px] uppercase text-[#6B6B6B] m-0">Scout-map poster</p>
                <p className="text-sm text-[#1A1A1A] leading-relaxed m-0">
                  Using the most recently generated poster. No automatic background generation is running.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-[#3D3D3D] leading-relaxed m-0">
          The print product is loaded from the latest generated scout-map output and can be handed off to a local printer.
        </p>
        <p className="text-xs text-[#6B6B6B] leading-relaxed m-0">
          {poster.progress || "Latest poster loaded."}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[2px] uppercase m-0">Print Size</p>
        <div className="flex flex-wrap gap-2">
          {printSizes.map((size) => {
            const isSelected = size.id === sizeId;
            return (
              <button
                key={size.id}
                type="button"
                onClick={() => setSizeId(size.id)}
                className={`px-3 py-2 rounded-lg text-xs transition-colors ${
                  isSelected
                    ? "bg-[#1A1A1A] text-[#F3EBE2]"
                    : "bg-[#EAE3DA] text-[#3D3D3D] hover:bg-[#EDE5DC]"
                }`}
              >
                {size.label} · {size.price}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link
          href={`/contact?topic=rangers-print&size=${encodeURIComponent(selectedSize.label)}&price=${encodeURIComponent(selectedSize.price)}`}
          className="inline-flex px-4 py-2 rounded-lg bg-[#1A1A1A] text-[#F3EBE2] no-underline text-sm font-medium hover:bg-[#333333] transition-colors"
        >
          Request {selectedSize.label} Print
        </Link>
        {ready ? (
          <a
            href={posterImageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-4 py-2 rounded-lg bg-[#EAE3DA] text-[#3D3D3D] text-sm no-underline hover:bg-[#EDE5DC] transition-colors"
          >
            Open Poster
          </a>
        ) : null}
        <span className="inline-flex px-4 py-2 rounded-lg bg-[#EAE3DA] text-[#3D3D3D] text-sm">
          Scout-map + local printer
        </span>
      </div>

      {poster.error ? <p className="text-xs text-[#8A4A4A] leading-relaxed m-0">{poster.error}</p> : null}
    </div>
  );
};

export default HumberPosterPreview;
