'use client';

import { useToken } from '@/entities';
import { useLastUsedTokens, useSlippage, useTokenBalance } from '@/features';
import { useSwapMidl } from '@/features/swap/api/useSwapMidl';
import { useSwapRates } from '@/features/swap/api/useSwapRates';
import { SwapDialog } from '@/features/swap/ui/swap-dialog/SwapDialog';
import { tokenList } from '@/global';
import {
  Button,
  SwapInput,
  parseNumberInput,
  scopeKeyPredicate,
} from '@/shared';
import { AiOutlineSwapVertical } from '@/shared/assets';
import { calculateAdjustedBalance } from '@/shared/lib/fees';
import { removePercentage } from '@/shared/lib/removePercentage';
import { SlippageControl, SwapFormChart } from '@/widgets';
import { SwapDetails } from '@/widgets/swap-form/ui/SwapDetails';
import { getCorrectToken } from '@/widgets/swap-form/ui/utils';
import { AccountButton } from '@/widgets/account-button';
import { useBTCFeeRate, useEVMAddress } from '@midl-xyz/midl-js-executor-react';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDebounce, useDebouncedCallback } from 'use-debounce';
import { Address, formatUnits, parseUnits, zeroAddress } from 'viem';
import { useChainId } from 'wagmi';
import { css } from '~/styled-system/css';
import { Stack, VStack } from '~/styled-system/jsx';
import { vstack } from '~/styled-system/patterns';

type FormData = {
  inputToken: Address;
  outputToken: Address;
  inputTokenAmount: string;
  outputTokenAmount: string;
};

type SwapFormProps = {
  inputToken?: Address;
  outputToken?: Address;
  amount?: string;
  field?: 'input' | 'output';
};

export const SwapForm = ({
  inputToken: customInputToken,
  outputToken: customOutputToken,
  amount,
  field,
}: SwapFormProps) => {
  const outputTokenDefault =
    customOutputToken ||
    tokenList.find((it) => it.name === 'MIDL•RUNE•STABLECOIN')?.address ||
    ('' as Address);

  const inputTokenDefault = customInputToken || zeroAddress;

  const defaultValues = {
    inputToken: inputTokenDefault,
    outputToken:
      outputTokenDefault === inputTokenDefault
        ? ('' as Address)
        : outputTokenDefault,
    inputTokenAmount: field === 'input' ? amount || '' : '',
    outputTokenAmount: field === 'output' ? amount || '' : '',
  };

  const { selectTokens } = useLastUsedTokens();
  const searchParams = useSearchParams();
  const form = useForm<FormData>({
    defaultValues,
  });

  const chainId = useChainId();

  const { watch, handleSubmit, setValue, getValues } = form;
  const { inputToken, outputToken, inputTokenAmount, outputTokenAmount } =
    watch();
  const inputTokenInfo = useToken(inputToken, chainId);
  const outputTokenInfo = useToken(outputToken, chainId);
  const [swapParams, setSwapParams] = useState<{
    type: 'exactOut' | 'exactIn';
    value: bigint;
  }>({
    type: 'exactOut',
    value: 0n,
  });

  const queryClient = useQueryClient();

  const {
    data,
    error: swapRatesError,
    isFetching: isSwapRatesFetching,
  } = useSwapRates({
    tokenIn: getCorrectToken({ token: inputToken, chainId }) as Address,
    tokenOut: getCorrectToken({ token: outputToken, chainId }) as Address,
    ...swapParams,
  });

  useEffect(() => {
    if (isSwapRatesFetching) {
      return;
    }

    if (swapParams.type === 'exactIn') {
      const [, outputAmount] = data ?? [];
      if (outputAmount === undefined) {
        setValue('outputTokenAmount', '');
        return;
      }
      const formatted = formatUnits(outputAmount, outputTokenInfo.decimals);
      setValue('outputTokenAmount', formatted);
    }

    if (swapParams.type === 'exactOut') {
      const [inputAmount] = data ?? [];
      if (inputAmount === undefined) {
        setValue('inputTokenAmount', '');
        return;
      }
      const formatted = formatUnits(inputAmount, inputTokenInfo.decimals);
      setValue('inputTokenAmount', formatted);
    }
  }, [data, isSwapRatesFetching]);

  const onInputTokenAmountChange = useDebouncedCallback(async (e) => {
    if (!e.target) {
      return;
    }

    await queryClient.cancelQueries({
      predicate: scopeKeyPredicate(['swapRates']),
    });

    lastChangedInput.current = true;

    const value = parseUnits(
      parseNumberInput(e.target.value),
      inputTokenInfo.decimals,
    );

    flushSync(() => {
      setSwapParams({ type: 'exactIn', value });
    });
  }, 250);

  const onOutputTokenAmountChange = useDebouncedCallback(async (e) => {
    if (!e.target) {
      return;
    }

    await queryClient.cancelQueries({
      predicate: scopeKeyPredicate(['swapRates']),
    });

    const value = parseUnits(
      parseNumberInput(e.target.value),
      outputTokenInfo.decimals,
    );

    lastChangedInput.current = false;

    flushSync(() => {
      setSwapParams({ type: 'exactOut', value });
    });
  }, 250);

  const address = useEVMAddress();

  const onSwapSuccess = () => {
    onInputTokenAmountChange({
      target: { value: inputTokenAmount },
    } as any);
    form.reset();
    toast.success('Swap successful');
  };

  const parsedInputTokenAmount = parseUnits(
    parseNumberInput(inputTokenAmount),
    inputTokenInfo.decimals,
  );

  const lastChangedInput = useRef(true);
  const [slippage] = useSlippage();

  const amountOutMin = removePercentage(
    parseUnits(parseNumberInput(outputTokenAmount), outputTokenInfo.decimals),
    slippage,
  );

  const [isDialogOpen, setDialogOpen] = useState(false);

  const { swapAsync } = useSwapMidl({
    tokenIn: inputToken,
    amountIn: parsedInputTokenAmount,
    tokenOut: outputToken,
  });

  const onSubmit = async () => {
    await swapAsync({
      to: address!,
      deadline: BigInt(Math.floor(Date.now() / 1000) + 60 * 20),
      amountOutMin,
    });
    setDialogOpen(true);
  };

  const onSwapInput = () => {
    const { outputTokenAmount, inputTokenAmount, inputToken, outputToken } =
      getValues();

    if (lastChangedInput.current) {
      setValue('outputTokenAmount', inputTokenAmount);
      setValue('inputTokenAmount', '');
      setValue('inputToken', outputToken);
      setValue('outputToken', inputToken);

      onOutputTokenAmountChange({
        target: { value: inputTokenAmount },
      } as any);
    } else {
      setValue('inputTokenAmount', outputTokenAmount);
      setValue('outputTokenAmount', '');
      setValue('inputToken', outputToken);
      setValue('outputToken', inputToken);

      onInputTokenAmountChange({
        target: { value: outputTokenAmount },
      } as any);
    }
  };

  useEffect(() => {
    if (inputToken && inputTokenAmount) {
      onInputTokenAmountChange({
        target: { value: inputTokenAmount },
      } as any);
    }

    if (outputToken && outputTokenAmount) {
      onOutputTokenAmountChange({
        target: { value: outputTokenAmount },
      } as any);
    }

    selectTokens([
      { chain: chainId, inputName: 'inputToken', token: inputToken },
      { chain: chainId, inputName: 'outputToken', token: outputToken },
    ]);

    form.trigger();
  }, [inputToken, outputToken]);

  useEffect(() => {
    const inputTokenSymbol = searchParams.get('inputToken');
    const outputTokenSymbol = searchParams.get('outputToken');
    if (inputTokenSymbol && outputTokenSymbol) {
      const inputTokenFound = tokenList.find(
        ({ symbol }) => symbol === inputTokenSymbol,
      );
      const outputTokenFound = tokenList.find(
        ({ symbol }) => outputTokenSymbol === symbol,
      );

      if (inputTokenFound && outputTokenFound) {
        form.reset({
          inputToken: inputTokenFound.address,
          outputToken: outputTokenFound.address,
        });
      }
    }
  }, []);

  const {
    data: { balance: inputTokenBalance },
    isFetching: isInputTokenBalanceFetching,
  } = useTokenBalance(inputToken, { chainId, address });

  const { data: feeRate = 2n } = useBTCFeeRate();

  const [inputTokenAmountDebounced] = useDebounce(inputTokenAmount, 250);
  const [outputTokenAmountDebounced] = useDebounce(outputTokenAmount, 250);

  const isTyping =
    inputTokenAmount !== inputTokenAmountDebounced ||
    outputTokenAmount !== outputTokenAmountDebounced;

  const isBTC = inputToken === zeroAddress;
  const effectiveBalance = isBTC
    ? calculateAdjustedBalance(inputTokenBalance ?? 0n, feeRate)
    : (inputTokenBalance ?? 0n);

  const isBalanceBigEnough = parsedInputTokenAmount <= effectiveBalance;

  const isFormFilled =
    !!inputTokenAmount && !!outputTokenAmount && !!inputToken && !!outputToken;

  const getButtonText = () => {
    if (!address) {
      return <>Connect wallet</>;
    }
    if (
      (isSwapRatesFetching || isInputTokenBalanceFetching || isTyping) &&
      (inputTokenAmount || outputTokenAmount)
    ) {
      return <>Getting the best rate...</>;
    }
    if (
      !isTyping &&
      !isBalanceBigEnough &&
      !isSwapRatesFetching &&
      !isInputTokenBalanceFetching
    ) {
      return <>Insufficient Balance</>;
    }

    if (
      !isSwapRatesFetching &&
      !swapRatesError &&
      isBalanceBigEnough &&
      !isTyping
    ) {
      return 'Swap';
    }

    if (
      !isTyping &&
      !isInputTokenBalanceFetching &&
      !isSwapRatesFetching &&
      Boolean(swapRatesError) &&
      isFormFilled
    ) {
      return 'Insufficient liquidity';
    }

    return 'Swap';
  };

  return (
    <Stack
      flexDirection={{ base: 'column-reverse', lg: 'row' }}
      width="100%"
      gap={8}
      justifyContent="center"
      alignItems={{ base: 'center', lg: 'stretch' }}
    >
      <SwapFormChart
        inputTokenInfo={inputTokenInfo}
        outputTokenInfo={outputTokenInfo}
      />

      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={vstack({
            gap: 2.5,
            alignItems: "stretch",
            borderRadius: "28px",
            p: "15px",
            width: 'full',
            maxWidth: 548,
            background:
              "linear-gradient(180deg, rgba(233, 236, 249, 0.05) 0%, rgba(233, 236, 249, 0.02) 100%)",
            backdropFilter: "blur(70px)",
            border: "1px solid rgba(255, 255, 255, 0.14)",
          })}
        >
          <div
            className={vstack({
              alignItems: 'stretch',
              gap: 4,
              position: 'relative',
            })}
          >
            <SwapInput
              placeholder="0"
              label="You pay"
              tokenName="inputToken"
              amountName="inputTokenAmount"
              onChange={onInputTokenAmountChange}
              onMax={onInputTokenAmountChange}
              data-testid="inputTokenAmount"
            />

            <Button
              onClick={onSwapInput}
              aria-label="Swap input and output tokens"
              appearance="secondary"
              className={css({
                position: 'absolute',
                top: '50%',
                left: '50%',
                zIndex: 2,
                transform: 'translate(-50%, -50%)',
              })}
            >
              <AiOutlineSwapVertical width={24} height={24} />
            </Button>

            <SwapInput
              placeholder="0"
              label="You receive"
              tokenName="outputToken"
              amountName="outputTokenAmount"
              onChange={onOutputTokenAmountChange}
              onMax={onOutputTokenAmountChange}
              data-testid="outputTokenAmount"
            />
          </div>
          <SlippageControl />
          <VStack gap={4}>
            {address === zeroAddress ? (
              <AccountButton />
            ) : (
              <Button
                type="submit"
                appearance="primary"
                className={css({
                  width: 'full',
                })}
                disabled={
                  isTyping ||
                  isSwapRatesFetching ||
                  Boolean(swapRatesError) ||
                  !isFormFilled ||
                  !isBalanceBigEnough
                }
              >
                {getButtonText()}
              </Button>
            )}
            {/* <Link
              href="https://medium.com/midl-xyz/pioneer-the-midl-testnet-56c412486f08"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p
                className={css({
                  textStyle: 'caption',
                  color: 'neutral.700',
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: 500,
                })}
              >
                Guide: How to swap
              </p>
            </Link> */}
          </VStack>

          {inputToken &&
          outputToken &&
          inputTokenAmount &&
          outputTokenAmount ? (
            <SwapDetails
              amountOutMin={Number.parseFloat(
                formatUnits(amountOutMin, outputTokenInfo.decimals),
              ).toFixed(2)}
              inputTokenInfo={inputTokenInfo}
              outputTokenInfo={outputTokenInfo}
              inputTokenAmount={inputTokenAmount}
              outputTokenAmount={outputTokenAmount}
            />
          ) : null}

          {isDialogOpen && (
            <SwapDialog
              onSuccessfulSwap={onSwapSuccess}
              open={isDialogOpen}
              tokenOut={outputToken}
              tokenIn={inputToken}
              amountIn={parsedInputTokenAmount.toString()}
              onClose={() => {
                setDialogOpen(false);
              }}
            />
          )}
        </form>
      </FormProvider>
    </Stack>
  );
};