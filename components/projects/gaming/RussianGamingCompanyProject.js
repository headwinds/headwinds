import React, { Component } from 'react';
import { connect } from 'react-redux';
//import RussianGamingGraph from './RussianGamingGraph';
import About from './About';
//

// import { log } from '../../../utils/LogUtil';

class RussianGamingCompanyProject extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          display: 'block',
          position: 'relative',
          height: '100vh',
          width: '100vw',
          overflow: 'hidden'
        }}
      >
        <div className="about">
          <About />
        </div>
        {/*<div className="graph">
          <RussianGamingGraph />
        </div>*/}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  app: state.app,
  location: ownProps.location
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  RussianGamingCompanyProject
);
