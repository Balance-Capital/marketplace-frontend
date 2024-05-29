import {
  IProduct,
  IStore,
} from '@monorepo/chrome-extension/msg-bridge';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { SortBy } from '../../enums/sort-by.enum';

const { persistAtom } = recoilPersist({
  key: `${chrome.i18n.getMessage('extName')}-persist`,
  storage: localStorage,
});

export const searchPopularStores = atom<IStore[]>({
  key: 'searchPopularStores',
  default: [],
});

export const searchPopularProducts = atom<IProduct[]>({
  key: 'searchPopularProducts',
  default: [],
});

export const searchStore = atom<IStore[]>({
  key: 'searchStore',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const searchText = atom<string>({
  key: 'searchText',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const searchSortModal = atom<boolean>({
  key: 'searchSortModal',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const currentRadioValue = atom<string>({
  key: 'currentRadioValue',
  default: SortBy.Popular,
  effects_UNSTABLE: [persistAtom],
});

export const searchProducts = atom<IProduct[]>({
  key: 'searchProducts',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
