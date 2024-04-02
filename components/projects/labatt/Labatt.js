import React from "react";
import wolfpack1 from "./wolfpack1.png";
import wolfpack2 from "./wolfpack2.png";

const Labatt = () => {
  return (
    <div>
      <img src={wolfpack1} alt="labatt CMS screenshot" width="100%" />
      <p>
        I designed and developed this loyalty program for Labatt Call Centre
        Representatives who handle clients across the country.
      </p>
      <img src={wolfpack2} alt="labatt CMS screenshot" width="100%" />
      <p>
        The system tracks their business goals and will remind them of their
        next steps and offer rewards based on their progress. I have been
        involved in three versions of this application moving it through
        Interaction Design cycles to a fully functional CRM.
      </p>
    </div>
  );
};

export default Labatt;
