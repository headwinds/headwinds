"use client";

import React, { useState, useEffect, useRef } from "react";
import PageShell from "@/components/layout/PageShell";
import TimeSeriesHero from "./TimeSeriesHero";
import SankeyChart from "./SankeyChart";

/* ── KPI sets per dataset ───────────────────────────────── */

interface AnalyticsPoint {
  date: string;
  sessions: number;
  users: number;
  pageviews: number;
}

function computeAnalyticsKPIs(points: AnalyticsPoint[]): KPI[] {
  if (!points.length) return kpiSets.analytics.map((k) => ({ ...k, value: "--", delta: "--" }));

  const sorted = [...points].sort((a, b) => a.date.localeCompare(b.date));
  const totalSessions = sorted.reduce((s, p) => s + p.sessions, 0);
  const totalUsers = sorted.reduce((s, p) => s + p.users, 0);
  const totalPageviews = sorted.reduce((s, p) => s + p.pageviews, 0);
  const pagesPerSession = totalSessions > 0 ? totalPageviews / totalSessions : 0;

  const recent = sorted.slice(-3);
  const prior = sorted.slice(-6, -3);
  const recentSessions = recent.reduce((s, p) => s + p.sessions, 0);
  const priorSessions = prior.reduce((s, p) => s + p.sessions, 0);
  const recentUsers = recent.reduce((s, p) => s + p.users, 0);
  const priorUsers = prior.reduce((s, p) => s + p.users, 0);
  const recentPageviews = recent.reduce((s, p) => s + p.pageviews, 0);
  const priorPageviews = prior.reduce((s, p) => s + p.pageviews, 0);

  const fmt = (n: number, prev: number) => {
    if (prev === 0) return "–";
    const pct = ((n - prev) / prev * 100).toFixed(1);
    return `${Number(pct) >= 0 ? "+" : ""}${pct}% vs prior 3mo`;
  };

  const peak = sorted.reduce((max, p) => p.sessions > max.sessions ? p : max, sorted[0]);

  return [
    { value: totalSessions.toLocaleString(), metric: "Total Sessions", label: "ATTENTION", delta: fmt(recentSessions, priorSessions) },
    { value: totalUsers.toLocaleString(), metric: "Unique Users", label: "REACH", delta: fmt(recentUsers, priorUsers) },
    { value: totalPageviews.toLocaleString(), metric: "Pageviews", label: "ENGAGEMENT", delta: fmt(recentPageviews, priorPageviews) },
    { value: pagesPerSession.toFixed(1), metric: "Pages / Session", label: "DEPTH", delta: `Peak: ${peak.date} (${peak.sessions} sessions)` },
  ];
}

interface KPI {
  value: string;
  label: string;
  metric: string;
  delta: string;
}

const kpiSets: Record<string, KPI[]> = {
  analytics: [
    { value: "42.8K", metric: "Sessions", label: "ATTENTION", delta: "+12.4% vs prev period" },
    { value: "3.2%", metric: "Conversion", label: "CONNECTION", delta: "+0.8pp uplift" },
    { value: "$184K", metric: "Revenue", label: "INVESTMENT", delta: "+22.1% growth" },
    { value: "67%", metric: "Retention", label: "LOYALTY", delta: "+5.2pp improvement" },
  ],
  allbirds: [
    { value: "5.54", metric: "kg CO₂e / Product", label: "FOOTPRINT", delta: "−22% vs 2022" },
    { value: "86%", metric: "Sustainable Materials", label: "MATERIALS", delta: "+4pp vs 2021" },
    { value: "3.56", metric: "2025 Target (kg)", label: "AMBITION", delta: "Halve by EOY" },
    { value: "1.0", metric: "2030 Target (kg)", label: "VISION", delta: "Near-zero goal" },
  ],
  whaling: [
    { value: "650", metric: "Peak Vessels (1850)", label: "PEAK", delta: "Nantucket golden age" },
    { value: "98%", metric: "Decline by 1920", label: "COLLAPSE", delta: "Petroleum replaced whale oil" },
    { value: "3", metric: "Nations Still Whaling", label: "TODAY", delta: "Norway, Iceland, Japan" },
    { value: "~1K", metric: "Annual Catch (modern)", label: "SCALE", delta: "Down from tens of thousands" },
  ],
  salmon: [
    { value: "47K", metric: "2022 Low (thousands)", label: "TROUGH", delta: "Lowest recorded run" },
    { value: "72K", metric: "2026 Estimate", label: "RECOVERY", delta: "+53% from trough" },
    { value: "118K", metric: "2031 Forecast", label: "PROJECTION", delta: "Conservation scenario" },
    { value: "4", metric: "Salmon Species at Risk", label: "SPECIES", delta: "Chinook, Coho, Sockeye, Pink" },
  ],
};

function AnimatedValue({ value, className }: { value: string; className: string }) {
  const [display, setDisplay] = useState(value);
  const [animating, setAnimating] = useState(false);
  const prevRef = useRef(value);

  useEffect(() => {
    if (prevRef.current !== value) {
      setAnimating(true);
      const t = setTimeout(() => {
        setDisplay(value);
        setAnimating(false);
        prevRef.current = value;
      }, 150);
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <span
      className={`${className} transition-all duration-300 ${
        animating ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
      }`}
    >
      {display}
    </span>
  );
}

/* ── Cluster data (unchanged) ───────────────────────────── */

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
  { x: 10, y: 15, r: 16, color: "#C3DED8" },
  { x: 17, y: 22, r: 12, color: "#C3DED8" },
  { x: 13, y: 30, r: 9, color: "#C3DED8" },
  { x: 21, y: 14, r: 14, color: "#C3DED8" },
  { x: 8, y: 25, r: 10, color: "#C3DED8" },
  { x: 52, y: 18, r: 18, color: "#C4CFDE" },
  { x: 59, y: 26, r: 10, color: "#C4CFDE" },
  { x: 48, y: 30, r: 13, color: "#C4CFDE" },
  { x: 63, y: 17, r: 8, color: "#C4CFDE" },
  { x: 55, y: 35, r: 11, color: "#C4CFDE" },
  { x: 75, y: 58, r: 20, color: "#D5DCBA" },
  { x: 83, y: 65, r: 11, color: "#D5DCBA" },
  { x: 70, y: 68, r: 15, color: "#D5DCBA" },
  { x: 88, y: 55, r: 9, color: "#D5DCBA" },
  { x: 33, y: 72, r: 14, color: "#E8D5C4" },
  { x: 40, y: 78, r: 10, color: "#E8D5C4" },
  { x: 28, y: 80, r: 17, color: "#E8D5C4" },
  { x: 38, y: 68, r: 8, color: "#E8D5C4" },
];

/* ── Insight cards ──────────────────────────────────────── */

const insights = [
  {
    num: "01",
    color: "#C3DED8",
    title: "Activate Growth Segment",
    body: "28% of visitors browse the Wishlist but never add items. A subtle prompt after 3 page views could convert curious browsers into engaged users.",
    tag: "Attention → Connection",
  },
  {
    num: "02",
    color: "#C4CFDE",
    title: "Wishlist-to-Waitlist Bridge",
    body: "Users who add 2+ wishlist items are 4x more likely to join the SoloScout waitlist. Surface a CTA after the second add to capture intent.",
    tag: "Connection → Investment",
  },
  {
    num: "03",
    color: "#E8D5C4",
    title: "Nurture Early Adopters",
    body: "67% of waitlist sign-ups return within 14 days. A drip sequence showcasing SoloScout previews could deepen loyalty and drive referral.",
    tag: "Investment → Loyalty",
  },
];

const engagementScores: Record<string, number> = {
  analytics: 82,
  allbirds: 74,
  whaling: 63,
  salmon: 77,
};

/* ── Components ──────────────────────────────────────────── */

const ClusterChart = ({
  engagementScore,
}: {
  engagementScore: number;
}) => {
  const [showScore, setShowScore] = useState(false);

  return (
  <div className="bg-[#F3EBE2] rounded-2xl p-8 flex flex-col gap-3 flex-1 min-w-0">
    <span className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px]">
      USER SEGMENTATION
    </span>
    <h2 className="text-[28px] text-[#1A1A1A] -tracking-wide m-0">
      Behavioral Clusters
    </h2>
    <div className="relative w-full aspect-[2/1] bg-[#E8E2DA] rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setShowScore((prev) => !prev)}
        className="absolute bottom-2 right-3 text-[10px] text-[#6B6B6B] tracking-wide underline decoration-transparent hover:decoration-[#6B6B6B]"
      >
        Engagement Score &rarr;
      </button>
      {showScore && (
        <div className="absolute bottom-8 right-3 bg-[#1A1A1A] text-[#F3EBE2] text-[10px] px-2 py-1 rounded-md tracking-wide">
          Score: {engagementScore}/100
        </div>
      )}
      <span className="absolute top-2 left-3 text-[10px] text-[#6B6B6B] tracking-wide">
        Revenue Potential &rarr;
      </span>
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#D0CBC3" strokeWidth="0.5" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#D0CBC3" strokeWidth="0.5" />
        <line x1="0" y1="25%" x2="100%" y2="25%" stroke="#D0CBC3" strokeWidth="0.5" strokeDasharray="4" />
        <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#D0CBC3" strokeWidth="0.5" strokeDasharray="4" />
        <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#D0CBC3" strokeWidth="0.5" strokeDasharray="4" />
        <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#D0CBC3" strokeWidth="0.5" strokeDasharray="4" />
      </svg>
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
};

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

const MobileSankeyDiagram = () => (
  <div className="bg-[#F3EBE2] rounded-2xl p-8 flex flex-col gap-3">
    <span className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px]">
      SOLOSCOUT FUNNEL
    </span>
    <p>The <a href="https://soloscout.net" target="_blank"><span className="underline">soloscout</span></a> platform is a community for introspective cozy game designers and storytellers.</p>
    <h2 className="text-[28px] text-[#1A1A1A] -tracking-wide m-0">
      From Attention to Loyalty
    </h2>
    <div className="relative w-full h-72 bg-[#E8E2DA] rounded-xl overflow-hidden flex items-center">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 280" preserveAspectRatio="xMidYMid meet">
        <path d="M130,60 C200,60 200,50 260,50" fill="none" stroke="#C3DED8" strokeWidth="60" opacity="0.3" />
        <path d="M130,140 C200,140 200,170 260,170" fill="none" stroke="#C3DED8" strokeWidth="35" opacity="0.3" />
        <path d="M360,50 C430,50 430,45 460,45" fill="none" stroke="#C4CFDE" strokeWidth="28" opacity="0.3" />
        <path d="M360,100 C420,100 420,130 460,130" fill="none" stroke="#E8D5C4" strokeWidth="48" opacity="0.25" />
        <path d="M360,200 C420,200 420,230 460,230" fill="none" stroke="#C5BEB6" strokeWidth="22" opacity="0.3" />
      </svg>
      <div className="absolute left-[4%] top-1/2 -translate-y-1/2 w-[100px] bg-[#C3DED8] rounded-lg flex flex-col items-center justify-center py-6 px-2" style={{ height: "70%" }}>
        <span className="text-xs font-medium text-[#1A1A1A]">Visit</span>
        <span className="text-lg font-medium text-[#1A1A1A]">42.8K</span>
      </div>
      <div className="absolute left-[33%] top-[10%] w-[100px] bg-[#C4CFDE] rounded-lg flex flex-col items-center justify-center py-4 px-2" style={{ height: "50%" }}>
        <span className="text-xs font-medium text-[#1A1A1A]">Browse</span>
        <span className="text-lg font-medium text-[#1A1A1A]">28.1K</span>
      </div>
      <div className="absolute left-[33%] top-[65%] w-[100px] bg-[#C4CFDE] rounded-lg flex flex-col items-center justify-center py-3 px-2" style={{ height: "28%" }}>
        <span className="text-xs font-medium text-[#1A1A1A]">Wishlist</span>
        <span className="text-lg font-medium text-[#1A1A1A]">8.4K</span>
      </div>
      <div className="absolute right-[16%] top-[8%] w-[100px] bg-[#D5DCBA] rounded-lg flex flex-col items-center justify-center py-3 px-2" style={{ height: "22%" }}>
        <span className="text-xs font-medium text-[#1A1A1A]">Waitlist</span>
        <span className="text-lg font-medium text-[#1A1A1A]">1.4K</span>
      </div>
      <div className="absolute right-[16%] top-[35%] w-[100px] bg-[#E8D5C4] rounded-lg flex flex-col items-center justify-center py-4 px-2" style={{ height: "38%" }}>
        <span className="text-xs font-medium text-[#1A1A1A]">Bounce</span>
        <span className="text-lg font-medium text-[#1A1A1A]">14.7K</span>
      </div>
      <div className="absolute right-[16%] bottom-[5%] w-[100px] bg-[#C5BEB6] rounded-lg flex flex-col items-center justify-center py-2 px-2" style={{ height: "17%" }}>
        <span className="text-xs font-medium text-[#1A1A1A]">Leave</span>
        <span className="text-lg font-medium text-[#1A1A1A]">19.7K</span>
      </div>
    </div>
  </div>
);

/* ── Page ────────────────────────────────────────────────── */

const VisualizationPage = () => {
  const [activeKey, setActiveKey] = useState("analytics");
  const [analyticsKPIs, setAnalyticsKPIs] = useState<KPI[]>(
    kpiSets.analytics.map((k) => ({ ...k, value: "--", delta: "--" }))
  );
  const engagementScore = engagementScores[activeKey] ?? engagementScores.analytics;

  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => r.json())
      .then((d) => {
        if (d.points?.length) setAnalyticsKPIs(computeAnalyticsKPIs(d.points));
      })
      .catch(() => {});
  }, []);

  const kpis = activeKey === "analytics" ? analyticsKPIs : (kpiSets[activeKey] ?? kpiSets.analytics);

  return (
    <PageShell>
      {/* Hero — dark card with time series chart + notch switch */}
      <TimeSeriesHero activeKey={activeKey} onActiveKeyChange={setActiveKey} />

      {/* KPI Metrics Row — context-sensitive to active dataset */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
        {kpis.map((k, i) => (
          <div
            key={`${activeKey}-${i}`}
            className="bg-[#F3EBE2] rounded-2xl p-8 flex flex-col gap-1"
          >
            <AnimatedValue
              value={k.value}
              className="text-4xl md:text-5xl font-medium text-[#1A1A1A] -tracking-wide block"
            />
            <AnimatedValue
              value={k.metric}
              className="text-[11px] text-[#8A8A8A] block"
            />
            <AnimatedValue
              value={k.label}
              className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px] block"
            />
            <AnimatedValue
              value={k.delta}
              className="text-[13px] text-[#3D8C6E] block"
            />
          </div>
        ))}
      </div>

      {/* Sankey — D3 on desktop, simplified flow on mobile */}
      <div className="hidden md:block">
        <SankeyChart />
      </div>
      <div className="md:hidden">
        <MobileSankeyDiagram />
      </div>

      {/* Cluster Section */}
      <div className="flex flex-col md:flex-row gap-1.5">
        <ClusterChart engagementScore={engagementScore} />
        <ClusterLegend />
      </div>

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
