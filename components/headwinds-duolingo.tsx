"use client";
import React, { useRef, useEffect } from "react";
import { Column, Row, Paragraph, AnimateNumber } from "cross-country";

const moss = "#bccd9d";
const gold = "rgb(207, 192, 127)"; //"#b2a25a";
const teal = "#0baeae";

const HeadwindsDuolingo = () => {
  const customLinkStyle = {
    textDecoration: "none",
    boxShadow: "none",
    borderBottom: "none",
    alignItems: "center",
    display: "flex",
  };

  const todayNum = 626;

  return (
    <Column>
      <Row>
        <Row>
          <Paragraph>Duolingo Streak</Paragraph>
          <AnimateNumber
            delay="1000"
            to={todayNum}
            from={0}
            customStyle={{ color: gold }}
          />
        </Row>
      </Row>
    </Column>
  );
};
export default HeadwindsDuolingo;
