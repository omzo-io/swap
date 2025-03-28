'use client';

import { Button } from '@/shared';
import { Logo } from '@/widgets';
import Image from 'next/image';
import Link from 'next/link';
import { css } from '~/styled-system/css';
import { VStack } from '~/styled-system/jsx';
import { hstack, vstack } from '~/styled-system/patterns';

import linkedinIcon from '../assets/linkedin.svg';

export const Footer = () => {
  return (
    <footer
      className={css({
        display: 'flex',
        alignItems: 'start',
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
            paddingTop: 2,
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
          <VStack flexDirection="row" alignItems="center" gap={3}>
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
              <Button appearance="ghost">Tech Docs</Button>
            </Link>
          </VStack>
        </VStack>
      </div>
      {/* Empty div to center the links */}
      <div
      className={hstack({
        flexDirection: 'row',
        gap: '80px',
        marginTop: '20px',
        alignItems: 'baseline',
      })}>
        <a href="https://www.linkedin.com/company/omzo-io/" target="_blank" rel="noopener noreferrer">
          <Image src={linkedinIcon} alt="LinkedIn" width={24} height={24} />
        </a>
      </div>
    </footer>
  );
};
