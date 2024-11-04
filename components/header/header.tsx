import React, { useRef, useEffect } from "react";
import { Link } from "next-view-transitions";

const Header = () => {
  return (
    <div>
      <Link href={`/`}>Home</Link>
      <Link href={`/about`}>About</Link>
      <Link href={`/projects`}>Projects</Link>
      <Link href={`/contact`}>Contact</Link>
    </div>
  );
};

export default Header;
