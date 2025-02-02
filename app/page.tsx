"use client";

import HeadwindsSidequest from "../components/headwinds-sidequest";
import HeadwindsTractors from "../components/headwinds-tractors";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      {/* <HeadwindsSidequest /> */}
      <HeadwindsTractors />
    </div>
  );
}
