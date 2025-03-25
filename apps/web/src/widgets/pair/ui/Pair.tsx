import { TokenLogo } from '@/features';
import { useGetPair } from '@/features/liquidity';
import {
  Button,
  beautifyNumber,
  shortenAddress,
  useCopyToClipboard,
} from '@/shared';
import { PairField } from '@/widgets/pair/ui/PairField';
import { CopyIcon } from 'lucide-react';
import Link from 'next/link';
import type { Address } from 'viem';
import { useChainId } from 'wagmi';
import { css } from '~/styled-system/css';
import { HStack, Stack, VStack } from '~/styled-system/jsx';

interface Props {
  id: string;
}

export const Pair = ({ id }: Props) => {
  const chainId = useChainId();
  const { data, isLoading } = useGetPair(id);

  const { copyToClipboard } = useCopyToClipboard();

  if (isLoading) {
    return '...getting token';
  }
  const pairData = data?.pairById;

  const token0Address = pairData?.token0.id as Address;
  const token1Address = pairData?.token1.id as Address;
  const token0Symbol = pairData?.token0.symbol;
  const token1Symbol = pairData?.token1.symbol;

  const pairInformation = [
    {
      name: 'Pair Name',
      value: `${token0Symbol} - ${token1Symbol}`,
      copy: false,
    },
    {
      name: 'Pair Address',
      value: pairData?.id,
      copy: true,
    },
    {
      name: `${token0Symbol} Address`,
      value: token0Address,
      copy: true,
    },
    {
      name: `${token1Symbol} Address`,
      value: token1Address,
      copy: true,
    },
  ];

  const tokenPrices = [
    {
      address: token0Address,
      tokenSymbol: token0Symbol,
      priceInToken: pairData?.token0Price || 0,
      secondTokenSymbol: token1Symbol,
      priceUsd: 0,
    },
    {
      address: token1Address,
      tokenImg: '',
      tokenSymbol: token1Symbol,
      priceInToken: pairData?.token1Price || 0,
      secondTokenSymbol: token0Symbol,
      priceUsd: 0,
    },
  ];

  return (
    <Stack background="white" padding={{ base: 2, md: 7 }}>
      <VStack
        gap={8}
        margin="auto"
        alignItems="baseline"
        maxWidth="1088px"
        width="100%"
      >
        <HStack>
          <HStack>
            <TokenLogo address={token0Address} chainId={chainId} />
            <TokenLogo address={token1Address} chainId={chainId} />
          </HStack>
          <HStack>
            <span
              className={css({
                textStyle: 'h2',
                fontWeight: 600,
                textTransform: 'uppercase',
              })}
            >
              {pairData?.token0.symbol}
              -
              {pairData?.token1.symbol}
            </span>
            <span
              className={css({
                textStyle: 'h2',
                fontWeight: 600,
              })}
            >
              Pair
            </span>
          </HStack>
        </HStack>
        <Stack gap={6} flexDirection={{ base: 'column', md: 'row' }}>
          {tokenPrices.map(
            (
              {
                tokenSymbol,
                address,
                secondTokenSymbol,
                priceUsd,
                priceInToken,
              },
              i,
            ) => {
              return (
                <HStack
                  key={tokenSymbol}
                  paddingX={3}
                  paddingY={2}
                  border="1px solid"
                  borderColor="#E2E2E2"
                  borderRadius="xl"
                >
                  <TokenLogo address={address} chainId={chainId} />

                  <span>
                    1 {tokenSymbol} ={' '}
                    {beautifyNumber(priceInToken)}{' '}
                    {secondTokenSymbol}{' '}
                    ${beautifyNumber(priceUsd)}
                  </span>
                </HStack>
              );
            },
          )}
        </Stack>
        <Stack
          gap={8}
          flexDirection={{ base: 'column', md: 'row' }}
          width="100%"
        >
          <PairField name="Total Liquidity">
            <HStack
              className={css({
                width: '100%',
                fontWeight: 600,
                textStyle: 'h4',
                justifyContent: 'space-between',
              })}
            >
              <span>${beautifyNumber(pairData?.liquidityUSD, 2)}</span>
              <span className={css({ fontWeight: 500, color: '#51935C' })}>
                {beautifyNumber(pairData?.liquidity24hDelta, 2)}%
              </span>
            </HStack>
          </PairField>
          <PairField name="Volume (24hrs)">
            <HStack
              className={css({
                width: '100%',
                fontWeight: 600,
                textStyle: 'h4',
                justifyContent: 'space-between',
              })}
            >
              <span>${beautifyNumber(pairData?.tradeVolumeUSD24h, 2)}</span>
              <span className={css({ fontWeight: 500, color: '#51935C' })}>
                {beautifyNumber(pairData?.tradeVolume24hDelta, 2)}%
              </span>
            </HStack>
          </PairField>
        </Stack>
        <Stack
          gap={8}
          flexDirection={{ base: 'column', md: 'row' }}
          width="100%"
        >
          <PairField name="Fees (24hrs)">
            <HStack
              className={css({
                width: '100%',
                fontWeight: 600,
                textStyle: 'h4',
                justifyContent: 'space-between',
              })}
            >
              <span>{beautifyNumber(pairData?.feesUSD24h, 2)}</span>
              <span className={css({ fontWeight: 500, color: '#51935C' })}>
                {beautifyNumber(pairData?.fees24hDelta, 2)}%
              </span>
            </HStack>
          </PairField>
          <PairField name="Pooled Tokens">
            <HStack gap={10}>
              <HStack>
                <TokenLogo address={token0Address} chainId={chainId} />
                <span>
                  {beautifyNumber(pairData?.reserve0, 4)}{' '}
                  {token0Symbol}
                </span>
              </HStack>
              <HStack>
                <TokenLogo address={token1Address} chainId={chainId} />
                <span>
                  {beautifyNumber(pairData?.reserve1, 4)}{' '}
                  {token1Symbol}
                </span>
              </HStack>
            </HStack>
          </PairField>
        </Stack>
        <VStack gap={4} alignItems="baseline" width="100%" marginTop={9}>
          <span className={css({ fontWeight: 600, textStyle: 'h4' })}>
            Pair information
          </span>
          <HStack
            background="#F8F8F8"
            width="100%"
            padding={5}
            justifyContent="space-between"
            borderRadius="xl"
          >
            <HStack width="100%">
              {pairInformation.map(({ name, value, copy }) => {
                return (
                  <VStack key={name} alignItems="baseline">
                    <span
                      className={css({
                        fontSize: '14px',
                        color: '#8A8A8A',
                      })}
                    >
                      {name}
                    </span>
                    <HStack gap={4}>
                      <span>
                        {copy && value
                          ? shortenAddress(value as Address)
                          : value}
                      </span>
                      <CopyIcon
                        cursor="pointer"
                        width={16}
                        height={16}
                        onClick={() =>
                          copyToClipboard({ copyValue: value || '' })
                        }
                      />
                    </HStack>
                  </VStack>
                );
              })}
            </HStack>
            <Link
              className={css({
                width: 'max-content',
              })}
              target="_blank"
              href={`https://blockscout.regtest.midl.xyz/address/${id}`}
            >
              <Button
                appearance="secondary"
                size="medium"
                fontSize="14px"
                width="max-content"
              >
                View on Block Explorer
              </Button>
            </Link>
          </HStack>
        </VStack>
      </VStack>
    </Stack>
  );
};
