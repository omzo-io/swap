import { cva } from "~/styled-system/css";
import { styled } from "~/styled-system/jsx";

const buttonStyle = cva({
  defaultVariants: {
    appearance: "primary",
    size: "medium",
  },
  base: {
    flexGrow: 0,
    flexShrink: 0,
    appearance: "none",
    display: "inline-flex",
    gap: 2,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "medium",
    _hover: {
      cursor: "pointer",
    },
    _disabled: {
      bg: "neutral.300",
      pointerEvents: "none",
    },
    _loading: {
      bg: "neutral.300",
    },
  },
  variants: {
    appearance: {
      primary: {
        border: "1px solid #FFFFFF14",
        backgroundColor: "black",
        color: "white",
        _hover: {
          backgroundColor: "gray.700",
        },
        _disabled: {
          backgroundColor: "gray.300",
        },
      },
      tertiary: {
        backgroundColor: "black",
        color: "white",
        _hover: {
          backgroundColor: "gray.700",
        },
        _disabled: {
          backgroundColor: "gray.300",
        },
      },
      secondary: {
        backgroundColor: "#5346EB",
        color: "white",
        borderRadius: "14px",
        rounded: "14px",
        _hover: {
          backgroundColor: "#6459EA",
        },
      },
      ghost: {
        backgroundColor: "transparent",
        color: "neutral.800",
        _hover: {
          backgroundColor: "neutral.100",
        },
      },
      outline: {
        backgroundColor: "transparent",
        color: "neutral.800",
        border: "1px solid",
        borderColor: "neutral.200",
        _hover: {
          backgroundColor: "neutral.100",
        },
      },
    },
    size: {
      small: {
        fontSize: "sm",
      },
      medium: {
        h: 16,
        px: 4,
        py: 5,
        borderRadius: "14px",
        fontSize: "md",
        fontWeight: "semibold",
      },
      large: {
        fontSize: "lg",
      },
    },
  },
});

export const Button = styled("button", buttonStyle, {
  defaultProps: {
    type: "button",
  },
});
