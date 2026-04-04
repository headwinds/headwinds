"use client";

import Link from "next/link";
import { journalEntries } from "@/components/journal/journal-data";
import PageShell from "@/components/layout/PageShell";

const stats = [
  { value: "14", label: "PROJECTS" },
  { value: "10+", label: "YEARS EXPERIENCE" },
  { value: "6", label: "BRANDS" },
  { value: "3", label: "APPS SHIPPED" },
];

const interests = [
  "React & React Native",
  "D&D-Style Adventures",
  "Data Visualization",
  "AI & Machine Learning",
  "Art & Design",
];

const featuredProjects = [
  {
    name: "BMW Configurator",
    desc: "3D car configuration experience",
    tech: "REACT · THREE.JS",
    color: "bg-[#C3DED8]",
    route: "/projects",
  },
  {
    name: "Scout Platform",
    desc: "AI-powered D&D adventure game",
    tech: "PYTHON · REACT NATIVE",
    color: "bg-[#C4CFDE]",
    route: "/projects",
  },
  {
    name: "Ada Support",
    desc: "Predictive customer suggestions",
    tech: "REACT · ML",
    color: "bg-[#D5DCBA]",
    route: "/projects",
  },
];

const artFrames = [
  { colSpan: "col-span-2", h: "h-48", color: "bg-[#C3DED8]" },
  { colSpan: "col-span-1", h: "h-48", color: "bg-[#C4CFDE]" },
  { colSpan: "col-span-1", h: "h-40", color: "bg-[#D5DCBA]" },
  { colSpan: "col-span-1", h: "h-40", color: "bg-[#C3DED8]" },
  { colSpan: "col-span-1", h: "h-40", color: "bg-[#C4CFDE]" },
  { colSpan: "col-span-2", h: "h-36", color: "bg-[#D5DCBA]" },
  { colSpan: "col-span-1", h: "h-36", color: "bg-[#F3EBE2] border-2 border-[#C5BEB6]" },
];

const statColors = [
  "bg-[#F3EBE2]",
  "bg-[#C3DED8]",
  "bg-[#C4CFDE]",
  "bg-[#D5DCBA]",
];

const LandingPage = () => {
  const latestEntry = journalEntries[0];

  return (
    <PageShell>
      {/* Hero Section */}
      <div className="flex gap-1.5 min-h-[480px]">
        {/* Left - Greeting */}
        <div className="flex-1 bg-[#F3EBE2] rounded-2xl p-12 md:p-16 flex flex-col justify-center gap-8">
          <p className="text-xs font-medium text-[#6B6B6B] tracking-[2px]">
            HI, I&apos;M BRANDON
          </p>
          <h1 className="text-5xl md:text-7xl font-normal text-[#1A1A1A] tracking-tight leading-none">
            I build things
            <br />
            for the web.
          </h1>
          <p className="text-lg text-[#3D3D3D] leading-relaxed max-w-md">
            A creative developer who loves crafting beautiful digital
            experiences, exploring art, and turning ideas into interactive
            stories.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center w-fit px-8 py-3.5 bg-[#1A1A1A] text-[#F3EBE2] rounded-lg text-sm font-bold hover:bg-[#333] transition-colors"
          >
            View Projects
          </Link>
        </div>

        {/* Right - Art Frame Cluster */}
        <div className="hidden md:flex w-[420px] lg:w-[560px] bg-[#F3EBE2] rounded-2xl p-4 flex-col gap-1.5">
          <div className="grid grid-cols-3 gap-1.5 flex-1">
            {artFrames.map((frame, i) => (
              <div
                key={i}
                className={`${frame.colSpan} ${frame.h} ${frame.color} rounded-xl`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex gap-1.5">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex-1 ${statColors[i]} rounded-2xl py-8 px-6 flex flex-col items-center justify-center gap-2`}
          >
            <span className="text-5xl font-bold text-[#1A1A1A]">
              {stat.value}
            </span>
            <span className="text-xs font-medium text-[#6B6B6B] tracking-[2px] text-center">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* AI Greeting + Interests Row */}
      <div className="flex gap-1.5">
        {/* AI Greeting Card */}
        <div className="flex-1 bg-[#1A1A1A] rounded-2xl p-10 flex flex-col gap-6">
          <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px]">
            AI ASSISTANT
          </p>
          <p className="text-lg text-[#F5F4F2] leading-relaxed">
            Hey! I&apos;m Brandon&apos;s AI assistant. Ask me anything about his
            work, skills, or interests. I know about his 14 projects across
            React, Python, and React Native.
          </p>
          <div className="flex items-center justify-between bg-[#2A2A2A] rounded-lg px-4 py-3.5">
            <span className="text-sm text-[#5A5A5A]">
              Ask me something...
            </span>
            <svg
              className="w-4.5 h-4.5 text-[#C9A962]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </div>
        </div>

        {/* Interests Card */}
        <div className="w-[420px] bg-[#F3EBE2] rounded-2xl p-10 flex flex-col gap-5">
          <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px]">
            THINGS I LOVE
          </p>
          <div className="flex flex-col gap-3">
            {interests.map((interest) => (
              <span
                key={interest}
                className="text-xl text-[#1A1A1A]"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      <div className="bg-[#F3EBE2] rounded-2xl p-12 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-normal text-[#1A1A1A]">
            Featured Projects
          </h2>
          <Link
            href="/projects"
            className="text-sm font-medium text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredProjects.map((project) => (
            <Link
              key={project.name}
              href={project.route}
              className="group flex flex-col gap-4 rounded-xl p-6 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: project.color.includes("#C3") ? "#C3DED8" : project.color.includes("#C4") ? "#C4CFDE" : "#D5DCBA" }}
            >
              <div className="w-full h-40 bg-[#C5BEB6] rounded-lg" />
              <h3 className="text-xl text-[#1A1A1A]">{project.name}</h3>
              <p className="text-sm text-[#3D3D3D] leading-relaxed">
                {project.desc}
              </p>
              <span className="text-[11px] font-medium text-[#6B6B6B] tracking-[2px]">
                {project.tech}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Journal + Wishlist Teaser Row */}
      <div className="flex gap-1.5">
        {/* Journal Teaser */}
        <div className="flex-1 bg-[#F3EBE2] rounded-2xl p-10 flex flex-col gap-5">
          <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px]">
            LATEST FROM THE JOURNAL
          </p>
          <h3 className="text-2xl md:text-3xl text-[#1A1A1A]">
            {latestEntry?.title ?? "Coming soon"}
          </h3>
          <p className="text-sm text-[#3D3D3D] leading-relaxed">
            {latestEntry?.summary ?? ""}
          </p>
          <Link
            href={latestEntry ? `/journal/${latestEntry.slug}` : "/journal"}
            className="text-sm font-medium text-[#1A1A1A] hover:underline"
          >
            Read More →
          </Link>
        </div>

        {/* Wishlist Teaser */}
        <div className="flex-1 bg-[#D5DCBA] rounded-2xl p-10 flex flex-col gap-5">
          <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px]">
            FROM THE WISHLIST
          </p>
          <h3 className="text-2xl md:text-3xl text-[#1A1A1A]">
            165 Items · 66 Categories
          </h3>
          <p className="text-sm text-[#3D3D3D] leading-relaxed">
            A curated collection of tools, gear, and inspiration across design,
            tech, outdoors, and everyday life.
          </p>
          <Link
            href="/wishlist"
            className="text-sm font-medium text-[#1A1A1A] hover:underline"
          >
            Browse All →
          </Link>
        </div>
      </div>
    </PageShell>
  );
};

export default LandingPage;
