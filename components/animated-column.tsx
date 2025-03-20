"use client";
import React, { useRef, useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";

interface AnimateColumnProps {
  children: React.ReactNode;
  delayMs?: number;
}

const AnimatedColumn = ({ children, delayMs = 1000 }: AnimateColumnProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const customLinkStyle = {
    textDecoration: "none",
    boxShadow: "none",
    borderBottom: "none",
    alignItems: "center",
    display: "flex",
  };

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
        delay: delayMs,
        config: {
          duration: 2000 // 2 seconds for the fade-in animation
        }
      });
    }
  });

  return (
    <animated.div
      ref={wrapperRef}
      style={{ opacity: 0, maxWidth: 600, ...springs }}
    >
      {children}
    </animated.div>
  );
};
export default AnimatedColumn;
