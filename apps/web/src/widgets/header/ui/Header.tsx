import { Container, Stack } from '~/styled-system/jsx';
import { hstack } from '~/styled-system/patterns';

type HeaderProps = {
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
};

export const Header = ({ leftSlot, rightSlot }: HeaderProps) => {
  return (
    <header>
      <Container px={0} maxWidth="100%" width="100%">
        <Stack
          className={hstack({
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 4,
            px: 4,
            minH: 20,
            width: '100%',
          })}
        >
          {leftSlot}
          {rightSlot}
        </Stack>
      </Container>
    </header>
  );
};
