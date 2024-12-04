import ArticleMDX from "./dicom/dicom.mdx";
import { Headline, SubHeadline, Paragraph } from "cross-country";
import { ReactNode } from "react";

function CustomH1({ children }: { children: ReactNode }) {
  return <h1 className="text-xl text-teal-800">{children}</h1>;
}

function CustomH2({ children }: { children: ReactNode }) {
  return <h1 className="text-sm text-teal-800">{children}</h1>;
}

const overrideComponents = {
  h1: Headline,
  h2: SubHeadline,
  p: Paragraph,
};

export default function Article() {
  return (
    <div className="flex min-h-screen flex-col justify-between p-24">
      <ArticleMDX components={overrideComponents} />
    </div>
  );
}
