/* eslint-disable @next/next/no-img-element */
import { useToken } from '@/entities';
import { TokenLogo } from '@/features';
import { useToken as useMidlToken } from '@midl-xyz/midl-js-executor-react';
import { Address } from 'viem';
import { css } from '~/styled-system/css';
import { hstack, vstack } from '~/styled-system/patterns';

type TokenNameProps = {
  address: Address;
  chainId: number;
  showName?: boolean;
};

export const TokenName = ({ address, chainId, showName }: TokenNameProps) => {
  const { name } = useToken(address, chainId);
  const { rune } = useMidlToken(address);

  return (
    <span
      className={hstack({
        gap: 2,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 'full',
      })}
    >
      <TokenLogo address={address} chainId={chainId} runeId={rune?.id} />
      <span
        className={vstack({
          gap: 0,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        })}
      >
        {rune?.name ?? name}
        {showName && (
          <span
            className={css({
              textStyle: 'caption',
            })}
          >
            {rune?.spaced_name ?? name}
          </span>
        )}
      </span>
    </span>
  );
};
