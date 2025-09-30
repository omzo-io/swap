import Link from "next/link";
import { usePathname } from "next/navigation";
import { css } from "~/styled-system/css";

export type AppMenuLink = {
  label: string;
  href: string;
  isExact?: boolean;
};

type AppMenuLinkProps = {
  link: AppMenuLink;
  onClick?: () => void;
};

export const AppMenuLink = ({
  link: { label, href, isExact },
  onClick,
}: AppMenuLinkProps) => {
  const pathname = usePathname();

  const isPathMatch = isExact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      key={label}
      className={css({
        display: "flex",
        alignItems: "center",
        px: "30px",
        py: 2.5,
        rounded: "xl",
        h: "full",
        color: isPathMatch ? "white" : "rgba(255, 255, 255, 0.3)",
        fontWeight: "medium",
        background: isPathMatch ? "rgba(0, 0, 0, 0.3)" : "transparent",
        position: "relative",
      })}
      data-active={isPathMatch ? 'true' : 'false'}
      aria-current={isPathMatch ? 'page' : undefined}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};
