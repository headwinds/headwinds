import React, { Component } from 'react';

export default class LogMay4 extends Component {
  render() {
    return (
      <div>
        <p>
          I{"'"}ve converted the 2M rows of daily sales into a sample data set
          covering the last 5 months reducing the daily to a monthy sales count
          as a basis for my historical data training set.
        </p>
        <p>
          I selected two models: RandomForest and GradientBoostingRegressor to
          make the predictions. So far my results are quite weak as I{"'"}m
          behind the benchmark with a 1.6 score. I need to bring that down to
          about 0.8 to have a competitive chance of landing at least a bronze.
        </p>
        <p>
          So far my experience with this dataset proves that data science work
          is 80% wrangling and 20% presentation. After 3 days of cleaning,
          processing and reducing the data, I{"'"}ve finally reached a stage
          where I can begin charting and visualizing the relationships.
        </p>
        <p
          style={{
            display: 'block',
            fontSize: 14,
            color: '#cb778b',
            margin: 0,
            padding: 0
          }}
        />
      </div>
    );
  }
}
