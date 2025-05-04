"use client";

import { BestExperience, RoadMap, SwapForm, About } from "@/widgets";
import { css, cx } from "~/styled-system/css";
import { center, vstack, grid } from "~/styled-system/patterns";
import InteractiveTextBlock from "./InteractiveTextBlock";
import { ChevronDownIcon } from "lucide-react";

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
