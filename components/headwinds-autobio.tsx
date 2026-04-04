"use client";
import React from "react";
import {
  HeadwindsLogo,
  Column,
  Paragraph,
  Link,
  List,
  ListItem,
  Row,
} from "cross-country";

import {
  LinkedinLogo,
  GithubLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";

const moss = "#bccd9d";
const gold = "rgb(207, 192, 127)"; //"#b2a25a";
const teal = "#0baeae";

interface TestType {
  color: string;
  backgroundColor: string;
  padding: number;
  borderRadius: number;
}

const HeadwindsAutobio = () => {
  const customLinkStyle = {
    textDecoration: "none",
    boxShadow: "none",
    borderBottom: "none",
    alignItems: "center",
    display: "flex",
  };

  const customParagraphStyle = {
    marginLeft: 8,
    color: gold,
  };

  const paraStyle = { lineHeight: 1.5 };

  return (
    <div
      style={{
        padding: 0,
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Paragraph customStyle={paraStyle}>
        Ever since the death of Google Reader 💀, I've been tracking trends
        across over 50 feeds covering design, technology, architecture, gaming
        and sports in a personal project called{" "}
        <Link url="https://headwinds.github.io/headwinds/docs/apps/porthole/">
          Porthole
        </Link>
        .
      </Paragraph>
      <Column>
      <Row customStyle={{width: "100%", justifyContent: "space-between", background: "#fffdf6", borderTop: "1px solid #fcfcc5"
      }}>
        <List customStyle={{ listStyleType: "none" }}>
          <ListItem>
            <Link
              url="https://www.linkedin.com/in/brandonflowers"
              customStyle={customLinkStyle}
            >
              <LinkedinLogo size={32} color={gold} weight="light" />
              <Paragraph customStyle={customParagraphStyle}>Linkedin</Paragraph>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              url="https://www.github.com/headwinds"
              customStyle={customLinkStyle}
            >
              <GithubLogo size={32} color={gold} weight="light" />
              <Paragraph customStyle={customParagraphStyle}>Github</Paragraph>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              url="https://www.twitter.com/headwinds"
              customStyle={customLinkStyle}
            >
              <XLogo size={32} color={gold} weight="light" />
              <Paragraph customStyle={customParagraphStyle}>X</Paragraph>
            </Link>
          </ListItem>
        </List>
        <div style={{width: 200, display: "flex", justifyContent: "center"}}>
        <HeadwindsLogo width={100} />  
        </div>
      </Row>
   
      </Column>
    </div>
  );
};
export default HeadwindsAutobio;

/*
   <div style={{ zIndex: 9, background: "red", clipPath: "polygon(0 0, 80% 0, 100% 20%, 100% 100%, 0 100%)"}} data-testid="overlay" />

   https://stackoverflow.com/questions/72611944/unable-to-have-a-div-with-sharp-corner-instead-getting-it-as-rounded-corner#:~:text=You%20can%20use%20clip%2Dpath%20instead%20of%20a%20rounded%20corner.
*/
