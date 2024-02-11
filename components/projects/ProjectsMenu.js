import React, { Component } from 'react';
import { connect } from 'react-redux';
//import RussianGamingGraph from '../projects/1CCompany/RussianGamingGraph';
//import About from '../projects/1CCompany/About';
//import Bio from '../projects/bio/Bio';
//import { theme } from '../theme/Theme';
//import { log } from '../../utils/LogUtil';
import { Link } from 'react-router';

class ProjectsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {/*
        <h2>Data Visualization</h2>
        <Link to="/bio">Bio</Link>

          Filter by Time or by Topic
          */}
        <h2>Data Science</h2>
        <Link to="/data-science/us-wind-energy-production">
          US Wind Energy Production
        </Link>
        <Link to="/data-science/predicting-game-sales">
          Predicting Game Sales
        </Link>
        {/*
          <h2>UI</h2>
          <Link to="/ui/loyalty">
            US Wind Energy Production
          </Link>
        */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsMenu);
