"use client";
import React from "react";
import { Column } from "cross-country";

const moss = "#bccd9d";
const gold = "rgb(207, 192, 127)"; //"#b2a25a";
const teal = "#0baeae";

interface TestType {
  color: string;
  backgroundColor: string;
  padding: number;
  borderRadius: number;
}

const Quote = ({ text }: { text: string }) => {
  const quoteStyle = {
    display: "flex",
    flexDirection: "column" as const,
    position: "relative" as const,
    color: gold,
    padding: "1rem",
    maxWidth: "42rem",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderLeft: `4px solid ${gold}`,
    borderRadius: "4px",
    fontStyle: "italic",
    lineHeight: "1.6",
  };

  return <div style={quoteStyle}>{text}</div>;
};

const HeadwindsQuote = () => {
  return (
    <Column
      customStyle={{
        padding: 0,
        margin: 0,
        alignItems: "center",
        maxWidth: 580,
      }}
      customClass=""
    >
      <Quote text="As a passionate, product-focussed dev, I also prototype and write about React, APIs, State Machines & leveraging Natural Language Processing." />
    </Column>
  );
};
export default HeadwindsQuote;
