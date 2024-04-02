import React from "react";
import { theme } from "../../theme/Theme";
import imgPath from "./lancer.jpg";

const paralinkStyle = theme.paralinkStyle;

const Template = () => {
  return (
    <div>
      <img src={imgPath} alt="mitsubishi lancer" width="100%" />
      <p>
        Mitsubishi Lancer Earth earned my first and only{" "}
        <a
          href="https://thefwa.com/cases/lancer-earth"
          target="_blank"
          rel="noopener noreferrer"
          style={paralinkStyle}
        >
          FWA.
        </a>{" "}
      </p>
      <p>
        At the time, I held the position of Technical Director and I got to
        convince our executive team to take a chance of ActionScript 3 which was
        new at the time and introduced a Typed language.
      </p>
      <p>
        I managed a group of super talented developers and together we delivered an
        exceptional experience that moved users through 9 different timezones
        and showcased the new Mitsubishi Lancer in various interactive settings.
      </p>
    </div>
  );
};

export default Template;
