"use client";
import React from "react";
import { Column, Paragraph, Link, Headline } from "cross-country";

const paraStyle = { lineHeight: 1.5 };

const ThemeGraphNodes = () => {
  return (
    <Column customStyle={{ padding: 0, alignItems: "center" }}>
      <Headline level={3}>Graph Node Networks</Headline>
      <Paragraph customStyle={paraStyle}>
        Exploring data structures, knowledge graphs, and network analysis. 
        How connected systems can reveal patterns and relationships.
      </Paragraph>
    </Column>
  );
};

export default ThemeGraphNodes;
