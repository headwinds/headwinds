"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";
import NotchSwitch from "./NotchSwitch";
import {
  allDatasets as staticDatasets,
  whalingData,
  salmonData,
  allbirdsData,
  type TimeSeriesDataset,
  type TimeSeriesPoint,
} from "./datasets";

const MARGIN = { top: 20, right: 16, bottom: 32, left: 44 };

function formatValue(v: number): string {
  if (v >= 1000) return `${(v / 1000).toFixed(1)}K`;
  return String(v);
}

function buildLiveAnalyticsDataset(
  points: { date: string; sessions: number }[]
): TimeSeriesDataset {
  return {
    key: "analytics",
    label: "Site Analytics",
    unit: "sessions",
    yLabel: "Monthly Sessions",
    color: "#C3DED8",
    points: points.map((p) => ({ date: p.date, value: p.sessions })),
  };
}

interface TimeSeriesHeroProps {
  activeKey: string;
  onActiveKeyChange: (key: string) => void;
}

const TimeSeriesHero: React.FC<TimeSeriesHeroProps> = ({
  activeKey,
  onActiveKeyChange,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 700, h: 280 });
  const [liveAnalytics, setLiveAnalytics] = useState<TimeSeriesDataset | null>(null);
  const [gaStatus, setGaStatus] = useState<"loading" | "live" | "unavailable">("loading");

  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => r.json())
      .then((data) => {
        if (data.points && data.points.length > 0) {
          setLiveAnalytics(buildLiveAnalyticsDataset(data.points));
          setGaStatus("live");
        } else {
          setGaStatus("unavailable");
        }
      })
      .catch(() => setGaStatus("unavailable"));
  }, []);

  const datasets: TimeSeriesDataset[] = [
    liveAnalytics ?? staticDatasets[0],
    allbirdsData,
    //whalingData,
    salmonData,
  ];

  const dataset = datasets.find((d) => d.key === activeKey) ?? datasets[0];

  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setDims({ w: rect.width, h: Math.min(rect.width * 0.4, 320) });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    if (!svgRef.current) return;
    drawChart(svgRef.current, dataset, dims.w, dims.h);
  }, [dataset, dims]);

  return (
    <div className="bg-[#1A1A1A] rounded-2xl px-6 md:px-12 py-10 md:py-14 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end md:gap-8">
        {/* Left — title block */}
        <div className="flex flex-col gap-4 md:w-[340px] md:shrink-0">
          <span className="text-[11px] font-medium text-[#6B6B6B] tracking-[4px]">
            DATA + INSIGHTS
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-[56px] text-[#F3EBE2] m-0 leading-[1.05] -tracking-wide font-normal">
            How I Think
            <br />
            About Analytics
          </h1>
          <p className="text-[17px] text-[#8A8A8A] leading-relaxed m-0">
            Mining millions of raw signals to surface proactive insights.
          </p>
          {activeKey === "analytics" && (
            <span className="text-[11px] text-[#6B6B6B] tracking-[1px]">
              {gaStatus === "live"
                ? "LIVE — Google Analytics"
                : gaStatus === "loading"
                  ? "CONNECTING TO GA4..."
                  : "GA4 DATA UNAVAILABLE — SET GA4_PROPERTY_ID + GA4_SERVICE_ACCOUNT_JSON"}
            </span>
          )}
        </div>

        {/* Right — chart */}
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
          options={datasets.map((d) => d.label)}
          active={dataset.label}
          onChange={(label) => {
            const found = datasets.find((d) => d.label === label);
            if (found) onActiveKeyChange(found.key);
          }}
        />
      </div>
    </div>
  );
};

function drawChart(
  svg: SVGSVGElement,
  dataset: TimeSeriesDataset,
  width: number,
  height: number
) {
  const sel = d3.select(svg);
  sel.selectAll("*").remove();

  const { points, color, yLabel } = dataset;
  const historical = points.filter((p) => !p.predicted);
  const predicted = points.filter((p) => p.predicted);
  const lastHistorical = historical[historical.length - 1];
  const forecastLine = lastHistorical
    ? [lastHistorical, ...predicted]
    : predicted;

  const innerW = width - MARGIN.left - MARGIN.right;
  const innerH = height - MARGIN.top - MARGIN.bottom;

  const x = d3
    .scalePoint<string>()
    .domain(points.map((p) => p.date))
    .range([0, innerW])
    .padding(0.1);

  const yMax = d3.max(points, (p) => p.value) ?? 100;
  const y = d3
    .scaleLinear()
    .domain([0, yMax * 1.15])
    .range([innerH, 0]);

  const g = sel
    .append("g")
    .attr("transform", `translate(${MARGIN.left},${MARGIN.top})`);

  // Grid lines
  const yTicks = y.ticks(5);
  g.selectAll(".grid-line")
    .data(yTicks)
    .enter()
    .append("line")
    .attr("x1", 0)
    .attr("x2", innerW)
    .attr("y1", (d) => y(d))
    .attr("y2", (d) => y(d))
    .attr("stroke", "#333")
    .attr("stroke-width", 0.5);

  // Y axis labels
  g.selectAll(".y-label")
    .data(yTicks)
    .enter()
    .append("text")
    .attr("x", -8)
    .attr("y", (d) => y(d))
    .attr("dy", "0.35em")
    .attr("text-anchor", "end")
    .attr("fill", "#6B6B6B")
    .attr("font-size", 10)
    .text((d) => formatValue(d));

  // X axis labels — show only ~4-5 to keep things tight
  const xLabels = points.map((p) => p.date);
  const step = Math.max(1, Math.floor(xLabels.length / 4));
  g.selectAll(".x-label")
    .data(xLabels.filter((_, i) => i % step === 0 || i === xLabels.length - 1))
    .enter()
    .append("text")
    .attr("x", (d) => x(d) ?? 0)
    .attr("y", innerH + 20)
    .attr("text-anchor", "middle")
    .attr("fill", "#6B6B6B")
    .attr("font-size", 10)
    .text((d) => d);

  // Y axis title
  g.append("text")
    .attr("x", -MARGIN.left + 8)
    .attr("y", -10)
    .attr("fill", "#8A8A8A")
    .attr("font-size", 10)
    .attr("letter-spacing", "2px")
    .text(yLabel.toUpperCase());

  const line = d3
    .line<TimeSeriesPoint>()
    .x((d) => x(d.date) ?? 0)
    .y((d) => y(d.value))
    .curve(d3.curveMonotoneX);

  // Area under historical line
  const area = d3
    .area<TimeSeriesPoint>()
    .x((d) => x(d.date) ?? 0)
    .y0(innerH)
    .y1((d) => y(d.value))
    .curve(d3.curveMonotoneX);

  g.append("path")
    .datum(historical)
    .attr("d", area)
    .attr("fill", color)
    .attr("opacity", 0.08);

  // Historical solid line
  g.append("path")
    .datum(historical)
    .attr("d", line)
    .attr("fill", "none")
    .attr("stroke", color)
    .attr("stroke-width", 2.5)
    .attr("stroke-linecap", "round");

  // Predicted dashed line
  if (forecastLine.length > 1) {
    g.append("path")
      .datum(forecastLine)
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "6 4")
      .attr("opacity", 0.6);
  }

  // Dots on historical points
  g.selectAll(".dot-hist")
    .data(historical)
    .enter()
    .append("circle")
    .attr("cx", (d) => x(d.date) ?? 0)
    .attr("cy", (d) => y(d.value))
    .attr("r", 3)
    .attr("fill", color)
    .attr("stroke", "#1A1A1A")
    .attr("stroke-width", 1.5);

  // Hollow dots on predicted points
  g.selectAll(".dot-pred")
    .data(predicted)
    .enter()
    .append("circle")
    .attr("cx", (d) => x(d.date) ?? 0)
    .attr("cy", (d) => y(d.value))
    .attr("r", 3)
    .attr("fill", "#1A1A1A")
    .attr("stroke", color)
    .attr("stroke-width", 1.5)
    .attr("stroke-dasharray", "2 2");

  // Transition boundary marker
  if (lastHistorical) {
    const bx = x(lastHistorical.date) ?? 0;
    g.append("line")
      .attr("x1", bx)
      .attr("x2", bx)
      .attr("y1", 0)
      .attr("y2", innerH)
      .attr("stroke", "#6B6B6B")
      .attr("stroke-width", 0.5)
      .attr("stroke-dasharray", "3 3");

    g.append("text")
      .attr("x", bx + 6)
      .attr("y", 4)
      .attr("fill", "#6B6B6B")
      .attr("font-size", 9)
      .attr("letter-spacing", "1px")
      .text("FORECAST");
  }
}

export default TimeSeriesHero;
