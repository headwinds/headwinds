// TODO: explore why I disabled typecheck on this file!
// @ts-nocheck
// npm run build

"use client";
import React, { useRef, useEffect, useMemo } from "react";
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
import identity from "./projects/project-data";
import Project from "./projects/Project";
import Image from "next/image";

import Bolt from "./bolt";
import {
  LinkedinLogo,
  GithubLogo,
  TwitterLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";

const moss = "#bccd9d";
const gold = "rgb(207, 192, 127)"; //"#b2a25a";
const teal = "#0baeae";

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

  const [springs, api] = useSpring(() => ({
    from: { opacity: 0 },
  }));

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

  const projectCards = useMemo(() => {
    // sort by project.rank and slice top 5
    const topProjects = identity.projects
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 5);

    return topProjects.map((project, ix) => (
      <Project key={ix} project={project} />
    ));
  }, []);

  const todayNum = projectCards.length;

  return (
    <animated.div
      ref={wrapperRef}
      style={{ opacity: 0, maxWidth: 600, ...springs }}
      className="min-w-[380px]"
    >
      <Column>
        <Row>
          <Column customStyle={{ padding: 0 }}>
            {/*<Image a11y="brandon flowers" url={brandon} width={100} height={100} customStyle={{ borderRadius: '50%' }} />*/}
            <Image
              src="/brandon_square.png"
              alt="Brandon Flowers"
              width={100}
              height={100}
              style={{ borderRadius: "50%" }}
            />
            <Headline
              customStyle={{
                margin: 0,
                padding: 0,
                color: "rgb(207, 192, 127)",
                fontWeight: 600,
                display: "flex",
              }}
            >
              <Bolt />
              Brandon Flowers
            </Headline>
          </Column>
        </Row>
        <Paragraph customStyle={paraStyle}>
          I{"'"}ve joined <Link url="https://www.prenuvo.com">Prenuvo</Link> as
          a Senior Software Engineer. I 💛 solving complex customer journeys and
          crafting both React & React Native UI, rich with metrics and data
          visualisations.{" "}
        </Paragraph>
        <Paragraph customStyle={paraStyle}>
          Previously, I worked on the eCommerce team at{" "}
          <Link url="https://www.shoppersdrugmart.ca/apple-airpods-max/p/EQ50?variantCode=194252245095">
            Shopper's Drug Mart
          </Link>{" "}
          building with React and GraphQL. I've contributed to a couple React
          Native apps:{" "}
          <Link url="https://apps.apple.com/ca/app/validere/id6446293374">
            Validere
          </Link>{" "}
          and{" "}
          <Link url="https://apps.apple.com/ca/app/photodare/id6479333804">
            PhotoDare
          </Link>
          .
        </Paragraph>
        <Paragraph customStyle={paraStyle}>
          Learn more about me via my{" "}
          <Link url="https://www.linkedin.com/in/brandonflowers">Linkedin</Link>{" "}
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

        <Row>
          <Paragraph>Top</Paragraph>
          <AnimateNumber
            delay="3000"
            to={todayNum}
            from={todayNum}
            customStyle={{
              color: "rgb(207, 192, 127)",
              padding: 8,
              fontSize: 24,
              fontWeight: 700,
            }}
          />
          <Paragraph>Portfolio Projects</Paragraph>
        </Row>

        <Column>{projectCards}</Column>
      </Column>
      <Column>
        <Paragraph customStyle={paraStyle}>
          Ever since the death of Google Reader 💀, I've been exploring RSS in a
          personal project called{" "}
          <Link url="https://golds.vercel.app/">Golds</Link> as part of a goal
          setting and media research study where I'm tracking trends across over
          50 feeds covering design, technology, architecture, gaming and sports.{" "}
          <Link url="https://chromewebstore.google.com/detail/porthole/dilfffpckfhcpgidnmgaeoidgekcjlln?pli=1">
            Porthole
          </Link>{" "}
          is a chrome-extension version.
        </Paragraph>
        <Paragraph customStyle={paraStyle}>
          My site is a "build in public" experiment where I{"'"}m feauturing my
          own component library{" "}
          <Link url="https://www.npmjs.com/package/cross-country">
            Cross Country
          </Link>{" "}
          and writing my own Backend services in{" "}
          <Link url="https://github.com/headwinds/python-notebooks/">
            Python
          </Link>
          , <Link url="https://github.com/headwinds/cabinquest">Node</Link>, and{" "}
          <Link url="https://github.com/headwinds/northwind-frostpunk/">
            Go
          </Link>{" "}
          against a{" "}
          <Link url="https://twitter.com/headwinds/status/1588225965959815168">
            PostgreSQL
          </Link>{" "}
          database.
        </Paragraph>
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
    </animated.div>
  );
};
export default HeadwindsSidequest;
