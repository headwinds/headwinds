"use client";

import React, { useState, useMemo } from "react";
import Masonry from "react-masonry-css";
import { MagnifyingGlass, GithubLogo } from "@phosphor-icons/react";
import Image from "next/image";

import Link from "next/link";
import Fuse from "fuse.js";
import { SearchInput } from "@components/search/search";
import ReactPlayer from "react-player/youtube";
import { PerplexityLogo } from "./perplexityLogo";
import Project from "@components/projects/Project";
import identity from "@components/projects/project-data";
import { type ProjectType } from "@components/projects/Project";

const getSearchName = (project: ProjectType): string => {
  return String(`Drum and Bass Artist: ${project.name}`);
};

const getGoogleSearch = (project: ProjectType): string => {
  return String(
    `https://www.google.com/search?q=${encodeURIComponent(
      getSearchName(project)
    )}`
  );
};

const getPerplexitySearch = (project: ProjectType): string => {
  const nlp = `this drum and bass music project who goes by ${project.name} hailing from ${project.company} will dj at sun and bass 2024`;
  return String(
    `https://www.perplexity.ai/search?q=${encodeURIComponent(
      getSearchName(project)
    )}&focus=[internet,dj,drum and bass,youtube]&q=${encodeURIComponent(nlp)}`
  );
};

const SearchInternet = ({ project }: { project: ProjectType }) => {
  const googleUrl = getGoogleSearch(project) ?? "";
  const perplexityUrl = getPerplexitySearch(project) ?? "";

  return (
    <>
      <Link href={googleUrl} target="_blank" rel="noopener noreferrer">
        <MagnifyingGlass size={32} weight="fill" />
      </Link>
      {/*}
      <Link href={perplexityUrl} target="_blank" rel="noopener noreferrer">
        <PerplexityLogo width="30" height="30" />
      </Link>*/}
    </>
  );
};

const allProjects: ProjectType[] = identity.projects as ProjectType[];

const getYoutubeThumbnail = (url: string): string => {
  if (url === null || url === undefined) {
    return "";
  }
  const videoId = url.match(/v=([^&]*)/)?.[1] ?? "";
  if (videoId === "") return "";
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  return thumbnailUrl;
};

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArtistYoutube, setSelectedArtistYoutube] =
    useState<ProjectType | null>(null);

  const handleYoutube = (project: ProjectType) => {
    setSelectedArtistYoutube(project);
  };

  const fuse = useMemo(
    () =>
      new Fuse(allProjects, {
        keys: ["company", "name", "description"],
        threshold: 0.3,
      }),
    []
  );

  const filteredProjects = useMemo(() => {
    if (!searchTerm) return allProjects;
    return fuse.search(searchTerm).map((result) => result.item);
  }, [searchTerm, fuse]);

  const breakpointColumnsObj = {
    default: 5,
    1500: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const onContributeClick = () => {
    window.open(
      "https://github.com/headwinds/sun-and-bass/discussions",
      "_blank"
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Satisfy&display=swap");
      `}</style>
      <h1
        className="text-4xl font-bold text-center mb-8"
        style={{ fontFamily: "'Satisfy', cursive" }}
      >
        Projects
      </h1>

      <div className="flex flex-col justify-center w-full items-center m-2">
        <a href="https://github.com/headwinds" target="_blank">
          <GithubLogo size={32} weight="fill" />{" "}
        </a>
      </div>
      <div className="relative mb-8 max-w-md mx-auto">
        <SearchInput
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full"
        />
        <MagnifyingGlass size={32} weight="fill" />
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        {filteredProjects.map((project, index) => (
          <div key={index} className="mb-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-4">
                <Project
                  project={project}
                  //selectedArtistYoutube={selectedArtistYoutube}
                  //onClick={() => handleYoutube(project)}
                  //onContributeClick={onContributeClick}
                />
                <SearchInternet project={project} />
              </div>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default Projects;
