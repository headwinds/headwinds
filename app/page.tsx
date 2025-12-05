"use client";
import { Breadcrumb } from "@gobolt/genesis";
// TODO: add markdown-headwinds.mdx back in
//import MarkdownHeadwinds from "./markdown-headwinds.mdx";
import MarkdownQuest from "./brandon-flowers/markdown-quest.mdx";

export default function Home() {
  const items = [
    {
      title: "Headwinds",
    },
    {
      title: <a href="">Brandon Flowers</a>,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-between m-2">
      <MarkdownQuest />
    </div>
  );
}

//  <Breadcrumb items={items} /> /
