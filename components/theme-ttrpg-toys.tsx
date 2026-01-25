"use client";
import React from "react";
import { Column, Paragraph, Link, Headline } from "cross-country";

const paraStyle = { lineHeight: 1.5 };

const ThemeTtrpgToys = () => {
  return (
    <Column customStyle={{ padding: 0, alignItems: "center" }}>
      <Headline level={3}>TTRPG & Wood Toys with Moss</Headline>
      <Paragraph customStyle={paraStyle}>
        Exploring tabletop role-playing games and handcrafted wooden toys. 
        Combining natural materials like moss with traditional craftsmanship 
        and storytelling.
      </Paragraph>
    </Column>
  );
};

export default ThemeTtrpgToys;
