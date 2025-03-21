"use client";

import MarkdownQuest from "./markdown-quest.mdx";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between m-2">
      <MarkdownQuest />
    </div>
  );
}
