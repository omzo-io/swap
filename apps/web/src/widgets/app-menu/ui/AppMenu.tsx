"use client";

import { AppMenuLink } from "@/widgets/app-menu/ui/AppMenuLink";

type AppMenuLinkParams = {
  label: string;
  href: string;
  isExact?: boolean;
};

const appMenuLinks: AppMenuLinkParams[] = [
  {
    label: "Swap",
    href: "/swap",
    isExact: true,
  },
  {
    label: "Pool",
    href: "/liquidity",
  },
  {
    label: "Pairs",
    href: "/pairs",
  },
];

interface Props {
  onToggleModal?: () => void;
}

export const AppMenuList = ({ onToggleModal }: Props) => {
  return (
    <>
      {appMenuLinks.map((link) => (
        <AppMenuLink link={link} key={link.label} />
      ))}
    </>
  );
};
