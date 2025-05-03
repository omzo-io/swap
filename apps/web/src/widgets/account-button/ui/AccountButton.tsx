"use client";

import { Button, shortenAddress } from "@/shared";
import { AccountDialog, ConnectWalletDialog } from "@/widgets/account";
import { AddressPurpose } from "@midl-xyz/midl-js-core";
import { useAccounts } from "@midl-xyz/midl-js-react";
import { ComponentProps, ReactNode, useState } from "react";
import { zeroAddress } from "viem";
import { css } from "~/styled-system/css";

type AccountButtonProps = {
  children?: ReactNode;
} & Omit<ComponentProps<typeof Button>, "children">;

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
          className={css({
            borderRadius: "15px",
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
          aria-label="account menu"
          onClick={() => {
            setAccountDialogOpen(true);
          }}
          className={css({
            borderRadius: "15px",
            backgroundColor: "#25C66526",
            color: "#25C665",
            fontWeight: "medium",
            fontSize: "15px",
            lineHeight: "18px",
            padding: "18px 24px 20px",
            _hover: {
              backgroundColor: "#25C665",
              color: "white",
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
        <AccountDialog
          open={isAccountDialogOpen}
          onClose={() => setAccountDialogOpen(false)}
        />
      </>
    )
  );
};
