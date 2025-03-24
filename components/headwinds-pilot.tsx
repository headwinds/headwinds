"use client";
import React, { useEffect, useState } from "react";
import { Column, Headline, SubHeadline, Row, Link } from "cross-country";
import ScrambleText from "@/components/scramble-text";
import { useGenesis } from "@gobolt/genesis";

import Image from "next/image";
import Bolt from "./bolt";

const moss = "#bccd9d";
const gold = "rgb(207, 192, 127)"; //"#b2a25a";
const teal = "#0baeae";
const grey = "#333";

const majors = [
  "Engineering",
  "Data Science",
  "Graphic Design",
  "Psychology",
  "Computer Science",
  "BA Honours English",
];

const glitchCharacters = "Ø92X!#4@XpQX?09343X0";

const names = ["Headwinds Studio", "Brandøn Fløwers"];

const Profession = ({ major, uw }: { major: string; uw: string }) => {
  return (
    <span>
      <ScrambleText text={major} customStyle={{ color: grey }} />,{" "}
      <Link
        customStyle={{
          color: "rgb(51, 51, 51)",
        }}
        url="https://uwaterloo.ca/"
      >
        <ScrambleText text={uw} customStyle={{ color: grey }} />
      </Link>
    </span>
  );
};

const HeadwindsPilot = () => {
  const { breakpoint } = useGenesis();
  const isMobile = breakpoint.toLowerCase() === "narrow";

  const [major, setMajor] = useState(majors[5]);
  const [name, setName] = useState(names[0]);

  useEffect(() => {
    const startingName = isMobile ? names[0].substring(0, 9) : names[0];
    setName(startingName);
  }, [breakpoint]);

  useEffect(() => {
    setTimeout(() => {
      const newName = isMobile ? names[1].substring(0, 7) : names[1];
      setName(newName);
    }, 4000);
  }, [breakpoint]);

  const uw = isMobile ? "UW" : "University of Waterloo";

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
                <ScrambleText text={name} customStyle={{ color: gold }} />
              </Headline>
              <SubHeadline
                customStyle={{
                  fontSize: 16,
                  color: grey,
                  fontWeight: 300,
                  margin: 0,
                  padding: 0,
                }}
              ></SubHeadline>
              {name.includes("Brand") ? (
                <Profession major={major} uw={uw} />
              ) : null}
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
