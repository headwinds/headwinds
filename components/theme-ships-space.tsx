"use client";
import React from "react";
import { Column, Paragraph, Link, Headline } from "cross-country";

const paraStyle = { lineHeight: 1.5 };

const ThemeShipsSpace = () => {
  return (
    <Column customStyle={{ padding: 0, alignItems: "center" }}>
      <Headline level={3}>Ships & Space Logistics</Headline>
      <Paragraph customStyle={paraStyle}>
        Exploring the parallels between maritime shipping and space logistics. 
        From ocean vessels to spacecraft, the art of moving cargo across 
        vast distances.
      </Paragraph>
    </Column>
  );
};

export default ThemeShipsSpace;
