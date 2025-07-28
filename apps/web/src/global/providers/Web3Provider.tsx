'use client';
import { LastUsedTokensProvider } from '@/features';
import { config, queryClient } from '@/global';
import { AddressPurpose } from '@midl-xyz/midl-js-core';
import { WagmiMidlProvider } from '@midl-xyz/midl-js-executor-react';
import { MidlProvider } from '@midl-xyz/midl-js-react';
import { SatoshiKitProvider } from '@midl-xyz/satoshi-kit';
import { QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MidlProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WagmiMidlProvider>
          <SatoshiKitProvider purposes={[AddressPurpose.Ordinals]}>
            <Suspense>
              <WagmiMidlProvider />
            </Suspense>
            <LastUsedTokensProvider>{children}</LastUsedTokensProvider>
          </SatoshiKitProvider>
        </WagmiMidlProvider>
      </QueryClientProvider>
    </MidlProvider>
  );
};