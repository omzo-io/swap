import { useToken } from '@/entities';
import { TokenLogo } from '@/features';
import { removeLiquidityDialogAtom } from '@/features/liquidity/model';
import { beautifyNumber, Button } from '@/shared';
import * as Collapsible from '@radix-ui/react-collapsible';
import { useAtom } from 'jotai';
import { Address } from 'viem';
import { useChainId } from 'wagmi';
import { css } from '~/styled-system/css';
import { hstack, vstack } from '~/styled-system/patterns';

type LiquidityItemProps = {
  tokenA: Address;
  tokenB: Address;
  liquidityToken: Address;
  totalSupply: bigint;
  liquidityTokenBalance: bigint;
  reserveA: bigint;
  reserveB: bigint;
};

export const LiquidityItem = ({
  tokenA,
  tokenB,
  liquidityToken,
  liquidityTokenBalance,
  totalSupply,
  reserveA,
  reserveB,
}: LiquidityItemProps) => {
  const chainId = useChainId();
  const tokenAInfo = useToken(tokenA, chainId);
  const tokenBInfo = useToken(tokenB, chainId);
  const [, setDialogState] = useAtom(removeLiquidityDialogAtom);

  const tokenASymbol = tokenAInfo.symbol;
  const tokenBSymbol = tokenBInfo.symbol;

  const poolSharePercentage =
    (parseFloat(liquidityTokenBalance.toString()) /
      parseFloat(totalSupply.toString())) *
    100;
  return (
    <Collapsible.Root
      defaultOpen={true}
      className={css({
        padding: 4,
        borderRadius: 'xl',
        backgroundColor: 'neutral.100',
      })}
    >
      <Collapsible.Trigger
        className={css({
          cursor: 'pointer',
        })}
      >
        <div className={hstack({ gap: 2 })}>
          <div
            className={css({
              position: 'relative',
              display: 'flex',
            })}
          >
            <TokenLogo address={tokenA} chainId={chainId} size={8} />
            <TokenLogo
              address={tokenB}
              chainId={chainId}
              size={8}
              className={css({
                marginLeft: -2,
              })}
            />
          </div>
          {tokenASymbol} —{' '}
          {tokenBSymbol}
        </div>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div className={vstack({ gap: 2, alignItems: 'stretch', pt: 4 })}>
          <div className={hstack({ gap: 2, justifyContent: 'space-between' })}>
            <span>
              Pooled {tokenASymbol}
            </span>
            <span>
              {beautifyNumber(reserveA)}{' '}
              {tokenASymbol}
            </span>
          </div>
          <div className={hstack({ gap: 2, justifyContent: 'space-between' })}>
            <span>
              Pooled {tokenBSymbol}
            </span>
            <span>
              {beautifyNumber(reserveB)}{' '}
              {tokenBSymbol}
            </span>
          </div>
          <div className={hstack({ gap: 2, justifyContent: 'space-between' })}>
            <span>Your total pool tokens</span>
            <span>{beautifyNumber(liquidityTokenBalance)}</span>
          </div>

          <div className={hstack({ gap: 2, justifyContent: 'space-between' })}>
            <span>Pool share percentage:</span>
            <span>
              {poolSharePercentage >= 99.9
                ? 100
                : beautifyNumber(poolSharePercentage, 2)}
              %
            </span>
          </div>
          <div>
            <Button
              appearance="secondary"
              onClick={() => {
                setDialogState({
                  open: true,
                  lpToken: {
                    address: liquidityToken,
                    chainId: chainId,
                    tokenA,
                    tokenB,
                  },
                });
              }}
            >
              Remove
            </Button>
          </div>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
