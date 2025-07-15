'use client';

import { useToken } from "@/entities";
import { TokenButton, useTokenBalance } from "@/features";
import { Button, InputGroup, NumberInput } from "@/shared/ui";
import { ChangeEventHandler, InputHTMLAttributes, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { formatUnits } from "viem";
import { useChainId } from "wagmi";
import { css, cx } from "~/styled-system/css";
import { hstack, vstack } from "~/styled-system/patterns";

type SwapInputProps = {
  amountName: string;
  tokenName: string;
  label?: React.ReactNode;
  onMax?: (e: ChangeEventHandler<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

/**
 * SwapInput component.
 * Works only with the `useForm` hook from `react-hook-form`.
 */
export const SwapInput = ({
  amountName,
  tokenName,
  label,
  onMax,
  ...rest
}: SwapInputProps) => {
  const { control, watch, setValue, trigger } = useFormContext();
  const chainId = useChainId();
  const token = watch(tokenName);
  const tokenInfo = useToken(token, chainId);
  const balance = useTokenBalance(token);
  const [isInFocus, setIsInFocus] = useState(false);

  const triggerValidation = useDebouncedCallback(trigger, 0);

  const applyMax = () => {
    setValue(
      amountName,
      formatUnits(balance.data?.balance ?? BigInt(0), tokenInfo.decimals),
      {
        shouldValidate: true,
        shouldTouch: true,
        shouldDirty: true,
      },
    );

    if (onMax) {
      onMax({
        target: {
          value: formatUnits(
            balance.data?.balance ?? BigInt(0),
            tokenInfo.decimals,
          ),
        },
      } as unknown as ChangeEventHandler);
    }
    triggerValidation();
  };

  const { error } = control.getFieldState(amountName);
  const hasError = !!error;

  return (
    <InputGroup
      className={hstack({
        borderColor: isInFocus
          ? "#E9ECF9"
          : hasError
            ? "red.500"
            : "rgba(233, 236, 249, 0.1)",
        borderWidth: 1,
        borderStyle: "solid",
        bg:
          tokenInfo.address || isInFocus
            ? "black"
            : "linear-gradient(180deg, rgba(233, 236, 249, 0.05) 0%, rgba(233, 236, 249, 0.02) 100%)",
      })}
    >
      <label
        className={vstack({
          alignItems: "stretch",
          gap: 0,
          width: "100%",
        })}
      >
        {label && (
          <span
            className={css({
              color: "#646471",
            })}
          >
            {label}
          </span>
        )}
        <div className={hstack()}>
          <Controller
            control={control}
            name={amountName}
            render={({ field }) => (
              <>
                <NumberInput
                  {...rest}
                  {...field}
                  autoComplete="off"
                  precision={tokenInfo.decimals}
                  min={tokenInfo.decimals === 0 ? 5000 : 0}
                  className={cx(
                    rest.className,
                    css({
                      flexGrow: 1,
                      pl: 1,
                      fontSize: 32,
                      caretColor: "white",
                      color: "white",
                      _placeholder: {
                        color: "#646471",
                      },
                      _focus: {
                        boxShadow: "none",
                      },
                    }),
                  )}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    field.onChange(e);
                    rest.onChange?.(e);
                  }}
                  onFocus={() => setIsInFocus(true)}
                  onBlur={() => setIsInFocus(false)}
                />
              </>
            )}
          />
          <Controller
            control={control}
            name={tokenName}
            render={({ field }) => {
              return <TokenButton {...field} chainId={chainId} />;
            }}
          />

          {balance.data?.balance !== undefined ? (
            <>
              <Button
                className={css({
                  position: "absolute",
                  left: 2,
                  bottom: 2,
                  color: "#646471",
                  fontSize: 12,
                  px: 2,
                  py: 1,
                  height: "auto!",
                  border: "none",
                  borderRadius: "2xl",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  bg: "rgba(255, 255, 255, 0.1)!",
                })}
                onClick={applyMax}
              >
                Use max
              </Button>
            </>
          ) : null}
        </div>
        {hasError && (
          <div
            className={css({
              position: "absolute",
              bottom: -5,
              left: 4,
              color: "red.500",
              fontSize: 12,
            })}
          >
            {error.message}
          </div>
        )}
      </label>
    </InputGroup>
  );
};
