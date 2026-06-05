"use client";

import { useState } from "react";
import Link from "next/link";
import identity from "@/components/projects/project-data";
import PageShell from "@/components/layout/PageShell";
import { useFilterMetrics } from "@/hooks/useFilterMetrics";

import imgWind from "@/components/projects/wind/manufacturers.png";
import img247 from "@/components/projects/247/cluster.png";
import imgAda from "@/components/projects/ada/predictiveSuggestions.png";
import imgTotalDrama from "@/components/projects/totaldrama/totaldrama.png";
import imgLancer from "@/components/projects/mitsubishi/lancer.jpg";
import imgBmw from "@/components/projects/bmw/bmw.jpg";
import imgBacardi from "@/components/projects/bacardi/bacardi.png";
import imgNintendo from "@/components/projects/nintendo/wiifit.jpg";
import imgLabatt from "@/components/projects/labatt/wolfpack1.png";
import imgToda from "@/components/projects/toda/toda.jpg";
import imgBio from "@/components/projects/bio/bio.jpg";
import imgTrioova from "@/components/projects/trioova/trioova.jpg";
import imgCamh from "@/components/projects/camh/camh.jpg";
import imgMicrosoft from "@/components/projects/microsoft/microsoft.jpg";

const projectImages: Record<string, any> = {
  "/budding-data-scientist": imgWind,
  "/toda": imgToda,
  "/bio": imgBio,
  "/trioova": imgTrioova,
  "/camh": imgCamh,
  "/247": img247,
  "/ada": imgAda,
  "/totaldrama": imgTotalDrama,
  "/mitsubishi": imgLancer,
  "/microsoft": imgMicrosoft,
  "/bmw": imgBmw,
  "/bacardi": imgBacardi,
  "/nintendo": imgNintendo,
  "/labatt": imgLabatt,
};

const cardColors = [
  "bg-[#F3EBE2]",
  "bg-[#C4CFDE]",
  "bg-[#D5DCBA]",
  "bg-[#C3DED8]",
];

const thumbColors = [
  "bg-[#C3DED8]",
  "bg-[#C5BEB6]",
  "bg-[#C5BEB6]",
  "bg-[#C5BEB6]",
  "bg-[#C4CFDE]",
  "bg-[#C5BEB6]",
];

// Map project verticals to display categories
const verticalToCategory: Record<string, string> = {
  Entertainment: "Entertainment",
  Health: "Health",
  Financial: "Finance",
  Automotive: "Automotive",
  Lifestyle: "Food & Beverage",
  Energy: "Energy",
};

const filterCategories = [
  "All",
  "Entertainment",
  "Health",
  "Finance",
  "Automotive",
  "Food & Beverage",
  "Energy",
];

function getProjectCategory(vertical: string): string | undefined {
  return verticalToCategory[vertical];
}

const ProjectsGrid = () => {
  const projects = identity.projects;
  const [selected, setSelected] = useState("All");
  const { track } = useFilterMetrics("projects");

  const handleFilter = (category: string) => {
    setSelected(category);
    track(category);
  };

  const filtered =
    selected === "All"
      ? projects
      : projects.filter(
          (p: any) => getProjectCategory(p.vertical) === selected
        );

  return (
    <PageShell>
      {/* Page Header */}
      <div className="bg-[#F3EBE2] rounded-2xl p-8 md:p-12 flex flex-col gap-4">
        <p className="text-xs font-medium text-[#6B6B6B] tracking-[3px]">
          PROJECTS
        </p>
        <h1 className="text-4xl md:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-tight">
          Work across brands, startups,
          <br />
          and personal experiments.
        </h1>
        <p className="text-lg text-[#3D3D3D] leading-relaxed">
          {projects.length} projects spanning interactive 3D, data
          visualization, AI platforms, mobile apps, and more.
        </p>
      </div>

      {/* Category Filter */}
      <div className="bg-[#F3EBE2] rounded-2xl px-8 py-4 flex flex-wrap gap-2 items-center">
        {filterCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`h-8 px-4 rounded-full text-[13px] border-0 cursor-pointer transition-colors ${
              selected === cat
                ? "bg-[#1A1A1A] text-white font-medium"
                : "bg-white text-[#3D3D3D]"
            }`}
            style={
              selected !== cat ? { border: "1px solid #D0D0D0" } : undefined
            }
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto text-sm text-[#6B6B6B]">
          {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        </span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
        {filtered.map((project: any, idx: number) => {
          const colorIdx = idx % cardColors.length;
          const thumbIdx = idx % thumbColors.length;
          const slug = project.route.replace(/^\//, "");
          return (
            <Link
              key={project.id}
              href={`/projects/${slug}`}
              className={`${cardColors[colorIdx]} rounded-2xl p-6 flex flex-col gap-4 no-underline hover:opacity-90 transition-opacity`}
            >
              {projectImages[project.route] ? (
                <div className="w-full h-44 rounded-xl overflow-hidden">
                  <img
                    src={projectImages[project.route].src}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div
                  className={`w-full h-44 ${thumbColors[thumbIdx]} rounded-xl flex items-center justify-center`}
                >
                  <span className="text-2xl font-medium text-[#1A1A1A]/20">
                    {project.client}
                  </span>
                </div>
              )}
              <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[2px] uppercase">
                {project.client}
              </p>
              <h3 className="text-xl text-[#1A1A1A]">{project.name}</h3>
              <p className="text-sm text-[#3D3D3D] leading-relaxed line-clamp-3">
                {project.description}
              </p>
              {project.tech && (
                <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[2px] uppercase">
                  {project.tech}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </PageShell>
  );
};

export default ProjectsGrid;
