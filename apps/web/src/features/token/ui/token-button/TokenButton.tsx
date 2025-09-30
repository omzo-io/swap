'use client';

import { TokenName, tokenDialogAtom } from "@/features";
import { Button, mergeRefs } from "@/shared";
import { useAtom } from "jotai";
import { ChevronDownIcon } from "lucide-react";
import { InputHTMLAttributes, forwardRef, useRef } from "react";
import { Address } from "viem";
import { css } from "~/styled-system/css";

type TokenButtonProps = InputHTMLAttributes<HTMLInputElement> & {
  value?: Address;
  chainId?: number;
};

export const TokenButton = forwardRef<HTMLInputElement, TokenButtonProps>(
  ({ value, chainId, ...rest }, ref) => {
    const [dialogState, setDialogState] = useAtom(tokenDialogAtom);
    const inputRef = useRef<HTMLInputElement>(null);

    const onTokenSelected = (address: string) => {
      if (!inputRef.current) {
        return;
      }

      inputRef.current!.value = `${address}`;
      rest.onChange?.({ target: inputRef.current } as any);
    };

    const refs = mergeRefs<HTMLInputElement>(inputRef, ref);

    if (!value || !chainId) {
      return (
        <>
          <Button
            appearance="secondary"
            onClick={() =>
              setDialogState({
                ...dialogState,
                onSelected: onTokenSelected,
                open: true,
              })
            }
          >
            Select a token
            <ChevronDownIcon />
          </Button>
          <input type="hidden" ref={refs} {...rest} />
        </>
      );
    }

    return (
      <>
        <Button
          className={css({
            minWidth: 100,
            borderRadius: "2xl",
          })}
          onClick={() =>
            setDialogState({
              ...dialogState,
              onSelected: onTokenSelected,
              open: true,
            })
          }
        >
          <TokenName address={value} chainId={chainId} shorten={true} />
          <ChevronDownIcon />
        </Button>
        <input type="hidden" ref={refs} {...rest} />
      </>
    );
  },
);

TokenButton.displayName = "TokenButton";
