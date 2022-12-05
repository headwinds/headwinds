import React, { useState } from "react";
import { useSpring, animated, SpringValue } from "react-spring";
import styles from "../styles/AnimatedNumber.module.css";
import {
  Column,
  Row,
  Headline,
  SubHeadline,
  List,
  ListItem,
  Link,
  Paragraph,
} from "cross-country";
import AnimateNumber from "./animate-number";
import Image from "next/image";

import brandon from "../public/brandon.png";
import bolt from "../public/bolt.svg";

function About() {
  return (
    <Column customStyle={{ width: 380 }}>
      <Image alt="brandon flowers" src={brandon} width={200} />

      <Row>
        <Image alt="energy bolt" src={bolt} width={30} style={{ padding: 4 }} />
        <Headline>Brandon Flowers</Headline>
        {/*<AnimateNumber to={(65, 234)} from={0} />*/}
      </Row>
      <SubHeadline size="medium">Full Stack Developer</SubHeadline>
      <SubHeadline color="#e3d597">
        Passionate about building UI and APIs{" "}
      </SubHeadline>
      <Paragraph customStyle={{ marginBottom: 16 }}>
        This is a "build in public" experiment where I{"'"}m dogfooding my own
        component library{" "}
        <Link url="https://www.npmjs.com/package/cross-country">
          cross-country
        </Link>{" "}
        and distributed services, connecting containers written in{" "}
        <Link url="https://github.com/headwinds/python-notebooks/">Python</Link>
        , Java, Node,{" "}
        <Link url="https://github.com/headwinds/northwind-frostpunk/">Go</Link>{" "}
        & PostgreSQL.
      </Paragraph>
      <Link url="https://www.linkedin.com/in/brandonflowers">Linkedin</Link>
      <Link url="https://www.github.com/headwinds">Github</Link>
      <Link url="https://www.twitter.com/headwinds">Twitter</Link>
      {/*}
      <List>
        <ListItem>Javascript: React, React Native, & NodeJS</ListItem>
        <ListItem>Python</ListItem>
        <ListItem>Java: Springboot & Maven</ListItem>
        <ListItem>Go</ListItem>
        <ListItem>SQL</ListItem>
      </List>*/}
    </Column>
  );
}

export default About;
