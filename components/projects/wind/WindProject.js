import React from "react";
import { theme } from "../../theme/Theme";

const paralinkStyle = theme.paralinkStyle;

const WindProject = () => {
  return (
      <div>
        <p>
          While searching through datasets on Kaggle, I discovered a fresh dataset covering
          over 20 years of US Wind Turbine production, and was pleasantly
          surprised to be the first to dive into this rich dataset and results can be seen in this{' '}
          <a
            href="https://www.kaggle.com/headwinds/us-wind-turbines"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...paralinkStyle,
              marginTop: 0,
              marginBottom: 20,
              pointerEvents: 'all',
              cursor: 'pointer'
            }}
          >
            Data Visualization.
          </a></p>
        <p>
          Instead of predictiong future production like I have done in the other
          competitions, I wanted to explore production at the state level and
          discover if any states were approaching 100% self sufficiency similar
          to Scotland{"'"}s tremendous achievement this year.
        </p>
      </div>
  );
};

export default WindProject;

