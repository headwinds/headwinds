"use client";

import React from "react";
import PageShell from "@/components/layout/PageShell";

/* ── Sample data ─────────────────────────────────────────── */

const kpis = [
  { value: "42.8K", label: "SESSIONS", delta: "+12.4% vs prev period" },
  { value: "3.2%", label: "CONVERSION", delta: "+0.8pp uplift" },
  { value: "$184K", label: "REVENUE", delta: "+22.1% growth" },
  { value: "67%", label: "RETENTION", delta: "+5.2pp improvement" },
];

const segments = [
  {
    name: "Power Users",
    color: "#C3DED8",
    pct: "34%",
    desc: "High engagement, high LTV",
  },
  {
    name: "Growth Potential",
    color: "#C4CFDE",
    pct: "28%",
    desc: "Medium engagement, rising",
  },
  {
    name: "Casual Browsers",
    color: "#D5DCBA",
    pct: "24%",
    desc: "Low frequency, large volume",
  },
  {
    name: "At-Risk Churn",
    color: "#E8D5C4",
    pct: "14%",
    desc: "Declining activity signals",
  },
];

const clusterDots = [
  // Power Users cluster (top-left)
  { x: 10, y: 15, r: 16, color: "#C3DED8" },
  { x: 17, y: 22, r: 12, color: "#C3DED8" },
  { x: 13, y: 30, r: 9, color: "#C3DED8" },
  { x: 21, y: 14, r: 14, color: "#C3DED8" },
  { x: 8, y: 25, r: 10, color: "#C3DED8" },
  // Growth Potential cluster (top-right)
  { x: 52, y: 18, r: 18, color: "#C4CFDE" },
  { x: 59, y: 26, r: 10, color: "#C4CFDE" },
  { x: 48, y: 30, r: 13, color: "#C4CFDE" },
  { x: 63, y: 17, r: 8, color: "#C4CFDE" },
  { x: 55, y: 35, r: 11, color: "#C4CFDE" },
  // Casual Browsers cluster (bottom-right)
  { x: 75, y: 58, r: 20, color: "#D5DCBA" },
  { x: 83, y: 65, r: 11, color: "#D5DCBA" },
  { x: 70, y: 68, r: 15, color: "#D5DCBA" },
  { x: 88, y: 55, r: 9, color: "#D5DCBA" },
  // At-Risk cluster (bottom-left)
  { x: 33, y: 72, r: 14, color: "#E8D5C4" },
  { x: 40, y: 78, r: 10, color: "#E8D5C4" },
  { x: 28, y: 80, r: 17, color: "#E8D5C4" },
  { x: 38, y: 68, r: 8, color: "#E8D5C4" },
];

const sankeyStages = [
  { label: "Landing", value: "42.8K", h: 100, color: "#C3DED8" },
  { label: "Browse", value: "28.1K", h: 75, color: "#C4CFDE" },
  { label: "Add Cart", value: "8.4K", h: 42, color: "#C4CFDE" },
  { label: "Convert", value: "1.4K", h: 33, color: "#D5DCBA" },
];

const sankeyDropoffs = [
  { from: "Landing", label: "Bounce", value: "14.7K", color: "#E8D5C4" },
  { from: "Cart", label: "Abandon", value: "7.0K", color: "#C5BEB6" },
];

const insights = [
  {
    num: "01",
    color: "#C3DED8",
    title: "Activate Growth Segment",
    body: "28% of users show rising engagement but haven't converted. A targeted onboarding email sequence could lift conversion by 1.2pp within 30 days.",
    tag: "High Impact",
  },
  {
    num: "02",
    color: "#C4CFDE",
    title: "Reduce Cart Abandonment",
    body: "Cart-to-purchase drop is 83%. Session replay analysis shows friction at the shipping step. Simplifying to a single-page checkout could recover $22K/month.",
    tag: "Revenue",
  },
  {
    num: "03",
    color: "#E8D5C4",
    title: "Win-Back At-Risk Cohort",
    body: "14% of users show declining activity over 60 days. A personalized re-engagement campaign with exclusive offers could retain 40% of this segment.",
    tag: "Retention",
  },
];

/* ── Components ──────────────────────────────────────────── */

const ClusterChart = () => (
  <div className="bg-[#F3EBE2] rounded-2xl p-8 flex flex-col gap-3 flex-1 min-w-0">
    <span className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px]">
      USER SEGMENTATION
    </span>
    <h2 className="text-[28px] text-[#1A1A1A] -tracking-wide m-0">
      Behavioral Clusters
    </h2>
    <div className="relative w-full aspect-[2/1] bg-[#E8E2DA] rounded-xl overflow-hidden">
      {/* Axis labels */}
      <span className="absolute bottom-2 right-3 text-[10px] text-[#6B6B6B] tracking-wide">
        Engagement Score &rarr;
      </span>
      <span className="absolute top-2 left-3 text-[10px] text-[#6B6B6B] tracking-wide">
        Revenue Potential &rarr;
      </span>
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#D0CBC3" strokeWidth="0.5" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#D0CBC3" strokeWidth="0.5" />
        <line x1="0" y1="25%" x2="100%" y2="25%" stroke="#D0CBC3" strokeWidth="0.5" strokeDasharray="4" />
        <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#D0CBC3" strokeWidth="0.5" strokeDasharray="4" />
        <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#D0CBC3" strokeWidth="0.5" strokeDasharray="4" />
        <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#D0CBC3" strokeWidth="0.5" strokeDasharray="4" />
      </svg>
      {/* Dots */}
      {clusterDots.map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-70 transition-opacity hover:opacity-100"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.r * 2,
            height: d.r * 2,
            backgroundColor: d.color,
          }}
        />
      ))}
    </div>
  </div>
);

const ClusterLegend = () => (
  <div className="bg-[#F3EBE2] rounded-2xl p-8 flex flex-col gap-5 w-full md:w-72 md:shrink-0">
    <span className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px]">
      SEGMENTS
    </span>
    {segments.map((s) => (
      <div key={s.name} className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: s.color }}
          />
          <span className="text-base font-medium text-[#1A1A1A]">
            {s.name}
          </span>
        </div>
        <span className="text-xs text-[#6B6B6B] leading-relaxed pl-5">
          {s.desc}
          <br />
          {s.pct} of base
        </span>
      </div>
    ))}
  </div>
);

const SankeyDiagram = () => (
  <div className="bg-[#F3EBE2] rounded-2xl p-8 flex flex-col gap-3">
    <span className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px]">
      CUSTOMER JOURNEY
    </span>
    <h2 className="text-[28px] text-[#1A1A1A] -tracking-wide m-0">
      Conversion Flow
    </h2>
    <div className="relative w-full h-72 bg-[#E8E2DA] rounded-xl overflow-hidden flex items-center">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 280" preserveAspectRatio="xMidYMid meet">
        {/* Flow paths */}
        <path d="M130,60 C200,60 200,50 260,50" fill="none" stroke="#C3DED8" strokeWidth="60" opacity="0.3" />
        <path d="M130,140 C200,140 200,170 260,170" fill="none" stroke="#C3DED8" strokeWidth="35" opacity="0.3" />
        <path d="M360,50 C430,50 430,45 460,45" fill="none" stroke="#C4CFDE" strokeWidth="28" opacity="0.3" />
        <path d="M360,100 C420,100 420,130 460,130" fill="none" stroke="#E8D5C4" strokeWidth="48" opacity="0.25" />
        <path d="M360,200 C420,200 420,230 460,230" fill="none" stroke="#C5BEB6" strokeWidth="22" opacity="0.3" />
      </svg>
      {/* Stage blocks */}
      <div className="absolute left-[4%] top-1/2 -translate-y-1/2 w-[100px] bg-[#C3DED8] rounded-lg flex flex-col items-center justify-center py-6 px-2" style={{ height: "70%" }}>
        <span className="text-xs font-medium text-[#1A1A1A]">Landing</span>
        <span className="text-lg font-medium text-[#1A1A1A]">42.8K</span>
      </div>
      <div className="absolute left-[33%] top-[10%] w-[100px] bg-[#C4CFDE] rounded-lg flex flex-col items-center justify-center py-4 px-2" style={{ height: "50%" }}>
        <span className="text-xs font-medium text-[#1A1A1A]">Browse</span>
        <span className="text-lg font-medium text-[#1A1A1A]">28.1K</span>
      </div>
      <div className="absolute left-[33%] top-[65%] w-[100px] bg-[#C4CFDE] rounded-lg flex flex-col items-center justify-center py-3 px-2" style={{ height: "28%" }}>
        <span className="text-xs font-medium text-[#1A1A1A]">Add Cart</span>
        <span className="text-lg font-medium text-[#1A1A1A]">8.4K</span>
      </div>
      <div className="absolute right-[16%] top-[8%] w-[100px] bg-[#D5DCBA] rounded-lg flex flex-col items-center justify-center py-3 px-2" style={{ height: "22%" }}>
        <span className="text-xs font-medium text-[#1A1A1A]">Convert</span>
        <span className="text-lg font-medium text-[#1A1A1A]">1.4K</span>
      </div>
      <div className="absolute right-[16%] top-[35%] w-[100px] bg-[#E8D5C4] rounded-lg flex flex-col items-center justify-center py-4 px-2" style={{ height: "38%" }}>
        <span className="text-xs font-medium text-[#1A1A1A]">Bounce</span>
        <span className="text-lg font-medium text-[#1A1A1A]">14.7K</span>
      </div>
      <div className="absolute right-[16%] bottom-[5%] w-[100px] bg-[#C5BEB6] rounded-lg flex flex-col items-center justify-center py-2 px-2" style={{ height: "17%" }}>
        <span className="text-xs font-medium text-[#1A1A1A]">Return</span>
        <span className="text-lg font-medium text-[#1A1A1A]">7.0K</span>
      </div>
    </div>
  </div>
);

const VisualizationPage = () => {
  return (
    <PageShell>
      {/* Hero Header — dark, Feltron-inspired */}
      <div className="bg-[#1A1A1A] rounded-2xl px-6 md:px-12 py-10 md:py-14 flex flex-col gap-4">
        <span className="text-[11px] font-medium text-[#6B6B6B] tracking-[4px]">
          DATA + INSIGHTS
        </span>
        <h1 className="text-3xl sm:text-5xl md:text-[56px] text-[#F3EBE2] m-0 leading-[1.05] -tracking-wide font-normal">
          How I Think
          <br />
          About Analytics
        </h1>
        <p className="text-[17px] text-[#8A8A8A] leading-relaxed m-0 max-w-2xl">
          Proactive business intelligence — from raw signals to growth strategy.
        </p>
      </div>

      {/* KPI Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="bg-[#F3EBE2] rounded-2xl p-8 flex flex-col gap-1"
          >
            <span className="text-5xl font-medium text-[#1A1A1A] -tracking-wide">
              {k.value}
            </span>
            <span className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px]">
              {k.label}
            </span>
            <span className="text-[13px] text-[#3D8C6E]">{k.delta}</span>
          </div>
        ))}
      </div>

      {/* Cluster Section */}
      <div className="flex flex-col md:flex-row gap-1.5">
        <ClusterChart />
        <ClusterLegend />
      </div>

      {/* Sankey Section */}
      <SankeyDiagram />

      {/* Insights label bar */}
      <div className="bg-[#1A1A1A] rounded-2xl px-8 py-5 flex items-center justify-between">
        <span className="text-[11px] font-medium text-[#F3EBE2] tracking-[4px]">
          PROACTIVE INSIGHTS
        </span>
        <span className="text-[13px] text-[#6B6B6B]">
          3 recommendations
        </span>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5">
        {insights.map((ins) => (
          <div
            key={ins.num}
            className="bg-[#F3EBE2] rounded-2xl p-8 flex flex-col gap-3"
          >
            <span
              className="text-[64px] font-medium -tracking-wide leading-none"
              style={{ color: ins.color }}
            >
              {ins.num}
            </span>
            <h3 className="text-xl font-medium text-[#1A1A1A] leading-snug m-0">
              {ins.title}
            </h3>
            <p className="text-[13px] text-[#3D3D3D] leading-relaxed m-0">
              {ins.body}
            </p>
            <span
              className="text-[11px] font-medium px-3 py-1.5 rounded-full w-fit"
              style={{ backgroundColor: ins.color, color: "#1A1A1A" }}
            >
              {ins.tag}
            </span>
          </div>
        ))}
      </div>
    </PageShell>
  );
};

export default VisualizationPage;
