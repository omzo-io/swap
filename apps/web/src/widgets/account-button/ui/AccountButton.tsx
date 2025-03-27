'use client';

import { Button, shortenAddress } from '@/shared';
import { AccountDialog, ConnectWalletDialog } from '@/widgets/account';
import { AddressPurpose } from '@midl-xyz/midl-js-core';
import { useAccounts } from '@midl-xyz/midl-js-react';
import { ComponentProps, ReactNode, useState } from 'react';
import { zeroAddress } from 'viem';
import { css } from '~/styled-system/css';

type AccountButtonProps = {
  children?: ReactNode;
} & Omit<ComponentProps<typeof Button>, 'children'>;

export const AccountButton = ({ children, ...rest }: AccountButtonProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isAccountDialogOpen, setAccountDialogOpen] = useState(false);
  const { accounts } = useAccounts();

  if (!accounts) {
    return (
      <>
        <Button
          onClick={() => {
            setDialogOpen(true);
          }}
          appearance="tertiary"
          className={css({
            borderRadius: '2xl',
          })}
          {...rest}
        >
          Connect wallet
        </Button>
        <ConnectWalletDialog
          open={isDialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      </>
    );
  }

  return (
    children ?? (
      <>
        <Button
          appearance="outline"
          aria-label="account menu"
          onClick={() => {
            setAccountDialogOpen(true);
          }}
        >
          {shortenAddress(
            accounts.find((it) => it.purpose === AddressPurpose.Ordinals)
              ?.address ?? zeroAddress,
            8,
          )}
        </Button>
        <AccountDialog
          open={isAccountDialogOpen}
          onClose={() => setAccountDialogOpen(false)}
        />
      </>
    )
  );
};
