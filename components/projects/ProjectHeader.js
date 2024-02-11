import React from "react";
import { theme } from "../theme/Theme";
import { Link } from "react-router";

const linkStyle = theme.linkStyle;
const titleStyle = theme.titleStyle;
const colonyStyle = theme.colonyStyle;

const ProjectHeader = ({ title }) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1 style={titleStyle}>{title}</h1>
        </div>
        <div>
          <Link to={`/portfolio`} style={linkStyle}>
            X
          </Link>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "",
        }}
      >
        <div id="colony" style={colonyStyle} />
      </div>
    </div>
  );
};

export default ProjectHeader;
