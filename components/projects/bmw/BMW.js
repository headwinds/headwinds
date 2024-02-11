import React from "react";
import { theme } from "../../theme/Theme";
import carPath from "./bmw.jpg";

const paralinkStyle = theme.paralinkStyle;

const inext = "https://design-milk.com/la-auto-show-bmw-vision-inext";
const blast = "https://www.blastradius.com";

const BMW = () => {
  return (
    <div>
      <img src={carPath} alt="blue bmw with gold rims" width="100%" />
      <p>
        <a
          href={blast}
          target="_blank"
          rel="noopener noreferrer"
          style={paralinkStyle}
        >
          Blast Radius
        </a>{" "}
        was an excellent home for me. I was there over 4 years and enjoyed
        collaborating with some amazing people who remain titans of the industry
        today.
      </p>
      <p>
        We worked on many large, experiential campaigns for clients like Nike,
        Nintendo, Barcardi and BMW.
      </p>
      <p>
        Along with a data visualization tool to demonstrate how far a beamer
        could travel on a tank of diesel, we also built BMW car configurator
        that allows customers to customize their car to their liking.
      </p>
      <p>
        BMW is certainly an innovative company and its exciting to see what they
        are working on{" "}
        <a
          href={inext}
          target="_blank"
          rel="noopener noreferrer"
          style={paralinkStyle}
        >
          next.
        </a>{" "}
      </p>
    </div>
  );
};

export default BMW;
