import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { css } from '~/styled-system/css';

export type AppMenuLink = {
  label: string;
  href: string;
  isExact?: boolean;
};

type AppMenuLinkProps = {
  link: AppMenuLink;
};

export const AppMenuLink = ({
  link: { label, href, isExact },
}: AppMenuLinkProps) => {
  const pathname = usePathname();

  const isPathMatch = isExact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      key={label}
      className={css({
        display: 'flex',
        alignItems: 'center',
        px: 1,
        h: 'full',
        color: isPathMatch ? 'neutral.800' : 'neutral.800',
        fontWeight: isPathMatch ? 'bold': 'medium',
        position: 'relative',
      })}
    >
      {label}
      {isPathMatch && (
        <span
          className={css({
            w: 1,
            h: 1,
            borderRadius: 'full',
            bg: 'neutral.800',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            marginTop: '1em',
          })}
        />
      )}
    </Link>
  );
};
