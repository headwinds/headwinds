// this component will cross fade 2 images
import { gsap } from "gsap";
import { useEffect, useState } from "react";
const startingImage = "/ai/hermes_header.png";
const endingImage = "/ai/hermes_header_colour.png";

const HermesHero = () => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  const crossFadeImages = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimationComplete(true);
      },
    });

    tl.to("#hermes-hero-starting-image", {
      opacity: 10,
      duration: 1,
      delay: 2,
      ease: "power2.inOut",
    }).to(
      "#hermes-hero-ending-image",
      {
        opacity: 1,
        duration: 3,
        ease: "power2.inOut",
      },
      "-=0.7"
    );
  };

  useEffect(() => {
    if (!isAnimationComplete) {
      crossFadeImages();
    }
  }, []);

  return (
    <div className="relative h-[400px] w-full">
      <img
        id="hermes-hero-starting-image"
        src={startingImage}
        alt="hermes agent hiking in black and white"
        className="absolute inset-0 w-full h-full object-cover opacity-100 z-10"
      />
      <img
        id="hermes-hero-ending-image"
        src={endingImage}
        alt="hermes agent hiking in color"
        className="absolute inset-0 w-full h-full object-cover opacity-0 z-20"
      />
    </div>
  );
};

export default HermesHero;
