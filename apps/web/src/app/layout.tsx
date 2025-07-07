import { Poppins } from "next/font/google";
import type { ReactNode } from "react";
import { css, cx } from "~/styled-system/css";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "600", "700"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${css({
        height: "100%",
        display: "flex",
        flexDirection: "column",
      })}`}
    >
      <body
        className={cx(
          poppins.className,
          css({
            display: "flex",
            flexDirection: "column",
          }),
        )}
      >
        {children}
      </body>
    </html>
  );
}
