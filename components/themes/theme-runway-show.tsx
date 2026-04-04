"use client";
import React from "react";
import { Column, Paragraph, Link, Headline } from "cross-country";

const paraStyle = { lineHeight: 1.5 };

const ThemeRunwayShow = () => {
  return (
    <Column customStyle={{ padding: 0, alignItems: "center" }}>
      <Headline>Runway Show Dataset</Headline>
      <Paragraph customStyle={paraStyle}>
        Building a dataset of all{" "}
        <Link url="https://www.perplexity.ai/search/i-want-to-build-a-dataset-of-a-9D.Qm8g1QWe0O2WEzmoKNA">
          Vlada Roslyakova
        </Link>{" "}
        runway appearances. Documenting fashion history through data.
      </Paragraph>
    </Column>
  );
};

export default ThemeRunwayShow;
