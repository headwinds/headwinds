"use client";

import Link from "next/link";
import PageShell from "@/components/layout/PageShell";

const SpiritWhalePage = () => {
  return (
    <PageShell>
      <div className="px-2">
        <Link
          href="/projects"
          className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors no-underline"
        >
          ← Back to Projects
        </Link>
      </div>

      <section className="bg-[#F3EBE2] rounded-2xl p-10 md:p-14 flex flex-col gap-6">
        <p className="text-xs font-medium text-[#6B6B6B] tracking-[3px] uppercase">
          Spirit Whale · Coming Soon
        </p>

        <h1 className="text-4xl md:text-6xl font-normal text-[#1A1A1A] tracking-tight leading-[0.95]">
          Spirit Whale
        </h1>

        <p className="text-lg text-[#3D3D3D] max-w-3xl leading-relaxed">
          This project is currently in research and strategy mode.
          I am studying how brands can contribute to protecting our oceans,
          and how to turn that contribution into meaningful, transparent experiences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="bg-[#E6DED4] rounded-xl p-5">
            <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[2px] uppercase mb-2">
              Research Focus
            </p>
            <p className="text-sm text-[#2E2E2E] leading-relaxed">
              Brand commitments, ocean restoration initiatives, and measurable conservation outcomes.
            </p>
          </div>

          <div className="bg-[#E6DED4] rounded-xl p-5">
            <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[2px] uppercase mb-2">
              Product Direction
            </p>
            <p className="text-sm text-[#2E2E2E] leading-relaxed">
              Data-rich storytelling, campaign transparency, and tools that connect people to real impact.
            </p>
          </div>

          <div className="bg-[#E6DED4] rounded-xl p-5">
            <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[2px] uppercase mb-2">
              Next Milestone
            </p>
            <p className="text-sm text-[#2E2E2E] leading-relaxed">
              Publishing early concepts and a framework for evaluating brand ocean-protection contributions.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default SpiritWhalePage;
