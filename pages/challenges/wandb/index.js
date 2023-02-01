import React, { useEffect, useReducer, createRef } from "react";
import Head from "next/head";
import Image from "next/image";

import TreeViewer from "./tree-viewer";

export default function Wandb() {
  return (
    <div>
      <Head>
        <title>headwinds</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ margin: 26, width: 400, height: "auto" }}>
        <Image
          src={"/giant.png"}
          alt="giant from the princess bride"
          layout="responsive"
          width={400}
          height={0} // height is calculated automatically based on parent width
        />
        <TreeViewer />
      </div>
    </div>
  );
}
