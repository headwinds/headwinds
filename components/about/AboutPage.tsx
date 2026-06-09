"use client";

import Image from "next/image";
import PageShell from "@/components/layout/PageShell";

const skills = [
  "React · React Native · Next.js · Node",
  "LLMs · Python · Flask/Fast API · PostgreSQL · RAG",
  "Automation Testing · System Design · CI/CD",
  "Strategic Thinking · Creative Writing · Graphic Design",
];

const passions = [
  "Data Visualization",
  "AI & Machine Learning",
  "Rapid Prototyping",
  "RSS & Trend Tracking",
  "RPG Adventures",
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
          <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
            <div className="flex flex-col gap-6">
              <p className="text-xs font-medium text-[#6B6B6B] tracking-[3px] m-0">
                ABOUT
              </p>
              <h1 className="text-4xl md:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-tight m-0">
                Creative full-stack hybrid
                <br />
                living in Toronto.
              </h1>
              <p className="text-lg text-[#3D3D3D] leading-relaxed m-0 max-w-xl">
                I 💛 solving complex customer journeys, building automation,
                scheduling reports, and crafting UI rich with metrics, charts, and
                insights.
              </p>
            </div>
            <Image
              src="/ai/scout-master-in-training.jpg"
              alt="Scout master in training"
              width={300}
              height={300}
              className="rounded-xl object-cover self-start"
            />
          </div>
        </div>
      </div>

      {/* Career + Education Row */}
      <div className="flex flex-col md:flex-row gap-1.5">
        <div className="flex-1 bg-[#C3DED8] rounded-2xl p-8 md:p-10 flex flex-col gap-5">
          <p className="text-[11px] font-medium text-[#3D3D3D] tracking-[3px] m-0">
            LAST ROLE
          </p>
          <h3 className="text-2xl md:text-3xl text-[#1A1A1A] leading-snug m-0">
            Lead Full-stack Engineer
            <br />
            at AXL Labs
          </h3>
          <p className="text-sm text-[#3D3D3D] leading-relaxed m-0">
            As a new founder, I was excited to launch the next generation of
            human-centric AI-powered companies. They have an ambitious plan to launch 50 in 5 years and are well on track to realize this vision.
          </p>
          <p className="text-sm text-[#3D3D3D] leading-relaxed m-0">At AXL, they pitch that "anyone is a founder" and I believe in that philosophy deeply. When I join a company I pour myself into to work and collaborate with the team to build solutions that will drive success.</p>
          <p className="text-sm text-[#3D3D3D] leading-relaxed m-0">I was able to contribute to several key projects that significantly impacted the company's growth, most notably a multi-tenant platform that monitors application for performance, errors, and AI usage. It leveraged a RAG backend that I wrote in Python using the vector storage capabilities of Postgres for efficient data retrieval and analysis. In order to ensure RAG was accurate and reliable, I implemented rigorous testing and validation processes to review and annotate the data.  Along with RAG, I used a reasoning LLM to perform a 5 step evaluation loop to arrive at the best possible answer. </p>
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
              href="https://x.com/karpathy/status/1617979122625712128"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1A1A1A] underline hover:no-underline"
            >
              @karpathy
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
        <p className="text-lg text-[#3D3D3D] leading-relaxed m-0">This is <a href="https://x.com/headwinds/status/2063963767835144429" target="_blank" rel="noopener noreferrer"><span className="underline">the latest announcement</span></a> shipping v0.9.44</p>
      </div>

      
    </PageShell>
  );
};

export default AboutPage;
