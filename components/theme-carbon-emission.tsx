"use client";
import React from "react";
import { Column, Paragraph, Link, Headline } from "cross-country";

const paraStyle = { lineHeight: 1.5 };

const ThemeCarbonEmission = () => {
  return (
    <Column customStyle={{ padding: 0, alignItems: "center" }}>
      <Headline level={3}>Carbon Emission Reduction & Net Neutral</Headline>
      <Paragraph customStyle={paraStyle}>
        Fighting the feeling of hopelessness that there's nothing I can do. 
        What is the least one can do? Exploring practical steps toward 
        carbon neutrality.
      </Paragraph>
    </Column>
  );
};

export default ThemeCarbonEmission;
