import React, { useRef, useEffect } from "react";
import { HeadwindsLogo, Headline } from "cross-country";
import { Link } from "next-view-transitions";
import Links from "../links/links";
import { format } from "date-fns-tz";

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
      <div>
        <p>{monthYear}</p>
        <p>Current Time in Toronto: {formatTime}</p>
        <p>{currentSeason}</p>
      </div>
      <div className="flex">
        <Headline customClass="p-0 m-0">Headwinds</Headline>
        <Link href={`/`}>
          {" "}
          <HeadwindsLogo />
        </Link>
      </div>
      <div>
        <Links />
      </div>
    </div>
  );
};

export default Header;
