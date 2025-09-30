import Image from "next/image";

import { css } from "~/styled-system/css";
import { hstack, vstack } from "~/styled-system/patterns";

import roadmapIcon from "../assets/roadmap.svg";

const years = [
  "March 2025",
  "June 2025",
  "September 2025",
  "December 2025",
  "March 2026",
];
const milestones = [
  {
    text: "Development & Launch Preparation",
    left: 0,
    top: 0,
  },
  { text: "Liquidity Sourcing & Test Launches", left: "240px", top: "52px", width: "400px" },
  { text: "Mainnet Launch & Scaling", left: "640px", top: "104px" },
  { text: "Ecosystem Growth & Partnerships", left: "820px", top: "156px" },
  { text: "Expansion", left: "1080px", top: "208px" },
];

const RoadMap = () => {
  return (
    <section
      className={css({
        overflowX: "auto",
        overflowY: "hidden",
        background:
          "linear-gradient(180deg, rgba(233, 236, 249, 0.05) 0%, rgba(233, 236, 249, 0.02) 100%)",
        backdropFilter: "blur(70px)",
        width: "100%",
        rounded: "28px",
        maxWidth: "1226px",
        padding: "26px",
        border: "1px solid rgba(255, 255, 255, 0.14)",
      })}
    >
      {/* Header */}
      <div className={hstack({ alignItems: "center", gap: 0 })}>
        <Image src={roadmapIcon} alt="Roadmap" />
        <h1
          className={css({
            fontSize: "36px",
            fontWeight: "bold",
            color: "white",
          })}
        >
          Roadmap
        </h1>
      </div>

      {/* Timeline */}
      <div
        className={css({
          position: "relative",
          width: 1100,
          minHeight: 300,
          marginTop: 1.5,
        })}
      >
        {/* Years */}
        <div
          className={css({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            position: "relative",
            zIndex: 2,
            width: "100%",
          })}
        >
          {years.map((year) => (
            <div
              className={vstack({
                display: "flex",
                flexDirection: "row",
                alignItems: "start",
              })}
            >
              <div
                className={css({
                  width: 0.5,
                  height: 300,
                  bg: "transparent",
                  borderLeft: "1px dashed rgba(255, 255, 255, 0.1)",
                  borderImage:
                    "repeating-linear-gradient(to bottom, rgba(255,255,255,0.1) 0 8px, transparent 8px 20px) 1",
                })}
              />
              <span
                key={year}
                className={css({
                  color: "rgba(255, 255, 255, 0.5)",
                  fontWeight: "medium",
                  fontSize: 12,
                })}
              >
                {year}
              </span>
            </div>
          ))}
        </div>
        {/* Now marker */}
        <div
          className={css({
            position: "absolute",
            left: `calc(50% + 6px)`,
            top: -10,
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          })}
        >
          <span
            className={css({
              background: "#25c665",
              color: "white",
              borderRadius: "2xl",
              padding: "6px 18px",
              fontWeight: "medium",
              fontSize: 12,
              marginBottom: 2.5,
              boxShadow: "0 0 8px #25c66599",
            })}
          >
            Now
          </span>
          <div
            className={css({
              width: 0.5,
              height: 300,
              background: "#25c665",
              borderRadius: 2,
            })}
          />
        </div>
        {/* Milestones */}
        <div
          className={css({
            position: "absolute",
            left: 0,
            right: 0,
            top: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "100%",
            zIndex: 2,
          })}
        >
          {milestones.map((m, i) => (
            <div
              key={i}
              className={css({
                position: "absolute",
                background: "#FFFFFF0D",
                backdropFilter: "blur(16px)",
                color: "white",
                borderRadius: "full",
                padding: "14px 15px",
                fontWeight: "medium",
                fontSize: 12,
                textAlign: "center",
              })}
              style={{
                left: m.left,
                top: m.top,
                width: m.width,
              }}
            >
              {m.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { RoadMap };
