import { tokenList } from '@/global';
import { satoshisToWei } from '@midl-xyz/midl-js-executor';
import { useEVMAddress, useToken } from '@midl-xyz/midl-js-executor-react';
import {
  useAccounts,
  useBalance as useBTCBalance,
  useRuneBalance,
} from '@midl-xyz/midl-js-react';
import { useMemo } from 'react';
import { Address, erc20Abi, formatUnits, zeroAddress } from 'viem';
import { useBalance, useReadContracts } from 'wagmi';

export const useTokenBalance = (
  contract: Address,
  {
    address,
  }: {
    chainId?: number;
    address?: Address;
  } = {},
) => {
  const userAddress = useEVMAddress();
  const { ordinalsAccount, isConnected } = useAccounts();

  const { balance: btcBalance } = useBTCBalance({
    query: {
      enabled: isConnected,
    },
  });

  const evmNativeTokenBalance = useBalance();

  const convertedBTCBalance = satoshisToWei(btcBalance);
  const contracts: any[] = [
    {
      address: contract,
      abi: erc20Abi,
      functionName: 'decimals',
    },
    {
      address: contract,
      abi: erc20Abi,
      functionName: 'name',
    },
    {
      address: contract,
      abi: erc20Abi,
      functionName: 'symbol',
    },
    {
      address: contract,
      abi: erc20Abi,
      functionName: 'totalSupply',
    },
  ];

  if (address || userAddress) {
    contracts.push({
      address: contract,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [address ?? userAddress],
    });
  }

  const { data, ...rest } = useReadContracts({
    allowFailure: true,
    scopeKey: 'balance',
    contracts,
    query: {
      enabled: Boolean(contract),
    },
  });

  const { data: balance, ...restBalance } = useBalance({
    address: address ?? userAddress,
    query: {
      enabled: Boolean(contract),
    },
  });

  const { rune } = useToken(contract);

  const { balance: runeBalance } = useRuneBalance({
    runeId: rune?.id ?? '',
    address: ordinalsAccount?.address || '',
    query: {
      enabled: Boolean(rune?.id && ordinalsAccount?.address),
    },
  });

  const parsedRuneBalance = runeBalance?.balance ?? 0n;

  const combinedBalance =
    ((data?.[4]?.result as bigint) || 0n) + parsedRuneBalance;

  const decimals = rune?.divisibility ?? (data?.[0]?.result as number) ?? 18;

  const parsedData: {
    decimals?: number;
    name?: string;
    symbol?: string;
    totalSupply?: bigint;
    balance?: bigint;
    formattedBalance?: string;
    evmOnlyBalance?: bigint;
  } = useMemo(
    () => ({
      decimals: rune?.divisibility ?? (data?.[0]?.result as number),
      name: rune?.spaced_name ?? (data?.[1]?.result as string),
      symbol: rune?.symbol ?? (data?.[2]?.result as string),
      totalSupply: data?.[3]?.result as bigint,
      balance: combinedBalance,
      evmOnlyBalance: (data?.[4]?.result as bigint) || 0n,
      formattedBalance:
        decimals > 0
          ? formatUnits(combinedBalance, decimals)
          : combinedBalance.toString(),
    }),
    [data, rune, runeBalance],
  );

  if (contract === zeroAddress) {
    return {
      data: {
        decimals: 18,
        name: tokenList.find((it) => it.address === zeroAddress)?.name,
        symbol: tokenList.find((it) => it.address === zeroAddress)?.symbol,
        totalSupply: 0,
        balance: BigInt(convertedBTCBalance ?? 0),
        formattedBalance: formatUnits(BigInt(convertedBTCBalance ?? 0), 18),
        evmOnlyBalance: evmNativeTokenBalance.data?.value || 0n,
      },
      ...restBalance,
    };
  }

  return {
    ...rest,
    data: parsedData,
  };
};
