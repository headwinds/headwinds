import React, { useEffect, useReducer, createRef } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import getResult from "./template";

const stateValdiationInitialState = {
  person: {
    name: "getResult()",
  },
};

const stateActionTypes = {
  UPDATE_NAME: "update name",
};

const stateValidationReducer = (state, action) => {
  console.log("payload", action.payload);
  switch (action.type) {
    case stateActionTypes.UPDATE_NAME:
      return {
        ...state,
        person: {
          ...state.person,
          name: action.payload.name,
        },
      };

    default:
      return state;
  }
};

export default function Template() {
  const [state, dispatch] = useReducer(
    stateValidationReducer,
    stateValdiationInitialState
  );
  const {
    person: { name },
  } = state;
  const slabRef = createRef();

  const handleGetResult = () => {
    const newName = getResult("Thor");
    dispatch({
      type: stateActionTypes.UPDATE_NAME,
      payload: { name: newName },
    });
  };

  const htmlStr = `<div><h2>${getResult()}</h2></div>`;

  return (
    <div>
      <Head>
        <title>headwinds</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        ref={slabRef}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <h1 style={{ color: "grey" }}>Coding Challenge</h1>
        <div dangerouslySetInnerHTML={{ __html: htmlStr }} />
        <div style={{ display: "none" }}>
          <div>{name}</div>
          <button onClick={handleGetResult} style={{ padding: 8, margin: 16 }}>
            go
          </button>
        </div>
      </div>
    </div>
  );
}
