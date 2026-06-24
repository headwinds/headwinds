"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";
import NotchSwitch from "@/components/visualization/NotchSwitch";
import {
  cumulativeGrowth,
  memoryEvents,
  customSkillEvents,
} from "@/docs/articles/hermes/hermes_growth_data";

const MARGIN = { top: 48, right: 24, bottom: 36, left: 52 };

const METRICS = [
  {
    key: "messages",
    label: "Messages",
    color: "#C3DED8",
    yLabel: "Cumulative Messages",
  },
  {
    key: "toolCalls",
    label: "Tool Calls",
    color: "#D5DCBA",
    yLabel: "Cumulative Tool Calls",
  },
  {
    key: "tokens",
    label: "Tokens",
    color: "#E8D5C4",
    yLabel: "Cumulative Tokens",
  },
] as const;

type MetricKey = (typeof METRICS)[number]["key"];

function formatLabel(date: string): string {
  const [, month, day] = date.split("-");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}`;
}

function formatValue(v: number, key: MetricKey): string {
  if (key === "tokens") {
    if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000) return `${(v / 1_000).toFixed(0)}K`;
    return String(v);
  }
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)}K`;
  return String(v);
}

interface Milestone {
  date: string;
  labels: string[];
  color: string;
}

function buildMilestones(): Milestone[] {
  const map = new Map<string, string[]>();

  for (const ev of memoryEvents) {
    const labels = map.get(ev.day) ?? [];
    if (ev.memoryLocked) labels.push("Memory Locked");
    if (ev.memoryUpdated) labels.push("Memory Updated");
    map.set(ev.day, labels);
  }

  for (const [day, added] of Object.entries(customSkillEvents)) {
    if (added) {
      const labels = map.get(day) ?? [];
      labels.push("Skill Created");
      map.set(day, labels);
    }
  }

  return Array.from(map.entries()).map(([date, labels]) => ({
    date,
    labels,
    color: labels.some((l) => l.includes("Memory")) ? "#C3DED8" : "#D5DCBA",
  }));
}

const MILESTONES = buildMilestones();

interface DrawOptions {
  svg: SVGSVGElement;
  points: { date: string; value: number }[];
  milestones: Milestone[];
  color: string;
  yLabel: string;
  metricKey: MetricKey;
  width: number;
  height: number;
}

function drawChart({
  svg,
  points,
  milestones,
  color,
  yLabel,
  metricKey,
  width,
  height,
}: DrawOptions) {
  const sel = d3.select(svg);
  sel.selectAll("*").remove();

  const innerW = width - MARGIN.left - MARGIN.right;
  const innerH = height - MARGIN.top - MARGIN.bottom;

  const x = d3
    .scalePoint<string>()
    .domain(points.map((p) => p.date))
    .range([0, innerW])
    .padding(0.5);

  const yMax = d3.max(points, (p) => p.value) ?? 1;
  const y = d3
    .scaleLinear()
    .domain([0, yMax * 1.2])
    .range([innerH, 0]);

  const g = sel
    .append("g")
    .attr("transform", `translate(${MARGIN.left},${MARGIN.top})`);

  // Grid lines
  const yTicks = y.ticks(4);
  g.selectAll(".grid")
    .data(yTicks)
    .enter()
    .append("line")
    .attr("x1", 0)
    .attr("x2", innerW)
    .attr("y1", (d) => y(d))
    .attr("y2", (d) => y(d))
    .attr("stroke", "#2A2A2A")
    .attr("stroke-width", 1);

  // Y axis labels
  g.selectAll(".y-label")
    .data(yTicks)
    .enter()
    .append("text")
    .attr("x", -10)
    .attr("y", (d) => y(d))
    .attr("dy", "0.35em")
    .attr("text-anchor", "end")
    .attr("fill", "#6B6B6B")
    .attr("font-size", 10)
    .text((d) => formatValue(d, metricKey));

  // Y axis title
  g.append("text")
    .attr("x", -MARGIN.left + 6)
    .attr("y", -28)
    .attr("fill", "#6B6B6B")
    .attr("font-size", 9)
    .attr("letter-spacing", "2px")
    .text(yLabel.toUpperCase());

  // X axis labels
  g.selectAll(".x-label")
    .data(points)
    .enter()
    .append("text")
    .attr("x", (d) => x(d.date) ?? 0)
    .attr("y", innerH + 22)
    .attr("text-anchor", "middle")
    .attr("fill", "#6B6B6B")
    .attr("font-size", 10)
    .text((d) => formatLabel(d.date));

  // Milestone vertical markers and floating badges
  /*
  for (const ms of milestones) {
    const cx = x(ms.date);
    if (cx == null) continue;

    // Vertical stem
    g.append("line")
      .attr("x1", cx)
      .attr("x2", cx)
      .attr("y1", 0)
      .attr("y2", innerH)
      .attr("stroke", ms.color)
      .attr("stroke-width", 0.75)
      .attr("stroke-dasharray", "3 3")
      .attr("opacity", 0.5);

    // Badge labels above the chart area (into the top margin)
    const badgeY = -MARGIN.top + 8;
    ms.labels.forEach((label, i) => {
      const badgeW = label.length * 5.6 + 12;
      const bx = cx - badgeW / 2;
      const by = badgeY + i * 18;

      g.append("rect")
        .attr("x", bx)
        .attr("y", by)
        .attr("width", badgeW)
        .attr("height", 14)
        .attr("rx", 3)
        .attr("fill", ms.color)
        .attr("opacity", 0.15);

      g.append("text")
        .attr("x", cx)
        .attr("y", by + 9)
        .attr("text-anchor", "middle")
        .attr("fill", ms.color)
        .attr("font-size", 8.5)
        .attr("letter-spacing", "0.8px")
        .text(label.toUpperCase());
    });
  }*/

  // Area fill
  const area = d3
    .area<{ date: string; value: number }>()
    .x((d) => x(d.date) ?? 0)
    .y0(innerH)
    .y1((d) => y(d.value))
    .curve(d3.curveMonotoneX);

  g.append("path")
    .datum(points)
    .attr("d", area)
    .attr("fill", color)
    .attr("opacity", 0.07);

  // Line
  const line = d3
    .line<{ date: string; value: number }>()
    .x((d) => x(d.date) ?? 0)
    .y((d) => y(d.value))
    .curve(d3.curveMonotoneX);

  g.append("path")
    .datum(points)
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", color)
    .attr("stroke-width", 2.5)
    .attr("stroke-linecap", "round");

  // Dots
  g.selectAll(".dot")
    .data(points)
    .enter()
    .append("circle")
    .attr("cx", (d) => x(d.date) ?? 0)
    .attr("cy", (d) => y(d.value))
    .attr("r", 4)
    .attr("fill", (d) => {
      const hasMilestone = milestones.some((m) => m.date === d.date);
      return hasMilestone ? "#1A1A1A" : color;
    })
    .attr("stroke", color)
    .attr("stroke-width", 2);

  // Value labels above dots
  g.selectAll(".val-label")
    .data(points)
    .enter()
    .append("text")
    .attr("x", (d) => x(d.date) ?? 0)
    .attr("y", (d) => y(d.value) - 10)
    .attr("text-anchor", "middle")
    .attr("fill", "#8A8A8A")
    .attr("font-size", 9)
    .text((d) => formatValue(d.value, metricKey));
}

export default function HermesGrowthChart() {
  const [activeMetric, setActiveMetric] = useState<MetricKey>("messages");
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 640, h: 260 });

  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setDims({ w: rect.width, h: Math.min(rect.width * 0.44, 300) });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    if (!svgRef.current) return;
    const metric = METRICS.find((m) => m.key === activeMetric)!;
    const points = cumulativeGrowth.map((p) => ({
      date: p.day,
      value:
        activeMetric === "messages"
          ? p.cumulativeMessages
          : activeMetric === "toolCalls"
          ? p.cumulativeToolCalls
          : p.cumulativeTokens,
    }));

    drawChart({
      svg: svgRef.current,
      points,
      milestones: MILESTONES,
      color: metric.color,
      yLabel: metric.yLabel,
      metricKey: activeMetric,
      width: dims.w,
      height: dims.h,
    });
  }, [activeMetric, dims]);

  const active = METRICS.find((m) => m.key === activeMetric)!;

  return (
    <div className="bg-[#1A1A1A] rounded-2xl px-6 md:px-10 py-8 md:py-10 flex flex-col gap-6 not-prose">
      <div className="flex flex-col md:flex-row md:items-start md:gap-10">
        {/* Left caption */}
        <div className="flex flex-col gap-3 md:w-[260px] md:shrink-0">
          <span className="text-[10px] font-medium text-[#6B6B6B] tracking-[4px]">
            HERMES / GROWTH
          </span>
          <p className="text-[15px] text-[#F3EBE2] leading-snug m-0">
            Cumulative{" "}
            <span style={{ color: active.color }}>
              {active.label.toLowerCase()}
            </span>{" "}
            across the first sessions — with memory and skill milestones marked.
          </p>
          <div className="flex flex-col gap-1.5 mt-2">
            {MILESTONES.map((ms) =>
              ms.labels.map((label) => (
                <div
                  key={`${ms.date}-${label}`}
                  className="flex items-center gap-2"
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full shrink-0"
                    style={{ background: ms.color, opacity: 0.7 }}
                  />
                  <span className="text-[11px] text-[#6B6B6B] tracking-wide">
                    {label} — {formatLabel(ms.date)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chart */}
        <div ref={containerRef} className="flex-1 min-w-0 mt-6 md:mt-0">
          <svg
            ref={svgRef}
            width={dims.w}
            height={dims.h}
            className="overflow-visible"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <NotchSwitch
          options={METRICS.map((m) => m.label)}
          active={active.label}
          onChange={(label) => {
            const found = METRICS.find((m) => m.label === label);
            if (found) setActiveMetric(found.key);
          }}
        />
      </div>
    </div>
  );
}
