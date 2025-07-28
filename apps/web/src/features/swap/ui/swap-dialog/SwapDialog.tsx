import { IntentionSigner } from '@/features/btc/ui/IntentionSigner';
import { Dialog, DialogContent, DialogOverlay } from '@/shared';
import { useToken, useEVMAddress } from '@midl-xyz/midl-js-executor-react';
import { DialogProps } from '@radix-ui/react-dialog';
import {
  Address,
  encodeAbiParameters,
  keccak256,
  parseUnits,
  toHex,
  zeroAddress,
} from 'viem';
import { useAccount } from 'wagmi';
import { css } from '~/styled-system/css';
import { vstack } from '~/styled-system/patterns';

type SwapDialogProps = DialogProps & {
  onSuccessfulSwap?: () => void;
  onClose: () => void;
  tokenIn: Address;
  amountIn: bigint;
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
  const address = useEVMAddress();

  const { rune } = useToken(tokenOut);
  const slot = keccak256(
    encodeAbiParameters(
      [
        {
          type: 'address',
        },
        { type: 'uint256' },
      ],
      [address ?? zeroAddress, 0n],
    ),
  );

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
            shouldComplete={!!rune?.id || tokenOut === zeroAddress}
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
