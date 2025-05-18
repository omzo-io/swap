import { ReactNode } from "react";
import { css } from "~/styled-system/css";
import { Stack, VStack } from "~/styled-system/jsx";

interface Props {
  children: ReactNode;
  name: string;
}

export const PairField = ({ children, name }: Props) => {
  return (
    <VStack
      alignItems="baseline"
      gap={5}
      background="linear-gradient(180deg, rgba(233, 236, 249, 0.05) 0%, rgba(233, 236, 249, 0.02) 100%)"
      backdropFilter="blur(70px)"
      padding={5}
      borderRadius="xl"
      width="100%"
    >
      <span
        className={css({
          textStyle: "body",
        })}
      >
        {name}
      </span>
      {children}
    </VStack>
  );
};
