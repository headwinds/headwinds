import React from "react";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import { Wrapper, HeadwindsHomePage } from "cross-country";
import HeadwindsSidequest from "../components/headwinds-sidequest"

const isReady = false;

function Headwinds() {
  return (
    <Wrapper customClass={styles.wrapper}>
      <Head>
        <title>headwinds</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!isReady ? (
        <>
          <HeadwindsSidequest />
        </>
      ) : null}
      {isReady ? <HeadwindsHomePage /> : null}
    </Wrapper>
  );
}

export default Headwinds;
