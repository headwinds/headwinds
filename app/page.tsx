import Image from "next/image";
// TODO: Wrapper is not available in this file
//import { Wrapper, HeadwindsHomePage } from "cross-country";
import HeadwindsSidequest from "../components/headwinds-sidequest";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <HeadwindsSidequest />
    </div>
  );
}
