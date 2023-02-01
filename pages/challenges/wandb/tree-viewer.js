import React from "react";

/*
the key is tye of the value
I could also use the value with typeof and Array.isArray
if object or array, recurse - this is a node
if terminating leaf value (string, number, boolean), return
*/
const defaultJson = {
  bool: true,
  num: 1,
  str: "hi buttercup",
  arr: [false, 0, "I'm the dread pirate robert"],
  obj: {
    nestedBool: true,
    nestedNum: 10,
    nestedStr: "THE MAN IN BLACK",
    nestedArr: [
      "Inconceivable!",
      "I'm just going to have to find myself a new giant",
    ],
    nestedUrl: "https://sfy.ru/?script=princess_bride",
  },
};

const renderLeaf = (leaf) => {
  if (typeof leaf === "boolean") return leaf.toString();
  else if (typeof leaf === "number") return leaf.toString();
  else if (typeof leaf === "string" && leaf.includes("https://"))
    return (
      <a href={leaf} style={{ color: "teal" }}>
        {leaf}
      </a>
    );
  else return leaf;
};

const recurseTree = (json, level = 0) => {
  return Object.keys(json).reduce((acc, val) => {
    if (typeof json[val] === "object") {
      level++;
      acc.push(
        <li>
          {val} {recurseTree(json[val], level)}
        </li>
      );
    } else {
      acc.push(
        <li style={{ paddingLeft: level * 10, margin: 4 }}>
          {val}: {renderLeaf(json[val], level)}
        </li>
      );
    }
    return acc;
  }, []);
};

const TreeViewer = ({ json = defaultJson }) => {
  const tree = recurseTree(defaultJson);

  return <ul style={{ margin: 26, "list-style-type": "none" }}>{tree}</ul>;
};

export default TreeViewer;
