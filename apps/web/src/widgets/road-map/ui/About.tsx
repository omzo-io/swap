import Image from "next/image";
import { css } from "~/styled-system/css";
import { vstack } from "~/styled-system/patterns";

import aboutIcon from "../assets/about.svg";

const WHY_LIST = [
  "Native BTC AMM, decentralized swaps",
  "Pure Bitcoin security",
  "Build natively using MIDL abstraction layer",
  "Zero reliance on Ethereum, Tron, or external bridges",
];

const About = () => {
  return (
    <section
      className={css({
        background:
          "linear-gradient(180deg, rgba(233, 236, 249, 0.05) 0%, rgba(233, 236, 249, 0.02) 100%)",
        backdropFilter: "blur(70px)",
        width: "100%",
        rounded: "28px",
        border: "1px solid rgba(255, 255, 255, 0.14)",
        height: "417px",
      })}
    >
      <Image src={aboutIcon} alt="About" />
      <section className={vstack({ gap: 2, pl: 7, alignItems: "start" })}>
        <p
          className={css({
            fontSize: "36px",
            fontWeight: "semibold",
            color: "white",
          })}
        >
          What about us?
        </p>
        {WHY_LIST.map((it, index) => (
          <p
            key={index}
            className={css({
              fontSize: "12px",
              fontWeight: "medium",
              color: "white",
              bg: "black",
              rounded: 300,
              py: 3.5,
              px: 15,
            })}
          >
            {it}
          </p>
        ))}
      </section>
    </section>
  );
};

export { About };
