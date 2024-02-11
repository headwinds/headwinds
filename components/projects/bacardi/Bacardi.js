import React from "react";
import { theme } from "../../theme/Theme";
import imgPath from "./bacardi.png"

const paralinkStyle = theme.paralinkStyle;

const Bacardi = () => {
  return (
      <div>
        <img src={imgPath} alt="bacardi unwrap the night" width="100%" />
         <p>
         <a
          href="https://www.youtube.com/watch?v=HbNDDQ7YB6s"
          target="_blank"
          rel="noopener noreferrer"
          style={paralinkStyle}
        >
          Bacardi Unwrap the Night
        </a>{' '} is a 360 video experience where you visit a penthouse party that is filled with surpises from your social media accounts. As you move through the room, you can spin the camera in any direction.</p> 
        <p>
        All the art of the walls has your photos with style transfers to make them look like a Warhol or Van Gogh.
        </p>
        <p>
        You can stop and order a drink which has your friends name added to them or you become the dj and mix between two tracks. Finally, you exit on the party onto the balcony and see a personalized fireworks show.
        </p>
      </div>
  );
};

export default Bacardi;

