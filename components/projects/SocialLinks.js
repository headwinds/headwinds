import React from "react";
import { theme } from "../theme/Theme";

const linkStyle = theme.linkStyle;

const SocialLinks = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
      }}
    >
      <div>
        <p>
          <a
            href="https://www.linkedin.com/in/brandonflowers/"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Linkedin
          </a>{" "}
        </p>
      </div>
      <div>
        <p>
          <a
            href="https://github.com/headwinds"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Github
          </a>{" "}
        </p>
      </div>
      <div>
        <p>
          <a
            href="https://twitter.com/headwinds"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Twitter
          </a>{" "}
        </p>
      </div>
    </div>
  );
};

export default SocialLinks;
