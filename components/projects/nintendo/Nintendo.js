import React from "react";
import { theme } from "../../theme/Theme";
import src from "./wiifit.jpg";

const paralinkStyle = theme.paralinkStyle;

const Nintendo = () => {
  return (
      <div>
          <img src={src} alt="Wii Fit" width="100%" />
         <p>
          I was pleasantly surprised to work on {' '}<a
          href="https://www.youtube.com/watch?v=-Taruqvk30E"
          target="_blank"
          rel="noopener noreferrer"
          style={paralinkStyle}
        >
          Wii Fit
        </a>{' '} and built an interactive user guide and video gallery to teach customers how to use this neat fitness product.</p>
        <p>It would also track sessions and encourage you to complete each course as well as compete with your friends.</p>
      </div>
  );
};

export default Nintendo;
