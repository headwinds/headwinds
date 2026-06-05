"use client";
import React, { useState } from "react";
import { Column, Row } from "cross-country";
import { Input, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import ThemeMensHealth from "./theme-mens-health";
import ThemeSalmonMigration from "./theme-salmon-migration";
import ThemeBackyardChickens from "./theme-backyard-chickens";
import ThemeRunwayShow from "./theme-runway-show";
import ThemeCarbonEmission from "./theme-carbon-emission";
import ThemeAxlReflection from "./theme-axl-reflection";
import ThemeFrenchFriction from "./theme-french-friction";
import ThemeShipsSpace from "./theme-ships-space";
import ThemeLastKingdom from "./theme-last-kingdom";
import ThemeGraphNodes from "./theme-graph-nodes";
import ThemeHomeEnergy from "./theme-home-energy";
import ThemeTtrpgToys from "./theme-ttrpg-toys";

const { Search } = Input;
const { CheckableTag } = Tag;

interface ThemeItem {
  id: string;
  component: React.ReactNode;
  title: string;
  keywords: string[];
  category: string;
}

const themes: ThemeItem[] = [
  {
    id: "mens-health",
    component: <ThemeMensHealth />,
    title: "Men's Health in Winter",
    keywords: ["health", "fashion", "sweaters", "winter", "style"],
    category: "Lifestyle",
  },
  {
    id: "salmon-migration",
    component: <ThemeSalmonMigration />,
    title: "Salmon Migration",
    keywords: ["nature", "salmon", "humber", "river", "wildlife", "research"],
    category: "Nature",
  },
  {
    id: "backyard-chickens",
    component: <ThemeBackyardChickens />,
    title: "Backyard Chickens & Shoffice AUDs",
    keywords: ["chickens", "construction", "mass timber", "ADU", "sustainable"],
    category: "Lifestyle",
  },
  {
    id: "runway-show",
    component: <ThemeRunwayShow />,
    title: "Runway Show Dataset",
    keywords: ["fashion", "data", "runway", "vlada", "dataset"],
    category: "Data & Research",
  },
  {
    id: "carbon-emission",
    component: <ThemeCarbonEmission />,
    title: "Carbon Emission Reduction",
    keywords: ["environment", "carbon", "climate", "sustainability", "neutral"],
    category: "Environment",
  },
  {
    id: "axl-reflection",
    component: <ThemeAxlReflection />,
    title: "AXL & AI Reflection",
    keywords: ["AI", "reflection", "machine learning", "introspection"],
    category: "Technology",
  },
  {
    id: "french-friction",
    component: <ThemeFrenchFriction />,
    title: "French Friction",
    keywords: ["language", "french", "bilingual", "learning", "culture"],
    category: "Language & Culture",
  },
  {
    id: "ships-space",
    component: <ThemeShipsSpace />,
    title: "Ships & Space Logistics",
    keywords: ["logistics", "ships", "space", "maritime", "cargo"],
    category: "Technology",
  },
  {
    id: "last-kingdom",
    component: <ThemeLastKingdom />,
    title: "Last Kingdom, Trolls & Giants",
    keywords: ["mythology", "norse", "folklore", "medieval", "history"],
    category: "Culture & History",
  },
  {
    id: "graph-nodes",
    component: <ThemeGraphNodes />,
    title: "Graph Node Networks",
    keywords: ["data", "graphs", "networks", "analysis", "structure"],
    category: "Technology",
  },
  {
    id: "home-energy",
    component: <ThemeHomeEnergy />,
    title: "Home Energy & Data",
    keywords: ["energy", "home", "consumption", "coffee", "data"],
    category: "Environment",
  },
  {
    id: "ttrpg-toys",
    component: <ThemeTtrpgToys />,
    title: "TTRPG & Wood Toys",
    keywords: ["games", "ttrpg", "wood", "crafts", "moss", "toys"],
    category: "Hobbies",
  },
];

const categories = [
  "All",
  "Technology",
  "Nature",
  "Environment",
  "Lifestyle",
  "Data & Research",
  "Language & Culture",
  "Culture & History",
  "Hobbies",
];

const Themes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (category === "All") {
      setSelectedCategories(["All"]);
    } else {
      const newCategories = checked
        ? [...selectedCategories.filter((c) => c !== "All"), category]
        : selectedCategories.filter((c) => c !== category);
      setSelectedCategories(newCategories.length === 0 ? ["All"] : newCategories);
    }
  };

  const filteredThemes = themes.filter((theme) => {
    const matchesSearch =
      searchQuery === "" ||
      theme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      theme.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategories.includes("All") ||
      selectedCategories.includes(theme.category);

    return matchesSearch && matchesCategory;
  });

  return (
    <Column customStyle={{ padding: 0, gap: 24 }}>
      {/* Search and Filter Section */}
      <Column customStyle={{ padding: 0, gap: 16, alignItems: "center" }}>
        <Search
          placeholder="Search themes..."
          allowClear
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ maxWidth: 600 }}
          size="large"
        />
        
        <Row customStyle={{ gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          {categories.map((category) => (
            <CheckableTag
              key={category}
              checked={selectedCategories.includes(category)}
              onChange={(checked) => handleCategoryChange(category, checked)}
              style={{
                fontSize: 14,
                padding: "4px 12px",
                borderRadius: 16,
              }}
            >
              {category}
            </CheckableTag>
          ))}
        </Row>
      </Column>

      {/* Results Count */}
      <div style={{ textAlign: "center", opacity: 0.6, fontSize: 14 }}>
        {filteredThemes.length} {filteredThemes.length === 1 ? "theme" : "themes"}
      </div>

      {/* Theme Components */}
      <Column customStyle={{ padding: 0, gap: 32 }}>
        {filteredThemes.map((theme) => (
          <div key={theme.id}>{theme.component}</div>
        ))}
      </Column>

      {/* No Results Message */}
      {filteredThemes.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: 40,
            opacity: 0.5,
            fontSize: 16,
          }}
        >
          No themes found. Try adjusting your search or filters.
        </div>
      )}
    </Column>
  );
};

export default Themes;
