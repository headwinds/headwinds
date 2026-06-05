"use client";
import React from "react";
import { Column, Paragraph, Link, Headline } from "cross-country";

const paraStyle = { lineHeight: 1.5 };

const ThemeHomeEnergy = () => {
  return (
    <Column customStyle={{ padding: 0, alignItems: "center" }}>
      <Headline>Home Energy & Data Consumption</Headline>
      <Paragraph customStyle={paraStyle}>
        Tracking home energy consumption as it relates to making coffee and 
        other daily activities. Understanding our energy footprint through 
        everyday rituals.
      </Paragraph>
    </Column>
  );
};

export default ThemeHomeEnergy;
