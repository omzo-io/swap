import { IntentionSigner } from '@/features/btc/ui/IntentionSigner';
import { Dialog, DialogContent, DialogOverlay } from '@/shared';
import { useToken } from '@midl-xyz/midl-js-executor-react';
import { DialogProps } from '@radix-ui/react-dialog';
import {
  Address,
  zeroAddress,
} from 'viem';
import { css } from '~/styled-system/css';
import { vstack } from '~/styled-system/patterns';

type SwapDialogProps = DialogProps & {
  onSuccessfulSwap?: () => void;
  onClose: () => void;
  tokenIn: Address;
  amountIn: string;
  tokenOut: Address;
};

export const SwapDialog = ({
  onClose,
  onSuccessfulSwap,
  tokenIn,
  tokenOut,
  amountIn,
  ...rest
}: SwapDialogProps) => {
  const { rune } = useToken(tokenOut);

  return (
    <Dialog {...rest}>
      <DialogOverlay onClick={onClose} />

      <DialogContent>
        <div className={vstack({ gap: 4, alignItems: 'center' })}>
          <h3
            className={css({
              textStyle: 'h3',
            })}
          >
            Sign intentions to swap
          </h3>

          <IntentionSigner
            assetsToWithdraw={rune?.id ? [tokenOut] : [zeroAddress]}
            onClose={() => {
              onClose();
              onSuccessfulSwap?.();
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
