"use client";
import React, { useRef, useEffect } from "react";
// import brandon from './brandon_square.png';
import {
  useTransition,
  animated,
  useSpringRef,
  useSpring,
} from "@react-spring/web";
import Tractors from "@/components/worlds/tractors";

const moss = "#bccd9d";
const gold = "rgb(207, 192, 127)"; //"#8b8461";
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

const HeadwindsTractors = ({ isLoading = false }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [springs, api] = useSpring(() => ({
    from: { opacity: 0 },
  }));

  useEffect(() => {
    if (wrapperRef.current) {
      api.start({
        from: {
          opacity: 0,
        },
        to: {
          opacity: 100,
        },
      });
    }
  });

  return (
    <animated.div ref={wrapperRef} style={{ maxWidth: 600, ...springs }}>
      <Tractors />
    </animated.div>
  );
};
export default HeadwindsTractors;
