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
  {
    label: "Rune Rush",
    href: "/rune-rush",
  },
];

interface Props {
  onClick?: () => void;
}

export const AppMenuList = ({ onClick }: Props) => {
  return (
    <>
      {appMenuLinks.map((link) => (
        <AppMenuLink link={link} key={link.label} onClick={onClick} />
      ))}
    </>
  );
};
