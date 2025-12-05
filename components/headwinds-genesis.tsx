"use client";
import React from "react";
import { Column, Paragraph, Link } from "cross-country";
import { FireOutlined } from "@ant-design/icons";
import { Button as GenesisButton, SelectCount } from "@gobolt/genesis";

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

const paraStyle = { lineHeight: 1.5 };

const HeadwindsGenesis = () => {
  const onClick = () => {
    const url = "https://www.npmjs.com/package/@gobolt/genesis";

    if (window) {
      window.open(url, "_blank");
    }
  };

  return (
    <Column customStyle={{ padding: 0, alignItems: "center" }}>
      <Paragraph customStyle={paraStyle}>
        This year I built a design system called{" "}
        <Link url="https://www.npmjs.com/package/@gobolt/genesis">Genesis</Link>{" "}
        , the{" "}
        <Link url="https://play.google.com/store/apps/details?id=com.gobolt.goose&hl=en_CA">
          GoBolt Warehouse React Native app
        </Link>
        , and contributed Node services to triage products within a Warehouse
        Management System.
      </Paragraph>
    </Column>
  );
};
export default HeadwindsGenesis;
