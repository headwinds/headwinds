"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import * as d3 from "d3";
import { sankey as d3Sankey, sankeyLinkHorizontal } from "d3-sankey";
import { sankeyNodes, sankeyLinks } from "./datasets";

const MARGIN = { top: 16, right: 24, bottom: 16, left: 24 };

interface GNode {
  id: string;
  label: string;
  subtitle?: string;
  color: string;
  x0?: number;
  x1?: number;
  y0?: number;
  y1?: number;
  sourceLinks?: GLink[];
  targetLinks?: GLink[];
}

interface GLink {
  source: GNode;
  target: GNode;
  value: number;
  width?: number;
  y0?: number;
  y1?: number;
}

function formatK(v: number): string {
  if (v >= 1000) return `${(v / 1000).toFixed(1)}K`;
  return String(v);
}

const SankeyChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 700, h: 360 });
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    text: string;
  } | null>(null);

  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const w = rect.width;
    const h = Math.max(300, Math.min(w * 0.5, 420));
    setDims({ w, h });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    if (!svgRef.current) return;
    drawSankey(svgRef.current, dims.w, dims.h, setTooltip);
  }, [dims]);

  return (
    <div className="bg-[#F3EBE2] rounded-2xl p-8 flex flex-col gap-3">
      <span className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px]">
        SOLOSCOUT FUNNEL
      </span>
      <h2 className="text-[28px] text-[#1A1A1A] -tracking-wide m-0">
        From Attention to Loyalty
      </h2>
      <div
        ref={containerRef}
        className="relative w-full bg-[#E8E2DA] rounded-xl overflow-hidden"
      >
        <svg
          ref={svgRef}
          width={dims.w}
          height={dims.h}
          className="overflow-visible"
        />
        {tooltip && (
          <div
            className="absolute pointer-events-none bg-[#1A1A1A] text-[#F3EBE2] text-xs px-3 py-1.5 rounded-lg shadow-lg"
            style={{
              left: tooltip.x,
              top: tooltip.y,
              transform: "translate(-50%, -120%)",
            }}
          >
            {tooltip.text}
          </div>
        )}
      </div>
    </div>
  );
};

function drawSankey(
  svg: SVGSVGElement,
  width: number,
  height: number,
  setTooltip: (t: { x: number; y: number; text: string } | null) => void
) {
  const sel = d3.select(svg);
  sel.selectAll("*").remove();

  const nodes = sankeyNodes.map((n) => ({ ...n }));
  const links = sankeyLinks.map((l) => ({
    source: l.source,
    target: l.target,
    value: l.value,
  }));

  // d3-sankey's strict generics fight with our custom node shape,
  // so we build the layout untyped and cast back after computation.
  const layout = (d3Sankey as Function)()
    .nodeId((d: { id: string }) => d.id)
    .nodeWidth(20)
    .nodePadding(24)
    .nodeSort(null)
    .extent([
      [MARGIN.left, MARGIN.top],
      [width - MARGIN.right, height - MARGIN.bottom],
    ]);

  const graph = layout({ nodes, links });
  const gNodes = graph.nodes as GNode[];
  const gLinks = graph.links as GLink[];

  const g = sel.append("g");
  const linkPath = sankeyLinkHorizontal();

  g.selectAll(".sankey-link")
    .data(gLinks)
    .enter()
    .append("path")
    .attr("d", linkPath as unknown as (d: unknown) => string)
    .attr("fill", "none")
    .attr("stroke", (d: GLink) => d.source.color ?? "#C5BEB6")
    .attr("stroke-width", (d: GLink) => Math.max(2, d.width ?? 1))
    .attr("stroke-opacity", 0.35)
    .on("mouseenter", function (_event: MouseEvent, d: GLink) {
      d3.select(this).attr("stroke-opacity", 0.6);
      setTooltip({
        x: ((d.source.x1 ?? 0) + (d.target.x0 ?? 0)) / 2,
        y: ((d.y0 ?? 0) + (d.y1 ?? 0)) / 2,
        text: `${d.source.label} → ${d.target.label}: ${formatK(d.value)}`,
      });
    })
    .on("mouseleave", function () {
      d3.select(this).attr("stroke-opacity", 0.35);
      setTooltip(null);
    });

  const nodeGroups = g
    .selectAll(".sankey-node")
    .data(gNodes)
    .enter()
    .append("g")
    .on("mouseenter", function (_event: MouseEvent, d: GNode) {
      const totalIn = (d.targetLinks ?? []).reduce((s, l) => s + l.value, 0);
      const totalOut = (d.sourceLinks ?? []).reduce((s, l) => s + l.value, 0);
      setTooltip({
        x: ((d.x0 ?? 0) + (d.x1 ?? 0)) / 2,
        y: (d.y0 ?? 0) - 4,
        text: `${d.label}: ${formatK(Math.max(totalIn, totalOut))}`,
      });
    })
    .on("mouseleave", () => setTooltip(null));

  nodeGroups
    .append("rect")
    .attr("x", (d: GNode) => d.x0 ?? 0)
    .attr("y", (d: GNode) => d.y0 ?? 0)
    .attr("width", (d: GNode) => (d.x1 ?? 0) - (d.x0 ?? 0))
    .attr("height", (d: GNode) => Math.max(1, (d.y1 ?? 0) - (d.y0 ?? 0)))
    .attr("rx", 4)
    .attr("fill", (d: GNode) => d.color);

  nodeGroups
    .append("text")
    .attr("x", (d: GNode) =>
      (d.x0 ?? 0) < width / 2 ? (d.x1 ?? 0) + 8 : (d.x0 ?? 0) - 8
    )
    .attr("y", (d: GNode) => ((d.y0 ?? 0) + (d.y1 ?? 0)) / 2)
    .attr("dy", "-0.2em")
    .attr("text-anchor", (d: GNode) =>
      (d.x0 ?? 0) < width / 2 ? "start" : "end"
    )
    .attr("fill", "#1A1A1A")
    .attr("font-size", 12)
    .attr("font-weight", 500)
    .text((d: GNode) => d.label);

  nodeGroups
    .filter((d: GNode) => !!d.subtitle)
    .append("text")
    .attr("x", (d: GNode) =>
      (d.x0 ?? 0) < width / 2 ? (d.x1 ?? 0) + 8 : (d.x0 ?? 0) - 8
    )
    .attr("y", (d: GNode) => ((d.y0 ?? 0) + (d.y1 ?? 0)) / 2)
    .attr("dy", "1em")
    .attr("text-anchor", (d: GNode) =>
      (d.x0 ?? 0) < width / 2 ? "start" : "end"
    )
    .attr("fill", "#6B6B6B")
    .attr("font-size", 10)
    .attr("letter-spacing", "1px")
    .text((d: GNode) => (d.subtitle ?? "").toUpperCase());

  nodeGroups
    .append("text")
    .attr("x", (d: GNode) =>
      (d.x0 ?? 0) < width / 2 ? (d.x1 ?? 0) + 8 : (d.x0 ?? 0) - 8
    )
    .attr("y", (d: GNode) => ((d.y0 ?? 0) + (d.y1 ?? 0)) / 2)
    .attr("dy", "2.4em")
    .attr("text-anchor", (d: GNode) =>
      (d.x0 ?? 0) < width / 2 ? "start" : "end"
    )
    .attr("fill", "#8A8A8A")
    .attr("font-size", 10)
    .text((d: GNode) => {
      const totalIn = (d.targetLinks ?? []).reduce((s, l) => s + l.value, 0);
      const totalOut = (d.sourceLinks ?? []).reduce((s, l) => s + l.value, 0);
      return formatK(Math.max(totalIn, totalOut));
    });
}

export default SankeyChart;
