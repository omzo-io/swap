"use client";

import { Button, shortenAddress } from "@/shared";
import { AddressPurpose } from "@midl-xyz/midl-js-core";
import { useAccounts } from "@midl-xyz/midl-js-react";
import { ComponentProps, ReactNode } from "react";
import { zeroAddress } from "viem";
import { ConnectButton } from "@midl-xyz/satoshi-kit";
import { css } from "~/styled-system/css";
import { queryClient } from '@/global';
import { xverseConnector } from '@midl-xyz/midl-js-connectors';
import { useAddNetwork, useConfig } from '@midl-xyz/midl-js-react';
import { useEffect } from 'react';

type AccountButtonProps = {
  children?: ReactNode;
} & Omit<ComponentProps<typeof Button>, "children">;

export const AccountButton = ({ children, ...rest }: AccountButtonProps) => {
  const { accounts } = useAccounts();

  const { addNetworkAsync } = useAddNetwork();
  const { network } = useConfig();
  const { isConnected } = useAccounts();

  // useEffect(() => {
  //   if (!isConnected) {
  //     queryClient.clear();
  //   }
  // }, [isConnected]);

  // return (
  //   <ConnectButton
  //     beforeConnect={async (connectorId) => {
  //       if (connectorId !== xverseConnector().id) {
  //         return;
  //       }
  //       console.log('ENV: ', process.env.NEXT_PUBLIC_MEMPOOL_RPC);
  //       await addNetworkAsync({
  //         connectorId,
  //         networkConfig: {
  //           name: 'MIDL Regtest',
  //           network: network.id,
  //           rpcUrl: `${
  //             process.env.NEXT_PUBLIC_MEMPOOL_RPC ||
  //             'https://mempool.regtest.midl.xyz'
  //           }/api`,
  //           indexerUrl:
  //             process.env.NEXT_PUBLIC_INDEXER_URL ||
  //             'https://api-regtest-midl.xverse.app',
  //         },
  //       });
  //     }}
  //   />
  // );

    return (
      <ConnectButton>
        {({ openConnectDialog, openAccountDialog, isConnected }) => isConnected && accounts ?
        (
          <Button
          aria-label="account menu"
          onClick={openAccountDialog}
          className={css({
            rounded: "15px!",
            backgroundColor: "#25C66526!",
            color: "#25C665!",
            fontWeight: "medium",
            fontSize: "15px",
            lineHeight: "18px",
            padding: "18px 24px 20px",
            _hover: {
              backgroundColor: "#25C665!",
              color: "white!",
            },
            transitionDuration: "0.15s",
            transitionProperty: "background-color, color",
            transitionTimingFunction: "ease-in-out",
          })}
        >
          {shortenAddress(
            accounts.find((it) => it.purpose === AddressPurpose.Ordinals)
              ?.address ?? zeroAddress,
            8,
          )}
        </Button>
        ) : (
          <Button
          onClick={openConnectDialog}
          className={css({
            rounded: "15px!",
            backgroundColor: "#9289FD26",
            color: "#9289FD",
            fontWeight: "medium",
            fontSize: "15px",
            lineHeight: "18px",
            padding: "18px 40px 20px",
            _hover: {
              backgroundColor: "#9289FD",
              color: "white",
            },
            transitionDuration: "0.15s",
            transitionProperty: "background-color, color",
            transitionTimingFunction: "ease-in-out",
          })}
          {...rest}
        >
          Connect wallet
        </Button>
        )}
      </ConnectButton>
    );
};