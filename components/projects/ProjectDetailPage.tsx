"use client";

import Link from "next/link";
import identity from "@/components/projects/project-data";
import projectDetails from "@/components/projects/project-detail-data";
import PageShell from "@/components/layout/PageShell";

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
  "/validere": imgWind,
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

interface ProjectDetailPageProps {
  slug: string;
}

const ProjectDetailPage = ({ slug }: ProjectDetailPageProps) => {
  const route = `/${slug}`;
  const project = identity.projects.find((p: any) => p.route === route);

  if (!project) {
    return (
      <PageShell>
        <div className="bg-[#F3EBE2] rounded-2xl p-6 md:p-12 text-center">
          <h1 className="text-xl md:text-2xl font-normal text-[#1A1A1A] mb-4">
            Project not found
          </h1>
          <p className="text-sm text-[#6B6B6B] mb-6">
            The project &ldquo;{slug}&rdquo; doesn&apos;t exist.
          </p>
          <Link
            href="/projects"
            className="text-sm text-[#1A1A1A] underline hover:no-underline"
          >
            ← Back to Projects
          </Link>
        </div>
      </PageShell>
    );
  }

  const detail = projectDetails[route];
  const heroImage = projectImages[route];
  const category = project.vertical;

  return (
    <PageShell>
      {/* Back link */}
      <div className="px-2">
        <Link
          href="/projects"
          className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors no-underline"
        >
          ← Back to Projects
        </Link>
      </div>

      {/* Title Row: Title Card + Image Tile */}
      <div className="flex flex-col lg:flex-row gap-1.5">
        <div className="w-full lg:w-[895px] bg-[#F3EBE2] rounded-2xl p-6 md:p-12 flex flex-col gap-3 min-w-0">
          <p className="text-xs font-medium text-[#6B6B6B] tracking-[3px] uppercase">
            {project.client} · {category}
          </p>
          <h1 className="text-3xl md:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-tight">
            {project.name}
          </h1>
          <p className="text-base md:text-lg text-[#3D3D3D] leading-relaxed max-w-[800px]">
            {project.description}
          </p>
        </div>
        <div className="w-full lg:flex-1 rounded-2xl bg-[#C4CFDE] p-2 min-h-[220px] md:min-h-[280px]">
          {heroImage ? (
            <img
              src={heroImage.src}
              alt={project.name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center rounded-lg">
              <span className="text-2xl font-medium text-[#1A1A1A]/20">
                {project.client}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Metadata Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1.5">
        <div className="bg-[#F3EBE2] rounded-2xl p-4 md:p-6 flex flex-col gap-1 min-w-0">
          <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[2px] uppercase">
            Client
          </p>
          <p className="text-base md:text-lg text-[#1A1A1A]">{project.client}</p>
        </div>
        <div className="bg-[#F3EBE2] rounded-2xl p-4 md:p-6 flex flex-col gap-1 min-w-0">
          <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[2px] uppercase">
            Role
          </p>
          <p className="text-base md:text-lg text-[#1A1A1A]">{project.role}</p>
        </div>
        <div className="bg-[#F3EBE2] rounded-2xl p-4 md:p-6 flex flex-col gap-1 min-w-0">
          <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[2px] uppercase">
            Tech
          </p>
          <p className="text-base md:text-lg text-[#1A1A1A]">{project.tech || "—"}</p>
        </div>
        <div className="bg-[#F3EBE2] rounded-2xl p-4 md:p-6 flex flex-col gap-1 min-w-0">
          <p className="text-[11px] font-medium text-[#6B6B6B] tracking-[2px] uppercase">
            Year
          </p>
          <p className="text-base md:text-lg text-[#1A1A1A]">{project.year}</p>
        </div>
      </div>

      {/* Body Content */}
      {detail && (
        <div className="bg-[#F3EBE2] rounded-2xl p-6 md:p-12 flex flex-col gap-5 md:gap-6">
          {detail.paragraphs.map((text, i) => (
            <p key={i} className="text-[15px] md:text-base text-[#3D3D3D] leading-relaxed">
              {text}
            </p>
          ))}
          {detail.links && detail.links.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-2">
              {detail.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#1A1A1A] underline hover:no-underline"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </PageShell>
  );
};

export default ProjectDetailPage;
