'use client';

import { AppMenuLink } from '@/widgets/app-menu/ui/AppMenuLink';

type AppMenuLinkParams = {
  label: string;
  href: string;
  isExact?: boolean;
};

const appMenuLinks: AppMenuLinkParams[] = [
  {
    label: 'Swap',
    href: '/swap',
    isExact: true,
  },
  {
    label: 'My Liquidity',
    href: '/liquidity',
  },
  {
    label: 'All Pairs',
    href: '/pairs',
  },
  {
    label: 'Whitepaper',
    href: '/docs/whitepaper.pdf',
  },
  {
    label: 'Tech Docs',
    href: '/docs/tech-docs.pdf',
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
