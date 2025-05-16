"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogOverlay,
  shortenAddress,
  useCopyToClipboard,
} from "@/shared";
import { useAccounts, useDisconnect } from "@midl-xyz/midl-js-react";
import { type DialogProps, DialogTitle } from "@radix-ui/react-dialog";
import { CopyIcon } from "lucide-react";
import { css } from "~/styled-system/css";
import { VStack } from "~/styled-system/jsx";
import { vstack } from "~/styled-system/patterns";
import { useDisconnect as useWagmiDisconnect } from "wagmi";
import { Close, Check } from "@/shared/assets";

type AccountDialogProps = DialogProps & {
  onClose: () => void;
};

export const AccountDialog = ({ onClose, ...rest }: AccountDialogProps) => {
  const { accounts } = useAccounts();
  const { disconnect: wagmiDisconnect } = useWagmiDisconnect();
  const { disconnect } = useDisconnect({
    mutation: {
      onSuccess: () => {
        wagmiDisconnect();
        onClose();
      },
    },
  });

  const { copyToClipboard } = useCopyToClipboard();

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
              Connected accounts
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
              gap: 5,
              mt: 24,
              background:
                "linear-gradient(180deg, rgba(233, 236, 249, 0.05) 0%, rgba(233, 236, 249, 0.02) 100%)",
              width: "100%",
              maxW: 500,
              rounded: "2xl",
              border: "1px solid rgba(233, 236, 249, 0.1)",
              pt: 11,
              pb: 7,
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
              <Check height={16} width={16} />
            </div>
            <VStack gap={2}>
              {accounts?.map((account) => (
                <div
                  key={account.address}
                  className={css({
                    textStyle: "caption",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    width: "full",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  })}
                >
                  {shortenAddress(account.address, 16)}

                  <Button
                    className={css({
                      backgroundColor: "transparent",
                      border: "none",
                      padding: 0,
                      _hover: {
                        backgroundColor: "transparent",
                      },
                    })}
                    onClick={() => {
                      copyToClipboard({ copyValue: account.address });
                    }}
                  >
                    <CopyIcon width={24} height={24} />
                  </Button>
                </div>
              ))}
            </VStack>

            <Button
              onClick={() => {
                disconnect();
              }}
              width="full"
              className={css({
                maxW: 232,
              })}
              appearance="secondary"
            >
              Disconnect
            </Button>
          </VStack>
        </div>
      </DialogContent>
    </Dialog>
  );
};
