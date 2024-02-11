import React, { Component } from 'react';
import LogMay4 from './LogMay4';
import { theme } from '../../theme/Theme';

export default class About extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          pointerEvents: 'none'
        }}
      >
        <div style={{ display: 'block', marginRight: 40, marginTop: 0 }}>
          <p
            style={{
              display: 'block',
              fontSize: 20,
              color: '#bd6e81',
              margin: 0,
              padding: 0
            }}
          >
            Predict Future Sales of the <br /> Russian Gaming Store, 1Company
          </p>
          <p
            style={{
              display: 'block',
              fontSize: 14,
              color: '#cb778b',
              margin: 0,
              padding: 0,
              marginBottom: 20
            }}
          >
            Work-n-progress Kaggle Competition (Start May 1/2018 - Day 4)
          </p>
          <LogMay4 />
          <a
            href="/"
            style={{
              ...theme.linkStyle,
              pointerEvents: 'all',
              cursor: 'pointer'
            }}
          >
            Back
          </a>
        </div>
      </div>
    );
  }
}
