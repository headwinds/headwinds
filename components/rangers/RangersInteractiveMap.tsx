"use client";

import { useEffect, useMemo, useState } from "react";

type PosterState = {
  status: "idle" | "queued" | "running" | "completed" | "failed" | "error";
  progress?: string | null;
  imageUrl?: string | null;
  taskId?: string | null;
  error?: string | null;
};

type MarkerKind = "person" | "place" | "infographic";

type Marker = {
  id: string;
  kind: MarkerKind;
  title: string;
  subtitle: string;
  detail: string;
  x: number;
  y: number;
};

const BASE_POSTER_REQUEST = {
  city: "Toronto",
  country: "Canada",
  latitude: 43.6496935,
  longitude: -79.4989025,
  name_label: "Old Mill Bridge",
  theme: "headwinds_humber",
  distance: 2600,
  network_type: "all",
  minimal: false,
  country_label: "CANADA",
  width: 18,
  height: 24,
};

const markers: Marker[] = [
  {
    id: "p1",
    kind: "person",
    title: "Amina",
    subtitle: "Water quality lead",
    detail: "Runs monthly sampling routes and helps publish trend notes to the group.",
    x: 30,
    y: 38,
  },
  {
    id: "p2",
    kind: "person",
    title: "Jordan",
    subtitle: "Cleanup organizer",
    detail: "Coordinates newcomer onboarding and neighborhood sweep logistics.",
    x: 62,
    y: 60,
  },
  {
    id: "l1",
    kind: "place",
    title: "Old Mill Station",
    subtitle: "Frequent meetup point",
    detail: "Most monthly runs begin here for quick transit access and route visibility.",
    x: 46,
    y: 48,
  },
  {
    id: "l2",
    kind: "place",
    title: "Magwood Park",
    subtitle: "North segment focus",
    detail: "Recent cleanups expanded coverage upstream with stronger local turnout.",
    x: 74,
    y: 34,
  },
  {
    id: "i1",
    kind: "infographic",
    title: "24 active this month",
    subtitle: "Participation",
    detail: "Total active contributors in the latest cycle, including first-time participants.",
    x: 20,
    y: 70,
  },
  {
    id: "i2",
    kind: "infographic",
    title: "95 connection strength",
    subtitle: "Collaboration index",
    detail: "Weighted link strength across recurring pairings and shared field sessions.",
    x: 82,
    y: 72,
  },
];

const kindStyles: Record<MarkerKind, string> = {
  person: "bg-[#1A1A1A] text-[#F3EBE2] border-[#1A1A1A]",
  place: "bg-[#C3DED8] text-[#1A1A1A] border-[#88B8AC]",
  infographic: "bg-[#F3EBE2] text-[#1A1A1A] border-[#B9AAA0]",
};

const RangersInteractiveMap = () => {
  const [poster, setPoster] = useState<PosterState>({ status: "idle" });
  const [activeMarkerId, setActiveMarkerId] = useState(markers[0].id);

  useEffect(() => {
    let cancelled = false;

    const loadLatest = async () => {
      try {
        setPoster({ status: "running", progress: "Loading latest map..." });

        const response = await fetch("/api/rangers/map", { cache: "no-store" });

        if (!response.ok) {
          throw new Error(`Map load failed with ${response.status}`);
        }

        const data = await response.json();
        if (cancelled) return;

        if (data.status === "completed" && data.imageUrl) {
          setPoster({ status: "completed", imageUrl: data.imageUrl, taskId: data.task_id || null });
          return;
        }

        setPoster({
          status: "idle",
          progress: data.progress || "No generated map available yet.",
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

  const activeMarker = useMemo(
    () => markers.find((marker) => marker.id === activeMarkerId) || markers[0],
    [activeMarkerId],
  );

  const mapReady = poster.status === "completed" && poster.imageUrl;

  return (
    <div className="rounded-2xl border border-[#D5CEC6] bg-[#EAE3DA] p-3 md:p-4 flex flex-col gap-3 max-h-[400px] overflow-y-auto">
      <div className="relative overflow-hidden rounded-xl border border-[#D5CEC6] bg-[#E1D6CC] aspect-[4/3]">
        {mapReady ? (
          <img
            src={poster.imageUrl || ""}
            alt="Interactive Humber River map"
            className="absolute inset-0 h-full w-full object-contain"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(26,26,26,0.12),_transparent_45%),linear-gradient(140deg,_#F3EBE2_0%,_#EAE3DA_55%,_#D5CEC6_100%)]">
            <div
              className="absolute inset-0 opacity-35"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(26,26,26,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,26,0.08) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A1A] via-transparent to-transparent" />

        {markers.map((marker) => {
          const selected = marker.id === activeMarker.id;
          return (
            <button
              key={marker.id}
              type="button"
              onClick={() => setActiveMarkerId(marker.id)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2 py-1 text-[10px] tracking-[1.5px] uppercase transition-transform hover:scale-105 ${kindStyles[marker.kind]} ${
                selected ? "ring-2 ring-[#1A1A1A]/50" : "opacity-90"
              }`}
              style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
              aria-label={`${marker.kind} marker: ${marker.title}`}
            >
              {marker.kind}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-2">
        <div className="rounded-xl bg-[#F3EBE2] border border-[#D5CEC6] p-3 flex flex-col gap-1">
          <p className="text-[11px] tracking-[2px] uppercase text-[#6B6B6B] m-0">Marker focus</p>
          <p className="text-base text-[#1A1A1A] m-0">{activeMarker.title}</p>
          <p className="text-sm text-[#3D3D3D] m-0">{activeMarker.subtitle}</p>
          <p className="text-xs text-[#6B6B6B] leading-relaxed m-0">{activeMarker.detail}</p>
        </div>

        <div className="rounded-xl bg-[#C3DED8] border border-[#88B8AC] p-3 flex flex-col justify-between gap-2">
          <p className="text-[11px] tracking-[2px] uppercase text-[#3D3D3D] m-0">Live infographics</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-[#F3EBE2] px-2 py-1.5">
              <p className="text-lg text-[#1A1A1A] m-0">24</p>
              <p className="text-[10px] text-[#6B6B6B] tracking-[1px] uppercase m-0">Active</p>
            </div>
            <div className="rounded-lg bg-[#F3EBE2] px-2 py-1.5">
              <p className="text-lg text-[#1A1A1A] m-0">95</p>
              <p className="text-[10px] text-[#6B6B6B] tracking-[1px] uppercase m-0">Strength</p>
            </div>
          </div>
          <p className="text-[11px] text-[#3D3D3D] leading-relaxed m-0">
            {poster.progress || "Interactive overlay loaded from the latest ranger map render."}
          </p>
        </div>
      </div>

      {poster.error ? <p className="text-xs text-[#8A4A4A] m-0">{poster.error}</p> : null}
    </div>
  );
};

export default RangersInteractiveMap;