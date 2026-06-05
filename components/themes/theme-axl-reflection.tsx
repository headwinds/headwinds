"use client";
import React from "react";
import { Column, Paragraph, Link, Headline } from "cross-country";

const paraStyle = { lineHeight: 1.5 };

const ThemeAxlReflection = () => {
  return (
    <Column customStyle={{ padding: 0, alignItems: "center" }}>
      <Headline>AXL & AI Reflection</Headline>
      <Paragraph customStyle={paraStyle}>
        Exploring the intersection of AI systems and reflective practices. 
        How AI can learn from introspection and iterative improvement.
      </Paragraph>
    </Column>
  );
};

export default ThemeAxlReflection;
