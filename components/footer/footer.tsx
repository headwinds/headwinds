import React, { useRef, useEffect } from "react";
import { Link } from "next-view-transitions";
import Links from "../links/links";

const Footer = () => {
  return (
    <div className="flex m-2 h-[200px] bg-slate-200">
      <div className="flex flex-col w-[50%]"></div>
      <div className="flex flex-col w-[10%] justify-center">
        <Links />
      </div>
      <div className="flex flex-col w-[40%]"></div>
    </div>
  );
};

export default Footer;
