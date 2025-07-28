import { Button } from '@/shared';
import {
  useAddTxIntention,
  useFinalizeBTCTransaction,
  useSendBTCTransactions,
  useSignIntention,
} from '@midl-xyz/midl-js-executor-react';
import { useConfig, useWaitForTransaction } from '@midl-xyz/midl-js-react';
import toast from 'react-hot-toast';
import { Address } from 'viem';
import { css } from '~/styled-system/css';
import { hstack, vstack } from '~/styled-system/patterns';

type IntentionSignerProps = {
  onClose: () => void;
  shouldComplete?: boolean;
  assetsToWithdraw?: [Address] | [Address, Address];
};

export const IntentionSigner = ({
  shouldComplete,
  assetsToWithdraw,
  onClose,
}: IntentionSignerProps) => {
  const { txIntentions } = useAddTxIntention();

  const {
    data: btcTransaction,
    finalizeBTCTransaction,
    isSuccess: isFinalizedBTC,
    isPending: isFinalizingBTC,
    // signIntentionState, Notice: Now retrieved from useIntentionSigner
    isError,
    error,
  } = useFinalizeBTCTransaction({
    mutation: {
      onError: (error) => {
        console.error(error);
        toast.error(error.message);
      },
    },
  });

  const signIntentionState = useSignIntention({});
  const { network } = useConfig();

  const { waitForTransaction, isPending, isSuccess } = useWaitForTransaction();

  const toSignIntentions = txIntentions.filter((it) => it.evmTransaction);
  const txToSign = toSignIntentions.find((it) => !it.signedEvmTransaction);

  const { sendBTCTransactions, isSuccess: isBroadcasted } =
    useSendBTCTransactions({
      mutation: {
        onSuccess: () => {
          waitForTransaction({ txId: btcTransaction?.tx.id! });
        },
      },
    });
  const onPublish = async () => {
    const txIntentionsToPublish = txIntentions
      .filter((it) => it.signedEvmTransaction)
      .map((it) => it.signedEvmTransaction);

    // Notice now get intention.signedEvmTransaction! into an array and pass to serializedTransactions & btcTransaction?.tx.hex! to btcTransaction
    sendBTCTransactions({
      serializedTransactions: txIntentionsToPublish as [],
      btcTransaction: btcTransaction?.tx.hex!,
    });
  };

  return (
    <div className={vstack({ gap: 4 })}>
      <div className={hstack({ gap: 4 })}>
        {new Array(toSignIntentions.length + 1).fill(0).map((_, i) => (
          <div
            key={i}
            className={css({
              borderRadius: 'full',
              border: '1px solid',
              borderColor: 'neutral.400',
              color: 'neutral.400',
              width: 8,
              height: 8,

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              ...(i === 0 &&
                isFinalizedBTC && {
                  backgroundColor: 'neutral.800',
                  color: 'white',
                }),
              ...(toSignIntentions[i - 1]?.signedEvmTransaction && {
                backgroundColor: 'neutral.800',
                color: 'white',
              }),
            })}
          >
            {i + 1}
          </div>
        ))}
      </div>

      {!isFinalizedBTC && (
        <>
          <p>Sign BTC transaction</p>
          <Button
            onClick={() => {
              finalizeBTCTransaction({
                // shouldComplete, Notice: now is explicitly added as useAddCompleteTxIntention
                assetsToWithdrawSize: assetsToWithdraw?.length,
              });
            }}
            disabled={isFinalizingBTC}
            appearance="primary"
          >
            {isFinalizingBTC ? 'Confirming...' : 'Confirm'}
          </Button>
        </>
      )}

      {isFinalizedBTC && txToSign && btcTransaction && (
        <>
          <p>Sign transaction intention</p>
          <Button
            disabled={signIntentionState.isPending}
            onClick={() => {
              signIntentionState.signIntention({
                intention: txToSign,
                txId: btcTransaction.tx.id,
              });
            }}
            appearance="primary"
          >
            {signIntentionState.isPending ? 'Confirming...' : 'Confirm'}
          </Button>
        </>
      )}

      {isFinalizedBTC && !txToSign && btcTransaction && !isBroadcasted && (
        <>
          <p>Intention signing completed</p>
          <Button onClick={onPublish} appearance="primary">
            Publish transaction
          </Button>
        </>
      )}

      {isPending && (
        <>
          <p>Waiting for the transaction to be confirmed...</p>
          <a
            href={`${network?.explorerUrl}/tx/${btcTransaction!.tx.id}`}
            target="_blank"
            className={css({
              color: 'blue.500',
              textDecoration: 'underline',
              fontSize: 14,
            })}
          >
            View transaction
          </a>
        </>
      )}

      {isSuccess && (
        <>
          <p>Transaction confirmed</p>

          <Button
            onClick={() => {
              onClose();
            }}
            appearance="primary"
          >
            Close
          </Button>
        </>
      )}
    </div>
  );
};
