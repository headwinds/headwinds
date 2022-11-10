import React, { useState } from "react";
import { useSpring, animated, SpringValue } from "react-spring";
import styles from "../styles/AnimatedNumber.module.css";

// https://aleclarson.github.io/react-spring/v9/#Additions
// https://codesandbox.io/s/green-snow-6n8ue?file=/SVGAnimation.js
// https://www.copycat.dev/blog/react-spring/
// twitter.com/eunit99

function AnimateNumber() {
  const [flip, set] = useState(false);
  const { number } = useSpring({
    reset: false,
    reverse: flip,
    from: { number: 0 },
    number: 65_434,
    delay: 2000,
    //onRest: () => set(!flip),
  });
  return (
    <animated.h2 className={styles.number}>
      {number.to((n) => n.toFixed(0))}
    </animated.h2>
  );
}

export default AnimateNumber;
