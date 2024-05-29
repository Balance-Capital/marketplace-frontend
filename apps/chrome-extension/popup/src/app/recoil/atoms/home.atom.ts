import {
  IProduct,
  IStore,
} from '@monorepo/chrome-extension/msg-bridge';
import { atom } from 'recoil';

export const homeStores = atom<IStore[]>({
  key: 'homeStores',
  default: [],
});

export const homeProducts = atom<IProduct[]>({
  key: 'homeProducts',
  default: [],
});

export const selectedCategory = atom<string>({
  key: 'selectedCategory',
  default: '',
});

export const storesByCategory = atom<IStore[]>({
  key: 'storesByCategory',
  default: [],
});
