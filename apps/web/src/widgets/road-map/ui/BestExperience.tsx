import { css } from "~/styled-system/css";

const BestExperience = () => {
  return (
    <section
      className={css({
        background:
          "linear-gradient(180deg, rgba(233, 236, 249, 0.05) 0%, rgba(233, 236, 249, 0.02) 100%), url('/images/rune.webp') no-repeat bottom right",
        backdropFilter: "blur(70px)",
        width: "100%",
        rounded: "28px",
        px: "60px",
        pt: 100,
        border: "1px solid rgba(255, 255, 255, 0.14)",
        height: "417px",
      })}
    >
      <p
        className={css({
          fontSize: "36px",
          fontWeight: "semibold",
          color: "white",
          maxW: "409px",
        })}
      >
        Runes moment
      </p>
      <p
        className={css({
          fontSize: "16px",
          fontWeight: "medium",
          color: "#646471",
          maxWidth: "345px",
          mt: 6,
        })}
      >
        Runes are booming, but trading is chaotic and fragmented. Omzo is the
        Uniswap moment for Bitcoin — unlocking deep, instant, native liquidity
        and real yield
      </p>
    </section>
  );
};

export { BestExperience };
