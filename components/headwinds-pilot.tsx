"use client";
import React from "react";
import { Column, Headline, SubHeadline, Row, Link } from "cross-country";
import { useGenesis } from "@gobolt/genesis";

import Image from "next/image";
import Bolt from "./bolt";

const moss = "#bccd9d";
const gold = "rgb(207, 192, 127)"; //"#b2a25a";
const teal = "#0baeae";

const HeadwindsPilot = () => {
  const { breakpoint } = useGenesis();

  const uw =
    breakpoint.toLowerCase() === "narrow" ? "UW" : "University of Waterloo";

  return (
    <Column customStyle={{ padding: 0, width: "100%", maxWidth: 580 }}>
      <Row customStyle={{ padding: 0, justifyContent: "space-between" }}>
        <>
          <div className="flex">
            <Bolt />
            <div className="flex flex-col">
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
                  {uw}
                </Link>
              </SubHeadline>
            </div>
          </div>
        </>
        <Image
          src="/brandon_square.png"
          alt="Brandon Flowers"
          width={80}
          height={80}
          style={{ borderRadius: "50%", marginLeft: 6 }}
        />
      </Row>
    </Column>
  );
};
export default HeadwindsPilot;
