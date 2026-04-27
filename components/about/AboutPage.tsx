"use client";

import Image from "next/image";
import PageShell from "@/components/layout/PageShell";

const skills = [
  "React · React Native · Next.js",
  "Python · Flask · PostgreSQL",
  "TypeScript · Redux · Node.js",
  "D3.js · Mapbox · Three.js",
  "System Design · CI/CD",
];

const passions = [
  "Data Visualization",
  "AI & Machine Learning",
  "Rapid Prototyping",
  "RSS & Trend Tracking",
  "D&D-style Adventures",
];

const AboutPage = () => {
  return (
    <PageShell>
      {/* Hero: Photo + Intro */}
      <div className="flex flex-col md:flex-row gap-1.5">
        {/* Photo Card */}
        <div className="w-full md:w-[400px] bg-[#F3EBE2] rounded-2xl p-8 flex flex-col items-center gap-4 md:shrink-0">
          <Image
            src="/brandon_square.png"
            alt="Brandon Flowers"
            width={200}
            height={200}
            className="rounded-full object-cover"
          />
          <h2 className="text-2xl text-[#1A1A1A] m-0">Brandon Flowers</h2>
          <p className="text-sm text-[#6B6B6B] m-0">Full-stack Engineer, Naturalist</p>
          <p className="text-sm text-[#6B6B6B] m-0">Toronto, Canada</p>
        </div>

        {/* Intro Card */}
        <div className="flex-1 bg-[#F3EBE2] rounded-2xl p-8 md:p-12 flex flex-col justify-center gap-6">
          <p className="text-xs font-medium text-[#6B6B6B] tracking-[3px] m-0">
            ABOUT
          </p>
          <h1 className="text-4xl md:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-tight m-0">
            Creative full-stack hybrid
            <br />
            living in Toronto.
          </h1>
          <p className="text-lg text-[#3D3D3D] leading-relaxed m-0 max-w-xl">
            I love solving complex customer journeys, building automation,
            scheduling reports, and crafting UI rich with metrics, charts, and
            insights.
          </p>
        </div>
      </div>

      {/* Career + Education Row */}
      <div className="flex flex-col md:flex-row gap-1.5">
        <div className="flex-1 bg-[#C3DED8] rounded-2xl p-8 md:p-10 flex flex-col gap-5">
          <p className="text-[11px] font-medium text-[#3D3D3D] tracking-[3px] m-0">
            CURRENT ROLE
          </p>
          <h3 className="text-2xl md:text-3xl text-[#1A1A1A] leading-snug m-0">
            Lead Full-stack Engineer
            <br />
            at AXL Venture Studio
          </h3>
          <p className="text-sm text-[#3D3D3D] leading-relaxed m-0">
            As a new founder, I&apos;m excited to launch the next generation of
            human-centric AI-powered companies and participate in their on-going
            success.
          </p>
        </div>
        <div className="w-full md:w-[400px] bg-[#F3EBE2] rounded-2xl p-8 md:p-10 flex flex-col gap-6 md:shrink-0">
          <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px] m-0">
            EDUCATION
          </p>

          <div className="flex flex-col gap-1">
            <h3 className="text-xl text-[#1A1A1A] m-0">BA Honours English</h3>
            <p className="text-sm text-[#6B6B6B] m-0">
              University of Waterloo · 1996–1999
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-xl text-[#1A1A1A] m-0">
              Post Grad New Media Design
            </h3>
            <p className="text-sm text-[#6B6B6B] m-0">
              Centennial College · 2000
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-xl text-[#1A1A1A] m-0">
              Comp Sci &amp; AI
            </h3>
            <p className="text-sm text-[#6B6B6B] m-0">
              School of Life · 2001–present
            </p>
          </div>

          <p className="text-xs text-[#6B6B6B] leading-relaxed m-0 pt-2 border-t border-[#D0D0D0]">
            &ldquo;The hottest new programming language is English.&rdquo;{" "}
            —{" "}
            <a
              href="https://x.com/rauchg/status/1901357103731847605"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A1A1A] underline hover:no-underline"
            >
              @rauchg
            </a>
          </p>
        </div>
      </div>

      {/* Skills + Passions Row */}
      <div className="flex flex-col md:flex-row gap-1.5">
        <div className="flex-1 bg-[#F3EBE2] rounded-2xl p-10 flex flex-col gap-4">
          <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[3px] m-0">
            SKILLS & TOOLS
          </p>
          {skills.map((s) => (
            <span key={s} className="text-lg text-[#1A1A1A]">
              {s}
            </span>
          ))}
        </div>
        <div className="flex-1 bg-[#D5DCBA] rounded-2xl p-10 flex flex-col gap-4">
          <p className="text-[11px] font-medium text-[#3D3D3D] tracking-[3px] m-0">
            PASSIONS
          </p>
          {passions.map((p) => (
            <span key={p} className="text-lg text-[#1A1A1A]">
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Porthole Card */}
      <div className="bg-[#C4CFDE] rounded-2xl px-8 md:px-12 py-8 md:py-10 flex flex-col gap-5">
        <p className="text-[11px] font-medium text-[#3D3D3D] tracking-[3px] m-0">
          SIDE PROJECT
        </p>
        <h3 className="text-2xl text-[#1A1A1A] m-0">Porthole</h3>
        <p className="text-lg text-[#3D3D3D] leading-relaxed m-0">
          Ever since the death of Google Reader, I&apos;ve been tracking trends
          across over 50 feeds covering design, technology, architecture, gaming
          and sports in a personal project called Porthole.
        </p>
      </div>

      {/* Social Links Row */}
      <div className="flex flex-col sm:flex-row gap-1.5">
        <a
          href="https://github.com/headwinds"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#F3EBE2] rounded-2xl px-8 py-6 flex items-center gap-3 no-underline hover:opacity-80 transition-opacity"
        >
          <svg className="w-6 h-6 text-[#1A1A1A]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="text-lg text-[#1A1A1A]">GitHub</span>
        </a>
        <a
          href="https://linkedin.com/in/brandonflowers"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#F3EBE2] rounded-2xl px-8 py-6 flex items-center gap-3 no-underline hover:opacity-80 transition-opacity"
        >
          <svg className="w-6 h-6 text-[#1A1A1A]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          <span className="text-lg text-[#1A1A1A]">LinkedIn</span>
        </a>
        <a
          href="https://twitter.com/headwinds"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#F3EBE2] rounded-2xl px-8 py-6 flex items-center gap-3 no-underline hover:opacity-80 transition-opacity"
        >
          <svg className="w-6 h-6 text-[#1A1A1A]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="text-lg text-[#1A1A1A]">X / Twitter</span>
        </a>
      </div>
    </PageShell>
  );
};

export default AboutPage;
