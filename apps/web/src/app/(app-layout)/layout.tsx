import { FiatQuotesProvider } from '@/features/fiat-quote';
import {
  SettingsDialogProvider,
  TokenDialogProvider,
  Web3Provider,
} from '@/global';
import { ErrorBoundary } from '@/global/providers/ErrorBoundary';
import { RemoveLiquidityProvider } from '@/global/providers/RemoveLiquidityProvider';
import { RuneDialogProvider } from '@/global/providers/RuneDialogProvider';
import { AccountButton, AppMenuList, Header, Logo, RPCStatus } from '@/widgets';
import { MobileAppMenu } from '@/widgets/app-menu/ui/MobileAppMenu';
import { renderErrorMessage } from '@/widgets/error-message';
import { Footer } from '@/widgets/footer/ui';
import { headers } from 'next/headers';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { css } from '~/styled-system/css';
import { HStack, Stack } from '~/styled-system/jsx';
import { hstack } from '~/styled-system/patterns';
import '../globals.css';

export default async function AppLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookie = (await headers()).get('cookie') || '';

  return (
    <Web3Provider cookie={cookie}>
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
                gap: 24,
                flexShrink: 0,
                width: {
                  base: '100%',
                  md: 'fit-content',
                },
                justifyContent: 'space-between',
              })}
            >
              <Link
                href="/"
                className={hstack({
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '24px',
                  fontWeight: '700',
                })}
              >
                <Logo />
                <span>OMZO.IO</span>
              </Link>
              <HStack display={{ base: 'none', md: 'flex' }} gap={6} h="full">
                <AppMenuList />
              </HStack>
              <Stack display={{ base: 'flex', md: 'none' }}>
                <MobileAppMenu />
              </Stack>
            </div>
          }
          rightSlot={
            <HStack gap={4} display={{ base: 'none', md: 'flex' }}>
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
              display: 'flex',
              flexDirection: 'column',
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
