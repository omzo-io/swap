import { Rajdhani } from 'next/font/google';
import type { ReactNode } from 'react';
import { css, cx } from '~/styled-system/css';
import './globals.css';

const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={css({
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      <body
        className={cx(
          rajdhani.className,
          css({
            display: 'flex',
            flexDirection: 'column',
            bg: '#FEFEFE',
          }),
        )}
      >
        {children}
      </body>
    </html>
  );
}
