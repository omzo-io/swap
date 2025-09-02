'use client';

import { Button } from '@/shared';
import { Logo } from '@/widgets';
import Image from 'next/image';
import Link from 'next/link';
import { css } from '~/styled-system/css';
import { VStack, HStack } from '~/styled-system/jsx';
import { vstack } from '~/styled-system/patterns';

import linkedinIcon from '../assets/linkedin.svg';
import Twitter from '@/shared/assets/Twitter';

export const Footer = () => {
  return (
    <footer
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderTopColor: 'neutral.200',
        padding: '16px',
        gap: '16px',
        '@media (min-width: 768px)': {
          flexDirection: 'row',
          alignItems: 'start',
          padding: '24px',
          justifyContent: 'space-between',
          gap: '0',
        },
      })}
    >
      <div
        className={vstack({
          gap: 1,
          alignItems: 'center',
          '@media (min-width: 768px)': {
            alignItems: 'flex-start',
          },
        })}
      >
        <Logo />

        <span
          className={css({
            color: 'neutral.500',
            fontSize: '10px',
            fontWeight: 'bold',
            paddingTop: '8px',
            display: 'block',
            '@media (min-width: 768px)': {
              fontSize: '12px',
              paddingTop: '8px',
              display: 'initial',
            },
          })}
        >
          © Omzo 2025
        </span>
      </div>

      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          '@media (min-width: 768px)': {
            flexDirection: 'row',
            gap: '80px',
            marginRight: '80px',
            alignItems: 'baseline',
          },
        })}
      >
        <VStack gap={2}>
          <HStack
            flexDirection="row"
            alignItems="center"
            gap={2}
            flexWrap="wrap"
            justifyContent="center"
            className={css({
              '@media (min-width: 768px)': {
                gap: 3,
                flexWrap: 'nowrap',
              },
            })}
          >
            <Link href="/swap">
              <Button
                appearance="ghost"
                className={css({
                  fontSize: '12px',
                  padding: '6px 12px',
                  '@media (min-width: 768px)': {
                    fontSize: '14px',
                    padding: '8px 16px',
                  },
                })}
              >
                Swap
              </Button>
            </Link>
            <Link href="/pairs">
              <Button
                appearance="ghost"
                className={css({
                  fontSize: '12px',
                  padding: '6px 12px',
                  '@media (min-width: 768px)': {
                    fontSize: '14px',
                    padding: '8px 16px',
                  },
                })}
              >
                Pairs
              </Button>
            </Link>
            <Link href="/docs/whitepaper.pdf">
              <Button
                appearance="ghost"
                className={css({
                  fontSize: '12px',
                  padding: '6px 12px',
                  '@media (min-width: 768px)': {
                    fontSize: '14px',
                    padding: '8px 16px',
                  },
                })}
              >
                Whitepaper
              </Button>
            </Link>
            <Link href="/docs/tech-docs.pdf">
              <Button
                appearance="ghost"
                className={css({
                  fontSize: '12px',
                  padding: '6px 12px',
                  '@media (min-width: 768px)': {
                    fontSize: '14px',
                    padding: '8px 16px',
                  },
                })}
              >
                Tech Docs
              </Button>
            </Link>
          </HStack>
        </VStack>
      </div>

      <div
        className={css({
          display: 'flex',
          justifyContent: 'center',
          marginTop: '8px',
          gap: '12px',
          '@media (min-width: 768px)': {
            marginTop: '20px',
          },
        })}
      >
        <a
          href="https://www.linkedin.com/company/omzo-io/"
          target="_blank"
          rel="noopener noreferrer"
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px',
            borderRadius: '4px',
            transition: 'opacity 0.2s ease',
            '&:hover': {
              opacity: 0.8,
            },
          })}
        >
          <Image
            src={linkedinIcon}
            alt="LinkedIn"
            width={20}
            height={20}
            className={css({
              '@media (min-width: 768px)': {
                width: 6,
                height: 6,
              },
            })}
          />
        </a>
        <a href="https://x.com/omzoio" target="_blank" rel="noopener noreferrer">
          <Twitter />
        </a>
      </div>
    </footer>
  );
};
