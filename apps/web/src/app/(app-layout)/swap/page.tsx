"use client";

import { AppPreloader, SwapForm, RoadMap, About, BestExperience } from '@/widgets';
import { createConfig, getRune, regtest } from '@midl-xyz/midl-js-core';
import {
  executorAbi,
  executorAddress,
  midlRegtest,
  runeIdToBytes32,
} from '@midl-xyz/midl-js-executor';
import { Suspense } from "react";
import { Address, Client, createPublicClient, getAddress, http } from 'viem';
import { readContract } from 'viem/actions';
import { css, cx } from "~/styled-system/css";
import { center, vstack, grid } from "~/styled-system/patterns";
import InteractiveTextBlock from "./InteractiveTextBlock";
import { ChevronDownIcon } from "lucide-react";

type QueryParams = {
  inputToken?: string;
  outputToken?: string;
  amount?: string;
  field?: 'input' | 'output';
};

const getRuneOrAddress = async (
  inputToken: string,
  client: Client,
): Promise<Address | undefined> => {
  if (!inputToken && inputToken.trim() === '') {
    return undefined;
  }

  try {
    return getAddress(inputToken.toLowerCase());
  } catch {
    try {
      const config = createConfig({
        networks: [regtest],
        connectors: [],
      });
      const rune = await getRune(config, inputToken);

      if (!rune) {
        return undefined;
      }

      const data = await readContract(client, {
        abi: executorAbi,
        functionName: 'getAssetAddressByRuneId',
        args: [runeIdToBytes32(rune.id)],
        address: executorAddress['regtest'] as Address,
      });

      return data;
    } catch (error) {
      return undefined;
    }
  }
};

export default async function SwapPage({
  searchParams,
}: {
  searchParams: Promise<QueryParams>;
}) {
  const {
    inputToken = '',
    outputToken = '',
    amount,
    field,
  } = await searchParams;
  const client = createPublicClient({
    chain: midlRegtest,
    transport: http(midlRegtest.rpcUrls.default.http[0]),
  });
  return (
    <main
      className={cx(
        center(),
        css({
          flexGrow: 1,
          flexDirection: "column",
          gap: 3,
        }),
      )}
    >
      <InteractiveTextBlock />
      <Suspense fallback={<AppPreloader />}>
        <SwapForm
          inputToken={await getRuneOrAddress(inputToken, client)}
          outputToken={await getRuneOrAddress(outputToken, client)}
          amount={amount}
          field={field}
        />
      </Suspense>
      <p
        className={css({
          fontSize: "16px",
          fontWeight: "medium",
          color: "#646471",
          textAlign: "center",
          mt: 125,
        })}
      >
        Scroll down to know more
      </p>
      <div>
        <ChevronDownIcon className={css({ color: "white" })} />
      </div>
      <section id="about">
        <section
          className={vstack({
            gap: 5,
            maxWidth: "1226px",
            width: "100%",
            mx: "auto",
            mt: 125,
          })}
        >
          <h2
            className={css({
              fontSize: "90px",
              fontWeight: "semibold",
              color: "white",
            })}
          >
            Runes create the market
          </h2>
          <section
            className={grid({
              gridTemplateColumns: "1fr",
              gap: 5,
              width: "100%",
              lg: {
                gridTemplateColumns: "1fr 2fr",
              },
            })}
          >
            <About />
            <BestExperience />
          </section>
          <section className={css({ width: "100%" })}>
            <RoadMap />
          </section>
        </section>
      </section>
    </main>
  );
}
