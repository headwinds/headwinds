import React from "react";
import Image from "next/image";
import { useSpring, animated } from "@react-spring/web";

const Bolt = () => {
  const [springs, api] = useSpring(() => ({
    from: { opacity: 0, brightness: 1 },
    config: { duration: 100 },
  }));

  const flash = async () => {
    // Initial delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Flash sequence with opacity
    const flashSequence = [
      { opacity: 1, brightness: 3 },
      { opacity: 1, brightness: 1 },
      { opacity: 1, brightness: 3 },
      { opacity: 1, brightness: 1 },
      { opacity: 1, brightness: 3 },
      { opacity: 1, brightness: 3 },
      { opacity: 1, brightness: 1 },
    ];

    api.start({
      to: flashSequence,
      config: { duration: 100 },
    });
  };

  // Apply brightness as a filter in the style
  const style = {
    ...springs,
    filter: springs.brightness.to((b) => `brightness(${b})`),
  };

  React.useEffect(() => {
    flash();
  }, []);

  return (
    <animated.div style={style}>
      <Image src="/darkbolt.svg" alt="lightening bolt" width={34} height={40} />
    </animated.div>
  );
};

export default Bolt;
