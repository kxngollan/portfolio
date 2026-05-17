import type { StaticImageData } from "next/image";

export type ExperienceItem = {
  image: StaticImageData;
  employer: string;
  title: string;
  duration: string;
  link: string;
  location: string;
  responsibilities?: string[];
};
