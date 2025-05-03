import { Container, Stack } from "~/styled-system/jsx";
import { hstack } from "~/styled-system/patterns";

type HeaderProps = {
  leftSlot?: React.ReactNode;
  navigation?: React.ReactNode;
  rightSlot?: React.ReactNode;
};

export const Header = ({ leftSlot, navigation, rightSlot }: HeaderProps) => {
  return (
    <header>
      <Container px={0} maxWidth="100%" width="100%">
        <Stack
          className={hstack({
            justifyContent: "space-between",
            alignItems: "center",
            gap: 4,
            px: 4,
            minH: 28,
            width: "100%",
          })}
        >
          {leftSlot}
          {navigation}
          {rightSlot}
        </Stack>
      </Container>
    </header>
  );
};
