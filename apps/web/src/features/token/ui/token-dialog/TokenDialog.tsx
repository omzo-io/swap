import { TokenSelect } from "@/features";
import { Button, Dialog, DialogContent, DialogOverlay } from "@/shared";
import { DialogProps } from "@radix-ui/react-dialog";
import { Close } from "@/shared/assets";
import { css } from "~/styled-system/css";
import { vstack } from "~/styled-system/patterns";
import { VStack } from "~/styled-system/jsx";

type TokenDialogProps = DialogProps & {
  onClose: () => void;
  onTokenSelect: (address: string, chainId: number) => void;
};

export const TokenDialog = ({
  onClose,
  onTokenSelect,
  ...rest
}: TokenDialogProps) => {
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
              backgroundColor: "transparent!",
              border: "none!",
              padding: 0,
              _hover: {
                backgroundColor: "transparent",
              },
            })}
          >
            <Close />
          </Button>
          <h1
            className={css({
              fontSize: "36px",
              fontWeight: "700",
              lineHeight: "40px",
              textAlign: "center",
            })}
          >
            Select token
          </h1>
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
            <TokenSelect onSelect={onTokenSelect} />
          </VStack>
        </div>
      </DialogContent>
    </Dialog>
  );
};
