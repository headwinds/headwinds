import React, { useState } from "react";
import { useSpring, animated, SpringValue } from "react-spring";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import About from "./about";
import Golds from "./golds";
import { Wrapper, Column } from "cross-country";

const isReady = false;

function Headwinds() {
  return (
    <Wrapper customClass={styles.wrapper}>
      <Head>
        <title>headwinds</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!isReady ? (
        <p>
          I'm on
          <a href="https://twitter.com/headwinds">twitter</a> and{" "}
          <a href="https://github.com/headwinds/">github</a>
        </p>
      ) : null}
      {isReady ? (
        <>
          <Column customClass={styles.about}>
            <About />
          </Column>
          <Column customClass={styles.visualization}>
            <Golds />
          </Column>
        </>
      ) : null}
    </Wrapper>
  );
}

export default Headwinds;
