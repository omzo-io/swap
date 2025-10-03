import * as RadixDialog from '@radix-ui/react-dialog';
import { styled } from '~/styled-system/jsx';

export const DialogContent = styled(RadixDialog.Content, {
  base: {
    border: "1px solid rgba(255, 255, 255, 0.14)",
    backgroundColor:
      "linear-gradient(180deg, rgba(233, 236, 249, 0.05) 0%, rgba(233, 236, 249, 0.02) 100%)",
    backdropFilter: "blur(70px)",
    borderRadius: "3xl",
    color: "white",
    padding: 8,
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 200,
  },
});

export const DialogOverlay = styled(RadixDialog.Overlay, {
  base: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    zIndex: 100,
  },
});

export { Dialog, DialogClose, DialogTrigger } from '@radix-ui/react-dialog';