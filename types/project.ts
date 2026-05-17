import type { StaticImageData } from "next/image";

export type StaticProject = {
  name: string;
  kind?: string;
  image?: StaticImageData;
  desc: string;
  github?: string;
  live?: string;
  stack: string;
  ext?: string;
};

export type ProjectCardProps = {
  project: StaticProject;
  index: number;
};

export type Project = {
  _id: string;
  name: string;
  slug: string;
  kind?: string;
  image?: string;
  desc: string;
  github?: string;
  live?: string;
  ext?: string;
  stack: string[];
  featured: boolean;
  order: number;
};

export type AdminProject = Project;

export type PublicProject = Project;

export type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};
