"use client";
import React from "react";
import { Column, Paragraph, Link, Headline } from "cross-country";

const paraStyle = { lineHeight: 1.5 };

const ThemeMensHealth = () => {
  return (
    <Column customStyle={{ padding: 0, alignItems: "center" }}>
      <Headline level={3}>Men's Health in Winter</Headline>
      <Paragraph customStyle={paraStyle}>
        Best sweaters for this season (sneak to spring & summer). Exploring 
        style, comfort, and seasonal transitions in men's fashion.
      </Paragraph>
    </Column>
  );
};

export default ThemeMensHealth;
