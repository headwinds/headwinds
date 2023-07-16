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

import brandon from "../public/brandon_square.png";
import bolt from "../public/bolt.svg";

function About() {
  return (
    <Column customStyle={{ width: 380 }}>
      <Image
        alt="brandon flowers"
        src={brandon}
        width={100}
        style={{ borderRadius: "50%" }}
      />

      <Row customStyle={{ justifyContent: "flex-start" }}>
        <Image alt="energy bolt" src={bolt} width={30} style={{ padding: 4 }} />
        <Headline>Brandon Flowers</Headline>
        {/*<AnimateNumber to={(65, 234)} from={0} />*/}
      </Row>
      <Paragraph size="medium">
        I{"'"}m a Full Stack Developer @{" "}
        <Link url="http://www.validere.com">Validere</Link>, and primarily work
        on the frontend which obviously makes me more pear-shaped.
      </Paragraph>
      <Paragraph color="#C8B51D">
        As a passionate dev, I like to write about Data Visualization, APIs,
        Machine Learning and Natural Language Processing{" "}
      </Paragraph>
      <Paragraph customStyle={{ marginBottom: 16 }}>
        This is a "build in public" experiment where featuring my own component
        library{" "}
        <Link url="https://www.npmjs.com/package/cross-country">
          cross-country
        </Link>{" "}
        which I use to experiemnent with data visualization and distributed
        services, connecting containers written in{" "}
        <Link url="https://github.com/headwinds/python-notebooks/">Python</Link>
        , <Link url="https://github.com/headwinds/cabinquest">Node</Link>,{" "}
        <Link url="https://github.com/headwinds/northwind-frostpunk/">Go</Link>{" "}
        & PostgreSQL.
      </Paragraph>
      <Paragraph>
        You can learn more about me through my social links:
        <List>
          <ListItem>
            <Link url="https://www.linkedin.com/in/brandonflowers">
              Linkedin
            </Link>
          </ListItem>
          <ListItem>
            <Link url="https://www.github.com/headwinds">Github</Link>
          </ListItem>
          <ListItem>
            <Link url="https://www.twitter.com/headwinds">Twitter</Link>
          </ListItem>
        </List>
      </Paragraph>
    </Column>
  );
}

export default About;
