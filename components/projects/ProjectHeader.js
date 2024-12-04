import React from "react";

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
          <h1>{title}</h1>
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
        <div id="colony" />
      </div>
    </div>
  );
};

export default ProjectHeader;
