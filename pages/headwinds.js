import React from "react";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import { Wrapper, HeadwindsHomePage } from "cross-country";
//import HeadwindsSidequest from "../components/headwinds-sidequest"

const isReady = false;

// https://apps.apple.com/ca/app/validere/id6446293374?platform=iphone - validere

// https://www.youtube.com/watch?v=HbNDDQ7YB6s - unwrap the night
// https://www.youtube.com/watch?v=5KZofZX3XaY&t=66s - voices
// https://github.com/headwinds/echobase - https://headwinds.now.sh/portfolio

function Headwinds() {
  return (
    <Wrapper customClass={styles.wrapper}>
      <Head>
        <title>headwinds</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeadwindsHomePage />
    </Wrapper>
  );
}

export default Headwinds;
