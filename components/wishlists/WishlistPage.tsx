"use client";

import React, { useState } from "react";
import PageShell from "@/components/layout/PageShell";
import { wishlistItems, wishlistCategories } from "./wishlists-data";
import { useFilterMetrics } from "@/hooks/useFilterMetrics";
import type { WishlistItem } from "./types";

const pastelColors = ["#C3DED8", "#C4CFDE", "#D5DCBA", "#E8D5C4"];

function getColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return pastelColors[Math.abs(hash) % pastelColors.length];
}

function getInitials(name: string): string {
  return name
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

const ItemCard = ({ item }: { item: WishlistItem }) => {
  const hasImage = item.image && !item.image.endsWith("/favicon.ico");
  const bgColor = getColor(item.id);
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-[#F3EBE2] rounded-2xl overflow-hidden no-underline transition-shadow hover:shadow-lg"
    >
      {/* Image / Placeholder */}
      <div className="relative w-full h-44 overflow-hidden">
        {hasImage && !imgFailed ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white text-2xl font-bold"
            style={{ backgroundColor: bgColor }}
          >
            {getInitials(item.name)}
          </div>
        )}
        {item.status === "purchased" && (
          <div className="absolute top-3 left-3 bg-[#1A1A1A] text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
            Owned
          </div>
        )}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-full p-1.5">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
          >
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-sm font-medium text-[#1A1A1A] leading-tight truncate m-0">
          {item.name}
        </h3>
        <span
          className="text-[11px] px-2.5 py-0.5 rounded-full w-fit"
          style={{ backgroundColor: bgColor, color: "#1A1A1A" }}
        >
          {item.category}
        </span>
        {item.notes && (
          <p className="text-xs text-[#6B6B6B] truncate m-0">{item.notes}</p>
        )}
      </div>
    </a>
  );
};

const WishlistPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All",
  ]);
  const { track } = useFilterMetrics("wishlist");

  const handleCategoryChange = (category: string) => {
    track(category);
    if (category === "All") {
      setSelectedCategories(["All"]);
    } else {
      const isSelected = selectedCategories.includes(category);
      const next = isSelected
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories.filter((c) => c !== "All"), category];
      setSelectedCategories(next.length === 0 ? ["All"] : next);
    }
  };

  const filtered = wishlistItems.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      q === "" ||
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.notes && item.notes.toLowerCase().includes(q));

    const matchesCategory =
      selectedCategories.includes("All") ||
      selectedCategories.includes(item.category);

    return matchesSearch && matchesCategory;
  });

  return (
    <PageShell>
      {/* Page Header */}
      <div className="bg-[#F3EBE2] rounded-2xl px-12 py-12 flex flex-col gap-4">
        <span className="text-xs font-medium text-[#6B6B6B] tracking-[3px] uppercase">
          Wishlist
        </span>
        <h1 className="text-5xl text-[#1A1A1A] m-0 -tracking-wide font-normal">
          Studio Wishlist
        </h1>
        <p className="text-[17px] text-[#3D3D3D] leading-relaxed m-0">
          Things I want, need, or am curious about.{" "}
          {wishlistItems.length} items across {wishlistCategories.length}{" "}
          categories.
        </p>
      </div>

      {/* Search */}
      <div className="bg-[#F3EBE2] rounded-2xl px-8 py-5 flex items-center gap-3">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6B6B6B"
          strokeWidth="2"
          className="shrink-0"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder={`Search ${wishlistItems.length} items...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white rounded-lg h-10 px-3 text-sm text-[#1A1A1A] placeholder:text-[#AAAAAA] border-0 outline-none focus:ring-2 focus:ring-[#C3DED8]"
        />
      </div>

      {/* Category Chips */}
      <div className="bg-[#F3EBE2] rounded-2xl px-8 py-4 flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryChange("All")}
          className={`h-8 px-4 rounded-full text-[13px] border-0 cursor-pointer transition-colors ${
            selectedCategories.includes("All")
              ? "bg-[#1A1A1A] text-white font-medium"
              : "bg-white text-[#3D3D3D] border border-[#D0D0D0]"
          }`}
        >
          All
        </button>
        {wishlistCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`h-8 px-4 rounded-full text-[13px] border-0 cursor-pointer transition-colors ${
              selectedCategories.includes(cat)
                ? "bg-[#1A1A1A] text-white font-medium"
                : "bg-white text-[#3D3D3D]"
            }`}
            style={
              !selectedCategories.includes(cat)
                ? { border: "1px solid #D0D0D0" }
                : undefined
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="bg-[#F3EBE2] rounded-2xl px-8 py-3">
        <span className="text-sm text-[#6B6B6B]">
          Showing {filtered.length} {filtered.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5">
        {filtered.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="bg-[#F3EBE2] rounded-2xl px-12 py-16 text-center">
          <p className="text-[#6B6B6B] text-base m-0">
            No items found. Try adjusting your search or filters.
          </p>
        </div>
      )}
    </PageShell>
  );
};

export default WishlistPage;
