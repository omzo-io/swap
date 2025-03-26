'use client';

import { Button } from '@/shared';
import { Logo } from '@/widgets';
import Link from 'next/link';
import { css } from '~/styled-system/css';
import { VStack } from '~/styled-system/jsx';
import { hstack, vstack } from '~/styled-system/patterns';

export const Footer = () => {
  return (
    <footer
      className={css({
        display: 'flex',
        alignItems: 'baseline',
        borderTop: '1px solid',
        borderTopColor: 'neutral.200',
        padding: 6,
        justifyContent: 'space-between',
      })}
    >
      <div
        className={vstack({
          gap: 1,
        })}
      >
        <Logo />

        <span
          className={css({
            color: 'neutral.500',
            fontSize: 12,
            fontWeight: 'bold',
            marginTop: '134px',
            display: {
              base: 'none',
              md: 'initial',
            },
          })}
        >
          © Omzo 2025
        </span>
      </div>

      <div
        className={hstack({
          flexDirection: 'row',
          gap: '80px',
          marginRight: '80px',
          alignItems: 'baseline',
        })}
      >
        <VStack gap={4}>
          <span className={css({ textStyle: 'body', fontWeight: 600 })}>
            Menu
          </span>
          <VStack alignItems="center" gap={3}>
            <Link href="/swap">
              <Button appearance="ghost">Swap</Button>
            </Link>
            <Link href="/pairs">
              <Button appearance="ghost">Pairs</Button>
            </Link>
            <Link href="/docs/whitepaper.pdf">
              <Button appearance="ghost">Whitepaper</Button>
            </Link>
            <Link href="/docs/tech-docs.pdf">
              <Button appearance="ghost">Tech Docks</Button>
            </Link>
          </VStack>
        </VStack>
      </div>
    </footer>
  );
};
