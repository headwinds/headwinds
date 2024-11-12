import React, { useRef, useEffect } from "react";
import { Link } from "next-view-transitions";

/*
Requires hamburger menu for mobile
on header
*/
export const Links = () => (
  <>
    <Link href={`/`}>Home</Link>
    <Link href={`/about`}>About</Link>
    <Link href={`/articles`}>Articles</Link>
    <Link href={`/projects`}>Projects</Link>
    <Link href={`/contact`}>Contact</Link>
  </>
);

export default Links;
