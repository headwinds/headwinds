"use client";

import React from "react";
import { Column, Row, Link as CCLink } from "cross-country";
import { Tag } from "antd";
import { LinkOutlined, CheckCircleFilled } from "@ant-design/icons";
import type { WishlistItem } from "./types";

const placeholderColors = [
  "#6366f1",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#8b5cf6",
  "#ef4444",
  "#14b8a6",
];

function getPlaceholderColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return placeholderColors[Math.abs(hash) % placeholderColors.length];
}

function getInitials(name: string): string {
  return name
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

interface WishlistCardProps {
  item: WishlistItem;
}

const WishlistCard = ({ item }: WishlistCardProps) => {
  const hasImage = item.image && !item.image.endsWith("/favicon.ico");
  const bgColor = getPlaceholderColor(item.id);

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-gray-200 bg-white overflow-hidden transition-shadow hover:shadow-md no-underline"
    >
      {/* Image / Placeholder */}
      <div className="relative w-full h-40 overflow-hidden bg-gray-100">
        {hasImage ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = "none";
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className={`w-full h-full items-center justify-center text-white text-2xl font-bold ${hasImage ? "hidden" : "flex"}`}
          style={{ backgroundColor: bgColor }}
        >
          {getInitials(item.name)}
        </div>

        {/* Status badge */}
        {item.status === "purchased" && (
          <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircleFilled style={{ fontSize: 10 }} />
            Owned
          </div>
        )}

        {/* External link icon */}
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-full p-1">
          <LinkOutlined style={{ color: "white", fontSize: 12 }} />
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-900 leading-tight truncate m-0">
          {item.name}
        </h3>
        <div className="mt-2">
          <Tag
            color="default"
            style={{
              fontSize: 11,
              borderRadius: 12,
              margin: 0,
            }}
          >
            {item.category}
          </Tag>
        </div>
        {item.notes && (
          <p className="mt-1.5 text-xs text-gray-500 truncate m-0">
            {item.notes}
          </p>
        )}
      </div>
    </a>
  );
};

export default WishlistCard;
