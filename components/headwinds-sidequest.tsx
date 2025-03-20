"use client";
import React, { useRef, useEffect } from "react";
import {
  Column,
  Row,
  SubHeadline,
  Paragraph,
  Link,
  Headline,
  List,
  ListItem,
  AnimateNumber,
  Button,
} from "cross-country";

// import brandon from './brandon_square.png';
import {
  useTransition,
  animated,
  useSpringRef,
  useSpring,
} from "@react-spring/web";

import Image from "next/image";
import { FireOutlined } from "@ant-design/icons";

import Bolt from "./bolt";
import {
  LinkedinLogo,
  GithubLogo,
  TwitterLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
import {
  Button as GenesisButton,
  GenesisProvider,
  GENESIS,
  ButtonProps,
} from "@gobolt/genesis";

const moss = "#bccd9d";
const gold = "rgb(207, 192, 127)"; //"#b2a25a";
const teal = "#0baeae";

interface TestType {
  color: string;
  backgroundColor: string;
  padding: number;
  borderRadius: number;
}

const hi: TestType = {
  color: "white",
  backgroundColor: "black",
  padding: 8,
  borderRadius: 4,
};

const logHi = (hi: TestType) => {
  console.log(hi);
};

const HeadwindsSidequest = ({ isLoading = false }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  const todayNum = 626;

  const [springs, api] = useSpring(() => ({
    from: { opacity: 0 },
  }));

  const onClick = () => {
    const url = "https://www.npmjs.com/package/@gobolt/genesis";

    if (window) {
      window.open(url, "_blank");
    }
  };

  useEffect(() => {
    if (wrapperRef.current) {
      api.start({
        from: {
          opacity: 0,
        },
        to: {
          opacity: 100,
        },
      });
    }
  });

  console.log("ButtonProps", ButtonProps);

  return (
    <GenesisProvider>
      <animated.div
        ref={wrapperRef}
        style={{ opacity: 0, maxWidth: 600, ...springs }}
      >
        <Column>
          <Row>
            <Row>
              <Paragraph>Duoling Streak</Paragraph>
              <AnimateNumber
                delay="1000"
                to={todayNum}
                from={0}
                customStyle={{ color: "#b2a25a" }}
              />
            </Row>
          </Row>
          <Paragraph customStyle={paraStyle}>
            I{"'"}ve joined <Link url="https://www.gobolt.com">GoBolt</Link> as
            a Senior Software Engineer. I 💛 solving complex customer journeys,
            writing automatation tests and crafting React components in
            eCommerce and executive dashboards, rich with metrics and data
            visualisations.{" "}
          </Paragraph>
          <Column customStyle={{ padding: 0 }}>
            <Paragraph customStyle={paraStyle}>
              We are currently building out a new Design System and Component
              Library to serve our{" "}
              <Link url="https://www.gobolt.com/sustainable-logistics/">
                sustainable fleet
              </Link>{" "}
              of React & React Native apps.
            </Paragraph>
            <Column customStyle={{ padding: 0, alignItems: "center" }}>
              <GenesisButton
                onClick={onClick}
                icon={<FireOutlined />}
                iconPosition="end"
              >
                Watch Genesis Grow
              </GenesisButton>
              <Paragraph customStyle={paraStyle}>
                This is my fourth design system, and am planning to share 5
                years of best practices from product service tactics to
                Typescript wizardry!{" "}
              </Paragraph>
            </Column>
          </Column>

          <Paragraph customStyle={paraStyle}>
            Learn more about me via my{" "}
            <Link url="https://www.linkedin.com/in/brandonflowers">
              Linkedin
            </Link>{" "}
            and <Link url="https://github.com/headwinds/">Github</Link>.
          </Paragraph>
          <SubHeadline
            color={gold}
            customStyle={{
              backgroundColor: "white",
              padding: 8,
              fontWeight: 300,
              borderRadius: 4,
              fontSize: 18,
            }}
          >
            As a passionate, product-focussed dev, I also prototype and write
            about React, APIs, State Machines & leveraging Natural Language
            Processing.
          </SubHeadline>
          <Paragraph customStyle={paraStyle}>
            Ever since the death of Google Reader 💀, I've been exploring RSS in
            a personal project called{" "}
            <Link url="https://golds.vercel.app/">Golds</Link> as part of a goal
            setting and media research study where I'm tracking trends across
            over 50 feeds covering design, technology, architecture, gaming and
            sports.{" "}
            <Link url="https://chromewebstore.google.com/detail/porthole/dilfffpckfhcpgidnmgaeoidgekcjlln?pli=1">
              Porthole
            </Link>{" "}
            is a chrome-extension version, and I also have an unreleased
            React-native app in the works.
          </Paragraph>
          <Paragraph customStyle={paraStyle}>
            My site is a "build in public" experiment where I{"'"}m feauturing
            my own component library{" "}
            <Link url="https://www.npmjs.com/package/cross-country">
              Cross Country
            </Link>{" "}
            and writing my own Backend services in{" "}
            <Link url="https://github.com/headwinds/python-notebooks/">
              Python
            </Link>
            , <Link url="https://github.com/headwinds/cabinquest">Node</Link>,
            and{" "}
            <Link url="https://github.com/headwinds/northwind-frostpunk/">
              Go
            </Link>{" "}
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
                <Paragraph customStyle={customParagraphStyle}>
                  Linkedin
                </Paragraph>
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
      </animated.div>
    </GenesisProvider>
  );
};
export default HeadwindsSidequest;
