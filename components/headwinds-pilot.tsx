"use client";
import React from "react";
import { Column, Headline, SubHeadline, Row, Link } from "cross-country";

import Image from "next/image";
import Bolt from "./bolt";

const moss = "#bccd9d";
const gold = "rgb(207, 192, 127)"; //"#b2a25a";
const teal = "#0baeae";

const HeadwindsPilot = () => {
  return (
    <Column customStyle={{ padding: 0 }}>
      {/*<Image a11y="brandon flowers" url={brandon} width={100} height={100} customStyle={{ borderRadius: '50%' }} />*/}

      <Row>
        <Image
          src="/brandon_square.png"
          alt="Brandon Flowers"
          width={80}
          height={80}
          style={{ borderRadius: "50%" }}
        />
        <Bolt />
        <div>
          <Headline
            customStyle={{
              margin: 0,
              padding: 0,
              color: gold,
              fontWeight: 600,
              display: "flex",
            }}
          >
            Brandon Flowers
          </Headline>
          <SubHeadline
            customStyle={{
              fontSize: 16,
              color: "#333",
              fontWeight: 300,
            }}
          >
            BA Honours English,{" "}
            <Link
              customStyle={{
                color: "rgb(51, 51, 51)",
              }}
              url="https://uwaterloo.ca/"
            >
              University of Waterloo
            </Link>
          </SubHeadline>
        </div>
      </Row>
    </Column>
  );
};
export default HeadwindsPilot;
