"use client";
import React from "react";
import {
  useTransition,
  animated,
  useSpringRef,
  useSpring,
} from "@react-spring/web";
import Tractor from "./tractor";

interface TractorsProps {}

const Tractors = () => {
  const onClick = () => {
    //console.log("GENESIS", GENESIS.STATE);
  };

  return (
    <div className="tractor">
      <Tractor />
    </div>
  );
};

export default Tractors;
