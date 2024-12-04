import Image from "next/image";
// TODO: Wrapper is not available in this file
//import { Wrapper, HeadwindsHomePage } from "cross-country";
import identity from "@components/projects/project-data";
import Link from "next/link";

interface ProjectProps {
  params: {
    projectId: string;
  };
}

export default function Project(props: ProjectProps) {
  const {
    params: { projectId },
  } = props;

  const projects = identity?.projects ?? [];
  const project = identity.projects.find((p) => p.id === parseInt(projectId));

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {project?.name ?? "No project found"}
      <Link href="/">Back</Link>
    </div>
  );
}
