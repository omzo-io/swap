'use client';

import Image from "next/image";
import { FiatQuotesProvider } from "@/features/fiat-quote";
import {
  SettingsDialogProvider,
  TokenDialogProvider,
  Web3Provider,
} from "@/global";
import { ErrorBoundary } from "@/global/providers/ErrorBoundary";
import { AppMenuList, Header, Logo, RPCStatus } from '@/widgets';
import { MobileAppMenu } from '@/widgets/app-menu/ui/MobileAppMenu';
import { RemoveLiquidityProvider } from "@/global/providers/RemoveLiquidityProvider";
import { RuneDialogProvider } from "@/global/providers/RuneDialogProvider";
import type { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  Brand,
} from "@/widgets";
import { renderErrorMessage } from "@/widgets/error-message";
import { Footer } from "@/widgets/footer/ui";
import Link from "next/link";
import { css } from "~/styled-system/css";
import { HStack, Stack } from "~/styled-system/jsx";
import { hstack } from "~/styled-system/patterns";
import { AccountButton } from "@/widgets/account-button";
import linkedinIcon from "@/widgets/footer/assets/linkedin.svg";

import '@midl-xyz/satoshi-kit/styles.css';
import "../globals.css";

export default function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Web3Provider>
      <FiatQuotesProvider>
        <TokenDialogProvider />
        <RuneDialogProvider />
        <SettingsDialogProvider />
        <RemoveLiquidityProvider />
        <RPCStatus />
        <Header
          leftSlot={
            <div
              className={hstack({
                flexShrink: 0,
                width: {
                  base: "100%",
                  md: "fit-content",
                },
                justifyContent: "space-between",
              })}
            >
              <Link
                href="/"
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
              <AccountButton />
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
            {children}
          </div>
          <Footer />
        </ErrorBoundary>
      </FiatQuotesProvider>
    </Web3Provider>
  );
}
