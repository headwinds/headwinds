"use client";
import React from "react";
import {
  Column,
  SubHeadline,
  Paragraph,
  Link,
  List,
  ListItem,
} from "cross-country";

import {
  LinkedinLogo,
  GithubLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";

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
    margin: "1rem 0",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderLeft: `4px solid ${gold}`,
    borderRadius: "4px",
    fontStyle: "italic",
    lineHeight: "1.6",
  };

  return <div style={quoteStyle}>{text}</div>;
};

const HeadwindsAutobio = () => {
  const customLinkStyle = {
    textDecoration: "none",
    boxShadow: "none",
    borderBottom: "none",
    alignItems: "center",
    display: "flex",
  };

  const customParagraphStyle = {
    marginLeft: 8,
    color: gold,
  };

  const paraStyle = { lineHeight: 1.5 };

  return (
    <Column customStyle={{ padding: 0, alignItems: "center" }}>
      <Column
        customStyle={{ padding: 0, margin: 0, alignItems: "center" }}
        customClass=""
      >
        <Quote text="As a passionate, product-focussed dev, I also prototype and write about React, APIs, State Machines & leveraging Natural Language Processing." />
      </Column>
      <Paragraph customStyle={paraStyle}>
        Ever since the death of Google Reader 💀, I've been exploring RSS in a
        personal project called{" "}
        <Link url="https://golds.vercel.app/">Golds</Link> as part of a goal
        setting and media research study where I'm tracking trends across over
        50 feeds covering design, technology, architecture, gaming and sports.{" "}
        <Link url="https://chromewebstore.google.com/detail/porthole/dilfffpckfhcpgidnmgaeoidgekcjlln?pli=1">
          Porthole
        </Link>{" "}
        is a chrome-extension version, and I also have an unreleased
        React-native app in the works.
      </Paragraph>
      <Paragraph customStyle={paraStyle}>
        I'm constantly experimenting with my own component library{" "}
        <Link url="https://www.npmjs.com/package/cross-country">
          Cross Country
        </Link>
        , combining them{" "}
        <Link url="https://nextjs.org/docs/app/building-your-application/configuring/mdx">
          NextJS markdown
        </Link>
        , and writing my own Backend services in{" "}
        <Link url="https://github.com/headwinds/python-notebooks/">Python</Link>
        , <Link url="https://github.com/headwinds/cabinquest">Node</Link>, and{" "}
        <Link url="https://github.com/headwinds/northwind-frostpunk/">Go</Link>{" "}
        against a{" "}
        <Link url="https://twitter.com/headwinds/status/1588225965959815168">
          PostgreSQL
        </Link>{" "}
        database. I aspire to write clean, maintainable, well-tested code.
      </Paragraph>
      <Paragraph
        customStyle={{ marginBottom: 16, lineHeight: 1.5 }}
      ></Paragraph>
      <List customStyle={{ listStyleType: "none" }}>
        <ListItem>
          <Link
            url="https://www.linkedin.com/in/branonflowers"
            customStyle={customLinkStyle}
          >
            <LinkedinLogo size={32} color={gold} weight="light" />
            <Paragraph customStyle={customParagraphStyle}>Linkedin</Paragraph>
          </Link>
        </ListItem>
        <ListItem>
          <Link
            url="https://www.github.com/headwinds"
            customStyle={customLinkStyle}
          >
            <GithubLogo size={32} color={gold} weight="light" />
            <Paragraph customStyle={customParagraphStyle}>Github</Paragraph>
          </Link>
        </ListItem>
        <ListItem>
          <Link
            url="https://www.twitter.com/headwinds"
            customStyle={customLinkStyle}
          >
            <XLogo size={32} color={gold} weight="light" />
            <Paragraph customStyle={customParagraphStyle}>X</Paragraph>
          </Link>
        </ListItem>
      </List>
    </Column>
  );
};
export default HeadwindsAutobio;
