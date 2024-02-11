import React from "react";
import { theme } from "../../theme/Theme";
import imgPath from "./totaldrama.png";

const paralinkStyle = theme.paralinkStyle;

const TotalDrama = () => {
  return (
    <div>
      <img src={imgPath} alt="total drama avatar builder" width="100%" />
      <p>
        In the{" "}
        <a
          href="https://www.youtube.com/watch?v=wa0ToGv_QTw&t=43s"
          target="_blank"
          rel="noopener noreferrer"
          style={paralinkStyle}
        >Total Drama Avatar Builder
        </a>{" "}each character is completely customizeable.
      </p>
      <p>
        I decided to leverage a finite state machine design pattern to handle
        all the various states and transitons. It has garnered over 40K youtube hits, and I still get emails from kids
        wanting to play it today.
      </p>
      <p>
        During the course of this project, I had the pleasure of collaborating
        with{" "}
        <a
          href="http://heythere.ca/interview/jason-krogh/"
          target="_blank"
          rel="noopener noreferrer"
          style={paralinkStyle}
        >
          Jason Krogh{" "}
        </a>{" "}
        of SagoSago.
      </p>
    </div>
  );
};

export default TotalDrama;
