"use client";
import React from "react";
import { Button } from "@gobolt/genesis";
import { HeadwindsLogo, Column } from "cross-country";
import { Row } from "cross-country/dist/components";

interface TractorProps {
  model?: string;
  color?: string;
  horsepower?: number;
  isRunning?: boolean;
}

const Tractor: React.FC<TractorProps> = ({
  model,
  color,
  horsepower,
  isRunning = false,
}) => {
  const onClick = () => {
    //console.log("GENESIS", GENESIS.STATE);
  };

  return (
    <Column customClass="tractor">
      <HeadwindsLogo />
      <h2>{model} Tractor</h2>
      <div className="tractor-details">
        <p>Color: {color}</p>
        <p>Horsepower: {horsepower}</p>
        <p>Status: {isRunning ? "Running" : "Stopped"}</p>
      </div>
      <Button onClick={onClick}>Buy</Button>
    </Column>
  );
};

export default Tractor;
