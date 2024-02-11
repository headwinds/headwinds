import React from "react";
import { theme } from "../../theme/Theme";

const paralinkStyle = theme.paralinkStyle;

const Template = () => {
  return (
      <div>
<p>Meet {' '}
        <a
          href="https://www.youtube.com/watch?v=nGo2wnVGr1E"
          target="_blank"
          rel="noopener noreferrer"
          style={paralinkStyle}
        >
           Hassan Khan 
           </a>{" "}and{" "}
        <a
          href="https://www.youtube.com/watch?v=JpAhj8SJY-Y"
          target="_blank"
          rel="noopener noreferrer"
          style={paralinkStyle}
        >
           Dann Toliver. 
           </a></p>
           <p>In these videos, they present the revolutionary mission of TodaQ to enable
           emerging markets to preserve value and invest within their economy by using digital currency that can be tracked unlike cash.
           </p>
          <p>Toda is a blockchain service, which along with a currency, can produce many secure file types like identities, art or virtual items.
            With a Toda file, you have full control who can access that file and who you can share it with. As a decentralized network, Toda makes
            it easier to share and track files then a centralized database which is attracting many different verticals that struggle with this problem.
         </p>
         <p>I was brought in on a 6-month contract to design and build their enterprise portal. Developers could then sign up for the Toda service and register their accounts and token. We built in access control so that non-technical admins could also manage all the accounts.</p>
      </div>
  );
};

export default Template;
