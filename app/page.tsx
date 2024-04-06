import Image from "next/image";
import { Wrapper, HeadwindsHomePage } from "cross-country";
import HeadwindsSidequest from "../components/headwinds-sidequest";

export default function Home() {
  return (
    <Wrapper customClass="flex min-h-screen flex-col items-center justify-between p-24">
      <HeadwindsSidequest />
    </Wrapper>
  );
}
