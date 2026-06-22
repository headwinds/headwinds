"use client";

import React, { useState } from "react";
import { Column, Row } from "cross-country";
import { Input, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { wishlistItems, wishlistCategories } from "./wishlists-data";
import WishlistCard from "./WishlistCard";

const { Search } = Input;
const { CheckableTag } = Tag;

const WishlistGrid = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All",
  ]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (category === "All") {
      setSelectedCategories(["All"]);
    } else {
      const next = checked
        ? [...selectedCategories.filter((c) => c !== "All"), category]
        : selectedCategories.filter((c) => c !== category);
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
    <Column customStyle={{ padding: 0, gap: 24, width: "100%", maxWidth: 1200 }}>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 m-0">
          Studio Wishlist
        </h1>
        <p className="text-sm text-gray-500 mt-1 m-0">
          Working in eCommerce & Logistics has given me a front-row seat to the tools, software, and services that power the modern supply chain. This is a curated list of the products and services I find most interesting, useful, or just plain cool — from AI platforms to logistics startups and everything in between. 
        </p>
      </div>

      {/* Search */}
      <Column customStyle={{ padding: 0, gap: 12, alignItems: "center" }}>
        <Search
          placeholder="Search items..."
          allowClear
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ maxWidth: 500 }}
          size="large"
        />

        {/* Category filter */}
        <Row
          customStyle={{
            gap: 6,
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: 800,
          }}
        >
          <CheckableTag
            checked={selectedCategories.includes("All")}
            onChange={(checked) => handleCategoryChange("All", checked)}
            style={{ fontSize: 12, padding: "2px 10px", borderRadius: 12 }}
          >
            All
          </CheckableTag>
          {wishlistCategories.map((cat) => (
            <CheckableTag
              key={cat}
              checked={selectedCategories.includes(cat)}
              onChange={(checked) => handleCategoryChange(cat, checked)}
              style={{ fontSize: 12, padding: "2px 10px", borderRadius: 12 }}
            >
              {cat}
            </CheckableTag>
          ))}
        </Row>
      </Column>

      {/* Count */}
      <div style={{ textAlign: "center", opacity: 0.6, fontSize: 14 }}>
        {filtered.length} {filtered.length === 1 ? "item" : "items"}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {filtered.map((item) => (
          <WishlistCard key={item.id} item={item} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: 40,
            opacity: 0.5,
            fontSize: 16,
          }}
        >
          No items found. Try adjusting your search or filters.
        </div>
      )}
    </Column>
  );
};

export default WishlistGrid;
