import dynamic from "next/dynamic";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const DynamicHeadwinds = dynamic(() => import("./headwinds"), {
  ssr: false,
});

export default function Home() {
  return <DynamicHeadwinds />;
}

/*

Script 

Electric [flash the electric emoji]
Hi, I'm Brandon Flowers, and I'm a Full Stack Sofware engineer.

I prefer React, Node, Springboot Java, Go and SQL.

React means React Native - I have a secret project with Expo, NestJS and PostgreSQL.

FULL STACK

I built the API powering this website with NextJS, Python (Flask) and PostgreSQL.

FULL STACK 

I delight in building end to end solutions that efficient and performant.

The frontend should be aesthetically-pleasing; load quickly; and responsive.

The backend should be scalable, secure and reliable.

I want to collaborate with mission-driven big thinkers and machine learning engineers.

Both sides should be well-tested and instrumented.

I'm passionate about AI Assistants, E-Commerce, Architecture and our Electric future.
*/

/*
Goals of this page

Frontend Goals
- I want to make a React Spring animation assistant that is simple to use and has the physics of React Spring.
- find a creative use of Pusher Channels to make to feel multiplayer; campfire chat
- an admin page to allow me to drag and drop my gold lists
- visualization of my gold lists and event metrics

Backend Goals
- a virtual assistant service will field questions from any visitors
- scout will support my admin page offering CRUD services to manage my gold lists
- event metrics will be collected and stored
*/

/*
USAGE

transitionModel = {
  from: {},
  to: {},
  target: {},
}

disney.transtion(transitionModel);

https://react-spring.dev/common/interpolation <-- HELP!

const animationAssistant = () => {
  transition: () => {},
  spring: () => {},
  keyframes: () => {},
  chain: () => {},
  delay: () => {},
  stagger: () => {},
  parallel: () => {},
  loop: () => {},
  schedule: () => {},
  interpolate: () => {},
  to: () => {},
  from: () => {},
}

const disney = animationAssistant;
*/
