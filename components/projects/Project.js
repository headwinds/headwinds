import React, { Component } from "react";
import { theme } from "../theme/Theme";
// import { drawColony } from "./drawColony";
import { connect } from "react-redux";
import ProjectHeader from "./ProjectHeader";
import SocialLinks from "./SocialLinks";
import BMW from "./bmw/BMW";
import Voices from "./247/Voices";
import Ada from "./ada/Ada";
import Bio from "./bio/Bio";
import TotalDrama from "./totaldrama/TotalDrama";
import Mitsubishi from "./mitsubishi/Mitsubishi";
import Microsoft from "./microsoft/Microsoft";
import CAMH from "./camh/CAMH";
import Trioova from "./trioova/Trioova";
import Toda from "./toda/Toda";
import Bacardi from "./bacardi/Bacardi";
import Labatt from "./labatt/Labatt";
import Nintendo from "./nintendo/Nintendo";
import WindProject from "./wind/WindProject";

const containerStyle = theme.containerStyle;

class Project extends Component {
  constructor(props) {
    super(props);

    console.log("Project props: ", props);
  }

  componentDidMount() {
    console.log("Project componentDidMount ");

    //const { route } = this.props;
    /*
    setTimeout( () => {
      drawColony(project, this.props);
    }, 500);*/
  }

  render() {
    const { route } = this.props;
    const title = route.title;
    return (
      <div className="bio" style={containerStyle}>
        <ProjectHeader title={title} />
        <div
          style={{
            overflow: "hidden",
            overflowY: "auto",
            maxHeight: "400px",
            width: "95%",
            padding: "10px",
            border: "1px solid #eee",
            margin: "0px",
            marginBottom: "20px",
          }}
        >
          {route.project === "ada" && <Ada />}
          {route.project === "bio" && <Bio />}
          {route.project === "bmw" && <BMW />}
          {route.project === "247" && <Voices />}
          {route.project === "totaldrama" && <TotalDrama />}
          {route.project === "mitsubishi" && <Mitsubishi />}
          {route.project === "camh" && <CAMH />}
          {route.project === "trioova" && <Trioova />}
          {route.project === "toda" && <Toda />}
          {route.project === "bacardi" && <Bacardi />}
          {route.project === "labatt" && <Labatt />}
          {route.project === "nintendo" && <Nintendo />}
          {route.project === "microsoft" && <Microsoft />}
          {route.project === "wind" && <WindProject />}
        </div>
        <SocialLinks />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  app: state.app,
  location: ownProps.location,
  game: state.game,
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
