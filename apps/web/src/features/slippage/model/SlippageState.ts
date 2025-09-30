import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const slippage = atomWithStorage('slippage', 0.015);

export const isSlippageDialogOpen = atom(false);
