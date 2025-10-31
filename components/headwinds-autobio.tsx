"use client";
import React from "react";
import {
  HeadwindsLogo,
  Column,
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
    <div
      style={{
        padding: 0,
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Paragraph customStyle={paraStyle}>
        Ever since the death of Google Reader 💀, I've been tracking trends
        across over 50 feeds covering design, technology, architecture, gaming
        and sports in a personal project called{" "}
        <Link url="https://headwinds.github.io/headwinds/docs/apps/porthole/">
          Porthole
        </Link>
        .
      </Paragraph>
      <Paragraph customStyle={paraStyle}>
        I'm constantly experimenting with my own component library{" "}
        <Link url="https://www.npmjs.com/package/cross-country">
          Cross Country
        </Link>
        , combining them with{" "}
        <Link url="https://nextjs.org/docs/app/building-your-application/configuring/mdx">
          Next mdx
        </Link>
        , and writing my own Backend services in{" "}
        <Link url="https://github.com/headwinds/python-notebooks/">Python</Link>
        , <Link url="https://github.com/headwinds/cabinquest">Node</Link>, and{" "}
        <Link url="https://github.com/headwinds/northwind-frostpunk/">Go</Link>{" "}
        against a{" "}
        <Link url="https://twitter.com/headwinds/status/1588225965959815168">
          PostgreSQL
        </Link>{" "}
        database.
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
      <Column>
        <HeadwindsLogo />
      </Column>
    </div>
  );
};
export default HeadwindsAutobio;
