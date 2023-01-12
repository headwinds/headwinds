import React, { useState } from "react";
import { useSpring, animated, SpringValue } from "react-spring";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import About from "./about";
import Golds from "./golds";
import { Wrapper, Column, Accordion } from "cross-country";


function Headwinds() {
  return (
    <Wrapper customClass={styles.wrapper}>
      <Head>
        <title>headwinds</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Accordion foo="bar" />
      <Column customClass={styles.about}>
        <About />
      </Column>
      <Column customClass={styles.visualization}>
        <Golds />
      </Column>
    </Wrapper>
  );
}

export default Headwinds;
