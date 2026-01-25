"use client";
import React from "react";
import { Column, Paragraph, Link, Headline } from "cross-country";

const paraStyle = { lineHeight: 1.5 };

const ThemeSalmonMigration = () => {
  return (
    <Column customStyle={{ padding: 0, alignItems: "center" }}>
      <Headline> Salmon Migration</Headline>
      <Paragraph customStyle={paraStyle}>
        Tracking{" "}
        <Link url="https://www.perplexity.ai/search/each-year-i-like-to-see-the-mi-2PCDTgsVRYOPNS6LUQG17g#0">
          salmon migration along the Humber River
        </Link>
        . See the{" "}
        <Link url="https://github.com/brandon-flowers/scout-graph">
          scout-graph
        </Link>{" "}
        project for more research.
      </Paragraph>
    </Column>
  );
};

export default ThemeSalmonMigration;
