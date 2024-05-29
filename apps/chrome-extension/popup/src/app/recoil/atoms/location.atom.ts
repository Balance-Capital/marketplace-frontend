import { Location } from 'react-router-dom';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: `${chrome.i18n.getMessage('extName')}-persist`,
  storage: localStorage,
});

export const lastLocation = atom<Location>({
  key: 'lastLocation',
  default: {} as Location,
  effects_UNSTABLE: [persistAtom],
});
