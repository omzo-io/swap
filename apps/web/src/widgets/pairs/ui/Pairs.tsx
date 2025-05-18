"use client";

import { useGetPools } from "@/features/liquidity";
import { PairItem } from "@/widgets/pairs/ui/pair/PairItem";
import { Loader2Icon } from "lucide-react";
import { getAddress } from "viem";
import { css } from "~/styled-system/css";

export const Pairs = () => {
  const { data: pools, isFetching } = useGetPools();
  if (isFetching) {
    return (
      <div
        className={css({
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          backgroundColor:
            "linear-gradient(180deg, rgba(233, 236, 249, 0.05) 0%, rgba(233, 236, 249, 0.02) 100%)",
          backdropFilter: "blur(70px)",
          padding: 4,
          borderRadius: "3xl",
          display: "flex",
          verticalAlign: "middle",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        })}
      >
        <Loader2Icon
          className={css({
            animation: "spin 1s linear infinite",
            display: "inline-block",
            verticalAlign: "middle",
          })}
        />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div
      className={css({
        padding: 4,
        borderRadius: "3xl",
        border: "1px solid rgba(255, 255, 255, 0.14)",
        backgroundColor:
          "linear-gradient(180deg, rgba(233, 236, 249, 0.05) 0%, rgba(233, 236, 249, 0.02) 100%)",
        backdropFilter: "blur(70px)",
        display: "table",
        borderSpacing: 4,
      })}
    >
      <div
        className={css({
          display: "table-row",
          color: "neutral.500",
          padding: 2,
          verticalAlign: "middle",
        })}
      >
        <div className={css({ width: "5%", display: "table-cell" })}>#</div>
        <div className={css({ display: "table-cell" })}>Pair</div>
        <div className={css({ display: "table-cell" })}>Volume (24h)</div>
        <div className={css({ display: "table-cell" })}>Liquidity</div>
        <div className={css({ display: "table-cell" })}>Fees(24h)</div>
      </div>

      {pools?.pairs.map((pair, index) => (
        <PairItem
          index={index}
          key={pair.id}
          tokenA={getAddress(pair.token0.id)}
          tokenB={getAddress(pair.token1.id)}
          id={getAddress(pair.id)}
          pair={pair}
        />
      ))}
    </div>
  );
};
