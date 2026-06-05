"use client";
import React from "react";
import { Column, Paragraph, Link, Headline } from "cross-country";

const paraStyle = { lineHeight: 1.5 };

const ThemeBackyardChickens = () => {
  return (
    <Column customStyle={{ padding: 0, alignItems: "center" }}>
      <Headline>Backyard Chickens & Shoffice AUDs</Headline>
      <Paragraph customStyle={paraStyle}>
        Exploring backyard chickens and shoffice (shed+office) accessory 
        dwelling units. Opportunities to build with mass timber and sustainable 
        construction practices.
      </Paragraph>
    </Column>
  );
};

export default ThemeBackyardChickens;
