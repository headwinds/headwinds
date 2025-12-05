"use client";
import React from "react";
import { Column, Paragraph, Link } from "cross-country";
import HeadwindsQuote from "@/components/headwinds-quote";

const moss = "#bccd9d";
const gold = "rgb(207, 192, 127)"; //"#b2a25a";
const teal = "#0baeae";

const HeadwindsPresent = () => {
  const customLinkStyle = {
    textDecoration: "none",
    boxShadow: "none",
    borderBottom: "none",
    alignItems: "center",
    display: "flex",
  };

  const todayNum = 626;

  const paraStyle = { lineHeight: 1.5 };

  return (
    <Column customStyle={{ padding: 0, alignItems: "center" }}>
      <Paragraph customStyle={paraStyle}>
        I{"'"}m searching for my next role as a Full-stack Engineer where I
        prefer to be split 70-30 between the frontend and backend; working with
        React, Node, Python, Go and PostgreSQL. Connect with me via my{" "}
        <Link url="https://www.linkedin.com/in/brandonflowers">Linkedin</Link>{" "}
        and view my <Link url="https://github.com/headwinds/">Github</Link>.
      </Paragraph>

      <Paragraph customStyle={paraStyle}>
        I 💛 solving complex customer journeys, building automation, scheduling
        reports, and crafting UI in eCommerce and executive dashboards, rich
        with metrics, insights and other data viz.{" "}
      </Paragraph>
    </Column>
  );
};
export default HeadwindsPresent;
