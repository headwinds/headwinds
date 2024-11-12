declare module "cross-country" {
  import React from "react";

  export const HeadwindsLogo: React.FC<{ size?: number; color?: string }>;
  export const Link: React.FC<{ url: string; children: React.ReactNode }>;
  export const Headline: React.FC<{
    customClass: string;
    children: React.ReactNode;
  }>;
  export const SubHeadline: React.FC<{ children: React.ReactNode }>;
  export const Paragraph: React.FC<{ children: React.ReactNode }>;
}
