"use client";
import React from "react";
import { Column, Paragraph, Link } from "cross-country";

const moss = "#bccd9d";
const gold = "rgb(207, 192, 127)"; //"#b2a25a";
const teal = "#0baeae";

const HeadwindsGoBolt = () => {
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
        I{"'"}ve joined <Link url="https://www.gobolt.com">GoBolt</Link> as a
        Senior Software Engineer. I 💛 solving complex customer journeys,
        writing automatation tests and crafting React components in eCommerce
        and executive dashboards, rich with metrics and data visualisations.{" "}
      </Paragraph>

      <Paragraph customStyle={paraStyle}>
        Learn more about me via my{" "}
        <Link url="https://www.linkedin.com/in/brandonflowers">Linkedin</Link>{" "}
        and <Link url="https://github.com/headwinds/">Github</Link>.
      </Paragraph>
    </Column>
  );
};
export default HeadwindsGoBolt;
