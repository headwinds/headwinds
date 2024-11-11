import React, { useRef, useEffect } from "react";
import { Link } from "next-view-transitions";

export const Links = () => (
  <>
    <Link href={`/`}>Home</Link>
    <Link href={`/about`}>About</Link>
    <Link href={`/articles`}>Articles</Link>
    <Link href={`/projects`}>Projects</Link>
    <Link href={`/contact`}>Contact</Link>
  </>
);

const Footer = () => {
  return (
    <div className="flex m-2">
      <div className="flex flex-col w-[50%]">something</div>
      <div className="flex flex-col w-[10%] justify-center">
        <Links />
      </div>
      <div className="flex flex-col w-[40%]">something else</div>
    </div>
  );
};

export default Footer;
