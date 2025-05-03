"use client";

import { SwapForm } from "@/widgets";
import { css, cx } from "~/styled-system/css";
import { center } from "~/styled-system/patterns";
import InteractiveTextBlock from "./InteractiveTextBlock";

export default function SwapPage() {
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
      <SwapForm />
    </main>
  );
}
