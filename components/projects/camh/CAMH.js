import React from "react";
import { theme } from "../../theme/Theme";

const paralinkStyle = theme.paralinkStyle;

const CAMH = () => {
  return (
      <div>
        <p>
         <a
          href="https://www.qochealth.com"
          target="_blank"
          rel="noopener noreferrer"
          style={paralinkStyle}
        >
          QoC Health
        </a>
        {' '} is an agency for health care clients.  I joined as a senior developer and was promoted to team lead reporting to the CTO and mentoring a mix of 5 junior to intermediate developers. 
        </p>
          <p>
           <a
                href="https://mythoughtspot.ca/"
                target="_blank"
                rel="noopener noreferrer"
                style={paralinkStyle}
                >
                  Thoughtspot
                </a>{' '}
            was one of several projects we worked on. It was a launched as a responsive web app that worked on both desktop and mobile devices. The native apps were produced by wrapping the app in a web view. 
          </p>
          <p>
        The app allowed students from across Toronto to discover locatons within the city and share them with their friends. It leveraged Mapbox for the UI, both Mapbox and Google Maps API to populate location info, and we did our own custom geolocation search services with MSSQL. 
        </p>    
      </div>
  );
};

export default CAMH;

