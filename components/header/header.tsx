"use client";

import React, { useRef, useEffect } from "react";
import { HeadwindsLogo, Headline } from "cross-country";
import { Link } from "next-view-transitions";
import Links from "../links/links";
import { format } from "date-fns-tz";
import { GithubLogo } from "@phosphor-icons/react";

type Seasons = {
  Spring: string;
  Summer: string;
  Fall: string;
  Winter: string;
};

const seasons: Seasons = {
  Spring: "April,May,June",
  Summer: "July,August,September",
  Fall: "October,November,December",
  Winter: "January,February,March",
};

const Header = () => {
  // use date-fns to get the current month
  const currentMonth = format(new Date(), "MMMM");
  const currentYear = format(new Date(), "yyyy");
  const monthYear = format(new Date(), "MMMM yyyy");
  // format to EST time zone

  const timeZone = "America/Toronto";
  const formatTime = format(new Date(), "h:mm a", { timeZone });

  const currentSeason: string | undefined =
    (Object.keys(seasons) as (keyof Seasons)[]).find((season) =>
      seasons[season].includes(currentMonth)
    ) ?? "Spring";

  return (
    <div className="flex bg-slate-100 items-center justify-between">
      <div className="flex flex-col m-4">
        <p>{monthYear}</p>
        <p>Current Time in Toronto: {formatTime}</p>
        <p>{currentSeason}</p>
      </div>
      <div className="flex">
        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Satisfy&display=swap");
        `}</style>
        <h1
          className="text-4xl font-bold text-center mb-8 text-stone-700"
          style={{ fontFamily: "'Satisfy', cursive" }}
        >
          Headwinds
        </h1>
        <Link href={`/`}>
          {" "}
          <HeadwindsLogo />
        </Link>
      </div>
      <div>
        <Links />
      </div>
      {/* <div className="flex w-[50px] h-[50px] rounded-full bg-slate-400 m-4" /> */}
      <div className="flex flex-col justify-center items-center m-2">
        <a href="https://github.com/headwinds/headwinds" target="_blank">
          <GithubLogo size={32} weight="fill" color="#333" />
        </a>
      </div>
    </div>
  );
};

export default Header;
