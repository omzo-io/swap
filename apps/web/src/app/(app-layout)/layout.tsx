'use client';
import { FiatQuotesProvider } from '@/features/fiat-quote';
import {
  RemoveLiquidityProvider,
  SettingsDialogProvider,
  TokenDialogProvider,
  Web3Provider,
} from '@/global';
import { ErrorBoundary } from '@/global/providers/ErrorBoundary';
import { RuneDialogProvider } from '@/global/providers/RuneDialogProvider';
import { AppMenuList, AppPreloader, Header, Logo } from '@/widgets';
import { MobileAppMenu } from '@/widgets/app-menu/ui/MobileAppMenu';
import { renderErrorMessage } from '@/widgets/error-message';
import { Footer } from '@/widgets/footer/ui';
import '@midl-xyz/satoshi-kit/styles.css';
import Link from 'next/link';
import { Suspense, type ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { css } from '~/styled-system/css';
import { HStack, Stack } from '~/styled-system/jsx';
import { hstack } from '~/styled-system/patterns';
import '../globals.css';
import { AccountButton } from '@/widgets/account-button';
import { Brand } from '@/widgets';
import Image from 'next/image';

import linkedinIcon from '@/widgets/footer/assets/linkedin.svg';


export default function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Suspense fallback={<AppPreloader />}>
    <Web3Provider>
        <Header
          leftSlot={
            <div
              className={css({
                paddingBlock: 4,
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              })}
            >
              <Link
                href="/swap"
                className={hstack({
                  display: "flex",
                  alignItems: "center",
                  fontSize: "24px",
                  fontWeight: "700",
                })}
              >
                <Logo />
                <Brand />
              </Link>
              <a
                href="https://www.linkedin.com/company/omzo-io/"
                target="_blank"
                rel="noopener noreferrer"
                className={css({
                  lg: {
                    ml: 4,
                  },
                })}
              >
                <Image
                  src={linkedinIcon}
                  alt="LinkedIn"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://x.com/omzoio"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter />
              </a>
              <Stack display={{ base: "flex", md: "none" }}>
                <MobileAppMenu />
              </Stack>
            </div>
          }
          navigation={
            <HStack
              display={{ base: "none", md: "flex" }}
              backgroundColor="rgba(255, 255, 255, 0.1)"
              padding="5px"
              rounded="15px"
              gap={0}
              h="full"
            >
              <AppMenuList />
            </HStack>
          }
          rightSlot={
            <HStack gap={4} display={{ base: "none", md: "flex" }}>
              {/* <AccountButton /> */}
              <ConnectButton hideBalance hideAvatar />
            </HStack>
          }
        />
        <Toaster position="bottom-right" />
        <ErrorBoundary fallback={renderErrorMessage}>
          <div
            className={css({
              paddingBlock: 4,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            })}
          >
            <TokenDialogProvider />
            <RuneDialogProvider />
            <SettingsDialogProvider />
            <RemoveLiquidityProvider />
            <FiatQuotesProvider>{children}</FiatQuotesProvider>
          </div>
          <Footer />
        </ErrorBoundary>
    </Web3Provider>
    </Suspense>
  );
}
