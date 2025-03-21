"use client";
import React from "react";
import { Column, Paragraph, Link } from "cross-country";
import { FireOutlined } from "@ant-design/icons";
import { Button as GenesisButton, GenesisProvider } from "@gobolt/genesis";

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
        We are currently building out a new Design System and Component Library
        to serve our{" "}
        <Link url="https://www.gobolt.com/sustainable-logistics/">
          sustainable fleet
        </Link>{" "}
        of React & React Native apps.
      </Paragraph>

      <GenesisButton
        onClick={onClick}
        icon={<FireOutlined />}
        iconPosition="end"
      >
        Watch Genesis Grow
      </GenesisButton>
      <Paragraph customStyle={paraStyle}>
        This is my fourth design system, and am planning to share 5 years of
        best practices from product service tactics to Typescript wizardry!{" "}
      </Paragraph>
    </Column>
  );
};
export default HeadwindsGenesis;
