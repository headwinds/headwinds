import React from "react";
import { theme } from "../../theme/Theme";

const paralinkStyle = theme.paralinkStyle;

const Template = () => {
  return (
      <div>
        <p>
          <a
            href="https://www.linkedin.com/in/brandonflowers/"
            target="_blank"
            rel="noopener noreferrer"
            style={paralinkStyle}
          >
            hello
          </a>{" "}
        </p>
      </div>
  );
};

export default Template;
