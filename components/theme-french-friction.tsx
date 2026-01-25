"use client";
import React from "react";
import { Column, Paragraph, Link, Headline } from "cross-country";

const paraStyle = { lineHeight: 1.5 };

const ThemeFrenchFriction = () => {
  return (
    <Column customStyle={{ padding: 0, alignItems: "center" }}>
      <Headline level={3}>French Friction</Headline>
      <Paragraph customStyle={paraStyle}>
        Exploring the challenges and nuances of language learning, cultural 
        exchange, and bilingual communication.
      </Paragraph>
    </Column>
  );
};

export default ThemeFrenchFriction;
