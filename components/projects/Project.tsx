import React, { useEffect } from "react";
import { Link } from "next-view-transitions";
import Image from "next/image";

// Define a more flexible ProjectType
export type ProjectType = {
  name: string; // Changed to string for flexibility
  description: string; // Changed to string for flexibility
  client: string; // Changed to string for flexibility
  company: string; // Changed to string for flexibility
  tags: string; // Changed to string for flexibility
  vertical: string; // Changed to string for flexibility
  duration: number; // Kept as number
  team: number; // Kept as number
  role: string; // Changed to string for flexibility
  tech: string; // Changed to string for flexibility
  year: number; // Kept as number
  localized?: boolean; // Made optional
  locked?: boolean; // Made optional
  image: string; // Changed to string for flexibility
  id: number; // Kept as number
  rank: number; // Kept as number
};

interface ProjectProps {
  project: ProjectType;
  selectedProjectId: string | undefined;
  onClick: (selectedProjectId: string) => void;
  onContributeClick: () => void;
}

const Project = ({ project }: ProjectProps) => {
  useEffect(() => {
    console.log("Project componentDidMount ");
    // const { route } = this.props;
    /*
    setTimeout(() => {
      drawColony(project, this.props);
    }, 500);
    */
  }, []); // Empty dependency array to mimic componentDidMount

  const title = project.name.toLowerCase();
  const imagePath = `/portfolio/${project.image}`;

  if (!project.image) {
    //return null;
  }

  return (
    <div>
      <h2>{project.name}</h2>
      <Image src={imagePath} width={500} height={350} alt={imagePath} />
      <p>{project?.description}</p>
      <Link href={`/projects/${project.id}`}>Learn More</Link>
    </div>
  );
};

export default Project;
