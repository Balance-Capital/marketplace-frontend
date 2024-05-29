import { IStore } from '@monorepo/chrome-extension/msg-bridge';
import { selector } from 'recoil';
import { homeStores } from '../atoms/home.atom';

export const storesCategories = selector({
  key: 'storesCategories',
  get: ({ get }) => {
    const stores = get<IStore[]>(homeStores);
    const categories = new Set(
      stores.reduce(
        (acc: string[], store: IStore) =>
          acc.concat(
            store.categories.filter(
              (str) => str !== '' && str !== null && str !== undefined
            )
          ),
        [] as string[]
      )
    );
    return [...categories];
  },
});
