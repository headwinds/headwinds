"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { journalEntries } from "@/components/journal/journal-data";
import PageShell from "@/components/layout/PageShell";
import BrandTrophyGrid from "@/components/landing/BrandTrophyGrid";
import LandingChatWidget from "@/components/landing/LandingChatWidget";
//import ScrambleText from "@/components/scramble-text";

const stats = [
  { value: "12+", label: "PROJECTS" },
  { value: "10+", label: "YEARS EXPERIENCE" },
  { value: "12+", label: "BRANDS" },
  { value: "25+", label: "APPS SHIPPED" },
];

const interests = [
  "React & Python",
  "Data Visualization & Brand Design",
  "AI & Machine Learning",
  "Environmental Conservation",
  "Fantasy, Sci-fi, Sci-fan",
];

const featuredProjects = [
  {
    name: "BMW Configurator",
    desc: "3D car configuration experience",
    tech: "REACT · THREE.JS",
    color: "#C3DED8",
    route: "/projects/bmw",
    img: "/projects/bmw.jpg",
  },
  {
    name: "247 Voices",
    desc: "Voice of the customer analytics platform",
    tech: "REACT · D3 · NODE",
    color: "#C4CFDE",
    route: "/projects/247",
    img: "/projects/247-cluster.png",
  },
  {
    name: "Shoppers Drug Mart",
    desc: "Full eCommerce UX and Downstream/Upstream Data Management",
    tech: "REACT · GOLANG · GCP",
    color: "#e9e6b7",
    route: "/projects/shoppers-drug-mart",
    img: "/projects/shoppers-drug-mart.png",
  },
];

const artFrames = [
  {
    colSpan: "col-span-2", h: "h-48", img: "/ai/collab.png", alt: "Collaboration", bg: "bg-[#C3DED8]",
    title: "AI Collaboration",
    desc: "Two developers brainstorming with an AI coding assistant — exploring how pair programming evolves with generative tools.",
    tech: "Midjourney",
    video: "/ai/brandon-sasha-video.mp4",
  },
  {
    colSpan: "col-span-1", h: "h-48", img: "/ai/dunks.png", alt: "Dungeon Dunks", bg: "bg-[#C4CFDE]",
    title: "Dungeon Dunks",
    desc: "D&D-themed sneaker concept — medieval armor meets Nike Dunks, rendered with photorealistic AI.",
    tech: "Midjourney",
  },
  {
    colSpan: "col-span-1", h: "h-40", img: "/ai/vayla.png", alt: "Vayla", bg: "bg-[#D5DCBA]",
    title: "Vayla",
    desc: "A 3D-rendered character for the Scout adventure game — young mage in a gothic cathedral.",
    tech: "Midjourney · Blender",
  },
  {
    colSpan: "col-span-1", h: "h-40", img: "/ai/yetiFour.png", alt: "PhotoDare", bg: "bg-[#C3DED8]",
    title: "PhotoDare",
    desc: "Co-founded PhotoDare with Nick and David, contributing the full-stack React Native and NestJS architecture. A photo sharing app that celebrates real, unfiltered moments — no likes, no filters, no pressure.",
    tech: "React Native · NestJS",
    modalImg: "/ai/Yeti-Hand-PD-10.gif",
    link: "https://www.photodare.ca/",
  },
  {
    colSpan: "col-span-1", h: "h-40", img: "/ai/hoth-leia.jpg", alt: "Hoth Leia", bg: "bg-[#C4CFDE]",
    title: "Hoth Leia Reimagined",
    desc: "Using AI to re-envision iconic characters — starting from a classic Hoth Leia reference and generating a reimagined version with new features and styling.",
    tech: "Midjourney",
    modalImg: "/ai/hoth-leia-ginger.png",
    modalAspect: "aspect-[3/4]",
    modalWidth: "max-w-xs",
  },
  {
    colSpan: "col-span-2", h: "h-36", img: "/ai/fake_ai_kitchen_products.png", alt: "AI Products", bg: "bg-[#D5DCBA]",
    title: "AI Product Design",
    desc: "Speculative product concepts — AI-generated smart kitchen devices exploring industrial design language.",
    tech: "Midjourney",
  },
  {
    colSpan: "col-span-1", h: "h-36", img: "/ai/tamogotchi.png", alt: "Tamogotchi", bg: "bg-[#C4CFDE]",
    title: "Kawaii Pet",
    desc: "A Tamagotchi-inspired virtual pet device — exploring nostalgic hardware with modern kawaii aesthetics.",
    tech: "Midjourney",
  },
];

const statColors = [
  "bg-[#F3EBE2]",
  "bg-[#C3DED8]",
  "bg-[#C4CFDE]",
  "bg-[#D5DCBA]",
];

const LandingPage = () => {
  const latestEntry = journalEntries[0];
  const [selectedFrame, setSelectedFrame] = useState<number | null>(null);

  const closeModal = useCallback(() => setSelectedFrame(null), []);

  useEffect(() => {
    if (selectedFrame === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedFrame, closeModal]);

  const activeFrame = selectedFrame !== null ? artFrames[selectedFrame] : null;

  return (
    <PageShell>
      {/* Experiment Modal */}
      {activeFrame && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]" />
          <div
            className={`relative bg-[#F3EBE2] rounded-2xl w-full shadow-2xl animate-[scaleIn_250ms_ease-out] p-2 ${activeFrame.modalWidth ?? "max-w-lg"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`relative w-full ${activeFrame.modalAspect ?? "aspect-[16/10]"} rounded-lg overflow-hidden`}>
              {activeFrame.video ? (
                <video
                  src={activeFrame.video}
                  controls
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={activeFrame.modalImg ?? activeFrame.img}
                  alt={activeFrame.alt}
                  fill
                  className="object-cover"
                  sizes="512px"
                />
              )}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors z-10"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M1 1l12 12M13 1L1 13" />
                </svg>
              </button>
            </div>
            <div className="p-6 flex flex-col gap-3">
              <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px]">
                {activeFrame.tech.toUpperCase()}
              </p>
              <h3 className="text-2xl font-normal text-[#1A1A1A]">
                {activeFrame.title}
              </h3>
              <p className="text-sm text-[#3D3D3D] leading-relaxed">
                {activeFrame.desc}
              </p>
              {activeFrame.link && (
                <a
                  href={activeFrame.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-fit px-6 py-2.5 bg-[#1A1A1A] text-[#F3EBE2] rounded-lg text-sm font-bold hover:bg-[#333] transition-colors mt-1"
                >
                  Visit {activeFrame.title} →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-1.5 md:min-h-[480px]">
        {/* Left - Greeting */}
        <div className="flex-1 bg-[#F3EBE2] rounded-2xl p-8 md:p-16 flex flex-col justify-center gap-6 md:gap-8">
          <p className="text-xs font-medium text-[#6B6B6B] tracking-[2px]">
            HI, I&apos;M BRANDON
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-normal text-[#1A1A1A] tracking-tight leading-none">
            Greenfield Director & Builder with AI super powers.
          </h1>
          <p className="text-lg text-[#3D3D3D] leading-relaxed max-w-md">
            A fullstack developer who crafts rich interfaces powered by distributed system design, turning loose business ideas into tight data-driven experiences that monitor and optimize performance.
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
                className={`${frame.colSpan} ${frame.h} ${frame.bg} rounded-lg p-2 group cursor-pointer`}
                onClick={() => setSelectedFrame(i)}
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src={frame.img}
                    alt={frame.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes={frame.colSpan === "col-span-2" ? "360px" : "180px"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <p className="text-[10px] font-medium text-white/60 tracking-[2px] mb-0.5">
                      {frame.tech}
                    </p>
                    <h4 className="text-sm font-semibold text-white leading-tight">
                      {frame.title}
                    </h4>
                    <p className="text-[10px] text-white/80 leading-snug mt-1 line-clamp-2">
                      {frame.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`${statColors[i]} rounded-2xl py-8 px-6 flex flex-col items-center justify-center gap-2`}
          >
            <span className="text-4xl md:text-5xl font-bold text-[#1A1A1A]">
              {stat.value}
            </span>
            <span className="text-[10px] md:text-xs font-medium text-[#6B6B6B] tracking-[2px] text-center">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* AI Greeting + Interests Row */}
      <div className="flex flex-col md:flex-row gap-1.5">
        {/* AI Chat Widget */}
        <LandingChatWidget />

        {/* Interests Card */}
        <div className="w-full md:w-[420px] bg-[#F3EBE2] rounded-2xl p-8 md:p-10 flex flex-col gap-5">
          <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px]">
            THINGS I 💛
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
      <div className="bg-[#F3EBE2] rounded-2xl p-8 md:p-12 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-4xl font-normal text-[#1A1A1A]">
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
              style={{ backgroundColor: project.color }}
            >
              <div className="relative w-full h-40 rounded-lg overflow-hidden">
                <Image
                  src={project.img}
                  alt={project.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
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

      {/* Brand Trophies */}
      <BrandTrophyGrid />

      {/* Journal + Wishlist Teaser Row */}
      <div className="flex flex-col md:flex-row gap-1.5">
        {/* Journal Teaser */}
        <div className="flex-1 bg-[#F3EBE2] rounded-2xl p-8 md:p-10 flex flex-col gap-5">
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
        <div className="flex-1 bg-[#D5DCBA] rounded-2xl p-8 md:p-10 flex flex-col gap-5">
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
