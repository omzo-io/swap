import { useERC20Allowance } from '@/features/token';
import { WETHByChain } from '@/global';
import { deployments, uniswapV2Router02Abi } from '@/global/contracts';
import { useApproveWithOptionalDeposit } from '@/shared';
import {
  useAddCompleteTxIntention,
  useAddTxIntention,
  useClearTxIntentions,
  useEVMAddress,
  useToken,
} from '@midl-xyz/midl-js-executor-react';
import { useMutation } from '@tanstack/react-query';
import { Address, encodeFunctionData, zeroAddress } from 'viem';
import { useChainId } from 'wagmi';

type UseSwapMidlParams = {
  tokenIn: Address;
  amountIn: bigint;
};

export type SwapArgs = {
  tokenOut: Address;
  amountOutMin: bigint;
  to: Address;
  deadline: bigint;
};

export const useSwapMidl = ({ tokenIn, amountIn }: UseSwapMidlParams) => {
  const address = useEVMAddress();
  const chainId = useChainId();

  const { data: allowance = 0n } = useERC20Allowance({
    token: tokenIn,
    spender: deployments[chainId].UniswapV2Router02.address,
    user: address!,
  });

  const { addTxIntention } = useAddTxIntention();
  const { addCompleteTxIntention } = useAddCompleteTxIntention();
  const { addApproveDepositIntention } = useApproveWithOptionalDeposit(chainId);
  const clearTxIntentions = useClearTxIntentions();
  const { rune } = useToken(tokenIn);

  const isTokenANeedApprove = allowance < amountIn && tokenIn !== zeroAddress;

  const {
    mutate: swap,
    mutateAsync: swapAsync,
    ...rest
  } = useMutation<void, Error, SwapArgs>({
    mutationFn: async ({ to, deadline, tokenOut, amountOutMin }) => {
      clearTxIntentions();
      const isTokenETH = tokenIn === zeroAddress;

      const WETH = WETHByChain[chainId];
      if (!WETH) {
        throw new Error('WETH not found');
      }

      if (!isTokenETH) {
        if (isTokenANeedApprove) {
          addApproveDepositIntention({
            address: tokenIn,
            amount: amountIn,
            runeId: rune?.id,
          });
        } else if (rune) {
          addTxIntention({
            intention: {
              hasRunesDeposit: true,
              runes: [
                {
                  id: rune?.id,
                  value: amountIn,
                  address: tokenIn,
                },
              ],
            },
          });
        }
      }
      let args:
        | SmartContractFunctionArgs<
            typeof uniswapV2Router02Abi,
            'swapExactETHForTokens'
          >
        | SmartContractFunctionArgs<
            typeof uniswapV2Router02Abi,
            'swapExactTokensForETH'
          >
        | SmartContractFunctionArgs<
            typeof uniswapV2Router02Abi,
            'swapExactTokensForTokens'
          >;

      let txName:
        | 'swapExactETHForTokens'
        | 'swapExactTokensForETH'
        | 'swapExactTokensForTokens';

      if (tokenIn === zeroAddress) {
        txName = 'swapExactETHForTokens';
        args = [amountOutMin, [WETH, tokenOut], to, deadline];
      } else if (tokenOut === zeroAddress) {
        txName = 'swapExactTokensForETH';
        args = [amountIn, amountOutMin, [tokenIn, WETH], to, deadline];
      } else {
        txName = 'swapExactTokensForTokens';
        args = [amountIn, amountOutMin, [tokenIn, tokenOut], to, deadline];
      }

      addTxIntention({
        intention: {
          evmTransaction: {
            to: deployments[chainId].UniswapV2Router02.address,
            chainId,
            type: 'btc',
            data: encodeFunctionData({
              abi: uniswapV2Router02Abi,
              functionName: txName,
              args: args as any,
            }),
            value: (tokenIn === zeroAddress ? amountIn : BigInt(0)) as any,
          },
        },
      });

      addCompleteTxIntention({ assetsToWithdraw: [tokenOut] });
    },
  });

  return {
    swap,
    swapAsync,
    ...rest,
  };
};
