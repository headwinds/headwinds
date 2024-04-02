import React from "react";
import { theme } from "../../theme/Theme";

import predictiveSuggestions from "./predictiveSuggestions.png";
import tree from "./tree2.png";

const paralinkStyle = theme.paralinkStyle;

const Ada = () => {
  return (
    <div>
      <p>
        <a
          href="https://www.ada.support"
          target="_blank"
          rel="noopener noreferrer"
          style={paralinkStyle}
        >
          Ada Support
        </a>{" "}
        is mission is to blend human and AI collaboration.
      </p>
      <img
        src={predictiveSuggestions}
        alt="screenshot of predictive suggestions"
        width="100%"
      />
      <p>
        I worked on their chatbot UI producing an NLP-based feature called{" "}
        <a
          href="https://www.youtube.com/watch?v=57e8OR_ZMrc"
          target="_blank"
          rel="noopener noreferrer"
          style={paralinkStyle}
        >
          Predictive Suggestions
        </a>{" "}
        that provides up to 3 quick answers from a machine learning service that
        update as the user types.{" "}
      </p>
      <img src={tree} alt="decision tree" width="100%" />
      <p>
        I developed a decision tree data visualization to present customer flows
        and show where they are have having difficulty.
      </p>
      <p>
        As part of the Machine Learning team, I saw opportunities to help the
        data scientists reduce the time it takes to audit conversations. I built
        an annotation tool which vastly improved the labelling, comparisons, and
        the models overall ability to separate "clarification" from "not
        understood" answers.
      </p>
    </div>
  );
};

export default Ada;
