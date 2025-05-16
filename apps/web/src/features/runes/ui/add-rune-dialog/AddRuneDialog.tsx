import { TokenLogo, TokenName } from "@/features";
import { useRuneDialog } from "@/features/runes/api";
import {
  Button,
  Dialog,
  DialogContent,
  DialogOverlay,
  useCopyToClipboard,
} from "@/shared";
import {
  calculateTransactionsCost,
  multisigAddress,
} from "@midl-xyz/midl-js-executor";
import {
  useConfig,
  useEdictRune,
  useRune,
  useWaitForTransaction,
} from "@midl-xyz/midl-js-react";
import { DialogProps, DialogTitle } from "@radix-ui/react-dialog";
import { Close } from "@/shared/assets";
import { useQuery } from "@tanstack/react-query";
import { CopyIcon, Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { formatUnits } from "viem";
import { css } from "~/styled-system/css";
import { vstack, hstack } from "~/styled-system/patterns";
import { VStack } from "~/styled-system/jsx";
import { midlRegtest } from "@midl-xyz/midl-js-executor";
import { zeroAddress } from "viem";

type AddRuneDialogProps = DialogProps & {
  onClose: () => void;
};

export const AddRuneDialog = ({ onClose, ...rest }: AddRuneDialogProps) => {
  const { state } = useRuneDialog();
  const { rune } = useRune({
    runeId: state.value.runeId,
    query: {
      enabled: Boolean(state.value.runeId),
    },
  });

  const {
    edictRune,
    data,
    isPending: isTransactionBeingFormed,
    reset,
  } = useEdictRune({
    mutation: {
      onError(error) {
        console.error(error);
        toast.error(error.message);
      },
      onSuccess(data) {
        waitForTransaction({
          txId: data.tx.id,
        });
      },
    },
  });
  const {
    waitForTransaction,
    isSuccess,
    isPending,
    reset: resetWait,
  } = useWaitForTransaction();
  const config = useConfig();
  const { network } = config;
  const { copyToClipboard } = useCopyToClipboard();

  const { data: edictFee } = useQuery({
    queryKey: ["edictFee"],
    queryFn: async () => {
      const fee = await calculateTransactionsCost(
        [
          {
            gas: 0n,
          },
        ],
        config,
        { hasRunesDeposit: true },
      );

      return fee > 546n ? fee : 546n;
    },
  });

  const onConfirm = async () => {
    edictRune({
      transfers: [
        {
          receiver: multisigAddress[network!.id],
          amount: Number(edictFee),
        },
        {
          runeId: rune!.id,
          amount: 1n,
          receiver: multisigAddress[network!.id],
        },
      ],
      publish: true,
    });
  };

  const handleClose = () => {
    onClose();
    reset();
    resetWait();
  };

  return (
    <Dialog {...rest}>
      <DialogOverlay onClick={handleClose} />
      <DialogContent
        onEscapeKeyDown={handleClose}
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
        {isSuccess && (
          <div
            className={vstack({
              gap: 8,
              justifyContent: "stretch",
            })}
          >
            <DialogTitle asChild>
              <h1
                className={css({
                  textStyle: "h3",
                })}
              >
                Transaction confirmed
              </h1>
            </DialogTitle>

            <p>
              The transaction has been confirmed. The rune has been added to the
              MIDL ecosystem.
            </p>

            <Button onClick={handleClose}>Close</Button>
          </div>
        )}

        {isPending && (
          <div
            className={vstack({
              gap: 8,
              justifyContent: "stretch",
            })}
          >
            <DialogTitle asChild>
              <h1
                className={css({
                  textStyle: "h3",
                })}
              >
                Confirming transaction
              </h1>
            </DialogTitle>

            <Loader2Icon
              className={css({
                animation: "spin 1s linear infinite",
                display: "inline-block",
              })}
            />

            <p>Waiting for the transaction to be confirmed...</p>

            <a
              href={`${network?.explorerUrl}/tx/${data?.tx.id}`}
              target="_blank"
              className={css({
                color: "blue.500",
                textDecoration: "underline",
                fontSize: 14,
              })}
            >
              View transaction
            </a>
          </div>
        )}

        {!data?.tx.id && (
          <div
            className={vstack({
              gap: 8,
              justifyContent: "stretch",
            })}
          >
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
            <DialogTitle asChild>
              <h1
                className={css({
                  fontSize: "36px",
                  fontWeight: "700",
                  lineHeight: "40px",
                  textAlign: "center",
                })}
              >
                Add rune to the MIDL ecosystem
              </h1>
            </DialogTitle>

            <TokenLogo runeId={rune?.id} size={12} />

            <p>
              To add the rune, please transfer the minimum amount (e.g 1{" "}
              {rune?.symbol}) of{" "}
              <b className={css({ color: "#9289FD" })}>{rune?.spaced_name}</b>{" "}
              and validator's fee
            </p>

            <VStack
              position="relative"
              className={css({
                gap: 5,
                mt: 7,
                background:
                  "linear-gradient(180deg, rgba(233, 236, 249, 0.05) 0%, rgba(233, 236, 249, 0.02) 100%)",
                width: "100%",
                maxW: 500,
                rounded: "2xl",
                border: "1px solid rgba(233, 236, 249, 0.1)",
                p: 5,
              })}
            >
              <div
                className={css({
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#141417",
                  h: 61,
                  px: 4,
                  rounded: "xl",
                  w: "full",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  letterSpacing: "-0.04em",
                })}
              >
                <div className={hstack({ gap: 2 })}>
                  <TokenLogo address={zeroAddress} chainId={midlRegtest.id} />
                  BTC
                </div>
                <p>{formatUnits(edictFee ?? 0n, 8)}</p>
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
                    copyToClipboard({
                      copyValue: formatUnits(edictFee ?? 0n, 8),
                    });
                  }}
                >
                  <CopyIcon width={24} height={24} />
                </Button>
              </div>
              <div
                className={css({
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#141417",
                  h: 61,
                  px: 4,
                  rounded: "xl",
                  w: "full",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  letterSpacing: "-0.04em",
                })}
              >
                <p>{multisigAddress[network!.id]}</p>
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
                    copyToClipboard({
                      copyValue: multisigAddress[network!.id],
                    });
                  }}
                >
                  <CopyIcon width={24} height={24} />
                </Button>
              </div>
              <Button disabled={isTransactionBeingFormed} onClick={onConfirm}>
                {isTransactionBeingFormed ? "Confirming..." : "Add rune"}
              </Button>
            </VStack>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
