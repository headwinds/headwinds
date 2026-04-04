"use client";
import React from "react";
import { Column, Paragraph, Link, Headline } from "cross-country";

const paraStyle = { lineHeight: 1.5 };

const ThemeLastKingdom = () => {
  return (
    <Column customStyle={{ padding: 0, alignItems: "center" }}>
      <Headline>Last Kingdom, Ghost, Trolls & Giants</Headline>
      <Paragraph customStyle={paraStyle}>
        Exploring Norse mythology, medieval history, and folklore. From the 
        battles of the Last Kingdom to the supernatural beings that populate 
        Scandinavian legends.
      </Paragraph>
    </Column>
  );
};

export default ThemeLastKingdom;
