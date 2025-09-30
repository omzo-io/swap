'use client';

import { Dialog, DialogContent, DialogOverlay } from '@/shared';
import { AppMenuList } from '@/widgets';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Stack, VStack } from '~/styled-system/jsx';
import MenuIcon from '../assets/menu.svg';
import { AccountButton } from '@/widgets/account-button';

export const MobileAppMenu = () => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((prev) => !prev);

  return (
    <Stack>
      <Image
        onClick={handleToggle}
        src={MenuIcon}
        alt="menu-button"
        width={24}
        height={24}
      />
      <Dialog open={open}>
        <DialogOverlay onClick={handleToggle} />
        <DialogContent
          onEscapeKeyDown={handleToggle}
          width="100%"
          height="100%"
        >
          <X onClick={handleToggle} />
          <VStack width="100%" gap={5}>
            <VStack width="100%" gap={5}>
              <AppMenuList onClick={handleToggle} />
            </VStack>

            <AccountButton onClick={handleToggle} />
          </VStack>
        </DialogContent>
      </Dialog>
    </Stack>
  );
};
