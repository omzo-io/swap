'use client';

import { useLiquidityPositions } from '@/features/liquidity';
import { LiquidityItem } from '@/features/liquidity/ui/liquidity';
import { AppPreloader } from '@/widgets/app-preloader';
import { useEVMAddress } from '@midl-xyz/midl-js-executor-react';
import { getAddress } from 'viem';
import { css } from '~/styled-system/css';
import { vstack } from '~/styled-system/patterns';

export const Liquidity = () => {
  const address = useEVMAddress();

  const { data: positions, isFetching } = useLiquidityPositions(address!);

  if (isFetching) {
    return <AppPreloader />;
  }

  const positionList = positions?.currentLiquidityPositions?.filter(
    ({ liquidityTokenBalance }) => liquidityTokenBalance > 0,
  );

  return (
    <div>
      {!positionList || positionList.length === 0 ? (
        <p
          className={css({
            px: 4,
            py: 2,
            border: "1px solid rgba(255, 255, 255, 0.14)",
            backgroundColor:
              "linear-gradient(180deg, rgba(233, 236, 249, 0.05) 0%, rgba(233, 236, 249, 0.02) 100%)",
            backdropFilter: "blur(70px)",
            borderRadius: "3xl",
            color: "white",
            textAlign: "center",
          })}
        >
          No liquidity found
        </p>
      ) : (
        <div>
          <div className={vstack({ gap: 4, alignItems: 'stretch' })}>
            {positionList.map((liquidity) => (
              <div key={liquidity.id + liquidity.lastUpdatedAt}>
                <LiquidityItem
                  liquidityToken={getAddress(liquidity.pair.id)}
                  tokenA={getAddress(liquidity.pair.token0.id)}
                  tokenB={getAddress(liquidity.pair.token1.id)}
                  reserveA={liquidity.pair.reserve0}
                  reserveB={liquidity.pair.reserve1}
                  liquidityTokenBalance={liquidity.liquidityTokenBalance}
                  totalSupply={liquidity.pair.lpTotalSupply}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};