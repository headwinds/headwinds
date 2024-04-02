import React from "react";
import { theme } from "../../theme/Theme";

const paralinkStyle = theme.paralinkStyle;

const Trioova = () => {
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
                  href="https://www.folio.ca/ualberta-startup-takes-courageous-step-in-face-of-imminent-business-failure/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={paralinkStyle}
                >
                  Trioova
                </a>{' '}
            was one of several projects we worked on. It was secure marketplace for patients to assemble a team of care givers and communicate with them through individual and group chat services.  
          </p>
          <p>
          Along with chat, they could purchase services from providers via the Stripe integration. 
          </p>
      </div>
  );
};

export default Trioova;
