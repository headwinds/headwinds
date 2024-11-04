import React, {useRef, useEffect}  from "react";
import {drawRing} from './drawRing';

const Bio = () => {

  const bio  = useRef();

  useEffect( () => {

    if (bio.current) {
      drawRing();
    }

  });

  return (
    <div ref={bio}>
      <div id="ring" className="vizRing" />
      <p>
        I'm primarily a product-focussed, Frontend developer with more than 10 years of
        experience who works on complex UI problems that provide the best
        possible UX across multiple desktops and devices.
      </p>
      <p>
        I consider myself “pear-shaped” since I'm strong on the frontend and weaker on the backend. I’m typically paired with a
        backend developer and seldom get to use the fullstack professionally but
        for all my personal projects, I use either PostgreSQL or MongoDB
        depending on the task. I’ve learned to build RESTful services with Node,
        Clojure, and Python. 
      </p>
      <p>
        Today, I’m using the React/Redux ecosystem that I first picked up in
        2016, and have since added React Native, Typescript and NextJS into my
        development workflow. On the backend, I’m focussing on building Python
        APIs leveraging Flask.
      </p>
      <p>
        As a budding data scientist, I’ve also branched out into Machine
        Learning and can assemble a basic ML pipeline to perform predictions or
        recommendations. I’m fascinated by Natural Language Processing and
        produced several D3 and Python notebook data visualizations of customer
        intents and journey.
      </p>
    </div>
  );
};

export default Bio;
