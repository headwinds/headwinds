"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import HumberPosterPreview from "@/components/rangers/HumberPosterPreview";
import RangersInteractiveMap from "@/components/rangers/RangersInteractiveMap";
import type { ScoutUser, PublicProfile } from "@/types/soloscout";
import Participation from "./participation";

// is the participate a SoloScout member?!
// participant should be soloscout members!
// then I wouldn't need to build a separate profile system, and could just link to their soloscout profile page.

type ParticipantNode = {
  id: string;
  x: number;
  y: number;
  score: number;
  new?: boolean;
  scoutUser: ScoutUser;
  publicProfile?: PublicProfile;
};

type ParticipantLink = {
  source: string;
  target: string;
  strength: number;
};

type MonthlyNetwork = {
  activeParticipants: number;
  newParticipants: number;
  returningParticipants: number;
  totalConnectionStrength: number;
  nodes: ParticipantNode[];
  links: ParticipantLink[];
};

const monthOrder = ["2026-03", "2026-04", "2026-05", "2026-06"];

const SOLOSCOUT_SITE_URL = "https://soloscout.net";

type ParticipantSeed = {
  id: string;
  username: string;
  displayName: string;
  x: number;
  y: number;
  score: number;
  new?: boolean;
  hasPublicProfile?: boolean;
};

const createScoutUser = (seed: ParticipantSeed): ScoutUser => ({
  created_at: "2026-01-01T00:00:00.000Z",
  updated_at: "2026-06-01T00:00:00.000Z",
  user_account_id: `soloscout-${seed.id}`,
  userStatus: "REGISTERED_SCOUT_USER",
  username: seed.username,
  email: `${seed.username}@soloscout.net`,
});

const createPublicProfile = (
  seed: ParticipantSeed,
  scoutUser: ScoutUser
): PublicProfile => ({
  user_account_id: scoutUser.user_account_id,
  first_name: seed.displayName.split(" ")[0],
  last_name: seed.displayName.split(" ").slice(1).join(" ") || undefined,
  display_name: seed.displayName,
  avatar_url: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
    seed.displayName
  )}`,
  bio: "Soloscout member participating in the Humber River Rangers network.",
  location: "Toronto, Canada",
  website: undefined,
  interests: ["climate", "community", "rivers"],
  profession: "Creator",
  company: "SoloScout",
  industry: "Community / Climate",
});

const createParticipant = (seed: ParticipantSeed): ParticipantNode => {
  const scoutUser = createScoutUser(seed);

  return {
    id: seed.id,
    x: seed.x,
    y: seed.y,
    score: seed.score,
    new: seed.new,
    scoutUser,
    publicProfile:
      seed.hasPublicProfile === false
        ? undefined
        : createPublicProfile(seed, scoutUser),
  };
};

const participantLabel = (participant: ParticipantNode) =>
  participant.publicProfile?.display_name ||
  participant.publicProfile?.first_name ||
  participant.scoutUser.username ||
  participant.scoutUser.user_account_id;

const participantSubtitle = (participant: ParticipantNode) =>
  participant.publicProfile?.profession ||
  participant.scoutUser.email ||
  "Soloscout member";

const getParticipantLink = (participant: ParticipantNode) => {
  const profileBase = `${SOLOSCOUT_SITE_URL}/user/public`;

  return participant.publicProfile
    ? `${profileBase}?userId=${encodeURIComponent(
        participant.scoutUser.user_account_id
      )}`
    : `${SOLOSCOUT_SITE_URL}/user/claim`;
};

const monthlyNetworks: Record<string, MonthlyNetwork> = {
  "2026-03": {
    activeParticipants: 14,
    newParticipants: 9,
    returningParticipants: 5,
    totalConnectionStrength: 42,
    nodes: [
      createParticipant({
        id: "bf",
        username: "brandon",
        displayName: "Brandon Flowers",
        x: 50,
        y: 50,
        score: 10,
      }),
      createParticipant({
        id: "am",
        username: "amina",
        displayName: "Amina Chen",
        x: 28,
        y: 38,
        score: 7,
      }),
      createParticipant({
        id: "jo",
        username: "jordan",
        displayName: "Jordan Lee",
        x: 38,
        y: 70,
        score: 6,
        hasPublicProfile: false,
      }),
      createParticipant({
        id: "pk",
        username: "priya",
        displayName: "Priya Kapoor",
        x: 63,
        y: 35,
        score: 8,
      }),
      createParticipant({
        id: "li",
        username: "liam",
        displayName: "Liam Osei",
        x: 70,
        y: 62,
        score: 5,
        new: true,
        hasPublicProfile: false,
      }),
      createParticipant({
        id: "zo",
        username: "zoe",
        displayName: "Zoe Martin",
        x: 20,
        y: 58,
        score: 3,
        new: true,
        hasPublicProfile: false,
      }),
    ],
    links: [
      { source: "bf", target: "pk", strength: 9 },
      { source: "bf", target: "am", strength: 7 },
      { source: "bf", target: "jo", strength: 6 },
      { source: "pk", target: "li", strength: 4 },
      { source: "am", target: "zo", strength: 3 },
      { source: "jo", target: "zo", strength: 2 },
    ],
  },
  "2026-04": {
    activeParticipants: 18,
    newParticipants: 6,
    returningParticipants: 12,
    totalConnectionStrength: 63,
    nodes: [
      createParticipant({
        id: "bf",
        username: "brandon",
        displayName: "Brandon Flowers",
        x: 52,
        y: 49,
        score: 11,
      }),
      createParticipant({
        id: "am",
        username: "amina",
        displayName: "Amina Chen",
        x: 27,
        y: 37,
        score: 8,
      }),
      createParticipant({
        id: "jo",
        username: "jordan",
        displayName: "Jordan Lee",
        x: 35,
        y: 68,
        score: 7,
        hasPublicProfile: false,
      }),
      createParticipant({
        id: "pk",
        username: "priya",
        displayName: "Priya Kapoor",
        x: 64,
        y: 34,
        score: 9,
      }),
      createParticipant({
        id: "li",
        username: "liam",
        displayName: "Liam Osei",
        x: 72,
        y: 61,
        score: 7,
        hasPublicProfile: false,
      }),
      createParticipant({
        id: "zo",
        username: "zoe",
        displayName: "Zoe Martin",
        x: 22,
        y: 57,
        score: 4,
        hasPublicProfile: false,
      }),
    ],
    links: [
      { source: "bf", target: "pk", strength: 10 },
      { source: "bf", target: "am", strength: 8 },
      { source: "bf", target: "jo", strength: 7 },
      { source: "pk", target: "li", strength: 6 },
      { source: "am", target: "zo", strength: 4 },
      { source: "jo", target: "li", strength: 5 },
    ],
  },
  "2026-05": {
    activeParticipants: 21,
    newParticipants: 4,
    returningParticipants: 17,
    totalConnectionStrength: 79,
    nodes: [
      createParticipant({
        id: "bf",
        username: "brandon",
        displayName: "Brandon Flowers",
        x: 51,
        y: 49,
        score: 12,
      }),
      createParticipant({
        id: "am",
        username: "amina",
        displayName: "Amina Chen",
        x: 25,
        y: 38,
        score: 9,
      }),
      createParticipant({
        id: "jo",
        username: "jordan",
        displayName: "Jordan Lee",
        x: 34,
        y: 69,
        score: 8,
        hasPublicProfile: false,
      }),
      createParticipant({
        id: "pk",
        username: "priya",
        displayName: "Priya Kapoor",
        x: 65,
        y: 33,
        score: 10,
      }),
      createParticipant({
        id: "li",
        username: "liam",
        displayName: "Liam Osei",
        x: 74,
        y: 60,
        score: 8,
        hasPublicProfile: false,
      }),
      createParticipant({
        id: "zo",
        username: "zoe",
        displayName: "Zoe Martin",
        x: 23,
        y: 57,
        score: 5,
        hasPublicProfile: false,
      }),
    ],
    links: [
      { source: "bf", target: "pk", strength: 11 },
      { source: "bf", target: "am", strength: 9 },
      { source: "bf", target: "jo", strength: 8 },
      { source: "pk", target: "li", strength: 7 },
      { source: "am", target: "zo", strength: 5 },
      { source: "jo", target: "li", strength: 6 },
    ],
  },
  "2026-06": {
    activeParticipants: 24,
    newParticipants: 5,
    returningParticipants: 19,
    totalConnectionStrength: 95,
    nodes: [
      createParticipant({
        id: "bf",
        username: "brandon",
        displayName: "Brandon Flowers",
        x: 50,
        y: 50,
        score: 12,
      }),
      createParticipant({
        id: "am",
        username: "amina",
        displayName: "Amina Chen",
        x: 24,
        y: 36,
        score: 10,
      }),
      createParticipant({
        id: "jo",
        username: "jordan",
        displayName: "Jordan Lee",
        x: 33,
        y: 70,
        score: 9,
        hasPublicProfile: false,
      }),
      createParticipant({
        id: "pk",
        username: "priya",
        displayName: "Priya Kapoor",
        x: 66,
        y: 33,
        score: 11,
      }),
      createParticipant({
        id: "li",
        username: "liam",
        displayName: "Liam Osei",
        x: 75,
        y: 59,
        score: 9,
        hasPublicProfile: false,
      }),
      createParticipant({
        id: "zo",
        username: "zoe",
        displayName: "Zoe Martin",
        x: 22,
        y: 56,
        score: 6,
        hasPublicProfile: false,
      }),
    ],
    links: [
      { source: "bf", target: "pk", strength: 12 },
      { source: "bf", target: "am", strength: 10 },
      { source: "bf", target: "jo", strength: 9 },
      { source: "pk", target: "li", strength: 8 },
      { source: "am", target: "zo", strength: 6 },
      { source: "jo", target: "li", strength: 7 },
    ],
  },
};

const events = [
  {
    date: "Jun 22",
    title: "Old Mill to Magwood Park Cleanup",
    time: "9:30 AM",
  },
  { date: "Jul 06", title: "Water Testing + Data Walk", time: "10:00 AM" },
  { date: "Jul 20", title: "Trail Litter Sweep + Sorting", time: "9:00 AM" },
];

const techThemes = [
  "Scout platform coordination",
  "Google-connected event logistics",
  "Water testing and field data capture",
  "Exploratory robotics and drone-assisted observation",
];

const creators = [
  "River science explainers",
  "Urban watershed storytellers",
  "Climate tech field builders",
];

const titans = ["Jacques Cousteau", "David Suzuki", "Jane Goodall"];

const worldConnections = [
  "Connect with ranger and stewardship groups in other cities.",
  "Invite guest talks from global community organizers.",
  "Share monthly participation snapshots across chapters.",
];

const cityConnections = [
  "Humber River (Toronto)",
  "Stratford river concerns",
  "Toronto to Montreal corridor and the St. Lawrence system",
];

const formatMonth = (month: string) => {
  const [year, num] = month.split("-");
  const date = new Date(Number(year), Number(num) - 1, 1);
  return date.toLocaleString("en-CA", { month: "short", year: "numeric" });
};

const hasMap = false;
const hasPosterGenerator = false;

const Rangers = () => {
  const [selectedMonth, setSelectedMonth] = useState(
    monthOrder[monthOrder.length - 1]
  );
  const network = monthlyNetworks[selectedMonth];

  const nodeMap = useMemo(() => {
    return new Map(network.nodes.map((node) => [node.id, node]));
  }, [network.nodes]);

  const participationRows = useMemo(
    () => [...network.nodes].sort((left, right) => right.score - left.score),
    [network.nodes]
  );

  return (
    <PageShell>
      <div className="bg-[#F3EBE2] rounded-2xl p-8 md:p-12 flex flex-col lg:flex-row gap-8 lg:items-stretch">
        <div className="flex-1 flex flex-col gap-4">
          <p className="text-xs font-medium text-[#6B6B6B] tracking-[3px] m-0">
            RANGERS
          </p>
          <h1 className="text-4xl md:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-tight m-0">
            Humber River Rangers
          </h1>
          {hasMap && <RangersInteractiveMap />}
          <p className="text-lg text-[#3D3D3D] leading-relaxed m-0 max-w-2xl">
            A volunteer community restoring and protecting the Humber River in
            Toronto through recurring cleanups, water-health projects, and
            practical climate action exploring the cross-section of AI, design,
            and community engagement. Each year we'll celebrate the salmon
            migration with a special event to watch them return.
          </p>
        </div>

        <div className="w-full lg:w-[620px] lg:shrink-0">
          <img
            src="/humber_river_salmon_volunteers_promo_coyote_monogram.png"
            alt="Humber River Rangers in action, volunteers cleaning up the riverbank and testing water quality."
            className="rounded-2xl w-full h-auto object-cover border border-[#D5CEC6]"
          />
        </div>

        {hasPosterGenerator && (
          <div className="w-full lg:w-[420px] lg:shrink-0">
            <HumberPosterPreview />
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-1.5">
        <div className="flex-1 bg-[#C3DED8] rounded-2xl p-8 md:p-10 flex flex-col gap-4">
          <p className="text-[11px] font-medium text-[#3D3D3D] tracking-[3px] m-0">
            CORE PURPOSE
          </p>
          <p className="text-base text-[#1A1A1A] leading-relaxed m-0">
            This project helps people get outside, build stronger local
            relationships, and contribute to environmental outcomes that can be
            measured over time.
          </p>
          <ul>
            <li className="text-sm text-[#3D3D3D] leading-relaxed m-0 list-disc">
              Regular river cleanups and stewardship events.
            </li>
            <li className="text-sm text-[#3D3D3D] leading-relaxed m-0 list-disc">
              Water quality testing and data sharing.
            </li>
            <li className="text-sm text-[#3D3D3D] leading-relaxed m-0 list-disc">
              AI-powered tools for cleanup coordination and ecological
              monitoring.
            </li>
          </ul>
          <p className="text-sm text-[#3D3D3D] leading-relaxed m-0">
            As we clean and test, we also talk about climate change and
            AI-powered tools that can support local stewardship in practical
            ways.
          </p>
        </div>

        <div className="w-full md:w-[420px] bg-[#F3EBE2] rounded-2xl p-8 md:p-10 flex flex-col gap-4 md:shrink-0">
          <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px] m-0">
            JOIN
          </p>
          <p className="text-sm text-[#3D3D3D] leading-relaxed m-0">
            Join a cleanup, invite a friend, and help build a stronger
            stewardship network across the city.
          </p>
          <p className="text-sm text-[#3D3D3D] m-0">
            Email:{" "}
            <a
              className="underline hover:no-underline"
              href="mailto:brandonflowers@gmail.com"
            >
              brandonflowers@gmail.com
            </a>
          </p>
          <Link
            href="/contact"
            className="inline-flex w-fit px-4 py-2 rounded-lg bg-[#1A1A1A] text-[#F3EBE2] no-underline text-sm font-medium hover:bg-[#333333] transition-colors"
          >
            Open Contact Page
          </Link>
        </div>
      </div>

      {hasMap && (
        <Participation
          network={network}
          monthOrder={monthOrder}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          participationRows={participationRows}
        />
      )}

      {hasMap && (
        <div className="bg-[#F3EBE2] rounded-2xl p-8 md:p-12 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px] m-0">
                PARTICIPATION NETWORK
              </p>
              <h2 className="text-3xl md:text-4xl font-normal text-[#1A1A1A] m-0">
                Monthly connection map
              </h2>
              <p className="text-sm text-[#3D3D3D] leading-relaxed m-0 max-w-3xl">
                Inspired by Eyeo-style conference cluster maps, this network
                highlights stronger recurring collaborations while keeping every
                contributor visible and recognized.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {monthOrder.map((month) => {
                const selected = selectedMonth === month;
                return (
                  <button
                    key={month}
                    type="button"
                    onClick={() => setSelectedMonth(month)}
                    className={`px-3 py-1.5 rounded-full text-xs tracking-[2px] uppercase transition-colors ${
                      selected
                        ? "bg-[#1A1A1A] text-[#F3EBE2]"
                        : "bg-[#EAE3DA] text-[#6B6B6B] hover:bg-[#EDE5DC]"
                    }`}
                  >
                    {formatMonth(month)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
            <div className="bg-[#C3DED8] rounded-2xl px-5 py-4">
              <p className="text-2xl text-[#1A1A1A] m-0">
                {network.activeParticipants}
              </p>
              <p className="text-[11px] text-[#3D3D3D] tracking-[2px] uppercase m-0">
                Active Participants
              </p>
            </div>
            <div className="bg-[#C4CFDE] rounded-2xl px-5 py-4">
              <p className="text-2xl text-[#1A1A1A] m-0">
                {network.newParticipants}
              </p>
              <p className="text-[11px] text-[#3D3D3D] tracking-[2px] uppercase m-0">
                New This Month
              </p>
            </div>
            <div className="bg-[#D5DCBA] rounded-2xl px-5 py-4">
              <p className="text-2xl text-[#1A1A1A] m-0">
                {network.returningParticipants}
              </p>
              <p className="text-[11px] text-[#3D3D3D] tracking-[2px] uppercase m-0">
                Returning
              </p>
            </div>
            <div className="bg-[#E8D5C4] rounded-2xl px-5 py-4">
              <p className="text-2xl text-[#1A1A1A] m-0">
                {network.totalConnectionStrength}
              </p>
              <p className="text-[11px] text-[#3D3D3D] tracking-[2px] uppercase m-0">
                Connection Strength
              </p>
            </div>
          </div>

          <div className="bg-[#EAE3DA] rounded-2xl p-4 md:p-6">
            <div className="relative w-full h-[360px] md:h-[420px] rounded-xl bg-[#F3EBE2] overflow-hidden border border-[#D5CEC6]">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {network.links.map((link) => {
                  const source = nodeMap.get(link.source);
                  const target = nodeMap.get(link.target);
                  if (!source || !target) return null;
                  const strokeWidth = Math.max(0.8, link.strength * 0.2);
                  const opacity = Math.min(0.85, 0.2 + link.strength * 0.06);
                  return (
                    <line
                      key={`${link.source}-${link.target}`}
                      x1={source.x}
                      y1={source.y}
                      x2={target.x}
                      y2={target.y}
                      stroke="#6B6B6B"
                      strokeWidth={strokeWidth}
                      strokeOpacity={opacity}
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </svg>

              {network.nodes.map((node) => {
                const size = Math.max(22, node.score * 3);
                return (
                  <div
                    key={node.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    title={`${participantLabel(node)}: contribution score ${
                      node.score
                    }`}
                  >
                    <div
                      className={`rounded-full border border-[#1A1A1A]/20 flex items-center justify-center text-[#1A1A1A] text-[10px] md:text-xs px-2 ${
                        node.new ? "bg-[#E8D5C4]" : "bg-[#C3DED8]"
                      }`}
                      style={{ minWidth: size, minHeight: size }}
                    >
                      {participantLabel(node)}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-[#6B6B6B] tracking-[1px] uppercase mt-3 mb-0">
              Stronger lines indicate repeated collaboration. All contributors
              remain visible each month.
            </p>
          </div>
        </div>
      )}

      {hasMap && (
        <div className="flex flex-col md:flex-row gap-1.5">
          <div className="flex-1 bg-[#F3EBE2] rounded-2xl p-8 md:p-10 flex flex-col gap-4">
            <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px] m-0">
              EVENTS AND LOGISTICS
            </p>
            <p className="text-sm text-[#3D3D3D] leading-relaxed m-0">
              The calendar and signup flow should make participation easy: clear
              meeting points, reminders, and event-by-event details.
            </p>
            <div className="flex flex-col gap-2">
              {events.map((event) => (
                <div
                  key={event.title}
                  className="bg-[#EAE3DA] rounded-xl px-4 py-3 flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-sm text-[#1A1A1A] m-0">{event.title}</p>
                    <p className="text-xs text-[#6B6B6B] m-0">{event.time}</p>
                  </div>
                  <span className="text-xs font-medium text-[#3D3D3D] tracking-[2px] uppercase">
                    {event.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-[420px] bg-[#C4CFDE] rounded-2xl p-8 md:p-10 flex flex-col gap-4 md:shrink-0">
            <p className="text-[11px] font-medium text-[#3D3D3D] tracking-[3px] m-0">
              ADVANCED TECHNOLOGY
            </p>
            <p className="text-sm text-[#3D3D3D] leading-relaxed m-0">
              Pair practical cleanup work with technology that improves
              coordination, visibility, and environmental data quality.
            </p>
            <ul className="m-0 pl-5 text-sm text-[#1A1A1A] leading-relaxed">
              {techThemes.map((theme) => (
                <li key={theme}>{theme}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {hasMap && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1.5">
          <div className="bg-[#D5DCBA] rounded-2xl p-8 md:p-10 flex flex-col gap-4">
            <p className="text-[11px] font-medium text-[#3D3D3D] tracking-[3px] m-0">
              SUPPORT THE MISSION
            </p>
            <p className="text-sm text-[#3D3D3D] leading-relaxed m-0">
              Support is merch-first. Proceeds fund cleanup supplies, test kits,
              and event operations.
            </p>
            <p className="text-sm text-[#1A1A1A] m-0">
              T-shirts · Hoodies · Hats
            </p>
            <p className="text-xs text-[#6B6B6B] m-0">
              Optional direct donation can remain available as a secondary path.
            </p>
          </div>

          <div className="bg-[#F3EBE2] rounded-2xl p-8 md:p-10 flex flex-col gap-4">
            <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px] m-0">
              CONTENT CREATORS
            </p>
            <p className="text-sm text-[#3D3D3D] leading-relaxed m-0">
              Feature environmental creators using the cross-country player for
              YouTube and TikTok streams between field events.
            </p>
            <ul className="m-0 pl-5 text-sm text-[#1A1A1A] leading-relaxed">
              {creators.map((creator) => (
                <li key={creator}>{creator}</li>
              ))}
            </ul>
          </div>

          <div className="bg-[#E8D5C4] rounded-2xl p-8 md:p-10 flex flex-col gap-4">
            <p className="text-[11px] font-medium text-[#3D3D3D] tracking-[3px] m-0">
              THE TITANS
            </p>
            <p className="text-sm text-[#3D3D3D] leading-relaxed m-0">
              Keep conservation values visible by grounding the movement in
              trusted voices and long-term ecological thinking.
            </p>
            <ul className="m-0 pl-5 text-sm text-[#1A1A1A] leading-relaxed">
              {titans.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {hasMap && (
        <div className="flex flex-col md:flex-row gap-1.5">
          <div className="flex-1 bg-[#F3EBE2] rounded-2xl p-8 md:p-10 flex flex-col gap-4">
            <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px] m-0">
              CITY CONNECTIONS
            </p>
            <p className="text-sm text-[#3D3D3D] leading-relaxed m-0">
              Local cleanup work should connect to a broader watershed story and
              show how neighborhood efforts feed regional outcomes.
            </p>
            <ul className="m-0 pl-5 text-sm text-[#1A1A1A] leading-relaxed">
              {cityConnections.map((connection) => (
                <li key={connection}>{connection}</li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-[420px] bg-[#1A1A1A] rounded-2xl p-8 md:p-10 flex flex-col gap-4 md:shrink-0">
            <p className="text-[11px] font-medium text-[#AAAAAA] tracking-[3px] m-0">
              THE WORLD
            </p>
            <p className="text-sm text-[#F5F4F2] leading-relaxed m-0">
              Extend Humber River Rangers into a global network by sharing
              practices and participation models with other stewardship groups.
            </p>
            <ul className="m-0 pl-5 text-sm text-[#F5F4F2] leading-relaxed">
              {worldConnections.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </PageShell>
  );
};

export default Rangers;
