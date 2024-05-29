import { ISettings } from '@monorepo/chrome-extension/msg-bridge';
import { atom } from 'recoil';

export const settings = atom<ISettings>({
  key: 'settings',
  default: {} as ISettings,
});
