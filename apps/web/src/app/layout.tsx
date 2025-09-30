import { Poppins } from "next/font/google";
import type { ReactNode } from "react";
import { css, cx } from "~/styled-system/css";
import { ErrorScreen } from '@/widgets/error-screen';
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "600", "700"],
});


const envMaintenance = (process.env.NEXT_PUBLIC_IS_MAINTENANCE ?? '') as string;
const isMaintenance = ['1', 'true', 'yes', 'on'].includes(
  envMaintenance.toLowerCase(),
);

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
        {isMaintenance ? (
          <ErrorScreen
            buttonHref="https://midl.xyz/"
            name="Maintenance"
            description="Please wait for 15 minutes - we'll be back soon"
          />
        ) : (
          children
        )}
      </body>
    </html>
  );
}
