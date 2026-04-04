"use client";

import { useParams } from "next/navigation";
import ProjectDetailPage from "@/components/projects/ProjectDetailPage";

const ProjectPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  return <ProjectDetailPage slug={slug} />;
};

export default ProjectPage;
