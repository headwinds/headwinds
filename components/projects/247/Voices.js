import React from "react";
import { theme } from "../../theme/Theme";

import cluster from "./cluster.png";
import journey from "./journey.png";

const paralinkStyle = theme.paralinkStyle;

const Voices = () => {
  return (
    <div>
      <img src={cluster} alt="cluster of conversation data" width="100%" />
      <p>
        {" "}
        I had an incredible 5 years building 3 major products at{" "}
        <a
          href="https://www.247.ai/"
          target="_blank"
          rel="noopener noreferrer"
          style={paralinkStyle}
        >
          24-7 ai.
        </a>{" "}
      </p>
      <p>
        <a
          href="https://www.youtube.com/watch?v=5KZofZX3XaY"
          target="_blank"
          rel="noopener noreferrer"
          style={paralinkStyle}
        >
          Voices
        </a>{" "}
        that visualizes and tracks the customer journey across the omnichannel.
      </p>
      <img
        src={journey}
        alt="time series chart showing how customers made decisions"
        width="100%"
      />
      <p>
        Offers was a product that the matched financial services to questions,
        and dramatically increased the likelyhood that a customer would engage
        with the service by over 2000%.
      </p>
      <p>
        ML Tools is a suite of apps that are used by both Data Scientists and
        non-technical staff. They significantly reduce the time to prepare
        models from 3 months to 2 weeks. Over 95% of Conversations that are not
        too complex are now annotated by machines while only the most difficult
        text is left for human comprehension.
      </p>
    </div>
  );
};

export default Voices;
