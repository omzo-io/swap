import { Suspense } from "react";
// import { LiquidityForm } from "@/widgets/liquidity-form";
import { css } from "~/styled-system/css";
import { vstack } from "~/styled-system/patterns";

export default function NewLiquidity() {
  return (
    <div
      className={vstack({
        maxW: 480,
        margin: "0 auto",
        px: 8,
        py: 8,
        border: "1px solid rgba(255, 255, 255, 0.14)",
        backgroundColor:
          "linear-gradient(180deg, rgba(233, 236, 249, 0.05) 0%, rgba(233, 236, 249, 0.02) 100%)",
        backdropFilter: "blur(70px)",
        borderRadius: "3xl",
        color: "white",
        gap: 4,
      })}
    >
      <h1
        className={css({
          textStyle: "h2",
        })}
      >
        Add Liquidity
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        {/* <LiquidityForm /> */}
      </Suspense>
    </div>
  );
}
