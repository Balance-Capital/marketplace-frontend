import { IOffer, IStore } from '@monorepo/chrome-extension/msg-bridge';
import { atom } from 'recoil';

export const singleStore = atom<IStore>({
  key: 'singleStore',
  default: {} as IStore,
});

export const storeOffers = atom<IOffer[]>({
  key: 'storeOffers',
  default: [] as IOffer[],
});

export const storeLoader = atom<boolean>({
  key: 'storeLoader',
  default: true,
});

export const storeSelectedFilter = atom<string>({
  key: 'storeSelectedFilter',
  default: 'All',
});
