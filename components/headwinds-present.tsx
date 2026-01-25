"use client";
import React from "react";
import { Column, Paragraph, Link } from "cross-country";
import HeadwindsQuote from "@/components/headwinds-quote";

const moss = "#bccd9d";
const gold = "rgb(207, 192, 127)"; //"#b2a25a";
const teal = "#0baeae";

const paraStyle = { lineHeight: 1.5 };

const Searching = () => {
  return (
    <Paragraph customStyle={paraStyle}>
        I{"'"}m searching for my next role as a Full-stack Engineer where I
        prefer to be split 70-30 between the frontend and backend; working with
        React, Node, Python, Go and PostgreSQL.
      </Paragraph>);
};

const ConnectWithMe = () => {
  return (
    <Paragraph customStyle={paraStyle}>
      Connect with me via my{" "}
        <Link url="https://www.linkedin.com/in/brandonflowers">Linkedin</Link>{" "}
        and view my <Link url="https://github.com/headwinds/">Github</Link>.
    </Paragraph>);
};

const Axl = () => {
  return (
    <>
      <Paragraph customStyle={paraStyle}>
        I joined <Link url="https://axl.vc">AXL Venture Studio</Link>{" "}in January as a Lead Full-stack Engineer. As a new founder, I'm excited to launch the next generation of human-centric AI-powered companies and participate in their on-going success. 
      </Paragraph>
      <Paragraph customStyle={paraStyle}>Over the last few years, I have been exploring and creating AI tools, fostering a lab culture of experimentation. At AXL, I get to combine my passion for AI with my expertise in rapid prototyping to create innovative solutions that leverage AI to solve real-world problems.
      </Paragraph>
    </>);
};

const HeadwindsPresent = () => {
  const customLinkStyle = {
    textDecoration: "none",
    boxShadow: "none",
    borderBottom: "none",
    alignItems: "center",
    display: "flex",
  };

  const todayNum = 626;



  return (
    <Column customStyle={{ padding: 0, alignItems: "center" }}>
      <Paragraph customStyle={paraStyle}>
        I 💛 solving complex customer journeys, building automation, scheduling
        reports, and crafting UI, rich
        with metrics, insights and other data viz.{" "}
      </Paragraph>
      <Axl />


    </Column>
  );
};
export default HeadwindsPresent;
