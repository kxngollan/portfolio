import type { ReactElement } from "react";

export type MenuItem = {
  text: string;
  href: string;
};

export type SocialLink = {
  href: string;
  target?: string;
  rel?: string;
  icon: ReactElement;
};

export type MobileNavProps = {
  show: boolean;
  change: () => void;
  menuItems: MenuItem[];
  socialLinks: SocialLink[];
};
