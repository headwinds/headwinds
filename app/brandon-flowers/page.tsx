"use client";
import { Breadcrumb } from "@gobolt/genesis";
import MarkdownQuest from "./markdown-quest.mdx";

export default function BrandonFlowers() {
  const items = [
    {
      title: <a href="">Headwinds</a>,
    },
    {
      title: "Brandon Flowers",
    },
  ];
  return (
    <div className="flex min-h-screen flex-col items-center justify-between m-2">
      <Breadcrumb items={items} />
      <MarkdownQuest />
    </div>
  );
}
