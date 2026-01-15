/* 
Headwinds Contact Component

Who can contact me

Friend or recruiter - got a job? offer?

It will use the scout API to validate the form submission
*/
"use client";
import React from "react";
import { Column, Row, Paragraph } from "cross-country";
import { useQuery } from "@tanstack/react-query";
import { getScoutDomain } from "@/utils/network-util";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

const fetchPostContact = async (payload: ContactPayload) => {
  const response = await fetch(`${getScoutDomain()}/api/email/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const HeadwindsContact = () => {
  return (
    <Column>
      <Row>
        <Paragraph>Contact Me</Paragraph>
      </Row>
    </Column>
  );
};

export default HeadwindsContact;
