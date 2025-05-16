"use client";

import Image from "next/image";
import { Button, Dialog, DialogContent, DialogOverlay } from "@/shared";
import { AddressPurpose } from "@midl-xyz/midl-js-core";
import { useConnect } from "@midl-xyz/midl-js-react";
import { DialogProps, DialogTitle } from "@radix-ui/react-dialog";
import { css } from "~/styled-system/css";
import { VStack } from "~/styled-system/jsx";
import { vstack } from "~/styled-system/patterns";
import { Close } from "@/shared/assets";
import walletIcon from "@/shared/assets/wallet.webp";

type ConnectWalletDialogProps = DialogProps & {
  onClose: () => void;
};

export const ConnectWalletDialog = ({
  onClose,
  ...rest
}: ConnectWalletDialogProps) => {
  const { connectors, connect, isPending, variables } = useConnect({
    purposes: [AddressPurpose.Ordinals],
    mutation: {
      onSuccess: () => {
        onClose();
      },
    },
  });

  return (
    <Dialog {...rest}>
      <DialogOverlay onClick={onClose} />
      <DialogContent
        onEscapeKeyDown={onClose}
        className={css({
          maxW: 800,
          width: "100%",
          color: "white",
          background:
            "linear-gradient(180deg, rgba(233, 236, 249, 0.05) 0%, rgba(233, 236, 249, 0.02) 100%)!",
          backdropFilter: "blur(70px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          pt: 12,
          pb: 24,
          rounded: "3xl",
        })}
      >
        <div
          className={vstack({
            gap: 2,
            justifyContent: "stretch",
          })}
        >
          <DialogTitle asChild>
            <h1
              className={css({
                fontSize: "36px",
                fontWeight: "700",
                lineHeight: "40px",
                textAlign: "center",
              })}
            >
              Connect wallet
            </h1>
          </DialogTitle>
          <Button
            onClick={onClose}
            className={css({
              position: "absolute",
              top: 5,
              right: 5,
              backgroundColor: "transparent",
              border: "none",
              padding: 0,
              _hover: {
                backgroundColor: "transparent",
              },
            })}
          >
            <Close />
          </Button>

          <VStack
            position="relative"
            className={css({
              gap: 4,
              mt: 24,
              background:
                "linear-gradient(180deg, rgba(233, 236, 249, 0.05) 0%, rgba(233, 236, 249, 0.02) 100%)",
              width: "100%",
              maxW: 500,
              rounded: "2xl",
              border: "1px solid rgba(233, 236, 249, 0.1)",
              py: 6,
            })}
          >
            <div
              className={`${css({
                position: "absolute",
                w: 14,
                h: 14,
                top: 0,
                left: "50%",
                translate: "-50% -50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              })}`}
              style={{
                backgroundImage: "url(/images/account-modal-bg.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Image src={walletIcon} alt="wallet" />
            </div>
            <p>Select a wallet to connect</p>

            {connectors.map((connector) => (
              <Button
                key={connector.id}
                width="full"
                className={css({
                  maxW: 232,
                })}
                onClick={() => {
                  connect({ id: connector.id });
                }}
                appearance="primary"
              >
                {isPending && "Connecting..." && variables?.id === connector.id}
                {!isPending && connector.name}
              </Button>
            ))}
          </VStack>
        </div>
      </DialogContent>
    </Dialog>
  );
};
